"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import {
  Star,
  MessageSquare,
  Download,
  Calendar,
  ThumbsUp,
  Mic,
  Video,
  FileText,
  TrendingUp,
  Target,
  Users,
} from "lucide-react"

interface DetailedFeedback {
  id: string
  mentorName: string
  mentorAvatar?: string
  mentorTitle: string
  mentorExpertise: string[]
  date: string
  type: "resume" | "interview" | "portfolio" | "assignment"

  // Structured category ratings
  categoryRatings: {
    format: { score: number; feedback: string; suggestions: string[] }
    content: { score: number; feedback: string; suggestions: string[] }
    relevance: { score: number; feedback: string; suggestions: string[] }
    impact: { score: number; feedback: string; suggestions: string[] }
    presentation: { score: number; feedback: string; suggestions: string[] }
    technical: { score: number; feedback: string; suggestions: string[] }
  }

  overallRating: number
  overallFeedback: string

  // Multi-format feedback
  textFeedback: string
  audioFeedback?: {
    url: string
    duration: string
    transcript?: string
  }
  videoFeedback?: {
    url: string
    duration: string
    thumbnail?: string
  }

  // Action items and follow-up
  actionItems: Array<{
    priority: "high" | "medium" | "low"
    task: string
    deadline?: string
    completed: boolean
  }>

  // Mentor notes
  privateNotes?: string
  publicNotes?: string

  status: "pending" | "completed" | "in-review" | "follow-up-needed"
  helpful: number
  studentResponse?: string
  followUpScheduled?: boolean
}

