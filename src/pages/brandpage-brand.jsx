import { useEffect, useState } from "react";
import Layout from "../Components/Layout/layout"

import PublishedProductsBrand from "../Components/Brand/published-products-brand";
import { FetchBrandInformation } from "../api/store";
import { fetchItemsByStore } from "../api/item";
export default function BrandPageBrand() {

    const [cardsPerPage, setCardsPerPage] = useState(6);
    const [products, setProducts] = useState([]);

    const [id, setId] = useState()
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

        if (id) {
            fetchItemsByStore(id)
                .then(response => {

                    setProducts(response.data)

                })
                .catch(error => console.error('Error:', error));

        }



    }, [id]);


    return (

        <Layout>

            <div className="w-screen min-h-screen font-default mb-4  ">
                <div className="flex flex-wrap  bg-[#D9D9D9] justify-center items-center">
                    <img src={imageUrl} alt="Logo de la marca" className="w-60 rounded-xl mx-16 py-16" />
                    <div className="flex flex-col w-96 responsive:px-0 px-6">
                        <div className="text-3xl mb-4">
                            {name}
                        </div>
                        <div className="text-base mb-3">

                            {description + ". " + address + "."}

                        </div>
                        <div className="flex justify-center responsive:justify-start">
                            <a href="/brandpage-profile" className="text-brand-6">
                                <button className="bg-transparent hover:bg-gray-400  font-semibold hover:text-black py-2 px-4 border border-gray-900 hover:border-none rounded shadow mb-5" >
                                    Ir al perfil
                                </button>
                            </a>

                        </div>
                    </div>

                </div>
                <div className="mt-10 justify-items items-center ">
                    <h2 className="text-center text-3xl font-semibold">
                        Productos publicados

                    </h2>
                    <div>
                        <div className="flex flex-wrap justify-center" >

                            {
                                products.map((val, key) => {

                                    return (
                                        <div key={val.id}>

                                            <PublishedProductsBrand
                                                id={val.id}
                                                name={val.name}
                                                image={val.photo}
                                                rating={val.rating}
                                                price={val.price}
                                                stock={val.stock}
                                            />

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