const express = require('express');
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();
const JWT_SIGN = process.env.JWT_SIGN;

// Route 1 Create new User Method:"POST" URL:"/api/auth/createUser"
router.post('/createUser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 6 characters').isLength({ min: 6 }),
], async (req, res) => {

    const errors = validationResult(req);
    //if data is not valid, then throw errors..
    if (!errors.isEmpty()) {
        return res.json({ status: 400, response: errors.array() });
    }
    try {
        // check whether user already exists in database..
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.json({ status: 400, response: "Sorry a User alreday exists with this email" })
        }
        const { name, email } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            name: name,
            email: email,
            password: hashPassword
        })

        const userId = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(userId, JWT_SIGN);
        const responseData = {
            user: user,
            authToken: authToken
        }
        res.json({ status: 200, response: "User registered successfully", data: responseData })
    } catch (error) {
        console.log(error.message)
        res.json({ status: 500, response: "Something went wrong" })
    }
});

// Route 2 User login  Method:"POST" URL:"/api/auth/login"
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password is requried').exists(),
], async (req, res) => {
    const errors = validationResult(req);
    //return errors
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.json({ status: 400, response: "Invalid email/password" })
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.json({ status: 400, response: "Invalid email/password" })
        }

        const userId = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(userId, JWT_SIGN)
        const responseData = {
            user: user,
            authToken: authToken
        }
        res.json({ status: 200, response: "Login successfully", data: responseData })

    } catch (error) {
        console.log(error.message)
        res.json({ status: 500, response: "Something went wrong" })
    }
});

// Route 3 Get logged in user details Method: POST "/api/auth/getUSer"
router.get('/getUser', fetchuser, async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.json({ status: 200, response: "User details found", data: user })
    } catch (error) {
        res.json({ status: 500, response: "Something went wrong" })
    }
});

module.exports = router