export function EnhancedMentorFeedback() {
  const [activeTab, setActiveTab] = useState("all")
  const [selectedFeedback, setSelectedFeedback] = useState<string | null>(null)
  const [newResponse, setNewResponse] = useState("")

  // Enhanced mock feedback data
  const feedbackItems: DetailedFeedback[] = [
    {
      id: "1",
      mentorName: "Sarah Johnson",
      mentorTitle: "Senior Software Engineer at Google",
      mentorExpertise: ["Software Engineering", "System Design", "Career Guidance"],
      date: "2024-01-15",
      type: "resume",
      categoryRatings: {
        format: {
          score: 4.5,
          feedback: "Clean, professional layout with good use of whitespace. Font choices are appropriate.",
          suggestions: [
            "Consider using bullet points more consistently",
            "Align dates to the right for better readability",
          ],
        },
        content: {
          score: 4.0,
          feedback: "Strong technical content with relevant experience highlighted.",
          suggestions: ["Add more quantified achievements", "Include specific technologies used in each role"],
        },
        relevance: {
          score: 4.2,
          feedback: "Experience aligns well with target software engineering roles.",
          suggestions: ["Emphasize full-stack development experience", "Add more details about scalability challenges"],
        },
        impact: {
          score: 3.8,
          feedback: "Some good examples of impact, but could be more specific.",
          suggestions: [
            "Include specific metrics (performance improvements, user growth)",
            "Quantify cost savings or efficiency gains",
          ],
        },
        presentation: {
          score: 4.3,
          feedback: "Professional presentation with good visual hierarchy.",
          suggestions: ["Consider adding a brief professional summary", "Use consistent formatting for all sections"],
        },
        technical: {
          score: 4.1,
          feedback: "Good technical depth with relevant skills highlighted.",
          suggestions: ["Group technologies by category", "Add proficiency levels for key skills"],
        },
      },
      overallRating: 4.1,
      overallFeedback:
        "Strong resume overall with good technical content and professional presentation. Focus on adding more quantified achievements to make your impact more compelling.",
      textFeedback:
        "Your resume demonstrates strong technical skills and relevant experience. The layout is clean and professional, making it easy to read. However, I recommend adding more specific metrics to your achievements to better showcase your impact.",
      audioFeedback: {
        url: "/mock-audio-feedback.mp3",
        duration: "3:45",
        transcript:
          "Hi there! I've reviewed your resume and overall I'm quite impressed with the technical depth and clean presentation...",
      },
      actionItems: [
        {
          priority: "high",
          task: "Add quantified achievements to each role (metrics, percentages, dollar amounts)",
          deadline: "2024-01-20",
          completed: false,
        },
        {
          priority: "medium",
          task: "Include a professional summary section at the top",
          completed: false,
        },
        {
          priority: "low",
          task: "Consider adding relevant certifications section",
          completed: true,
        },
      ],
      publicNotes: "Great foundation - focus on quantifying your impact for maximum effect.",
      status: "completed",
      helpful: 15,
      studentResponse: "Thank you for the detailed feedback! I've started updating my resume with specific metrics.",
      followUpScheduled: true,
    },
    {
      id: "2",
      mentorName: "Michael Chen",
      mentorTitle: "Product Manager at Microsoft",
      mentorExpertise: ["Product Management", "Strategy", "Leadership"],
      date: "2024-01-12",
      type: "interview",
      categoryRatings: {
        format: {
          score: 4.0,
          feedback: "Good structure in responses, clear communication style.",
          suggestions: ["Practice the STAR method more consistently", "Work on concise opening statements"],
        },
        content: {
          score: 3.5,
          feedback: "Solid technical knowledge, but could improve on product thinking.",
          suggestions: ["Prepare more product strategy examples", "Practice market analysis discussions"],
        },
        relevance: {
          score: 4.0,
          feedback: "Responses were relevant to PM role requirements.",
          suggestions: [
            "Focus more on cross-functional collaboration examples",
            "Emphasize data-driven decision making",
          ],
        },
        impact: {
          score: 3.2,
          feedback: "Some good examples but need more business impact focus.",
          suggestions: ["Quantify user impact and business metrics", "Discuss revenue or growth contributions"],
        },
        presentation: {
          score: 3.8,
          feedback: "Confident delivery, good eye contact and posture.",
          suggestions: ["Slow down speaking pace slightly", "Use more strategic pauses for emphasis"],
        },
        technical: {
          score: 4.2,
          feedback: "Strong technical understanding for a PM role.",
          suggestions: ["Balance technical depth with business focus", "Practice explaining technical concepts simply"],
        },
      },
      overallRating: 3.7,
      overallFeedback:
        "Good interview performance with strong technical foundation. Focus on developing more product strategy examples and quantifying business impact.",
      textFeedback:
        "Your technical knowledge is impressive and you communicate clearly. For PM roles, I'd recommend preparing more examples that showcase product strategy and business impact.",
      videoFeedback: {
        url: "/mock-video-feedback.mp4",
        duration: "8:30",
        thumbnail: "/video-thumbnail.jpg",
      },
      actionItems: [
        {
          priority: "high",
          task: "Prepare 3-5 product strategy case studies with business metrics",
          deadline: "2024-01-18",
          completed: false,
        },
        {
          priority: "high",
          task: "Practice STAR method for behavioral questions",
          completed: false,
        },
        {
          priority: "medium",
          task: "Research target company's product challenges",
          completed: true,
        },
      ],
      status: "follow-up-needed",
      helpful: 12,
      followUpScheduled: true,
    },
  ]

  const renderStars = (rating: number) => {
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500/10 text-red-400 border-red-500/20"
      case "medium":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
      case "low":
        return "bg-green-500/10 text-green-400 border-green-500/20"
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/20"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "resume":
        return "bg-blue-500"
      case "interview":
        return "bg-green-500"
      case "portfolio":
        return "bg-purple-500"
      case "assignment":
        return "bg-orange-500"
      default:
        return "bg-gray-500"
    }
  }

  const filteredFeedback = activeTab === "all" ? feedbackItems : feedbackItems.filter((item) => item.type === activeTab)

  return (
    <div className="space-y-6">
      {/* Header with Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center mx-auto mb-2">
              <MessageSquare className="w-4 h-4 text-white" />
            </div>
            <div className="text-2xl font-bold">24</div>
            <div className="text-xs text-muted-foreground">Total Feedback</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mx-auto mb-2">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <div className="text-2xl font-bold">4.3</div>
            <div className="text-xs text-muted-foreground">Avg Rating</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Target className="w-4 h-4 text-white" />
            </div>
            <div className="text-2xl font-bold">18</div>
            <div className="text-xs text-muted-foreground">Action Items</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Users className="w-4 h-4 text-white" />
            </div>
            <div className="text-2xl font-bold">8</div>
            <div className="text-xs text-muted-foreground">Active Mentors</div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Feedback Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All Feedback</TabsTrigger>
          <TabsTrigger value="resume">Resume</TabsTrigger>
          <TabsTrigger value="interview">Interview</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="assignment">Assignment</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-6">
          {filteredFeedback.map((feedback) => (
            <Card key={feedback.id} className="overflow-hidden">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={feedback.mentorAvatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {feedback.mentorName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{feedback.mentorName}</CardTitle>
                      <CardDescription>{feedback.mentorTitle}</CardDescription>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline" className="capitalize">
                          {feedback.type}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {new Date(feedback.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1">
                      {renderStars(feedback.overallRating)}
                      <span className="text-sm font-semibold ml-2">{feedback.overallRating.toFixed(1)}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {feedback.mentorExpertise.slice(0, 2).map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Category Breakdown */}
                <div>
                  <h4 className="font-semibold mb-4">Detailed Category Ratings</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(feedback.categoryRatings).map(([category, data]) => (
                      <div key={category} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium capitalize">{category}</span>
                          <div className="flex items-center space-x-1">
                            {renderStars(data.score)}
                            <span className="text-xs font-semibold ml-1">{data.score}</span>
                          </div>
                        </div>
                        <Progress value={data.score * 20} className="h-2" />
                        <p className="text-xs text-muted-foreground">{data.feedback}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Overall Feedback */}
                <div>
                  <h4 className="font-semibold mb-2">Overall Feedback</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feedback.overallFeedback}</p>
                </div>

                {/* Multi-format Feedback */}
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">
                    <FileText className="w-4 h-4 mr-2" />
                    Read Full Feedback
                  </Button>
                  {feedback.audioFeedback && (
                    <Button variant="outline" size="sm">
                      <Mic className="w-4 h-4 mr-2" />
                      Audio ({feedback.audioFeedback.duration})
                    </Button>
                  )}
                  {feedback.videoFeedback && (
                    <Button variant="outline" size="sm">
                      <Video className="w-4 h-4 mr-2" />
                      Video ({feedback.videoFeedback.duration})
                    </Button>
                  )}
                </div>

                {/* Action Items */}
                {feedback.actionItems.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3">Action Items</h4>
                    <div className="space-y-2">
                      {feedback.actionItems.map((item, index) => (
                        <div key={index} className={`p-3 rounded-lg border ${getPriorityColor(item.priority)}`}>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <Badge variant="outline" className={`text-xs ${getPriorityColor(item.priority)}`}>
                                  {item.priority}
                                </Badge>
                                {item.deadline && (
                                  <span className="text-xs text-muted-foreground">
                                    Due: {new Date(item.deadline).toLocaleDateString()}
                                  </span>
                                )}
                              </div>
                              <p className="text-sm">{item.task}</p>
                            </div>
                            <div className="ml-4">
                              {item.completed ? (
                                <Badge variant="default" className="bg-green-500">
                                  ✓ Done
                                </Badge>
                              ) : (
                                <Button size="sm" variant="outline">
                                  Mark Done
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Student Response */}
                {feedback.studentResponse && (
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Your Response</h4>
                    <p className="text-sm text-muted-foreground">{feedback.studentResponse}</p>
                  </div>
                )}

                {/* Response Area */}
                <div className="space-y-3">
                  <Textarea
                    placeholder="Reply to your mentor or ask follow-up questions..."
                    value={newResponse}
                    onChange={(e) => setNewResponse(e.target.value)}
                    rows={3}
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <ThumbsUp className="w-4 h-4 mr-1" />
                        Helpful ({feedback.helpful})
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4 mr-1" />
                        Export
                      </Button>
                    </div>
                    <div className="flex space-x-2">
                      {feedback.followUpScheduled && (
                        <Button variant="outline" size="sm">
                          <Calendar className="w-4 h-4 mr-2" />
                          Follow-up Scheduled
                        </Button>
                      )}
                      <Button size="sm" disabled={!newResponse.trim()}>
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Send Reply
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
