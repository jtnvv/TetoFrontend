import React, { useEffect } from "react";
import { priceFormatterCOP } from "../../formatter/formaters.js";
import RatingModal from "../Rating/rating-modal.jsx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CardOrderUser = (props) => {
    let status_message;
    if (props.item.order.sent_status === null) {
        status_message = "No ha sido pagado aún.";
    } else if (props.item.order.sent_status === true) {
        status_message = "Ya se envió pero no ha sido recibido.";
    } else if (props.item.order.sent_status === false) {
        status_message = "No se ha enviado.";
    }

    const [showModal, setShowModal] = React.useState(false);
    const toggleModal = () => setShowModal(!showModal);
    const notifyAndCloseModal = () => {
        toggleModal();
        toast.info('Calificación guardada', {
            autoClose: 500
        });
    };

    return (

        <div className="text-white ">

            <div className="flex  bg-[#646458] rounded px-10 py-3 gap-3  items-center">

                <div className="mt-2 mb-2 w-max">
                    <a key={props.item.id} href={'/product/' + props.item.id}>
                        <img src={props.item.photo} alt="prueba" className="h-20 w-20 object-cover " />
                    </a>
                </div>

                <div className="w-8/12 mb-3 space-y-1">
                        <p className="text-lg text-white-900 dark:text-white font-semibold ">{props.item.name}</p>
                        <p className="text-sm text-white-900 dark:text-white ">Color: {props.item.order.color}</p>
                        <p className="text-sm text-white-900 dark:text-white ">talla: {props.item.order.size}</p>
                        <p className="text-sm text-white-900 dark:text-white ">Cantidad: {props.item.order.quantity}</p>
                        <p className="text-sm text-white-900 dark:text-white ">Enviar a: {props.item.order.delivery_addresss}</p>
                </div>

                <div className="w-2/12">
                    <p className="text-sm text-white-900 dark:text-white ">Precio: {priceFormatterCOP.format(props.item.price)}</p>
                    {props.item.order.received_status === true ? (
                        <>
                            <button onClick={toggleModal} className="bg-brand-3 rounded px-2 py-1 text-brand-1 dark:text-white">Calificar</button>
                            <RatingModal showModal={showModal} toggleModal={toggleModal} idext={props.item.order.id} ratingext={props.item.order.rating} notify={notifyAndCloseModal} iditem={props.item.order.item_id} />
                        </>
                    ) : (
                        <>
                        <p className="text-sm text-white-900 dark:text-white ">Estado: {status_message}</p>
                        {props.item.order.payment_link && (
                            <a className="underline" href={props.item.order.payment_link} target="_blank" >Paga aquí</a>
                        )}
                        </>
                    )}

                </div>

            </div>

        </div>

    )

}

export default CardOrderUser