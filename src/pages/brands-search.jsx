import CardBrandsSearch from "../Components/Search/card-brands-search";
import Layout from "../Components/Layout/layout"
import React, { useState, useEffect } from 'react';
import { fetchStores } from '../api/store'

export default function BrandsSearch() {


    //save here all the brands
    const [stores, setStores] = useState([]);
    //variables for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage] = useState(6);

  
    useEffect(() => {

      fetchStores()
          .then(response => {
              setStores(response.data);
              
          })
          .catch(error => console.error('Error:', error));
    }, []);

    // Get current cards
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = stores.slice(indexOfFirstCard, indexOfLastCard);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
      <Layout> 
          
          <div className=" bg-bgBrandsSearch bg-no-repeat bg-center bg-cover w-screen min-h-screen  text-white  font-inknut justify-between">

              <div className="mb-10 p-10 text-center">
                <h1 className=" ">MARCAS</h1>
              </div>

              <div className="m-10 " >
                <div className="grid 2xl:grid-cols-2 xl:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-8 max-w-3x2 ">

                  {
                    currentCards.map((val,key)=>{
                      return (
                        <div key={val.id}>
                          <CardBrandsSearch id_brand = {val.id} name_brand = {val.name} description_brand = {val.description} address_brand = {val.city} phone_brand = {val.phone_number} image_brand={val.logo}/>
                        </div>
                      )
                    })
                  }

                </div>
              </div>
              
              <div className="pagination p-10 text-center my-5">
                {Array(Math.ceil(stores.length/ cardsPerPage)).fill().map((_, i) => (
                  <button key={i} onClick={() => paginate(i + 1)} className="mr-1">
                    {i + 1}
                  </button>
                ))}
              </div>

              
          </div>
          <div className="relative h-24 w-screen ... font-inknut text-center text-3xl">
              <div className="absolute inset-x-0 bottom-0 h-16 ...">
                <p> ¿Eres una marca? <a href="/register-brand" className="text-black">Regístrate aquí</a> </p> 
              </div>
            </div>

      </Layout>
    )
  }
