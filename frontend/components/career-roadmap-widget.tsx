"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock, ArrowRight, Target } from "lucide-react"

interface RoadmapStep {
  title: string
  completed: boolean
  current?: boolean
  dueDate?: string
}

interface CareerRoadmapWidgetProps {
  careerTitle: string
  overallProgress: number
  currentPhase: string
  nextSteps: RoadmapStep[]
}

export default function CareerRoadmapWidget({
  careerTitle,
  overallProgress,
  currentPhase,
  nextSteps,
}: CareerRoadmapWidgetProps) {
  return (
    <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Target className="h-5 w-5 text-blue-600" />
          <span>Career Progress</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Overall Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">{careerTitle}</span>
            <span className="text-gray-600">{overallProgress}% Complete</span>
          </div>
          <Progress value={overallProgress} className="h-3" />
        </div>

        {/* Current Phase */}
        <div className="p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            <span className="text-sm font-medium text-blue-900">Current Phase: {currentPhase}</span>
          </div>
        </div>

        {/* Next Steps */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-700">Next Steps</h4>
          {nextSteps.slice(0, 3).map((step, index) => (
            <div key={index} className="flex items-center space-x-3 text-sm">
              {step.completed ? (
                <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
              ) : step.current ? (
                <div className="w-4 h-4 bg-blue-600 rounded-full flex-shrink-0"></div>
              ) : (
                <Clock className="h-4 w-4 text-gray-400 flex-shrink-0" />
              )}
              <span className={`flex-1 ${step.completed ? "text-gray-500 line-through" : "text-gray-900"}`}>
                {step.title}
              </span>
              {step.dueDate && !step.completed && (
                <Badge variant="outline" className="text-xs">
                  {step.dueDate}
                </Badge>
              )}
            </div>
          ))}
        </div>

        {/* Action Button */}
        <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
          Continue Learning
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  )
}
