import { useParams } from 'react-router-dom';
import Layout from "../Components/Layout/layout";
import { useEffect, useState } from 'react';
import { getItem } from '../api/item';
import FavButton from '../Components/Product/FavButton';
import QuantityInput from '../Components/Shopping Cart/quantity-input';
import { priceFormatterCOP } from '../formatter/formaters';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Product() {
    const [product, setProduct] = useState({});
    const [owner, setOwner] = useState("");
    const { product_id } = useParams();
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const handleSelectSize = (size) => {
        setSelectedSize(size);
    }

    const handleSelectColor = (color) => {
        setSelectedColor(color);
    }

    const addToCart = () => {
        const cartContent = JSON.parse(localStorage.getItem("cart_content") || "[]");

        if(!selectedSize || !selectedColor) {
            toast.error('Debes seleccionar color y talla', {
                position: "top-left"
            });
            return;
        }
        
        const newProduct = {
            ...product,
            size: selectedSize,
            color: selectedColor,
            quantity: quantity,
        };

        if(cartContent.some(productInCart => (productInCart.id == newProduct.id && productInCart.size == newProduct.size && productInCart.color == newProduct.color))){
            toast.error('Ya existe este producto en el carrito', {
                position: "top-left"
            });
            return;
        }

        cartContent.push(newProduct);
        toast.success('Producto agregado al carrito', {
            position: "top-left"
        });
        localStorage.setItem("cart_content", JSON.stringify(cartContent));
    };
    
    useEffect(() => {
        const setItem = async () => {
            const response = await getItem(product_id);
            response.data.item.price = priceFormatterCOP.format(parseFloat(response.data.item.price));
            setProduct(response.data.item);
            setOwner(response.data.owner);
        };
        setItem();
    }, []);

    return (
        <Layout>
            <ToastContainer/>
            <div className='flex flex-col responsive:flex-row responsive:p-32 p-4 justify-center'>
                <img src={product.photo} alt="product-image" className='w-full responsive:w-2/4 responsive:pr-12'/>
                <div className='flex flex-col responsive:min-w-[40rem] responsive:max-w-[40rem]'>
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
                    <div className='flex flex-wrap max-w-[45rem]'>
                    {product.colors && product.colors.map((color, index) => {
                        return (
                        <div id={index} key={index} className={"border border-brand-6 hover:bg-brand-3 cursor-pointer h-7 mr-2 mt-3 px-4 " + (selectedColor == color && 'bg-brand-3')} onClick={() => handleSelectColor(color)}>
                            {color}
                        </div>
                    );
                    })}
                    </div>
                    <div className='flex responsive:flex-col flex-row responsive:space-x-0 space-x-5 responsive:items-start items-center'>
                        <h2 className='mt-3'>Cantidad:</h2>
                        <QuantityInput setQuantityFunction={setQuantity} quantity={quantity} />
                    </div>
                    <div className='flex h-11 mt-5 max-w-[45rem]'>
                        <FavButton itemId={product_id} />
                        <button className='text-white grow bg-brand-3 hover:bg-brand-2 ml-5' onClick={addToCart}>Agregar al carrito</button>
                    </div>
                </div>
            </div>
        </Layout>
    )
}