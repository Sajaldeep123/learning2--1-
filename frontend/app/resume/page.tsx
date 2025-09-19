import { ResumeUpload } from "@/components/resume-upload"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, TrendingUp, Users, Award } from "lucide-react"

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 text-balance">
            Resume Analysis &
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {" "}
              Optimization
            </span>
          </h1>
          <p className="text-xl text-muted-foreground text-pretty max-w-3xl">
            Get instant AI-powered feedback on your resume. Improve your chances of landing interviews with personalized
            recommendations and ATS optimization.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: FileText, label: "Resumes Analyzed", value: "50K+", color: "text-blue-400" },
            { icon: TrendingUp, label: "Avg Score Improvement", value: "+23%", color: "text-green-400" },
            { icon: Users, label: "Students Helped", value: "15K+", color: "text-purple-400" },
            { icon: Award, label: "Success Rate", value: "89%", color: "text-yellow-400" },
          ].map((stat, index) => (
            <Card key={index} className="glass-card">
              <CardContent className="p-4 text-center">
                <stat.icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
                <div className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[
            {
              title: "AI-Powered Analysis",
              description: "Advanced algorithms analyze your resume for content, structure, and ATS compatibility",
              features: ["Content analysis", "Format optimization", "Keyword matching"],
            },
            {
              title: "Industry-Specific Tips",
              description: "Get recommendations tailored to your target industry and role",
              features: ["Role-specific advice", "Industry keywords", "Best practices"],
            },
            {
              title: "Expert Review Option",
              description: "Connect with professional resume writers and career coaches",
              features: ["Human expertise", "Personalized feedback", "1-on-1 consultation"],
            },
          ].map((feature, index) => (
            <Card key={index} className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{feature.description}</p>
                <div className="space-y-2">
                  {feature.features.map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span className="text-xs">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Upload Component */}
        <ResumeUpload />
      </div>
    </div>
  )
}
