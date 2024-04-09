import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import { fetchItemsByStore } from '../api/item';
import { fetchStoreById } from '../api/store';
export default function BrandProfileUser(props) {


    const [products, setProducts] = useState([]);
    const [store, setStore] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(6);
    const store_id = props.id_store; // es 1 porque es el id de la tienda preestablecida con la vista de marcas completas se cambia por la que el usuario seleccione
    useEffect(() => {

        fetchStoreById(store_id)
            .then(response => {
                setStore(response.data);
            })
            .catch(error => console.error('Error:', error));
    }, []);
    useEffect(() => {
        fetchItemsByStore(store_id)
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => console.error('Error:', error));
    }, [store_id]);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const totalPages = Math.ceil(products.length / productsPerPage);

    return (
        <div className="flex font-inknut h-screen">
            <div className="bg-zinc-400 text-brand-6 flex flex-col items-center justify-center pr-40 pl-40">
                <img src={store.logo} alt="Logo" className="h-32 w-32 m-5" />
                <h1 className="m-2">{store.name}</h1>x
                <p>{store.description}</p>
            </div>
            <div className="bg-brand-1 text-brand-6 w-full h-full">
                <div className='pt-10 pb-10 pl-40 pr-40'>
                    <div className="flex flex-wrap justify-center">
                        {currentProducts.map((product) => (
                            <div key={product.id} className="flex flex-col items-center m-5 bg-brand-6 rounded-2xl text-brand-1 w-60">
                                <h2 className="mt-5 mb-5 font-semibold text-xl">{product.name.substring(0, 13)} ...</h2>
                                <img src={product.photo} alt={product.name} className="h-40 w-40 object-cover mb-5" />
                                <p className="text-brand-3 mb-5 text-xl">$ {product.price}</p>
                            </div>
                        ))}
                    </div>
                    <div className="bg-brand-1 text-brand-1">
                        {totalPages > 1 && [...Array(Math.ceil(products.length / productsPerPage)).keys()].map(number => (
                            <button key={number + 1} onClick={() => paginate(number + 1)} className='mr-1'>
                                {number + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}