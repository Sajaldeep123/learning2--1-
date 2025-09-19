-- Insert sample mentors
INSERT INTO mentors (user_id, name, avatar_url, bio, expertise, rating, total_reviews, total_sessions, response_time, languages, hourly_rate, availability_status) VALUES
(gen_random_uuid(), 'Dr. Sarah Chen', '/placeholder.svg?height=100&width=100', 'Senior Software Engineer at Google with 10+ years experience in full-stack development and system design.', ARRAY['JavaScript', 'React', 'Node.js', 'System Design', 'Career Guidance'], 4.9, 127, 245, 'Within 2 hours', ARRAY['English', 'Mandarin'], 85.00, 'available'),
(gen_random_uuid(), 'Rajesh Kumar', '/placeholder.svg?height=100&width=100', 'Data Science Lead with expertise in ML, AI, and analytics. Helped 200+ students transition into tech careers.', ARRAY['Python', 'Machine Learning', 'Data Science', 'SQL', 'Statistics'], 4.8, 89, 178, 'Within 4 hours', ARRAY['English', 'Hindi', 'Tamil'], 75.00, 'available'),
(gen_random_uuid(), 'Emily Rodriguez', '/placeholder.svg?height=100&width=100', 'UX Design Director with experience at top tech companies. Passionate about mentoring aspiring designers.', ARRAY['UX Design', 'Product Design', 'Figma', 'User Research', 'Design Systems'], 4.7, 156, 298, 'Within 6 hours', ARRAY['English', 'Spanish'], 90.00, 'busy'),
(gen_random_uuid(), 'Michael Thompson', '/placeholder.svg?height=100&width=100', 'DevOps Engineer and Cloud Architect. Specializes in AWS, Docker, and CI/CD pipelines.', ARRAY['AWS', 'Docker', 'Kubernetes', 'DevOps', 'Cloud Architecture'], 4.6, 73, 142, 'Within 12 hours', ARRAY['English'], 80.00, 'available'),
(gen_random_uuid(), 'Priya Sharma', '/placeholder.svg?height=100&width=100', 'Product Manager at a unicorn startup. Expert in product strategy, roadmapping, and stakeholder management.', ARRAY['Product Management', 'Strategy', 'Analytics', 'Leadership', 'Agile'], 4.8, 94, 187, 'Within 3 hours', ARRAY['English', 'Hindi'], 95.00, 'available');

-- Update mentor stats for the inserted mentors
INSERT INTO mentor_stats (mentor_id, total_students, total_sessions, average_rating, total_feedback, response_rate, completion_rate)
SELECT 
  id as mentor_id,
  FLOOR(RANDOM() * 50 + 20) as total_students,
  total_sessions,
  rating as average_rating,
  total_reviews as total_feedback,
  ROUND((RANDOM() * 20 + 80)::numeric, 2) as response_rate,
  ROUND((RANDOM() * 15 + 85)::numeric, 2) as completion_rate
FROM mentors;

-- Insert sample feedback (this would normally be done by students)
INSERT INTO mentor_feedback (mentor_id, student_id, rating, feedback_text, feedback_type, categories)
SELECT 
  m.id as mentor_id,
  gen_random_uuid() as student_id,
  FLOOR(RANDOM() * 2 + 4) as rating, -- Random rating between 4-5
  CASE 
    WHEN RANDOM() < 0.33 THEN 'Excellent mentor! Very knowledgeable and patient. Helped me understand complex concepts easily.'
    WHEN RANDOM() < 0.66 THEN 'Great session! The mentor provided practical insights and actionable advice for my career growth.'
    ELSE 'Highly recommend! Professional, punctual, and genuinely cares about student success.'
  END as feedback_text,
  CASE 
    WHEN RANDOM() < 0.5 THEN 'session'
    WHEN RANDOM() < 0.8 THEN 'general'
    ELSE 'assignment'
  END as feedback_type,
  jsonb_build_object(
    'communication', FLOOR(RANDOM() * 2 + 4),
    'expertise', FLOOR(RANDOM() * 2 + 4),
    'helpfulness', FLOOR(RANDOM() * 2 + 4),
    'professionalism', FLOOR(RANDOM() * 2 + 4)
  ) as categories
FROM mentors m
CROSS JOIN generate_series(1, 3); -- 3 feedback entries per mentor
