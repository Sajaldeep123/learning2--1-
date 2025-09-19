"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  User,
  BookOpen,
  Trophy,
  Target,
  TrendingUp,
  MessageSquare,
  Briefcase,
  Star,
  Clock,
  Users,
  BarChart3,
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import Link from "next/link"

export const dynamic = "force-dynamic"

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  // Mock user data - in real app this would come from API
  const userData = {
    coursesCompleted: 12,
    coursesInProgress: 3,
    totalLearningHours: 156,
    skillsLearned: 28,
    communityPosts: 8,
    jobApplications: 5,
    achievements: [
      { id: 1, title: "First Course Completed", icon: "🎓", date: "2024-01-15" },
      { id: 2, title: "Community Contributor", icon: "💬", date: "2024-01-10" },
      { id: 3, title: "Skill Master", icon: "⭐", date: "2024-01-05" },
    ],
    recentActivity: [
      { id: 1, type: "course", title: "Completed React Fundamentals", date: "2024-01-15" },
      { id: 2, type: "community", title: "Posted in Web Development", date: "2024-01-14" },
      { id: 3, type: "job", title: "Applied to Frontend Developer", date: "2024-01-13" },
      { id: 4, type: "course", title: "Started JavaScript Advanced", date: "2024-01-12" },
    ],
    currentCourses: [
      { id: 1, title: "Advanced JavaScript", progress: 65, totalLessons: 20, completedLessons: 13 },
      { id: 2, title: "React Native Development", progress: 30, totalLessons: 15, completedLessons: 5 },
      { id: 3, title: "UI/UX Design Principles", progress: 80, totalLessons: 12, completedLessons: 10 },
    ],
    skillProgress: [
      { skill: "JavaScript", level: 85 },
      { skill: "React", level: 70 },
      { skill: "Node.js", level: 60 },
      { skill: "Python", level: 45 },
      { skill: "UI/UX Design", level: 55 },
    ],
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "course":
        return <BookOpen className="w-4 h-4" />
      case "community":
        return <MessageSquare className="w-4 h-4" />
      case "job":
        return <Briefcase className="w-4 h-4" />
      default:
        return <Star className="w-4 h-4" />
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case "course":
        return "text-blue-500"
      case "community":
        return "text-green-500"
      case "job":
        return "text-purple-500"
      default:
        return "text-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Welcome back, {user.username}!</h1>
              <p className="text-muted-foreground">Continue your learning journey</p>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="courses">My Courses</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="border-indigo-500/20 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Courses Completed</p>
                      <p className="text-2xl font-bold">{userData.coursesCompleted}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-indigo-500/20 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Learning Hours</p>
                      <p className="text-2xl font-bold">{userData.totalLearningHours}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Clock className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-indigo-500/20 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Skills Learned</p>
                      <p className="text-2xl font-bold">{userData.skillsLearned}</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <Target className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-indigo-500/20 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Community Posts</p>
                      <p className="text-2xl font-bold">{userData.communityPosts}</p>
                    </div>
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Navigation Cards */}
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <Link href="/dashboard/quizzes" passHref>
                <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-200 border-indigo-500/20 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Trophy className="w-5 h-5 text-yellow-500" />
                      <span>Assessments</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Test your knowledge and track progress.</p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/dashboard/career-path" passHref>
                <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-200 border-indigo-500/20 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Target className="w-5 h-5 text-green-500" />
                      <span>Career Paths</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Explore guided learning paths for your career.</p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/dashboard/chat" passHref>
                <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-200 border-indigo-500/20 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <MessageSquare className="w-5 h-5 text-blue-500" />
                      <span>AI Chatbot</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Get instant help and guidance from our AI assistant.</p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/resume" passHref>
                <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-200 border-indigo-500/20 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Briefcase className="w-5 h-5 text-purple-500" />
                      <span>Resume Builder</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Create and optimize your professional resume.</p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/community" passHref>
                <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-200 border-indigo-500/20 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Users className="w-5 h-5 text-orange-500" />
                      <span>Community</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Connect with peers and mentors.</p>
                  </CardContent>
                </Card>
              </Link>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card className="border-indigo-500/20 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5" />
                    <span>Recent Activity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userData.recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center space-x-3">
                        <div className={`${getActivityColor(activity.type)}`}>{getActivityIcon(activity.type)}</div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.title}</p>
                          <p className="text-xs text-muted-foreground">{activity.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Achievements */}
              <Card className="border-indigo-500/20 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Trophy className="w-5 h-5" />
                    <span>Recent Achievements</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userData.achievements.map((achievement) => (
                      <div key={achievement.id} className="flex items-center space-x-3">
                        <div className="text-2xl">{achievement.icon}</div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{achievement.title}</p>
                          <p className="text-xs text-muted-foreground">{achievement.date}</p>
                        </div>
                        <Badge variant="secondary">New</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="courses" className="space-y-6">
            <div className="grid gap-6">
              <Card className="border-indigo-500/20 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Courses in Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {userData.currentCourses.map((course) => (
                      <div key={course.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <h3 className="font-semibold">{course.title}</h3>
                          <span className="text-sm text-muted-foreground">
                            {course.completedLessons}/{course.totalLessons} lessons
                          </span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">{course.progress}% complete</span>
                          <Button size="sm" variant="outline">
                            Continue
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Skill Progress */}
              <Card className="border-indigo-500/20 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5" />
                    <span>Skill Progress</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userData.skillProgress.map((skill, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">{skill.skill}</span>
                          <span className="text-sm text-muted-foreground">{skill.level}%</span>
                        </div>
                        <Progress value={skill.level} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Learning Goals */}
              <Card className="border-indigo-500/20 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="w-5 h-5" />
                    <span>Learning Goals</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border border-dashed border-muted-foreground/30 rounded-lg text-center">
                      <p className="text-muted-foreground mb-2">Set your learning goals</p>
                      <Button size="sm" className="bg-gradient-to-r from-indigo-600 to-purple-600">
                        Add Goal
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card className="border-indigo-500/20 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Username</label>
                      <p className="text-muted-foreground">{user.username}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Email</label>
                      <p className="text-muted-foreground">{user.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Member Since</label>
                      <p className="text-muted-foreground">January 2024</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Learning Streak</label>
                      <p className="text-muted-foreground">15 days</p>
                    </div>
                  </div>
                  <div className="pt-4">
                    <Button className="bg-gradient-to-r from-indigo-600 to-purple-600">Edit Profile</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
