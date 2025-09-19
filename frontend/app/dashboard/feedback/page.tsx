"use client"

import { ComprehensiveFeedbackDashboard } from "@/components/comprehensive-feedback-dashboard"

export const dynamic = "force-dynamic"

export default function FeedbackDashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        <ComprehensiveFeedbackDashboard />
      </div>
    </div>
  )
}
