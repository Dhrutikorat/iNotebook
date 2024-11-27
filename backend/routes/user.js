const express = require('express');
const { body } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const { updateUser } = require('../controllers/users');
const router = express.Router();

// Route:1 update notes Method:"PUT" "/api/user/update" , Login required
router.put('/update/:id', [
    body('name', 'Enter a valid name').isLength({ min: 3 }).optional(),
    body('email', 'Enter a valid email').isEmail().optional(),
    body('password', 'Password must be atleast 6 characters').isLength({ min: 6 }).optional(),
], fetchuser, updateUser)

module.exports = router