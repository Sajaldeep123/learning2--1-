"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Calendar, Video, Brain, Star, Play, Download, MessageSquare, Clock } from "lucide-react"

interface InterviewSession {
  id: string
  type: "mentor" | "ai"
  title: string
  mentor?: {
    name: string
    avatar?: string
    company: string
  }
  date: string
  duration: number
  status: "completed" | "upcoming" | "cancelled"
  score?: number
  feedback?: string
  recording?: string
  category: string
  role: string
}

export function InterviewHistory() {
  const [activeTab, setActiveTab] = useState("all")

  // Mock interview history data
  const interviews: InterviewSession[] = [
    {
      id: "1",
      type: "mentor",
      title: "Technical Interview Practice",
      mentor: {
        name: "Sarah Johnson",
        company: "Google",
        avatar: "/placeholder.svg",
      },
      date: "2024-01-15",
      duration: 45,
      status: "completed",
      score: 88,
      feedback: "Great problem-solving approach! Work on explaining your thought process more clearly during coding.",
      recording: "/interview-recording-1.mp4",
      category: "Technical",
      role: "Software Engineer",
    },
    {
      id: "2",
      type: "ai",
      title: "Behavioral Interview Practice",
      date: "2024-01-12",
      duration: 30,
      status: "completed",
      score: 82,
      feedback: "Good use of STAR method. Consider providing more specific metrics in your examples.",
      category: "Behavioral",
      role: "Product Manager",
    },
    {
      id: "3",
      type: "mentor",
      title: "System Design Interview",
      mentor: {
        name: "Michael Chen",
        company: "Microsoft",
        avatar: "/placeholder.svg",
      },
      date: "2024-01-20",
      duration: 60,
      status: "upcoming",
      category: "System Design",
      role: "Senior Engineer",
    },
    {
      id: "4",
      type: "ai",
      title: "Leadership Interview Practice",
      date: "2024-01-08",
      duration: 40,
      status: "completed",
      score: 75,
      feedback: "Good leadership examples. Focus on demonstrating measurable impact of your decisions.",
      category: "Leadership",
      role: "Engineering Manager",
    },
  ]

  const filteredInterviews = interviews.filter((interview) => {
    switch (activeTab) {
      case "completed":
        return interview.status === "completed"
      case "upcoming":
        return interview.status === "upcoming"
      case "mentor":
        return interview.type === "mentor"
      case "ai":
        return interview.type === "ai"
      default:
        return true
    }
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500"
      case "upcoming":
        return "bg-blue-500"
      case "cancelled":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getTypeIcon = (type: string) => {
    return type === "mentor" ? <Video className="w-4 h-4" /> : <Brain className="w-4 h-4" />
  }

  const renderStars = (score: number) => {
    const rating = score / 20 // Convert score to 5-star rating
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : i < rating
              ? "fill-yellow-400/50 text-yellow-400"
              : "text-gray-300"
        }`}
      />
    ))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Interview History</h2>
          <p className="text-muted-foreground">Review your past interviews and track your progress</p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Interviews</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="mentor">Mentor Sessions</TabsTrigger>
          <TabsTrigger value="ai">AI Practice</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {filteredInterviews.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Calendar className="w-12 h-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No interviews found</h3>
                <p className="text-muted-foreground text-center">
                  {activeTab === "upcoming"
                    ? "No upcoming interviews scheduled."
                    : "Start practicing with AI or book a mentor session!"}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredInterviews.map((interview) => (
                <Card key={interview.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-10 h-10 ${getStatusColor(interview.status)} rounded-lg flex items-center justify-center`}
                        >
                          <div className="text-white">{getTypeIcon(interview.type)}</div>
                        </div>
                        <div>
                          <CardTitle className="text-lg">{interview.title}</CardTitle>
                          <CardDescription>
                            {interview.category} • {interview.role}
                            {interview.mentor && ` • with ${interview.mentor.name}`}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge variant="outline" className="capitalize">
                        {interview.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(interview.date).toLocaleDateString()}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{interview.duration} minutes</span>
                        </span>
                      </div>
                      {interview.score && (
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold">{interview.score}%</span>
                          <div className="flex space-x-1">{renderStars(interview.score)}</div>
                        </div>
                      )}
                    </div>

                    {interview.mentor && (
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={interview.mentor.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {interview.mentor.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{interview.mentor.name}</p>
                          <p className="text-xs text-muted-foreground">{interview.mentor.company}</p>
                        </div>
                      </div>
                    )}

                    {interview.score && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Performance Score</span>
                          <span className="font-semibold">{interview.score}%</span>
                        </div>
                        <Progress value={interview.score} className="h-2" />
                      </div>
                    )}

                    {interview.feedback && (
                      <div className="bg-muted p-3 rounded-lg">
                        <h4 className="text-sm font-semibold mb-1">Feedback</h4>
                        <p className="text-sm text-muted-foreground">{interview.feedback}</p>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="flex space-x-2">
                        {interview.recording && (
                          <Button variant="outline" size="sm">
                            <Play className="w-4 h-4 mr-1" />
                            Watch Recording
                          </Button>
                        )}
                        {interview.status === "completed" && (
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-1" />
                            Download Report
                          </Button>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        {interview.status === "upcoming" && (
                          <>
                            <Button variant="outline" size="sm">
                              Reschedule
                            </Button>
                            <Button size="sm">
                              <Video className="w-4 h-4 mr-1" />
                              Join Interview
                            </Button>
                          </>
                        )}
                        {interview.status === "completed" && interview.type === "mentor" && (
                          <Button variant="outline" size="sm">
                            <MessageSquare className="w-4 h-4 mr-1" />
                            Message Mentor
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
