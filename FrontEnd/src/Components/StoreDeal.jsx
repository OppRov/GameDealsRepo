import React from 'react'

const StoreDeal = ({ price, storeName, icon, dealID }) => {

    const iconURL = new URL(icon, 'https://www.cheapshark.com')
    return (
        <div className="flex gap-1 my-1 relative">
            <img src={iconURL.href} width="25" height="10" alt="" />
            <a href={`https://www.cheapshark.com/redirect?dealID=${dealID}`}>{storeName}</a>
            <div className="absolute right-1 text-sm  bg-gray-500 text-white rounded-sm">${price}</div>
        </div>
    )
}

export default StoreDeal