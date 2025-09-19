"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Brain,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Play,
  Square,
  Clock,
  Target,
  TrendingUp,
  MessageSquare,
  Lightbulb,
  CheckCircle,
  AlertCircle,
  BarChart3,
  Zap,
  Star,
} from "lucide-react"

interface InterviewConfig {
  role: string
  level: string
  type: string
  duration: number
  difficulty: "beginner" | "intermediate" | "advanced"
  focusAreas: string[]
}

interface Question {
  id: string
  text: string
  type: "behavioral" | "technical" | "situational" | "case_study"
  difficulty: string
  expectedDuration: number
  followUps?: string[]
  evaluationCriteria: string[]
}

interface AIFeedback {
  clarity: number
  confidence: number
  structure: number
  relevance: number
  technicalAccuracy?: number
  overallScore: number
  suggestions: string[]
  strengths: string[]
  improvements: string[]
}

interface InterviewSession {
  id: string
  config: InterviewConfig
  questions: Question[]
  currentQuestionIndex: number
  answers: Array<{
    questionId: string
    answer: string
    timeSpent: number
    feedback: AIFeedback
  }>
  startTime: Date
  status: "setup" | "active" | "paused" | "completed"
}

export function AdvancedAIInterview() {
  const [session, setSession] = useState<InterviewSession | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [isMicOn, setIsMicOn] = useState(true)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [currentAnswer, setCurrentAnswer] = useState("")
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [realTimeFeedback, setRealTimeFeedback] = useState<AIFeedback | null>(null)
  const [speechRecognition, setSpeechRecognition] = useState<any>(null)
  const [isListening, setIsListening] = useState(false)

  const timerRef = useRef<NodeJS.Timeout>()
  const questionStartTime = useRef<number>(0)

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const recognition = new (window as any).webkitSpeechRecognition()
      recognition.continuous = true
      recognition.interimResults = true
      recognition.lang = "en-US"

      recognition.onresult = (event: any) => {
        let finalTranscript = ""
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript
          }
        }
        if (finalTranscript) {
          setCurrentAnswer((prev) => prev + " " + finalTranscript)
        }
      }

      setSpeechRecognition(recognition)
    }
  }, [])

  // Timer effect
  useEffect(() => {
    if (session?.status === "active") {
      timerRef.current = setInterval(() => {
        setTimeElapsed((prev) => prev + 1)
      }, 1000)
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [session?.status])

  const startInterview = (config: InterviewConfig) => {
    const questions = generateQuestions(config)
    const newSession: InterviewSession = {
      id: Date.now().toString(),
      config,
      questions,
      currentQuestionIndex: 0,
      answers: [],
      startTime: new Date(),
      status: "active",
    }

    setSession(newSession)
    setTimeElapsed(0)
    questionStartTime.current = Date.now()
  }

  const generateQuestions = (config: InterviewConfig): Question[] => {
    // Mock question generation based on config
    const questionBank = {
      behavioral: [
        {
          id: "b1",
          text: "Tell me about a time when you had to overcome a significant challenge at work.",
          type: "behavioral" as const,
          difficulty: config.difficulty,
          expectedDuration: 180,
          followUps: ["What would you do differently?", "How did this experience change your approach?"],
          evaluationCriteria: [
            "STAR method usage",
            "Specific examples",
            "Learning outcomes",
            "Problem-solving approach",
          ],
        },
        {
          id: "b2",
          text: "Describe a situation where you had to work with a difficult team member.",
          type: "behavioral" as const,
          difficulty: config.difficulty,
          expectedDuration: 180,
          evaluationCriteria: [
            "Conflict resolution",
            "Communication skills",
            "Emotional intelligence",
            "Team collaboration",
          ],
        },
      ],
      technical: [
        {
          id: "t1",
          text: "Explain the difference between synchronous and asynchronous programming. When would you use each?",
          type: "technical" as const,
          difficulty: config.difficulty,
          expectedDuration: 240,
          evaluationCriteria: [
            "Technical accuracy",
            "Real-world examples",
            "Trade-offs understanding",
            "Code examples",
          ],
        },
        {
          id: "t2",
          text: "How would you optimize a slow database query? Walk me through your approach.",
          type: "technical" as const,
          difficulty: config.difficulty,
          expectedDuration: 300,
          evaluationCriteria: [
            "Systematic approach",
            "Performance concepts",
            "Practical solutions",
            "Monitoring strategies",
          ],
        },
      ],
    }

    // Select questions based on config
    const selectedQuestions = []
    if (config.type === "behavioral" || config.type === "mixed") {
      selectedQuestions.push(...questionBank.behavioral.slice(0, 2))
    }
    if (config.type === "technical" || config.type === "mixed") {
      selectedQuestions.push(...questionBank.technical.slice(0, 2))
    }

    return selectedQuestions
  }

  const analyzeAnswer = async (answer: string, question: Question): Promise<AIFeedback> => {
    setIsAnalyzing(true)

    // Simulate AI analysis
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock AI feedback generation
    const feedback: AIFeedback = {
      clarity: Math.floor(Math.random() * 30) + 70,
      confidence: Math.floor(Math.random() * 25) + 75,
      structure: Math.floor(Math.random() * 35) + 65,
      relevance: Math.floor(Math.random() * 20) + 80,
      technicalAccuracy: question.type === "technical" ? Math.floor(Math.random() * 25) + 75 : undefined,
      overallScore: 0,
      suggestions: [
        "Try to provide more specific examples with quantifiable results",
        "Consider using the STAR method for better structure",
        "Include more technical details about your implementation",
      ],
      strengths: ["Clear communication style", "Good problem-solving approach", "Relevant experience mentioned"],
      improvements: [
        "Add more specific metrics",
        "Explain the impact of your decisions",
        "Provide alternative solutions considered",
      ],
    }

    // Calculate overall score
    const scores = [feedback.clarity, feedback.confidence, feedback.structure, feedback.relevance]
    if (feedback.technicalAccuracy) scores.push(feedback.technicalAccuracy)
    feedback.overallScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)

    setIsAnalyzing(false)
    return feedback
  }

  const nextQuestion = async () => {
    if (!session) return

    const timeSpent = Math.floor((Date.now() - questionStartTime.current) / 1000)
    const currentQuestion = session.questions[session.currentQuestionIndex]

    // Analyze current answer
    const feedback = await analyzeAnswer(currentAnswer, currentQuestion)

    const newAnswer = {
      questionId: currentQuestion.id,
      answer: currentAnswer,
      timeSpent,
      feedback,
    }

    setSession((prev) => {
      if (!prev) return null

      const updatedAnswers = [...prev.answers, newAnswer]

      if (prev.currentQuestionIndex < prev.questions.length - 1) {
        return {
          ...prev,
          answers: updatedAnswers,
          currentQuestionIndex: prev.currentQuestionIndex + 1,
        }
      } else {
        return {
          ...prev,
          answers: updatedAnswers,
          status: "completed",
        }
      }
    })

    setCurrentAnswer("")
    setRealTimeFeedback(feedback)
    questionStartTime.current = Date.now()
  }

  const toggleSpeechRecognition = () => {
    if (!speechRecognition) return

    if (isListening) {
      speechRecognition.stop()
      setIsListening(false)
    } else {
      speechRecognition.start()
      setIsListening(true)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  if (!session) {
    return <InterviewSetup onStart={startInterview} />
  }

  if (session.status === "completed") {
    return <InterviewResults session={session} onRestart={() => setSession(null)} />
  }

  const currentQuestion = session.questions[session.currentQuestionIndex]
  const progress = ((session.currentQuestionIndex + 1) / session.questions.length) * 100

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle>AI Interview Session</CardTitle>
                <CardDescription>
                  {session.config.role} • {session.config.level} • {session.config.type}
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{formatTime(timeElapsed)}</span>
              </Badge>
              <Badge variant="secondary">
                Question {session.currentQuestionIndex + 1} of {session.questions.length}
              </Badge>
            </div>
          </div>
          <Progress value={progress} className="h-2 mt-4" />
        </CardHeader>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Interview Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Video/Audio Controls */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${isRecording ? "bg-red-500 animate-pulse" : "bg-gray-400"}`} />
                  <span className="text-sm font-medium">{isRecording ? "Recording" : "Ready"}</span>
                </div>
                <div className="flex space-x-2">
                  <Button variant={isMicOn ? "default" : "outline"} size="sm" onClick={() => setIsMicOn(!isMicOn)}>
                    {isMicOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                  </Button>
                  <Button
                    variant={isVideoOn ? "default" : "outline"}
                    size="sm"
                    onClick={() => setIsVideoOn(!isVideoOn)}
                  >
                    {isVideoOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                  </Button>
                  <Button
                    variant={isListening ? "default" : "outline"}
                    size="sm"
                    onClick={toggleSpeechRecognition}
                    disabled={!speechRecognition}
                  >
                    <MessageSquare className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={isRecording ? "destructive" : "default"}
                    size="sm"
                    onClick={() => setIsRecording(!isRecording)}
                  >
                    {isRecording ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Question */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl mb-2">Question {session.currentQuestionIndex + 1}</CardTitle>
                  <div className="flex items-center space-x-2 mb-3">
                    <Badge variant="outline" className="capitalize">
                      {currentQuestion.type}
                    </Badge>
                    <Badge variant="secondary">{currentQuestion.expectedDuration}s suggested</Badge>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Lightbulb className="w-4 h-4" />
                </Button>
              </div>
              <CardDescription className="text-lg leading-relaxed">{currentQuestion.text}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Answer Input */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Your Response</label>
                  {isListening && (
                    <Badge variant="outline" className="text-xs">
                      <Mic className="w-3 h-3 mr-1" />
                      Listening...
                    </Badge>
                  )}
                </div>
                <Textarea
                  placeholder="Share your answer here... You can also use voice input."
                  value={currentAnswer}
                  onChange={(e) => setCurrentAnswer(e.target.value)}
                  rows={8}
                  className="resize-none"
                />
              </div>

              {/* Evaluation Criteria */}
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="text-sm font-semibold mb-2 flex items-center">
                  <Target className="w-4 h-4 mr-2" />
                  Evaluation Criteria
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {currentQuestion.evaluationCriteria.map((criteria, index) => (
                    <div key={index} className="text-xs text-muted-foreground flex items-center">
                      <CheckCircle className="w-3 h-3 mr-1 text-green-500" />
                      {criteria}
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between pt-4">
                <Button
                  variant="outline"
                  onClick={() => setSession((prev) => (prev ? { ...prev, status: "setup" } : null))}
                >
                  End Session
                </Button>
                <Button
                  onClick={nextQuestion}
                  disabled={!currentAnswer.trim() || isAnalyzing}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600"
                >
                  {isAnalyzing ? (
                    <>
                      <Brain className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : session.currentQuestionIndex === session.questions.length - 1 ? (
                    "Complete Interview"
                  ) : (
                    "Next Question"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Real-time Feedback Panel */}
        <div className="space-y-6">
          {/* Live Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Live Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {realTimeFeedback ? (
                <>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Clarity</span>
                      <span className="text-sm font-semibold">{realTimeFeedback.clarity}%</span>
                    </div>
                    <Progress value={realTimeFeedback.clarity} className="h-2" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Confidence</span>
                      <span className="text-sm font-semibold">{realTimeFeedback.confidence}%</span>
                    </div>
                    <Progress value={realTimeFeedback.confidence} className="h-2" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Structure</span>
                      <span className="text-sm font-semibold">{realTimeFeedback.structure}%</span>
                    </div>
                    <Progress value={realTimeFeedback.structure} className="h-2" />
                  </div>
                  {realTimeFeedback.technicalAccuracy && (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Technical Accuracy</span>
                        <span className="text-sm font-semibold">{realTimeFeedback.technicalAccuracy}%</span>
                      </div>
                      <Progress value={realTimeFeedback.technicalAccuracy} className="h-2" />
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-8">
                  <Brain className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Answer the question to see live analysis</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* AI Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                AI Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {currentQuestion.type === "behavioral" && (
                  <>
                    <div className="flex items-start space-x-2">
                      <Star className="w-4 h-4 text-yellow-500 mt-0.5" />
                      <p className="text-sm">Use the STAR method: Situation, Task, Action, Result</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Star className="w-4 h-4 text-yellow-500 mt-0.5" />
                      <p className="text-sm">Include specific metrics and outcomes</p>
                    </div>
                  </>
                )}
                {currentQuestion.type === "technical" && (
                  <>
                    <div className="flex items-start space-x-2">
                      <Star className="w-4 h-4 text-yellow-500 mt-0.5" />
                      <p className="text-sm">Explain your thought process step by step</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Star className="w-4 h-4 text-yellow-500 mt-0.5" />
                      <p className="text-sm">Consider trade-offs and alternatives</p>
                    </div>
                  </>
                )}
                <div className="flex items-start space-x-2">
                  <Star className="w-4 h-4 text-yellow-500 mt-0.5" />
                  <p className="text-sm">Speak clearly and maintain good pace</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Session Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Session Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Questions Completed</span>
                  <span>
                    {session.currentQuestionIndex} / {session.questions.length}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Time Elapsed</span>
                  <span>{formatTime(timeElapsed)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Average Score</span>
                  <span>
                    {session.answers.length > 0
                      ? Math.round(
                          session.answers.reduce((acc, ans) => acc + ans.feedback.overallScore, 0) /
                            session.answers.length,
                        )
                      : 0}
                    %
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// Interview Setup Component
function InterviewSetup({ onStart }: { onStart: (config: InterviewConfig) => void }) {
  const [config, setConfig] = useState<Partial<InterviewConfig>>({
    duration: 30,
    difficulty: "intermediate",
    focusAreas: [],
  })

  const roles = [
    "Software Engineer",
    "Data Scientist",
    "Product Manager",
    "UX Designer",
    "DevOps Engineer",
    "Marketing Manager",
    "Sales Representative",
    "Business Analyst",
  ]

  const levels = [
    { value: "entry", label: "Entry Level (0-2 years)" },
    { value: "mid", label: "Mid Level (3-5 years)" },
    { value: "senior", label: "Senior Level (6+ years)" },
    { value: "lead", label: "Lead/Principal" },
  ]

  const types = [
    { value: "behavioral", label: "Behavioral Interview" },
    { value: "technical", label: "Technical Interview" },
    { value: "mixed", label: "Mixed Interview" },
    { value: "case_study", label: "Case Study" },
  ]

  const handleStart = () => {
    if (config.role && config.level && config.type) {
      onStart(config as InterviewConfig)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">AI Interview Setup</h2>
        <p className="text-muted-foreground">Configure your personalized AI interview session</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Interview Configuration</CardTitle>
          <CardDescription>Customize your interview based on your target role and experience level</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Target Role</label>
              <Select value={config.role} onValueChange={(value) => setConfig((prev) => ({ ...prev, role: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your target role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Experience Level</label>
              <Select value={config.level} onValueChange={(value) => setConfig((prev) => ({ ...prev, level: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your level" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Interview Type</label>
              <Select value={config.type} onValueChange={(value) => setConfig((prev) => ({ ...prev, type: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select interview type" />
                </SelectTrigger>
                <SelectContent>
                  {types.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Difficulty</label>
              <Select
                value={config.difficulty}
                onValueChange={(value: any) => setConfig((prev) => ({ ...prev, difficulty: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={handleStart}
            disabled={!config.role || !config.level || !config.type}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600"
          >
            <Play className="w-4 h-4 mr-2" />
            Start AI Interview
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

// Interview Results Component
function InterviewResults({ session, onRestart }: { session: InterviewSession; onRestart: () => void }) {
  const overallScore =
    session.answers.length > 0
      ? Math.round(session.answers.reduce((acc, ans) => acc + ans.feedback.overallScore, 0) / session.answers.length)
      : 0

  const totalTime = Math.floor((new Date().getTime() - session.startTime.getTime()) / 1000)

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Interview Complete!</h2>
        <p className="text-muted-foreground">Here's your detailed performance analysis</p>
      </div>

      {/* Overall Score */}
      <Card>
        <CardContent className="p-8 text-center">
          <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-white">{overallScore}%</span>
          </div>
          <h3 className="text-xl font-semibold mb-2">Overall Performance</h3>
          <p className="text-muted-foreground">
            Completed {session.answers.length} questions in {Math.floor(totalTime / 60)} minutes
          </p>
        </CardContent>
      </Card>

      {/* Detailed Results */}
      <Tabs defaultValue="summary" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="questions">Question Analysis</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {session.answers.map((answer, index) => (
              <Card key={answer.questionId}>
                <CardHeader>
                  <CardTitle className="text-lg">Question {index + 1}</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{answer.feedback.overallScore}%</Badge>
                    <Badge variant="secondary">{answer.timeSpent}s</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Clarity</span>
                      <span>{answer.feedback.clarity}%</span>
                    </div>
                    <Progress value={answer.feedback.clarity} className="h-1" />
                    <div className="flex justify-between text-sm">
                      <span>Confidence</span>
                      <span>{answer.feedback.confidence}%</span>
                    </div>
                    <Progress value={answer.feedback.confidence} className="h-1" />
                    <div className="flex justify-between text-sm">
                      <span>Structure</span>
                      <span>{answer.feedback.structure}%</span>
                    </div>
                    <Progress value={answer.feedback.structure} className="h-1" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="questions" className="space-y-4">
          {session.answers.map((answer, index) => {
            const question = session.questions.find((q) => q.id === answer.questionId)
            return (
              <Card key={answer.questionId}>
                <CardHeader>
                  <CardTitle>Question {index + 1}</CardTitle>
                  <CardDescription>{question?.text}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Your Answer:</h4>
                    <p className="text-sm text-muted-foreground bg-muted p-3 rounded">{answer.answer}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Strengths:</h4>
                    <ul className="text-sm space-y-1">
                      {answer.feedback.strengths.map((strength, i) => (
                        <li key={i} className="flex items-center text-green-600">
                          <CheckCircle className="w-3 h-3 mr-2" />
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Areas for Improvement:</h4>
                    <ul className="text-sm space-y-1">
                      {answer.feedback.improvements.map((improvement, i) => (
                        <li key={i} className="flex items-center text-orange-600">
                          <AlertCircle className="w-3 h-3 mr-2" />
                          {improvement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </TabsContent>

        <TabsContent value="recommendations">
          <Card>
            <CardHeader>
              <CardTitle>Personalized Recommendations</CardTitle>
              <CardDescription>Based on your performance, here are specific areas to focus on</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Immediate Actions:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2">
                    <Lightbulb className="w-4 h-4 text-yellow-500 mt-0.5" />
                    <span className="text-sm">Practice the STAR method for behavioral questions</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Lightbulb className="w-4 h-4 text-yellow-500 mt-0.5" />
                    <span className="text-sm">Work on providing more specific examples with metrics</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Lightbulb className="w-4 h-4 text-yellow-500 mt-0.5" />
                    <span className="text-sm">Improve technical explanation clarity</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Recommended Resources:</h4>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                    <Brain className="w-4 h-4 mr-2" />
                    Behavioral Interview Masterclass
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                    <Target className="w-4 h-4 mr-2" />
                    Technical Communication Workshop
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Book 1-on-1 Mentor Session
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-center space-x-4">
        <Button variant="outline" onClick={onRestart}>
          Start New Interview
        </Button>
        <Button>Save Results</Button>
      </div>
    </div>
  )
}
