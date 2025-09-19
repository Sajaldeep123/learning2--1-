"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
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
import {
  TrendingUp,
  Star,
  MessageSquare,
  Brain,
  Users,
  Target,
  BookOpen,
  AlertCircle,
  CheckCircle,
  Clock,
  Download,
  Share,
} from "lucide-react"

interface FeedbackTrend {
  month: string
  mentorFeedback: number
  aiFeedback: number
  overallScore: number
}

interface CommonMistake {
  category: string
  frequency: number
  improvement: number
  examples: string[]
}

interface ImprovementArea {
  skill: string
  currentScore: number
  targetScore: number
  trend: "up" | "down" | "stable"
  resources: Array<{
    type: "article" | "course" | "module"
    title: string
    url: string
  }>
}

export function ComprehensiveFeedbackDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("6months")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data for comprehensive feedback analytics
  const feedbackTrends: FeedbackTrend[] = [
    { month: "Jul", mentorFeedback: 3.8, aiFeedback: 3.5, overallScore: 3.65 },
    { month: "Aug", mentorFeedback: 4.0, aiFeedback: 3.7, overallScore: 3.85 },
    { month: "Sep", mentorFeedback: 4.2, aiFeedback: 3.9, overallScore: 4.05 },
    { month: "Oct", mentorFeedback: 4.1, aiFeedback: 4.0, overallScore: 4.05 },
    { month: "Nov", mentorFeedback: 4.4, aiFeedback: 4.2, overallScore: 4.3 },
    { month: "Dec", mentorFeedback: 4.5, aiFeedback: 4.3, overallScore: 4.4 },
  ]

  const commonMistakes: CommonMistake[] = [
    {
      category: "Resume Format",
      frequency: 15,
      improvement: 60,
      examples: ["Inconsistent bullet points", "Poor spacing", "Font size issues"],
    },
    {
      category: "Interview Communication",
      frequency: 12,
      improvement: 45,
      examples: ["Speaking too fast", "Not using STAR method", "Unclear explanations"],
    },
    {
      category: "Technical Depth",
      frequency: 8,
      improvement: 75,
      examples: ["Lack of specific examples", "Missing metrics", "Vague descriptions"],
    },
    {
      category: "Portfolio Presentation",
      frequency: 6,
      improvement: 80,
      examples: ["Missing project context", "No live demos", "Poor documentation"],
    },
  ]

  const improvementAreas: ImprovementArea[] = [
    {
      skill: "Communication Skills",
      currentScore: 78,
      targetScore: 85,
      trend: "up",
      resources: [
        { type: "course", title: "Effective Communication for Engineers", url: "/courses/communication" },
        { type: "article", title: "STAR Method Guide", url: "/articles/star-method" },
      ],
    },
    {
      skill: "Technical Writing",
      currentScore: 72,
      targetScore: 80,
      trend: "up",
      resources: [
        { type: "module", title: "Technical Documentation Best Practices", url: "/modules/tech-writing" },
        { type: "course", title: "Writing for Developers", url: "/courses/dev-writing" },
      ],
    },
    {
      skill: "System Design",
      currentScore: 65,
      targetScore: 75,
      trend: "stable",
      resources: [
        { type: "course", title: "System Design Fundamentals", url: "/courses/system-design" },
        { type: "article", title: "Scalability Patterns", url: "/articles/scalability" },
      ],
    },
    {
      skill: "Leadership",
      currentScore: 58,
      targetScore: 70,
      trend: "down",
      resources: [
        { type: "course", title: "Tech Leadership Essentials", url: "/courses/leadership" },
        { type: "module", title: "Team Management Skills", url: "/modules/team-mgmt" },
      ],
    },
  ]

  const skillRadarData = [
    { subject: "Technical", A: 85, B: 90, fullMark: 100 },
    { subject: "Communication", A: 78, B: 85, fullMark: 100 },
    { subject: "Problem Solving", A: 92, B: 95, fullMark: 100 },
    { subject: "Leadership", A: 58, B: 70, fullMark: 100 },
    { subject: "Creativity", A: 82, B: 85, fullMark: 100 },
    { subject: "Teamwork", A: 88, B: 90, fullMark: 100 },
  ]

  const feedbackDistribution = [
    { name: "Resume Reviews", value: 35, color: "#3b82f6" },
    { name: "Mock Interviews", value: 28, color: "#10b981" },
    { name: "Portfolio Reviews", value: 20, color: "#f59e0b" },
    { name: "Assignment Feedback", value: 17, color: "#ef4444" },
  ]

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-500" />
      case "down":
        return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />
      default:
        return <div className="w-4 h-4 bg-gray-400 rounded-full" />
    }
  }

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "course":
        return <BookOpen className="w-4 h-4" />
      case "article":
        return <MessageSquare className="w-4 h-4" />
      case "module":
        return <Target className="w-4 h-4" />
      default:
        return <BookOpen className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Comprehensive Feedback Dashboard
          </h2>
          <p className="text-muted-foreground mt-2">
            Track your progress, identify patterns, and get personalized improvement recommendations
          </p>
        </div>
        <div className="flex space-x-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">1 Month</SelectItem>
              <SelectItem value="3months">3 Months</SelectItem>
              <SelectItem value="6months">6 Months</SelectItem>
              <SelectItem value="1year">1 Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button variant="outline" size="sm">
            <Share className="w-4 h-4 mr-2" />
            Share Progress
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Feedback</p>
                <p className="text-3xl font-bold text-blue-700">127</p>
                <p className="text-xs text-blue-500">+12 this month</p>
              </div>
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Average Rating</p>
                <p className="text-3xl font-bold text-green-700">4.4</p>
                <p className="text-xs text-green-500">+0.3 improvement</p>
              </div>
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-violet-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">AI Insights</p>
                <p className="text-3xl font-bold text-purple-700">89</p>
                <p className="text-xs text-purple-500">Automated reviews</p>
              </div>
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-amber-100 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">Active Mentors</p>
                <p className="text-3xl font-bold text-orange-700">8</p>
                <p className="text-xs text-orange-500">Providing guidance</p>
              </div>
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="mistakes">Common Issues</TabsTrigger>
          <TabsTrigger value="improvements">Improvements</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Feedback Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Feedback Distribution</CardTitle>
                <CardDescription>Breakdown of feedback types received</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={feedbackDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${((percent as number) * 100).toFixed(0)}%`}
                    >
                      {feedbackDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Skill Radar */}
            <Card>
              <CardHeader>
                <CardTitle>Skill Assessment</CardTitle>
                <CardDescription>Current vs target skill levels</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={skillRadarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar name="Current" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                    <Radar name="Target" dataKey="B" stroke="#10b981" fill="#10b981" fillOpacity={0.1} />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Recent Feedback Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Feedback Highlights</CardTitle>
              <CardDescription>Key insights from your latest reviews</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <h4 className="font-semibold text-green-800">Strengths</h4>
                  </div>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Strong technical problem-solving</li>
                    <li>• Clear communication style</li>
                    <li>• Good project documentation</li>
                  </ul>
                </div>

                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="w-5 h-5 text-yellow-600" />
                    <h4 className="font-semibold text-yellow-800">In Progress</h4>
                  </div>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Adding quantified achievements</li>
                    <li>• Improving interview pacing</li>
                    <li>• Enhancing portfolio visuals</li>
                  </ul>
                </div>

                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <h4 className="font-semibold text-red-800">Focus Areas</h4>
                  </div>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>• Leadership experience examples</li>
                    <li>• System design explanations</li>
                    <li>• Behavioral question responses</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Feedback Score Trends</CardTitle>
              <CardDescription>Track your improvement over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={feedbackTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 5]} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="mentorFeedback"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    name="Mentor Feedback"
                  />
                  <Line type="monotone" dataKey="aiFeedback" stroke="#10b981" strokeWidth={3} name="AI Feedback" />
                  <Line type="monotone" dataKey="overallScore" stroke="#f59e0b" strokeWidth={3} name="Overall Score" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mistakes" className="space-y-6">
          <div className="grid gap-6">
            {commonMistakes.map((mistake, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{mistake.category}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{mistake.frequency} occurrences</Badge>
                      <Badge className="bg-green-500">{mistake.improvement}% improved</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Improvement Progress</span>
                        <span>{mistake.improvement}%</span>
                      </div>
                      <Progress value={mistake.improvement} className="h-2" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Common Examples:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {mistake.examples.map((example, idx) => (
                          <li key={idx}>• {example}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="improvements" className="space-y-6">
          <div className="grid gap-6">
            {improvementAreas.map((area, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <span>{area.skill}</span>
                      {getTrendIcon(area.trend)}
                    </CardTitle>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Current / Target</div>
                      <div className="font-bold">
                        {area.currentScore}% / {area.targetScore}%
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress to Target</span>
                        <span>{Math.round((area.currentScore / area.targetScore) * 100)}%</span>
                      </div>
                      <Progress value={(area.currentScore / area.targetScore) * 100} className="h-2" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-3">Recommended Resources:</h4>
                      <div className="space-y-2">
                        {area.resources.map((resource, idx) => (
                          <div key={idx} className="flex items-center space-x-3 p-2 bg-muted/50 rounded-lg">
                            {getResourceIcon(resource.type)}
                            <div className="flex-1">
                              <p className="text-sm font-medium">{resource.title}</p>
                              <p className="text-xs text-muted-foreground capitalize">{resource.type}</p>
                            </div>
                            <Button size="sm" variant="outline">
                              Start
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5" />
                  <span>Recommended Courses</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900">Advanced System Design</h4>
                  <p className="text-sm text-blue-700">Based on your interview feedback</p>
                  <Button size="sm" className="mt-2 bg-blue-600">
                    Enroll Now
                  </Button>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-900">Leadership Fundamentals</h4>
                  <p className="text-sm text-green-700">Improve your leadership scores</p>
                  <Button size="sm" className="mt-2 bg-green-600">
                    Enroll Now
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5" />
                  <span>Articles & Guides</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-purple-50 rounded-lg">
                  <h4 className="font-medium text-purple-900">STAR Method Mastery</h4>
                  <p className="text-sm text-purple-700">Improve interview responses</p>
                  <Button size="sm" variant="outline" className="mt-2 bg-transparent">
                    Read Article
                  </Button>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg">
                  <h4 className="font-medium text-orange-900">Resume Optimization</h4>
                  <p className="text-sm text-orange-700">Latest formatting best practices</p>
                  <Button size="sm" variant="outline" className="mt-2 bg-transparent">
                    Read Article
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5" />
                  <span>Practice Modules</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-red-50 rounded-lg">
                  <h4 className="font-medium text-red-900">Mock Interview Practice</h4>
                  <p className="text-sm text-red-700">AI-powered interview simulation</p>
                  <Button size="sm" className="mt-2 bg-red-600">
                    Start Practice
                  </Button>
                </div>
                <div className="p-3 bg-indigo-50 rounded-lg">
                  <h4 className="font-medium text-indigo-900">Portfolio Review</h4>
                  <p className="text-sm text-indigo-700">Get instant AI feedback</p>
                  <Button size="sm" className="mt-2 bg-indigo-600">
                    Upload Portfolio
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
