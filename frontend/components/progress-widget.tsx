"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown } from "lucide-react"

interface ProgressWidgetProps {
  title: string
  currentScore: number
  previousScore?: number
  target?: number
  activities: {
    name: string
    score: number
    date: string
    type: "quiz" | "assignment" | "interview"
  }[]
}

export default function ProgressWidget({
  title,
  currentScore,
  previousScore,
  target,
  activities,
}: ProgressWidgetProps) {
  const trend = previousScore ? currentScore - previousScore : 0
  const isImproving = trend > 0

  const getTypeColor = (type: string) => {
    switch (type) {
      case "quiz":
        return "bg-blue-100 text-blue-800"
      case "assignment":
        return "bg-green-100 text-green-800"
      case "interview":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          {isImproving ? (
            <TrendingUp className="h-5 w-5 text-green-600" />
          ) : (
            <TrendingDown className="h-5 w-5 text-red-600" />
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Score */}
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600">{currentScore}%</div>
          {previousScore && (
            <p className={`text-sm ${isImproving ? "text-green-600" : "text-red-600"}`}>
              {isImproving ? "+" : ""}
              {trend}% from last period
            </p>
          )}
        </div>

        {/* Progress to Target */}
        {target && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress to Target</span>
              <span>
                {currentScore}% / {target}%
              </span>
            </div>
            <Progress value={(currentScore / target) * 100} className="h-2" />
          </div>
        )}

        {/* Recent Activities */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Recent Activities</h4>
          {activities.slice(0, 3).map((activity, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <span className="truncate">{activity.name}</span>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className={getTypeColor(activity.type)}>
                  {activity.score}%
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
