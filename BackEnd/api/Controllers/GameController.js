

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

exports.displayAllDeals = async (req, res) =>{
    try {
        const id = req.params.id
        //Get the deals for the specific game
        const data = await fetch(`https://www.cheapshark.com/api/1.0/games?id=${id}`)
        const dealData = await data.json()
        const deals = dealData.deals
        //Get the list of store names and ids
        const storeData = await fetch('https://www.cheapshark.com/api/1.0/stores')
        const stores = await storeData.json()
        //Find the store name by
        //matching the deals id with the store name id
        const newData = deals.map(deal => {
            const store = stores.find(store => store.storeID === deal.storeID)
            return {
                ...deal,
                store
            }
        })
        //Add the cheapest price ever to the beginning of the data
        newData.unshift(dealData.cheapestPriceEver)
        res.status(200).json(newData)
    } catch (error) {
        res.status(500).json(error)
    }
}