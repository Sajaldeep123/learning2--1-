import { openai } from "@ai-sdk/openai"
import { convertToModelMessages, streamText, type UIMessage, tool } from "ai"
import { z } from "zod"

export const maxDuration = 30

const searchKnowledgeBaseTool = tool({
  description:
    "Search the knowledge base for relevant information about courses, mentors, assignments, or platform features",
  inputSchema: z.object({
    query: z.string().describe("The search query"),
    category: z.enum(["courses", "mentors", "assignments", "platform", "technical"]).optional(),
  }),
  execute: async ({ query, category }) => {
    // Simulate knowledge base search
    const knowledgeBase = {
      courses: [
        "Our platform offers courses in Web Development, Data Science, AI/ML, and Mobile Development.",
        "Course progress is tracked automatically and you can view your completion status in the dashboard.",
        "All courses include hands-on projects and real-world applications.",
      ],
      mentors: [
        "Mentors are industry professionals with 5+ years of experience.",
        "You can schedule 1-on-1 sessions, mock interviews, and get personalized feedback.",
        "Mentor ratings are based on student feedback and session quality.",
      ],
      assignments: [
        "Assignments are automatically graded with detailed feedback.",
        "You can resubmit assignments up to 3 times for better scores.",
        "Assignment deadlines can be extended with valid reasons.",
      ],
      platform: [
        "The platform supports dark/light mode and is fully responsive.",
        "Progress tracking includes completion rates, time spent, and skill assessments.",
        "You can export your certificates and portfolio projects.",
      ],
      technical: [
        "If you experience login issues, try clearing your browser cache.",
        "Video playback issues can be resolved by switching to a different browser.",
        "For account-related problems, contact support with your user ID.",
      ],
    }

    const relevantInfo = category ? knowledgeBase[category] : Object.values(knowledgeBase).flat()

    return relevantInfo.filter((info) => info.toLowerCase().includes(query.toLowerCase())).slice(0, 3)
  },
})

const escalateToHumanTool = tool({
  description: "Escalate complex issues to human support when the AI cannot provide adequate assistance",
  inputSchema: z.object({
    issue: z.string().describe("Description of the issue that needs human attention"),
    priority: z.enum(["low", "medium", "high", "urgent"]).describe("Priority level of the issue"),
  }),
  execute: async ({ issue, priority }) => {
    // In a real implementation, this would create a support ticket
    return {
      ticketId: `TICKET-${Date.now()}`,
      message: `Your issue has been escalated to our human support team. Ticket ID: TICKET-${Date.now()}. Expected response time: ${priority === "urgent" ? "1 hour" : priority === "high" ? "4 hours" : "24 hours"}.`,
      priority,
    }
  },
})

const tools = {
  searchKnowledgeBase: searchKnowledgeBaseTool,
  escalateToHuman: escalateToHumanTool,
}

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  const systemPrompt = `You are EduCareer's AI Support Assistant. You help students with:

1. Course-related questions (content, progress, certificates)
2. Mentor and interview scheduling assistance  
3. Assignment and quiz support
4. Platform navigation and technical issues
5. Account and billing inquiries

Guidelines:
- Be helpful, friendly, and professional
- Use the searchKnowledgeBase tool to find relevant information
- If you cannot resolve an issue, use escalateToHuman tool
- Always provide specific, actionable advice
- Ask clarifying questions when needed
- Keep responses concise but comprehensive

Current context: You're assisting students on the EduCareer learning platform.`

  const result = streamText({
    model: openai("gpt-4"),
    messages: [{ role: "system", content: systemPrompt }, ...convertToModelMessages(messages)],
    tools,
    maxSteps: 3,
    abortSignal: req.signal,
  })

  return result.toUIMessageStreamResponse()
}
