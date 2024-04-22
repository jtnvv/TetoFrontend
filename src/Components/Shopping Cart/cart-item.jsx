// import { useState, useEffect } from "react";

export default function CartItem({photo, name, price, onDelete}) {
    return(
        <div className="flex space-x-4 hover:bg-brand-2 p-3">
            <img className="w-24" src={photo} alt="product" />
            <div>
                <h1 className="text-lg">{name}</h1>
                <h2>{price}</h2>
            </div>
        </div>
    );
}