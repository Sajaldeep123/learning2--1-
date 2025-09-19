"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  MapPin,
  Target,
  TrendingUp,
  Calendar,
  DollarSign,
  Building,
  Star,
  CheckCircle,
  Clock,
  ArrowRight,
  Lightbulb,
  User,
} from "lucide-react"

const careerPaths = [
  {
    id: "software-engineer",
    title: "Software Engineer",
    description: "Build and maintain software applications",
    salaryRange: "$70k - $180k",
    growth: "High",
    demand: "Very High",
    skills: ["JavaScript", "React", "Node.js", "Python", "SQL"],
    progress: 75,
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    description: "Analyze data to extract business insights",
    salaryRange: "$80k - $200k",
    growth: "Very High",
    demand: "High",
    skills: ["Python", "R", "SQL", "Machine Learning", "Statistics"],
    progress: 45,
  },
  {
    id: "product-designer",
    title: "Product Designer",
    description: "Design user experiences and interfaces",
    salaryRange: "$65k - $160k",
    growth: "High",
    demand: "High",
    skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
    progress: 30,
  },
  {
    id: "product-manager",
    title: "Product Manager",
    description: "Guide product development and strategy",
    salaryRange: "$90k - $220k",
    growth: "High",
    demand: "High",
    skills: ["Strategy", "Analytics", "Communication", "Leadership"],
    progress: 20,
  },
]

const roadmapSteps = [
  {
    phase: "Foundation",
    duration: "2-3 months",
    status: "completed",
    tasks: [
      { name: "Learn JavaScript Fundamentals", completed: true },
      { name: "Complete HTML/CSS Basics", completed: true },
      { name: "Build First Portfolio Project", completed: true },
    ],
  },
  {
    phase: "Intermediate",
    duration: "3-4 months",
    status: "in-progress",
    tasks: [
      { name: "Master React Framework", completed: true },
      { name: "Learn Node.js & Express", completed: false },
      { name: "Database Design & SQL", completed: false },
      { name: "Build Full-Stack Application", completed: false },
    ],
  },
  {
    phase: "Advanced",
    duration: "4-6 months",
    status: "upcoming",
    tasks: [
      { name: "System Design Principles", completed: false },
      { name: "Cloud Platforms (AWS/Azure)", completed: false },
      { name: "Advanced Algorithms", completed: false },
      { name: "Contribute to Open Source", completed: false },
    ],
  },
  {
    phase: "Job Ready",
    duration: "2-3 months",
    status: "upcoming",
    tasks: [
      { name: "Technical Interview Prep", completed: false },
      { name: "System Design Interviews", completed: false },
      { name: "Behavioral Interview Practice", completed: false },
      { name: "Portfolio Optimization", completed: false },
    ],
  },
]

const mentorTestimonials = [
  {
    name: "Sarah Chen",
    role: "Senior Software Engineer at Google",
    image: "/professional-woman-diverse.png",
    quote: "The structured roadmap helped me transition from marketing to tech in just 8 months.",
    rating: 5,
  },
  {
    name: "Michael Rodriguez",
    role: "Data Scientist at Netflix",
    image: "/professional-man.png",
    quote: "Having clear milestones made all the difference in staying motivated throughout my journey.",
    rating: 5,
  },
  {
    name: "Emily Johnson",
    role: "Product Designer at Airbnb",
    image: "/professional-woman-designer.png",
    quote: "The skill gap analysis showed me exactly what I needed to focus on to land my dream job.",
    rating: 5,
  },
]

