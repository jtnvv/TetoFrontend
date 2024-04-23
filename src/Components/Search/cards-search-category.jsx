import { useState, useEffect } from 'react';
import { fetchItemsByCategory } from '../../api/item';
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
    const [productsPerPage] = useState(10);
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const totalPages = Math.ceil(products.length / productsPerPage);
    return (
        <div className="flex items-center bg-brand-1 font-inknut h-full w-full justify-center text-brand-1 px-48">
            <div className="flex flex-col">
                <div className="bg-brand-6 flex items-center rounded-full mt-5 mb-5 w-56">
                    <img src="../src/assets/category.png" alt="category" className="h-3 w-3 m-3" />
                    <p className="pr-3">{category}</p>
                </div>
                <div className="flex flex-wrap">
                    {currentProducts.map((product) => (
                        <a key={product.id} className="flex flex-col items-center m-5 bg-brand-6 rounded-2xl text-brand-1 w-60" href={'/product/' + product.id}>
                            <h2 className="mt-5 mb-5 font-semibold text-xl">{product.name.substring(0, 13)} ...</h2>
                            <img src={product.photo} alt={product.name} className="h-40 w-40 object-cover mb-5" />
                            <p className="text-brand-3 mb-5 text-xl">$ {product.price}</p>
                        </a>
                    ))}
                </div>
                <div className="bg-brand-1 text-brand-1 mb-5">
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