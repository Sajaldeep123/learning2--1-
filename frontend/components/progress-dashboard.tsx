"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts"
import {
  TrendingUp,
  Target,
  Award,
  Clock,
  BookOpen,
  Users,
  Star,
  Calendar,
  Activity,
  CheckCircle,
  Trophy,
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/contexts/auth-context"

interface ProgressStats {
  totalCourses: number
  completedCourses: number
  totalQuizzes: number
  completedQuizzes: number
  averageQuizScore: number
  totalAssignments: number
  completedAssignments: number
  averageAssignmentScore: number
  mentorSessions: number
  studyHours: number
  currentStreak: number
  longestStreak: number
}

interface ActivityData {
  date: string
  studyTime: number
  quizzes: number
  assignments: number
  sessions: number
}

interface SkillProgress {
  skill: string
  level: number
  progress: number
  totalExercises: number
  completedExercises: number
}

export function ProgressDashboard() {
  const [stats, setStats] = useState<ProgressStats>({
    totalCourses: 0,
    completedCourses: 0,
    totalQuizzes: 0,
    completedQuizzes: 0,
    averageQuizScore: 0,
    totalAssignments: 0,
    completedAssignments: 0,
    averageAssignmentScore: 0,
    mentorSessions: 0,
    studyHours: 0,
    currentStreak: 0,
    longestStreak: 0,
  })

  const [activityData, setActivityData] = useState<ActivityData[]>([])
  const [skillProgress, setSkillProgress] = useState<SkillProgress[]>([])
  const [loading, setLoading] = useState(true)

  const { user } = useAuth()
  const supabase = createClient()

  useEffect(() => {
    if (user) {
      loadDashboardData()
    }
  }, [user])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      await Promise.all([loadProgressStats(), loadActivityData(), loadSkillProgress()])
    } catch (error) {
      console.error("Error loading dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  const loadProgressStats = async () => {
    if (!user) return

    try {
      // Load quiz stats
      const { data: quizAttempts } = await supabase
        .from("quiz_attempts")
        .select("score, percentage, quiz_id")
        .eq("student_id", user.id)
        .eq("status", "completed")

      // Load assignment stats
      const { data: assignments } = await supabase
        .from("assignment_submissions")
        .select("score, assignment_id")
        .eq("student_id", user.id)
        .eq("status", "graded")

      // Load mentor session stats
      const { data: sessions } = await supabase
        .from("mentor_sessions")
        .select("id")
        .eq("student_id", user.id)
        .eq("status", "completed")

      const uniqueQuizzes = new Set(quizAttempts?.map((q) => q.quiz_id) || [])
      const uniqueAssignments = new Set(assignments?.map((a) => a.assignment_id) || [])

      const avgQuizScore = quizAttempts?.length
        ? quizAttempts.reduce((sum, q) => sum + (q.percentage || 0), 0) / quizAttempts.length
        : 0

      const avgAssignmentScore = assignments?.length
        ? assignments.reduce((sum, a) => sum + (a.score || 0), 0) / assignments.length
        : 0

      setStats({
        totalCourses: 12, // Mock data
        completedCourses: 8, // Mock data
        totalQuizzes: 25, // Mock data
        completedQuizzes: uniqueQuizzes.size,
        averageQuizScore: Math.round(avgQuizScore),
        totalAssignments: 15, // Mock data
        completedAssignments: uniqueAssignments.size,
        averageAssignmentScore: Math.round(avgAssignmentScore),
        mentorSessions: sessions?.length || 0,
        studyHours: 127, // Mock data
        currentStreak: 7, // Mock data
        longestStreak: 15, // Mock data
      })
    } catch (error) {
      console.error("Error loading progress stats:", error)
    }
  }

  const loadActivityData = async () => {
    // Mock activity data for the last 30 days
    const mockData: ActivityData[] = []
    const today = new Date()

    for (let i = 29; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)

      mockData.push({
        date: date.toISOString().split("T")[0],
        studyTime: Math.floor(Math.random() * 4) + 1,
        quizzes: Math.floor(Math.random() * 3),
        assignments: Math.floor(Math.random() * 2),
        sessions: Math.floor(Math.random() * 2),
      })
    }

    setActivityData(mockData)
  }

  const loadSkillProgress = async () => {
    // Mock skill progress data
    const mockSkills: SkillProgress[] = [
      {
        skill: "JavaScript",
        level: 3,
        progress: 75,
        totalExercises: 40,
        completedExercises: 30,
      },
      {
        skill: "React",
        level: 2,
        progress: 60,
        totalExercises: 35,
        completedExercises: 21,
      },
      {
        skill: "Node.js",
        level: 2,
        progress: 45,
        totalExercises: 30,
        completedExercises: 14,
      },
      {
        skill: "Python",
        level: 1,
        progress: 30,
        totalExercises: 25,
        completedExercises: 8,
      },
      {
        skill: "SQL",
        level: 2,
        progress: 80,
        totalExercises: 20,
        completedExercises: 16,
      },
    ]

    setSkillProgress(mockSkills)
  }

  const pieData = [
    { name: "Completed", value: stats.completedCourses, color: "#10b981" },
    { name: "In Progress", value: stats.totalCourses - stats.completedCourses, color: "#3b82f6" },
  ]

  const getSkillLevelColor = (level: number) => {
    switch (level) {
      case 1:
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case 2:
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case 3:
        return "bg-purple-500/20 text-purple-400 border-purple-500/30"
      case 4:
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      case 5:
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30"
    }
  }

  const getSkillLevelName = (level: number) => {
    const levels = ["Beginner", "Intermediate", "Advanced", "Expert", "Master"]
    return levels[level - 1] || "Beginner"
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto space-y-6">
        <Card className="glass-card">
          <CardContent className="p-8 text-center">
            <Activity className="w-12 h-12 text-indigo-400 mx-auto mb-4 animate-pulse" />
            <h3 className="text-xl font-semibold mb-2">Loading Your Progress</h3>
            <p className="text-slate-400">Analyzing your learning journey...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <Activity className="w-6 h-6 text-indigo-400" />
            <span>Progress Dashboard</span>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="glass-card">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-green-400 mb-1">{stats.completedCourses}</div>
            <div className="text-sm text-slate-400">Courses Completed</div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-blue-400 mb-1">{stats.averageQuizScore}%</div>
            <div className="text-sm text-slate-400">Avg Quiz Score</div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-purple-400 mb-1">{stats.mentorSessions}</div>
            <div className="text-sm text-slate-400">Mentor Sessions</div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-orange-400 mb-1">{stats.currentStreak}</div>
            <div className="text-sm text-slate-400">Day Streak</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Course Progress */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5" />
                  <span>Course Progress</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Overall Progress</span>
                    <span className="text-sm text-slate-400">
                      {stats.completedCourses}/{stats.totalCourses}
                    </span>
                  </div>
                  <Progress value={(stats.completedCourses / stats.totalCourses) * 100} className="h-3" />

                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>Performance Metrics</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Quiz Performance</span>
                      <span className="text-sm text-slate-400">{stats.averageQuizScore}%</span>
                    </div>
                    <Progress value={stats.averageQuizScore} className="h-2" />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Assignment Performance</span>
                      <span className="text-sm text-slate-400">{stats.averageAssignmentScore}%</span>
                    </div>
                    <Progress value={stats.averageAssignmentScore} className="h-2" />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Course Completion</span>
                      <span className="text-sm text-slate-400">
                        {Math.round((stats.completedCourses / stats.totalCourses) * 100)}%
                      </span>
                    </div>
                    <Progress value={(stats.completedCourses / stats.totalCourses) * 100} className="h-2" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-700">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-indigo-400">{stats.studyHours}</div>
                    <div className="text-xs text-slate-400">Study Hours</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">{stats.longestStreak}</div>
                    <div className="text-xs text-slate-400">Longest Streak</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>30-Day Activity</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={activityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
                    <YAxis stroke="#9ca3af" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1f2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="studyTime"
                      stackId="1"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="quizzes"
                      stackId="1"
                      stroke="#10b981"
                      fill="#10b981"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="assignments"
                      stackId="1"
                      stroke="#f59e0b"
                      fill="#f59e0b"
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills" className="space-y-6">
          <div className="grid gap-4">
            {skillProgress.map((skill) => (
              <Card key={skill.skill} className="glass-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-lg font-semibold">{skill.skill}</h3>
                      <Badge className={getSkillLevelColor(skill.level)}>
                        Level {skill.level} - {getSkillLevelName(skill.level)}
                      </Badge>
                    </div>
                    <div className="text-sm text-slate-400">
                      {skill.completedExercises}/{skill.totalExercises} exercises
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progress to next level</span>
                      <span>{skill.progress}%</span>
                    </div>
                    <Progress value={skill.progress} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "First Quiz Completed",
                description: "Complete your first quiz",
                icon: <CheckCircle className="w-6 h-6" />,
                earned: true,
                date: "2024-01-15",
              },
              {
                title: "Week Warrior",
                description: "Study for 7 consecutive days",
                icon: <Trophy className="w-6 h-6" />,
                earned: true,
                date: "2024-01-22",
              },
              {
                title: "Quiz Master",
                description: "Score 90% or higher on 5 quizzes",
                icon: <Star className="w-6 h-6" />,
                earned: false,
                progress: 3,
                total: 5,
              },
              {
                title: "Mentor's Favorite",
                description: "Receive 5-star rating from a mentor",
                icon: <Award className="w-6 h-6" />,
                earned: true,
                date: "2024-02-01",
              },
              {
                title: "Speed Learner",
                description: "Complete a course in under 2 weeks",
                icon: <Clock className="w-6 h-6" />,
                earned: false,
                progress: 60,
                total: 100,
              },
              {
                title: "Assignment Ace",
                description: "Submit 10 assignments on time",
                icon: <Target className="w-6 h-6" />,
                earned: false,
                progress: 7,
                total: 10,
              },
            ].map((achievement, index) => (
              <Card key={index} className={`glass-card ${achievement.earned ? "border-green-500/30" : ""}`}>
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                      achievement.earned
                        ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                        : "bg-slate-700 text-slate-400"
                    }`}
                  >
                    {achievement.icon}
                  </div>

                  <h3 className="font-semibold mb-2">{achievement.title}</h3>
                  <p className="text-sm text-slate-400 mb-4">{achievement.description}</p>

                  {achievement.earned ? (
                    <div className="space-y-2">
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Earned</Badge>
                      <div className="text-xs text-slate-500">{new Date(achievement.date!).toLocaleDateString()}</div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="text-xs text-slate-400">
                        {achievement.progress}/{achievement.total}
                      </div>
                      <Progress value={(achievement.progress! / achievement.total!) * 100} className="h-1" />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
