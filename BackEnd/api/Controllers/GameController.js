const express = require('express')
const app = express()
app.use(express.json())

exports.search_for_game = async (req, res) => {
    try {
        const title = req.params.title
        // console.log(title);

        const response = await fetch(`https://www.cheapshark.com/api/1.0/games?title=${title}`)
        const data = await response.json()
        //console.log(data[0]);
        res.json(data)
    } catch (error) {
        res.status(500).json(error)
    }
}