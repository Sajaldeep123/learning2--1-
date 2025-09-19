"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Video, VideoOff, Mic, MicOff, Phone, Clock, Play, RotateCcw, CheckCircle, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface MockInterviewSessionProps {
  sessionId: string
  interviewType: "technical" | "behavioral" | "system_design"
  onSessionEnd?: (feedback: any) => void
}

interface Question {
  id: string
  text: string
  type: "technical" | "behavioral" | "system_design"
  difficulty: "easy" | "medium" | "hard"
  timeLimit?: number
}

export function MockInterviewSession({ sessionId, interviewType, onSessionEnd }: MockInterviewSessionProps) {
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isAudioOn, setIsAudioOn] = useState(true)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [isRecording, setIsRecording] = useState(false)
  const [sessionStarted, setSessionStarted] = useState(false)
  const [sessionEnded, setSessionEnded] = useState(false)
  const [userAnswer, setUserAnswer] = useState("")
  const [questions, setQuestions] = useState<Question[]>([])
  const [answers, setAnswers] = useState<{ questionId: string; answer: string; timeSpent: number }[]>([])

  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const questionStartTime = useRef<number>(0)
  const { toast } = useToast()

  useEffect(() => {
    // Load questions based on interview type
    loadQuestions()
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [interviewType])

  useEffect(() => {
    if (sessionStarted && !sessionEnded) {
      timerRef.current = setInterval(() => {
        setTimeElapsed((prev) => prev + 1)
      }, 1000)
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [sessionStarted, sessionEnded])

  const loadQuestions = () => {
    const questionSets = {
      technical: [
        {
          id: "tech-1",
          text: "Explain the difference between let, const, and var in JavaScript.",
          type: "technical" as const,
          difficulty: "easy" as const,
          timeLimit: 300,
        },
        {
          id: "tech-2",
          text: "How would you implement a function to reverse a linked list?",
          type: "technical" as const,
          difficulty: "medium" as const,
          timeLimit: 600,
        },
        {
          id: "tech-3",
          text: "Design a rate limiter for an API. What data structures and algorithms would you use?",
          type: "technical" as const,
          difficulty: "hard" as const,
          timeLimit: 900,
        },
      ],
      behavioral: [
        {
          id: "behav-1",
          text: "Tell me about a time when you had to work with a difficult team member. How did you handle it?",
          type: "behavioral" as const,
          difficulty: "medium" as const,
          timeLimit: 300,
        },
        {
          id: "behav-2",
          text: "Describe a situation where you had to learn a new technology quickly. What was your approach?",
          type: "behavioral" as const,
          difficulty: "medium" as const,
          timeLimit: 300,
        },
        {
          id: "behav-3",
          text: "Give me an example of a time when you had to make a decision with incomplete information.",
          type: "behavioral" as const,
          difficulty: "medium" as const,
          timeLimit: 300,
        },
      ],
      system_design: [
        {
          id: "sys-1",
          text: "Design a URL shortener like bit.ly. Consider scalability, reliability, and performance.",
          type: "system_design" as const,
          difficulty: "medium" as const,
          timeLimit: 1800,
        },
        {
          id: "sys-2",
          text: "How would you design a chat application like WhatsApp? Focus on real-time messaging and scalability.",
          type: "system_design" as const,
          difficulty: "hard" as const,
          timeLimit: 2400,
        },
      ],
    }

    setQuestions(questionSets[interviewType] || [])
  }

  const startSession = () => {
    setSessionStarted(true)
    setIsRecording(true)
    questionStartTime.current = Date.now()
    toast({
      title: "Interview Started",
      description: "Good luck! Take your time and think through your answers.",
    })
  }

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      // Save current answer
      const timeSpent = Math.floor((Date.now() - questionStartTime.current) / 1000)
      setAnswers((prev) => [
        ...prev,
        {
          questionId: questions[currentQuestionIndex].id,
          answer: userAnswer,
          timeSpent,
        },
      ])

      setCurrentQuestionIndex((prev) => prev + 1)
      setUserAnswer("")
      questionStartTime.current = Date.now()
    } else {
      endSession()
    }
  }

  const endSession = () => {
    // Save final answer
    const timeSpent = Math.floor((Date.now() - questionStartTime.current) / 1000)
    const finalAnswers = [
      ...answers,
      {
        questionId: questions[currentQuestionIndex].id,
        answer: userAnswer,
        timeSpent,
      },
    ]

    setSessionEnded(true)
    setIsRecording(false)

    const sessionData = {
      sessionId,
      interviewType,
      totalTime: timeElapsed,
      questionsAnswered: finalAnswers.length,
      answers: finalAnswers,
    }

    onSessionEnd?.(sessionData)

    toast({
      title: "Interview Completed",
      description: "Great job! Your responses have been recorded for review.",
    })
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "hard":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30"
    }
  }

  if (questions.length === 0) {
    return (
      <Card className="glass-card max-w-4xl mx-auto">
        <CardContent className="p-8 text-center">
          <AlertCircle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Loading Interview Questions</h3>
          <p className="text-slate-400">Preparing your mock interview session...</p>
        </CardContent>
      </Card>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Video className="w-6 h-6 text-indigo-400" />
              <span>Mock Interview - {interviewType.replace("_", " ").toUpperCase()}</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span className="font-mono">{formatTime(timeElapsed)}</span>
              </div>
              {isRecording && (
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-sm text-red-400">Recording</span>
                </div>
              )}
            </div>
          </CardTitle>
        </CardHeader>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Video/Controls Panel */}
        <div className="lg:col-span-1">
          <Card className="glass-card">
            <CardContent className="p-6">
              {/* Mock Video Area */}
              <div className="aspect-video bg-slate-800 rounded-lg mb-4 flex items-center justify-center">
                {isVideoOn ? (
                  <div className="text-center">
                    <Video className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                    <p className="text-sm text-slate-400">Camera Active</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <VideoOff className="w-12 h-12 text-slate-500 mx-auto mb-2" />
                    <p className="text-sm text-slate-500">Camera Off</p>
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="flex justify-center space-x-3 mb-4">
                <Button variant={isVideoOn ? "default" : "outline"} size="sm" onClick={() => setIsVideoOn(!isVideoOn)}>
                  {isVideoOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                </Button>
                <Button variant={isAudioOn ? "default" : "outline"} size="sm" onClick={() => setIsAudioOn(!isAudioOn)}>
                  {isAudioOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                </Button>
                {sessionStarted && !sessionEnded && (
                  <Button variant="destructive" size="sm" onClick={endSession}>
                    <Phone className="w-4 h-4" />
                  </Button>
                )}
              </div>

              {/* Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>
                    {currentQuestionIndex + 1} / {questions.length}
                  </span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-indigo-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Question Panel */}
        <div className="lg:col-span-2">
          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-3">
                  <span>Question {currentQuestionIndex + 1}</span>
                  <Badge className={getDifficultyColor(currentQuestion.difficulty)}>{currentQuestion.difficulty}</Badge>
                </CardTitle>
                {currentQuestion.timeLimit && (
                  <div className="text-sm text-slate-400">
                    Suggested time: {Math.floor(currentQuestion.timeLimit / 60)} minutes
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Question */}
              <div className="p-4 bg-slate-800/50 rounded-lg">
                <p className="text-lg leading-relaxed">{currentQuestion.text}</p>
              </div>

              {/* Answer Area */}
              <div>
                <label className="text-sm font-medium mb-3 block">Your Answer</label>
                <Textarea
                  placeholder="Type your answer here... You can also speak your answer aloud."
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  rows={8}
                  className="resize-none"
                />
              </div>

              {/* Actions */}
              <div className="flex justify-between">
                {!sessionStarted ? (
                  <Button onClick={startSession} className="w-full">
                    <Play className="w-4 h-4 mr-2" />
                    Start Interview
                  </Button>
                ) : sessionEnded ? (
                  <div className="w-full text-center">
                    <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-2" />
                    <p className="text-lg font-semibold text-green-400">Interview Completed!</p>
                    <p className="text-sm text-slate-400">Your responses have been recorded for review.</p>
                  </div>
                ) : (
                  <div className="flex space-x-3 w-full">
                    <Button variant="outline" onClick={() => setUserAnswer("")}>
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Clear Answer
                    </Button>
                    <Button onClick={nextQuestion} className="flex-1">
                      {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Finish Interview"}
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
