import { useState,useEffect } from "react";

import Layout from "../Components/Layout/layout"
import CardOrderBrand  from "../Components/Order/card-order-brand"
import UpdateDataBrand from "../Components/Brand/update-data-brand";
import { FetchBrandInformation, FetchBrandOrders } from "../api/store";

export default function BrandPageProfile() {

    const [updateData, setUpdateData] = useState(false);

    
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [description, setDescription] = useState()
    const [address, setAddress] = useState()
    const [phone, setPhone] = useState()
    const [imageUrl, setImageUrl] = useState()

    const [orders, setOrders] = useState([]);

    //variables for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage] = useState(4);


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

      useEffect(() => {
        
        FetchBrandOrders()
            .then(response => {
               
                // Extraer el item de cada orden
                const items = response.data.map(order => {
                    // Asegúrate de que el item exista en la orden
                    if (order.item) {
                        return {...order.item, order};
                    }
                });
                setOrders(items);
                
            })
            .catch(error => console.error('Error:', error));
      }, []);

    // Get current cards
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = orders.slice(indexOfFirstCard, indexOfLastCard);

     // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return(

        <Layout>
            <div className="flex font-default bg-white w-screen  min-h-screen ">
                <div className=" bg-white  w-fit    h-fit   px-20 py-5  space-y-10  ">
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
                <div className="bg-[#D9D9D9] w-screen col-span-5 ">
                    <div className=" py-5 px-20 space-y-5 ">

                        <div className="mb-10  ">
                            <p className="text-2xl text-gray-900 dark:text-black font-bold">Historial de pedidos</p>
                        </div>

                        <div className="space-y-8">
                            {
                                currentCards.map((item, key) => {
                                    return (
                                        <div key={key}>
                                            <CardOrderBrand item={item}  />
                                        </div>
                                    )
                                })
                            }

                        </div>
                        <div className=" pagination  text-center  text-white ">
                        
                            {Array(Math.ceil(orders.length/ cardsPerPage)).fill().map((_, i) => (
                                <button key={i} onClick={() => paginate(i + 1)} className="mr-1">
                                    {i + 1}
                                </button>
                                ))}

                        </div>
                    </div>
                </div>
                
            </div>
            {updateData && <UpdateDataBrand onClose={() => setUpdateData(false)} name={name} email={email} description={description} address={address} phone={phone} imageUrl={imageUrl} />}

        </Layout>

    )
}