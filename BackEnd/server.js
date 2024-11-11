const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
app.use(express.json())
app.use(cors())
const port = 3000
//Connect to local MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/dealsDB')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err))

const GameRouter = require('./api/Routers/GameRouter')
const UserRouter = require('./api/Routers/UserRouter')
app.use('/deals', GameRouter)
app.use('/users', UserRouter)




app.listen(port, () => console.log(`App listening on port ${port}`))