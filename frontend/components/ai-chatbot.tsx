"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  MessageCircle,
  Send,
  Bot,
  User,
  X,
  Minimize2,
  Maximize2,
  BookOpen,
  Calendar,
  FileText,
  Users,
  ArrowRight,
  Star,
} from "lucide-react"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
  suggestions?: string[]
  resources?: {
    type: "quiz" | "assignment" | "interview" | "course"
    title: string
    description: string
    action: string
  }[]
}

const quickActions = [
  { label: "How do I upload my resume?", icon: FileText },
  { label: "Schedule a mock interview", icon: Calendar },
  { label: "Find JavaScript quizzes", icon: BookOpen },
  { label: "Check my progress", icon: Star },
  { label: "Career path guidance", icon: Users },
  { label: "Contact a mentor", icon: MessageCircle },
]

const sampleResponses = {
  resume: {
    content:
      "I can help you with resume uploads! You can upload your resume in PDF or DOCX format through the Resume section in your dashboard. The system will automatically analyze it and provide feedback on formatting, content, and ATS compatibility.",
    resources: [
      {
        type: "course" as const,
        title: "Resume Writing Masterclass",
        description: "Learn to create ATS-friendly resumes",
        action: "Start Course",
      },
    ],
  },
  interview: {
    content:
      "Great! I can help you schedule mock interviews. You can book sessions with mentors or practice with our AI interview simulator. Both options provide detailed feedback on your performance.",
    resources: [
      {
        type: "interview" as const,
        title: "Technical Interview Practice",
        description: "Practice coding and system design questions",
        action: "Start Practice",
      },
      {
        type: "interview" as const,
        title: "Behavioral Interview Prep",
        description: "Master the STAR method for behavioral questions",
        action: "Book Session",
      },
    ],
  },
  quiz: {
    content:
      "I found several JavaScript quizzes for you! Based on your current progress, I recommend starting with intermediate-level quizzes to build on your existing knowledge.",
    resources: [
      {
        type: "quiz" as const,
        title: "JavaScript ES6+ Features",
        description: "Test your knowledge of modern JavaScript",
        action: "Take Quiz",
      },
      {
        type: "quiz" as const,
        title: "Async JavaScript & Promises",
        description: "Master asynchronous programming concepts",
        action: "Take Quiz",
      },
    ],
  },
  progress: {
    content:
      "Your learning progress looks great! You're currently 75% complete on your Software Engineer path. You've completed 45 quizzes, 28 assignments, and 12 mock interviews. Keep up the excellent work!",
    suggestions: ["View detailed analytics", "Set new learning goals", "Schedule mentor check-in"],
  },
  career: {
    content:
      "I can help you with career guidance! Based on your profile, you're on the Software Engineer path. Your current focus should be on Node.js and system design to reach your target skills.",
    resources: [
      {
        type: "course" as const,
        title: "System Design Fundamentals",
        description: "Learn to design scalable systems",
        action: "Start Learning",
      },
    ],
  },
  mentor: {
    content:
      "I can connect you with a mentor! You can book 1-on-1 sessions for career guidance, technical help, or interview preparation. Would you like me to show you available mentors in your field?",
    suggestions: ["View available mentors", "Book career counseling", "Schedule technical help"],
  },
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content:
        "Hi! I'm your AI learning assistant. I'm here 24/7 to help you with platform navigation, course content, interview prep, and more. How can I assist you today?",
      timestamp: new Date(),
      suggestions: ["Upload resume help", "Schedule interview", "Find quizzes", "Check progress"],
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getResponse = (userMessage: string): Partial<Message> => {
    const message = userMessage.toLowerCase()

    if (message.includes("resume") || message.includes("upload")) {
      return sampleResponses.resume
    } else if (message.includes("interview") || message.includes("mock")) {
      return sampleResponses.interview
    } else if (message.includes("quiz") || message.includes("javascript") || message.includes("test")) {
      return sampleResponses.quiz
    } else if (message.includes("progress") || message.includes("analytics") || message.includes("score")) {
      return sampleResponses.progress
    } else if (message.includes("career") || message.includes("path") || message.includes("guidance")) {
      return sampleResponses.career
    } else if (message.includes("mentor") || message.includes("help") || message.includes("support")) {
      return sampleResponses.mentor
    } else {
      return {
        content:
          "I understand you're looking for help. I can assist you with resume uploads, interview scheduling, finding quizzes, checking progress, career guidance, and connecting with mentors. Could you be more specific about what you need?",
        suggestions: ["Resume help", "Interview prep", "Find courses", "Contact mentor"],
      }
    }
  }

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response delay
    setTimeout(() => {
      const response = getResponse(content)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: response.content || "I'm here to help! Could you please rephrase your question?",
        timestamp: new Date(),
        suggestions: response.suggestions,
        resources: response.resources,
      }

      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleQuickAction = (action: string) => {
    handleSendMessage(action)
  }

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion)
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg z-50"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    )
  }

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
        isMinimized ? "w-80 h-16" : "w-96 h-[600px]"
      }`}
    >
      <Card className="h-full bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
        {/* Header */}
        <CardHeader className="pb-3 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div>
                <CardTitle className="text-sm">AI Assistant</CardTitle>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-gray-600">Online</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="sm" onClick={() => setIsMinimized(!isMinimized)} className="h-8 w-8 p-0">
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="h-8 w-8 p-0">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <>
            {/* Messages */}
            <CardContent className="flex-1 p-0">
              <ScrollArea className="h-[400px] p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`max-w-[80%] space-y-2 ${message.type === "user" ? "order-2" : "order-1"}`}>
                        <div
                          className={`flex items-start space-x-2 ${message.type === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
                        >
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                              message.type === "user" ? "bg-blue-600" : "bg-gradient-to-r from-blue-600 to-indigo-600"
                            }`}
                          >
                            {message.type === "user" ? (
                              <User className="h-3 w-3 text-white" />
                            ) : (
                              <Bot className="h-3 w-3 text-white" />
                            )}
                          </div>
                          <div
                            className={`rounded-lg p-3 ${
                              message.type === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                          </div>
                        </div>

                        {/* Suggestions */}
                        {message.suggestions && (
                          <div className="flex flex-wrap gap-2 ml-8">
                            {message.suggestions.map((suggestion, index) => (
                              <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                onClick={() => handleSuggestionClick(suggestion)}
                                className="text-xs h-7"
                              >
                                {suggestion}
                              </Button>
                            ))}
                          </div>
                        )}

                        {/* Resources */}
                        {message.resources && (
                          <div className="space-y-2 ml-8">
                            {message.resources.map((resource, index) => (
                              <div key={index} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                                <div className="flex items-center justify-between">
                                  <div className="flex-1">
                                    <h4 className="text-sm font-medium text-blue-900">{resource.title}</h4>
                                    <p className="text-xs text-blue-700">{resource.description}</p>
                                  </div>
                                  <Button size="sm" className="ml-2">
                                    {resource.action}
                                    <ArrowRight className="h-3 w-3 ml-1" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                          <Bot className="h-3 w-3 text-white" />
                        </div>
                        <div className="bg-gray-100 rounded-lg p-3">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div ref={messagesEndRef} />
              </ScrollArea>
            </CardContent>

            {/* Quick Actions */}
            {messages.length === 1 && (
              <div className="px-4 py-2 border-t border-b bg-gray-50">
                <p className="text-xs text-gray-600 mb-2">Quick actions:</p>
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.slice(0, 4).map((action, index) => {
                    const IconComponent = action.icon
                    return (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuickAction(action.label)}
                        className="justify-start text-xs h-8"
                      >
                        <IconComponent className="h-3 w-3 mr-1" />
                        {action.label}
                      </Button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything..."
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage(inputValue)}
                  className="flex-1"
                />
                <Button
                  onClick={() => handleSendMessage(inputValue)}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">AI Assistant • Available 24/7</p>
            </div>
          </>
        )}
      </Card>
    </div>
  )
}
