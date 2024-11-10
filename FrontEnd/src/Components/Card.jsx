import React, { useCallback, useMemo, useState } from 'react'
import StoreDeal from './StoreDeal'

const Card = ({ title, price, thumbnail, gameID }) => {

    const [minus, setMinus] = useState(false)
    const [expanded, setExpanded] = useState(false)
    const [storeDeals, setStoreDeals] = useState([])
    const [cache, setCache] = useState({})
    const [cheapest, setCheapest] = useState(0)
    const [cheapestDate, setCheapestDate] = useState(0)
    const [isLoading, setIsLoading] = useState(false)

    const memoizeData = (d, index) => {
        setCache((prev) => ({ ...prev, [index]: d }))
    }

    const createCheapestData = ({ price, date }) => {
        setCheapest(price)
        //Parse the date from seconds to a formatted date
        const newDate = new Date(date * 1000)
        const formattedDate = newDate.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        })
        setCheapestDate(formattedDate)

    }

    const CURRENT_DEALS_URL = 'http://localhost:3000/CurrentDeals/'

    const getSelectedDeals = async (ID) => {
        //Check if the Card is expanded


        if (!expanded) {
            //Check if data is already memoized
            if (cache[ID] === undefined) {
                try {
                    console.log("fetching deals...");
                    setIsLoading(true)
                    const res = await fetch(`${CURRENT_DEALS_URL}${ID}`)
                    const data = await res.json()
                    setStoreDeals(data)
                    createCheapestData(data[0])
                    setIsLoading(false)

                    //Memoize the data to prevent extra API calls
                    const index = parseInt(ID)
                    memoizeData(data, index)

                } catch (err) {
                    console.error(err.message)
                }
            }
            else {
                setStoreDeals(cache[ID])
            }
        }
    }

    const memoizedDeals = useMemo(() => {
        if (expanded) {
            return getSelectedDeals(gameID)
        }
        return []
    }, [expanded, gameID, getSelectedDeals])

    const storeDealsGenerator = (arr) => {
        return arr.map((store, i) => {
            return (store.store &&
                <StoreDeal key={i} price={store.price} storeName={store.store.storeName} icon={store.store.images.logo} dealID={store.dealID} />)
        })
    }

    return (
        <div onClick={() => {
            setMinus(!minus)

            getSelectedDeals(gameID).then(() => setExpanded(!expanded))
        }} className={`parent-div ${expanded ? 'expanded' : ''} text-center bg-white  border-2 border-gray-400 rounded-md`}>
            <div className='bg-gradient-to-b from-gray-400 to-gray-200 rounded  '>
                <img className="mx-auto h-16" src={thumbnail} alt="" />
            </div>
            <div className={` flex flex-col relative border-t-2 border-gray-400`}>
                <div className='sign' >
                    <div className={`vert ${minus ? 'minus' : 'plus'}`}></div>
                    <div className="horiz"></div>
                </div>
                <h1 className="text-sm">{title}</h1>
                <h1 className="text-green-600">(${price} and up) <span className="text-black">{isLoading && "Loading..."}</span> </h1>
                {storeDealsGenerator(storeDeals)}
                <div>
                    <h1><span>Cheapest Ever:  </span>${cheapest} on {cheapestDate}</h1>
                </div>
            </div>
        </div>
    )
}

export default Card