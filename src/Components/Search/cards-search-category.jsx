import { useState, useEffect } from 'react';
import { fetchItemsByCategory } from '../../api/item';
import { FaTag } from "react-icons/fa";
import CardItem from "../item/card-item";
export default function CardsSearchCategory({ category }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchItemsByCategory(category)
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => console.error('Error:', error));
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(8);
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const totalPages = Math.ceil(products.length / productsPerPage);
    return (
        <div className="flex items-center bg-brand-1 font-default h-full w-full justify-center text-brand-1">
            <div className="flex flex-wrap flex-col items-center justify-center">
                <div className="bg-brand-6 flex items-center rounded-full mt-10 mb-8 w-56">
                    <FaTag color='white' size='2.5em' className='p-3' />
                    <p className="pr-3">{category}</p>
                </div>
                <div className="flex flex-wrap justify-center 2xl:mx-80">
                    {currentProducts.map((product, index) => (
                        <CardItem key={index} id={product.id} name={product.name} photo={product.photo} price={product.price} rating={product.rating} stock={product.stock} />
                    ))}
                </div>
                <div className="bg-brand-1 text-brand-1 my-10">
                    {totalPages > 1 && [...Array(Math.ceil(products.length / productsPerPage)).keys()].map(number => (
                        <button key={number + 1} onClick={() => paginate(number + 1)} className='mr-1'>
                            {number + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div >
    )
}