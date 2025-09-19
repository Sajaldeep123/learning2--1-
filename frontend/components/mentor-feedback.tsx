"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, ThumbsUp, MessageCircle, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FeedbackItem {
  id: string
  mentorName: string
  mentorAvatar?: string
  mentorExpertise: string
  rating: number
  feedback: string
  timestamp: string
  category: "resume" | "interview" | "career" | "skills"
  helpful: number
  studentResponse?: string
}

interface MentorProfile {
  id: string
  name: string
  avatar?: string
  expertise: string[]
  rating: number
  totalReviews: number
  responseTime: string
  successRate: number
}

export function MentorFeedback() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [newFeedback, setNewFeedback] = useState("")
  const [selectedMentor, setSelectedMentor] = useState<string | null>(null)

  const feedbackItems: FeedbackItem[] = [
    {
      id: "1",
      mentorName: "Dr. Sarah Johnson",
      mentorExpertise: "Software Engineering",
      rating: 5,
      feedback:
        "Your resume shows strong technical skills, but I'd recommend adding more quantifiable achievements. For example, instead of 'improved system performance,' try 'improved system performance by 40% through database optimization.' Also, consider adding a brief summary section at the top highlighting your key strengths.",
      timestamp: "2 days ago",
      category: "resume",
      helpful: 12,
      studentResponse:
        "Thank you! I've updated my resume with specific metrics and it's already getting more responses.",
    },
    {
      id: "2",
      mentorName: "Rajesh Kumar",
      mentorExpertise: "Data Science",
      rating: 4,
      feedback:
        "Great progress on your Python skills! For your next steps, I'd suggest focusing on advanced machine learning algorithms and working on a portfolio project that demonstrates end-to-end ML pipeline development. Consider participating in Kaggle competitions to showcase your skills.",
      timestamp: "1 week ago",
      category: "skills",
      helpful: 8,
    },
    {
      id: "3",
      mentorName: "Priya Sharma",
      mentorExpertise: "Product Management",
      rating: 5,
      feedback:
        "Your interview preparation is solid, but work on structuring your answers using the STAR method (Situation, Task, Action, Result). Practice explaining complex technical concepts in simple terms, as you'll often need to communicate with non-technical stakeholders.",
      timestamp: "3 days ago",
      category: "interview",
      helpful: 15,
    },
  ]

  const mentors: MentorProfile[] = [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      expertise: ["Software Engineering", "System Design", "Career Guidance"],
      rating: 4.9,
      totalReviews: 127,
      responseTime: "< 2 hours",
      successRate: 94,
    },
    {
      id: "2",
      name: "Rajesh Kumar",
      expertise: ["Data Science", "Machine Learning", "Python"],
      rating: 4.8,
      totalReviews: 89,
      responseTime: "< 4 hours",
      successRate: 91,
    },
    {
      id: "3",
      name: "Priya Sharma",
      expertise: ["Product Management", "Strategy", "Leadership"],
      rating: 4.9,
      totalReviews: 156,
      responseTime: "< 1 hour",
      successRate: 96,
    },
  ]

  const filteredFeedback = feedbackItems.filter((item) => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    const matchesSearch =
      item.feedback.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.mentorName.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "resume":
        return "bg-blue-500/10 text-blue-400"
      case "interview":
        return "bg-green-500/10 text-green-400"
      case "career":
        return "bg-purple-500/10 text-purple-400"
      case "skills":
        return "bg-orange-500/10 text-orange-400"
      default:
        return "bg-gray-500/10 text-gray-400"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold mb-2">Mentor Feedback</h2>
          <p className="text-muted-foreground">
            Get personalized guidance from industry experts to accelerate your career growth
          </p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
          <MessageCircle className="w-4 h-4 mr-2" />
          Request New Feedback
        </Button>
      </div>

      {/* Filters */}
      <Card className="glass-card">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search feedback..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="resume">Resume</SelectItem>
                <SelectItem value="interview">Interview</SelectItem>
                <SelectItem value="career">Career</SelectItem>
                <SelectItem value="skills">Skills</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Feedback List */}
        <div className="lg:col-span-2 space-y-4">
          {filteredFeedback.map((item) => (
            <Card key={item.id} className="glass-card">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={item.mentorAvatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {item.mentorName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold">{item.mentorName}</h4>
                      <p className="text-sm text-muted-foreground">{item.mentorExpertise}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex">{renderStars(item.rating)}</div>
                        <span className="text-xs text-muted-foreground">{item.timestamp}</span>
                      </div>
                    </div>
                  </div>
                  <Badge className={getCategoryColor(item.category)}>{item.category}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed mb-4">{item.feedback}</p>

                {item.studentResponse && (
                  <div className="bg-card/50 rounded-lg p-3 mb-4">
                    <p className="text-xs text-muted-foreground mb-1">Your response:</p>
                    <p className="text-sm">{item.studentResponse}</p>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button size="sm" variant="ghost" className="text-muted-foreground">
                      <ThumbsUp className="w-4 h-4 mr-1" />
                      {item.helpful} helpful
                    </Button>
                    <Button size="sm" variant="ghost" className="text-muted-foreground">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      Reply
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Top Mentors Sidebar */}
        <div className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg">Top Mentors</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mentors.map((mentor) => (
                <div key={mentor.id} className="p-3 rounded-lg bg-card/50 space-y-3">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={mentor.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {mentor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{mentor.name}</h4>
                      <div className="flex items-center space-x-1">
                        <div className="flex">{renderStars(Math.floor(mentor.rating))}</div>
                        <span className="text-xs text-muted-foreground">
                          {mentor.rating} ({mentor.totalReviews})
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-1">
                      {mentor.expertise.slice(0, 2).map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {mentor.expertise.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{mentor.expertise.length - 2}
                        </Badge>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-muted-foreground">Response:</span>
                        <span className="ml-1 text-green-400">{mentor.responseTime}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Success:</span>
                        <span className="ml-1 text-blue-400">{mentor.successRate}%</span>
                      </div>
                    </div>
                  </div>

                  <Button size="sm" className="w-full">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Connect
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg">Your Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Feedback Received</span>
                  <span className="font-bold text-blue-400">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Avg Rating</span>
                  <span className="font-bold text-yellow-400">4.7/5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Improvements Made</span>
                  <span className="font-bold text-green-400">8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Active Mentors</span>
                  <span className="font-bold text-purple-400">3</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
