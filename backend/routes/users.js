const express = require('express');
const router = express.Router();
const { getDb } = require('../database');
const bcrypt = require('bcrypt'); // You will need to run: npm install bcrypt

const saltRounds = 10;

// @route   POST api/users/register
// @desc    Register a new user
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    try {
        const db = getDb();
        const existingUser = await db.get('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser) {
            return res.status(400).json({ msg: 'User with this email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const result = await db.run(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, hashedPassword]
        );

        res.status(201).json({ 
            msg: 'User registered successfully', 
            userId: result.lastID 
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   POST api/users/login
// @desc    Authenticate user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    try {
        const db = getDb();
        const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // In a real app, you would return a JWT token here
        res.json({ 
            msg: 'Login successful',
            user: { id: user.id, username: user.username, email: user.email }
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
