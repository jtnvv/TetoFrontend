import React from "react";
import { UpdateSend } from "../../api/store";
// import { FetchBrandInformation, FetchBrandOrders } from "../api/store";

const markSend = () => {
    UpdateSend()
};

const CardOrderBrand = (props) => {


    return (

        <div className="text-white ">
            <div className="flex  bg-[#646458] rounded px-10 py-1 gap-3  items-center">
                <div className="mt-2 mb-2 w-2/12">
                    <img src="/favicon.svg" alt="prueba" className="h-20 w-20 object-cover " />
                </div>
                <div className="w-8/12">
                        <p className="text-lg text-white-900 dark:text-white font-semibold ">{props.item.name}</p>
                        <p className="text-sm text-white-900 dark:text-white ">Enviar a:</p>
                        <p className="text-sm text-white-900 dark:text-white ">{props.item.order.delivery_addresss}</p>


                </div>
                <div className="w-2/12">
                    <p className="text-lg text-white-900 dark:text-white font-semibold mb-3 ">{"$"+props.item.price}</p>
                    <button className='text-white grow bg-brand-3 hover:bg-brand-2 ml-5' onClick={markSend}>Enviado</button>
                    <p className="text-sm text-white-900 dark:text-white ">enviado</p>
                    

                </div>

            </div>

        </div>

    )

}

export default CardOrderBrand