const express = require('express');
const router = express.Router();

// @route   POST api/ai/chatbot
// @desc    Get a response from the AI chatbot
// @access  Public
router.post('/chatbot', (req, res) => {
    const { message } = req.body;
    if (!message) {
        return res.status(400).json({ msg: 'Please provide a message' });
    }
    // Simulated AI response
    res.json({ 
        response: `You said: "${message}". As an AI assistant, I'm here to help with your career questions!`
    });
});

// @route   GET api/ai/skill-gap
// @desc    Analyze skill gap for a user profile
// @access  Public
router.get('/skill-gap/:userId', (req, res) => {
    const { userId } = req.params;
    // Simulated analysis
    res.json({
        userId,
        needed_skills: [
            'React',
            'Node.js',
            'Cloud Deployment'
        ],
        message: 'Based on your profile, these skills would be beneficial for your career goals.'
    });
});

module.exports = router;
