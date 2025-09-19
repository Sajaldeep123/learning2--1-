import AISupportChatbot from "@/components/ai-support-chatbot"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle, Phone, Mail, Clock } from "lucide-react"

export const dynamic = "force-dynamic"

export default function SupportPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Support Center</h1>
          <p className="text-muted-foreground">Get help with your EduCareer learning journey</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                AI Support Assistant
              </CardTitle>
              <CardDescription>Get instant help with courses, assignments, and platform features</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Our AI assistant can help you with most common questions and issues. Available 24/7 with instant
                responses.
              </p>
              <div className="text-sm space-y-2 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Course progress and content questions
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Assignment and quiz assistance
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Platform navigation help
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Technical troubleshooting
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Human Support
              </CardTitle>
              <CardDescription>Connect with our support team for complex issues</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">support@educareer.com</div>
                    <div className="text-sm text-muted-foreground">Response within 24 hours</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Live Chat</div>
                    <div className="text-sm text-muted-foreground">Mon-Fri, 9 AM - 6 PM EST</div>
                  </div>
                </div>
              </div>
              <Button className="w-full mt-4 bg-transparent" variant="outline">
                Contact Human Support
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="relative">
          <AISupportChatbot isMinimized={false} />
        </div>
      </div>
    </div>
  )
}
