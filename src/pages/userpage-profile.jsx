import { useState, useEffect } from "react";
import Layout from "../Components/layout"

import UpdateDataUser from "../Components/update-data-user";
import { FetchUserInformation } from "../api/user";
export default function UserPageProfile() {

    const [updateData, setUpdateData] = useState(false); 

    const [name, setName] = useState()
    const [email, setEmail] = useState()

    useEffect(() => {
        
        FetchUserInformation()
            .then(response => {
               
                setName(response.data[0].name)
                setEmail(response.data[0].email)
                
            })
            .catch(error => console.error('Error:', error));
      }, []);
    

    return(

        <Layout>
          
                <div className="flex  font-inknut  min-h-screen  w-screen bg-white   ">
                    <div className=" bg-white  w-3/12 h-fit  px-20 py-60  space-y-10  ">
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
                    <div className="bg-[#D9D9D9] w-9/12 ">
                        <div className="  space-y-10 py-5 px-20">

                            <div className="mb-10  ">
                                <p className="text-2xl text-gray-900 dark:text-black font-bold">Historial de compras</p>
                            </div>

                            <div className="space-y-8">
                                    
                                    
                            </div>

                            <div className=" pagination  text-center  ">
                            
                                    AQUI VA LA PAGINACION

                            </div>
                            
                            

                        </div>
                    </div>
                </div>

                {updateData && <UpdateDataUser onClose={() => setUpdateData(false)} name={name} email={email} />}
           
        </Layout>

    )
}