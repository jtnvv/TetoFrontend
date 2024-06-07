import { useParams } from 'react-router-dom';
import Layout from "../Components/Layout/layout";
import { useEffect, useState } from 'react';
import { fetchCategories, fetchColors, fetchSizes, getItem, getRelatedItems, isOwner, updateItem } from '../api/item';
import FavButton from '../Components/Product/FavButton';
import QuantityInput from '../Components/Shopping Cart/quantity-input';
import { priceFormatterCOP } from '../formatter/formaters';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaTag } from 'react-icons/fa';
import SelectOption from '../Components/Register/select-option';
import CurrencyInput from "react-currency-input-field";
import CardItem from '../Components/item/card-item';

export default function Product() {
    const [product, setProduct] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [owner, setOwner] = useState(0);
    const [isUserOwner, setIsUserOwner] = useState(false);
    const { product_id } = useParams();
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [stock, setStock] = useState("");
    const [price, setPrice] = useState(null);
    const [initialPrice, setInitialPrice] = useState(null);
    const [initialStockValue, setInitialStockValue] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [isNotEditable, setIsNotEditable] = useState(true);
    const [isWaitingResponse, setIsWaitingResponse] = useState(false);
    const [colors, setColors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [colorsResponse, setColorsResponse] = useState({});
    const [categoriesResponse, setCategoriesResponse] = useState({});
    const [sizesResponse, setSizesResponse] = useState({});
    const [sizes, setSizes] = useState([]);
    const inputStyle = "p-2 bg-brand-1 border-b-2 border-brand-6 focus:border-brand-2 focus:outline-0 required:bg-red hover:border-brand-2";
    const gropuStyle = "flex flex-col space-y-2";
    const labelStyle = "";

    const handleSelectSize = (size) => {
        setSelectedSize(size);
    }

    const handleSelectColor = (color) => {
        setSelectedColor(color);
    }

    const getItemTotalPrice = (item) => {
        return parseFloat(item.price.replace(/[^0-9.,-]/g, '')) * 1000;
    }

    const updateProduct = () => {
        setIsWaitingResponse(true);

        if (typeof categoriesResponse !== 'undefined' && categoriesResponse.categories.length === 0) {
            toast.error('Debes seleccionar al menos una categoría', {
                position: "top-left"
            });
            setIsWaitingResponse(false);
            return;
        }

        if (typeof sizesResponse != 'undefined' && sizesResponse.sizes.length === 0) {
            toast.error('Debes seleccionar al menos una talla', {
                position: "top-left"
            });
            setIsWaitingResponse(false);
            return;
        }

        if (typeof colorsResponse !== 'undefined' && colorsResponse.colors.length === 0) {
            toast.error('Debes seleccionar al menos un color', {
                position: "top-left"
            });
            setIsWaitingResponse(false);
            return;
        }

        const newItemData = {
            item_id: product.id,
            price: price,
            stock: stock,
            categories: categoriesResponse,
            sizes: sizesResponse,
            colors: colorsResponse
        };

        updateItem(newItemData)
        .then(res => {
            setIsWaitingResponse(false);
            setInitialStockValue(parseInt(stock));
            setInitialPrice(price);
            setIsNotEditable(true);
            toast.success('¡Producto actualizado!', {
                position: "top-left"
            });
        });
    };

    const setItemStock = (event) => {
        setIsNotEditable(initialStockValue == event.target.value);
        setStock(event.target.value);
    };

    const addToCart = () => {
        const cartContent = JSON.parse(localStorage.getItem("cart_content") || "[]");

        if (!selectedSize || !selectedColor) {
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

        if (cartContent.some(productInCart => (productInCart.id == newProduct.id && productInCart.size == newProduct.size && productInCart.color == newProduct.color))) {
            toast.error('Ya existe este producto en el carrito', {
                position: "top-left"
            });
            return;
        }

        const productQuantityInCart = cartContent.filter(product => product.id === newProduct.id).reduce((accumulator, current) => {
            return accumulator + parseFloat(current.quantity);
        }, 0);

        if (stock - productQuantityInCart < newProduct.quantity) {
            toast.error('No hay suficiente stock, revisa tú carrito', {
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
            const resCategories = await fetchCategories();
            const resColors = await fetchColors();
            const resSizes = await fetchSizes();
            const resRelatedProducts = await getRelatedItems(product_id);
            await isOwner(product_id)
            .then(res => setIsUserOwner(res.data.message))
            .catch(err => setIsUserOwner(false));
            
            setInitialPrice(response.data.item.price);
            response.data.item.price = priceFormatterCOP.format(parseFloat(response.data.item.price));
            
            setCategories(JSON.parse(resCategories.data.categories));
            setColors(JSON.parse(resColors.data.colors));
            setSizes(JSON.parse(resSizes.data.sizes));
            setCategoriesResponse(product.categories);
            setColorsResponse(product.colors);
            setSizesResponse(product.sizes);
            setProduct(response.data.item);
            setOwner(response.data.owner);
            setStock(response.data.item.stock);
            setInitialStockValue(response.data.item.stock);
            setRelatedProducts(resRelatedProducts.data.products);

        };
        setItem();
    }, []);

    useEffect(() => {
        if (typeof categoriesResponse !== 'undefined' && typeof categoriesResponse.categories !== 'undefined') {
            const current = Array.from(categoriesResponse.categories).sort();
            const initial = Array.from(product.categories).sort();
            
            setIsNotEditable(JSON.stringify(current) === JSON.stringify(initial));
        }
    }, [categoriesResponse]);

    useEffect(() => {
        if (typeof colorsResponse !== 'undefined' && typeof colorsResponse.colors !== 'undefined') {
            const current = Array.from(colorsResponse.colors).sort();
            const initial = Array.from(product.colors).sort();
            
            setIsNotEditable(JSON.stringify(current) === JSON.stringify(initial));
        }
    }, [colorsResponse]);

    useEffect(() => {
        if (typeof sizesResponse !== 'undefined' && typeof sizesResponse.sizes !== 'undefined') {
            const current = Array.from(sizesResponse.sizes).sort();
            const initial = Array.from(product.sizes).sort();
            
            setIsNotEditable(JSON.stringify(current) === JSON.stringify(initial));
        }
    }, [sizesResponse]);

    useEffect(() => {
        if (price) {
            setIsNotEditable(initialPrice === price);
        }
    }, [price]);

    return (
        <Layout>
            <ToastContainer limit={3}/>
            <div className='flex flex-col responsive:p-32 p-4'>
                
                <div className='flex flex-col responsive:flex-row justify-center font-default relative mb-8'>

                    <div className='flex w-full responsive:w-2/4 relative responsive:pr-10'>

                            <div className={'absolute w-full h-full text-center responsive:pr-10 ' + ((!initialStockValue) ? 'animate-move-in' : (isUserOwner ? ('animate-move-out') : ('hidden')))}>
                                <h1 className='text-4xl bg-red-500'>
                                    AGOTADO
                                </h1>
                            </div>

                        <img src={product.photo} alt="product-image" className='responsive:min-w-[25rem] min-h-full w-full max-h-[40rem] object-cover' />
                    
                    </div>

                    <div className='flex flex-col responsive:min-w-[40rem] responsive:max-w-[40rem] relative'>

                        {isWaitingResponse && (
                            <div className='absolute bg-brand-6 h-full w-full bg-opacity-45 flex justify-center items-center z-50'>
                                <div className='rounded-full border-4 border-brand-5 border-t-brand-1 w-20 h-20 animate-spin'></div>
                            </div>
                        )}

                        <h2 className='text-sm'>Publicado por: <a href={`/brand/${owner.id}`}>{owner.name}</a></h2>
                        <h1 className='text-brand-6 break-words'>{product.name}</h1>
                        <h2>Puntuación: {product.rating === 0 ? 'Sin calificaciones aún' : product.rating}</h2>

                        {!isUserOwner ? (
                            <h2 className='text-brand-5 text-2xl'>{product.price} COP</h2>
                        ) : (
                            <div className='mb-5'>
                                <h2 className='text-lg'>Precio:</h2>
                                <CurrencyInput className={inputStyle} defaultValue={getItemTotalPrice(product)} onValueChange={(value) => setPrice(value)} prefix="$" suffix="COP" placeholder="$100,000 COP"/>
                            </div>
                        )}

                        {isUserOwner ? (
                            <div>
                                <h2>Stock:</h2>
                                <input min={0} value={stock} type='number' className='bg-transparent border border-brand-6 p-3 w-40' onChange={(event) => setItemStock(event)} required/>
                            </div>
                        ) : (
                            <h2>Stock: {stock}</h2>
                        )}
                        {!isUserOwner ? (
                            <>
                            <div className='flex flex-wrap justify-start my-3'>
                                {product.categories && product.categories.map((category, index) => {
                                    return (
                                        <div className="bg-brand-6 flex items-center rounded-full m-2 ml-0 text-brand-1" key={index}>
                                            <FaTag className='m-2' color='white' />
                                            <p className="pr-3">{category}</p>
                                        </div>
                                    )
                                })}
                            </div>

                            <h2 className='mb-3'>Tamaño:</h2>

                            <div className='flex flex-wrap mb-3'>
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
                                        <div id={index} key={index} className={"border border-brand-6 hover:bg-brand-3 cursor-pointer h-7 mt-4 px-4 " + (selectedColor == color && 'bg-brand-3')} onClick={() => handleSelectColor(color)}>
                                            {color}
                                        </div>
                                    );
                                })}
                            </div>

                            <div className={'flex responsive:flex-col flex-row responsive:space-x-0 space-x-5 responsive:items-start items-center'+ (!product.stock && (' hidden'))}>
                                <h2 className='mt-3'>Cantidad:</h2>
                                <QuantityInput setQuantityFunction={setQuantity} quantity={quantity} maxValue={stock} />
                            </div>
                            

                            </>
                        ) : (
                            <div className='mt-5'>
                                <div className={gropuStyle}>
                                    <label htmlFor="categories" className={labelStyle} >Categoria(s)*:</label>
                                    <SelectOption options={categories} defaultValue={product.categories} setResponse={setCategoriesResponse} fieldName="categories"/>
                                </div>

                                <div className={gropuStyle}>
                                    <label htmlFor="colors" className={labelStyle} >¿En qué colores está disponible?*:</label>
                                    <SelectOption options={colors} defaultValue={product.colors} setResponse={setColorsResponse} fieldName="colors"/>
                                </div>

                                <div className={gropuStyle}>
                                    <label htmlFor="sizes" className={labelStyle} >¿En qué tallas esta disponible?*:</label>
                                    <SelectOption options={sizes} fieldName="sizes" setResponse={setSizesResponse} defaultValue={product.sizes}/>
                                </div>
                            </div>
                        )}

                        <div className={'flex h-11 mt-5 max-w-[30rem]' + ((!product.stock && !isUserOwner) && (' hidden'))}>
                            {!isUserOwner && (
                                <FavButton itemId={product_id} />
                            )}
                            <button disabled={isUserOwner ? isNotEditable : false} className={'text-white grow bg-brand-3 hover:bg-brand-2 disabled:bg-gray-400 disabled:text-slate-600 transition-colors duration-500' + (!isUserOwner && ' ml-5')} onClick={isUserOwner ? updateProduct : addToCart}>{isUserOwner ? 'Guardar cambios' : 'Agregar al carrito'}</button>
                        </div>

                    </div>
                </div>
                <h1 className='text-2xl text-center font-bold mb-5'>Productos relacionados</h1>

                <div className='flex overflow-auto'>
                    <div className='flex mx-auto'>
                        {relatedProducts.map((item, index) => (
                            <CardItem key={index} id={item.id} name={item.name} photo={item.photo} price={item.price} rating={item.rating} stock={item.stock} />
                        ))}
                    </div>
                </div>

            </div>
        </Layout>
    )
}