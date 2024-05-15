import { useState } from 'react';
import { FaStar } from "react-icons/fa";
import { updateOrderRating } from '../../api/order';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RatingModal = ({ showModal, toggleModal, idext, ratingext }) => {
    const [rating, setRating] = useState(0);

    if (!showModal) return null;

    const handleRatingChange = (event) => {
        setRating(event.target.value);
    };
    const handleSubmit = async () => {
        const order = {
            "id": idext,
            "rating": parseInt(rating)
        };
        await updateOrderRating(order);
        toast.info('Calificación guardada', {
            autoClose: 500,
            onClose: () => {
                toggleModal();
                window.location.reload();
            }
        });
    };
    return (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <ToastContainer limit={2} />
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block align-bottom bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex">
                            <div className="mt-3 text-center sm:mt-0 sm:m-4 sm:text-left">
                                <div className='flex items-center justify-center mb-2'>
                                    <img src="/favicon.svg" alt="Logo" className="h-14 w-14 mr-2" />
                                    <span className="text-brand-6 font-logo font-semibold text-5xl">TETO</span>
                                </div>
                                <h3 className="text-lg leading-6 font-medium text-gray-900 text-center" id="modal-title">
                                    Calificar Producto
                                </h3>
                                <div className="mt-2">
                                    <p className="text-sm text-brand-5 text-center mb-3">
                                        Gracias por confiar en TETO, nos encantaria saber tu experiencia con lo que compraste.
                                    </p>
                                    {ratingext === 0 ? (null) : (<p className="text-sm text-brand-6 text-center">Calificación dada anteriormente: {ratingext} , cambia tu calificación</p>)}
                                    < div className="flex items-center justify-center mt-4">
                                        {[1, 2, 3, 4, 5].map((value) => (
                                            <label key={value}>
                                                <div className='flex items-center justify-center p-2'>
                                                    <input
                                                        type="radio"
                                                        value={value}
                                                        checked={rating == value}
                                                        onChange={handleRatingChange}
                                                    />
                                                    <span className='p-1 text-brand-6'>{value}</span>
                                                    <FaStar color='black' />

                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-brand-4 text-base font-medium text-brand-1 hover:bg-brand-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm" onClick={handleSubmit}>
                            Guardar
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

export default RatingModal;