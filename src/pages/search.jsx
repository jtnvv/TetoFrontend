import { useState, useEffect } from "react";
import Layout from "../Components/Layout/layout";
import { fetchCategories } from "../api/item";
import { fetchItemsByPriority } from "../api/item";
import CardItem from "../Components/item/card-item";
import { FaSearch } from "react-icons/fa";

export default function Search() {
    const [categories, setCategories] = useState([]);
    const [items, setItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    }
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }
    useEffect(() => {
        fetchCategories()
            .then(response => {
                const categoriesArray = JSON.parse(response.data.categories);
                setCategories(categoriesArray);
            })
        fetchItemsByPriority()
            .then(items => {
                setItems(items.data);
            })
            .catch(error => console.error('Error fetching items:', error));
    }, []);

    const filteredItems = items.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);


    return (
        <Layout>
            <div className="flex font-default xl:flex-row 2xl:flex-row flex-col h-full">
                <div className="bg-brand-1 text-brand-6 w-full flex flex-col items-center">
                    <div className="flex items-center mt-20">
                        <h2 className="text-3xl">Categorias</h2>
                    </div>
                    <div className="flex mt-10 justify-center align-items-start">
                        <div className="flex flex-wrap w-1/2 border-r-2 border-gray-300 pr-2">
                            {categories.slice(0, categories.length / 2).map((category, index) => (
                                <div key={index} className="w-full p-2">
                                    <a href={"category/" + category} className="text-brand-6 hover:text-gray-500">{category}</a>
                                </div>
                            ))}
                            <div className="w-full p-2">
                                <a href="/brands" className="text-brand-6 hover:text-gray-500">Marcas</a>
                            </div>
                        </div>
                        <div className="flex flex-wrap w-1/2 pl-2">
                            {categories.slice(categories.length / 2).map((category, index) => (
                                <div key={index} className="w-full p-2">
                                    <a href={"category/" + category} className="text-brand-6 hover:text-gray-500">{category}</a>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col items-center mb-7">
                        <h2 className="text-3xl mt-20">Productos</h2>
                        <div className="flex items-center">
                            <FaSearch color="black" size="1.5em" className="mr-2" />
                            <input type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Busca por nombre de producto" className="bg-transparent underline underline-offset-4 text-brand-6"></input>
                        </div>
                        <div className="flex flex-wrap justify-center">
                            {currentItems.map((product, index) => (
                                <CardItem key={index} id={product.id} name={product.name} price={product.price} photo={product.photo} rating={product.rating} stock={product.stock} />
                            ))}
                        </div>
                        <div className="pagination text-brand-1 space-x-1">
                            {[...Array(totalPages).keys()].map((page) => (
                                <button key={page + 1} onClick={() => handlePageChange(page + 1)}>
                                    {page + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="bg-zinc-400 text-brand-6 flex flex-col items-center p-20 min-h-fit">
                    <h2 className="font-bold text-2xl">Recomendados</h2>
                    <div className="flex flex-wrap justify-center">
                        {items.slice(0, 4).map((product, index) => (
                            <CardItem key={index} id={product.id} name={product.name} price={product.price} photo={product.photo} rating={product.rating} stock={product.stock} />
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}