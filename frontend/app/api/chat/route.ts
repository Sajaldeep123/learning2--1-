import { type NextRequest, NextResponse } from "next/server"

// Mock AI responses based on career guidance topics
const getAIResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase()

  // Career guidance responses
  if (lowerMessage.includes("career") || lowerMessage.includes("job") || lowerMessage.includes("profession")) {
    return "I'd be happy to help with your career planning! To give you the best guidance, could you tell me about your interests, current skills, or the field you're considering? I can create a personalized roadmap for you."
  }

  // Programming/Tech responses
  if (
    lowerMessage.includes("programming") ||
    lowerMessage.includes("coding") ||
    lowerMessage.includes("developer") ||
    lowerMessage.includes("software")
  ) {
    return "Great choice! Software development is a rapidly growing field. I recommend starting with:\n\n1. **Choose a language**: Python (beginner-friendly) or JavaScript (web development)\n2. **Build projects**: Start with simple programs and gradually increase complexity\n3. **Learn fundamentals**: Data structures, algorithms, and problem-solving\n4. **Join communities**: Connect with other developers for support\n\nWould you like a detailed roadmap for a specific programming language?"
  }

  // Data Science responses
  if (
    lowerMessage.includes("data science") ||
    lowerMessage.includes("machine learning") ||
    lowerMessage.includes("ai") ||
    lowerMessage.includes("analytics")
  ) {
    return "Data Science is an exciting field! Here's a structured path:\n\n1. **Mathematics Foundation**: Statistics, linear algebra, calculus\n2. **Programming**: Python (pandas, numpy, scikit-learn) or R\n3. **Data Visualization**: Matplotlib, Seaborn, Tableau\n4. **Machine Learning**: Start with supervised learning, then explore deep learning\n5. **Projects**: Work on real datasets to build your portfolio\n\nI can connect you with data science mentors and relevant job opportunities. What aspect interests you most?"
  }

  // Design responses
  if (
    lowerMessage.includes("design") ||
    lowerMessage.includes("ui") ||
    lowerMessage.includes("ux") ||
    lowerMessage.includes("graphic")
  ) {
    return "Design is a fantastic career path! Here's how to get started:\n\n1. **Learn Design Principles**: Color theory, typography, layout, user psychology\n2. **Master Tools**: Figma, Adobe Creative Suite, Sketch\n3. **Build Portfolio**: Create diverse projects showcasing your skills\n4. **User Research**: Understand how to conduct user interviews and usability testing\n5. **Stay Updated**: Follow design trends and best practices\n\nWould you like me to recommend specific courses or connect you with design mentors?"
  }

  // Business/Marketing responses
  if (
    lowerMessage.includes("business") ||
    lowerMessage.includes("marketing") ||
    lowerMessage.includes("entrepreneur") ||
    lowerMessage.includes("startup")
  ) {
    return "Business and entrepreneurship offer exciting opportunities! Consider these paths:\n\n1. **Digital Marketing**: SEO, social media, content marketing, analytics\n2. **Business Analysis**: Data-driven decision making, market research\n3. **Product Management**: Strategy, user experience, cross-functional leadership\n4. **Entrepreneurship**: Idea validation, business planning, funding strategies\n\nI can help you explore specific business roles and connect you with industry professionals. What area interests you most?"
  }

  // Learning/Education responses
  if (
    lowerMessage.includes("learn") ||
    lowerMessage.includes("study") ||
    lowerMessage.includes("course") ||
    lowerMessage.includes("skill")
  ) {
    return "I love your enthusiasm for learning! Here's how I can help:\n\n✨ **Personalized Roadmaps**: Custom learning paths based on your goals\n📚 **Course Recommendations**: Curated courses from top platforms\n👥 **Mentor Connections**: Connect with industry experts\n🎯 **Skill Assessment**: Identify your strengths and areas for growth\n💼 **Job Market Insights**: Current trends and in-demand skills\n\nWhat specific skill or field would you like to explore?"
  }

  // Greeting responses
  if (
    lowerMessage.includes("hello") ||
    lowerMessage.includes("hi") ||
    lowerMessage.includes("hey") ||
    lowerMessage.includes("start")
  ) {
    return "Hello! 👋 I'm your AI Career Assistant, here to help you navigate your professional journey.\n\nI can assist you with:\n• **Career Planning** - Find the right path for your interests and skills\n• **Skill Development** - Get personalized learning roadmaps\n• **Job Market Insights** - Understand current trends and opportunities\n• **Mentorship Connections** - Connect with industry professionals\n• **Course Recommendations** - Find the best learning resources\n\nWhat would you like to explore today?"
  }

  // Default responses
  const defaultResponses = [
    "That's an interesting question! Could you provide more details about your specific situation or goals? I'd love to give you more targeted advice.",
    "I'm here to help with your career and learning journey. Could you tell me more about what you're looking to achieve or learn?",
    "Great question! To give you the most helpful guidance, could you share more about your background, interests, or the specific challenge you're facing?",
    "I'd be happy to help! Whether it's career planning, skill development, or job searching, I'm here to guide you. What specific area would you like to focus on?",
  ]

  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
}

export async function POST(request: NextRequest) {
  try {
    const { message, userId } = await request.json()

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    // Simulate AI processing time
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 2000))

    const response = getAIResponse(message)

    return NextResponse.json({
      response,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
