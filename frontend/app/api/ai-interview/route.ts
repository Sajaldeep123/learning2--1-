"use client"

import { type NextRequest, NextResponse } from "next/server"
import { generateText, generateObject } from "ai"
import { openai } from "@ai-sdk/openai"
import { z } from "zod"

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
})

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
})

export async function POST(req: NextRequest) {
  try {
    const { action, ...data } = await req.json()

    switch (action) {
      case "analyze_answer":
        return await analyzeAnswer(data)
      case "generate_questions":
        return await generateQuestions(data)
      case "generate_feedback":
        return await generateFeedback(data)
      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }
  } catch (error) {
    console.error("[v0] AI Interview API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

async function analyzeAnswer(data: any) {
  const { answer, question, role, level } = data

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
  `

  const { object } = await generateObject({
    model: openai("gpt-4"),
    schema: feedbackSchema,
    prompt,
  })

  return NextResponse.json({ feedback: object })
}

async function generateQuestions(data: any) {
  const { role, level, type, difficulty, count = 5 } = data

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
  `

  const { object } = await generateObject({
    model: openai("gpt-4"),
    schema: questionGenerationSchema,
    prompt,
  })

  return NextResponse.json({ questions: object.questions })
}

async function generateFeedback(data: any) {
  const { session, answers } = data

  const prompt = `
    Provide comprehensive feedback for this interview session:
    
    Role: ${session.config.role}
    Level: ${session.config.level}
    Type: ${session.config.type}
    
    Questions and Answers:
    ${answers
      .map(
        (ans: any, i: number) => `
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
  `

  const { text } = await generateText({
    model: openai("gpt-4"),
    prompt,
  })

  return NextResponse.json({ feedback: text })
}
