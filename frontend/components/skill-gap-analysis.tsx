"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, ArrowRight, BookOpen, Video, Users } from "lucide-react"

interface SkillGap {
  skill: string
  currentLevel: number
  targetLevel: number
  priority: "high" | "medium" | "low"
  recommendations: {
    type: "quiz" | "assignment" | "interview" | "course"
    title: string
    description: string
  }[]
}

const skillGaps: SkillGap[] = [
  {
    skill: "Communication Skills",
    currentLevel: 72,
    targetLevel: 85,
    priority: "high",
    recommendations: [
      {
        type: "interview",
        title: "Behavioral Interview Practice",
        description: "Practice STAR method responses",
      },
      {
        type: "assignment",
        title: "Presentation Skills Workshop",
        description: "Create and deliver technical presentations",
      },
    ],
  },
  {
    skill: "System Design",
    currentLevel: 68,
    targetLevel: 80,
    priority: "high",
    recommendations: [
      {
        type: "quiz",
        title: "System Design Fundamentals",
        description: "Test knowledge of scalability patterns",
      },
      {
        type: "course",
        title: "Advanced System Architecture",
        description: "Deep dive into distributed systems",
      },
    ],
  },
  {
    skill: "Leadership",
    currentLevel: 78,
    targetLevel: 85,
    priority: "medium",
    recommendations: [
      {
        type: "assignment",
        title: "Team Project Leadership",
        description: "Lead a cross-functional project",
      },
    ],
  },
]

export default function SkillGapAnalysis() {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getRecommendationIcon = (type: string) => {
    switch (type) {
      case "quiz":
        return BookOpen
      case "assignment":
        return BookOpen
      case "interview":
        return Users
      case "course":
        return Video
      default:
        return BookOpen
    }
  }

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <AlertTriangle className="h-5 w-5 text-orange-600" />
          <span>Skill Gap Analysis</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {skillGaps.map((gap, index) => (
          <div key={index} className="space-y-4 p-4 bg-gray-50 rounded-lg">
            {/* Skill Header */}
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">{gap.skill}</h3>
              <Badge className={getPriorityColor(gap.priority)}>{gap.priority} priority</Badge>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Current: {gap.currentLevel}%</span>
                <span>Target: {gap.targetLevel}%</span>
              </div>
              <div className="relative">
                <Progress value={gap.currentLevel} className="h-3" />
                <div className="absolute top-0 h-3 w-1 bg-red-500 rounded" style={{ left: `${gap.targetLevel}%` }} />
              </div>
              <p className="text-xs text-gray-500">Gap: {gap.targetLevel - gap.currentLevel} points to reach target</p>
            </div>

            {/* Recommendations */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-700">Recommended Actions:</h4>
              {gap.recommendations.map((rec, recIndex) => {
                const IconComponent = getRecommendationIcon(rec.type)
                return (
                  <div key={recIndex} className="flex items-center space-x-3 p-3 bg-white rounded-lg border">
                    <IconComponent className="h-4 w-4 text-blue-600 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{rec.title}</p>
                      <p className="text-xs text-gray-600">{rec.description}</p>
                    </div>
                    <Button size="sm" variant="outline" className="flex-shrink-0 bg-transparent">
                      Start
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                )
              })}
            </div>
          </div>
        ))}

        {/* Action Button */}
        <div className="text-center pt-4">
          <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
            Generate Personalized Study Plan
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
