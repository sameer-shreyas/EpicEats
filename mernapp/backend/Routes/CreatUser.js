const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const jwtSecret = "Myanmsdsajisacnsjdnckjsdvnsdvmdsjvndsjnkvsdkjvnsdkvjn";

// Route to create a new user
router.post('/createuser', [
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    body('name').isLength({ min: 3 })
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt);
    try {
        await User.create({
            name: req.body.name,
            password: secPassword,
            email: req.body.email,
            location: req.body.location
        });
        res.json({ success: true });
    } catch (error) {
        console.log(error);
        res.json({ success: false });
    }
});

// Route to log in a user
router.post('/loginuser', [
    body('email', "Enter a valid email").isEmail(),
    body('password').isLength({ min: 5 }),
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    let email = req.body.email;
    try {
        let userData = await User.findOne({ email });
        if (!userData) {
            return res.status(400).json({ errors: "Try logging in with correct credentials" });
        }
        const pwdCompare = await bcrypt.compare(req.body.password, userData.password);
        if (!pwdCompare) {
            return res.status(400).json({ errors: "Try logging in with correct credentials" });
        }
        const data = {
            user: {
                id: userData.id
            }
        };
        // Set an expiration time for the JWT
        const authToken = jwt.sign(data, jwtSecret, { expiresIn: '1h' }); // Token expires in 1 hour
        return res.json({ success: true, authToken: authToken });

    } catch (error) {
        console.log(error);
        res.json({ success: false });
    }
});

module.exports = router;
