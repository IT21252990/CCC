const express = require('express');
const router = express.Router();
const User = require('../models/User'); 
const bcrypt = require('bcrypt');

router.post('/signup', async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ email, username, password: hashedPassword });
        await user.save();
        res.status(200).send('User created successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ email });

        if (user) {
            // Compare the provided password with the hashed password in the database
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (isPasswordValid) {
                res.json({
                    _id: user._id,
                    email: user.email,
                    username: user.username
                  });
            } else {
                res.status(401).send('Invalid password');
                console.log('hello')
            }
        } else {
            res.status(401).send('Invalid credentials');
        }
        console.log('hiii')
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;
