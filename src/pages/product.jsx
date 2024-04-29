import { useParams } from 'react-router-dom';
import Layout from "../Components/Layout/layout";
import { useEffect, useState } from 'react';
import { getItem } from '../api/item';
import FavButton from '../Components/Product/FavButton';

export default function Product() {
    const [product, setProduct] = useState({});
    const [owner, setOwner] = useState("");
    const { product_id } = useParams();
    const [selectedSize, setSelectedSize] = useState();
    const [selectedColor, setSelectedColor] = useState();

    const handleSelectSize = (size) => {
        setSelectedSize(size);
    }

    const handleSelectColor = (color) => {
        setSelectedColor(color);
    }

    const addToCart = () => {
        const cartContent = JSON.parse(localStorage.getItem("cart_content") || "[]");
        if(cartContent.some(productInCart => productInCart.id == product.id)){
            return alert("El producto ya está dentro del carrito");
        }
        cartContent.push(product);
        localStorage.setItem("cart_content", JSON.stringify(cartContent));
    };
    
    useEffect(() => {
        const setItem = async () => {
            const response = await getItem(product_id);
            const priceFormatter = new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'COP',
            });
            response.data.item.price = priceFormatter.format(parseFloat(response.data.item.price));
            setProduct(response.data.item);
            setOwner(response.data.owner);
        };
        setItem();
    }, []);

    return (
        <Layout>
            <div className='flex p-32'>
                <img src={product.photo} alt="product-image" className='w-[45rem] pr-12'/>
                <div className='flex flex-col'>
                    <h2 className='text-sm'>Publicado por: <a href={`/brand/${owner.id}`}>{owner.name}</a></h2>
                    <h1 className='text-brand-6'>{product.name}</h1>
                    <h2>Puntuación: {product.rating === 0 ? 'Sin calificaciones aún' : product.rating}</h2>
                    <h2 className='text-brand-4'>Precio: {product.price} COP</h2>
                    <div className='flex justify-start space-x-2'>
                        {product.categories && product.categories.map((category, index) => {
                            return (
                            <div className="bg-brand-6 flex items-center rounded-full mt-5 mb-5 text-brand-1" key={index}>
                                <img src="../src/assets/category.png" alt="category" className="h-3 w-3 m-3" />
                                <p className="pr-3">{category}</p>
                            </div>
                            )
                        })}
                    </div>
                    <h2 className='mb-3'>Tamaño:</h2>
                    <div className='flex space-x-3 mb-3'>
                    {product.sizes && product.sizes.map((size, index) => {
                        return (
                        <div id={index} key={index} className={"px-4 border border-brand-6 hover:bg-brand-3 cursor-pointer " + (selectedSize == size && 'bg-brand-3')} onClick={() => handleSelectSize(size)}>
                            {size}
                        </div>
                    );
                    })}
                    </div>
                    <h2>Colores:</h2>
                    <div className='flex flex-wrap'>
                    {product.colors && product.colors.map((color, index) => {
                        return (
                        <div id={index} key={index} className={"border border-brand-6 hover:bg-brand-3 cursor-pointer h-7 mr-2 mt-3 px-4 " + (selectedColor == color && 'bg-brand-3')} onClick={() => handleSelectColor(color)}>
                            {color}
                        </div>
                    );
                    })}
                    </div>
                    <h2 className='mt-3'>Cantidad:</h2>
                    <div className='flex mt-4 space-x-1'>
                        <button type="button" id="decrement-button" data-input-counter-decrement="quantity-input" class="bg-brand-6 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                            <svg class="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"/>
                            </svg>
                        </button>
                        <input defaultValue="0" type="number" class="w-12 bg-brand-1 border border-brand-6 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none h-11 text-center text-brand-6" placeholder="1" required />
                        <button type="button" id="increment-button" data-input-counter-increment="quantity-input" class="bg-brand-6 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                            <svg class="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
                            </svg>
                        </button>
                    </div>
                    <div className='flex h-11 mt-5'>
                        <FavButton />
                        <button className='text-white grow bg-brand-3 hover:bg-brand-2 ml-5' onClick={addToCart}>Agregar al carrito</button>
                    </div>
                </div>
            </div>
        </Layout>
    )
}