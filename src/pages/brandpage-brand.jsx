import { useEffect, useState } from "react";
import Layout from "../Components/Layout/layout"

import PublishedProductsBrand from "../Components/Brand/published-products-brand";
import { FetchBrandInformation } from "../api/store";
import { fetchItemsByStore } from "../api/item";
export default function BrandPageBrand() {

    const [cardsPerPage, setCardsPerPage] = useState(6);
    const [products, setProducts] = useState([]);

    const [id,setId] = useState()
    const [name, setName] = useState()
    const [description, setDescription] = useState()
    const [address, setAddress] = useState()
    const [phone, setPhone] = useState()
    const [imageUrl, setImageUrl] = useState()


    useEffect(() => {
        
        FetchBrandInformation()
            .then(response => {
                setId(response.data[0].id)
                setName(response.data[0].name)
                setDescription(response.data[0].description)
                setAddress(response.data[0].city)
                setPhone(response.data[0].phone_number)
                setImageUrl(response.data[0].logo)
               
                
            })
            .catch(error => console.error('Error:', error));
        
      }, []);
      
    useEffect(() => {

        if(id){
            fetchItemsByStore(id)
            .then(response => {

                
               setProducts(response.data)
               console.log(products)
               
                
            })
            .catch(error => console.error('Error:', error));

        }
        
        
        
      }, [id]);
      
    
    return (
       
        <Layout>

            <div className="w-screen min-h-screen font-inknut mb-4  ">
                <div className="flex  bg-[#D9D9D9] h-fit justify-center items-center space-x-9 p-10  ">
                    <img src={imageUrl} alt="Logo de la marca" className="h-40 w-full  md:h-full md:w-48" /> 
                    <div className="flex flex-col w-96 ">
                        <div className="text-3xl mb-4">
                            {name}
                        </div>
                        <div className="text-base mb-3 ">

                            {description+". "+address+"."}
                            
                        </div>
                        
                        <div className="">
                            <a  href="/brandpage-profile"className="text-black">
                                <button className="bg-transparent hover:bg-gray-400  font-semibold hover:text-black py-2 px-4 border border-gray-900 hover:border-none rounded shadow" >
                                    Ir al perfil
                                </button>
                            </a>
                            
                        </div>
                    </div>
                    
                </div>
                <div className="  mx-28 mt-10 justify-items items-center ">
                    <div className="w-fit text-3xl mb-3">
                        productos publicados

                    </div>
                    <div className=" w-fit">
                        <div className=" grid 2xl:grid-cols-6  xl:grid-cols-4 md:grid-cols-4 sm:grid-cols-2 gap-10 max-w-1x4" >
                            
                        {
                                products.map((val,key)=>{

                                    return(
                                        <div key={val.id}>

                                            <PublishedProductsBrand 
                                                id={val.id}
                                                name={val.name}
                                                image={val.photo}
                                                rating={val.rating}
                                                price={val.price}/>
                                        
                                        </div>
                                    );
                                })
                            }
                            
        
                        </div>
                    </div>


                </div>
                

            </div>
        
        </Layout>
       
    )
}