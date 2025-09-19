"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, CheckCircle, XCircle, Target, TrendingUp, RotateCcw } from "lucide-react"

interface QuizResultsProps {
  quizId: string
  onBack: () => void
}

export function QuizResults({ quizId, onBack }: QuizResultsProps) {
  // Mock results data
  const results = {
    quizId,
    title: "JavaScript Fundamentals",
    score: 85,
    totalQuestions: 5,
    correctAnswers: 4,
    timeSpent: 18, // minutes
    timeLimit: 30,
    passed: true,
    passingScore: 70,
    questions: [
      {
        id: "1",
        question: "What is the correct way to declare a variable in JavaScript?",
        userAnswer: "var myVar = 5;",
        correctAnswer: "var myVar = 5;",
        isCorrect: true,
        explanation: 'Correct! "var" is one of the ways to declare variables in JavaScript.',
      },
      {
        id: "2",
        question: "JavaScript is a statically typed language.",
        userAnswer: "False",
        correctAnswer: "False",
        isCorrect: true,
        explanation: "Correct! JavaScript is a dynamically typed language, not statically typed.",
      },
      {
        id: "3",
        question: 'Explain the difference between "let" and "var" in JavaScript.',
        userAnswer: "let has block scope while var has function scope",
        correctAnswer: "let has block scope while var has function scope",
        isCorrect: true,
        explanation: "Excellent! You correctly identified the key difference in scoping between let and var.",
      },
      {
        id: "4",
        question: "Which method is used to add an element to the end of an array?",
        userAnswer: "pop()",
        correctAnswer: "push()",
        isCorrect: false,
        explanation: "Incorrect. push() adds elements to the end of an array, while pop() removes the last element.",
      },
      {
        id: "5",
        question: 'The "===" operator checks for both value and type equality.',
        userAnswer: "True",
        correctAnswer: "True",
        isCorrect: true,
        explanation: "Correct! The strict equality operator (===) checks both value and type.",
      },
    ],
  }

  const accuracy = (results.correctAnswers / results.totalQuestions) * 100

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Quizzes
        </Button>
        <Button variant="outline">
          <RotateCcw className="w-4 h-4 mr-2" />
          Retake Quiz
        </Button>
      </div>

      {/* Results Summary */}
      <Card>
        <CardHeader className="text-center">
          <div
            className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 ${
              results.passed ? "bg-green-100" : "bg-red-100"
            }`}
          >
            {results.passed ? (
              <CheckCircle className="w-10 h-10 text-green-600" />
            ) : (
              <XCircle className="w-10 h-10 text-red-600" />
            )}
          </div>
          <CardTitle className="text-2xl">{results.passed ? "Congratulations!" : "Keep Practicing!"}</CardTitle>
          <CardDescription>
            You scored {results.score}% on {results.title}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">{results.score}%</div>
              <div className="text-sm text-muted-foreground">Final Score</div>
              <Progress value={results.score} className="h-2 mt-2" />
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {results.correctAnswers}/{results.totalQuestions}
              </div>
              <div className="text-sm text-muted-foreground">Correct Answers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{results.timeSpent}m</div>
              <div className="text-sm text-muted-foreground">Time Spent</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">{accuracy.toFixed(0)}%</div>
              <div className="text-sm text-muted-foreground">Accuracy</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span>Performance Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Strengths</h4>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Strong understanding of variable declarations</span>
                </li>
                <li className="flex items-center space-x-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Good knowledge of JavaScript operators</span>
                </li>
                <li className="flex items-center space-x-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Excellent explanation of scope concepts</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Areas for Improvement</h4>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2 text-sm">
                  <XCircle className="w-4 h-4 text-red-500" />
                  <span>Review array methods and their purposes</span>
                </li>
                <li className="flex items-center space-x-2 text-sm">
                  <Target className="w-4 h-4 text-yellow-500" />
                  <span>Practice more with built-in JavaScript methods</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Question Review */}
      <Card>
        <CardHeader>
          <CardTitle>Question Review</CardTitle>
          <CardDescription>Review your answers and learn from explanations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {results.questions.map((question, index) => (
            <div key={question.id} className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-semibold text-sm">
                  Question {index + 1}: {question.question}
                </h4>
                {question.isCorrect ? (
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                )}
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <span className="text-muted-foreground">Your answer:</span>
                  <Badge variant={question.isCorrect ? "default" : "destructive"}>{question.userAnswer}</Badge>
                </div>

                {!question.isCorrect && (
                  <div className="flex items-center space-x-2">
                    <span className="text-muted-foreground">Correct answer:</span>
                    <Badge variant="outline" className="border-green-500 text-green-700">
                      {question.correctAnswer}
                    </Badge>
                  </div>
                )}

                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-muted-foreground text-xs font-medium mb-1">Explanation:</p>
                  <p className="text-sm">{question.explanation}</p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Recommended Next Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="h-auto p-4 text-left bg-transparent">
              <div>
                <div className="font-semibold mb-1">Practice Array Methods</div>
                <div className="text-sm text-muted-foreground">Take a focused quiz on JavaScript array methods</div>
              </div>
            </Button>
            <Button variant="outline" className="h-auto p-4 text-left bg-transparent">
              <div>
                <div className="font-semibold mb-1">JavaScript Intermediate</div>
                <div className="text-sm text-muted-foreground">Ready for the next level? Try intermediate concepts</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
