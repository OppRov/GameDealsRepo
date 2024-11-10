import React, { useEffect, useState } from 'react'
import Card from '../Components/Card'
import { useNavigate } from 'react-router-dom';

const SearchPage = () => {
    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState('');
    const [searchData, setSearchData] = useState([]);

    async function getData(searchTerm) {
        try {
            const res = await fetch(`http://localhost:3000/search/${searchTerm}`, {
                mode: 'cors'
            });
            const data = await res.json();
            setSearchData(data);
            setSearchTerm('');
            //console.log(data);

            //navigate('/search');


        } catch (err) {
            console.error(err.message);

        }
    }


    const cardsGenerator = (arr) => {

        return arr.map((game, i) => {
            return <Card key={i} title={game.external} price={game.cheapest} thumbnail={game.thumb} gameID={game.gameID} />
        })
    }


    return (
        <div className={`bg-gray-800 ${searchData.length > 0 ? 'h-[100%]' : 'h-[100vh]'} `}>
            <h1 className="text-4xl text-center font-bold text-white">SEARCH FOR DEALS</h1>
            <div className="w-[80vw] border-2 h-[100vh]] mx-auto flex justify-center flex-wrap">
                <div className='border-2 border-red-500 text-center h-7 w-[100vw]'>
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        getData(searchTerm)
                    }} action="">
                        <input onChange={(e) => {
                            e.preventDefault()
                            setSearchTerm(e.target.value)
                        }} type="text" />
                        <button className="bg-orange-400 hover:bg-orange-300 rounded mx-2 px-2">Search</button>
                    </form>
                </div>
                <div className='border-2 w-[80%] flex flex-wrap justify-center gap-5 border-green-500 h-[95%]'>
                    {cardsGenerator(searchData)}
                </div>
            </div>
        </div>
    )
}

export default SearchPage