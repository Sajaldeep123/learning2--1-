import { type NextRequest, NextResponse } from "next/server"

// Mock posts database (same as above - in real app this would be shared)
const posts = [
  {
    id: 1,
    userId: 1,
    username: "Rahul Sharma",
    role: "Data Science Student",
    content:
      "Just completed my first machine learning project! Here's my analysis of customer behavior patterns using Python and scikit-learn. The insights were fascinating!",
    likes: 24,
    comments: 5,
    shares: 12,
    createdAt: new Date("2024-01-15").toISOString(),
    tags: ["MachineLearning", "Python", "DataScience"],
  },
  {
    id: 2,
    userId: 2,
    username: "Priya Patel",
    role: "UX Designer",
    content:
      "Sharing my design process for a mobile banking app. Here's how I approached user research and created intuitive interfaces that increased user engagement by 40%.",
    likes: 31,
    comments: 8,
    shares: 15,
    createdAt: new Date("2024-01-14").toISOString(),
    tags: ["UXDesign", "MobileApp", "UserResearch"],
  },
  {
    id: 3,
    userId: 1,
    username: "Arjun Kumar",
    role: "Full Stack Developer",
    content:
      "Built my first React Native app! It's a productivity tracker with offline sync. The journey from web to mobile development has been incredible. Here are my key learnings...",
    likes: 18,
    comments: 12,
    shares: 8,
    createdAt: new Date("2024-01-13").toISOString(),
    tags: ["ReactNative", "MobileDev", "Productivity"],
  },
]

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const postId = Number.parseInt(params.id)
    const { userId } = await request.json()

    const post = posts.find((p) => p.id === postId)

    if (!post) {
      return NextResponse.json({ msg: "Post not found" }, { status: 404 })
    }

    // In a real app, you'd check if user already liked and toggle
    post.likes += 1

    return NextResponse.json({
      likes: post.likes,
      msg: "Post liked successfully",
    })
  } catch (error) {
    return NextResponse.json({ msg: "Server error" }, { status: 500 })
  }
}
