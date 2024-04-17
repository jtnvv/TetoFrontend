import { useState, useEffect } from "react";
import CartItem from "./cart-item.jsx";

export default function ShoppingCart() {
    const [cartContent, setCartContent] = useState(JSON.parse(localStorage.getItem("cart_content")));  
    const handleDeleteItem = (index) => {
        const newCart = [...cartContent];
        newCart.splice(index, 1);
        localStorage.setItem("cart_content", newCart);
        setCartContent(newCart);
    };
    return(
        <div className="absolute right-5 mt-2 bg-brand-1 text-brand-6 p-3 rounded">
           {cartContent ? cartContent.map((item, index) => {
            return <CartItem key={index} item={item} onDelete={() => handleDeleteItem(index)} />
           }) : "Carrito vacio"}
        </div>
    );
}