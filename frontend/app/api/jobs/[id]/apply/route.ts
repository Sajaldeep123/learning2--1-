import { type NextRequest, NextResponse } from "next/server"

// Mock applications database
const applications: any[] = []

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const jobId = Number.parseInt(params.id)
    const { userId, coverLetter, resume } = await request.json()

    if (!userId) {
      return NextResponse.json({ msg: "User authentication required" }, { status: 401 })
    }

    // Check if user already applied
    const existingApplication = applications.find((app) => app.jobId === jobId && app.userId === userId)

    if (existingApplication) {
      return NextResponse.json({ msg: "You have already applied for this job" }, { status: 400 })
    }

    const newApplication = {
      id: applications.length + 1,
      jobId,
      userId,
      coverLetter: coverLetter || "",
      resume: resume || "",
      status: "submitted",
      appliedDate: new Date().toISOString(),
    }

    applications.push(newApplication)

    return NextResponse.json({
      application: newApplication,
      msg: "Application submitted successfully",
    })
  } catch (error) {
    return NextResponse.json({ msg: "Server error" }, { status: 500 })
  }
}
