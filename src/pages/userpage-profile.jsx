import { useState, useEffect } from "react";
import Layout from "../Components/Layout/layout"

import UpdateDataUser from "../Components/User/update-data-user";
import { FetchUserInformation, FetchUserOrders } from "../api/user";
import CardOrderUser from "../Components/Order/card-order-user";
export default function UserPageProfile() {

    const [updateData, setUpdateData] = useState(false); 

    const [name, setName] = useState()
    const [email, setEmail] = useState()

    const [orders, setOrders] = useState([]);

    //variables for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage] = useState(4);

    useEffect(() => {
        
        FetchUserInformation()
            .then(response => {
               
                setName(response.data[0].name)
                setEmail(response.data[0].email)
                
            })
            .catch(error => console.error('Error:', error));
      }, []);

      useEffect(() => {
        
        FetchUserOrders()
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
          
                <div className=" flex font-default  min-h-screen  w-screen bg-white   ">
                    <div className=" flex flex-col bg-white   h-fit  px-20 py-40  space-y-10  ">
                        <div className="space-y-2">
                            <p className="text-2xl text-gray-900 dark:text-black font-semibold">Nombre </p>
                            <p className="text-lg text-black ">{name}</p>
                        </div>
                        
                        <div className="space-y-2">
                            <p className="text-2xl text-gray-900 dark:text-black font-semibold">Correo electronico</p>
                            <p className="text-lg text-black ">{email}</p>
                        </div>
                    
                        <div className="space-y-2 ">
                            <button   className="bg-[#646458] hover:bg-gray-500 text-white hover:bg-grey-500 w-fit" onClick={() => setUpdateData(true)}>
                                MODIFICAR DATOS
                            </button>
                        </div>

                    </div>
                    <div className="bg-[#D9D9D9] w-screen  ">
                        <div className="  space-y-10 py-5 px-20">

                            <div className="mb-10  ">
                                <p className="text-2xl text-gray-900 dark:text-black font-bold">Historial de compras</p>
                            </div>

                            <div className="space-y-8">

                            {
                                currentCards.length !== 0 ? currentCards.map((item, key) => {
                                    return (
                                        <div key={key}>
                                            <CardOrderUser  item={item}  />
                                        </div>
                                    )
                                }) : (
                                    <div className="text-center flex flex-col items-center">
                                        <h1 className="responsive:text-5xl text-4xl">No tienes ordenes aún, explora y haz tu primer orden! <a href="/" className="underline" >Haz click aquí para explorar</a></h1>
                                        <img className="responsive:w-80 w-60 responsive:mt-20 mt-10" src="https://media1.tenor.com/m/lx2WSGRk8bcAAAAC/pulp-fiction-john-travolta.gif" alt="no-orders-image" />
                                    </div>
                                )
                            }
                                     
                            </div>

                            <div className=" pagination  text-center text-white ">
                            
                                {Array(Math.ceil(orders.length/ cardsPerPage)).fill().map((_, i) => (
                                    <button key={i} onClick={() => paginate(i + 1)} className="mr-1">
                                        {i + 1}
                                    </button>
                                    ))}

                            </div>

                        </div>
                    </div>
                </div>

                {updateData && <UpdateDataUser onClose={() => setUpdateData(false)} name={name} email={email} />}
           
        </Layout>

    )
}