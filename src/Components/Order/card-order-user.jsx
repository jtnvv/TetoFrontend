import React from "react";
import { priceFormatterCOP } from "../../formatter/formaters.js";
const CardOrderUser = (props) => {
    return (

        <div className="text-white ">

            <div className="flex  bg-[#646458] rounded px-10 py-1 gap-3  items-center">

                <div className="mt-2 mb-2 w-2/12">
                    <img src={props.item.photo} alt="prueba" className="h-20 w-20 object-cover " />
                </div>

                <div className="w-8/12">
                        <p className="text-lg text-white-900 dark:text-white font-semibold ">{props.item.name}</p>
                        <p className="text-sm text-white-900 dark:text-white ">Color: {props.item.order.color}</p>
                        <p className="text-sm text-white-900 dark:text-white ">talla: {props.item.order.size}</p>
                        <p className="text-sm text-white-900 dark:text-white ">Enviar a: {props.item.order.delivery_addresss}</p>
                </div>

                <div className="w-2/12">
                    <p className="text-sm text-white-900 dark:text-white ">Calificar</p>
                    <p className="text-lg text-white-900 dark:text-white font-semibold mb-3 ">{priceFormatterCOP.format(parseFloat(props.item.price))}</p>
    
                </div>

            </div>

        </div>

    )

}

export default CardOrderUser