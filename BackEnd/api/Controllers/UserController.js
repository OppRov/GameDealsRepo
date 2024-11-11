const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const User = require('../Models/UserModel')




exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (!user) {
            return res.status(404).json('User not found')
        }
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if (!validPassword) {
            return res.status(400).json('Invalid password')
        } else {
            if (user) {
                const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
                const { password, ...others } = user._doc
                res.status(200).json({ ...others, token })
            }
        }
    }
    catch (error) {
        res.status(500).json(error)
    }
}

exports.register = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            createdAt: Date.now()
        })
        const user = await newUser.save()
        console.log(user);

        res.status(201).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
}