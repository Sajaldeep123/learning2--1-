"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AIInterviewSession } from "@/components/ai-interview-session"
import { AdvancedAIInterview } from "@/components/advanced-ai-interview"
import { Brain, Play, Clock, Target, Zap, Code, Users, Briefcase, Sparkles } from "lucide-react"

interface InterviewTemplate {
  id: string
  title: string
  description: string
  category: string
  difficulty: "beginner" | "intermediate" | "advanced"
  duration: number
  questionCount: number
  icon: React.ReactNode
  color: string
}

export function AIInterviewPractice() {
  const [selectedTemplate, setSelectedTemplate] = useState<InterviewTemplate | null>(null)
  const [selectedRole, setSelectedRole] = useState("")
  const [selectedLevel, setSelectedLevel] = useState("")
  const [isSessionActive, setIsSessionActive] = useState(false)
  const [viewMode, setViewMode] = useState<"classic" | "advanced">("advanced")

  const interviewTemplates: InterviewTemplate[] = [
    {
      id: "technical",
      title: "Technical Interview",
      description: "Coding problems, algorithms, and technical concepts",
      category: "Technical",
      difficulty: "intermediate",
      duration: 45,
      questionCount: 8,
      icon: <Code className="w-5 h-5" />,
      color: "bg-blue-500",
    },
    {
      id: "behavioral",
      title: "Behavioral Interview",
      description: "Situational questions and soft skills assessment",
      category: "Behavioral",
      difficulty: "beginner",
      duration: 30,
      questionCount: 6,
      icon: <Users className="w-5 h-5" />,
      color: "bg-green-500",
    },
    {
      id: "system-design",
      title: "System Design",
      description: "Architecture and scalability discussions",
      category: "Technical",
      difficulty: "advanced",
      duration: 60,
      questionCount: 4,
      icon: <Target className="w-5 h-5" />,
      color: "bg-purple-500",
    },
    {
      id: "leadership",
      title: "Leadership Interview",
      description: "Management scenarios and leadership principles",
      category: "Leadership",
      difficulty: "advanced",
      duration: 40,
      questionCount: 7,
      icon: <Briefcase className="w-5 h-5" />,
      color: "bg-orange-500",
    },
  ]

  const roles = [
    "Software Engineer",
    "Data Scientist",
    "Product Manager",
    "UX Designer",
    "DevOps Engineer",
    "Marketing Manager",
    "Sales Representative",
    "Business Analyst",
  ]

  const experienceLevels = [
    { value: "entry", label: "Entry Level (0-2 years)" },
    { value: "mid", label: "Mid Level (3-5 years)" },
    { value: "senior", label: "Senior Level (6+ years)" },
    { value: "lead", label: "Lead/Principal" },
  ]

  const handleStartSession = () => {
    if (selectedTemplate && selectedRole && selectedLevel) {
      setIsSessionActive(true)
    }
  }

  const handleEndSession = () => {
    setIsSessionActive(false)
    setSelectedTemplate(null)
    setSelectedRole("")
    setSelectedLevel("")
  }

  if (isSessionActive && selectedTemplate) {
    if (viewMode === "advanced") {
      return <AdvancedAIInterview />
    } else {
      return (
        <AIInterviewSession
          template={selectedTemplate}
          role={selectedRole}
          level={selectedLevel}
          onEnd={handleEndSession}
        />
      )
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">AI Interview Practice</h2>
        <p className="text-muted-foreground">
          Practice with our advanced AI interviewer and get instant feedback on your performance
        </p>
      </div>

      {/* View Mode Toggle */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5" />
            <span>Interview Experience</span>
          </CardTitle>
          <CardDescription>Choose your preferred interview experience</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={viewMode} onValueChange={(value: any) => setViewMode(value)}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="advanced">Advanced AI (Recommended)</TabsTrigger>
              <TabsTrigger value="classic">Classic Mode</TabsTrigger>
            </TabsList>
            <TabsContent value="advanced" className="mt-4">
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Advanced AI Features:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Real-time speech recognition and analysis</li>
                  <li>• Live performance feedback during interview</li>
                  <li>• Advanced AI-powered question generation</li>
                  <li>• Comprehensive post-interview analytics</li>
                  <li>• Personalized improvement recommendations</li>
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="classic" className="mt-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Classic Features:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Traditional interview format</li>
                  <li>• Basic feedback and scoring</li>
                  <li>• Simple question progression</li>
                  <li>• Standard evaluation metrics</li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="w-5 h-5" />
            <span>Customize Your Practice Session</span>
          </CardTitle>
          <CardDescription>Select your target role and experience level for personalized questions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Target Role</label>
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your target role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Experience Level</label>
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your experience level" />
                </SelectTrigger>
                <SelectContent>
                  {experienceLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interview Templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {interviewTemplates.map((template) => (
          <Card
            key={template.id}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedTemplate?.id === template.id ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => setSelectedTemplate(template)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 ${template.color} rounded-lg flex items-center justify-center`}>
                    <div className="text-white">{template.icon}</div>
                  </div>
                  <div>
                    <CardTitle className="text-lg">{template.title}</CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </div>
                </div>
                <Badge variant="outline" className="capitalize">
                  {template.difficulty}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{template.duration} min</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Target className="w-4 h-4" />
                    <span>{template.questionCount} questions</span>
                  </span>
                </div>
              </div>

              {selectedTemplate?.id === template.id && (
                <div className="space-y-3">
                  <div className="bg-muted p-3 rounded-lg">
                    <h4 className="text-sm font-semibold mb-2">What to expect:</h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• AI-generated questions tailored to your role and level</li>
                      <li>• Real-time feedback on your responses</li>
                      <li>• Analysis of tone, clarity, and confidence</li>
                      <li>• Detailed performance report at the end</li>
                      {viewMode === "advanced" && (
                        <>
                          <li>• Speech recognition and live transcription</li>
                          <li>• Advanced behavioral analysis</li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Start Session */}
      {selectedTemplate && selectedRole && selectedLevel && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="font-semibold">Ready to start your practice session?</h3>
                <p className="text-sm text-muted-foreground">
                  {selectedTemplate.title} for {selectedRole} ({selectedLevel} level) - {viewMode} mode
                </p>
              </div>
              <Button onClick={handleStartSession} className="bg-gradient-to-r from-indigo-600 to-purple-600">
                <Play className="w-4 h-4 mr-2" />
                Start AI Interview
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Practice Sessions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="w-5 h-5" />
            <span>Recent Practice Sessions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              {
                type: "Technical Interview",
                role: "Software Engineer",
                score: 85,
                date: "2024-01-15",
                duration: 42,
              },
              {
                type: "Behavioral Interview",
                role: "Product Manager",
                score: 78,
                date: "2024-01-12",
                duration: 28,
              },
              {
                type: "System Design",
                role: "Senior Engineer",
                score: 92,
                date: "2024-01-10",
                duration: 58,
              },
            ].map((session, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Brain className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{session.type}</p>
                    <p className="text-xs text-muted-foreground">
                      {session.role} • {session.duration} minutes
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    <div className="text-sm font-semibold">{session.score}%</div>
                    <Progress value={session.score} className="w-16 h-2" />
                  </div>
                  <p className="text-xs text-muted-foreground">{new Date(session.date).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
