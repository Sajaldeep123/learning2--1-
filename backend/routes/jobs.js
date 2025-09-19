const express = require('express');
const router = express.Router();

// Mock applications database
const applications = [];

// Mock jobs database
const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechCorp India",
    location: "Bangalore, India",
    type: "Full-time",
    experience: "Entry Level",
    salary: "₹4-8 LPA",
    description:
      "Join our dynamic team as a Frontend Developer. Work with React, TypeScript, and modern web technologies to build amazing user experiences.",
    requirements: ["React.js", "JavaScript", "HTML/CSS", "Git", "Problem-solving"],
    benefits: ["Health Insurance", "Flexible Hours", "Learning Budget", "Remote Work"],
    postedDate: "2024-01-15",
    applicationDeadline: "2024-02-15",
    isRemote: true,
    category: "Technology",
  },
  {
    id: 2,
    title: "Data Analyst",
    company: "DataInsights Ltd",
    location: "Mumbai, India",
    type: "Full-time",
    experience: "Mid Level",
    salary: "₹6-12 LPA",
    description:
      "Analyze complex datasets to drive business decisions. Work with SQL, Python, and visualization tools to uncover insights.",
    requirements: ["Python", "SQL", "Excel", "Statistics", "Data Visualization"],
    benefits: ["Health Insurance", "Performance Bonus", "Training Programs", "Career Growth"],
    postedDate: "2024-01-14",
    applicationDeadline: "2024-02-14",
    isRemote: false,
    category: "Data Science",
  },
  {
    id: 3,
    title: "UX Designer",
    company: "DesignStudio Pro",
    location: "Delhi, India",
    type: "Full-time",
    experience: "Entry Level",
    salary: "₹5-9 LPA",
    description:
      "Create intuitive and beautiful user experiences. Work closely with product teams to design user-centered solutions.",
    requirements: ["Figma", "User Research", "Prototyping", "Design Thinking", "Communication"],
    benefits: ["Creative Environment", "Design Tools", "Flexible Schedule", "Team Events"],
    postedDate: "2024-01-13",
    applicationDeadline: "2024-02-13",
    isRemote: true,
    category: "Design",
  },
  {
    id: 4,
    title: "Digital Marketing Specialist",
    company: "GrowthHackers Inc",
    location: "Pune, India",
    type: "Full-time",
    experience: "Entry Level",
    salary: "₹3-6 LPA",
    description:
      "Drive digital marketing campaigns across multiple channels. Focus on SEO, social media, and content marketing strategies.",
    requirements: ["SEO", "Social Media", "Content Writing", "Analytics", "Creativity"],
    benefits: ["Performance Incentives", "Learning Opportunities", "Young Team", "Growth Potential"],
    postedDate: "2024-01-12",
    applicationDeadline: "2024-02-12",
    isRemote: true,
    category: "Marketing",
  },
  {
    id: 5,
    title: "Python Developer Intern",
    company: "StartupTech",
    location: "Hyderabad, India",
    type: "Internship",
    experience: "Fresher",
    salary: "₹15-25k/month",
    description:
      "Learn and grow with our development team. Work on real projects using Python, Django, and modern development practices.",
    requirements: ["Python Basics", "Problem-solving", "Eagerness to Learn", "Team Player"],
    benefits: ["Mentorship", "Real Projects", "Certificate", "Potential Full-time Offer"],
    postedDate: "2024-01-11",
    applicationDeadline: "2024-02-11",
    isRemote: false,
    category: "Technology",
  },
  {
    id: 6,
    title: "Business Analyst",
    company: "ConsultPro Solutions",
    location: "Chennai, India",
    type: "Full-time",
    experience: "Mid Level",
    salary: "₹7-13 LPA",
    description:
      "Bridge the gap between business needs and technical solutions. Analyze processes and recommend improvements.",
    requirements: ["Business Analysis", "SQL", "Process Mapping", "Communication", "Problem-solving"],
    benefits: ["Client Exposure", "Travel Opportunities", "Skill Development", "Career Progression"],
    postedDate: "2024-01-10",
    applicationDeadline: "2024-02-10",
    isRemote: false,
    category: "Business",
  },
];

router.post('/:id/apply', (req, res) => {
  try {
    const jobId = Number.parseInt(req.params.id);
    const { userId, coverLetter, resume } = req.body;

    if (!userId) {
      return res.status(401).json({ msg: "User authentication required" });
    }

    // Check if user already applied
    const existingApplication = applications.find((app) => app.jobId === jobId && app.userId === userId);

    if (existingApplication) {
      return res.status(400).json({ msg: "You have already applied for this job" });
    }

    const newApplication = {
      id: applications.length + 1,
      jobId,
      userId,
      coverLetter: coverLetter || "",
      resume: resume || "",
      status: "submitted",
      appliedDate: new Date().toISOString(),
    };

    applications.push(newApplication);

    return res.json({
      application: newApplication,
      msg: "Application submitted successfully",
    });
  } catch (error) {
    console.error("Job apply API error:", error);
    return res.status(500).json({ msg: "Server error" });
  }
});

router.get('/', (req, res) => {
  try {
    const { category, type, experience, location, search } = req.query;

    let filteredJobs = [...jobs];

    // Apply filters
    if (category && category !== "all") {
      filteredJobs = filteredJobs.filter((job) => job.category.toLowerCase() === category.toLowerCase());
    }

    if (type && type !== "all") {
      filteredJobs = filteredJobs.filter((job) => job.type.toLowerCase() === type.toLowerCase());
    }

    if (experience && experience !== "all") {
      filteredJobs = filteredJobs.filter((job) => job.experience.toLowerCase() === experience.toLowerCase());
    }

    if (location) {
      filteredJobs = filteredJobs.filter((job) => job.location.toLowerCase().includes(location.toLowerCase()));
    }

    if (search) {
      filteredJobs = filteredJobs.filter(
        (job) =>
          job.title.toLowerCase().includes(search.toLowerCase()) ||
          job.company.toLowerCase().includes(search.toLowerCase()) ||
          job.description.toLowerCase().includes(search.toLowerCase()) ||
          job.requirements.some((reqItem) => reqItem.toLowerCase().includes(search.toLowerCase())),
      );
    }

    // Sort by posted date (newest first)
    filteredJobs.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());

    return res.json({
      jobs: filteredJobs,
      total: filteredJobs.length,
    });
  } catch (error) {
    console.error("Get jobs API error:", error);
    return res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
