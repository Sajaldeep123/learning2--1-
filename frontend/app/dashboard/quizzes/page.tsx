"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { QuizList } from "@/components/quiz-list"
import { QuizAttempt } from "@/components/quiz-attempt"
import { QuizResults } from "@/components/quiz-results"
import { Clock, Trophy, Target, TrendingUp, CheckCircle, Play } from "lucide-react"

export const dynamic = "force-dynamic"

export default function QuizzesPage() {
  const [activeTab, setActiveTab] = useState("available")
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null)
  const [quizMode, setQuizMode] = useState<"list" | "attempt" | "results">("list")

  // Mock data for demonstration
  const quizStats = {
    totalCompleted: 24,
    averageScore: 78,
    streak: 5,
    timeSpent: 120, // minutes
  }

  const handleStartQuiz = (quizId: string) => {
    setSelectedQuiz(quizId)
    setQuizMode("attempt")
  }

  const handleQuizComplete = (results: any) => {
    setQuizMode("results")
  }

  const handleBackToList = () => {
    setSelectedQuiz(null)
    setQuizMode("list")
  }

  if (quizMode === "attempt" && selectedQuiz) {
    return <QuizAttempt quizId={selectedQuiz} onComplete={handleQuizComplete} onBack={handleBackToList} />
  }

  if (quizMode === "results" && selectedQuiz) {
    return <QuizResults quizId={selectedQuiz} onBack={handleBackToList} />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quizzes</h1>
          <p className="text-muted-foreground">Test your knowledge and track your progress</p>
        </div>
        <Button className="bg-gradient-to-r from-indigo-600 to-purple-600">
          <Play className="w-4 h-4 mr-2" />
          Quick Practice
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">{quizStats.totalCompleted}</p>
                <p className="text-xs text-muted-foreground">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
                <Target className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">{quizStats.averageScore}%</p>
                <p className="text-xs text-muted-foreground">Avg Score</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                <Trophy className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">{quizStats.streak}</p>
                <p className="text-xs text-muted-foreground">Day Streak</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                <Clock className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">{quizStats.timeSpent}m</p>
                <p className="text-xs text-muted-foreground">Time Spent</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="available">Available</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="practice">Practice</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="available">
          <QuizList type="available" onStartQuiz={handleStartQuiz} />
        </TabsContent>

        <TabsContent value="completed">
          <QuizList type="completed" onStartQuiz={handleStartQuiz} />
        </TabsContent>

        <TabsContent value="practice">
          <QuizList type="practice" onStartQuiz={handleStartQuiz} />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quiz Analytics</CardTitle>
              <CardDescription>Track your quiz performance and identify areas for improvement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Analytics Coming Soon</h3>
                <p className="text-muted-foreground">
                  Detailed performance analytics and progress tracking will be available here.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
