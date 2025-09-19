"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, CheckCircle, Clock, FileText, Eye, Download, Zap, Target, Users, Award } from "lucide-react"

interface AnalysisResult {
  overallScore: number
  categories: {
    format: { score: number; issues: string[]; suggestions: string[] }
    content: { score: number; issues: string[]; suggestions: string[] }
    relevance: { score: number; issues: string[]; suggestions: string[] }
    impact: { score: number; issues: string[]; suggestions: string[] }
    ats: { score: number; issues: string[]; suggestions: string[] }
  }
  detectedIssues: Array<{
    type: "critical" | "warning" | "info" | "success"
    category: string
    message: string
    suggestion?: string
  }>
  wordCount: number
  pageCount: number
  readabilityScore: number
  keywordDensity: { [key: string]: number }
  missingSections: string[]
}

interface ResumeAnalysisProps {
  file: File | null
  targetRole?: string
  experienceLevel?: string
}

export function ResumeAnalysis({ file, targetRole, experienceLevel }: ResumeAnalysisProps) {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)

  // Mock analysis function - in real implementation, this would call your AI service
  const analyzeResume = async () => {
    if (!file) return

    setIsAnalyzing(true)
    setAnalysisProgress(0)

    // Simulate analysis progress
    const progressSteps = [
      { step: 20, message: "Extracting text content..." },
      { step: 40, message: "Analyzing format and structure..." },
      { step: 60, message: "Checking ATS compatibility..." },
      { step: 80, message: "Evaluating content quality..." },
      { step: 100, message: "Generating recommendations..." },
    ]

    for (const { step } of progressSteps) {
      await new Promise((resolve) => setTimeout(resolve, 800))
      setAnalysisProgress(step)
    }

    // Mock analysis results
    const mockAnalysis: AnalysisResult = {
      overallScore: 78,
      categories: {
        format: {
          score: 85,
          issues: ["Resume exceeds 2 pages", "Inconsistent font sizes"],
          suggestions: ["Reduce to 2 pages maximum", "Use consistent 11-12pt font throughout"],
        },
        content: {
          score: 72,
          issues: ["Missing quantified achievements", "Weak action verbs"],
          suggestions: ["Add specific metrics and numbers", "Use stronger action verbs like 'achieved', 'implemented'"],
        },
        relevance: {
          score: 80,
          issues: ["Some irrelevant experience included"],
          suggestions: ["Focus on experience relevant to " + (targetRole || "target role")],
        },
        impact: {
          score: 75,
          issues: ["Limited demonstration of business impact"],
          suggestions: ["Include ROI, cost savings, or efficiency improvements"],
        },
        ats: {
          score: 68,
          issues: ["Complex formatting may confuse ATS", "Missing key industry keywords"],
          suggestions: ["Simplify formatting", "Include more relevant keywords for " + (targetRole || "your field")],
        },
      },
      detectedIssues: [
        {
          type: "critical",
          category: "ATS Compatibility",
          message: "Complex tables and graphics may not parse correctly in ATS systems",
          suggestion: "Use simple formatting with clear section headers",
        },
        {
          type: "warning",
          category: "Length",
          message: "Resume is 3 pages long, which may be too lengthy",
          suggestion: "Aim for 1-2 pages maximum",
        },
        {
          type: "info",
          category: "Keywords",
          message: "Missing some key industry terms",
          suggestion: "Research job descriptions for relevant keywords",
        },
        {
          type: "success",
          category: "Contact Info",
          message: "Contact information is complete and professional",
        },
      ],
      wordCount: 847,
      pageCount: 3,
      readabilityScore: 72,
      keywordDensity: {
        JavaScript: 8,
        React: 6,
        "Node.js": 4,
        Python: 3,
        AWS: 2,
      },
      missingSections: ["Professional Summary", "Certifications"],
    }

    setAnalysis(mockAnalysis)
    setIsAnalyzing(false)
  }

  useEffect(() => {
    if (file) {
      analyzeResume()
    }
  }, [file, targetRole, experienceLevel])

  if (!file) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <FileText className="w-12 h-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Resume Uploaded</h3>
          <p className="text-muted-foreground text-center">
            Upload your resume to get instant AI-powered analysis and feedback.
          </p>
        </CardContent>
      </Card>
    )
  }

  if (isAnalyzing) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            <span>Analyzing Resume</span>
          </CardTitle>
          <CardDescription>AI is analyzing your resume for optimization opportunities</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Analysis Progress</span>
              <span>{analysisProgress}%</span>
            </div>
            <Progress value={analysisProgress} className="h-3" />
          </div>
          <div className="text-sm text-muted-foreground">
            This may take a few moments while we analyze your resume content, format, and ATS compatibility.
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!analysis) return null

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getIssueIcon = (type: string) => {
    switch (type) {
      case "critical":
        return <AlertCircle className="w-4 h-4 text-red-500" />
      case "warning":
        return <AlertCircle className="w-4 h-4 text-yellow-500" />
      case "info":
        return <Clock className="w-4 h-4 text-blue-500" />
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Resume Analysis Complete</CardTitle>
              <CardDescription>AI-powered analysis of {file.name}</CardDescription>
            </div>
            <div className="text-right">
              <div className={`text-4xl font-bold ${getScoreColor(analysis.overallScore)}`}>
                {analysis.overallScore}%
              </div>
              <div className="text-sm text-muted-foreground">Overall Score</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold">{analysis.wordCount}</div>
              <div className="text-xs text-muted-foreground">Words</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{analysis.pageCount}</div>
              <div className="text-xs text-muted-foreground">Pages</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{analysis.readabilityScore}%</div>
              <div className="text-xs text-muted-foreground">Readability</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{analysis.detectedIssues.length}</div>
              <div className="text-xs text-muted-foreground">Issues Found</div>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button className="flex-1">
              <Eye className="w-4 h-4 mr-2" />
              View Detailed Report
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Analysis
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Analysis */}
      <Tabs defaultValue="categories" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="issues">Issues</TabsTrigger>
          <TabsTrigger value="keywords">Keywords</TabsTrigger>
          <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
        </TabsList>

        <TabsContent value="categories" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(analysis.categories).map(([category, data]) => (
              <Card key={category}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg capitalize">{category}</CardTitle>
                    <div className={`text-xl font-bold ${getScoreColor(data.score)}`}>{data.score}%</div>
                  </div>
                  <Progress value={data.score} className="h-2" />
                </CardHeader>
                <CardContent className="space-y-3">
                  {data.issues.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-red-600 mb-2">Issues:</h4>
                      <ul className="space-y-1">
                        {data.issues.map((issue, index) => (
                          <li key={index} className="text-xs text-muted-foreground flex items-start space-x-2">
                            <AlertCircle className="w-3 h-3 text-red-500 mt-0.5 flex-shrink-0" />
                            <span>{issue}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {data.suggestions.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-green-600 mb-2">Suggestions:</h4>
                      <ul className="space-y-1">
                        {data.suggestions.map((suggestion, index) => (
                          <li key={index} className="text-xs text-muted-foreground flex items-start space-x-2">
                            <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{suggestion}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="issues" className="space-y-4">
          <div className="space-y-3">
            {analysis.detectedIssues.map((issue, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    {getIssueIcon(issue.type)}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <Badge
                          variant={
                            issue.type === "critical"
                              ? "destructive"
                              : issue.type === "warning"
                                ? "secondary"
                                : issue.type === "success"
                                  ? "default"
                                  : "outline"
                          }
                        >
                          {issue.category}
                        </Badge>
                        <span className="text-sm font-medium">{issue.type.toUpperCase()}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{issue.message}</p>
                      {issue.suggestion && (
                        <p className="text-xs text-green-600 bg-green-50 p-2 rounded">💡 {issue.suggestion}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="keywords" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Keyword Analysis</CardTitle>
              <CardDescription>Keywords found in your resume and their frequency</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {Object.entries(analysis.keywordDensity).map(([keyword, count]) => (
                    <Badge key={keyword} variant="secondary" className="text-sm">
                      {keyword} ({count})
                    </Badge>
                  ))}
                </div>

                {analysis.missingSections.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold mb-2">Missing Sections:</h4>
                    <div className="flex flex-wrap gap-2">
                      {analysis.missingSections.map((section) => (
                        <Badge key={section} variant="outline" className="text-red-600">
                          {section}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="suggestions" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-blue-500" />
                  <span>Quick Wins</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="text-sm flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span>Add quantified achievements with specific numbers</span>
                  </li>
                  <li className="text-sm flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span>Include a professional summary at the top</span>
                  </li>
                  <li className="text-sm flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span>Optimize for ATS by simplifying formatting</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-purple-500" />
                  <span>Advanced Tips</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="text-sm flex items-start space-x-2">
                    <Users className="w-4 h-4 text-blue-500 mt-0.5" />
                    <span>Tailor content for {targetRole || "your target role"}</span>
                  </li>
                  <li className="text-sm flex items-start space-x-2">
                    <Users className="w-4 h-4 text-blue-500 mt-0.5" />
                    <span>Research industry-specific keywords</span>
                  </li>
                  <li className="text-sm flex items-start space-x-2">
                    <Users className="w-4 h-4 text-blue-500 mt-0.5" />
                    <span>Consider getting professional mentor feedback</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
