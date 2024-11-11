const express = require('express')
const Router = express.Router()
const Controller = require('../Controllers/UserController')

Router.post('/login', Controller.login)

Router.post('/register', Controller.register)


module.exports = Router