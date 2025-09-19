import { type NextRequest, NextResponse } from "next/server"

// Mock posts database
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

export async function GET() {
  try {
    // Sort posts by creation date (newest first)
    const sortedPosts = posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    return NextResponse.json({
      posts: sortedPosts,
      total: posts.length,
    })
  } catch (error) {
    return NextResponse.json({ msg: "Server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { content, tags, userId, username, role } = await request.json()

    if (!content || !userId || !username) {
      return NextResponse.json({ msg: "Missing required fields" }, { status: 400 })
    }

    const newPost = {
      id: posts.length + 1,
      userId,
      username,
      role: role || "Student",
      content,
      likes: 0,
      comments: 0,
      shares: 0,
      createdAt: new Date().toISOString(),
      tags: tags || [],
    }

    posts.push(newPost)

    return NextResponse.json({
      post: newPost,
      msg: "Post created successfully",
    })
  } catch (error) {
    return NextResponse.json({ msg: "Server error" }, { status: 500 })
  }
}
