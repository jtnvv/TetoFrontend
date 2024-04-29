import { useEffect, useState } from 'react';
import Layout from "../Components/Layout/layout"
import { fetchItemsByPriority, fetchCategories, fetchItemsByCategory } from '../api/item';
import { fetchStores } from '../api/store'
import CardItem from '../Components/item/card-item';
import CardBrandsSearch from "../Components/Search/card-brands-search";
import { Link } from 'react-router-dom';

const Home = () => {
  const [firstItem, setFirstItem] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categoryItems, setCategoryItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [stores, setStores] = useState([]);

  useEffect(() => {
    fetchItemsByPriority()
      .then(items => {
        setFirstItem(items.data[0]);
      })
      .catch(error => console.error('Error fetching items:', error));

    fetchCategories()
      .then(response => {
        const categoriesArray = JSON.parse(response.data.categories);
        setCategories(categoriesArray.slice(0, 7));
        setSelectedCategory(categoriesArray[0]);
        handleCategoryClick(categoriesArray[0]);
      })
      .catch(error => console.error('Error fetching categories:', error));
    fetchStores()
      .then(response => {
        setStores(response.data.slice(0, 2));
      })
      .catch(error => console.error('Error:', error));
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    fetchItemsByCategory(category)
      .then(items => {
        setCategoryItems(items.data.slice(0, 5));
      })
      .catch(error => console.error('Error fetching items by category:', error));
  };

  return (
    <Layout>
      <div className="h-full flex flex-col font-inknut">
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-8/12 bg-brand-2">
            {firstItem && <img src={firstItem.photo} alt="imagen del producto" className="w-full object-cover h-full lg:max-h-[39rem] lg:min-h-[39rem]" />}
          </div>
          <div className="bg-brand-6 w-full lg:w-7/12 text-brand-1 p-4 lg:pl-32 flex flex-col justify-center">
            {firstItem && (
              <>
                <h1 className='mb-5'>{firstItem.name}</h1>
                <p className='text-xl lg:text-3xl text-brand-3 mb-5'>$ {firstItem.price}</p>
                <Link to={`/product/${firstItem.id}`}>
                  <button className='bg-brand-2 text-brand-6 rounded-3xl pl-10 pr-10 text-xl lg:text-2xl pt-0 pb-0'>Ver producto - &gt; </button>
                </Link>
              </>
            )}
          </div>
        </div>
        <div className='mt-5 mb-5'>
          <div className="flex justify-center space-x-4">
            {categories.map((category, index) => (
              <p
                key={index}
                onClick={() => handleCategoryClick(category)}
                className={`text-xl md:text-2xl cursor-pointer ${category === selectedCategory ? 'underline underline-offset-8' : ''}`}
              >
                {category}
              </p>
            ))}
          </div>
          <div className='flex justify-center mt-3 flex-wrap'>
            {categoryItems.map((item, index) => (
              <CardItem key={index} id={item.id} name={item.name} photo={item.photo} price={item.price} />
            ))}
          </div>
          <p className='underline underline-offset-8 text-xl md:text-2xl text-right mr-20'><a className='text-brand-6' href={'/category/' + selectedCategory}>Ver más - &gt;</a></p>
        </div>
        <div className='flex flex-col items-center justify-center bg-bgHome text-brand-1 pt-32 pb-32'>
          <h1 className='text-4xl md:text-8xl mb-2'>TETO</h1>
          <p className='text-2xl md:text-2xl'>La mejor forma de vestirte y apoyar a los nuestros</p>
        </div>
        <div className='mt-7 mb-7'>
          <h1 className='text-center mb-5'>TIENDAS</h1>
          <div className="mt-3 w-full md:w-max h-full mx-auto text-center">
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-8 max-w-3x2 mx-auto">
              {
                stores.map((val, key) => {
                  return (
                    <div key={val.id} className='text-brand-1'>
                      <CardBrandsSearch id_brand={val.id} name_brand={val.name} description_brand={val.description} address_brand={val.city} phone_brand={val.phone_number} image_brand={val.logo} />
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
        <p className='underline underline-offset-8 text-xl md:text-2xl text-right mr-20 mb-8'><a className='text-brand-6' href='/brand-search'>Ver más - &gt;</a></p>
      </div>
    </Layout>
  );
};

export default Home;