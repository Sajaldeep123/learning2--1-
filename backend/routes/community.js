const express = require('express');
const router = express.Router();
const { getDb } = require('../database');

// Mock posts database (same as above - in real app this would be shared)
const posts = [
  {
    id: 1,
    userId: 1,
    username: "Rahul Sharma",
    role: "Data Science Student",
    content:
      "Just completed my first machine learning project! Here's my analysis of customer behavior patterns using Python and scikit-learn. The insights were fascinating!",
    likes: 24,
    comments: 5,
    shares: 12,
    createdAt: new Date("2024-01-15").toISOString(),
    tags: ["MachineLearning", "Python", "DataScience"],
  },
  {
    id: 2,
    userId: 2,
    username: "Priya Patel",
    role: "UX Designer",
    content:
      "Sharing my design process for a mobile banking app. Here's how I approached user research and created intuitive interfaces that increased user engagement by 40%.",
    likes: 31,
    comments: 8,
    shares: 15,
    createdAt: new Date("2024-01-14").toISOString(),
    tags: ["UXDesign", "MobileApp", "UserResearch"],
  },
  {
    id: 3,
    userId: 1,
    username: "Arjun Kumar",
    role: "Full Stack Developer",
    content:
      "Built my first React Native app! It's a productivity tracker with offline sync. The journey from web to mobile development has been incredible. Here are my key learnings...",
    likes: 18,
    comments: 12,
    shares: 8,
    createdAt: new Date("2024-01-13").toISOString(),
    tags: ["ReactNative", "MobileDev", "Productivity"],
  },
];

// @route   GET api/community/posts
// @desc    Get all community posts
router.get('/posts', async (req, res) => {
    try {
        const db = getDb();
        const posts = await db.all(
            `SELECT p.id, p.title, p.content, p.likes, p.createdAt, u.username as authorName 
             FROM posts p
             JOIN users u ON p.authorId = u.id
             ORDER BY p.createdAt DESC`
        );
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   POST api/community/posts
// @desc    Create a new post
router.post('/posts', async (req, res) => {
    // Note: In a real app, authorId should come from an authenticated user session (e.g., JWT token)
    const { authorId, title, content } = req.body; 
    if(!authorId || !title || !content) {
        return res.status(400).json({ msg: 'Please include authorId, title, and content' });
    }

    try {
        const db = getDb();
        const result = await db.run(
            'INSERT INTO posts (authorId, title, content) VALUES (?, ?, ?)',
            [authorId, title, content]
        );
        const newPost = await db.get('SELECT * FROM posts WHERE id = ?', [result.lastID]);
        res.status(201).json(newPost);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.post('/posts/:id/like', (req, res) => {
  try {
    const postId = Number.parseInt(req.params.id);
    const { userId } = req.body;

    const post = posts.find((p) => p.id === postId);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    // In a real app, you'd check if user already liked and toggle
    post.likes += 1;

    return res.json({
      likes: post.likes,
      msg: "Post liked successfully",
    });
  } catch (error) {
    console.error("Like post API error:", error);
    return res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
