import { useState,useEffect } from "react";

import Layout from "../Components/layout"
import CardOrderBrand  from "../Components/card-order-brand"
import UpdateDataBrand from "../Components/update-data-brand";
import { FetchBrandInformation } from "../api/store";
export default function BrandPageProfile() {

    const [updateData, setUpdateData] = useState(false);

    
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [description, setDescription] = useState()
    const [address, setAddress] = useState()
    const [phone, setPhone] = useState()
    const [imageUrl, setImageUrl] = useState()


    useEffect(() => {
        
        FetchBrandInformation()
            .then(response => {

                setName(response.data[0].name)
                setEmail(response.data[0].email)
                setDescription(response.data[0].description)
                setAddress(response.data[0].city)
                setPhone(response.data[0].phone_number)
                setImageUrl(response.data[0].logo)
               
                
            })
            .catch(error => console.error('Error:', error));
      }, []);

    return(

        <Layout>
            <div className="flex font-inknut bg-white w-screen  min-h-screen ">
                <div className=" bg-white  w-4/12 h-fit   px-20 py-5  space-y-10  ">
                    <div className="space-y-2">
                        <p className="text-2xl text-gray-900 dark:text-black font-semibold">Nombre de la marca</p>
                        <p className="text-lg text-black ">{name}</p>
                    </div>
                    <div className="space-y-2">
                        <p className="text-2xl text-gray-900 dark:text-black font-semibold">Descripción</p>
                        <p className="text-lg text-black ">{description} </p>
                        <p className="text-sm text-black ">{"Ubicado en "+address} </p>
                        <p className="text-sm text-black ">{"Contacto: "+phone} </p>
                    </div>
                    <div className="space-y-2">
                        <p className="text-2xl text-gray-900 dark:text-black font-semibold">Correo electronico</p>
                        <p className="text-lg text-black ">{email}</p>
                    </div>
                    <div className="space-y-5">
                        <p className="text-2xl text-gray-900 dark:text-black font-semibold">Foto de la marca</p>
                        <img src={imageUrl} alt="Logo de la marca" className="h-40 w-full  md:h-full md:w-48" /> 
                    </div>
                    <div className="space-y-2 ">
                        <button className="bg-[#646458] hover:bg-gray-500 text-white hover:bg-grey-500 w-fit" onClick={() => setUpdateData(true)}>
                            MODIFICAR DATOS
                        </button>
                    </div>

                </div>
                <div className="bg-[#D9D9D9] w-8/12 ">
                    <div className=" py-5 px-20 space-y-5 ">

                        <div className="mb-10  ">
                            <p className="text-2xl text-gray-900 dark:text-black font-bold">Historial de pedidos</p>
                        </div>

                        <div className="space-y-8">

                        </div>
                        <div className=" pagination  text-center  ">
                        
                                PAGINACION

                        </div>
                    </div>
                </div>
                
            </div>
            {updateData && <UpdateDataBrand onClose={() => setUpdateData(false)} name={name} email={email} description={description} address={address} phone={phone} imageUrl={imageUrl} />}

        </Layout>

    )
}