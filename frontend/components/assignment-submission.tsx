"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Upload, FileText, X, CheckCircle, Clock } from "lucide-react"

interface AssignmentSubmissionProps {
  assignmentId: string
  onBack: () => void
}

export function AssignmentSubmission({ assignmentId, onBack }: AssignmentSubmissionProps) {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [submissionText, setSubmissionText] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  // Mock assignment data
  const assignment = {
    id: assignmentId,
    title: "E-commerce Website Development",
    description:
      "Build a full-stack e-commerce website using React, Node.js, and MongoDB. Include user authentication, product catalog, shopping cart, and payment integration.",
    dueDate: "2024-01-25",
    maxSubmissions: 3,
    currentSubmissions: 0,
    requirements: [
      "Complete source code with documentation",
      "Database schema and setup instructions",
      "README file with installation steps",
      "Screenshots or video demo of the application",
      "Brief report explaining your approach and challenges faced",
    ],
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setUploadedFiles((prev) => [...prev, ...acceptedFiles])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize: 50 * 1024 * 1024, // 50MB
  })

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setUploadProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsSubmitting(false)
          // Show success message and redirect
          setTimeout(() => {
            onBack()
          }, 2000)
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  const getDaysUntilDue = () => {
    const due = new Date(assignment.dueDate)
    const now = new Date()
    const diffTime = due.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const daysLeft = getDaysUntilDue()

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Assignments
        </Button>
        <div className="flex items-center space-x-2">
          <Badge variant={daysLeft < 0 ? "destructive" : daysLeft <= 2 ? "secondary" : "outline"}>
            <Clock className="w-3 h-3 mr-1" />
            {daysLeft < 0
              ? `${Math.abs(daysLeft)} days overdue`
              : daysLeft === 0
                ? "Due today"
                : `${daysLeft} days left`}
          </Badge>
          <Badge variant="outline">
            {assignment.currentSubmissions}/{assignment.maxSubmissions} submissions
          </Badge>
        </div>
      </div>

      {/* Assignment Details */}
      <Card>
        <CardHeader>
          <CardTitle>{assignment.title}</CardTitle>
          <CardDescription>Due: {new Date(assignment.dueDate).toLocaleDateString()}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">{assignment.description}</p>

          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Requirements:</h4>
            <ul className="space-y-1">
              {assignment.requirements.map((req, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start space-x-2">
                  <span className="text-primary mt-1">•</span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* File Upload */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="w-5 h-5" />
            <span>Upload Files</span>
          </CardTitle>
          <CardDescription>Upload your project files, documentation, and any supporting materials</CardDescription>
        </CardHeader>
        <CardContent>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50"
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            {isDragActive ? (
              <p className="text-lg font-medium">Drop your files here...</p>
            ) : (
              <div>
                <p className="text-lg font-medium mb-2">Drag & drop your files here, or click to browse</p>
                <p className="text-sm text-muted-foreground">Supports all file types, max 50MB per file</p>
              </div>
            )}
          </div>

          {uploadedFiles.length > 0 && (
            <div className="mt-6 space-y-2">
              <h4 className="text-sm font-semibold">Uploaded Files</h4>
              {uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="text-sm font-medium">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeFile(index)} className="h-8 w-8">
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Submission Notes */}
      <Card>
        <CardHeader>
          <CardTitle>Submission Notes</CardTitle>
          <CardDescription>Add any additional comments or explanations about your submission</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Describe your approach, challenges faced, or any additional information you'd like to share with your mentor..."
            value={submissionText}
            onChange={(e) => setSubmissionText(e.target.value)}
            rows={6}
          />
        </CardContent>
      </Card>

      {/* Submit Section */}
      <Card>
        <CardContent className="p-6">
          {isSubmitting ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Upload className="w-4 h-4 animate-pulse" />
                <span className="text-sm">Submitting assignment...</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Please don't close this page while your submission is being uploaded.
              </p>
            </div>
          ) : uploadProgress === 100 ? (
            <div className="text-center space-y-2">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
              <h3 className="text-lg font-semibold">Submission Successful!</h3>
              <p className="text-muted-foreground">
                Your assignment has been submitted successfully. You'll receive feedback from your mentor soon.
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">Ready to submit?</p>
                <p className="text-xs text-muted-foreground">
                  Make sure you've uploaded all required files and added any necessary notes.
                </p>
              </div>
              <Button
                onClick={handleSubmit}
                disabled={uploadedFiles.length === 0}
                className="bg-green-600 hover:bg-green-700"
              >
                <Upload className="w-4 h-4 mr-2" />
                Submit Assignment
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
