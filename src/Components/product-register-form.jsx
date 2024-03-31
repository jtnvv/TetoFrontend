import { useState } from "react";
import { uploadImage } from "../firebase";
import { storeItem } from "../api/store";

export default function ProductRegisterForm() {
    const gropuStyle = "flex flex-col space-y-2";
    const labelStyle = "";
    const inputStyle = "p-2 bg-brand-1 border-b-2 border-brand-6 focus:border-brand-2 focus:outline-0 required:bg-red";
    const [postData, setPostData] = useState({});
    const [productImage, setProductImage] = useState(null);

    const onChange = (event) => {
        setPostData({...postData, [event.target.name]:event.target.value});
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        const photo_url = await uploadImage(productImage, "product-images/");
        storeItem({...postData, photo:photo_url});
    };

  return (
    <form className="space-y-5" onSubmit={onSubmit}>
        <h2 className="text-2xl font-bold pb-4">Agregar un producto</h2>
        <div className={gropuStyle}>
            <label htmlFor="name" className={labelStyle} >Nombre item*:</label>
            <input type="text" placeholder="Nombre" id="name" name="name" className={inputStyle} required onChange={onChange}/>
        </div>
        <div className={gropuStyle}>
            <label htmlFor="colors" className={labelStyle} >Colores*:</label>
            <input type="text" placeholder="Nombre" id="colors" name="colors" className={inputStyle} required onChange={onChange}/>
        </div>
        <div className={gropuStyle}>
            <label htmlFor="colors" className={labelStyle} >¿De los colores que elegiste cuales estan disponibles?*:</label>
            <input type="text" placeholder="Nombre" id="colors" name="colors" className={inputStyle} required onChange={onChange}/>
        </div>
        <div className={gropuStyle}>
            <label htmlFor="stock" className={labelStyle} >Cantidad del lote*:</label>
            <input type="number" placeholder="Cantidad de artículos" id="stock" name="stock" className={inputStyle} required onChange={onChange}/>
        </div>
        <div className={gropuStyle}>
            <label htmlFor="price" className={labelStyle} >Precio*:</label>
            <input type="text" placeholder="Precio" id="price" name="price" className={inputStyle} required onChange={onChange}/>
        </div>
        <div className={gropuStyle}>
            <label htmlFor="categories" className={labelStyle} >Categoria(s)*:</label>
            <input type="text" placeholder="Categoria(s) del artículo" id="categories" name="categories" className={inputStyle} required onChange={onChange}/>
        </div>
        <div className={gropuStyle}>
            <label htmlFor="image" className={labelStyle} >Imagen del producto*: </label>
            <input type="file" placeholder="Descripción" id="image" accept="image/*" onChange={(event) => setProductImage(event.target.files[0])}/>
        </div>
        <div className="flex flex-col items-center space-y-7 font-bold">
            <h2 className="text-xl">Haz que tu producto se destaque sobre los demas*</h2>
            <div className="flex space-x-3">
                <button type="submit" className="w-96 bg-brand-5 text-white border border-brand-5 hover:border-brand-3 hover:bg-brand-3">Agregar</button>
                <button type="submit" className="w-96 bg-transparent border border-brand-5 text-brand-2 hover:bg-brand-2 hover:border-brand-2 hover:text-white" >Agregar sin prioridad</button>
            </div>
            <h2 className="font-normal">*El valor de la publicidad es del 7% del total de la prenda</h2>
        </div>
    </form>
  )
}
