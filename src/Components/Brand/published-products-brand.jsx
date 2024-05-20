import React from "react";
import { useEffect, useState } from "react";
import { deleteItem } from "../../api/store.js";
import { deleteImage } from "../../firebase.js";
import { FaTrashAlt } from "react-icons/fa";
import { priceFormatterCOP } from "../../formatter/formaters.js";
export default function PublishedProductsBrand(props) {

    const [deleteProduct, setDeleteProduct] = useState(false);

    const [id, setId] = useState(props.id)

    const [name, setName] = useState(props.name)
    const [image, setImage] = useState(props.image)
    const [rating, setRating] = useState(props.rating)
    const [price, setPrice] = useState(props.price)

    return (

        <div className="flex flex-col items-center m-5 text-brand-1 responsive:w-60 w-40 bg-red-900 rounded-2xl">
            <a className="flex flex-col items-center bg-brand-6 rounded-2xl text-brand-1 responsive:w-60 w-40 relative" href={'/product/' + id}>
                {!props.stock && (
                    <div className="absolute bg-red-600 w-full text-center rounded-t-lg">
                        <h1 className="text-3xl">AGOTADO</h1>
                    </div>
                )}
                <img src={image} alt={name} className="responsive:h-52 h-36 w-full object-cover mb-5 rounded-t-lg" />
                <h2 className="mb-3 max-w-32 font-semibold responsive:text-2xl text-base truncate">{name}</h2>
                {
                    rating !== 0 ?
                        <div className="flex items-center mb-3">
                            {[...Array(5)].map((star, i) => {
                                const ratingValue = i + 1;
                                return (
                                    <label key={i}>
                                        <FaStar className="m-1" color={ratingValue <= props.rating ? 'white' : 'gray'} size="1.2em" />
                                    </label>
                                );
                            })}
                        </div>
                        :

                        <span className="mb-3 text-brand-3">Sin calificación</span>
                }
                <p className="text-brand-3 mb-5 text-xl">{priceFormatterCOP.format(price)}</p>
            </a>
            <div className="my-3 cursor-pointer">
                <FaTrashAlt size="2em" color="white" onClick={() => setDeleteProduct(true)} />
            </div>
            {deleteProduct && <DeleteProductModal onClose={() => setDeleteProduct(false)} id={id} image={image} />}
        </div>

    )
}

function StarRating({ rating }) {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(
            <span key={i} className={i <= rating ? 'text-white-500 text-4xl' : 'text-gray-300  text-4xl '}>
                {i <= rating ? '★' : '☆'}
            </span>
        );
    }
    return <div>{stars}</div>;
}

function DeleteProductModal({ onClose, id, image }) {


    const [idState, setIdState] = useState(id)

    const handleSubmit = async (event) => {

        event.preventDefault();


        const data = {
            id: idState

        };

        deleteImage(image)
        await deleteItem(data)
            .then((res) => {


                alert("El producto se ha borrado correctamente")

                window.location.reload(false)

            })
            .catch((err) => {

                alert(err)
            });

    };



    return (
        <div className="fixed  z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4 ">
            <div className="relative top-40 mx-auto shadow-xl rounded-md bg-[#8E8E7C] max-w-md font-default space-y-10  ">


                <div className="p-10 items-center" onSubmit={handleSubmit}>

                    <form className="space-y-5" >


                        <div className="text-center ">
                            <p className="text-3xl leading-10"> ¿Esta seguro que desea eliminar el producto? </p>

                        </div>
                        <div className="pagination space-x-5 flex justify-center items-center text-black ">
                            <button className=" bg-[#D9D9D9] rounded " type="button" onClick={onClose} >
                                Cancelar
                            </button>
                            <button className=" bg-[#D9D9D9] rounded " type="submit">
                                Confirmar
                            </button>
                        </div>
                    </form>
                </div>

            </div>

        </div>
    )
}