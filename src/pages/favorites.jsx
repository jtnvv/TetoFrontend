import { useEffect, useState } from "react"
import Layout from "../Components/Layout/layout"
import { getFavorites } from "../api/item";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Product from "../Components/Favorites/product";

export default function Favorites() {
  const [favoritesList, setFavoritesList] = useState(false);
  const updateList = async (event) => {
    await getFavorites().then(res => {
      Object.keys(res.data.items).length === 0 && setFavoritesList(false);
    });
  };

  useEffect(() => {
    const getUserFavorites = async () => {
      await getFavorites()
      .then(res => {
        Object.keys(res.data.items).length !== 0 && setFavoritesList(res.data.items);
      })
      .catch(err => toast.error(err.message));
    };
    getUserFavorites();
  }, []);

  return (
    <Layout>
      <ToastContainer />
      <div className="flex justify-center responsive:max-h-screen responsive:min-h-screen max-h-max">
        <img src="https://firebasestorage.googleapis.com/v0/b/teto-6d5a7.appspot.com/o/image-18.webp?alt=media&token=62e0c07e-96cb-476c-a0f3-83ac534df94e" alt="banner" className='hidden responsive:block w-4/12' />
        <div className={"flex flex-col responsive:m-10 m-5 flex-1 overflow-hidden" + (!favoritesList && (' justify-center'))}>
          <h1 className="responsive:text-5xl text-3xl flex flex-col items-center space-y-16 text-center">
            {favoritesList ? (
              'Tus articulos favoritos'
            ):(
              <>
              <p>
                No tienes articulos seleccionados como favoritos. <a href="/" className="underline"> Haz click aquí para explorar!</a>
              </p>
              <img src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExaGY0cnM5cWs5NWtnNm4yNGk4cXl6NnN0azJmNDdtamVocmM4ZjlyNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/5oYgxQKHhEjEk/giphy.gif" alt="dance image" className="w-60 h-48" />
              </>
            )}
          </h1>
          <div onAnimationEnd={(event) => updateList(event)} className="flex flex-col responsive:mt-5 mt-8 space-y-8 responsive:overflow-y-scroll overflow-x-hidden responsive:p-10 items-center">
            {favoritesList && favoritesList.map(item => {
              return (
                <Product key={item.id} id={item.id} name={item.name} photo={item.photo} price={item.price}/>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  )
}
