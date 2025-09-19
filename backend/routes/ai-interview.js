const express = require('express');
const router = express.Router();
const { z } = require('zod');

let generateText, generateObject, openai;

async function loadAiModules() {
  if (!generateText) {
    ({
      generateText,
      generateObject
    } = await import('ai'));
    ({ openai } = await import('@ai-sdk/openai'));
  }
}

const feedbackSchema = z.object({
  clarity: z.number().min(0).max(100),
  confidence: z.number().min(0).max(100),
  structure: z.number().min(0).max(100),
  relevance: z.number().min(0).max(100),
  technicalAccuracy: z.number().min(0).max(100).optional(),
  overallScore: z.number().min(0).max(100),
  suggestions: z.array(z.string()),
  strengths: z.array(z.string()),
  improvements: z.array(z.string()),
});

const questionGenerationSchema = z.object({
  questions: z.array(
    z.object({
      id: z.string(),
      text: z.string(),
      type: z.enum(["behavioral", "technical", "situational", "case_study"]),
      difficulty: z.string(),
      expectedDuration: z.number(),
      followUps: z.array(z.string()).optional(),
      evaluationCriteria: z.array(z.string()),
    }),
  ),
});

router.post('/', async (req, res) => {
  await loadAiModules();
  try {
    const { action, ...data } = req.body;

    switch (action) {
      case "analyze_answer":
        return await analyzeAnswer(data, res);
      case "generate_questions":
        return await generateQuestions(data, res);
      case "generate_feedback":
        return await generateFeedback(data, res);
      default:
        return res.status(400).json({ error: "Invalid action" });
    }
  }
  catch (error) {
    console.error("[v0] AI Interview API error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

async function analyzeAnswer(data, res) {
  const { answer, question, role, level } = data;

  const prompt = `
    Analyze this interview answer for a ${role} position at ${level} level:
    
    Question: ${question.text}
    Question Type: ${question.type}
    Answer: ${answer}
    
    Provide detailed feedback on:
    1. Clarity of communication (0-100)
    2. Confidence level (0-100) 
    3. Answer structure (0-100)
    4. Relevance to question (0-100)
    ${question.type === "technical" ? "5. Technical accuracy (0-100)" : ""}
    
    Also provide:
    - 3 specific suggestions for improvement
    - 3 strengths demonstrated
    - 3 areas for improvement
    
    Be constructive and specific in your feedback.
  `;

  const { object } = await generateObject({
    model: openai("gpt-4"),
    schema: feedbackSchema,
    prompt,
  });

  return res.json({ feedback: object });
}

async function generateQuestions(data, res) {
  const { role, level, type, difficulty, count = 5 } = data;

  const prompt = `
    Generate ${count} interview questions for a ${role} position at ${level} level.
    Interview type: ${type}
    Difficulty: ${difficulty}
    
    For each question, provide:
    - Unique ID
    - Question text
    - Question type (behavioral, technical, situational, case_study)
    - Difficulty level
    - Expected duration in seconds
    - Optional follow-up questions
    - Evaluation criteria (what to look for in answers)
    
    Make questions relevant to the role and appropriate for the experience level.
  `;

  const { object } = await generateObject({
    model: openai("gpt-4"),
    schema: questionGenerationSchema,
    prompt,
  });

  return res.json({ questions: object.questions });
}

async function generateFeedback(data, res) {
  const { session, answers } = data;

  const prompt = `
    Provide comprehensive feedback for this interview session:
    
    Role: ${session.config.role}
    Level: ${session.config.level}
    Type: ${session.config.type}
    
    Questions and Answers:
    ${answers
      .map(
        (ans, i) => `
    Q${i + 1}: ${session.questions[i]?.text}
    A${i + 1}: ${ans.answer}
    Score: ${ans.feedback.overallScore}%
    `,
      )
      .join("\n")}
    
    Provide:
    1. Overall performance summary
    2. Key strengths across all answers
    3. Main areas for improvement
    4. Specific recommendations for skill development
    5. Suggested next steps and resources
  `;

  const { text } = await generateText({
    model: openai("gpt-4"),
    prompt,
    maxTokens: 1000,
  });

  return res.json({ feedback: text });
}

module.exports = router;