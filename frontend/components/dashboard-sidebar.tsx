"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import {
  LayoutDashboard,
  FileText,
  BarChart3,
  MapPin,
  MessageCircle,
  Video,
  Settings,
  Menu,
  X,
  Zap,
  User,
  Brain,
  Users,
  ClipboardList,
} from "lucide-react"

const navigation = [
  {
    name: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
    current: false,
  },
  {
    name: "Resume & Portfolio",
    href: "/dashboard/resume",
    icon: FileText,
    current: false,
    badge: "New",
  },
  {
    name: "Mock Interviews",
    href: "/dashboard/interviews",
    icon: Video,
    current: false,
  },
  {
    name: "Quizzes",
    href: "/dashboard/quizzes",
    icon: Brain,
    current: false,
  },
  {
    name: "Assignments",
    href: "/dashboard/assignments",
    icon: ClipboardList,
    current: false,
  },
  {
    name: "Career Path",
    href: "/dashboard/career-path",
    icon: MapPin,
    current: false,
  },
  {
    name: "AI Chatbot",
    href: "/dashboard/chat",
    icon: MessageCircle,
    current: false,
    badge: "AI",
  },
  {
    name: "Progress Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
    current: false,
  },
  {
    name: "Mentorship",
    href: "/dashboard/mentorship",
    icon: Users,
    current: false,
  },
  {
    name: "Support Center",
    href: "/dashboard/support",
    icon: MessageCircle,
    current: false,
    badge: "24/7",
  },
]

const secondaryNavigation = [
  {
    name: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export function DashboardSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const { user } = useAuth()

  return (
    <>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" onClick={() => setSidebarOpen(false)}>
          <div className="fixed inset-0 bg-black/50" />
        </div>
      )}

      {/* Mobile sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 transform bg-card border-r border-border transition-transform duration-300 ease-in-out lg:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent
          navigation={navigation}
          secondaryNavigation={secondaryNavigation}
          pathname={pathname}
          user={user}
          onClose={() => setSidebarOpen(false)}
          isMobile={true}
        />
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-72 lg:overflow-y-auto lg:bg-card lg:border-r lg:border-border">
        <SidebarContent
          navigation={navigation}
          secondaryNavigation={secondaryNavigation}
          pathname={pathname}
          user={user}
          onClose={() => setSidebarOpen(false)}
          isMobile={false}
        />
      </div>

      {/* Mobile menu button */}
      <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-border bg-card px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(true)}
          className="-m-2.5 p-2.5 text-foreground lg:hidden"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>
    </>
  )
}

interface SidebarContentProps {
  navigation: any[]
  secondaryNavigation: any[]
  pathname: string
  user: any
  onClose: () => void
  isMobile: boolean
}

function SidebarContent({ navigation, secondaryNavigation, pathname, user, onClose, isMobile }: SidebarContentProps) {
  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4">
      <div className="flex h-16 shrink-0 items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold gradient-text">EduCareer</span>
        </div>
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        )}
      </div>

      {/* User profile section */}
      <div className="glass-card rounded-xl p-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">{user?.profile?.name || user?.username}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
          </div>
        </div>
        <div className="mt-3 flex items-center space-x-2">
          <div className="flex-1 bg-secondary rounded-full h-2">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full w-3/4"></div>
          </div>
          <span className="text-xs text-muted-foreground">75%</span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">Profile Complete</p>
      </div>

      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      onClick={isMobile ? onClose : undefined}
                      className={`group flex gap-x-3 rounded-lg p-3 text-sm font-semibold leading-6 transition-all duration-200 ${
                        isActive
                          ? "bg-primary text-primary-foreground shadow-lg"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent"
                      }`}
                    >
                      <item.icon
                        className={`h-5 w-5 shrink-0 ${
                          isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
                        }`}
                      />
                      <span className="flex-1">{item.name}</span>
                      {item.badge && (
                        <Badge variant={item.badge === "AI" ? "default" : "secondary"} className="text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </li>
          <li className="mt-auto">
            <ul role="list" className="-mx-2 space-y-1">
              {secondaryNavigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      onClick={isMobile ? onClose : undefined}
                      className={`group flex gap-x-3 rounded-lg p-3 text-sm font-semibold leading-6 transition-all duration-200 ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent"
                      }`}
                    >
                      <item.icon
                        className={`h-5 w-5 shrink-0 ${
                          isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
                        }`}
                      />
                      {item.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  )
}
