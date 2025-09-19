"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  CalendarIcon,
  Video,
  Star,
  CheckCircle,
  Clock,
  Bell,
  Globe,
  CalendarPlus,
  Zap,
  Users,
  Filter,
} from "lucide-react"

interface EnhancedMentor {
  id: string
  name: string
  title: string
  company: string
  avatar?: string
  rating: number
  reviewCount: number
  expertise: string[]
  availability: Array<{
    date: string
    slots: Array<{
      time: string
      available: boolean
      timezone: string
      price?: number
    }>
  }>
  timezone: string
  languages: string[]
  responseTime: string
  successRate: number
  specializations: string[]
  yearsExperience: number
  isVerified: boolean
  nextAvailable?: string
}

interface BookingPreferences {
  timezone: string
  reminderPreferences: {
    email: boolean
    sms: boolean
    push: boolean
  }
  calendarSync: {
    google: boolean
    outlook: boolean
    apple: boolean
  }
  autoReschedule: boolean
  bufferTime: number
}

export function EnhancedInterviewScheduler() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedMentor, setSelectedMentor] = useState<EnhancedMentor | null>(null)
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [interviewType, setInterviewType] = useState<string>("")
  const [notes, setNotes] = useState("")
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [userTimezone, setUserTimezone] = useState("UTC")
  const [filterExpertise, setFilterExpertise] = useState<string>("")
  const [filterAvailability, setFilterAvailability] = useState<string>("all")
  const [bookingPreferences, setBookingPreferences] = useState<BookingPreferences>({
    timezone: "UTC",
    reminderPreferences: {
      email: true,
      sms: false,
      push: true,
    },
    calendarSync: {
      google: false,
      outlook: false,
      apple: false,
    },
    autoReschedule: false,
    bufferTime: 15,
  })

  // Enhanced mentor data with more detailed availability
  const mentors: EnhancedMentor[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      title: "Senior Software Engineer",
      company: "Google",
      rating: 4.9,
      reviewCount: 127,
      expertise: ["System Design", "Algorithms", "Frontend", "Leadership"],
      availability: [
        {
          date: "2024-01-20",
          slots: [
            { time: "09:00", available: true, timezone: "PST", price: 50 },
            { time: "14:00", available: true, timezone: "PST", price: 50 },
            { time: "16:00", available: false, timezone: "PST", price: 50 },
          ],
        },
        {
          date: "2024-01-21",
          slots: [
            { time: "10:00", available: true, timezone: "PST", price: 50 },
            { time: "15:00", available: true, timezone: "PST", price: 50 },
          ],
        },
      ],
      timezone: "PST",
      languages: ["English", "Spanish"],
      responseTime: "< 2 hours",
      successRate: 94,
      specializations: ["FAANG Interviews", "System Design", "Technical Leadership"],
      yearsExperience: 8,
      isVerified: true,
      nextAvailable: "Today at 2:00 PM PST",
    },
    {
      id: "2",
      name: "Michael Chen",
      title: "Product Manager",
      company: "Microsoft",
      rating: 4.8,
      reviewCount: 89,
      expertise: ["Product Strategy", "Analytics", "User Research", "Leadership"],
      availability: [
        {
          date: "2024-01-20",
          slots: [
            { time: "10:00", available: true, timezone: "EST", price: 45 },
            { time: "13:00", available: true, timezone: "EST", price: 45 },
            { time: "15:00", available: true, timezone: "EST", price: 45 },
          ],
        },
      ],
      timezone: "EST",
      languages: ["English", "Mandarin"],
      responseTime: "< 4 hours",
      successRate: 91,
      specializations: ["Product Management", "Strategy", "Data Analysis"],
      yearsExperience: 6,
      isVerified: true,
      nextAvailable: "Tomorrow at 10:00 AM EST",
    },
    {
      id: "3",
      name: "Dr. Priya Sharma",
      title: "Data Science Lead",
      company: "Amazon",
      rating: 4.9,
      reviewCount: 156,
      expertise: ["Machine Learning", "Statistics", "Python", "SQL"],
      availability: [
        {
          date: "2024-01-20",
          slots: [
            { time: "11:00", available: true, timezone: "PST", price: 60 },
            { time: "14:30", available: false, timezone: "PST", price: 60 },
            { time: "17:00", available: true, timezone: "PST", price: 60 },
          ],
        },
      ],
      timezone: "PST",
      languages: ["English", "Hindi"],
      responseTime: "< 1 hour",
      successRate: 96,
      specializations: ["Data Science", "ML Engineering", "AI Strategy"],
      yearsExperience: 10,
      isVerified: true,
      nextAvailable: "Today at 5:00 PM PST",
    },
  ]

  const interviewTypes = [
    { value: "technical", label: "Technical Interview", duration: 60 },
    { value: "behavioral", label: "Behavioral Interview", duration: 45 },
    { value: "system-design", label: "System Design", duration: 90 },
    { value: "case-study", label: "Case Study", duration: 60 },
    { value: "general", label: "General Interview", duration: 45 },
    { value: "mock-onsite", label: "Mock Onsite", duration: 180 },
  ]

  const timezones = [
    { value: "PST", label: "Pacific Standard Time (PST)" },
    { value: "EST", label: "Eastern Standard Time (EST)" },
    { value: "CST", label: "Central Standard Time (CST)" },
    { value: "MST", label: "Mountain Standard Time (MST)" },
    { value: "UTC", label: "Coordinated Universal Time (UTC)" },
    { value: "GMT", label: "Greenwich Mean Time (GMT)" },
  ]

  useEffect(() => {
    // Detect user's timezone
    const detectedTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    setUserTimezone(detectedTimezone)
    setBookingPreferences((prev) => ({ ...prev, timezone: detectedTimezone }))
  }, [])

  const handleBookInterview = async () => {
    const bookingData = {
      mentor: selectedMentor,
      date: selectedDate,
      time: selectedTime,
      type: interviewType,
      notes,
      preferences: bookingPreferences,
    }

    console.log("[v0] Booking interview:", bookingData)

    // Here you would typically send to your backend
    // await bookInterview(bookingData)

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

  const convertTimeToUserTimezone = (time: string, mentorTimezone: string) => {
    // This would use a proper timezone conversion library in production
    return `${time} ${mentorTimezone}`
  }

  const filteredMentors = mentors.filter((mentor) => {
    if (
      filterExpertise &&
      !mentor.expertise.some((skill) => skill.toLowerCase().includes(filterExpertise.toLowerCase()))
    ) {
      return false
    }

    if (filterAvailability === "today") {
      const today = new Date().toISOString().split("T")[0]
      return mentor.availability.some((avail) => avail.date === today)
    }

    return true
  })

  const getAvailableSlots = (mentor: EnhancedMentor, date: Date) => {
    const dateStr = date.toISOString().split("T")[0]
    const dayAvailability = mentor.availability.find((avail) => avail.date === dateStr)
    return dayAvailability?.slots || []
  }

  return (
    <div className="space-y-6">
      {/* Enhanced Header with Quick Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Schedule Interview</h2>
          <p className="text-muted-foreground">Book with expert mentors or join the waitlist for popular slots</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <CalendarPlus className="w-4 h-4 mr-2" />
            Sync Calendar
          </Button>
          <Button variant="outline">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </Button>
        </div>
      </div>

      {/* Filters and Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="w-5 h-5" />
            <span>Filters & Preferences</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Your Timezone</Label>
              <Select value={userTimezone} onValueChange={setUserTimezone}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {timezones.map((tz) => (
                    <SelectItem key={tz.value} value={tz.value}>
                      {tz.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Expertise</Label>
              <Input
                placeholder="e.g., System Design, ML"
                value={filterExpertise}
                onChange={(e) => setFilterExpertise(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Availability</Label>
              <Select value={filterAvailability} onValueChange={setFilterAvailability}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Available</SelectItem>
                  <SelectItem value="today">Available Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="urgent">Next 2 Hours</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Interview Type</Label>
              <Select value={interviewType} onValueChange={setInterviewType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {interviewTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label} ({type.duration}min)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Enhanced Calendar */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CalendarIcon className="w-5 h-5" />
              <span>Select Date & Time</span>
            </CardTitle>
            <CardDescription>Choose when you'd like to have your interview</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
              className="rounded-md border"
            />

            {selectedDate && selectedMentor && (
              <div className="space-y-3">
                <h4 className="font-semibold text-sm flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>Available Times</span>
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {getAvailableSlots(selectedMentor, selectedDate).map((slot) => (
                    <Button
                      key={slot.time}
                      variant={selectedTime === slot.time ? "default" : "outline"}
                      size="sm"
                      disabled={!slot.available}
                      onClick={() => setSelectedTime(slot.time)}
                      className="justify-between text-xs"
                    >
                      <span>{convertTimeToUserTimezone(slot.time, slot.timezone)}</span>
                      {slot.price && <span>${slot.price}</span>}
                    </Button>
                  ))}
                </div>

                {getAvailableSlots(selectedMentor, selectedDate).length === 0 && (
                  <div className="text-center py-4">
                    <p className="text-sm text-muted-foreground">No available slots for this date</p>
                    <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                      <Bell className="w-4 h-4 mr-2" />
                      Join Waitlist
                    </Button>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Enhanced Mentors List */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Available Mentors</span>
              </div>
              <Badge variant="secondary">{filteredMentors.length} mentors</Badge>
            </CardTitle>
            <CardDescription>Select an expert mentor based on your needs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredMentors.map((mentor) => (
                <Card
                  key={mentor.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedMentor?.id === mentor.id ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setSelectedMentor(mentor)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className="relative">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={mentor.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {mentor.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        {mentor.isVerified && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background flex items-center justify-center">
                            <CheckCircle className="w-2 h-2 text-white" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold flex items-center space-x-2">
                              <span>{mentor.name}</span>
                              {mentor.isVerified && <CheckCircle className="w-4 h-4 text-green-500" />}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {mentor.title} at {mentor.company}
                            </p>
                            <p className="text-xs text-muted-foreground">{mentor.yearsExperience} years experience</p>
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
                          {mentor.specializations.slice(0, 3).map((spec, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {spec}
                            </Badge>
                          ))}
                          {mentor.specializations.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{mentor.specializations.length - 3} more
                            </Badge>
                          )}
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{mentor.responseTime}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Zap className="w-3 h-3" />
                            <span>{mentor.successRate}% success</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Globe className="w-3 h-3" />
                            <span>{mentor.timezone}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <CalendarIcon className="w-3 h-3" />
                            <span className="text-green-600">{mentor.nextAvailable}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {selectedMentor && selectedDate && selectedTime && interviewType && (
              <div className="mt-6 pt-6 border-t">
                <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600">
                      <Video className="w-4 h-4 mr-2" />
                      Book Interview with {selectedMentor.name}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Confirm Interview Booking</DialogTitle>
                      <DialogDescription>Complete your interview booking and preferences</DialogDescription>
                    </DialogHeader>

                    <Tabs defaultValue="booking" className="space-y-4">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="booking">Booking Details</TabsTrigger>
                        <TabsTrigger value="preferences">Preferences</TabsTrigger>
                      </TabsList>

                      <TabsContent value="booking" className="space-y-4">
                        <div className="space-y-2">
                          <Label>Additional Notes</Label>
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
                              <span>{convertTimeToUserTimezone(selectedTime, selectedMentor.timezone)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Type:</span>
                              <span>{interviewTypes.find((t) => t.value === interviewType)?.label}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Duration:</span>
                              <span>{interviewTypes.find((t) => t.value === interviewType)?.duration} minutes</span>
                            </div>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="preferences" className="space-y-4">
                        <div className="space-y-4">
                          <div>
                            <Label className="text-base font-semibold">Reminder Preferences</Label>
                            <div className="space-y-3 mt-2">
                              <div className="flex items-center justify-between">
                                <Label htmlFor="email-reminder">Email reminders</Label>
                                <Switch
                                  id="email-reminder"
                                  checked={bookingPreferences.reminderPreferences.email}
                                  onCheckedChange={(checked) =>
                                    setBookingPreferences((prev) => ({
                                      ...prev,
                                      reminderPreferences: { ...prev.reminderPreferences, email: checked },
                                    }))
                                  }
                                />
                              </div>
                              <div className="flex items-center justify-between">
                                <Label htmlFor="push-reminder">Push notifications</Label>
                                <Switch
                                  id="push-reminder"
                                  checked={bookingPreferences.reminderPreferences.push}
                                  onCheckedChange={(checked) =>
                                    setBookingPreferences((prev) => ({
                                      ...prev,
                                      reminderPreferences: { ...prev.reminderPreferences, push: checked },
                                    }))
                                  }
                                />
                              </div>
                            </div>
                          </div>

                          <div>
                            <Label className="text-base font-semibold">Calendar Integration</Label>
                            <div className="space-y-3 mt-2">
                              <div className="flex items-center justify-between">
                                <Label htmlFor="google-cal">Add to Google Calendar</Label>
                                <Switch
                                  id="google-cal"
                                  checked={bookingPreferences.calendarSync.google}
                                  onCheckedChange={(checked) =>
                                    setBookingPreferences((prev) => ({
                                      ...prev,
                                      calendarSync: { ...prev.calendarSync, google: checked },
                                    }))
                                  }
                                />
                              </div>
                              <div className="flex items-center justify-between">
                                <Label htmlFor="outlook-cal">Add to Outlook Calendar</Label>
                                <Switch
                                  id="outlook-cal"
                                  checked={bookingPreferences.calendarSync.outlook}
                                  onCheckedChange={(checked) =>
                                    setBookingPreferences((prev) => ({
                                      ...prev,
                                      calendarSync: { ...prev.calendarSync, outlook: checked },
                                    }))
                                  }
                                />
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="auto-reschedule">Auto-reschedule if mentor cancels</Label>
                              <p className="text-xs text-muted-foreground">Automatically find alternative slots</p>
                            </div>
                            <Switch
                              id="auto-reschedule"
                              checked={bookingPreferences.autoReschedule}
                              onCheckedChange={(checked) =>
                                setBookingPreferences((prev) => ({ ...prev, autoReschedule: checked }))
                              }
                            />
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>

                    <div className="flex space-x-2">
                      <Button variant="outline" onClick={() => setIsBookingOpen(false)} className="flex-1">
                        Cancel
                      </Button>
                      <Button onClick={handleBookInterview} className="flex-1">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Confirm Booking
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
