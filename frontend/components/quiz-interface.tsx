"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Clock, CheckCircle, AlertCircle, ArrowLeft, ArrowRight, Flag, BookOpen } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Question {
  id: string
  question_text: string
  question_type: "multiple_choice" | "multiple_select" | "true_false" | "short_answer" | "essay"
  options?: string[]
  correct_answers: string[]
  points: number
  explanation?: string
}

interface Quiz {
  id: string
  title: string
  description: string
  time_limit: number // in minutes
  total_points: number
  questions: Question[]
  attempts_allowed: number
  passing_score: number
}

interface QuizInterfaceProps {
  quiz: Quiz
  onSubmit?: (answers: Record<string, string | string[]>, timeSpent: number) => void
  onExit?: () => void
}

export function QuizInterface({ quiz, onSubmit, onExit }: QuizInterfaceProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({})
  const [timeRemaining, setTimeRemaining] = useState(quiz.time_limit * 60) // in seconds
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<string>>(new Set())
  const [quizStarted, setQuizStarted] = useState(false)
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false)

  const { toast } = useToast()

  useEffect(() => {
    if (quizStarted && !quizSubmitted && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            handleSubmit()
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [quizStarted, quizSubmitted, timeRemaining])

  const currentQuestion = quiz.questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100
  const answeredQuestions = Object.keys(answers).length
  const totalQuestions = quiz.questions.length

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleAnswerChange = (questionId: string, answer: string | string[]) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }))
  }

  const handleMultipleChoice = (value: string) => {
    handleAnswerChange(currentQuestion.id, value)
  }

  const handleMultipleSelect = (option: string, checked: boolean) => {
    const currentAnswers = (answers[currentQuestion.id] as string[]) || []
    if (checked) {
      handleAnswerChange(currentQuestion.id, [...currentAnswers, option])
    } else {
      handleAnswerChange(
        currentQuestion.id,
        currentAnswers.filter((a) => a !== option),
      )
    }
  }

  const handleTextAnswer = (value: string) => {
    handleAnswerChange(currentQuestion.id, value)
  }

  const toggleFlag = (questionId: string) => {
    setFlaggedQuestions((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(questionId)) {
        newSet.delete(questionId)
      } else {
        newSet.add(questionId)
      }
      return newSet
    })
  }

  const goToQuestion = (index: number) => {
    setCurrentQuestionIndex(index)
  }

  const nextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    }
  }

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
    }
  }

  const handleSubmit = () => {
    const timeSpent = quiz.time_limit * 60 - timeRemaining
    setQuizSubmitted(true)
    onSubmit?.(answers, timeSpent)
    toast({
      title: "Quiz Submitted",
      description: "Your answers have been recorded. Results will be available shortly.",
    })
  }

  const startQuiz = () => {
    setQuizStarted(true)
    toast({
      title: "Quiz Started",
      description: `You have ${quiz.time_limit} minutes to complete this quiz.`,
    })
  }

  const renderQuestion = () => {
    const currentAnswer = answers[currentQuestion.id]

    switch (currentQuestion.question_type) {
      case "multiple_choice":
        return (
          <RadioGroup value={currentAnswer as string} onValueChange={handleMultipleChoice}>
            <div className="space-y-3">
              {currentQuestion.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        )

      case "multiple_select":
        return (
          <div className="space-y-3">
            {currentQuestion.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox
                  id={`option-${index}`}
                  checked={(currentAnswer as string[])?.includes(option) || false}
                  onCheckedChange={(checked) => handleMultipleSelect(option, checked as boolean)}
                />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </div>
        )

      case "true_false":
        return (
          <RadioGroup value={currentAnswer as string} onValueChange={handleMultipleChoice}>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="true" id="true" />
                <Label htmlFor="true" className="cursor-pointer">
                  True
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="false" id="false" />
                <Label htmlFor="false" className="cursor-pointer">
                  False
                </Label>
              </div>
            </div>
          </RadioGroup>
        )

      case "short_answer":
        return (
          <Textarea
            placeholder="Enter your answer here..."
            value={(currentAnswer as string) || ""}
            onChange={(e) => handleTextAnswer(e.target.value)}
            rows={3}
            className="resize-none"
          />
        )

      case "essay":
        return (
          <Textarea
            placeholder="Write your essay response here..."
            value={(currentAnswer as string) || ""}
            onChange={(e) => handleTextAnswer(e.target.value)}
            rows={8}
            className="resize-none"
          />
        )

      default:
        return <div>Unsupported question type</div>
    }
  }

  if (!quizStarted) {
    return (
      <Card className="glass-card max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <BookOpen className="w-6 h-6 text-indigo-400" />
            <span>{quiz.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-slate-300 leading-relaxed">{quiz.description}</p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Time Limit:</span>
                <Badge variant="outline">{quiz.time_limit} minutes</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Total Questions:</span>
                <Badge variant="outline">{quiz.questions.length}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Total Points:</span>
                <Badge variant="outline">{quiz.total_points}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Passing Score:</span>
                <Badge variant="outline">{quiz.passing_score}%</Badge>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Attempts Allowed:</span>
                <Badge variant="outline">{quiz.attempts_allowed}</Badge>
              </div>
              <div className="p-4 bg-slate-800/50 rounded-lg">
                <h4 className="font-medium mb-2">Instructions:</h4>
                <ul className="text-sm text-slate-300 space-y-1">
                  <li>• Read each question carefully</li>
                  <li>• You can flag questions for review</li>
                  <li>• Navigate between questions freely</li>
                  <li>• Submit before time runs out</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button onClick={startQuiz} className="flex-1">
              <Clock className="w-4 h-4 mr-2" />
              Start Quiz
            </Button>
            {onExit && (
              <Button variant="outline" onClick={onExit}>
                Exit
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (quizSubmitted) {
    return (
      <Card className="glass-card max-w-4xl mx-auto">
        <CardContent className="p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">Quiz Submitted Successfully!</h3>
          <p className="text-slate-400 mb-6">
            You answered {answeredQuestions} out of {totalQuestions} questions.
          </p>
          <div className="space-y-2 text-sm text-slate-300">
            <p>Time spent: {formatTime(quiz.time_limit * 60 - timeRemaining)}</p>
            <p>Your results will be processed and available in your dashboard shortly.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <Card className="glass-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-3">
              <BookOpen className="w-6 h-6 text-indigo-400" />
              <span>{quiz.title}</span>
            </CardTitle>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span className={`font-mono ${timeRemaining < 300 ? "text-red-400" : ""}`}>
                  {formatTime(timeRemaining)}
                </span>
              </div>
              <Badge variant="outline">
                {answeredQuestions}/{totalQuestions} answered
              </Badge>
            </div>
          </div>
          <Progress value={progress} className="mt-4" />
        </CardHeader>
      </Card>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Question Navigation */}
        <div className="lg:col-span-1">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg">Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 lg:grid-cols-4 gap-2">
                {quiz.questions.map((question, index) => (
                  <Button
                    key={question.id}
                    variant={index === currentQuestionIndex ? "default" : "outline"}
                    size="sm"
                    className={`relative ${answers[question.id] ? "border-green-500" : ""}`}
                    onClick={() => goToQuestion(index)}
                  >
                    {index + 1}
                    {flaggedQuestions.has(question.id) && (
                      <Flag className="w-3 h-3 absolute -top-1 -right-1 text-yellow-400" />
                    )}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Question Content */}
        <div className="lg:col-span-3">
          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-3">
                  <span>Question {currentQuestionIndex + 1}</span>
                  <Badge variant="secondary">{currentQuestion.points} points</Badge>
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleFlag(currentQuestion.id)}
                  className={flaggedQuestions.has(currentQuestion.id) ? "text-yellow-400" : ""}
                >
                  <Flag className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Question Text */}
              <div className="p-4 bg-slate-800/50 rounded-lg">
                <p className="text-lg leading-relaxed">{currentQuestion.question_text}</p>
              </div>

              {/* Answer Options */}
              <div>{renderQuestion()}</div>

              {/* Navigation */}
              <div className="flex justify-between items-center pt-4">
                <Button variant="outline" onClick={previousQuestion} disabled={currentQuestionIndex === 0}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>

                <div className="flex space-x-2">
                  {currentQuestionIndex === quiz.questions.length - 1 ? (
                    <Button onClick={() => setShowConfirmSubmit(true)} className="bg-green-600 hover:bg-green-700">
                      Submit Quiz
                    </Button>
                  ) : (
                    <Button onClick={nextQuestion}>
                      Next
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Confirm Submit Dialog */}
      {showConfirmSubmit && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="glass-card max-w-md mx-4">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-yellow-400" />
                <span>Submit Quiz?</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Are you sure you want to submit your quiz? You cannot change your answers after submission.</p>
              <div className="text-sm text-slate-400">
                <p>
                  Questions answered: {answeredQuestions}/{totalQuestions}
                </p>
                <p>Time remaining: {formatTime(timeRemaining)}</p>
              </div>
              <div className="flex space-x-3">
                <Button onClick={handleSubmit} className="flex-1">
                  Yes, Submit
                </Button>
                <Button variant="outline" onClick={() => setShowConfirmSubmit(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
