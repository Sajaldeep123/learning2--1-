"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Send, User } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"

interface MentorFeedbackFormProps {
  mentor: {
    id: string
    name: string
    avatar_url?: string
    expertise: string[]
  }
  sessionId?: string
  onSubmitSuccess?: () => void
  onCancel?: () => void
}

interface CategoryRatings {
  communication: number
  expertise: number
  helpfulness: number
  professionalism: number
}

export function MentorFeedbackForm({ mentor, sessionId, onSubmitSuccess, onCancel }: MentorFeedbackFormProps) {
  const [overallRating, setOverallRating] = useState(0)
  const [categoryRatings, setCategoryRatings] = useState<CategoryRatings>({
    communication: 0,
    expertise: 0,
    helpfulness: 0,
    professionalism: 0,
  })
  const [feedbackText, setFeedbackText] = useState("")
  const [feedbackType, setFeedbackType] = useState<"session" | "general" | "assignment">("session")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { user } = useAuth()
  const { toast } = useToast()
  const supabase = createClient()

  const StarRating = ({
    rating,
    onRatingChange,
    size = "w-6 h-6",
  }: {
    rating: number
    onRatingChange: (rating: number) => void
    size?: string
  }) => (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onRatingChange(star)}
          className="transition-colors hover:scale-110"
        >
          <Star
            className={`${size} ${
              star <= rating ? "text-yellow-400 fill-yellow-400" : "text-slate-400 hover:text-yellow-300"
            }`}
          />
        </button>
      ))}
    </div>
  )

  const handleCategoryRating = (category: keyof CategoryRatings, rating: number) => {
    setCategoryRatings((prev) => ({
      ...prev,
      [category]: rating,
    }))
  }

  const handleSubmit = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to submit feedback.",
        variant: "destructive",
      })
      return
    }

    if (overallRating === 0) {
      toast({
        title: "Rating Required",
        description: "Please provide an overall rating.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const { error } = await supabase.from("mentor_feedback").insert({
        mentor_id: mentor.id,
        student_id: user.id,
        session_id: sessionId,
        rating: overallRating,
        feedback_text: feedbackText.trim() || null,
        feedback_type: feedbackType,
        categories: categoryRatings,
      })

      if (error) throw error

      // Update mentor's average rating
      const { error: updateError } = await supabase.rpc("update_mentor_rating", {
        mentor_id: mentor.id,
      })

      if (updateError) console.warn("Failed to update mentor rating:", updateError)

      toast({
        title: "Feedback Submitted",
        description: "Thank you for your feedback! It helps improve our mentorship program.",
      })

      onSubmitSuccess?.()
    } catch (error) {
      console.error("Error submitting feedback:", error)
      toast({
        title: "Submission Failed",
        description: "Failed to submit feedback. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const categories = [
    {
      key: "communication" as keyof CategoryRatings,
      label: "Communication",
      description: "Clear and effective communication",
    },
    { key: "expertise" as keyof CategoryRatings, label: "Expertise", description: "Knowledge and technical skills" },
    {
      key: "helpfulness" as keyof CategoryRatings,
      label: "Helpfulness",
      description: "Willingness to help and support",
    },
    {
      key: "professionalism" as keyof CategoryRatings,
      label: "Professionalism",
      description: "Professional conduct and reliability",
    },
  ]

  return (
    <Card className="glass-card max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-3">
          <Avatar className="w-12 h-12">
            <AvatarImage src={mentor.avatar_url || "/placeholder.svg"} />
            <AvatarFallback>
              <User className="w-6 h-6" />
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-xl font-bold">Rate Your Experience</h3>
            <p className="text-slate-400">with {mentor.name}</p>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Mentor Expertise */}
        <div>
          <div className="flex flex-wrap gap-2">
            {mentor.expertise.map((skill) => (
              <Badge key={skill} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Feedback Type */}
        <div>
          <label className="text-sm font-medium mb-3 block">Feedback Type</label>
          <div className="flex space-x-2">
            {[
              { value: "session", label: "Session" },
              { value: "general", label: "General" },
              { value: "assignment", label: "Assignment" },
            ].map((type) => (
              <Button
                key={type.value}
                type="button"
                variant={feedbackType === type.value ? "default" : "outline"}
                size="sm"
                onClick={() => setFeedbackType(type.value as any)}
              >
                {type.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Overall Rating */}
        <div>
          <label className="text-sm font-medium mb-3 block">Overall Rating *</label>
          <div className="flex items-center space-x-3">
            <StarRating rating={overallRating} onRatingChange={setOverallRating} size="w-8 h-8" />
            <span className="text-sm text-slate-400">{overallRating > 0 && `${overallRating} out of 5 stars`}</span>
          </div>
        </div>

        {/* Category Ratings */}
        <div>
          <label className="text-sm font-medium mb-4 block">Detailed Ratings</label>
          <div className="space-y-4">
            {categories.map((category) => (
              <div key={category.key} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="font-medium text-sm">{category.label}</div>
                  <div className="text-xs text-slate-400">{category.description}</div>
                </div>
                <StarRating
                  rating={categoryRatings[category.key]}
                  onRatingChange={(rating) => handleCategoryRating(category.key, rating)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Written Feedback */}
        <div>
          <label className="text-sm font-medium mb-3 block">Written Feedback (Optional)</label>
          <Textarea
            placeholder="Share your experience, what went well, and any suggestions for improvement..."
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            rows={4}
            className="resize-none"
          />
          <div className="text-xs text-slate-400 mt-2">{feedbackText.length}/500 characters</div>
        </div>

        {/* Actions */}
        <div className="flex space-x-3 pt-4">
          <Button onClick={handleSubmit} disabled={isSubmitting || overallRating === 0} className="flex-1">
            <Send className="w-4 h-4 mr-2" />
            {isSubmitting ? "Submitting..." : "Submit Feedback"}
          </Button>
          {onCancel && (
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
