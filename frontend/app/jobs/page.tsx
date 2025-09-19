"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Loader2, Search, MapPin, Briefcase, DollarSign, Calendar, X } from "lucide-react"
import { useAuth } => "@/contexts/auth-context"

interface Job {
  id: number
  title: string
  company: string
  location: string
  type: string
  experience: string
  salary: string
  description: string
  requirements: string[]
  benefits: string[]
  postedDate: string
  applicationDeadline: string
  isRemote: boolean
  category: string
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedExperience, setSelectedExperience] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("")
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState(false)
  const [coverLetter, setCoverLetter] = useState("")
  const [resume, setResume] = useState("")
  const [isApplying, setIsApplying] = useState(false)
  const [applyMessage, setApplyMessage] = useState<string | null>(null)
  const { user } = useAuth()

  const fetchJobs = async () => {
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams({
        ...(selectedCategory !== "all" && { category: selectedCategory }),
        ...(selectedType !== "all" && { type: selectedType }),
        ...(selectedExperience !== "all" && { experience: selectedExperience }),
        ...(selectedLocation && { location: selectedLocation }),
        ...(searchQuery && { search: searchQuery }),
      }).toString()

      const response = await fetch(`http://localhost:3001/api/jobs?${params}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setJobs(data.jobs)
    } catch (err: any) {
      setError(err.message || "Failed to fetch jobs")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [selectedCategory, selectedType, selectedExperience, selectedLocation, searchQuery])

  const handleApply = async () => {
    if (!selectedJob || !user) return

    setIsApplying(true)
    setApplyMessage(null)

    try {
      const response = await fetch(`http://localhost:3001/api/jobs/${selectedJob.id}/apply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          coverLetter,
          resume,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setApplyMessage(data.msg || "Application submitted successfully!")
        setIsApplyDialogOpen(false)
        setCoverLetter("")
        setResume("")
      } else {
        setApplyMessage(data.msg || "Failed to submit application.")
      }
    } catch (err) {
      setApplyMessage("An error occurred while submitting your application.")
    } finally {
      setIsApplying(false)
    }
  }

  const openApplyDialog = (job: Job) => {
    setSelectedJob(job)
    setIsApplyDialogOpen(true)
    setApplyMessage(null)
  }

  const closeApplyDialog = () => {
    setIsApplyDialogOpen(false)
    setSelectedJob(null)
    setCoverLetter("")
    setResume("")
    setApplyMessage(null)
  }

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "Technology", label: "Technology" },
    { value: "Data Science", label: "Data Science" },
    { value: "Design", label: "Design" },
    { value: "Marketing", label: "Marketing" },
    { value: "Business", label: "Business" },
  ]

  const types = [
    { value: "all", label: "All Types" },
    { value: "Full-time", label: "Full-time" },
    { value: "Part-time", label: "Part-time" },
    { value: "Internship", label: "Internship" },
    { value: "Contract", label: "Contract" },
  ]

  const experiences = [
    { value: "all", label: "All Experience Levels" },
    { value: "Entry Level", label: "Entry Level" },
    { value: "Mid Level", label: "Mid Level" },
    { value: "Senior Level", label: "Senior Level" },
    { value: "Fresher", label: "Fresher" },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-10 text-primary">Job Opportunities</h1>

      {/* Filters and Search */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <Input
          type="text"
          placeholder="Search by title, company, or keywords..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="lg:col-span-2"
          icon={<Search className="h-4 w-4 text-muted-foreground" />}
        />
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger>
            <SelectValue placeholder="Job Type" />
          </SelectTrigger>
          <SelectContent>
            {types.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedExperience} onValueChange={setSelectedExperience}>
          <SelectTrigger>
            <SelectValue placeholder="Experience Level" />
          </SelectTrigger>
          <SelectContent>
            {experiences.map((exp) => (
              <SelectItem key={exp.value} value={exp.value}>
                {exp.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Job Listings */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : error ? (
        <div className="text-center text-destructive text-lg">Error: {error}</div>
      ) : jobs.length === 0 ? (
        <div className="text-center text-muted-foreground text-lg">No jobs found matching your criteria.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <Card key={job.id} className="flex flex-col justify-between">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-primary">{job.title}</CardTitle>
                <div className="text-muted-foreground text-sm">{job.company}</div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-2" /> {job.location} {job.isRemote && "(Remote)"}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Briefcase className="w-4 h-4 mr-2" /> {job.type} • {job.experience}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <DollarSign className="w-4 h-4 mr-2" /> {job.salary}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4 mr-2" /> Apply by {new Date(job.applicationDeadline).toLocaleDateString()}
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {job.requirements.slice(0, 3).map((req, index) => (
                    <Badge key={index} variant="secondary">
                      {req}
                    </Badge>
                  ))}
                  {job.requirements.length > 3 && <Badge variant="secondary">+{job.requirements.length - 3}</Badge>}
                </div>
                <Button onClick={() => openApplyDialog(job)} className="w-full mt-4">
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Apply Dialog */}
      <Dialog open={isApplyDialogOpen} onOpenChange={setIsApplyDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Apply for {selectedJob?.title}</DialogTitle>
            <DialogDescription>Fill out your details to apply for this position.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="coverLetter">Cover Letter</Label>
              <Textarea
                id="coverLetter"
                placeholder="Write your cover letter here..."
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                rows={5}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="resume">Resume Link (Optional)</Label>
              <Input
                id="resume"
                placeholder="Link to your online resume or portfolio..."
                value={resume}
                onChange={(e) => setResume(e.target.value)}
              />
            </div>
          </div>
          {applyMessage && (
            <p className={`text-sm ${applyMessage.includes("successfully") ? "text-green-500" : "text-red-500"}`}>
              {applyMessage}
            </p>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={closeApplyDialog}>
              Cancel
            </Button>
            <Button onClick={handleApply} disabled={isApplying || !user}>
              {isApplying && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isApplying ? "Applying..." : "Submit Application"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
