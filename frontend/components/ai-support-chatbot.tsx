"use client"

import type React from "react"

import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Send, Bot, User, Minimize2 } from "lucide-react"

interface SupportChatbotProps {
  isMinimized?: boolean
  onToggleMinimize?: () => void
}

export default function AISupportChatbot({ isMinimized = false, onToggleMinimize }: SupportChatbotProps) {
  const [input, setInput] = useState("")

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat-support" }),
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        parts: [
          {
            type: "text",
            text: "Hi! I'm your EduCareer AI Support Assistant. I can help you with:\n\n• Course questions and progress tracking\n• Mentor scheduling and interview prep\n• Assignment and quiz support\n• Platform navigation and technical issues\n• Account and billing inquiries\n\nHow can I assist you today?",
          },
        ],
      },
    ],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() && status !== "in_progress") {
      sendMessage({ text: input })
      setInput("")
    }
  }

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button onClick={onToggleMinimize} className="rounded-full h-14 w-14 shadow-lg" size="icon">
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 h-[600px] max-h-[80vh]">
      <Card className="h-full flex flex-col shadow-2xl">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-sm">AI Support</CardTitle>
                <Badge variant="secondary" className="text-xs">
                  {status === "in_progress" ? "Typing..." : "Online"}
                </Badge>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onToggleMinimize} className="h-8 w-8">
              <Minimize2 className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          <ScrollArea className="flex-1 px-4">
            <div className="space-y-4 pb-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.role === "assistant" && (
                    <Avatar className="h-8 w-8 mt-1">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}

                  <div
                    className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                      message.role === "user" ? "bg-primary text-primary-foreground ml-auto" : "bg-muted"
                    }`}
                  >
                    {message.parts.map((part, index) => {
                      switch (part.type) {
                        case "text":
                          return (
                            <div key={index} className="whitespace-pre-wrap">
                              {part.text}
                            </div>
                          )

                        case "tool-searchKnowledgeBase":
                          switch (part.state) {
                            case "input-available":
                              return (
                                <div key={index} className="text-muted-foreground text-xs">
                                  🔍 Searching knowledge base for: {part.input.query}
                                </div>
                              )
                            case "output-available":
                              return (
                                <div key={index} className="mt-2">
                                  <div className="text-xs text-muted-foreground mb-1">Found relevant information:</div>
                                  <ul className="text-xs space-y-1">
                                    {part.output.map((info: string, i: number) => (
                                      <li key={i} className="flex items-start gap-1">
                                        <span className="text-primary">•</span>
                                        <span>{info}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )
                          }
                          break

                        case "tool-escalateToHuman":
                          switch (part.state) {
                            case "output-available":
                              return (
                                <div
                                  key={index}
                                  className="mt-2 p-2 bg-orange-50 dark:bg-orange-950/20 rounded border border-orange-200 dark:border-orange-800"
                                >
                                  <div className="text-xs font-medium text-orange-800 dark:text-orange-200 mb-1">
                                    Escalated to Human Support
                                  </div>
                                  <div className="text-xs text-orange-700 dark:text-orange-300">
                                    {part.output.message}
                                  </div>
                                  <Badge variant="outline" className="mt-1 text-xs">
                                    Priority: {part.output.priority}
                                  </Badge>
                                </div>
                              )
                          }
                          break
                      }
                    })}
                  </div>

                  {message.role === "user" && (
                    <Avatar className="h-8 w-8 mt-1">
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="p-4 border-t">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything about EduCareer..."
                disabled={status === "in_progress"}
                className="flex-1"
              />
              <Button type="submit" size="icon" disabled={!input.trim() || status === "in_progress"}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
            <div className="text-xs text-muted-foreground mt-2 text-center">
              AI responses may contain errors. For urgent issues, contact human support.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
