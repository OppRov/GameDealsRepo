const express = require('express')
const Router = express.Router()

const Controller = require('../Controllers/GameController')

Router.get('/search/:title', Controller.search_for_game)
Router.get('/CurrentDeals/:id', Controller.displayAllDeals)


module.exports = Router