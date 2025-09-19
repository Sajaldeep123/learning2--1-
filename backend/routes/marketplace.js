const express = require('express');
const router = express.Router();

// In-memory "database" for marketplace items
let courses = [
    { id: 1, title: 'Introduction to Web Development', author: 'Jane Doe', price: 49.99 },
    { id: 2, title: 'Advanced Node.js', author: 'John Smith', price: 99.99 }
];
let jobs = [
    { id: 1, title: 'Junior Frontend Developer', company: 'Tech Corp', location: 'Remote' },
    { id: 2, title: 'Full Stack Engineer', company: 'Innovate LLC', location: 'New York, NY' }
];

// @route   GET api/marketplace/courses
// @desc    Get all courses
// @access  Public
router.get('/courses', (req, res) => {
    res.json(courses);
});

// @route   GET api/marketplace/jobs
// @desc    Get all jobs
// @access  Public
router.get('/jobs', (req, res) => {
    res.json(jobs);
});

module.exports = router;
