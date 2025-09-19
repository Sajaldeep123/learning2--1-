"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Clock, ArrowLeft, ArrowRight, Flag, CheckCircle } from "lucide-react"

interface Question {
  id: string
  type: "multiple-choice" | "true-false" | "short-answer"
  question: string
  options?: string[]
  correctAnswer?: string
  explanation?: string
}

interface QuizAttemptProps {
  quizId: string
  onComplete: (results: any) => void
  onBack: () => void
}

export function QuizAttempt({ quizId, onComplete, onBack }: QuizAttemptProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [timeLeft, setTimeLeft] = useState(1800) // 30 minutes in seconds
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set())

  // Mock quiz data
  const quiz = {
    id: quizId,
    title: "JavaScript Fundamentals",
    timeLimit: 30,
    questions: [
      {
        id: "1",
        type: "multiple-choice" as const,
        question: "What is the correct way to declare a variable in JavaScript?",
        options: ["var myVar = 5;", "variable myVar = 5;", "v myVar = 5;", "declare myVar = 5;"],
        correctAnswer: "var myVar = 5;",
      },
      {
        id: "2",
        type: "true-false" as const,
        question: "JavaScript is a statically typed language.",
        options: ["True", "False"],
        correctAnswer: "False",
      },
      {
        id: "3",
        type: "short-answer" as const,
        question: 'Explain the difference between "let" and "var" in JavaScript.',
      },
      {
        id: "4",
        type: "multiple-choice" as const,
        question: "Which method is used to add an element to the end of an array?",
        options: ["push()", "pop()", "shift()", "unshift()"],
        correctAnswer: "push()",
      },
      {
        id: "5",
        type: "true-false" as const,
        question: 'The "===" operator checks for both value and type equality.',
        options: ["True", "False"],
        correctAnswer: "True",
      },
    ],
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmit()
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

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }))
  }

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }

  const handleFlag = () => {
    setFlaggedQuestions((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(currentQuestion)) {
        newSet.delete(currentQuestion)
      } else {
        newSet.add(currentQuestion)
      }
      return newSet
    })
  }

  const handleSubmit = () => {
    const results = {
      quizId,
      answers,
      timeSpent: 30 * 60 - timeLeft,
      flaggedQuestions: Array.from(flaggedQuestions),
    }
    onComplete(results)
  }

  const currentQ = quiz.questions[currentQuestion]
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100
  const answeredCount = Object.keys(answers).length

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Quizzes
        </Button>
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>{formatTime(timeLeft)}</span>
          </Badge>
          <Badge variant="secondary">
            {answeredCount}/{quiz.questions.length} answered
          </Badge>
        </div>
      </div>

      {/* Progress */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold">{quiz.title}</h2>
            <span className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {quiz.questions.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </CardContent>
      </Card>

      {/* Question */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-xl mb-2">{currentQ.question}</CardTitle>
              <CardDescription>
                {currentQ.type === "multiple-choice" && "Select one answer"}
                {currentQ.type === "true-false" && "Select True or False"}
                {currentQ.type === "short-answer" && "Provide a brief answer"}
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleFlag}
              className={flaggedQuestions.has(currentQuestion) ? "text-yellow-500" : ""}
            >
              <Flag className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentQ.type === "multiple-choice" && currentQ.options && (
            <RadioGroup
              value={answers[currentQ.id] || ""}
              onValueChange={(value) => handleAnswerChange(currentQ.id, value)}
            >
              {currentQ.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}

          {currentQ.type === "true-false" && currentQ.options && (
            <RadioGroup
              value={answers[currentQ.id] || ""}
              onValueChange={(value) => handleAnswerChange(currentQ.id, value)}
            >
              {currentQ.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}

          {currentQ.type === "short-answer" && (
            <Textarea
              placeholder="Type your answer here..."
              value={answers[currentQ.id] || ""}
              onChange={(e) => handleAnswerChange(currentQ.id, e.target.value)}
              rows={4}
            />
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>

        <div className="flex space-x-2">
          {quiz.questions.map((_, index) => (
            <Button
              key={index}
              variant={index === currentQuestion ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentQuestion(index)}
              className={`w-10 h-10 p-0 ${answers[quiz.questions[index].id] ? "bg-green-100 border-green-300" : ""} ${
                flaggedQuestions.has(index) ? "bg-yellow-100 border-yellow-300" : ""
              }`}
            >
              {index + 1}
              {answers[quiz.questions[index].id] && (
                <CheckCircle className="w-3 h-3 absolute -top-1 -right-1 text-green-600" />
              )}
            </Button>
          ))}
        </div>

        {currentQuestion === quiz.questions.length - 1 ? (
          <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
            Submit Quiz
          </Button>
        ) : (
          <Button onClick={handleNext}>
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  )
}
