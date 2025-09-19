"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, MessageSquare, TrendingUp, Users, Send, Quote } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/contexts/auth-context"

interface Review {
  id: string
  user_name: string
  rating: number
  title: string
  content: string
  category: string
  is_featured: boolean
  created_at: string
}

interface ReviewFormData {
  name: string
  email: string
  rating: number
  title: string
  content: string
  category: string
}

export function ReviewSection() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState<ReviewFormData>({
    name: "",
    email: "",
    rating: 5,
    title: "",
    content: "",
    category: "general",
  })
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const { user } = useAuth()
  const supabase = createClient()

  useEffect(() => {
    fetchReviews()
  }, [])

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(6)

      if (error) throw error
      setReviews(data || [])
    } catch (error) {
      console.error("Error fetching reviews:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const reviewData = {
        user_id: user?.id || null,
        user_name: formData.name,
        user_email: formData.email,
        rating: formData.rating,
        title: formData.title,
        content: formData.content,
        category: formData.category,
      }

      const { error } = await supabase.from("reviews").insert([reviewData])

      if (error) throw error

      setSuccess(true)
      setFormData({
        name: "",
        email: "",
        rating: 5,
        title: "",
        content: "",
        category: "general",
      })
      setShowForm(false)
      fetchReviews() // Refresh reviews

      setTimeout(() => setSuccess(false), 3000)
    } catch (error: any) {
      setError(error.message || "Failed to submit review")
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
            } ${interactive ? "cursor-pointer hover:text-yellow-400" : ""}`}
            onClick={() => interactive && onRatingChange?.(star)}
          />
        ))}
      </div>
    )
  }

  const averageRating =
    reviews.length > 0 ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1) : "0.0"

  const categoryColors: Record<string, string> = {
    general: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    platform: "bg-green-500/20 text-green-400 border-green-500/30",
    mentorship: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    ai_assistant: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
    job_marketplace: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  }

  return (
    <section id="reviews" className="py-20 bg-slate-900/30 section-reveal">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6">
            What Our Community
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              {" "}
              Says About Us
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Real feedback from students, professionals, and mentors who are part of our growing community. Your voice
            matters - help us improve and inspire others!
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-8">
            <Card className="glass-card border-yellow-500/20">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-2">
                  {renderStars(Math.round(Number.parseFloat(averageRating)))}
                </div>
                <div className="text-3xl font-bold text-yellow-400 mb-1">{averageRating}</div>
                <div className="text-sm text-slate-400">Average Rating</div>
              </CardContent>
            </Card>
            <Card className="glass-card border-indigo-500/20">
              <CardContent className="p-6 text-center">
                <MessageSquare className="w-8 h-8 text-indigo-400 mx-auto mb-2" />
                <div className="text-3xl font-bold text-indigo-400 mb-1">{reviews.length}</div>
                <div className="text-sm text-slate-400">Total Reviews</div>
              </CardContent>
            </Card>
            <Card className="glass-card border-green-500/20">
              <CardContent className="p-6 text-center">
                <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <div className="text-3xl font-bold text-green-400 mb-1">98%</div>
                <div className="text-sm text-slate-400">Satisfaction Rate</div>
              </CardContent>
            </Card>
          </div>

          <Button
            onClick={() => setShowForm(!showForm)}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 px-8 py-3 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Star className="w-5 h-5 mr-2" />
            Write a Review
          </Button>
        </div>

        {/* Success Message */}
        {success && (
          <div className="max-w-2xl mx-auto mb-8">
            <Card className="border-green-500/50 bg-green-500/10">
              <CardContent className="p-4 text-center">
                <p className="text-green-400 font-medium">
                  Thank you for your review! It has been submitted successfully.
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Review Form */}
        {showForm && (
          <div className="max-w-2xl mx-auto mb-16">
            <Card className="glass-card border-indigo-500/30">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Share Your Experience</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Your Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter your name"
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Enter your email"
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>Rating *</Label>
                      <div className="mt-2">
                        {renderStars(formData.rating, true, (rating) => setFormData({ ...formData, rating }))}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => setFormData({ ...formData, category: value })}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Experience</SelectItem>
                          <SelectItem value="platform">Platform Features</SelectItem>
                          <SelectItem value="mentorship">Mentorship Program</SelectItem>
                          <SelectItem value="ai_assistant">AI Assistant</SelectItem>
                          <SelectItem value="job_marketplace">Job Marketplace</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="title">Review Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Summarize your experience in a few words"
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="content">Your Review *</Label>
                    <textarea
                      id="content"
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      placeholder="Tell us about your experience with EduCareer. What did you like? How can we improve?"
                      required
                      rows={4}
                      className="mt-1 w-full px-3 py-2 bg-background border border-input rounded-md text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                    />
                  </div>

                  {error && (
                    <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-md p-3">
                      {error}
                    </div>
                  )}

                  <div className="flex gap-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Submit Review
                        </>
                      )}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setShowForm(false)} className="px-6">
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="glass-card animate-pulse">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-slate-700 rounded-full" />
                    <div className="flex-1">
                      <div className="h-4 bg-slate-700 rounded mb-2" />
                      <div className="h-3 bg-slate-700 rounded w-2/3" />
                    </div>
                  </div>
                  <div className="h-4 bg-slate-700 rounded mb-2" />
                  <div className="h-3 bg-slate-700 rounded mb-4" />
                  <div className="h-16 bg-slate-700 rounded" />
                </CardContent>
              </Card>
            ))
          ) : reviews.length > 0 ? (
            reviews.map((review) => (
              <Card key={review.id} className="glass-card hover:scale-105 transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-lg">{review.user_name.charAt(0).toUpperCase()}</span>
                      </div>
                      <div>
                        <div className="font-semibold text-white">{review.user_name}</div>
                        <div className="flex items-center space-x-2">
                          {renderStars(review.rating)}
                          <span className="text-xs text-slate-400">
                            {new Date(review.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    {review.is_featured && (
                      <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Featured</Badge>
                    )}
                  </div>

                  <div className="mb-3">
                    <Badge className={`text-xs ${categoryColors[review.category] || categoryColors.general}`}>
                      {review.category.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                    </Badge>
                  </div>

                  <h3 className="font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                    {review.title}
                  </h3>

                  <div className="relative">
                    <Quote className="w-4 h-4 text-slate-500 absolute -top-1 -left-1" />
                    <p className="text-slate-300 text-sm leading-relaxed pl-4">{review.content}</p>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <MessageSquare className="w-16 h-16 text-slate-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-400 mb-2">No reviews yet</h3>
              <p className="text-slate-500">Be the first to share your experience!</p>
            </div>
          )}
        </div>

        {/* Call to Action */}
        {reviews.length > 0 && (
          <div className="text-center mt-12">
            <p className="text-slate-400 mb-4">Want to see more reviews or share your own experience?</p>
            <Button
              variant="outline"
              onClick={() => setShowForm(true)}
              className="border-indigo-500/50 text-indigo-400 hover:bg-indigo-500/10"
            >
              <Users className="w-4 h-4 mr-2" />
              Join the Conversation
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
