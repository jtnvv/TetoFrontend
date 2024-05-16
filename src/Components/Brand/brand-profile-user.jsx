import React, { useState, useEffect } from 'react';
import CardItem from '../item/card-item';
import { fetchItemsByStore } from '../../api/item';
import { fetchStoreById } from '../../api/store';
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
        <div className="responsive:flex font-default min-h-screen">
            <div className="bg-brand-6 text-brand-2 flex flex-wrap flex-col items-center shadow-lg rounded-3xl my-5 responsive:my-16 w-4/5 sm:w-1/2 responsive:w-1/4 h-full py-0 responsive:py-10 mx-auto responsive:ml-20 ">
                <img src={store.logo} alt="Logo" className="w-1/2 m-5 rounded-3xl" />
                <h1 className="m-2 font-semibold">{store.name}</h1>
                <p className='p-10'>Descripcion: {store.description}</p>
            </div>

            <div className="bg-brand-1 text-brand-6 w-full">
                <div className='py-2 responsive:py-10'>
                    <h1 className='text-center font-bold text-4xl mb-5'>Productos de la marca:</h1>
                    {products.length === 0 && <div className='flex flex-col items-center'>
                        <h1 className='text-center text-2xl mb-5'>La tienda todavia no ha publicado productos</h1>
                        <img src='https://c.tenor.com/5Plqhc4YVtMAAAAd/tenor.gif' className='w-40' />
                    </div>}
                    <div className="flex flex-wrap justify-center mb-10">
                        {currentProducts.map((product, index) => (
                            console.log(product),
                            <CardItem key={index} id={product.id} name={product.name} photo={product.photo} price={product.price} rating={product.rating} />
                        ))}
                    </div>
                    <div className="bg-brand-1 text-brand-1 text-center">
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