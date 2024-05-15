import React from "react";
import { priceFormatterCOP } from "../../formatter/formaters.js";
import RatingModal from "../Rating/rating-modal.jsx";
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

    const handleReceived = () => { };
    return (

        <div className="text-white ">

            <div className="flex  bg-[#646458] rounded px-10 py-1 gap-3  items-center">

                <div className="mt-2 mb-2 w-2/12">
                    <img src={props.item.photo} alt="producto" className="h-20 w-20 object-cover " />
                </div>

                <div className="w-8/12">
                    <p className="text-lg text-white-900 dark:text-white font-semibold ">{props.item.name}</p>
                    <p className="text-sm text-white-900 dark:text-white ">Color: {props.item.order.color}</p>
                    <p className="text-sm text-white-900 dark:text-white ">talla: {props.item.order.size}</p>
                    <p className="text-sm text-white-900 dark:text-white ">Enviar a: {props.item.order.delivery_addresss}</p>
                </div>

                <div className="w-2/12">
                    <p className="text-sm text-white-900 dark:text-white ">Precio: {priceFormatterCOP.format(props.item.price)}</p>
                    {props.item.order.received_status === true ? (
                        <>
                            <button onClick={toggleModal} className="bg-brand-3 rounded px-2 py-1 text-brand-1 dark:text-white">Calificar</button>
                            <RatingModal showModal={showModal} toggleModal={toggleModal} idext={props.item.order.id} ratingext={props.item.order.rating} />
                        </>
                    ) : (
                        <p className="text-sm text-white-900 dark:text-white ">Estado: {status_message}</p>
                    )}

                </div>

            </div>

        </div>

    )

}

export default CardOrderUser