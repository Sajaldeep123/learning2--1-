"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InterviewScheduler } from "@/components/interview-scheduler"
import { AIInterviewPractice } from "@/components/ai-interview-practice"
import { InterviewHistory } from "@/components/interview-history"
import { Calendar, Video, CheckCircle, Users, TrendingUp } from "lucide-react"

export const dynamic = "force-dynamic"

export default function InterviewsPage() {
  const [activeTab, setActiveTab] = useState("schedule")

  // Mock data for demonstration
  const interviewStats = {
    totalInterviews: 12,
    upcomingInterviews: 2,
    completedInterviews: 10,
    averageScore: 82,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mock Interviews</h1>
          <p className="text-muted-foreground">Practice with mentors or AI to ace your interviews</p>
        </div>
        <Button className="bg-gradient-to-r from-indigo-600 to-purple-600">
          <Video className="w-4 h-4 mr-2" />
          Quick AI Practice
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
                <Calendar className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">{interviewStats.upcomingInterviews}</p>
                <p className="text-xs text-muted-foreground">Upcoming</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">{interviewStats.completedInterviews}</p>
                <p className="text-xs text-muted-foreground">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">{interviewStats.averageScore}%</p>
                <p className="text-xs text-muted-foreground">Avg Score</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">{interviewStats.totalInterviews}</p>
                <p className="text-xs text-muted-foreground">Total Sessions</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="schedule">Schedule Interview</TabsTrigger>
          <TabsTrigger value="ai-practice">AI Practice</TabsTrigger>
          <TabsTrigger value="history">Interview History</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="schedule">
          <InterviewScheduler />
        </TabsContent>

        <TabsContent value="ai-practice">
          <AIInterviewPractice />
        </TabsContent>

        <TabsContent value="history">
          <InterviewHistory />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <TrendingUp className="w-12 h-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Interview Analytics</h3>
              <p className="text-muted-foreground text-center">
                Detailed performance analytics and improvement tracking coming soon.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
