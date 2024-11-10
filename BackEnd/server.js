const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors())
const port = 3000

const GameRouter = require('./api/Routers/GameRouter')
const UserRouter = require('./api/Routers/UserRouter')
app.use('/deals', GameRouter)
app.use('/login', UserRouter)




app.listen(port, () => console.log(`App listening on port ${port}!`))