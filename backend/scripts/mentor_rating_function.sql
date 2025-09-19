-- Create function to update mentor rating
CREATE OR REPLACE FUNCTION update_mentor_rating(mentor_id UUID)
RETURNS void AS $$
BEGIN
  -- Update mentor's rating and review count
  UPDATE mentors 
  SET 
    rating = (
      SELECT COALESCE(AVG(rating), 0)
      FROM mentor_feedback 
      WHERE mentor_feedback.mentor_id = update_mentor_rating.mentor_id
    ),
    total_reviews = (
      SELECT COUNT(*)
      FROM mentor_feedback 
      WHERE mentor_feedback.mentor_id = update_mentor_rating.mentor_id
    ),
    updated_at = NOW()
  WHERE id = update_mentor_rating.mentor_id;

  -- Update mentor stats
  INSERT INTO mentor_stats (mentor_id, average_rating, total_feedback, updated_at)
  VALUES (
    update_mentor_rating.mentor_id,
    (SELECT COALESCE(AVG(rating), 0) FROM mentor_feedback WHERE mentor_feedback.mentor_id = update_mentor_rating.mentor_id),
    (SELECT COUNT(*) FROM mentor_feedback WHERE mentor_feedback.mentor_id = update_mentor_rating.mentor_id),
    NOW()
  )
  ON CONFLICT (mentor_id) 
  DO UPDATE SET
    average_rating = EXCLUDED.average_rating,
    total_feedback = EXCLUDED.total_feedback,
    updated_at = EXCLUDED.updated_at;
END;
$$ LANGUAGE plpgsql;
