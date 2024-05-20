import { TiDelete } from "react-icons/ti";
import QuantityInput from "../Shopping Cart/quantity-input";
import { useEffect, useState } from "react";

export default function CartItem({id, index, photo, name, price, color, size, onDelete, itemStock, itemQuantity, updateItemQuantity}) {
    const [quantity, setQuantity] = useState(itemQuantity);

    useEffect(() => {
        updateItemQuantity(index, quantity);
    }, [quantity]);
    
    return(
        <div className="flex responsive:flex-row flex-col responsive:space-x-4 hover:bg-brand-2 p-5 group min-w-max">
            <a href={`/product/${id}`} className="flex space-x-4 cursor-pointer text-brand-6 hover:text-brand-6 basis-full">
                <img className="w-24" src={photo} alt="product" />
                <div>
                    <h1 className="text-lg">{name}</h1>
                    <h2>{price}</h2>
                    <h3 className="text-brand-5">Color: {color}</h3>
                    <h3 className="text-brand-5">Talla: {size}</h3>
                </div>
            </a>
            <div className="responsive:block flex space-x-4 items-center">
                <QuantityInput quantity={quantity} setQuantityFunction={setQuantity} maxValue={itemStock} />
                <button onClick={onDelete} className="bg-transparent border border-brand-5 responsive:hidden h-10 py-0 mt-4">Eliminar</button>
            </div>
            <button onClick={onDelete} className="hidden responsive:flex bg-transparent group-hover:bg-brand-2 focus:outline-none outline-none border-none text-3xl ">
                <TiDelete />
            </button>
        </div>
    );
}