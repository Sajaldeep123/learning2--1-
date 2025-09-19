"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, MessageCircle, Calendar, User, Award, Clock } from "lucide-react"

interface MentorRatingCardProps {
  mentor: {
    id: string
    name: string
    avatar_url?: string
    bio: string
    expertise: string[]
    rating: number
    total_reviews: number
    total_sessions: number
    response_time: string
    languages: string[]
    hourly_rate?: number
    availability_status: "available" | "busy" | "offline"
  }
  onBookSession?: (mentorId: string) => void
  onViewProfile?: (mentorId: string) => void
}

export function MentorRatingCard({ mentor, onBookSession, onViewProfile }: MentorRatingCardProps) {
  const StarRating = ({ rating, showCount = false }: { rating: number; showCount?: boolean }) => (
    <div className="flex items-center space-x-1">
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${star <= rating ? "text-yellow-400 fill-yellow-400" : "text-slate-400"}`}
          />
        ))}
      </div>
      {showCount && <span className="text-sm text-slate-400">({mentor.total_reviews} reviews)</span>}
    </div>
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-500"
      case "busy":
        return "bg-yellow-500"
      case "offline":
        return "bg-slate-500"
      default:
        return "bg-slate-500"
    }
  }

  return (
    <Card className="glass-card hover:border-indigo-500/50 transition-all duration-300 group">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Avatar className="w-12 h-12">
                <AvatarImage src={mentor.avatar_url || "/placeholder.svg"} />
                <AvatarFallback>
                  <User className="w-6 h-6" />
                </AvatarFallback>
              </Avatar>
              <div
                className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(mentor.availability_status)} rounded-full border-2 border-background`}
              />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{mentor.name}</h3>
              <div className="flex items-center space-x-2">
                <StarRating rating={mentor.rating} showCount />
              </div>
            </div>
          </div>
          {mentor.hourly_rate && (
            <div className="text-right">
              <div className="text-lg font-bold text-green-400">${mentor.hourly_rate}</div>
              <div className="text-xs text-slate-400">per hour</div>
            </div>
          )}
        </div>

        {/* Bio */}
        <p className="text-slate-300 text-sm mb-4 line-clamp-2">{mentor.bio}</p>

        {/* Expertise Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {mentor.expertise.slice(0, 3).map((skill) => (
            <Badge key={skill} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
          {mentor.expertise.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{mentor.expertise.length - 3} more
            </Badge>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4 text-center">
          <div>
            <div className="flex items-center justify-center space-x-1 text-slate-400 mb-1">
              <Calendar className="w-3 h-3" />
            </div>
            <div className="text-sm font-medium">{mentor.total_sessions}</div>
            <div className="text-xs text-slate-400">Sessions</div>
          </div>
          <div>
            <div className="flex items-center justify-center space-x-1 text-slate-400 mb-1">
              <Clock className="w-3 h-3" />
            </div>
            <div className="text-sm font-medium">{mentor.response_time}</div>
            <div className="text-xs text-slate-400">Response</div>
          </div>
          <div>
            <div className="flex items-center justify-center space-x-1 text-slate-400 mb-1">
              <Award className="w-3 h-3" />
            </div>
            <div className="text-sm font-medium">{mentor.rating.toFixed(1)}</div>
            <div className="text-xs text-slate-400">Rating</div>
          </div>
        </div>

        {/* Languages */}
        <div className="mb-4">
          <div className="text-xs text-slate-400 mb-2">Languages:</div>
          <div className="flex flex-wrap gap-1">
            {mentor.languages.map((lang) => (
              <Badge key={lang} variant="outline" className="text-xs">
                {lang}
              </Badge>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          <Button
            className="flex-1"
            onClick={() => onBookSession?.(mentor.id)}
            disabled={mentor.availability_status === "offline"}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Book Session
          </Button>
          <Button variant="outline" size="sm" onClick={() => onViewProfile?.(mentor.id)}>
            <MessageCircle className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
