"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, ExternalLink, Edit, Trash2, ImageIcon, Code, FileText, Award } from "lucide-react"

interface PortfolioItem {
  id: string
  title: string
  description: string
  type: "project" | "certification" | "achievement" | "publication"
  url?: string
  image?: string
  tags: string[]
  date: string
}

export function PortfolioSection() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([
    {
      id: "1",
      title: "E-commerce Web Application",
      description:
        "Full-stack web application built with React, Node.js, and MongoDB. Features include user authentication, payment integration, and admin dashboard.",
      type: "project",
      url: "https://github.com/user/ecommerce-app",
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
      date: "2024-01-15",
    },
    {
      id: "2",
      title: "AWS Solutions Architect Associate",
      description:
        "Certified AWS Solutions Architect with expertise in cloud infrastructure design and implementation.",
      type: "certification",
      tags: ["AWS", "Cloud Computing", "Architecture"],
      date: "2023-12-10",
    },
  ])

  const [isAddingItem, setIsAddingItem] = useState(false)
  const [newItem, setNewItem] = useState<Partial<PortfolioItem>>({
    title: "",
    description: "",
    type: "project",
    url: "",
    tags: [],
  })

  const getTypeIcon = (type: PortfolioItem["type"]) => {
    switch (type) {
      case "project":
        return <Code className="w-4 h-4" />
      case "certification":
        return <Award className="w-4 h-4" />
      case "achievement":
        return <Award className="w-4 h-4" />
      case "publication":
        return <FileText className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  const getTypeColor = (type: PortfolioItem["type"]) => {
    switch (type) {
      case "project":
        return "bg-blue-500"
      case "certification":
        return "bg-green-500"
      case "achievement":
        return "bg-purple-500"
      case "publication":
        return "bg-orange-500"
      default:
        return "bg-gray-500"
    }
  }

  const addPortfolioItem = () => {
    if (newItem.title && newItem.description) {
      const item: PortfolioItem = {
        id: Date.now().toString(),
        title: newItem.title,
        description: newItem.description,
        type: newItem.type || "project",
        url: newItem.url,
        tags: newItem.tags || [],
        date: new Date().toISOString().split("T")[0],
      }
      setPortfolioItems((prev) => [...prev, item])
      setNewItem({ title: "", description: "", type: "project", url: "", tags: [] })
      setIsAddingItem(false)
    }
  }

  const removeItem = (id: string) => {
    setPortfolioItems((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Portfolio</h2>
          <p className="text-muted-foreground">Showcase your projects, certifications, and achievements</p>
        </div>
        <Dialog open={isAddingItem} onOpenChange={setIsAddingItem}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-indigo-600 to-purple-600">
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add Portfolio Item</DialogTitle>
              <DialogDescription>Add a new project, certification, or achievement to your portfolio</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="item-title">Title</Label>
                <Input
                  id="item-title"
                  value={newItem.title}
                  onChange={(e) => setNewItem((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Project or achievement title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="item-type">Type</Label>
                <select
                  id="item-type"
                  value={newItem.type}
                  onChange={(e) => setNewItem((prev) => ({ ...prev, type: e.target.value as PortfolioItem["type"] }))}
                  className="w-full p-2 border border-input rounded-md bg-background"
                >
                  <option value="project">Project</option>
                  <option value="certification">Certification</option>
                  <option value="achievement">Achievement</option>
                  <option value="publication">Publication</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="item-description">Description</Label>
                <Textarea
                  id="item-description"
                  value={newItem.description}
                  onChange={(e) => setNewItem((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your project, what you built, technologies used, etc."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="item-url">URL (Optional)</Label>
                <Input
                  id="item-url"
                  value={newItem.url}
                  onChange={(e) => setNewItem((prev) => ({ ...prev, url: e.target.value }))}
                  placeholder="https://github.com/user/project or live demo URL"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="item-tags">Tags (comma-separated)</Label>
                <Input
                  id="item-tags"
                  value={newItem.tags?.join(", ")}
                  onChange={(e) =>
                    setNewItem((prev) => ({
                      ...prev,
                      tags: e.target.value
                        .split(",")
                        .map((tag) => tag.trim())
                        .filter(Boolean),
                    }))
                  }
                  placeholder="React, Node.js, MongoDB, etc."
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddingItem(false)}>
                  Cancel
                </Button>
                <Button onClick={addPortfolioItem}>Add Item</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Portfolio Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {portfolioItems.map((item) => (
          <Card key={item.id} className="group hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 ${getTypeColor(item.type)} rounded-lg flex items-center justify-center`}>
                    <div className="text-white">{getTypeIcon(item.type)}</div>
                  </div>
                  <div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <CardDescription className="capitalize">{item.type}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{item.description}</p>

              {item.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{new Date(item.date).toLocaleDateString()}</span>
                {item.url && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      View
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        {portfolioItems.length === 0 && (
          <div className="col-span-full">
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <ImageIcon className="w-12 h-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No portfolio items yet</h3>
                <p className="text-muted-foreground text-center mb-4">
                  Start building your portfolio by adding your projects, certifications, and achievements.
                </p>
                <Button onClick={() => setIsAddingItem(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Item
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
