"use client"

import { CommunityFeed } from "@/components/community-feed"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, TrendingUp, BookOpen, Star } from "lucide-react"

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Community
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Hub</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect with fellow learners, share your projects, and grow together in our vibrant community.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-3">
            <CommunityFeed />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Community Stats */}
            <Card className="border-indigo-500/20 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-indigo-400" />
                  Community Stats
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Active Members</span>
                    <span className="font-semibold">2,847</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Posts Today</span>
                    <span className="font-semibold">156</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Knowledge Shared</span>
                    <span className="font-semibold">12.4k</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trending Topics */}
            <Card className="border-indigo-500/20 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Star className="w-5 h-5 mr-2 text-yellow-400" />
                  Trending Topics
                </h3>
                <div className="space-y-2">
                  {[
                    { tag: "MachineLearning", count: 234 },
                    { tag: "WebDevelopment", count: 189 },
                    { tag: "DataScience", count: 156 },
                    { tag: "ReactJS", count: 143 },
                    { tag: "Python", count: 128 },
                    { tag: "UXDesign", count: 98 },
                  ].map((topic, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <Badge variant="secondary" className="text-xs">
                        #{topic.tag}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{topic.count} posts</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Contributors */}
            <Card className="border-indigo-500/20 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-green-400" />
                  Top Contributors
                </h3>
                <div className="space-y-3">
                  {[
                    { name: "Priya Patel", role: "UX Designer", contributions: 47 },
                    { name: "Rahul Sharma", role: "Data Scientist", contributions: 42 },
                    { name: "Arjun Kumar", role: "Full Stack Dev", contributions: 38 },
                  ].map((contributor, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-xs text-white font-bold">{contributor.name[0]}</span>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold">{contributor.name}</div>
                        <div className="text-xs text-muted-foreground">{contributor.role}</div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {contributor.contributions}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Learning Resources */}
            <Card className="border-indigo-500/20 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-blue-400" />
                  Featured Resources
                </h3>
                <div className="space-y-3">
                  {[
                    "Complete React Roadmap 2024",
                    "Python for Data Science Guide",
                    "UI/UX Design Principles",
                    "Machine Learning Basics",
                  ].map((resource, index) => (
                    <div
                      key={index}
                      className="text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                    >
                      • {resource}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
