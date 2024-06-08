import { useState } from 'react';
import { sendRefundOrderEmail, userRefundOrder } from '../../api/order';


const RefundOrderModal = ({ showModal, toggleModal, notify, idorder,idItem, recipientemail,nameuser,nameItem,sizeitem,quantityitem,priceitem,idu,address}) => {
    

    if (!showModal) return null;

    
    const handleSubmit = async () => {


        let deleteOrder = false
        
        const data = {
            id: idorder


        };

        const dataEmail = {
            recipient_email: recipientemail,
            nameUser: nameuser,
            nameItem:nameItem,
            size: sizeitem, 
            id:idItem,
            quantity: quantityitem,
            price: priceitem,
            iduser: idu,
            address: address

        }
        
        userRefundOrder(data).then(response =>{

          

            let deleteOrder = true;
            

            if(deleteOrder){
                
                sendRefundOrderEmail(dataEmail).then(response=>{
                    console.log("envio de correo exitoso");
                    
                }).catch(error => console.log("error al enviar el correo"));
            }

            notify();
            window.location.reload(false)

        }).catch( error => console.log("error al borrar pedido")
 
        )

    };
    return (
        <div className="fixed z-10 inset-0 overflow-y-auto h-full w-full  " aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="relative  items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block align-bottom bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex">
                            <div className="mt-3 text-center sm:mt-0 sm:m-4 sm:text-left">
                                <div className='flex items-center justify-center mb-3'>
                                    <img src="/favicon.svg" alt="Logo" className="h-14 w-14 mr-2" />
                                    <span className="text-brand-6 font-logo font-semibold text-5xl">TETO</span>
                                </div>
                                <h3 className="text-lg leading-6 font-medium text-gray-900 text-center" id="modal-title">
                                    Pedir un reembolso
                                </h3>
                                <div className="mt-2">
                                    <p className="text-sm text-brand-5 text-center ">
                                        Se enviará un correo al proveedor y se le será confirmado su reembolso a traves del correo ¡Gracias por confiar en TETO!
                                    </p>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex items-center justify-center  ">
                        <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-brand-4 text-base font-medium text-brand-1 hover:bg-brand-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm" onClick={handleSubmit}>
                            Aceptar
                        </button>
                        <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm" onClick={toggleModal}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default RefundOrderModal;