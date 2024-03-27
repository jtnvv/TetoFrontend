import CardBrandsSearch from "../Components/card-brands-search";
import Layout from "../Components/layout"
import React, { useState, useEffect } from 'react';
import { fetchStores } from '../api/store'

export default function BrandsSearch() {


    //save here all the brands
    const [stores, setStores] = useState([]);
    //variables for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage] = useState(6);

    // Assuming you have an array of records from your database
    const records = [
      /* Your records here */
    ];
    useEffect(() => {

      fetchStores()
          .then(response => {
              console.log(response.data);
              setStores(response.data);
              
          })
          .catch(error => console.error('Error:', error));
    }, []);

    // Get current cards
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    //const currentCards = records.slice(indexOfFirstCard, indexOfLastCard);
    const currentCards = stores.slice(indexOfFirstCard, indexOfLastCard);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
      <Layout> 
      
          <div className="flex flex-col justify-start  items-center w-screen h-screen font-inknut" style={{backgroundImage: "url('../src/assets/bgBrandsSearch.png')",
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'}}>

              <h1 className="mt-10 ">MARCA</h1>

              <div className="mt-10 grid xl:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-8 max-w-3x2  ">

                {
                  currentCards.map((val,key)=>{
                    return (
                      <div key={val.id}>
                        <CardBrandsSearch name_branch = {val.name} description_branch = {val.description} address_branch = {val.city} phone_branch = {val.phone_number} image_branch=""/>
                      </div>
                    )
                  })
                }

              </div>

              <div className="pagination mt-10  absolute bottom-0">
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
