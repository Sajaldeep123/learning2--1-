-- Create interview_sessions table
CREATE TABLE IF NOT EXISTS interview_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  mentor_id UUID REFERENCES mentors(id) ON DELETE SET NULL,
  session_type VARCHAR(50) DEFAULT 'mock_interview',
  interview_type VARCHAR(50) DEFAULT 'technical' CHECK (interview_type IN ('technical', 'behavioral', 'system_design')),
  status VARCHAR(20) DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'in_progress', 'completed', 'cancelled')),
  scheduled_at TIMESTAMP WITH TIME ZONE,
  started_at TIMESTAMP WITH TIME ZONE,
  ended_at TIMESTAMP WITH TIME ZONE,
  duration INTEGER, -- in minutes
  meeting_link TEXT,
  recording_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create interview_questions table
CREATE TABLE IF NOT EXISTS interview_questions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question_text TEXT NOT NULL,
  question_type VARCHAR(50) NOT NULL CHECK (question_type IN ('technical', 'behavioral', 'system_design')),
  difficulty VARCHAR(20) DEFAULT 'medium' CHECK (difficulty IN ('easy', 'medium', 'hard')),
  category VARCHAR(100),
  time_limit INTEGER, -- in seconds
  sample_answer TEXT,
  evaluation_criteria JSONB,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create interview_responses table
CREATE TABLE IF NOT EXISTS interview_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID REFERENCES interview_sessions(id) ON DELETE CASCADE,
  question_id UUID REFERENCES interview_questions(id) ON DELETE CASCADE,
  response_text TEXT,
  response_audio_url TEXT,
  time_spent INTEGER, -- in seconds
  confidence_score INTEGER CHECK (confidence_score >= 1 AND confidence_score <= 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create interview_feedback table
CREATE TABLE IF NOT EXISTS interview_feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID REFERENCES interview_sessions(id) ON DELETE CASCADE,
  mentor_id UUID REFERENCES mentors(id) ON DELETE SET NULL,
  overall_rating INTEGER CHECK (overall_rating >= 1 AND overall_rating <= 5),
  technical_score INTEGER CHECK (technical_score >= 1 AND technical_score <= 10),
  communication_score INTEGER CHECK (communication_score >= 1 AND communication_score <= 10),
  problem_solving_score INTEGER CHECK (problem_solving_score >= 1 AND problem_solving_score <= 10),
  strengths TEXT,
  areas_for_improvement TEXT,
  detailed_feedback TEXT,
  recommendations TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_interview_sessions_student_id ON interview_sessions(student_id);
CREATE INDEX IF NOT EXISTS idx_interview_sessions_mentor_id ON interview_sessions(mentor_id);
CREATE INDEX IF NOT EXISTS idx_interview_sessions_scheduled_at ON interview_sessions(scheduled_at);
CREATE INDEX IF NOT EXISTS idx_interview_questions_type ON interview_questions(question_type);
CREATE INDEX IF NOT EXISTS idx_interview_questions_difficulty ON interview_questions(difficulty);
CREATE INDEX IF NOT EXISTS idx_interview_responses_session_id ON interview_responses(session_id);
CREATE INDEX IF NOT EXISTS idx_interview_feedback_session_id ON interview_feedback(session_id);

-- Enable Row Level Security
ALTER TABLE interview_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE interview_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE interview_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE interview_feedback ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Interview sessions policies
CREATE POLICY "Users can view their own interview sessions" ON interview_sessions FOR SELECT USING (
  auth.uid() = student_id OR 
  EXISTS (SELECT 1 FROM mentors WHERE mentors.id = interview_sessions.mentor_id AND mentors.user_id = auth.uid())
);
CREATE POLICY "Students can create interview sessions" ON interview_sessions FOR INSERT WITH CHECK (auth.uid() = student_id);
CREATE POLICY "Users can update their own sessions" ON interview_sessions FOR UPDATE USING (
  auth.uid() = student_id OR 
  EXISTS (SELECT 1 FROM mentors WHERE mentors.id = interview_sessions.mentor_id AND mentors.user_id = auth.uid())
);

-- Interview questions policies (public read for active questions)
CREATE POLICY "Active questions are viewable by authenticated users" ON interview_questions FOR SELECT USING (is_active = true AND auth.uid() IS NOT NULL);

-- Interview responses policies
CREATE POLICY "Users can view responses for their sessions" ON interview_responses FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM interview_sessions 
    WHERE interview_sessions.id = interview_responses.session_id 
    AND (interview_sessions.student_id = auth.uid() OR 
         EXISTS (SELECT 1 FROM mentors WHERE mentors.id = interview_sessions.mentor_id AND mentors.user_id = auth.uid()))
  )
);
CREATE POLICY "Students can insert their own responses" ON interview_responses FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM interview_sessions 
    WHERE interview_sessions.id = interview_responses.session_id 
    AND interview_sessions.student_id = auth.uid()
  )
);

-- Interview feedback policies
CREATE POLICY "Users can view feedback for their sessions" ON interview_feedback FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM interview_sessions 
    WHERE interview_sessions.id = interview_feedback.session_id 
    AND (interview_sessions.student_id = auth.uid() OR 
         EXISTS (SELECT 1 FROM mentors WHERE mentors.id = interview_sessions.mentor_id AND mentors.user_id = auth.uid()))
  )
);
CREATE POLICY "Mentors can insert feedback for their sessions" ON interview_feedback FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM interview_sessions 
    WHERE interview_sessions.id = interview_feedback.session_id 
    AND EXISTS (SELECT 1 FROM mentors WHERE mentors.id = interview_sessions.mentor_id AND mentors.user_id = auth.uid())
  )
);
