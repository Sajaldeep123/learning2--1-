"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EnhancedInterviewScheduler } from "@/components/enhanced-interview-scheduler"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CalendarIcon, Video, Star, MapPin, User, CheckCircle } from "lucide-react"

interface Mentor {
  id: string
  name: string
  title: string
  company: string
  avatar?: string
  rating: number
  reviewCount: number
  expertise: string[]
  availability: string[]
  timezone: string
  languages: string[]
  price?: number
}

interface TimeSlot {
  time: string
  available: boolean
}

export function InterviewScheduler() {
  const [activeView, setActiveView] = useState("enhanced")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null)
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [interviewType, setInterviewType] = useState<string>("")
  const [notes, setNotes] = useState("")
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  // Mock mentor data
  const mentors: Mentor[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      title: "Senior Software Engineer",
      company: "Google",
      rating: 4.9,
      reviewCount: 127,
      expertise: ["System Design", "Algorithms", "Frontend", "Leadership"],
      availability: ["9:00 AM", "2:00 PM", "4:00 PM"],
      timezone: "PST",
      languages: ["English", "Spanish"],
      price: 50,
    },
    {
      id: "2",
      name: "Michael Chen",
      title: "Product Manager",
      company: "Microsoft",
      rating: 4.8,
      reviewCount: 89,
      expertise: ["Product Strategy", "Analytics", "User Research", "Leadership"],
      availability: ["10:00 AM", "1:00 PM", "3:00 PM"],
      timezone: "EST",
      languages: ["English", "Mandarin"],
      price: 45,
    },
    {
      id: "3",
      name: "Dr. Priya Sharma",
      title: "Data Science Lead",
      company: "Amazon",
      rating: 4.9,
      reviewCount: 156,
      expertise: ["Machine Learning", "Statistics", "Python", "SQL"],
      availability: ["11:00 AM", "2:30 PM", "5:00 PM"],
      timezone: "PST",
      languages: ["English", "Hindi"],
      price: 60,
    },
  ]

  const interviewTypes = [
    { value: "technical", label: "Technical Interview" },
    { value: "behavioral", label: "Behavioral Interview" },
    { value: "system-design", label: "System Design" },
    { value: "case-study", label: "Case Study" },
    { value: "general", label: "General Interview" },
  ]

  const timeSlots: TimeSlot[] = [
    { time: "9:00 AM", available: true },
    { time: "10:00 AM", available: true },
    { time: "11:00 AM", available: false },
    { time: "1:00 PM", available: true },
    { time: "2:00 PM", available: true },
    { time: "3:00 PM", available: false },
    { time: "4:00 PM", available: true },
    { time: "5:00 PM", available: true },
  ]

  const handleBookInterview = () => {
    // Handle booking logic here
    console.log("[v0] Booking interview:", {
      mentor: selectedMentor,
      date: selectedDate,
      time: selectedTime,
      type: interviewType,
      notes,
    })
    setIsBookingOpen(false)
    // Reset form
    setSelectedMentor(null)
    setSelectedTime("")
    setInterviewType("")
    setNotes("")
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : i < rating
              ? "fill-yellow-400/50 text-yellow-400"
              : "text-gray-300"
        }`}
      />
    ))
  }

  return (
    <div className="space-y-6">
      {/* View Toggle */}
      <Tabs value={activeView} onValueChange={setActiveView}>
        <TabsList>
          <TabsTrigger value="enhanced">Enhanced Scheduler</TabsTrigger>
          <TabsTrigger value="classic">Classic View</TabsTrigger>
        </TabsList>

        <TabsContent value="enhanced">
          <EnhancedInterviewScheduler />
        </TabsContent>

        <TabsContent value="classic">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Calendar */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CalendarIcon className="w-5 h-5" />
                  <span>Select Date</span>
                </CardTitle>
                <CardDescription>Choose a date for your mock interview</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                  className="rounded-md border"
                />

                {selectedDate && (
                  <div className="mt-4 space-y-2">
                    <h4 className="font-semibold text-sm">Available Time Slots</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {timeSlots.map((slot) => (
                        <Button
                          key={slot.time}
                          variant={selectedTime === slot.time ? "default" : "outline"}
                          size="sm"
                          disabled={!slot.available}
                          onClick={() => setSelectedTime(slot.time)}
                          className="text-xs"
                        >
                          {slot.time}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Mentors List */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Choose Your Mentor</span>
                </CardTitle>
                <CardDescription>Select an expert mentor for your mock interview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mentors.map((mentor) => (
                    <Card
                      key={mentor.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        selectedMentor?.id === mentor.id ? "ring-2 ring-primary" : ""
                      }`}
                      onClick={() => setSelectedMentor(mentor)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-4">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={mentor.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {mentor.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex-1 space-y-2">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-semibold">{mentor.name}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {mentor.title} at {mentor.company}
                                </p>
                              </div>
                              <div className="text-right">
                                <div className="flex items-center space-x-1">
                                  {renderStars(mentor.rating)}
                                  <span className="text-sm font-semibold ml-1">{mentor.rating}</span>
                                </div>
                                <p className="text-xs text-muted-foreground">{mentor.reviewCount} reviews</p>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-1">
                              {mentor.expertise.slice(0, 4).map((skill, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                              {mentor.expertise.length > 4 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{mentor.expertise.length - 4} more
                                </Badge>
                              )}
                            </div>

                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                              <div className="flex items-center space-x-4">
                                <span className="flex items-center space-x-1">
                                  <MapPin className="w-3 h-3" />
                                  <span>{mentor.timezone}</span>
                                </span>
                                <span>{mentor.languages.join(", ")}</span>
                              </div>
                              {mentor.price && (
                                <span className="font-semibold text-primary">${mentor.price}/session</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {selectedMentor && selectedDate && selectedTime && (
                  <div className="mt-6 pt-6 border-t">
                    <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
                      <DialogTrigger asChild>
                        <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600">
                          <Video className="w-4 h-4 mr-2" />
                          Book Interview with {selectedMentor.name}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>Confirm Interview Booking</DialogTitle>
                          <DialogDescription>Complete your interview booking details</DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Interview Type</label>
                            <Select value={interviewType} onValueChange={setInterviewType}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select interview type" />
                              </SelectTrigger>
                              <SelectContent>
                                {interviewTypes.map((type) => (
                                  <SelectItem key={type.value} value={type.value}>
                                    {type.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium">Additional Notes</label>
                            <Textarea
                              placeholder="Any specific topics you'd like to focus on or questions you have..."
                              value={notes}
                              onChange={(e) => setNotes(e.target.value)}
                              rows={3}
                            />
                          </div>

                          <div className="bg-muted p-4 rounded-lg space-y-2">
                            <h4 className="font-semibold text-sm">Booking Summary</h4>
                            <div className="space-y-1 text-sm">
                              <div className="flex justify-between">
                                <span>Mentor:</span>
                                <span>{selectedMentor.name}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Date:</span>
                                <span>{selectedDate.toLocaleDateString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Time:</span>
                                <span>{selectedTime}</span>
                              </div>
                              {selectedMentor.price && (
                                <div className="flex justify-between font-semibold">
                                  <span>Price:</span>
                                  <span>${selectedMentor.price}</span>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex space-x-2">
                            <Button variant="outline" onClick={() => setIsBookingOpen(false)} className="flex-1">
                              Cancel
                            </Button>
                            <Button onClick={handleBookInterview} disabled={!interviewType} className="flex-1">
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Confirm Booking
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
