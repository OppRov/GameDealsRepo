const express = require('express')
const app = express()

const Controller = require('../Controllers/GameController')

app.get('/search/:title', Controller.search_for_game)