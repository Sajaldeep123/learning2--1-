"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { User, Heart, MessageSquare, Share, Send, Plus } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

interface Post {
  id: number
  userId: number
  username: string
  role: string
  content: string
  likes: number
  comments: number
  shares: number
  createdAt: string
  tags: string[]
}

export function CommunityFeed() {
  const [posts, setPosts] = useState<Post[]>([])
  const [newPost, setNewPost] = useState("")
  const [newTags, setNewTags] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showCreatePost, setShowCreatePost] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/community/posts")
      const data = await response.json()
      setPosts(data.posts || [])
    } catch (error) {
      console.error("Error fetching posts:", error)
    }
  }

  const handleCreatePost = async () => {
    if (!newPost.trim() || !user) return

    setIsLoading(true)
    try {
      const response = await fetch("/api/community/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: newPost,
          tags: newTags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean),
          userId: user.id,
          username: user.username,
          role: user.profile?.name || "Student",
        }),
      })

      if (response.ok) {
        setNewPost("")
        setNewTags("")
        setShowCreatePost(false)
        fetchPosts() // Refresh posts
      }
    } catch (error) {
      console.error("Error creating post:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLike = async (postId: number) => {
    if (!user) return

    try {
      const response = await fetch(`/api/community/posts/${postId}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.id }),
      })

      if (response.ok) {
        const data = await response.json()
        setPosts(posts.map((post) => (post.id === postId ? { ...post, likes: data.likes } : post)))
      }
    } catch (error) {
      console.error("Error liking post:", error)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Create Post Section */}
      {user && (
        <Card className="border-indigo-500/20 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6">
            {!showCreatePost ? (
              <Button
                onClick={() => setShowCreatePost(true)}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Share your knowledge with the community
              </Button>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">{user.username}</div>
                    <div className="text-sm text-muted-foreground">{user.profile?.name || "Student"}</div>
                  </div>
                </div>

                <Textarea
                  placeholder="Share your project, insights, or ask for help..."
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  className="min-h-[100px]"
                />

                <Textarea
                  placeholder="Add tags (comma separated): React, JavaScript, WebDev"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  className="h-12"
                />

                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowCreatePost(false)
                      setNewPost("")
                      setNewTags("")
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCreatePost}
                    disabled={!newPost.trim() || isLoading}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {isLoading ? "Posting..." : "Post"}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Posts Feed */}
      <div className="space-y-6">
        {posts.map((post) => (
          <Card key={post.id} className="border-indigo-500/20 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{post.username}</div>
                  <div className="text-sm text-muted-foreground">{post.role}</div>
                </div>
                <div className="text-sm text-muted-foreground">{formatDate(post.createdAt)}</div>
              </div>

              <p className="text-foreground mb-4 leading-relaxed">{post.content}</p>

              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center space-x-6">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLike(post.id)}
                    className="text-muted-foreground hover:text-red-500 transition-colors"
                  >
                    <Heart className="w-4 h-4 mr-1" />
                    {post.likes}
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-blue-500 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 mr-1" />
                    {post.comments}
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-green-500 transition-colors"
                  >
                    <Share className="w-4 h-4 mr-1" />
                    {post.shares}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {posts.length === 0 && (
        <Card className="border-indigo-500/20 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-12 text-center">
            <div className="text-muted-foreground mb-4">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No posts yet</h3>
              <p>Be the first to share your knowledge with the community!</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
