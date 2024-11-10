const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors())
const port = 3000

const GameRouter = require('./api/Routers/GameRouter')

//app.use('/', GameRouter)

// app.get('/search/:title', async (req, res) => {
//     try {
//         const title = req.params.title
//         // console.log(title);
//         const response = await fetch(`https://www.cheapshark.com/api/1.0/games?title=${title}`)
//         const data = await response.json()
//         //console.log(data[0]);
//         res.json(data)
//     } catch (error) {
//         res.status(500).json(error)
//     }
// })

app.get('/CurrentDeals/:id', async (req, res) => {
    try {
        const id = req.params.id
        const data = await fetch(`https://www.cheapshark.com/api/1.0/games?id=${id}`)
        const dealData = await data.json()
        const deals = dealData.deals
        const storeData = await fetch('https://www.cheapshark.com/api/1.0/stores')
        const stores = await storeData.json()

        const newData = deals.map(deal => {
            const store = stores.find(store => store.storeID === deal.storeID)
            return {
                ...deal,
                store
            }
        })

        newData.unshift(dealData.cheapestPriceEver)
        res.status(200).json(newData)
    } catch (error) {
        res.status(500).json(error)
    }
})


app.listen(port, () => console.log(`App listening on port ${port}!`))