"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ResumeUpload } from "@/components/resume-upload"
import { PortfolioSection } from "@/components/portfolio-section"
import { FeedbackSection } from "@/components/feedback-section"
import { Eye, Star, MessageSquare, TrendingUp, AlertCircle, CheckCircle, Clock } from "lucide-react"

export default function ResumePage() {
  const [activeTab, setActiveTab] = useState("upload")

  // Mock data for demonstration
  const resumeStatus = {
    uploaded: true,
    lastUpdated: "2024-01-15",
    score: 85,
    feedback: {
      format: 4.5,
      content: 4.0,
      relevance: 4.2,
      impact: 3.8,
    },
    issues: [
      { type: "warning", message: "Resume is longer than recommended 2 pages" },
      { type: "info", message: "Consider adding more quantified achievements" },
      { type: "success", message: "Good use of action verbs throughout" },
    ],
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Resume & Portfolio</h1>
          <p className="text-muted-foreground">Upload your resume, build your portfolio, and get expert feedback</p>
        </div>
        <Button className="bg-gradient-to-r from-indigo-600 to-purple-600">
          <Eye className="w-4 h-4 mr-2" />
          Preview Resume
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">{resumeStatus.score}%</p>
                <p className="text-xs text-muted-foreground">Resume Score</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-xs text-muted-foreground">Feedback Items</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                <Star className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">4.1</p>
                <p className="text-xs text-muted-foreground">Avg Rating</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">+15%</p>
                <p className="text-xs text-muted-foreground">Improvement</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="upload">Upload & Review</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Upload Section */}
            <div className="lg:col-span-2">
              <ResumeUpload />
            </div>

            {/* Quick Analysis */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Analysis</CardTitle>
                  <CardDescription>AI-powered resume analysis</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Overall Score</span>
                      <span className="font-semibold">{resumeStatus.score}%</span>
                    </div>
                    <Progress value={resumeStatus.score} className="h-2" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Format</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-semibold">{resumeStatus.feedback.format}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Content</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-semibold">{resumeStatus.feedback.content}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Relevance</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-semibold">{resumeStatus.feedback.relevance}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Impact</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-semibold">{resumeStatus.feedback.impact}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold">Issues Found</h4>
                    {resumeStatus.issues.map((issue, index) => (
                      <div key={index} className="flex items-start space-x-2 text-xs">
                        {issue.type === "warning" && <AlertCircle className="w-3 h-3 text-yellow-500 mt-0.5" />}
                        {issue.type === "info" && <Clock className="w-3 h-3 text-blue-500 mt-0.5" />}
                        {issue.type === "success" && <CheckCircle className="w-3 h-3 text-green-500 mt-0.5" />}
                        <span className="text-muted-foreground">{issue.message}</span>
                      </div>
                    ))}
                  </div>

                  <Button className="w-full bg-transparent" variant="outline">
                    Get Detailed Analysis
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="portfolio">
          <PortfolioSection />
        </TabsContent>

        <TabsContent value="feedback">
          <FeedbackSection />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Resume Analytics</CardTitle>
              <CardDescription>Track your resume performance and improvement over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Analytics Coming Soon</h3>
                <p className="text-muted-foreground">
                  Detailed analytics and performance tracking will be available here.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
