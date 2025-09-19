"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ResumeAnalysis } from "@/components/resume-analysis"
import { Upload, FileText, Link, X, CheckCircle, Loader2, AlertTriangle } from "lucide-react"

export function ResumeUpload() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [externalLinks, setExternalLinks] = useState<string[]>([])
  const [newLink, setNewLink] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [targetRole, setTargetRole] = useState("")
  const [experienceLevel, setExperienceLevel] = useState("")
  const [specificFeedback, setSpecificFeedback] = useState("")
  const [uploadError, setUploadError] = useState<string | null>(null)

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    setUploadError(null)

    // Handle rejected files
    if (rejectedFiles.length > 0) {
      const errors = rejectedFiles.map((file) => {
        if (file.file.size > 10 * 1024 * 1024) {
          return `${file.file.name}: File too large (max 10MB)`
        }
        return `${file.file.name}: Invalid file type`
      })
      setUploadError(errors.join(", "))
      return
    }

    setUploadedFiles((prev) => [...prev, ...acceptedFiles])

    setIsUploading(true)
    setUploadProgress(0)

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
      "application/msword": [".doc"],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: false, // Only allow single file upload for better analysis
  })

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const addExternalLink = () => {
    if (newLink.trim()) {
      try {
        new URL(newLink.trim())
        setExternalLinks((prev) => [...prev, newLink.trim()])
        setNewLink("")
      } catch {
        setUploadError("Please enter a valid URL")
      }
    }
  }

  const removeLink = (index: number) => {
    setExternalLinks((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmitForReview = async () => {
    if (uploadedFiles.length === 0) {
      setUploadError("Please upload a resume file first")
      return
    }

    if (!targetRole.trim()) {
      setUploadError("Please specify your target role")
      return
    }

    // Here you would typically send the data to your backend
    console.log("[v0] Submitting resume for review:", {
      files: uploadedFiles,
      links: externalLinks,
      targetRole,
      experienceLevel,
      specificFeedback,
    })

    // Show success message or redirect
    alert("Resume submitted for mentor review!")
  }

  return (
    <div className="space-y-6">
      {/* File Upload */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="w-5 h-5" />
            <span>Upload Resume</span>
          </CardTitle>
          <CardDescription>
            Upload your resume in PDF or DOCX format (max 10MB). Our AI will analyze it for formatting, content, and ATS
            compatibility.
          </CardDescription>
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
              <p className="text-lg font-medium">Drop your resume here...</p>
            ) : (
              <div>
                <p className="text-lg font-medium mb-2">Drag & drop your resume here, or click to browse</p>
                <p className="text-sm text-muted-foreground">Supports PDF, DOC, and DOCX files</p>
              </div>
            )}
          </div>

          {uploadError && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              <span className="text-sm text-red-700">{uploadError}</span>
            </div>
          )}

          {isUploading && (
            <div className="mt-4 space-y-2">
              <div className="flex items-center space-x-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">Uploading and analyzing...</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}

          {uploadedFiles.length > 0 && (
            <div className="mt-4 space-y-2">
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
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Uploaded
                    </Badge>
                    <Button variant="ghost" size="icon" onClick={() => removeFile(index)} className="h-8 w-8">
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {uploadedFiles.length > 0 && (
        <ResumeAnalysis file={uploadedFiles[0]} targetRole={targetRole} experienceLevel={experienceLevel} />
      )}

      {/* External Links */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Link className="w-5 h-5" />
            <span>External Portfolio Links</span>
          </CardTitle>
          <CardDescription>Add links to your online portfolio, LinkedIn, GitHub, etc.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Input
              placeholder="https://linkedin.com/in/yourprofile"
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addExternalLink()}
            />
            <Button onClick={addExternalLink} disabled={!newLink.trim()}>
              Add Link
            </Button>
          </div>

          {externalLinks.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-semibold">Added Links</h4>
              {externalLinks.map((link, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Link className="w-4 h-4 text-blue-500" />
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline truncate max-w-xs"
                    >
                      {link}
                    </a>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeLink(index)} className="h-8 w-8">
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Additional Information */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Information</CardTitle>
          <CardDescription>Provide context to help mentors give better feedback</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="target-role">Target Role/Industry *</Label>
            <Input
              id="target-role"
              placeholder="e.g., Software Engineer, Data Scientist, Product Manager"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="experience-level">Experience Level</Label>
            <Input
              id="experience-level"
              placeholder="e.g., Entry Level, 2-3 years, Senior"
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="specific-feedback">Specific Areas for Feedback</Label>
            <Textarea
              id="specific-feedback"
              placeholder="What specific aspects would you like feedback on? (e.g., technical skills section, work experience descriptions, overall formatting)"
              rows={3}
              value={specificFeedback}
              onChange={(e) => setSpecificFeedback(e.target.value)}
            />
          </div>

          <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600" onClick={handleSubmitForReview}>
            Request Mentor Review
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
