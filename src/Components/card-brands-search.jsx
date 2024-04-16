import React from "react";
import { Link } from "react-router-dom"; // Asegúrate de importar Link desde react-router-dom

const CardBrandsSearch = (props) => {
  const displayDescription = props.description_brand.length > 200 ? props.description_brand.substring(0, 40) + "..." : props.description_brand;

  return (
    <Link to={`/brand/${props.id_brand}`}
    className="max-w-md mx-auto bg-black rounded-xl shadow-md overflow-hidden md:max-w-2xl cursor-pointer relative no-underline text-inherit"
    style={{color: 'inherit' }}>
      <div className="max-w-md mx-auto bg-black rounded-xl shadow-md overflow-hidden md:max-w-3xl cursor-pointer bg-neutral-950/[.8]"  >
        <div className="flex">
          <div className="flex-1 p-10">
            <div className="uppercase tracking-wide text-sm text-white-500 font-semibold">{props.name_brand}</div>
            <p className="mt-2 text-white-500" >{"Descripción: " + displayDescription}</p>
            <p className="mt-2 text-white-500">{"Telefono: " + props.phone_brand}</p>
            
          </div>
          
          <div className="shrink-0 p-3">
            <img className="h-40 w-40 object-cover " src={props.image_brand} alt="Imagen de la sucursal" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardBrandsSearch;
