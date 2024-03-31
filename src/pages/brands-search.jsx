import CardBrandsSearch from "../Components/card-brands-search";
import Layout from "../Components/layout"
import React, { useState, useEffect } from 'react';
import { fetchStores } from '../api/store'
import { Link } from "react-router-dom";

export default function BrandsSearch() {


    //save here all the brands
    const [stores, setStores] = useState([]);
    //variables for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage] = useState(6);

  
    useEffect(() => {

      fetchStores()
          .then(response => {
              //console.log(response.data);
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
          
          <div className="flex flex-col justify-start  items-center w-screen h-screen font-inknut" style={{backgroundImage: "url('../src/assets/bgBrandsSearch.png')",
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'}}>

              <h1 className="mt-10 mb-10 ">MARCAS</h1>
              <div className="mt-3" style={{ width: '1720px', height: '650px' }}>
                <div className="  grid  xl:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-8 max-w-3x2 ">

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

              <div className="pagination mt-10">
                {Array(Math.ceil(stores.length/ cardsPerPage)).fill().map((_, i) => (
                  <button key={i} onClick={() => paginate(i + 1)} className="mr-1">
                    {i + 1}
                  </button>
                ))}
              </div>

              
          </div>
          
          
        
      </Layout>
    )
  }
