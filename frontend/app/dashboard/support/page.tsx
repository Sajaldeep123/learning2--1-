"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  MessageCircle,
  Bot,
  Users,
  Search,
  BookOpen,
  Video,
  FileText,
  Calendar,
  ThumbsUp,
  ThumbsDown,
  Send,
} from "lucide-react"

const faqItems = [
  {
    category: "Platform Usage",
    questions: [
      {
        question: "How do I upload my resume?",
        answer:
          'Go to the Resume section in your dashboard and click "Upload Resume". You can upload PDF or DOCX files up to 10MB.',
        helpful: 24,
        notHelpful: 2,
      },
      {
        question: "How do I schedule a mock interview?",
        answer:
          'Navigate to the Interviews section and click "Schedule Interview". Choose between mentor-led or AI practice sessions.',
        helpful: 18,
        notHelpful: 1,
      },
      {
        question: "Can I retake quizzes?",
        answer: "Yes, most quizzes allow multiple attempts. Check the quiz details for specific retry policies.",
        helpful: 15,
        notHelpful: 0,
      },
    ],
  },
  {
    category: "Course Content",
    questions: [
      {
        question: "How are assignments graded?",
        answer: "Assignments are reviewed by mentors who provide detailed feedback and grades within 48-72 hours.",
        helpful: 22,
        notHelpful: 3,
      },
      {
        question: "What if I miss a deadline?",
        answer:
          "Contact your mentor immediately. Late submissions may be accepted with point deductions depending on the circumstances.",
        helpful: 19,
        notHelpful: 2,
      },
    ],
  },
  {
    category: "Technical Issues",
    questions: [
      {
        question: "The video won't play",
        answer:
          "Try refreshing the page, clearing your browser cache, or switching to a different browser. Contact support if issues persist.",
        helpful: 12,
        notHelpful: 1,
      },
      {
        question: "I can't submit my assignment",
        answer:
          "Ensure your file is under the size limit and in an accepted format. Try using a different browser or contact technical support.",
        helpful: 16,
        notHelpful: 0,
      },
    ],
  },
]

const supportTickets = [
  {
    id: "T-2024-001",
    subject: "Unable to access JavaScript quiz",
    status: "resolved",
    priority: "medium",
    created: "2024-01-15",
    updated: "2024-01-16",
    mentor: "Sarah Chen",
  },
  {
    id: "T-2024-002",
    subject: "Resume feedback request",
    status: "in-progress",
    priority: "low",
    created: "2024-01-18",
    updated: "2024-01-18",
    mentor: "Michael Rodriguez",
  },
  {
    id: "T-2024-003",
    subject: "Career path guidance needed",
    status: "open",
    priority: "high",
    created: "2024-01-20",
    updated: "2024-01-20",
    mentor: "Pending Assignment",
  },
]

