"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Users,
  Calendar,
  FileText,
  MessageCircle,
  Star,
  Clock,
  CheckCircle,
  TrendingUp,
  Award,
  BookOpen,
  Video,
} from "lucide-react"

interface Student {
  id: string
  name: string
  email: string
  field: string
  level: string
  resumeScore: number
  lastActivity: string
  status: "active" | "pending" | "completed"
  avatar?: string
}

interface MentorshipRequest {
  id: string
  studentName: string
  field: string
  requestType: "resume_review" | "career_guidance" | "interview_prep" | "skill_development"
  urgency: "low" | "medium" | "high"
  submittedAt: string
  description: string
}

export function MentorDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const students: Student[] = [
    {
      id: "1",
      name: "Rahul Sharma",
      email: "rahul@example.com",
      field: "Software Development",
      level: "Beginner",
      resumeScore: 78,
      lastActivity: "2 hours ago",
      status: "active",
    },
    {
      id: "2",
      name: "Priya Patel",
      email: "priya@example.com",
      field: "Data Science",
      level: "Intermediate",
      resumeScore: 85,
      lastActivity: "1 day ago",
      status: "pending",
    },
    {
      id: "3",
      name: "Amit Kumar",
      email: "amit@example.com",
      field: "UI/UX Design",
      level: "Advanced",
      resumeScore: 92,
      lastActivity: "3 days ago",
      status: "completed",
    },
  ]

  const mentorshipRequests: MentorshipRequest[] = [
    {
      id: "1",
      studentName: "Rahul Sharma",
      field: "Software Development",
      requestType: "resume_review",
      urgency: "high",
      submittedAt: "2 hours ago",
      description: "Need help optimizing my resume for frontend developer positions",
    },
    {
      id: "2",
      studentName: "Sneha Gupta",
      field: "Data Science",
      requestType: "interview_prep",
      urgency: "medium",
      submittedAt: "5 hours ago",
      description: "Preparing for technical interviews at top tech companies",
    },
    {
      id: "3",
      studentName: "Vikash Singh",
      field: "Digital Marketing",
      requestType: "career_guidance",
      urgency: "low",
      submittedAt: "1 day ago",
      description: "Confused about career path in digital marketing vs growth hacking",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "pending":
        return "bg-yellow-500"
      case "completed":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high":
        return "text-red-400 bg-red-400/10"
      case "medium":
        return "text-yellow-400 bg-yellow-400/10"
      case "low":
        return "text-green-400 bg-green-400/10"
      default:
        return "text-gray-400 bg-gray-400/10"
    }
  }

  const getRequestTypeIcon = (type: string) => {
    switch (type) {
      case "resume_review":
        return <FileText className="w-4 h-4" />
      case "career_guidance":
        return <BookOpen className="w-4 h-4" />
      case "interview_prep":
        return <Video className="w-4 h-4" />
      case "skill_development":
        return <TrendingUp className="w-4 h-4" />
      default:
        return <MessageCircle className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { icon: Users, label: "Active Students", value: "24", color: "text-blue-400" },
          { icon: Calendar, label: "Sessions This Week", value: "12", color: "text-green-400" },
          { icon: Star, label: "Average Rating", value: "4.9", color: "text-yellow-400" },
          { icon: Award, label: "Success Rate", value: "94%", color: "text-purple-400" },
        ].map((stat, index) => (
          <Card key={index} className="glass-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Dashboard */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="students">My Students</TabsTrigger>
          <TabsTrigger value="requests">New Requests</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>Recent Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { action: "Resume reviewed", student: "Rahul Sharma", time: "2 hours ago", type: "review" },
                    { action: "Session completed", student: "Priya Patel", time: "1 day ago", type: "session" },
                    { action: "Feedback provided", student: "Amit Kumar", time: "2 days ago", type: "feedback" },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-card/50">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          activity.type === "review"
                            ? "bg-blue-400"
                            : activity.type === "session"
                              ? "bg-green-400"
                              : "bg-yellow-400"
                        }`}
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.student}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>This Month's Impact</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Students Helped</span>
                    <span className="font-bold text-blue-400">32</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Avg. Resume Score Improvement</span>
                    <span className="font-bold text-green-400">+18%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Interview Success Rate</span>
                    <span className="font-bold text-purple-400">87%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Student Satisfaction</span>
                    <span className="font-bold text-yellow-400">4.9/5</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="students" className="space-y-4">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>My Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {students.map((student) => (
                  <div key={student.id} className="flex items-center justify-between p-4 rounded-lg bg-card/50">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={student.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {student.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">{student.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {student.field} • {student.level}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">Resume Score: {student.resumeScore}%</p>
                        <p className="text-xs text-muted-foreground">Last active: {student.lastActivity}</p>
                      </div>
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(student.status)}`} />
                      <Button size="sm" variant="outline">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Message
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requests" className="space-y-4">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>New Mentorship Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mentorshipRequests.map((request) => (
                  <div key={request.id} className="p-4 rounded-lg bg-card/50 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {getRequestTypeIcon(request.requestType)}
                        <div>
                          <h4 className="font-medium">{request.studentName}</h4>
                          <p className="text-sm text-muted-foreground">{request.field}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getUrgencyColor(request.urgency)}>{request.urgency} priority</Badge>
                        <span className="text-xs text-muted-foreground">{request.submittedAt}</span>
                      </div>
                    </div>
                    <p className="text-sm">{request.description}</p>
                    <div className="flex space-x-2">
                      <Button size="sm">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Accept
                      </Button>
                      <Button size="sm" variant="outline">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Message
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Upcoming Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { time: "10:00 AM", student: "Rahul Sharma", type: "Resume Review", duration: "30 min" },
                  { time: "2:00 PM", student: "Priya Patel", type: "Career Guidance", duration: "45 min" },
                  { time: "4:30 PM", student: "Amit Kumar", type: "Interview Prep", duration: "60 min" },
                ].map((session, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-card/50">
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <p className="font-bold text-primary">{session.time}</p>
                        <p className="text-xs text-muted-foreground">{session.duration}</p>
                      </div>
                      <div>
                        <h4 className="font-medium">{session.student}</h4>
                        <p className="text-sm text-muted-foreground">{session.type}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Video className="w-4 h-4 mr-2" />
                        Join
                      </Button>
                      <Button size="sm" variant="outline">
                        <Calendar className="w-4 h-4 mr-2" />
                        Reschedule
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
