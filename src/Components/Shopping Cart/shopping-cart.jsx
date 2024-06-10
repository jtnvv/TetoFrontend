import { useState, useEffect, useRef } from "react";
import CartItem from "./cart-item.jsx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getPaymentLink } from "../../api/order.js";
import { priceFormatterCOP } from "../../formatter/formaters";

export default function ShoppingCart({showShoppingCart}) {
    const [address, setAddress] = useState(null);
    const [error, setError] = useState("");
    const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
    const [totalPayment, setTotalPayment] = useState(false);
    const [cartContent, setCartContent] = useState(JSON.parse(localStorage.getItem("cart_content")));  
    const cartRef = useRef(null);

    const getItemTotalPrice = (item) => {
        return parseFloat(item.price.replace(/[^0-9.,-]/g, '')) * 1000 * item.quantity;
    }

    const getCartTotal = (cart) => {
        const total = cart.reduce((acumulator, current) => acumulator + getItemTotalPrice(current), 0);
        return priceFormatterCOP.format(total);
    };

    const handlePayment = async (event) => {
        event.preventDefault();

        setIsWaitingForResponse(true);
        await getPaymentLink({
            products: cartContent,
            address: address
        })
        .then(res => {
            emptyCart();
            window.open(res.data.payment_link, '_blank').focus();
            setError("");
        })
        .catch(err => {
            setError(err.response.data.message);
            (err.response.status === 403 || err.response.status === 401) && setError('Debes iniciar sesión para poder finalizar la compra');
        })
        .finally(() => {
            setIsWaitingForResponse(false);
        });
    };
    
    const handleDeleteItem = (index) => {
        const newCart = [...cartContent];
        const item = newCart[index];
        const newTotal = priceFormatterCOP.format((parseFloat(totalPayment.replace(/[^0-9.,-]/g, '')) * 1000) - getItemTotalPrice(item));

        setTotalPayment(newTotal);
        newCart.splice(index, 1);

        if (Object.keys(newCart).length === 0) {
            localStorage.removeItem("cart_content");
            toast.info('El carrito esta vacio', {
                position: "top-left"
            });
            showShoppingCart(false);
        } else {
            localStorage.setItem("cart_content", JSON.stringify(newCart));
        }

        setCartContent(newCart);
        setTotalPayment(getCartTotal(newCart));
    };

    const emptyCart = () => {
        localStorage.removeItem("cart_content");
        setCartContent(JSON.parse(localStorage.getItem("cart_content")));
        toast.info('El carrito esta vacio', {
            position: "top-left"
        });
    };

    const updateItemQuantity = (index, quantity) => {
        cartContent[index].quantity = quantity;
        localStorage.setItem("cart_content", JSON.stringify(cartContent));
        setTotalPayment(getCartTotal(cartContent));
    };

    const handleOutsideClick = (event) => {
        if(cartRef.current && !cartRef.current.contains(event.target) && event.target.id != "shopping-cart-icon" && event.target.parentNode.parentNode.id != "shopping-cart-icon"){
            return showShoppingCart(false);
        }
    };

    useEffect(() => { 
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    } ,[]);

    return(
        <>
        <ToastContainer containerId="shopping-cart" limit={3}/>
        <div className="flex flex-col relative responsive:absolute responsive:right-5 responsive:mt-5 bg-brand-1 text-brand-6 responsive:rounded responsive:border border-brand-5 responsive:z-40 responsive:min-w-fit" ref={cartRef}>
            {isWaitingForResponse && (
                <div className="absolute w-full h-full bg-brand-6 z-50 bg-opacity-60 flex justify-center items-center">
                    <div className="border-8 border-b-brand-4 rounded-full w-20 h-20 animate-spin ease-linear"></div>
                </div>
            )}
           {cartContent ? (
               <>
               <div className="flex justify-between mx-5 mt-5 mb-4 items-center">
                    <div>
                        <h2>
                            <b>Cantidad de articulos:</b> 
                            <br /> ({Object.keys(cartContent).length})
                        </h2>
                        <h2>
                            <b>Total a pagar:</b> 
                            <br /> {totalPayment} COP
                        </h2>
                    </div>
                    <button onClick={emptyCart} className="bg-brand-2 text-brand-1 responsive:w-60 h-14 w-40">Vaciar carrito</button>
               </div>
               <div className="responsive:max-h-[40vh] overflow-auto">
                    {cartContent.map((item, index) => {
                        let temporaryStock = item.stock + item.quantity;
                        cartContent.filter(product => product.id === item.id).forEach(product => {
                            temporaryStock = temporaryStock - product.quantity;
                        });
                        return <CartItem key={index} id={item.id} index={index} name={item.name} price={item.price} photo={item.photo} color={item.color} itemStock={temporaryStock} size={item.size} itemQuantity={item.quantity} onDelete={() => handleDeleteItem(index)} updateItemQuantity={updateItemQuantity} />
                    })}
               </div>
                <form className="flex flex-col p-5 space-y-5" onSubmit={(event) => handlePayment(event)}>
                    <label htmlFor="address">Ingresa tu dirección y ciudad de envio:</label>
                    <input id="address" onChange={(event) =>  setAddress(event.target.value)} type="text" placeholder="Calle 12 # 5 - 48, Bogotá" className="text-brand-6 bg-brand-1 border border-brand-6 p-4" required/>
                    <button className="bg-brand-6 text-brand-1">Pagar</button>
                </form>
                {error && (
                    <div className="text-center p-5 bg-red-400 min-w-full break-words">
                        <p>Error: <em>{error}</em></p>
                    </div>
                )}
               </>
           ):
           <div className="flex flex-col">
               <p className="p-5 w-[389px] text-center">Carrito vacio</p>
               <a href="/" className="responsive:hidden text-center border border-brand-5 mx-4 rounded-md py-3 text-brand-1 bg-brand-6">Explora nuevos productos!</a>
           </div>
            }
        </div>
        </>
    );
}