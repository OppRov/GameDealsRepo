const bcrypt = require('bcrypt')
const mongoose = require('mongoose')


exports.signup = async (req, res) => {
    try {
        const username = req.body.username
        const email = req.body.email
        const password = req.body.password


    } catch {
        res.status(500).send()
    }
}

exports.login = async (req, res) => {
    try {
        const username = req.body.username
        const password = req.body.password
       
        
    } catch (error) {
        res.status(500).json(error)
    }
}