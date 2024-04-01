import { useState, useEffect } from "react";
import Layout from "../Components/layout";
import { fetchCategories } from "../api/item";

export default function Search() {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetchCategories()
            .then(response => {
                const categoriesArray = JSON.parse(response.data.categories);
                setCategories(categoriesArray);
                console.log(categoriesArray);
            })
    }, []);
    const currentProducts = [
        { id: 1, name: 'Producto 1', image: '/ruta/a/la/imagen1.jpg', price: '20$' },
        { id: 2, name: 'Producto 2', image: '/ruta/a/la/imagen2.jpg', price: '30$' },
        { id: 3, name: 'Producto 3', image: '/ruta/a/la/imagen3.jpg', price: '50$' },
        { id: 4, name: 'Producto 4', image: '/ruta/a/la/imagen4.jpg', price: '15$' },
        { id: 5, name: 'Producto 5', image: '/ruta/a/la/imagen5.jpg', price: '25$' },
        { id: 6, name: 'Producto 6', image: '/ruta/a/la/imagen6.jpg', price: '35$' },
    ];
    return (
        <Layout>
            <div className="flex font-inknut h-full">
                <div className="bg-brand-1 text-brand-6 w-full flex flex-col items-center">
                    <div className="flex items-center mt-20">
                        <img src="../src/assets/search.png" alt="Search" className="h-30 w-30 m-5" />
                        <p>Busca por producto, marca, colección, etc.</p>
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
                </div>
                <div className="bg-zinc-400 text-brand-6 flex flex-col items-center justify-center p-20">
                    <h2 className="font-bold text-2xl">Recomendados</h2>
                    <div className="flex flex-wrap justify-center">
                        {currentProducts.slice(0, 4).map((product) => (
                            <div key={product.id} className="flex flex-col items-center m-5 bg-brand-6 rounded-2xl text-brand-1 w-5/12">
                                <h2 className="mt-5 mb-5 font-semibold text-xl">{product.name.substring(0, 13)} ...</h2>
                                <img src={product.image} alt={product.name} className="h-40 w-40 object-cover mb-5" />
                                <p className="text-brand-3 mb-5 text-xl">$ {product.price}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}