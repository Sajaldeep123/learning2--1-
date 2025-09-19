"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Zap, Menu, X } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

interface NavigationProps {
  onGetStarted: () => void
}

export function Navigation({ onGetStarted }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user, logout, loading } = useAuth()

  const handleLogout = async () => {
    await logout()
  }

  const getUserDisplayName = () => {
    if (!user) return ""
    return user.user_metadata?.username || user.user_metadata?.name || user.email.split("@")[0]
  }

  return (
    <nav className="fixed top-0 w-full z-50 glass-effect">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">EduCareer</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="nav-link text-slate-300 hover:text-white font-medium">
              Features
            </a>
            <a href="#community" className="nav-link text-slate-300 hover:text-white font-medium">
              Community
            </a>
            <a href="#mentorship" className="nav-link text-slate-300 hover:text-white font-medium">
              Mentorship
            </a>
            <a href="#marketplace" className="nav-link text-slate-300 hover:text-white font-medium">
              Jobs
            </a>

            <Select defaultValue="en">
              <SelectTrigger className="w-32 glass-card border-indigo-500/30 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="glass-effect border-indigo-500/30">
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="hi">हिंदी</SelectItem>
                <SelectItem value="ta">தமிழ்</SelectItem>
                <SelectItem value="te">తెలుగు</SelectItem>
                <SelectItem value="bn">বাংলা</SelectItem>
              </SelectContent>
            </Select>

            {loading ? (
              <div className="text-white">Loading...</div>
            ) : user ? (
              <div className="flex items-center space-x-4">
                <span className="text-white font-semibold">Welcome, {getUserDisplayName()}!</span>
                <Button
                  variant="destructive"
                  onClick={handleLogout}
                  className="bg-red-600/80 hover:bg-red-700/80 backdrop-blur-sm"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-indigo-500/25"
                onClick={onGetStarted}
              >
                Get Started
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white hover:bg-white/10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-indigo-500/30">
            <div className="flex flex-col space-y-4 pt-4">
              <a href="#features" className="text-slate-300 hover:text-white transition-colors font-medium">
                Features
              </a>
              <a href="#community" className="text-slate-300 hover:text-white transition-colors font-medium">
                Community
              </a>
              <a href="#mentorship" className="text-slate-300 hover:text-white transition-colors font-medium">
                Mentorship
              </a>
              <a href="#marketplace" className="text-slate-300 hover:text-white transition-colors font-medium">
                Jobs
              </a>
              {loading ? (
                <div className="text-white">Loading...</div>
              ) : user ? (
                <div className="flex flex-col space-y-2">
                  <span className="text-white font-semibold">Welcome, {getUserDisplayName()}!</span>
                  <Button
                    variant="destructive"
                    onClick={handleLogout}
                    className="w-fit bg-red-600/80 hover:bg-red-700/80"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <Button
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 w-fit rounded-full"
                  onClick={onGetStarted}
                >
                  Get Started
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