export default function CareerPathPage() {
  const [selectedPath, setSelectedPath] = useState("software-engineer")
  const selectedCareer = careerPaths.find((path) => path.id === selectedPath)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "upcoming":
        return "bg-gray-100 text-gray-600 border-gray-200"
      default:
        return "bg-gray-100 text-gray-600 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Career Path Guidance
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover your ideal career path with personalized roadmaps, skill assessments, and mentor guidance
          </p>
        </div>

        <Tabs defaultValue="explore" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/70 backdrop-blur-sm">
            <TabsTrigger value="explore">Explore Careers</TabsTrigger>
            <TabsTrigger value="roadmap">My Roadmap</TabsTrigger>
            <TabsTrigger value="skills">Skill Analysis</TabsTrigger>
            <TabsTrigger value="mentors">Mentor Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="explore" className="space-y-6">
            {/* Career Path Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {careerPaths.map((path) => (
                <Card
                  key={path.id}
                  className={`cursor-pointer transition-all bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl ${
                    selectedPath === path.id ? "ring-2 ring-blue-500" : ""
                  }`}
                  onClick={() => setSelectedPath(path.id)}
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{path.title}</CardTitle>
                    <CardDescription className="text-sm">{path.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Salary Range</span>
                      <span className="font-semibold text-green-600">{path.salaryRange}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Growth</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        {path.growth}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Your Progress</span>
                        <span className="font-medium">{path.progress}%</span>
                      </div>
                      <Progress value={path.progress} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Selected Career Details */}
            {selectedCareer && (
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="h-5 w-5 text-blue-600" />
                    <span>{selectedCareer.title} - Career Overview</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold text-gray-900">Key Information</h3>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <DollarSign className="h-4 w-4 text-green-600" />
                          <span className="text-sm">Salary: {selectedCareer.salaryRange}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="h-4 w-4 text-blue-600" />
                          <span className="text-sm">Growth: {selectedCareer.growth}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Building className="h-4 w-4 text-purple-600" />
                          <span className="text-sm">Demand: {selectedCareer.demand}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold text-gray-900">Required Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedCareer.skills.map((skill, index) => (
                          <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold text-gray-900">Your Progress</h3>
                      <div className="space-y-2">
                        <Progress value={selectedCareer.progress} className="h-3" />
                        <p className="text-sm text-gray-600">{selectedCareer.progress}% complete on this career path</p>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                        Start This Path
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="roadmap" className="space-y-6">
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <span>Software Engineer Roadmap</span>
                </CardTitle>
                <CardDescription>Your personalized learning journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {roadmapSteps.map((phase, index) => (
                    <div key={index} className="relative">
                      {/* Phase Header */}
                      <div className="flex items-center space-x-4 mb-4">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                            phase.status === "completed"
                              ? "bg-green-500"
                              : phase.status === "in-progress"
                                ? "bg-blue-500"
                                : "bg-gray-400"
                          }`}
                        >
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{phase.phase}</h3>
                          <p className="text-sm text-gray-600">{phase.duration}</p>
                        </div>
                        <Badge className={getStatusColor(phase.status)}>{phase.status.replace("-", " ")}</Badge>
                      </div>

                      {/* Tasks */}
                      <div className="ml-12 space-y-3">
                        {phase.tasks.map((task, taskIndex) => (
                          <div key={taskIndex} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                            {task.completed ? (
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            ) : (
                              <Clock className="h-5 w-5 text-gray-400" />
                            )}
                            <span
                              className={`flex-1 ${task.completed ? "text-gray-600 line-through" : "text-gray-900"}`}
                            >
                              {task.name}
                            </span>
                            {!task.completed && phase.status === "in-progress" && (
                              <Button size="sm" variant="outline">
                                Start
                                <ArrowRight className="h-3 w-3 ml-1" />
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Connector Line */}
                      {index < roadmapSteps.length - 1 && (
                        <div className="absolute left-4 top-12 w-0.5 h-16 bg-gray-300"></div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Skill Gap Analysis</CardTitle>
                  <CardDescription>Areas to focus on for your career goals</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { skill: "JavaScript", current: 85, target: 90, priority: "medium" },
                    { skill: "React", current: 78, target: 85, priority: "high" },
                    { skill: "Node.js", current: 45, target: 75, priority: "high" },
                    { skill: "System Design", current: 30, target: 70, priority: "high" },
                    { skill: "Algorithms", current: 65, target: 80, priority: "medium" },
                  ].map((skill, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{skill.skill}</span>
                        <Badge
                          className={
                            skill.priority === "high"
                              ? "bg-red-100 text-red-800"
                              : skill.priority === "medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                          }
                        >
                          {skill.priority} priority
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>Current: {skill.current}%</span>
                          <span>Target: {skill.target}%</span>
                        </div>
                        <Progress value={skill.current} className="h-2" />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Recommended Actions</CardTitle>
                  <CardDescription>Personalized suggestions to close skill gaps</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      title: "Complete Node.js Fundamentals Quiz",
                      description: "Test your backend development knowledge",
                      type: "quiz",
                      priority: "high",
                    },
                    {
                      title: "Build a Full-Stack Project",
                      description: "Apply React and Node.js skills together",
                      type: "assignment",
                      priority: "high",
                    },
                    {
                      title: "System Design Mock Interview",
                      description: "Practice designing scalable systems",
                      type: "interview",
                      priority: "medium",
                    },
                    {
                      title: "Advanced React Patterns Course",
                      description: "Learn hooks, context, and performance optimization",
                      type: "course",
                      priority: "medium",
                    },
                  ].map((action, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{action.title}</h4>
                        <Badge
                          className={
                            action.priority === "high" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {action.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{action.description}</p>
                      <Button size="sm" className="w-full">
                        Start {action.type}
                        <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="mentors" className="space-y-6">
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Success Stories & Testimonials</CardTitle>
                <CardDescription>Learn from mentors who've walked this path</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {mentorTestimonials.map((mentor, index) => (
                    <div key={index} className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg space-y-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={mentor.image || "/placeholder.svg"}
                          alt={mentor.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <h4 className="font-semibold">{mentor.name}</h4>
                          <p className="text-sm text-gray-600">{mentor.role}</p>
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        {[...Array(mentor.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-sm text-gray-700 italic">"{mentor.quote}"</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Book Career Counseling</CardTitle>
                <CardDescription>Get personalized guidance from industry experts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center space-x-2">
                      <User className="h-5 w-5 text-blue-600" />
                      <h4 className="font-semibold">Career Path Consultation</h4>
                    </div>
                    <p className="text-sm text-gray-600">
                      45-minute session to discuss your career goals and create a personalized roadmap
                    </p>
                    <Button className="w-full">
                      Book Session
                      <Calendar className="h-4 w-4 ml-2" />
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center space-x-2">
                      <Lightbulb className="h-5 w-5 text-green-600" />
                      <h4 className="font-semibold">Skill Development Planning</h4>
                    </div>
                    <p className="text-sm text-gray-600">
                      30-minute focused session on specific skills and learning strategies
                    </p>
                    <Button variant="outline" className="w-full bg-transparent">
                      Book Session
                      <Calendar className="h-4 w-4 ml-2" />
                    </Button>
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