const chatbotMetrics = {
  totalQueries: 1247,
  resolvedQueries: 1089,
  satisfactionRate: 87,
  averageResponseTime: "2.3s",
  topTopics: [
    { topic: "Resume Upload", count: 234 },
    { topic: "Interview Scheduling", count: 189 },
    { topic: "Quiz Help", count: 156 },
    { topic: "Assignment Submission", count: 143 },
    { topic: "Career Guidance", count: 98 },
  ],
}

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [newTicketSubject, setNewTicketSubject] = useState("")
  const [newTicketDescription, setNewTicketDescription] = useState("")

  const filteredFAQs = faqItems
    .filter((category) => selectedCategory === "all" || category.category.toLowerCase().includes(selectedCategory))
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter((category) => category.questions.length > 0)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "open":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Student Support Center
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get help with platform usage, course content, and technical issues. Our AI assistant and mentors are here to
            support you 24/7.
          </p>
        </div>

        {/* Support Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="text-center">
              <Bot className="h-12 w-12 text-blue-600 mx-auto mb-2" />
              <CardTitle>AI Assistant</CardTitle>
              <CardDescription>Instant answers to common questions</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="space-y-2 mb-4">
                <div className="text-2xl font-bold text-blue-600">{chatbotMetrics.satisfactionRate}%</div>
                <p className="text-sm text-gray-600">Satisfaction Rate</p>
              </div>
              <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                <MessageCircle className="h-4 w-4 mr-2" />
                Chat Now
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="text-center">
              <Users className="h-12 w-12 text-green-600 mx-auto mb-2" />
              <CardTitle>Mentor Support</CardTitle>
              <CardDescription>Get help from experienced mentors</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="space-y-2 mb-4">
                <div className="text-2xl font-bold text-green-600">24-48h</div>
                <p className="text-sm text-gray-600">Response Time</p>
              </div>
              <Button variant="outline" className="w-full bg-transparent">
                <Calendar className="h-4 w-4 mr-2" />
                Book Session
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="text-center">
              <FileText className="h-12 w-12 text-purple-600 mx-auto mb-2" />
              <CardTitle>Support Tickets</CardTitle>
              <CardDescription>Submit detailed support requests</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="space-y-2 mb-4">
                <div className="text-2xl font-bold text-purple-600">3</div>
                <p className="text-sm text-gray-600">Active Tickets</p>
              </div>
              <Button variant="outline" className="w-full bg-transparent">
                <Send className="h-4 w-4 mr-2" />
                Create Ticket
              </Button>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="faq" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/70 backdrop-blur-sm">
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="tickets">My Tickets</TabsTrigger>
            <TabsTrigger value="chatbot">AI Insights</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="faq" className="space-y-6">
            {/* Search and Filter */}
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search frequently asked questions..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={selectedCategory === "all" ? "default" : "outline"}
                      onClick={() => setSelectedCategory("all")}
                      size="sm"
                    >
                      All
                    </Button>
                    <Button
                      variant={selectedCategory === "platform" ? "default" : "outline"}
                      onClick={() => setSelectedCategory("platform")}
                      size="sm"
                    >
                      Platform
                    </Button>
                    <Button
                      variant={selectedCategory === "course" ? "default" : "outline"}
                      onClick={() => setSelectedCategory("course")}
                      size="sm"
                    >
                      Course
                    </Button>
                    <Button
                      variant={selectedCategory === "technical" ? "default" : "outline"}
                      onClick={() => setSelectedCategory("technical")}
                      size="sm"
                    >
                      Technical
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FAQ Items */}
            <div className="space-y-6">
              {filteredFAQs.map((category, categoryIndex) => (
                <Card key={categoryIndex} className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg">{category.category}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {category.questions.map((faq, faqIndex) => (
                      <div key={faqIndex} className="p-4 bg-gray-50 rounded-lg space-y-3">
                        <h4 className="font-semibold text-gray-900">{faq.question}</h4>
                        <p className="text-gray-700">{faq.answer}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700">
                              <ThumbsUp className="h-4 w-4 mr-1" />
                              {faq.helpful}
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                              <ThumbsDown className="h-4 w-4 mr-1" />
                              {faq.notHelpful}
                            </Button>
                          </div>
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                            Helpful
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tickets" className="space-y-6">
            {/* Create New Ticket */}
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Create Support Ticket</CardTitle>
                <CardDescription>Describe your issue in detail for faster resolution</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Brief description of your issue"
                  value={newTicketSubject}
                  onChange={(e) => setNewTicketSubject(e.target.value)}
                />
                <Textarea
                  placeholder="Provide detailed information about your issue, including steps to reproduce if applicable..."
                  value={newTicketDescription}
                  onChange={(e) => setNewTicketDescription(e.target.value)}
                  rows={4}
                />
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  Submit Ticket
                </Button>
              </CardContent>
            </Card>

            {/* Existing Tickets */}
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Your Support Tickets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {supportTickets.map((ticket) => (
                    <div key={ticket.id} className="p-4 border rounded-lg space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">{ticket.subject}</h4>
                          <p className="text-sm text-gray-600">Ticket ID: {ticket.id}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(ticket.status)}>{ticket.status}</Badge>
                          <Badge className={getPriorityColor(ticket.priority)}>{ticket.priority}</Badge>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Created: {ticket.created}</span>
                        <span>Assigned to: {ticket.mentor}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="chatbot" className="space-y-6">
            {/* Chatbot Analytics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Total Queries</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{chatbotMetrics.totalQueries}</div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Resolved</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{chatbotMetrics.resolvedQueries}</div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Satisfaction</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600">{chatbotMetrics.satisfactionRate}%</div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Response Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">{chatbotMetrics.averageResponseTime}</div>
                </CardContent>
              </Card>
            </div>

            {/* Top Topics */}
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Most Asked Topics</CardTitle>
                <CardDescription>What students are asking about most</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {chatbotMetrics.topTopics.map((topic, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="font-medium">{topic.topic}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${(topic.count / chatbotMetrics.topTopics[0].count) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{topic.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <BookOpen className="h-8 w-8 text-blue-600 mb-2" />
                  <CardTitle>User Guide</CardTitle>
                  <CardDescription>Complete platform documentation</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full bg-transparent">
                    View Guide
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <Video className="h-8 w-8 text-green-600 mb-2" />
                  <CardTitle>Video Tutorials</CardTitle>
                  <CardDescription>Step-by-step video guides</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full bg-transparent">
                    Watch Videos
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <MessageCircle className="h-8 w-8 text-purple-600 mb-2" />
                  <CardTitle>Community Forum</CardTitle>
                  <CardDescription>Connect with other students</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full bg-transparent">
                    Join Forum
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
