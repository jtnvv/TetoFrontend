import { useState } from "react";
import { updateReceived, updateSend } from "../../api/store";
import { priceFormatterCOP } from "../../formatter/formaters";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CardOrderBrand = (props) => {
    const [isWaitingResponse, setIsWaitingResponse] = useState(false);
    const [sentStatus, setSentStatus] = useState(props.item.order.sent_status);
    const [receivedStatus, setReceivedStatus] = useState(props.item.order.received_status);

    const markSend = () => {
        setIsWaitingResponse(true);

        updateSend(props.item.order.id)
        .then(res => {
            setIsWaitingResponse(false);
            toast.success("Orden marcada como enviada");
        });

        setSentStatus(true);
    };

    const markReceive = () => {
        setIsWaitingResponse(true);

        updateReceived(props.item.order.id)
        .then(res => {
            setIsWaitingResponse(false);
        });

        setReceivedStatus(true);
    };

    return (
        <div className="text-white relative flex">
            <ToastContainer containerId="order-brand" />
            {isWaitingResponse && (
                <div className="absolute h-full w-full bg-brand-6 bg-opacity-50 flex justify-center items-center">
                    <div className="rounded-full w-16 h-16 border-8 border-brand-3 border-t-brand-1 animate-spin"></div>
                </div>
            )}
            <div className="flex flex-wrap bg-brand-4 rounded p-5 items-center w-full">

                <div className="flex flex-wrap  items-center  lg:w-screen">
                    <div className="mt-2 mb-2 mr-7 w-fit">
                        <a key={props.item.id} href={'/product/' + props.item.id}>
                            <img src={props.item.photo} alt="prueba" className="min-w-32 h-32" />
                        </a>
                    </div>
                    <div className=" mb-3 space-y-1 2xl:w-3/5 xl:w-2/5 lg:w-2/5 md:w-1/5 sm:w-1/5 ">

                        <p className="text-lg text-white-900 dark:text-white font-semibold ">{props.item.name}</p>
                        <p className="text-sm text-white-900 dark:text-white ">Color: {props.item.order.color}</p>
                        <p className="text-sm text-white-900 dark:text-white ">talla: {props.item.order.size}</p>
                        <p className="text-sm text-white-900 dark:text-white ">Cantidad: {props.item.order.quantity}</p>
                        <p className="text-sm text-white-900 (dark:text-white ">Enviar a: {props.item.order.delivery_addresss}</p>
                        {props.item.order.received_status && (
                            <p className="text-sm text-brand-1 font-bold">¡Pedido Entregado!</p>
                        )}

                    </div>
                    <div className="flex flex-wrap w-1/5 items-center space-y-3">
                        <div className="flex flex-col items-center">
                            <p className="text-lg text-white-900 dark:text-white font-semibold mb-3 ">{priceFormatterCOP.format(parseFloat(props.item.price)) + " COP"}</p>
                            {!sentStatus && (
                                <button className='text-white grow bg-brand-3 hover:bg-brand-2 ml-5' onClick={markSend}>Marcar como enviado</button>
                            )}
                            {(sentStatus && !receivedStatus) && (
                                <button className='text-white grow bg-brand-3 hover:bg-brand-2 ml-5' onClick={markReceive}>Marcar como recibido</button>
                            )}
                            <p className="text-sm text-white-900 dark:text-white ">{props.item.order.sent_status}</p>
                            

                        </div>

                    </div>


                </div>

            </div>

        </div>

    )

}

export default CardOrderBrand