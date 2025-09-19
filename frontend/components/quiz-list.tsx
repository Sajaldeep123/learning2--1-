"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Clock, Brain, Play, CheckCircle, Lock, AlertCircle } from "lucide-react"

interface Quiz {
  id: string
  title: string
  description: string
  category: string
  difficulty: "beginner" | "intermediate" | "advanced"
  questions: number
  timeLimit?: number
  attempts: number
  maxAttempts: number
  bestScore?: number
  status: "available" | "completed" | "locked" | "overdue"
  deadline?: string
  tags: string[]
}

interface QuizListProps {
  type: "available" | "completed" | "practice" | "all"
  onStartQuiz: (quizId: string) => void
}

export function QuizList({ type, onStartQuiz }: QuizListProps) {
  // Mock quiz data
  const quizzes: Quiz[] = [
    {
      id: "1",
      title: "JavaScript Fundamentals",
      description: "Test your knowledge of JavaScript basics including variables, functions, and control structures.",
      category: "Programming",
      difficulty: "beginner",
      questions: 20,
      timeLimit: 30,
      attempts: 2,
      maxAttempts: 3,
      bestScore: 85,
      status: "completed",
      tags: ["JavaScript", "Programming", "Web Development"],
    },
    {
      id: "2",
      title: "React Components & Hooks",
      description: "Advanced quiz covering React components, hooks, state management, and best practices.",
      category: "Frontend",
      difficulty: "intermediate",
      questions: 25,
      timeLimit: 45,
      attempts: 0,
      maxAttempts: 2,
      status: "available",
      deadline: "2024-01-25",
      tags: ["React", "Frontend", "Components"],
    },
    {
      id: "3",
      title: "Database Design Principles",
      description: "Comprehensive quiz on database design, normalization, and SQL optimization.",
      category: "Backend",
      difficulty: "advanced",
      questions: 30,
      timeLimit: 60,
      attempts: 1,
      maxAttempts: 2,
      bestScore: 72,
      status: "available",
      deadline: "2024-01-30",
      tags: ["Database", "SQL", "Backend"],
    },
    {
      id: "4",
      title: "System Design Basics",
      description: "Introduction to system design concepts, scalability, and architecture patterns.",
      category: "System Design",
      difficulty: "intermediate",
      questions: 15,
      attempts: 0,
      maxAttempts: 1,
      status: "locked",
      tags: ["System Design", "Architecture", "Scalability"],
    },
  ]

  const filteredQuizzes = quizzes.filter((quiz) => {
    switch (type) {
      case "available":
        return quiz.status === "available" || quiz.status === "overdue"
      case "completed":
        return quiz.status === "completed"
      case "practice":
        return quiz.maxAttempts > 3 // Practice quizzes have unlimited attempts
      default:
        return true
    }
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-500"
      case "intermediate":
        return "bg-yellow-500"
      case "advanced":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusIcon = (quiz: Quiz) => {
    switch (quiz.status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "locked":
        return <Lock className="w-4 h-4 text-gray-500" />
      case "overdue":
        return <AlertCircle className="w-4 h-4 text-red-500" />
      default:
        return <Play className="w-4 h-4 text-blue-500" />
    }
  }

  const getStatusText = (quiz: Quiz) => {
    switch (quiz.status) {
      case "completed":
        return `Best Score: ${quiz.bestScore}%`
      case "locked":
        return "Locked"
      case "overdue":
        return "Overdue"
      default:
        return `${quiz.attempts}/${quiz.maxAttempts} attempts`
    }
  }

  return (
    <div className="space-y-4">
      {filteredQuizzes.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Brain className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No quizzes found</h3>
            <p className="text-muted-foreground text-center">
              {type === "completed"
                ? "You haven't completed any quizzes yet. Start with available quizzes!"
                : "No quizzes available at the moment. Check back later!"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredQuizzes.map((quiz) => (
            <Card key={quiz.id} className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      {getStatusIcon(quiz)}
                      <CardTitle className="text-lg">{quiz.title}</CardTitle>
                    </div>
                    <CardDescription className="line-clamp-2">{quiz.description}</CardDescription>
                  </div>
                  <div className={`w-3 h-3 ${getDifficultyColor(quiz.difficulty)} rounded-full`} />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center space-x-1">
                      <Brain className="w-4 h-4" />
                      <span>{quiz.questions} questions</span>
                    </span>
                    {quiz.timeLimit && (
                      <span className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{quiz.timeLimit}min</span>
                      </span>
                    )}
                  </div>
                  <Badge variant="outline" className="capitalize">
                    {quiz.difficulty}
                  </Badge>
                </div>

                {quiz.deadline && (
                  <div className="text-sm text-muted-foreground">
                    Deadline: {new Date(quiz.deadline).toLocaleDateString()}
                  </div>
                )}

                {quiz.status === "completed" && quiz.bestScore && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Best Score</span>
                      <span className="font-semibold">{quiz.bestScore}%</span>
                    </div>
                    <Progress value={quiz.bestScore} className="h-2" />
                  </div>
                )}

                <div className="flex flex-wrap gap-1">
                  {quiz.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {quiz.tags.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{quiz.tags.length - 3} more
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm text-muted-foreground">{getStatusText(quiz)}</span>
                  <Button
                    onClick={() => onStartQuiz(quiz.id)}
                    disabled={
                      quiz.status === "locked" || (quiz.attempts >= quiz.maxAttempts && quiz.status !== "completed")
                    }
                    variant={quiz.status === "completed" ? "outline" : "default"}
                    size="sm"
                  >
                    {quiz.status === "completed" ? "Retake" : "Start Quiz"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
