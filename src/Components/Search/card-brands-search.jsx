import React from "react";
import { Link } from "react-router-dom"; // Asegúrate de importar Link desde react-router-dom

const CardBrandsSearch = (props) => {
  const displayDescription = props.description_brand.length > 200 ? props.description_brand.substring(0, 40) + "..." : props.description_brand;

  return (
    <Link to={`/brand/${props.id_brand}`}
      className="mx-auto bg-black rounded-xl shadow-md overflow-hidden md:max-w-2xl cursor-pointer relative no-underline text-inherit"
      style={{ color: 'inherit' }}>
      <div className="bg-black rounded-xl overflow-hidden md:max-w-3xl cursor-pointer bg-neutral-950/[.8] responsive-sm:max-h-60 transform transition duration-500 ease-in-out hover:scale-110 shadow-2xl"  >
        <div className="flex flex-col responsive-sm:flex-row responsive-sm:max-h-60">
          <div className="flex m-5 mt-10 items-center justify-center">
            <img className="h-40 w-40 object-cover " src={props.image_brand} alt="Imagen de la sucursal" />
          </div>

          <div className="flex-1 responsive-sm:px-3 responsive-sm:py-10 px-10 pt-5 pb-8 responsive-sm:max-h-60">
            <div className="uppercase tracking-wide text-sm text-white-500 font-semibold">{props.name_brand}</div>
            <p className="mt-2 text-white-500" >{"Descripción: " + displayDescription}</p>
            <p className="mt-2 text-white-500">{"Telefono: " + props.phone_brand}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardBrandsSearch;
