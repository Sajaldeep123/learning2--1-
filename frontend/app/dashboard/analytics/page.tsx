"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import { TrendingUp, Award, Target, BookOpen, Star, Trophy, Zap, Brain, Users } from "lucide-react"

export const dynamic = "force-dynamic"

const performanceData = [
  { month: "Jan", quizzes: 85, assignments: 78, interviews: 82 },
  { month: "Feb", quizzes: 88, assignments: 85, interviews: 85 },
  { month: "Mar", quizzes: 92, assignments: 89, interviews: 88 },
  { month: "Apr", quizzes: 89, assignments: 92, interviews: 91 },
  { month: "May", quizzes: 94, assignments: 88, interviews: 93 },
  { month: "Jun", quizzes: 96, assignments: 95, interviews: 95 },
]

const skillData = [
  { skill: "Technical Skills", current: 85, target: 90 },
  { skill: "Communication", current: 78, target: 85 },
  { skill: "Problem Solving", current: 92, target: 95 },
  { skill: "Leadership", current: 70, target: 80 },
  { skill: "Time Management", current: 88, target: 90 },
]

const activityData = [
  { name: "Quizzes Completed", value: 45, color: "#3b82f6" },
  { name: "Assignments Submitted", value: 28, color: "#10b981" },
  { name: "Mock Interviews", value: 12, color: "#f59e0b" },
  { name: "Resume Reviews", value: 8, color: "#ef4444" },
]

const radarData = [
  { subject: "Technical", A: 85, fullMark: 100 },
  { subject: "Communication", A: 78, fullMark: 100 },
  { subject: "Problem Solving", A: 92, fullMark: 100 },
  { subject: "Leadership", A: 70, fullMark: 100 },
  { subject: "Creativity", A: 82, fullMark: 100 },
  { subject: "Teamwork", A: 88, fullMark: 100 },
]

const badges = [
  { name: "Quiz Master", description: "Completed 50+ quizzes", icon: Brain, earned: true },
  { name: "Assignment Pro", description: "Submitted 25+ assignments", icon: BookOpen, earned: true },
  { name: "Interview Ace", description: "Completed 10+ mock interviews", icon: Users, earned: true },
  { name: "Streak Champion", description: "30-day learning streak", icon: Zap, earned: false },
  { name: "Top Performer", description: "Top 10% in monthly rankings", icon: Trophy, earned: false },
  { name: "Mentor's Choice", description: "Received excellent mentor feedback", icon: Star, earned: true },
]

export default function AnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("6months")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Progress Analytics
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Track your learning journey, identify strengths, and discover areas for improvement
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">92%</div>
              <p className="text-xs text-gray-600">+5% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Activities</CardTitle>
              <Target className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">93</div>
              <p className="text-xs text-gray-600">Quizzes, assignments & interviews</p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Study Streak</CardTitle>
              <Zap className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">23</div>
              <p className="text-xs text-gray-600">Days consecutive learning</p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Badges Earned</CardTitle>
              <Award className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">4/6</div>
              <p className="text-xs text-gray-600">Achievement unlocked</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Analytics */}
        <Tabs defaultValue="performance" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/70 backdrop-blur-sm">
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="skills">Skills Analysis</TabsTrigger>
            <TabsTrigger value="activity">Activity Breakdown</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="space-y-6">
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
                <CardDescription>Your progress across different learning activities</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="quizzes" stroke="#3b82f6" strokeWidth={2} name="Quizzes" />
                    <Line type="monotone" dataKey="assignments" stroke="#10b981" strokeWidth={2} name="Assignments" />
                    <Line type="monotone" dataKey="interviews" stroke="#f59e0b" strokeWidth={2} name="Interviews" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Recent Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">JavaScript Quiz</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      95%
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">React Assignment</span>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      88%
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Mock Interview</span>
                    <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                      92%
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">System Design Quiz</span>
                    <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                      87%
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Improvement Suggestions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900">Communication Skills</h4>
                    <p className="text-sm text-blue-700">Practice more behavioral interview questions</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-900">Technical Knowledge</h4>
                    <p className="text-sm text-green-700">Review data structures and algorithms</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <h4 className="font-medium text-purple-900">Leadership</h4>
                    <p className="text-sm text-purple-700">Take on more project management tasks</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Skill Progress</CardTitle>
                  <CardDescription>Current level vs target goals</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {skillData.map((skill, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{skill.skill}</span>
                        <span className="text-gray-600">
                          {skill.current}% / {skill.target}%
                        </span>
                      </div>
                      <Progress value={skill.current} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Skill Radar</CardTitle>
                  <CardDescription>Comprehensive skill assessment</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={radarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} />
                      <Radar name="Skills" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Activity Distribution</CardTitle>
                  <CardDescription>Breakdown of your learning activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={activityData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${((percent as number) * 100).toFixed(0)}%`}
                      >
                        {activityData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Weekly Activity</CardTitle>
                  <CardDescription>Your learning pattern this week</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={[
                        { day: "Mon", hours: 2.5 },
                        { day: "Tue", hours: 3.2 },
                        { day: "Wed", hours: 1.8 },
                        { day: "Thu", hours: 4.1 },
                        { day: "Fri", hours: 2.9 },
                        { day: "Sat", hours: 3.5 },
                        { day: "Sun", hours: 2.1 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="hours" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Badges & Achievements</CardTitle>
                <CardDescription>Your learning milestones and accomplishments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {badges.map((badge, index) => {
                    const IconComponent = badge.icon
                    return (
                      <div
                        key={index}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          badge.earned
                            ? "bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200"
                            : "bg-gray-50 border-gray-200 opacity-60"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-full ${badge.earned ? "bg-yellow-100" : "bg-gray-100"}`}>
                            <IconComponent
                              className={`h-6 w-6 ${badge.earned ? "text-yellow-600" : "text-gray-400"}`}
                            />
                          </div>
                          <div>
                            <h3 className={`font-semibold ${badge.earned ? "text-gray-900" : "text-gray-500"}`}>
                              {badge.name}
                            </h3>
                            <p className={`text-sm ${badge.earned ? "text-gray-600" : "text-gray-400"}`}>
                              {badge.description}
                            </p>
                          </div>
                        </div>
                        {badge.earned && (
                          <Badge className="mt-2 bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Earned</Badge>
                        )}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Leaderboard Position</CardTitle>
                <CardDescription>See how you rank among your peers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold">
                        7
                      </div>
                      <div>
                        <p className="font-semibold">Your Position</p>
                        <p className="text-sm text-gray-600">Out of 156 students</p>
                      </div>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800">Top 5%</Badge>
                  </div>

                  <div className="text-center py-4">
                    <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                      View Full Leaderboard
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
