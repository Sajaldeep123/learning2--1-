-- Create mentors table
CREATE TABLE IF NOT EXISTS mentors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  expertise TEXT[] DEFAULT '{}',
  rating DECIMAL(3,2) DEFAULT 0.00,
  total_reviews INTEGER DEFAULT 0,
  total_sessions INTEGER DEFAULT 0,
  response_time VARCHAR(50) DEFAULT 'Within 24 hours',
  languages TEXT[] DEFAULT '{"English"}',
  hourly_rate DECIMAL(10,2),
  availability_status VARCHAR(20) DEFAULT 'available',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create mentor_feedback table
CREATE TABLE IF NOT EXISTS mentor_feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  mentor_id UUID REFERENCES mentors(id) ON DELETE CASCADE,
  student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id UUID,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  feedback_text TEXT,
  feedback_type VARCHAR(20) DEFAULT 'general' CHECK (feedback_type IN ('session', 'general', 'assignment')),
  categories JSONB DEFAULT '{"communication": 0, "expertise": 0, "helpfulness": 0, "professionalism": 0}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create mentor_stats table for aggregated statistics
CREATE TABLE IF NOT EXISTS mentor_stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  mentor_id UUID REFERENCES mentors(id) ON DELETE CASCADE UNIQUE,
  total_students INTEGER DEFAULT 0,
  total_sessions INTEGER DEFAULT 0,
  average_rating DECIMAL(3,2) DEFAULT 0.00,
  total_feedback INTEGER DEFAULT 0,
  response_rate DECIMAL(5,2) DEFAULT 0.00,
  completion_rate DECIMAL(5,2) DEFAULT 0.00,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create mentor_sessions table
CREATE TABLE IF NOT EXISTS mentor_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  mentor_id UUID REFERENCES mentors(id) ON DELETE CASCADE,
  student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  session_type VARCHAR(50) DEFAULT 'general',
  scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
  duration INTEGER DEFAULT 60, -- in minutes
  status VARCHAR(20) DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled', 'no_show')),
  topic TEXT,
  meeting_link TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_mentor_feedback_mentor_id ON mentor_feedback(mentor_id);
CREATE INDEX IF NOT EXISTS idx_mentor_feedback_student_id ON mentor_feedback(student_id);
CREATE INDEX IF NOT EXISTS idx_mentor_feedback_created_at ON mentor_feedback(created_at);
CREATE INDEX IF NOT EXISTS idx_mentor_sessions_mentor_id ON mentor_sessions(mentor_id);
CREATE INDEX IF NOT EXISTS idx_mentor_sessions_student_id ON mentor_sessions(student_id);
CREATE INDEX IF NOT EXISTS idx_mentor_sessions_scheduled_at ON mentor_sessions(scheduled_at);
CREATE INDEX IF NOT EXISTS idx_mentors_rating ON mentors(rating);
CREATE INDEX IF NOT EXISTS idx_mentors_availability ON mentors(availability_status);

-- Enable Row Level Security
ALTER TABLE mentors ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentor_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentor_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentor_sessions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Mentors table policies
CREATE POLICY "Mentors are viewable by everyone" ON mentors FOR SELECT USING (is_active = true);
CREATE POLICY "Users can update their own mentor profile" ON mentors FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own mentor profile" ON mentors FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Mentor feedback policies
CREATE POLICY "Users can view feedback for mentors" ON mentor_feedback FOR SELECT USING (true);
CREATE POLICY "Students can insert feedback" ON mentor_feedback FOR INSERT WITH CHECK (auth.uid() = student_id);
CREATE POLICY "Students can update their own feedback" ON mentor_feedback FOR UPDATE USING (auth.uid() = student_id);

-- Mentor stats policies
CREATE POLICY "Mentor stats are viewable by everyone" ON mentor_stats FOR SELECT USING (true);
CREATE POLICY "Only mentors can view their detailed stats" ON mentor_stats FOR SELECT USING (
  EXISTS (SELECT 1 FROM mentors WHERE mentors.id = mentor_stats.mentor_id AND mentors.user_id = auth.uid())
);

-- Mentor sessions policies
CREATE POLICY "Users can view their own sessions" ON mentor_sessions FOR SELECT USING (
  auth.uid() = student_id OR 
  EXISTS (SELECT 1 FROM mentors WHERE mentors.id = mentor_sessions.mentor_id AND mentors.user_id = auth.uid())
);
CREATE POLICY "Students can book sessions" ON mentor_sessions FOR INSERT WITH CHECK (auth.uid() = student_id);
CREATE POLICY "Users can update their own sessions" ON mentor_sessions FOR UPDATE USING (
  auth.uid() = student_id OR 
  EXISTS (SELECT 1 FROM mentors WHERE mentors.id = mentor_sessions.mentor_id AND mentors.user_id = auth.uid())
);
