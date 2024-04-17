import { useParams } from 'react-router-dom';
import Layout from "../Components/Layout/layout";
import { useEffect, useState } from 'react';
import { getItem } from '../api/item';

export default function Product() {
    const [product, setProduct] = useState({});
    const [owner, setOwner] = useState("");
    const { product_id } = useParams();

    const handleSelectSize = (event) => {
        console.log(event.target.id)
    }
    
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
                    <div className='flex justify-around'>
                        {product.categories && product.categories.map((category, index) => {
                            return (
                            <div className="bg-brand-6 flex items-center rounded-full mt-5 mb-5 text-brand-1" key={index}>
                                <img src="../src/assets/category.png" alt="category" className="h-3 w-3 m-3" />
                                <p className="pr-3">{category}</p>
                            </div>
                            )
                        })}
                    </div>
                    <h2>Tamaño:</h2>
                        <div className='flex space-x-3'>
                        {product.sizes && product.sizes.map((size, index) => {
                            return (
                            <div id={index} key={index} className='px-4 border border-brand-6 hover:bg-brand-3 cursor-pointer' onClick={(event) => handleSelectSize(event)}>
                                {size}
                            </div>
                        );
                        })}
                        </div>
                </div>
            </div>
        </Layout>
    )
}