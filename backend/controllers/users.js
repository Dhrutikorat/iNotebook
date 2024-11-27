const { validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require('bcryptjs');

const updateUser = async (req, res) => {

    const errors = validationResult(req);
    //if data is not valid, then throw errors..
    if (!errors.isEmpty()) {
        return res.json({ status: 400, response: errors.array() });
    }

    try {
        const { name, email, password } = req.body

        // check whether user already exists in database..
        let user = await User.find({ email: email, _id: { $ne: req.params.id } }).exec();
        console.log(user);

        if (user.length !== 0) {
            return res.json({ status: 400, response: "Sorry a User alreday exists with this email" })
        }

        // Create new note object
        const newUser = {}

        if (name) { newUser.name = name }
        if (email) { newUser.email = email }
        if (password) {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);
            newUser.password = hashPassword
        }

        // Note exists or not....
        userId = req.params.id;

        let userById = await User.findById(userId)
        if (!userById) {
            return res.json({ response: "User not found", status: 404 })
        }

        // Update note...
        user = await User.findByIdAndUpdate(userId, { $set: newUser }, { new: true });

        res.json({ status: 200, response: "User updated", data: user });
    } catch (error) {
        console.log(error)
        res.json({ status: 500, response: "Something went wrong" })
    }

}

module.exports = { updateUser }