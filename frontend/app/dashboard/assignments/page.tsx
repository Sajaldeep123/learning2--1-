"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AssignmentList } from "@/components/assignment-list"
import { AssignmentSubmission } from "@/components/assignment-submission"
import { Clock, CheckCircle, AlertTriangle, Upload, Calendar } from "lucide-react"

export const dynamic = "force-dynamic"

export default function AssignmentsPage() {
  const [activeTab, setActiveTab] = useState("pending")
  const [selectedAssignment, setSelectedAssignment] = useState<string | null>(null)
  const [showSubmission, setShowSubmission] = useState(false)

  // Mock data for demonstration
  const assignmentStats = {
    pending: 3,
    submitted: 12,
    graded: 8,
    overdue: 1,
  }

  const handleSubmitAssignment = (assignmentId: string) => {
    setSelectedAssignment(assignmentId)
    setShowSubmission(true)
  }

  const handleBackToList = () => {
    setSelectedAssignment(null)
    setShowSubmission(false)
  }

  if (showSubmission && selectedAssignment) {
    return <AssignmentSubmission assignmentId={selectedAssignment} onBack={handleBackToList} />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Assignments</h1>
          <p className="text-muted-foreground">Complete assignments and track your submissions</p>
        </div>
        <Button className="bg-gradient-to-r from-indigo-600 to-purple-600">
          <Calendar className="w-4 h-4 mr-2" />
          View Calendar
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center">
                <Clock className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">{assignmentStats.pending}</p>
                <p className="text-xs text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
                <Upload className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">{assignmentStats.submitted}</p>
                <p className="text-xs text-muted-foreground">Submitted</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">{assignmentStats.graded}</p>
                <p className="text-xs text-muted-foreground">Graded</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-600 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">{assignmentStats.overdue}</p>
                <p className="text-xs text-muted-foreground">Overdue</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="submitted">Submitted</TabsTrigger>
          <TabsTrigger value="graded">Graded</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <AssignmentList type="pending" onSubmit={handleSubmitAssignment} />
        </TabsContent>

        <TabsContent value="submitted">
          <AssignmentList type="submitted" onSubmit={handleSubmitAssignment} />
        </TabsContent>

        <TabsContent value="graded">
          <AssignmentList type="graded" onSubmit={handleSubmitAssignment} />
        </TabsContent>

        <TabsContent value="all">
          <AssignmentList type="all" onSubmit={handleSubmitAssignment} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
