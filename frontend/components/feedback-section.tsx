"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EnhancedMentorFeedback } from "@/components/enhanced-mentor-feedback"
import { Star, MessageSquare, Play, Download, Calendar, Clock, ThumbsUp } from "lucide-react"

interface FeedbackItem {
  id: string
  mentorName: string
  mentorAvatar?: string
  mentorTitle: string
  date: string
  type: "resume" | "interview" | "portfolio"
  ratings: {
    format: number
    content: number
    relevance: number
    impact: number
  }
  overallRating: number
  textFeedback: string
  audioFeedback?: string
  videoFeedback?: string
  suggestions: string[]
  status: "pending" | "completed" | "in-review"
}

export function FeedbackSection() {
  const [activeTab, setActiveTab] = useState("enhanced")

  // Mock feedback data
  const feedbackItems: FeedbackItem[] = [
    {
      id: "1",
      mentorName: "Sarah Johnson",
      mentorTitle: "Senior Software Engineer at Google",
      date: "2024-01-15",
      type: "resume",
      ratings: {
        format: 4.5,
        content: 4.0,
        relevance: 4.2,
        impact: 3.8,
      },
      overallRating: 4.1,
      textFeedback:
        "Your resume shows strong technical skills and good project experience. The format is clean and professional. However, I recommend adding more quantified achievements and impact metrics to make your accomplishments stand out more.",
      suggestions: [
        'Add specific metrics to your achievements (e.g., "Improved performance by 40%")',
        "Include more action verbs in your experience descriptions",
        "Consider adding a brief summary section at the top",
      ],
      status: "completed",
    },
    {
      id: "2",
      mentorName: "Michael Chen",
      mentorTitle: "Product Manager at Microsoft",
      date: "2024-01-12",
      type: "interview",
      ratings: {
        format: 4.0,
        content: 3.5,
        relevance: 4.0,
        impact: 3.2,
      },
      overallRating: 3.7,
      textFeedback:
        "Good technical knowledge demonstrated during the mock interview. Your problem-solving approach is solid, but work on articulating your thought process more clearly. Practice explaining complex concepts in simpler terms.",
      audioFeedback: "/mock-audio-feedback.mp3",
      suggestions: [
        "Practice the STAR method for behavioral questions",
        "Work on speaking more confidently and at a steady pace",
        "Prepare more specific examples from your experience",
      ],
      status: "completed",
    },
    {
      id: "3",
      mentorName: "Dr. Priya Sharma",
      mentorTitle: "Data Science Lead at Amazon",
      date: "2024-01-10",
      type: "portfolio",
      ratings: {
        format: 4.8,
        content: 4.5,
        relevance: 4.3,
        impact: 4.0,
      },
      overallRating: 4.4,
      textFeedback:
        "Excellent portfolio showcasing diverse data science projects. The visualizations are clear and the code quality is good. Consider adding more detailed explanations of your methodology and business impact.",
      videoFeedback: "/mock-video-feedback.mp4",
      suggestions: [
        "Add more context about business problems solved",
        "Include performance metrics and model evaluation details",
        "Consider adding a brief video walkthrough of your key projects",
      ],
      status: "completed",
    },
  ]

  const pendingReviews = [
    {
      id: "4",
      type: "resume",
      submittedDate: "2024-01-16",
      mentorName: "Alex Rodriguez",
      mentorTitle: "Engineering Manager at Netflix",
      estimatedCompletion: "2024-01-18",
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

  const getTypeColor = (type: string) => {
    switch (type) {
      case "resume":
        return "bg-blue-500"
      case "interview":
        return "bg-green-500"
      case "portfolio":
        return "bg-purple-500"
      default:
        return "bg-gray-500"
    }
  }

  const filteredFeedback = activeTab === "classic" ? feedbackItems : []

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Feedback & Reviews</h2>
          <p className="text-muted-foreground">Get expert feedback from industry mentors with detailed analysis</p>
        </div>
        <Button className="bg-gradient-to-r from-indigo-600 to-purple-600">
          <Calendar className="w-4 h-4 mr-2" />
          Schedule Review
        </Button>
      </div>

      {/* Pending Reviews */}
      {pendingReviews.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Pending Reviews</CardTitle>
            <CardDescription>Reviews currently in progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingReviews.map((review) => (
                <div key={review.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-10 h-10 ${getTypeColor(review.type)} rounded-lg flex items-center justify-center`}
                    >
                      <MessageSquare className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold capitalize">{review.type} Review</p>
                      <p className="text-sm text-muted-foreground">
                        Submitted on {new Date(review.submittedDate).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-muted-foreground">Reviewer: {review.mentorName}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary">
                      <Clock className="w-3 h-3 mr-1" />
                      In Review
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      Est. completion: {new Date(review.estimatedCompletion).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Feedback Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="enhanced">Enhanced Feedback</TabsTrigger>
          <TabsTrigger value="classic">Classic View</TabsTrigger>
        </TabsList>

        <TabsContent value="enhanced">
          <EnhancedMentorFeedback />
        </TabsContent>

        <TabsContent value="classic">
          {filteredFeedback.map((feedback) => (
            <Card key={feedback.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar>
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
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Detailed Ratings */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Format</p>
                    <div className="flex items-center justify-center space-x-1">
                      {renderStars(feedback.ratings.format)}
                    </div>
                    <p className="text-xs font-semibold">{feedback.ratings.format}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Content</p>
                    <div className="flex items-center justify-center space-x-1">
                      {renderStars(feedback.ratings.content)}
                    </div>
                    <p className="text-xs font-semibold">{feedback.ratings.content}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Relevance</p>
                    <div className="flex items-center justify-center space-x-1">
                      {renderStars(feedback.ratings.relevance)}
                    </div>
                    <p className="text-xs font-semibold">{feedback.ratings.relevance}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Impact</p>
                    <div className="flex items-center justify-center space-x-1">
                      {renderStars(feedback.ratings.impact)}
                    </div>
                    <p className="text-xs font-semibold">{feedback.ratings.impact}</p>
                  </div>
                </div>

                {/* Text Feedback */}
                <div>
                  <h4 className="font-semibold mb-2">Feedback</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feedback.textFeedback}</p>
                </div>

                {/* Audio/Video Feedback */}
                {(feedback.audioFeedback || feedback.videoFeedback) && (
                  <div className="flex space-x-2">
                    {feedback.audioFeedback && (
                      <Button variant="outline" size="sm">
                        <Play className="w-4 h-4 mr-2" />
                        Play Audio Feedback
                      </Button>
                    )}
                    {feedback.videoFeedback && (
                      <Button variant="outline" size="sm">
                        <Play className="w-4 h-4 mr-2" />
                        Watch Video Feedback
                      </Button>
                    )}
                  </div>
                )}

                {/* Suggestions */}
                <div>
                  <h4 className="font-semibold mb-2">Suggestions for Improvement</h4>
                  <ul className="space-y-1">
                    {feedback.suggestions.map((suggestion, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start space-x-2">
                        <span className="text-primary mt-1">•</span>
                        <span>{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      <ThumbsUp className="w-4 h-4 mr-1" />
                      Helpful
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4 mr-1" />
                      Download Report
                    </Button>
                  </div>
                  <Button variant="outline" size="sm">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Reply to Mentor
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredFeedback.length === 0 && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <MessageSquare className="w-12 h-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No feedback yet</h3>
                <p className="text-muted-foreground text-center mb-4">
                  Upload your resume or schedule a mock interview to get expert feedback.
                </p>
                <Button>
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Your First Review
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
