import React, { useEffect, useState } from "react";
import { priceFormatterCOP } from "../../formatter/formaters.js";
import RatingModal from "../Rating/rating-modal.jsx";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import DeletingOrderModal from "./delete-order-modal.jsx";

const CardOrderUser = (props) => {

    const [cancelOrder, setCancelOrder] = useState(false)
    const [status_message, setStatusMessage] = useState("")
    const [showModal, setShowModal] = React.useState(false);
    const [showDeleteModal, setShowDeleteModal] = React.useState(false);
    
    const toggleModal = () => setShowModal(!showModal);
    const toggleDeleteModal = () => setShowDeleteModal(!showDeleteModal)


    const notifyAndCloseModalDelete = () => {
        
        toggleDeleteModal();
        toast.info('Orden eliminada', {
            autoClose: 500
        });
    };


    const notifyAndCloseModal = () => {
        toggleModal();
        toast.info('Calificación guardada', {
            autoClose: 500
        });
    };

   

    useEffect(() => {
        if (props.item.order.sent_status === null) {
            setStatusMessage("No ha sido pagado aún.");
            setCancelOrder(true);
        } else if (props.item.order.sent_status === true) {
            setStatusMessage("Ya se envió pero no ha sido recibido.");
        } else if (props.item.order.sent_status === false) {
            setStatusMessage("No se ha enviado.");
            setCancelOrder(true);
        } 
        
        
      }, []);

    return (

        <div className="text-white  ">
            <div className="flex  bg-[#646458] rounded px-10 py-3  gap-3 h-max items-center space-x-5">
                    <div className="mt-2 mb-2 w-max  ">
                        <a key={props.item.id} href={'/product/' + props.item.id}>
                            <img src={props.item.photo} alt="prueba" className="h-40 w-40 object-cover " />
                        </a>
                    </div>

                    <div className="grid sm:grid-cols-4 items-center gap-2">
                    
                        <div className="mb-3 space-y-1  col-span-3 ">
                                <p className="text-lg text-white-900 dark:text-white font-semibold ">{props.item.name}</p>
                                <p className="text-sm text-white-900 dark:text-white ">Color: {props.item.order.color}</p>
                                <p className="text-sm text-white-900 dark:text-white ">talla: {props.item.order.size}</p>
                                <p className="text-sm text-white-900 dark:text-white ">Cantidad: {props.item.order.quantity}</p>
                                <p className="text-sm text-white-900 dark:text-white ">Enviar a: {props.item.order.delivery_addresss}</p>
                        </div>

                        <div className="grid grid-cols-2 items-center gap-5">

                            <div>
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

                            <div  className="text-center ">
                            {cancelOrder && (
                                <>
                                    <button className="bg-brand-3 rounded px-2 py-1 text-brand-1 dark:text-white " onClick={toggleDeleteModal}>Cancelar envio</button>
                                    <DeletingOrderModal showModal={showDeleteModal}  toggleModal={toggleDeleteModal}  notify={notifyAndCloseModalDelete} idorder = {props.item.order.id} recipientemail={props.email} nameuser={props.name} sizeitem={props.item.order.size} quantityitem={props.item.order.quantity} priceitem={priceFormatterCOP.format(props.item.price)}  idu= {props.id}/>
                                </>

                            )}
                            </div>

                            

                        </div>

                        
                        
                        
                        
                    </div>

                    
            
                
            </div>
            

        </div>

    )

}

export default CardOrderUser