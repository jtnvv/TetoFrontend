import React from "react";
import { useEffect, useState } from "react";

export default function PublishedProductsBrand(props){

    const [id, setId] = useState(props.id)
    const [name, setName] = useState(props.name)
    const [image, setImage] = useState(props.image)
    const [rating, setRating] = useState(props.rating)
    const [price, setPrice] = useState(props.price)

    
    
    return (
        <div  className="flex flex-col items-center m-5 bg-brand-6 rounded-2xl text-brand-1 w-60">
            <h2 className="mt-5 mb-2 font-semibold text-xl">{name}</h2>
            <img src={image} alt="prueba" className="h-40 w-40 object-cover mb-2" />
            <StarRating rating={rating} />
            <p className="text-brand-3 mb-5 text-xl">{"$"+price}</p>
        </div>
    )
}

function StarRating({ rating }) {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? 'text-white-500 text-4xl' : 'text-gray-300  text-4xl '}>
          {i <= rating ? '★' : '☆'}
        </span>
      );
    }
    return <div>{stars}</div>;
  }
  