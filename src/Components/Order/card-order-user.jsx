import React, { useEffect, useState } from "react";
import { priceFormatterCOP } from "../../formatter/formaters.js";
import RatingModal from "../Rating/rating-modal.jsx";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeletingOrderModal from "./delete-order-modal.jsx";
import RefundOrderModal from "./refund-order-modal.jsx";

const CardOrderUser = (props) => {

    const [cancelOrder, setCancelOrder] = useState(false)
    const [askRefund, setAskRefund] = useState(false)
    const [payLink, setPayLink] = useState(false)
    const [status_message, setStatusMessage] = useState("")
    const [date,setDate] = useState(props.item.order.createdAt)
    const orderDate = new Date(date);


    const [showModal, setShowModal] = React.useState(false);
    const [showDeleteModal, setShowDeleteModal] = React.useState(false);
    const [showRefundModal, setShowRefundModal] = React.useState(false);
    
    const toggleModal = () => setShowModal(!showModal);
    const toggleDeleteModal = () => setShowDeleteModal(!showDeleteModal)
    const toggleRefundModal = () => setShowRefundModal(!showRefundModal)

    const currentTime = Date.now();
    const timeElapsed = currentTime - orderDate.getTime();
    // Convierte la diferencia a días
    const daysElapsed = timeElapsed / (1000 * 60 * 60 * 24);
   

    
    const notifyAndCloseModalDelete = () => {
        
        toggleDeleteModal();
        toast.info('Orden eliminada', {
            autoClose: 500
        });
    };

    const notifyAndCloseModalRefund = () => {
        
        toggleDeleteModal();
        toast.info('Reembolso pedido', {
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
            setPayLink(true);
        } else if (props.item.order.sent_status && !props.item.order.received_status && props.item.order.received_at === null) {
            setStatusMessage("Ya se envió pero no ha sido recibido.");

        } else if (!props.item.order.sent_status) {
            setStatusMessage("No se ha enviado.");
            setCancelOrder(true);
        }
        if (props.item.order.received_status ){
            setStatusMessage("Recibido")
        
            setCancelOrder(false)
            if(daysElapsed <= 5 ){
                setAskRefund(true)
            }
            
        }
        else if (!props.item.order.received_status && props.item.order.received_at) {
            setStatusMessage("Reembolso pendiente")
            setCancelOrder(false)
        }

        
      }, []);

    return (

        
            <div className="flex flex-wrap bg-[#646458] rounded px-10 py-3  gap-3 h-fit  space-x-5 text-white ">
                    
                    <div className="flex flex-wrap  items-center  lg:w-screen ">

                        <div className="mt-2 mb-2 w-fit mr-3 ">
                                    <a key={props.item.id} href={'/product/' + props.item.id}>
                                        <img src={props.item.photo} alt="prueba" className="h-40 w-40 object-cover " />
                                    </a>
                        </div>
                    

                        
                        <div className="mb-3 space-y-1 2xl:w-3/5 xl:w-2/5 lg:w-1/5 md:w-1/5 sm:w-1/5 ">
                            <div>
                                <p className="text-lg text-white-900 dark:text-white font-semibold ">{props.item.name}</p>
                                <p className="text-sm text-white-900 dark:text-white ">Color: {props.item.order.color}</p>
                                <p className="text-sm text-white-900 dark:text-white ">talla: {props.item.order.size}</p>
                                <p className="text-sm text-white-900 dark:text-white ">Cantidad: {props.item.order.quantity}</p>
                                <p className="text-sm text-white-900 dark:text-white ">Enviar a: {props.item.order.delivery_addresss}</p>
                            </div>
                           
                            
                        </div>
                        

                        <div className="flex  w-1/5 items-center space-y-2">
                        
                            <div className="mr-4 space-y-2 ">
                                <p className="text-sm text-white-900 dark:text-white ">Precio: {priceFormatterCOP.format(props.item.price)}</p>
                                <p className="text-sm text-white-900 dark:text-white ">Estado: {status_message}</p>
                                {props.item.order.received_status === true && (
                                    <>
                                        <button onClick={toggleModal} className="bg-brand-3 rounded px-2 py-1 text-brand-1 dark:text-white ">Calificar</button>
                                        <RatingModal showModal={showModal} toggleModal={toggleModal} idext={props.item.order.id} ratingext={props.item.order.rating} notify={notifyAndCloseModal} iditem={props.item.order.item_id} />
                                    </>
                                )}

                                <>
                                {props.item.order.payment_link && (
                                    <a className="underline" href={props.item.order.payment_link} target="_blank" >Paga aquí</a>
                                )}
                                </>

                            </div>

                            <div  className="text-center  ">

                           
                            
                            {cancelOrder && (
                                <>
                                    <button className="bg-brand-3 rounded px-2 py-1 text-brand-1 dark:text-white text-sm" onClick={toggleDeleteModal}>Cancelar envio</button>
                                    <DeletingOrderModal 
                                        showModal={showDeleteModal}
                                        toggleModal={toggleDeleteModal}
                                        notify={notifyAndCloseModalDelete}
                                        idorder = {props.item.order.id}
                                        recipientemail={props.email}
                                        nameuser={props.name}
                                        nameItem = {props.item.name}
                                        sizeitem={props.item.order.size}
                                        quantityitem={props.item.order.quantity}
                                        priceitem={priceFormatterCOP.format(props.item.price)}
                                        idu= {props.id}/>
                                </>

                            )}
                            
                            {askRefund && (
                                <>
                                    <button className="bg-brand-3 rounded px-2 py-1 text-brand-1 dark:text-white text-sm " onClick={toggleRefundModal}>Pedir Reembolso</button>
                                    <RefundOrderModal 
                                        showModal={showRefundModal}  
                                        toggleModal={toggleRefundModal}  
                                        notify={notifyAndCloseModalRefund} 
                                        idorder = {props.item.order.id} 
                                        recipientemail={props.email} 
                                        nameuser={props.name} 
                                        idItem = {props.item.id}
                                        nameItem = {props.item.name}
                                        address = {props.item.order.delivery_addresss}
                                        sizeitem={props.item.order.size} 
                                        quantityitem={props.item.order.quantity} 
                                        priceitem={priceFormatterCOP.format(props.item.price)}  
                                        idu= {props.id}/>
                                </>

                            )}
                            </div>
                        </div>
                      

                       

                        
                        
                        
                        
                    </div>

                    
            
                
            </div>
            

      
    )

}

export default CardOrderUser