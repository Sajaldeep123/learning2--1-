"use client"
import Link from 'next/link';


import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Zap,
  Lightbulb,
  Users,
  Briefcase,
  CheckCircle,
  Star,
  User,
  BookOpen,
  MessageCircle,
  Heart,
  Share,
  MessageSquare,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react"
import { ChatWindow } from "@/components/chat-window"
import { AuthModal } from "@/components/auth-modal"
import { Navigation } from "@/components/navigation"
import { useAuth } from "@/contexts/auth-context"
import { ReviewSection } from "@/components/review-section"
import router from 'next/router';

export const dynamic = "force-dynamic"

export default function HomePage() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const { user, login } = useAuth()

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("animate-in")
          }, index * 100)
        }
      })
    }, observerOptions)

    document.querySelectorAll(".section-reveal").forEach((section) => {
      observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  const handleGetStarted = () => {
    if (user) {
      // Navigate to dashboard or a specific onboarding page
      router.push("/dashboard/quizzes") // Redirect to quizzes as an onboarding/assessment page
    } else {
      setIsAuthModalOpen(true)
    }
  }

  const handleLogin = (userData: any) => {
    login(userData)
    setIsAuthModalOpen(false)
    router.push("/dashboard") // Redirect to dashboard after successful login
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation onGetStarted={handleGetStarted} />

      {/* Hero Section */}
      <section className="hero-gradient min-h-screen flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-xl animate-float" />
        <div
          className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-xl animate-float"
          style={{ animationDelay: "2s" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left text-white">
              <div className="inline-flex items-center space-x-2 glass-card rounded-full px-6 py-3 mb-8 pulse-glow">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-white">Your Lifelong Career Partner</span>
                <Sparkles className="w-4 h-4 text-yellow-400" />
              </div>

              <h1 className="text-6xl lg:text-8xl font-bold leading-tight mb-8 text-balance">
                Your Future
                <span className="block bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent text-glow">
                  Starts Here
                </span>
              </h1>

              <p className="text-xl text-slate-200 mb-10 leading-relaxed text-pretty max-w-2xl">
                India's most comprehensive career and education platform. From personalized roadmaps to AI guidance,
                mentorship, and job opportunities - all in your local language.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start mb-12">
                <Button
                  size="lg"
                  className="bg-white text-slate-900 hover:bg-slate-100 px-10 py-6 text-lg font-bold rounded-full shadow-2xl hover:shadow-white/25 transition-all duration-300 transform hover:scale-105"
                  onClick={handleGetStarted}
                >
                  <Target className="w-5 h-5 mr-2" />
                  Start Your Journey
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white/40 text-white hover:bg-white/10 px-10 py-6 text-lg font-bold glass-card rounded-full bg-transparent"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Watch Demo
                </Button>
              </div>

              <div className="space-y-4">
                <p className="text-slate-300 font-medium">Available in:</p>
                <div className="flex flex-wrap gap-3">
                  {["English", "हिंदी", "தமிழ்", "తెలుగు", "বাংলা", "+8 more"].map((lang) => (
                    <Badge
                      key={lang}
                      className="bg-gradient-to-r from-green-500/80 to-cyan-500/80 text-white px-4 py-2 text-sm font-medium backdrop-blur-sm border border-white/20"
                    >
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="animate-float">
                <Card className="glass-card w-full h-[28rem] shadow-2xl">
                  <CardContent className="p-8 space-y-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-sm text-white font-medium">AI Career Assistant Active</span>
                      <div className="ml-auto">
                        <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                          <Lightbulb className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </div>

                    <Card className="glass-card border-indigo-500/30">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                            <MessageCircle className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-white leading-relaxed">
                              "Based on your interests in technology and data analysis, I recommend starting with Python
                              programming and statistics fundamentals..."
                            </p>
                            <div className="mt-3 flex items-center space-x-2">
                              <div className="flex space-x-1">
                                {[1, 2, 3].map((i) => (
                                  <div
                                    key={i}
                                    className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"
                                    style={{ animationDelay: `${i * 0.2}s` }}
                                  />
                                ))}
                              </div>
                              <span className="text-xs text-slate-400">AI is typing...</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="grid grid-cols-2 gap-4">
                      <Card className="glass-card border-indigo-500/20">
                        <CardContent className="p-4 text-center">
                          <div className="text-3xl font-bold text-indigo-400 mb-1">50K+</div>
                          <div className="text-xs text-slate-300">Students Guided</div>
                          <TrendingUp className="w-4 h-4 text-green-400 mx-auto mt-2" />
                        </CardContent>
                      </Card>
                      <Card className="glass-card border-purple-500/20">
                        <CardContent className="p-4 text-center">
                          <div className="text-3xl font-bold text-purple-400 mb-1">500+</div>
                          <div className="text-xs text-slate-300">Expert Mentors</div>
                          <Users className="w-4 h-4 text-purple-400 mx-auto mt-2" />
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-transparent" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                value: "50,000+",
                label: "Students Guided",
                color: "text-indigo-400",
                icon: <Target className="w-6 h-6" />,
              },
              { value: "500+", label: "Expert Mentors", color: "text-purple-400", icon: <Users className="w-6 h-6" /> },
              {
                value: "10,000+",
                label: "Job Opportunities",
                color: "text-cyan-400",
                icon: <Briefcase className="w-6 h-6" />,
              },
              {
                value: "13",
                label: "Local Languages",
                color: "text-green-400",
                icon: <MessageCircle className="w-6 h-6" />,
              },
            ].map((stat, index) => (
              <Card key={index} className="glass-card hover:scale-105 transition-all duration-300 group">
                <CardContent className="p-8 text-center">
                  <div className={`${stat.color} mb-4 flex justify-center group-hover:scale-110 transition-transform`}>
                    {stat.icon}
                  </div>
                  <div className={`text-4xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
                  <div className="text-slate-400 font-medium">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section id="features" className="py-20 section-reveal">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-6xl font-bold mb-8 text-balance">
              Everything You Need in
              <span className="block gradient-text">One Platform</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-4xl mx-auto leading-relaxed text-pretty">
              From personalized roadmaps to AI guidance, real mentorship, and job opportunities - we've built the
              complete ecosystem for your success.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <BookOpen className="w-8 h-8" />,
                title: "Personalized Career Roadmaps",
                description:
                  "Step-by-step guidance tailored to your interests, skills, and goals. Our AI creates a unique path showing exactly what courses to take and skills to develop.",
                features: ["Adaptive learning paths", "Progress tracking", "Industry-aligned milestones"],
                gradient: "from-indigo-500 to-purple-600",
              },
              {
                icon: <Lightbulb className="w-8 h-8" />,
                title: "24/7 AI Career Assistant",
                description:
                  "Instant, multilingual support for all your career questions. Get personalized advice, course recommendations, and guidance anytime, anywhere.",
                features: ["Multilingual support", "Instant responses", "Personalized advice"],
                gradient: "from-cyan-500 to-blue-600",
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Expert Mentorship Network",
                description:
                  "Connect with industry professionals and experts who provide personalized guidance beyond textbooks and typical counseling.",
                features: ["Industry professionals", "One-on-one guidance", "Real-world insights"],
                gradient: "from-purple-500 to-pink-600",
              },
              {
                icon: <Briefcase className="w-8 h-8" />,
                title: "Integrated Job Marketplace",
                description:
                  "Find relevant internships and jobs that match your skills and career goals. From entry-level to expert positions.",
                features: ["Skill matching", "Real opportunities", "Career progression"],
                gradient: "from-green-500 to-emerald-600",
              },
              {
                icon: <Star className="w-8 h-8" />,
                title: "Gamified Learning Paths",
                description:
                  "Earn badges, points, and unlock achievements as you complete milestones. Make your learning journey engaging and rewarding.",
                features: ["Achievement system", "Progress rewards", "Engaging experience"],
                gradient: "from-yellow-500 to-orange-600",
              },
              {
                icon: <User className="w-8 h-8" />,
                title: "Dynamic Professional Portfolio",
                description:
                  "Build a living showcase of your work, skills, and achievements. Share projects, certificates, and progress with employers and mentors.",
                features: ["Live portfolio", "Skill showcase", "Professional presentation"],
                gradient: "from-red-500 to-pink-600",
              },
            ].map((feature, index) => (
              <Card key={index} className="feature-card rounded-3xl group">
                <CardContent className="p-8">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <div className="text-white">{feature.icon}</div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
                  <p className="text-slate-400 mb-6 leading-relaxed">{feature.description}</p>
                  <div className="space-y-3">
                    {feature.features.map((item, idx) => (
                      <div key={idx} className="flex items-center space-x-3 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                        <span className="text-slate-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="py-20 bg-slate-900/30 section-reveal">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">
              Learn Together,
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {" "}
                Grow Together
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join a vibrant community where knowledge flows freely. Share your projects, discover resources, and build
              your reputation as an expert.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {[
                {
                  icon: <BookOpen className="w-6 h-6" />,
                  title: "Share Knowledge",
                  description: "Upload projects, case studies, and valuable resources to help others learn.",
                  gradient: "from-purple-500 to-pink-600",
                },
                {
                  icon: <Heart className="w-6 h-6" />,
                  title: "Build Reputation",
                  description: "Get likes, follows, and recognition for your contributions to the community.",
                  gradient: "from-indigo-500 to-cyan-600",
                },
                {
                  icon: <BookOpen className="w-6 h-6" />,
                  title: "Discover Resources",
                  description: "Find curated learning materials, tutorials, and insights from peer learners.",
                  gradient: "from-green-500 to-emerald-600",
                },
              ].map((item, index) => (
                <Card key={index} className="border-indigo-500/20 bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div
                        className={`w-12 h-12 bg-gradient-to-r ${item.gradient} rounded-xl flex items-center justify-center`}
                      >
                        <div className="text-white">{item.icon}</div>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="relative">
              <Card className="bg-card/80 backdrop-blur-sm border-indigo-500/20">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">Community Feed</h3>

                  <div className="space-y-6">
                    {[
                      {
                        author: "Rahul Sharma",
                        role: "Data Science Student",
                        content:
                          "Just completed my first machine learning project! Here's my analysis of customer behavior patterns...",
                        likes: 24,
                        comments: 5,
                        shares: 12,
                      },
                      {
                        author: "Priya Patel",
                        role: "UX Designer",
                        content:
                          "Sharing my design process for a mobile banking app. Here's how I approached user research...",
                        likes: 31,
                        comments: 8,
                        shares: 15,
                      },
                    ].map((post, index) => (
                      <Card key={index} className="bg-slate-800/50 border-slate-700">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                              <User className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <div className="font-semibold text-sm">{post.author}</div>
                              <div className="text-xs text-muted-foreground">{post.role}</div>
                            </div>
                          </div>
                          <p className="text-sm mb-3">{post.content}</p>
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <span className="flex items-center space-x-1">
                              <Heart className="w-4 h-4" />
                              <span>{post.likes} likes</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <MessageSquare className="w-4 h-4" />
                              <span>{post.comments} comments</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Share className="w-4 h-4" />
                              <span>{post.shares} shares</span>
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Review Section */}
      <ReviewSection />

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="hero-gradient absolute inset-0" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10 text-white">
          <h2 className="text-6xl font-bold mb-8 text-balance">Ready to Transform Your Future?</h2>
          <p className="text-xl text-slate-200 mb-12 leading-relaxed text-pretty max-w-3xl mx-auto">
            Join thousands of students who are already building their dream careers with EduCareer's comprehensive
            platform. Start your personalized journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
            <Button
              size="lg"
              className="bg-white text-slate-900 hover:bg-slate-100 px-10 py-6 text-lg font-bold rounded-full shadow-2xl hover:shadow-white/25 transition-all duration-300 transform hover:scale-105"
              onClick={handleGetStarted}
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Start Free Today
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-white/50 text-white hover:bg-white/10 px-10 py-6 text-lg font-bold glass-card rounded-full bg-transparent"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Schedule a Demo
            </Button>
          </div>
          <div className="text-slate-300 space-y-2">
            <p className="font-medium">✓ Free to start • ✓ No credit card required • ✓ Available in 13+ languages</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  EduCareer
                </span>
              </div>
              <p className="text-muted-foreground mb-6">
                Your lifelong partner in education and career success. Empowering students across India with AI-driven
                guidance, expert mentorship, and real opportunities.
              </p>
            </div>

            {[{
                title: "Platform",
                links: [
                  { name: "Career Roadmaps", href: "/dashboard/career-path" },
                  { name: "AI Assistant", href: "/dashboard/chat" },
                  // { name: "Mentorship", href: "#" }, // No direct page found
                  { name: "Job Marketplace", href: "/dashboard/jobs" },
                  { name: "Community", href: "/community" },
                ],
              },
              {
                title: "Resources",
                links: [
                  { name: "Help Center", href: "/support" },
                  // { name: "Blog", href: "#" }, // No direct page found
                  // { name: "Career Guides", href: "#" }, // No direct page found
                  // { name: "Success Stories", href: "#" }, // No direct page found
                  // { name: "API Documentation", href: "#" }, // No direct page found
                ],
              },
              {
                title: "Company",
                links: [
                  // { name: "About Us", href: "#" }, // No direct page found
                  // { name: "Careers", href: "#" }, // No direct page found
                  // { name: "Privacy Policy", href: "#" }, // No direct page found
                  // { name: "Terms of Service", href: "#" }, // No direct page found
                  // { name: "Contact", href: "#" }, // No direct page found
                ],
              },
            ].map((section, index) => (
              <div key={index}>
                <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
                <ul className="space-y-2 text-muted-foreground">
                  {section.links.map((link, idx) => (
                    <li key={idx}>
                      <Link href={link.href} className="hover:text-white transition-colors">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              © 2024 EduCareer. All rights reserved. Made with ❤️ for students across India.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <span className="text-muted-foreground text-sm">Available in:</span>
              <div className="flex space-x-2">
                {["EN", "HI", "TA", "+10"].map((lang) => (
                  <Badge key={lang} variant="secondary" className="text-xs">
                    {lang}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Chat Button */}
      <Button
        className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-2xl hover:shadow-indigo-500/25 transition-all duration-300 hover:scale-110 z-50 pulse-glow"
        onClick={() => setIsChatOpen(true)}
      >
        <MessageCircle className="w-8 h-8" />
      </Button>

      {/* Chat Window */}
      <ChatWindow isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} onLogin={handleLogin} />
    </div>
  )
}
