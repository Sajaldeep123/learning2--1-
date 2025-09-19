"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, FileText, Upload, Download, Clock, CheckCircle, AlertTriangle, Star } from "lucide-react"

interface Assignment {
  id: string
  title: string
  description: string
  type: "project" | "case-study" | "essay" | "coding"
  mentor: string
  assignedDate: string
  dueDate: string
  status: "pending" | "submitted" | "graded" | "overdue"
  grade?: number
  maxGrade: number
  submissionCount: number
  maxSubmissions: number
  attachments?: string[]
  feedback?: string
}

interface AssignmentListProps {
  type: "pending" | "submitted" | "graded" | "all"
  onSubmit: (assignmentId: string) => void
}

export function AssignmentList({ type, onSubmit }: AssignmentListProps) {
  // Mock assignment data
  const assignments: Assignment[] = [
    {
      id: "1",
      title: "E-commerce Website Development",
      description:
        "Build a full-stack e-commerce website using React, Node.js, and MongoDB. Include user authentication, product catalog, shopping cart, and payment integration.",
      type: "project",
      mentor: "Sarah Johnson",
      assignedDate: "2024-01-10",
      dueDate: "2024-01-25",
      status: "pending",
      maxGrade: 100,
      submissionCount: 0,
      maxSubmissions: 3,
      attachments: ["requirements.pdf", "wireframes.figma"],
    },
    {
      id: "2",
      title: "System Design Case Study",
      description:
        "Analyze the architecture of a popular social media platform. Discuss scalability challenges, database design, and propose improvements.",
      type: "case-study",
      mentor: "Michael Chen",
      assignedDate: "2024-01-08",
      dueDate: "2024-01-22",
      status: "submitted",
      maxGrade: 100,
      submissionCount: 1,
      maxSubmissions: 2,
    },
    {
      id: "3",
      title: "Algorithm Optimization Challenge",
      description:
        "Optimize the given sorting algorithm and analyze its time and space complexity. Provide benchmarks and comparison with standard algorithms.",
      type: "coding",
      mentor: "Dr. Priya Sharma",
      assignedDate: "2024-01-05",
      dueDate: "2024-01-20",
      status: "graded",
      grade: 92,
      maxGrade: 100,
      submissionCount: 2,
      maxSubmissions: 3,
      feedback:
        "Excellent optimization approach! Your analysis of time complexity is thorough. Consider edge cases in your next submission.",
    },
    {
      id: "4",
      title: "Technical Writing: API Documentation",
      description:
        "Write comprehensive API documentation for a REST API. Include examples, error handling, and best practices.",
      type: "essay",
      mentor: "Alex Rodriguez",
      assignedDate: "2024-01-12",
      dueDate: "2024-01-18",
      status: "overdue",
      maxGrade: 100,
      submissionCount: 0,
      maxSubmissions: 2,
    },
  ]

  const filteredAssignments = assignments.filter((assignment) => {
    switch (type) {
      case "pending":
        return assignment.status === "pending" || assignment.status === "overdue"
      case "submitted":
        return assignment.status === "submitted"
      case "graded":
        return assignment.status === "graded"
      default:
        return true
    }
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "project":
        return <FileText className="w-4 h-4" />
      case "case-study":
        return <FileText className="w-4 h-4" />
      case "essay":
        return <FileText className="w-4 h-4" />
      case "coding":
        return <FileText className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "project":
        return "bg-blue-500"
      case "case-study":
        return "bg-green-500"
      case "essay":
        return "bg-purple-500"
      case "coding":
        return "bg-orange-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusIcon = (assignment: Assignment) => {
    switch (assignment.status) {
      case "submitted":
        return <Upload className="w-4 h-4 text-blue-500" />
      case "graded":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "overdue":
        return <AlertTriangle className="w-4 h-4 text-red-500" />
      default:
        return <Clock className="w-4 h-4 text-yellow-500" />
    }
  }

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate)
    const now = new Date()
    const diffTime = due.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const renderGrade = (assignment: Assignment) => {
    if (assignment.grade !== undefined) {
      const percentage = (assignment.grade / assignment.maxGrade) * 100
      return (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Grade</span>
            <span className="font-semibold">
              {assignment.grade}/{assignment.maxGrade}
            </span>
          </div>
          <Progress value={percentage} className="h-2" />
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-4">
      {filteredAssignments.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No assignments found</h3>
            <p className="text-muted-foreground text-center">
              {type === "pending"
                ? "No pending assignments. Great job staying on top of your work!"
                : `No ${type} assignments found.`}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredAssignments.map((assignment) => (
            <Card key={assignment.id} className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-10 h-10 ${getTypeColor(assignment.type)} rounded-lg flex items-center justify-center`}
                    >
                      <div className="text-white">{getTypeIcon(assignment.type)}</div>
                    </div>
                    <div>
                      <CardTitle className="text-lg">{assignment.title}</CardTitle>
                      <CardDescription>
                        Assigned by {assignment.mentor} • {assignment.type.replace("-", " ")}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(assignment)}
                    <Badge variant={assignment.status === "overdue" ? "destructive" : "outline"} className="capitalize">
                      {assignment.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">{assignment.description}</p>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Due {new Date(assignment.dueDate).toLocaleDateString()}</span>
                    </span>
                    <span>
                      {assignment.submissionCount}/{assignment.maxSubmissions} submissions
                    </span>
                  </div>
                  {assignment.status === "pending" && (
                    <span
                      className={`font-semibold ${
                        getDaysUntilDue(assignment.dueDate) < 0
                          ? "text-red-500"
                          : getDaysUntilDue(assignment.dueDate) <= 2
                            ? "text-yellow-500"
                            : "text-green-500"
                      }`}
                    >
                      {getDaysUntilDue(assignment.dueDate) < 0
                        ? `${Math.abs(getDaysUntilDue(assignment.dueDate))} days overdue`
                        : getDaysUntilDue(assignment.dueDate) === 0
                          ? "Due today"
                          : `${getDaysUntilDue(assignment.dueDate)} days left`}
                    </span>
                  )}
                </div>

                {assignment.attachments && assignment.attachments.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold">Attachments</h4>
                    <div className="flex flex-wrap gap-2">
                      {assignment.attachments.map((attachment, index) => (
                        <Button key={index} variant="outline" size="sm">
                          <Download className="w-3 h-3 mr-1" />
                          {attachment}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {renderGrade(assignment)}

                {assignment.feedback && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span>Mentor Feedback</span>
                    </h4>
                    <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">{assignment.feedback}</p>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="text-xs text-muted-foreground">
                    Assigned on {new Date(assignment.assignedDate).toLocaleDateString()}
                  </span>
                  <div className="flex space-x-2">
                    {assignment.status === "graded" && (
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    )}
                    {(assignment.status === "pending" || assignment.status === "overdue") &&
                      assignment.submissionCount < assignment.maxSubmissions && (
                        <Button
                          onClick={() => onSubmit(assignment.id)}
                          size="sm"
                          className={assignment.status === "overdue" ? "bg-red-600 hover:bg-red-700" : ""}
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Submit
                        </Button>
                      )}
                    {assignment.status === "submitted" && (
                      <Button variant="outline" size="sm">
                        View Submission
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
