"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Brain, Mic, MicOff, Video, VideoOff, ArrowRight, Clock, Flag } from "lucide-react"

interface InterviewTemplate {
  id: string
  title: string
  description: string
  category: string
  difficulty: "beginner" | "intermediate" | "advanced"
  duration: number
  questionCount: number
  icon: React.ReactNode
  color: string
}

interface AIInterviewSessionProps {
  template: InterviewTemplate
  role: string
  level: string
  onEnd: () => void
}

interface Question {
  id: string
  question: string
  type: "behavioral" | "technical" | "situational"
  followUp?: string
}

export function AIInterviewSession({ template, role, level, onEnd }: AIInterviewSessionProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [timeLeft, setTimeLeft] = useState(template.duration * 60) // Convert to seconds
  const [isRecording, setIsRecording] = useState(false)
  const [isMicOn, setIsMicOn] = useState(true)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [answer, setAnswer] = useState("")
  const [answers, setAnswers] = useState<Record<string, string>>({})

  // Mock questions based on template
  const questions: Question[] = [
    {
      id: "1",
      question: "Tell me about yourself and why you're interested in this role.",
      type: "behavioral",
    },
    {
      id: "2",
      question: "Describe a challenging project you worked on and how you overcame obstacles.",
      type: "behavioral",
      followUp: "What would you do differently if you faced a similar situation again?",
    },
    {
      id: "3",
      question: "How do you handle working under pressure and tight deadlines?",
      type: "situational",
    },
    {
      id: "4",
      question: "What are your greatest strengths and how do they apply to this role?",
      type: "behavioral",
    },
    {
      id: "5",
      question: "Where do you see yourself in 5 years?",
      type: "behavioral",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleEndSession()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const handleNextQuestion = () => {
    // Save current answer
    setAnswers((prev) => ({
      ...prev,
      [questions[currentQuestion].id]: answer,
    }))

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
      setAnswer("")
    } else {
      handleEndSession()
    }
  }

  const handleEndSession = () => {
    // Save final answer if exists
    if (answer) {
      setAnswers((prev) => ({
        ...prev,
        [questions[currentQuestion].id]: answer,
      }))
    }

    // Process results and show feedback
    onEnd()
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100
  const currentQ = questions[currentQuestion]

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`w-10 h-10 ${template.color} rounded-lg flex items-center justify-center`}>
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">{template.title}</h2>
                <p className="text-sm text-muted-foreground">
                  {role} • {level} level
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{formatTime(timeLeft)}</span>
              </Badge>
              <Badge variant="secondary">
                {currentQuestion + 1}/{questions.length}
              </Badge>
            </div>
          </div>
          <div className="mt-4">
            <Progress value={progress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Video/Audio Controls */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">{isRecording ? "Recording in progress" : "Ready to record"}</span>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsMicOn(!isMicOn)}
                className={!isMicOn ? "bg-red-100 border-red-300" : ""}
              >
                {isMicOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsVideoOn(!isVideoOn)}
                className={!isVideoOn ? "bg-red-100 border-red-300" : ""}
              >
                {isVideoOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
              </Button>
              <Button variant={isRecording ? "destructive" : "default"} onClick={() => setIsRecording(!isRecording)}>
                {isRecording ? "Stop Recording" : "Start Recording"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Question */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-xl mb-2">Question {currentQuestion + 1}</CardTitle>
              <CardDescription className="text-lg leading-relaxed">{currentQ.question}</CardDescription>
            </div>
            <Button variant="ghost" size="icon">
              <Flag className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentQ.followUp && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-blue-800">
                <strong>Follow-up:</strong> {currentQ.followUp}
              </p>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium">Your Response</label>
            <Textarea
              placeholder="Type your answer here or use voice recording..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              rows={6}
              className="resize-none"
            />
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <h4 className="text-sm font-semibold mb-2">💡 Tips for this question:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              {currentQ.type === "behavioral" && (
                <>
                  <li>• Use the STAR method (Situation, Task, Action, Result)</li>
                  <li>• Provide specific examples with measurable outcomes</li>
                  <li>• Keep your answer concise but detailed</li>
                </>
              )}
              {currentQ.type === "technical" && (
                <>
                  <li>• Explain your thought process step by step</li>
                  <li>• Consider edge cases and trade-offs</li>
                  <li>• Ask clarifying questions if needed</li>
                </>
              )}
              {currentQ.type === "situational" && (
                <>
                  <li>• Think about real scenarios you've experienced</li>
                  <li>• Show your problem-solving approach</li>
                  <li>• Demonstrate leadership and initiative</li>
                </>
              )}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={handleEndSession}>
          End Session
        </Button>

        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            Question {currentQuestion + 1} of {questions.length}
          </span>
        </div>

        <Button
          onClick={handleNextQuestion}
          disabled={!answer.trim()}
          className="bg-gradient-to-r from-indigo-600 to-purple-600"
        >
          {currentQuestion === questions.length - 1 ? "Finish Interview" : "Next Question"}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      {/* AI Feedback Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center space-x-2">
            <Brain className="w-5 h-5" />
            <span>Real-time AI Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">Good</div>
              <div className="text-xs text-muted-foreground">Clarity</div>
              <Progress value={75} className="h-2 mt-2" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">Excellent</div>
              <div className="text-xs text-muted-foreground">Confidence</div>
              <Progress value={90} className="h-2 mt-2" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600 mb-1">Fair</div>
              <div className="text-xs text-muted-foreground">Structure</div>
              <Progress value={60} className="h-2 mt-2" />
            </div>
          </div>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>AI Tip:</strong> Try to provide more specific examples with quantifiable results to strengthen
              your answer.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
