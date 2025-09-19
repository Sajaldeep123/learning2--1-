"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Upload, Calendar, Clock, CheckCircle, AlertTriangle, User, Star, MessageSquare } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/contexts/auth-context"

interface Assignment {
  id: string
  title: string
  description: string
  instructions: string
  due_date: string
  max_points: number
  submission_type: "text" | "file" | "both"
  status: "draft" | "published" | "closed"
  created_by: string
  created_at: string
}

interface Submission {
  id: string
  assignment_id: string
  student_id: string
  submission_text?: string
  file_url?: string
  submitted_at: string
  status: "submitted" | "graded" | "returned"
  score?: number
  feedback?: string
  mentor_feedback?: string
}

export function AssignmentManager() {
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null)
  const [submissionText, setSubmissionText] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState("available")

  const { user } = useAuth()
  const { toast } = useToast()
  const supabase = createClient()

  useEffect(() => {
    if (user) {
      loadAssignments()
      loadSubmissions()
    }
  }, [user])

  const loadAssignments = async () => {
    try {
      const { data, error } = await supabase
        .from("assignments")
        .select("*")
        .eq("status", "published")
        .order("due_date", { ascending: true })

      if (error) throw error
      setAssignments(data || [])
    } catch (error) {
      console.error("Error loading assignments:", error)
      toast({
        title: "Error",
        description: "Failed to load assignments.",
        variant: "destructive",
      })
    }
  }

  const loadSubmissions = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from("assignment_submissions")
        .select(`
          *,
          assignments (
            title,
            max_points
          )
        `)
        .eq("student_id", user.id)
        .order("submitted_at", { ascending: false })

      if (error) throw error
      setSubmissions(data || [])
    } catch (error) {
      console.error("Error loading submissions:", error)
    }
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Please select a file smaller than 10MB.",
          variant: "destructive",
        })
        return
      }
      setSelectedFile(file)
    }
  }

  const uploadFile = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split(".").pop()
      const fileName = `${user?.id}/${selectedAssignment?.id}/${Date.now()}.${fileExt}`

      const { data, error } = await supabase.storage.from("assignment-submissions").upload(fileName, file)

      if (error) throw error

      const {
        data: { publicUrl },
      } = supabase.storage.from("assignment-submissions").getPublicUrl(fileName)

      return publicUrl
    } catch (error) {
      console.error("Error uploading file:", error)
      return null
    }
  }

  const submitAssignment = async () => {
    if (!selectedAssignment || !user) return

    if (!submissionText.trim() && !selectedFile) {
      toast({
        title: "Submission Required",
        description: "Please provide either text or file submission.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      let fileUrl = null
      if (selectedFile) {
        fileUrl = await uploadFile(selectedFile)
        if (!fileUrl) {
          throw new Error("Failed to upload file")
        }
      }

      const { error } = await supabase.from("assignment_submissions").insert({
        assignment_id: selectedAssignment.id,
        student_id: user.id,
        submission_text: submissionText.trim() || null,
        file_url: fileUrl,
        status: "submitted",
      })

      if (error) throw error

      toast({
        title: "Assignment Submitted",
        description: "Your assignment has been submitted successfully.",
      })

      setSubmissionText("")
      setSelectedFile(null)
      setSelectedAssignment(null)
      loadSubmissions()
    } catch (error) {
      console.error("Error submitting assignment:", error)
      toast({
        title: "Submission Failed",
        description: "Failed to submit assignment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate)
    const now = new Date()
    const diffTime = due.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "submitted":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "graded":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "returned":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30"
    }
  }

  const getSubmissionForAssignment = (assignmentId: string) => {
    return submissions.find((sub) => sub.assignment_id === assignmentId)
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <FileText className="w-6 h-6 text-indigo-400" />
            <span>Assignment Manager</span>
          </CardTitle>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="available">Available Assignments</TabsTrigger>
          <TabsTrigger value="submissions">My Submissions</TabsTrigger>
          <TabsTrigger value="submit">Submit Assignment</TabsTrigger>
        </TabsList>

        <TabsContent value="available" className="space-y-4">
          <div className="grid gap-4">
            {assignments.map((assignment) => {
              const submission = getSubmissionForAssignment(assignment.id)
              const daysUntilDue = getDaysUntilDue(assignment.due_date)
              const isOverdue = daysUntilDue < 0

              return (
                <Card key={assignment.id} className="glass-card">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2">{assignment.title}</h3>
                        <p className="text-slate-300 mb-3">{assignment.description}</p>

                        <div className="flex items-center space-x-4 text-sm text-slate-400">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>Due: {formatDate(assignment.due_date)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4" />
                            <span>{assignment.max_points} points</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end space-y-2">
                        {submission ? (
                          <Badge className={getStatusColor(submission.status)}>{submission.status}</Badge>
                        ) : (
                          <Badge variant={isOverdue ? "destructive" : "outline"}>
                            {isOverdue ? "Overdue" : `${daysUntilDue} days left`}
                          </Badge>
                        )}

                        {!submission && !isOverdue && (
                          <Button
                            size="sm"
                            onClick={() => {
                              setSelectedAssignment(assignment)
                              setActiveTab("submit")
                            }}
                          >
                            Start Assignment
                          </Button>
                        )}
                      </div>
                    </div>

                    {isOverdue && !submission && (
                      <div className="flex items-center space-x-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                        <AlertTriangle className="w-4 h-4 text-red-400" />
                        <span className="text-sm text-red-400">This assignment is overdue</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="submissions" className="space-y-4">
          <div className="grid gap-4">
            {submissions.map((submission) => (
              <Card key={submission.id} className="glass-card">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">
                        {(submission as any).assignments?.title || "Assignment"}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-slate-400 mb-3">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>Submitted: {formatDate(submission.submitted_at)}</span>
                        </div>
                        {submission.score !== null && (
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4" />
                            <span>
                              Score: {submission.score}/{(submission as any).assignments?.max_points}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <Badge className={getStatusColor(submission.status)}>{submission.status}</Badge>
                  </div>

                  {submission.feedback && (
                    <div className="p-3 bg-slate-800/50 rounded-lg mb-3">
                      <div className="flex items-center space-x-2 mb-2">
                        <MessageSquare className="w-4 h-4 text-indigo-400" />
                        <span className="text-sm font-medium">Instructor Feedback</span>
                      </div>
                      <p className="text-sm text-slate-300">{submission.feedback}</p>
                    </div>
                  )}

                  {submission.mentor_feedback && (
                    <div className="p-3 bg-slate-800/50 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <User className="w-4 h-4 text-purple-400" />
                        <span className="text-sm font-medium">Mentor Feedback</span>
                      </div>
                      <p className="text-sm text-slate-300">{submission.mentor_feedback}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="submit" className="space-y-4">
          {selectedAssignment ? (
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>{selectedAssignment.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-slate-800/50 rounded-lg">
                  <h4 className="font-medium mb-2">Instructions:</h4>
                  <p className="text-slate-300 leading-relaxed">{selectedAssignment.instructions}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Due Date:</span>
                    <span>{formatDate(selectedAssignment.due_date)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Max Points:</span>
                    <span>{selectedAssignment.max_points}</span>
                  </div>
                </div>

                {(selectedAssignment.submission_type === "text" || selectedAssignment.submission_type === "both") && (
                  <div>
                    <Label htmlFor="submission-text" className="text-sm font-medium mb-3 block">
                      Text Submission
                    </Label>
                    <Textarea
                      id="submission-text"
                      placeholder="Enter your assignment response here..."
                      value={submissionText}
                      onChange={(e) => setSubmissionText(e.target.value)}
                      rows={8}
                      className="resize-none"
                    />
                  </div>
                )}

                {(selectedAssignment.submission_type === "file" || selectedAssignment.submission_type === "both") && (
                  <div>
                    <Label htmlFor="file-upload" className="text-sm font-medium mb-3 block">
                      File Upload
                    </Label>
                    <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center">
                      <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                      <Input
                        id="file-upload"
                        type="file"
                        onChange={handleFileSelect}
                        className="hidden"
                        accept=".pdf,.doc,.docx,.txt,.zip"
                      />
                      <Label htmlFor="file-upload" className="cursor-pointer">
                        <span className="text-indigo-400 hover:text-indigo-300">Choose a file</span>
                        <span className="text-slate-400"> or drag and drop</span>
                      </Label>
                      <p className="text-xs text-slate-500 mt-2">PDF, DOC, DOCX, TXT, ZIP up to 10MB</p>
                      {selectedFile && (
                        <div className="mt-3 p-2 bg-slate-800 rounded text-sm">Selected: {selectedFile.name}</div>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex space-x-3">
                  <Button
                    onClick={submitAssignment}
                    disabled={isSubmitting || (!submissionText.trim() && !selectedFile)}
                    className="flex-1"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    {isSubmitting ? "Submitting..." : "Submit Assignment"}
                  </Button>
                  <Button variant="outline" onClick={() => setSelectedAssignment(null)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="glass-card">
              <CardContent className="p-8 text-center">
                <FileText className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Assignment Selected</h3>
                <p className="text-slate-400">
                  Select an assignment from the "Available Assignments" tab to begin your submission.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
