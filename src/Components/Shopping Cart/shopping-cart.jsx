import { useState, useEffect, useRef } from "react";
import CartItem from "./cart-item.jsx";

export default function ShoppingCart({showShoppingCart}) {
    const [cartContent, setCartContent] = useState(JSON.parse(localStorage.getItem("cart_content")));  
    const cartRef = useRef(null);
    
    const handleDeleteItem = (index) => {
        const newCart = [...cartContent];
        newCart.splice(index, 1);
        localStorage.setItem("cart_content", newCart);
        setCartContent(newCart);
    };

    const handleOutsideClick = (event) => {
        if(cartRef.current && !cartRef.current.contains(event.target)){
            showShoppingCart(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    } ,[]);

    return(
        <div className="absolute right-5 mt-2 bg-brand-1 text-brand-6 rounded space-y-1 border border-brand-5" id="shopping_cart" ref={cartRef}>
           {cartContent ? cartContent.map((item, index) => {
            return <CartItem key={index} name={item.name} price={item.price} photo={item.photo} onDelete={() => handleDeleteItem(index)} />
           }) : "Carrito vacio"}
        </div>
    );
}