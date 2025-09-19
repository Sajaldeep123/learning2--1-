"use client"

import { useState } from "react"
import AISupportChatbot from "./ai-support-chatbot"

export default function ChatbotProvider() {
  const [isMinimized, setIsMinimized] = useState(true)

  return <AISupportChatbot isMinimized={isMinimized} onToggleMinimize={() => setIsMinimized(!isMinimized)} />
}
