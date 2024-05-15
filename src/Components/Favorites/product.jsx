import { useState } from 'react';
import FavButton from '../Product/FavButton';

export default function Product({id, name, photo, price, parentState = false}) {
    const [isSelected, setIsSelected] = useState(true);
    const priceFormatter = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
    });
    
    const updateSelectedState = () => {
        setIsSelected(false);
        parentState && parentState();
    };

  return (
    <div className={'flex bg-brand-3 items-center rounded-md w-full' + (!isSelected && ' animate-move-l-out')}>
        <a href={`product/${id}`} className='flex responsive:max-w-[50rem] max-w-[40rem]'>
            <img src={photo} alt="product_image" className='w-1/4 rounded-l-md'/>
            <div className='flex flex-col responsive:px-8 px-4 justify-center overflow-hidden w-full'>
                <h2 className='text-brand-6 hover:text-brand-1 responsive:text-xl text-sm truncate responsive:max-w-96 responsive:w-72 max-w-28 w-28'>{name}</h2>
                <h3 className='text-brand-5 responsive:text-lg text-xs'>{priceFormatter.format(parseFloat(price))} COP</h3>
            </div>
        </a>
        <div className='responsive:w-1/12 responsive:pr-2 w-3/12 pr-4'>
            <FavButton itemId={id} parentState={updateSelectedState} />
        </div>
    </div>
  )
}