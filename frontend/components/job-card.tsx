"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Briefcase, DollarSign, Calendar, Users } from "lucide-react"

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

interface JobCardProps {
  job: Job
  onApply: (jobId: number) => void
  onViewDetails: (job: Job) => void
}

export function JobCard({ job, onApply, onViewDetails }: JobCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return "1 day ago"
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`
    return date.toLocaleDateString()
  }

  const getExperienceColor = (experience: string) => {
    switch (experience.toLowerCase()) {
      case "fresher":
        return "bg-green-100 text-green-800"
      case "entry level":
        return "bg-blue-100 text-blue-800"
      case "mid level":
        return "bg-purple-100 text-purple-800"
      case "senior level":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "full-time":
        return "bg-indigo-100 text-indigo-800"
      case "part-time":
        return "bg-cyan-100 text-cyan-800"
      case "internship":
        return "bg-pink-100 text-pink-800"
      case "contract":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="border-indigo-500/20 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3
              className="text-xl font-bold mb-2 text-foreground hover:text-indigo-400 cursor-pointer transition-colors"
              onClick={() => onViewDetails(job)}
            >
              {job.title}
            </h3>
            <div className="flex items-center space-x-2 text-muted-foreground mb-2">
              <Users className="w-4 h-4" />
              <span className="font-semibold">{job.company}</span>
            </div>
          </div>
          <Badge variant="outline" className={getExperienceColor(job.experience)}>
            {job.experience}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{job.location}</span>
            {job.isRemote && (
              <Badge variant="secondary" className="text-xs">
                Remote
              </Badge>
            )}
          </div>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Briefcase className="w-4 h-4" />
            <Badge className={getTypeColor(job.type)}>{job.type}</Badge>
          </div>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <DollarSign className="w-4 h-4" />
            <span className="font-semibold text-green-600">{job.salary}</span>
          </div>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(job.postedDate)}</span>
          </div>
        </div>

        <p className="text-muted-foreground mb-4 line-clamp-2">{job.description}</p>

        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {job.requirements.slice(0, 4).map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
            {job.requirements.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{job.requirements.length - 4} more
              </Badge>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <Button variant="outline" onClick={() => onViewDetails(job)} className="flex-1 mr-2">
            View Details
          </Button>
          <Button
            onClick={() => onApply(job.id)}
            className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
          >
            Apply Now
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
