import { useState } from "react"
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import ShoppingCart from "../Shopping Cart/shopping-cart";

export default function Header() {

  const [isShoppingCartOpen, setIsShoppingCartOpen] = useState(false);

  const { role } = useSelector(state => state.auth);
  const { isAuth } = useSelector(state => state.auth)
  const location = useLocation()

  let link;

  if (isAuth && role === 'brand') {
    link = "/brandpage-brand";
  } else if (isAuth && role === 'user') {
    link = "/userpage-profile";
  } else {
    link = "/login";
  }

  const handleIsShoppingCartOpen = (state) => {
    setIsShoppingCartOpen(state);
  };

  return (
    <nav className="bg-brand-6 p-3 font-inknut">
      <div className="mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src="/favicon.svg" alt="Logo" className="h-14 w-14 mr-2" />
          {role=='brand' ? (<>
          <div className=' flex flex-col'>
          <span className="text-brand-1 font-semibold text-5xl">TETO </span>
          <span className="text-brand-1 font-semibold text-3xl">marcas</span> </div></>):(<span className="text-brand-1 font-semibold text-5xl">TETO</span>)}

        </div>
        <div className="flex items-center space-x-4">

        {location.pathname=='/brandpage-brand' ? (
          <>
          <a href="/" className="text-brand-1 hover:text-gray-300 ">Sobre Nosotros</a>
          <a href="/product-register" className='flex items-center space-x-2'>
            <img src="../src/assets/AddFile.png" alt="Anhadir producto" />
                <span className="text-brand-1 hover:text-gray-300">Agregar productos</span>
          </a>

          <a href="/" className='flex items-center space-x-2'>
                <img src="../src/assets/iconCart.png" alt="Descripción de la imagen" />
                <span className="text-brand-1 hover:text-gray-300">Pedidos</span>
          </a>
          </> ):

          (<><a href="/" className="text-brand-1 hover:text-gray-300">Inicio</a>
          <a href="/brand-search" className="text-brand-1 hover:text-gray-300">Marcas</a>
          <a href="#" className="text-brand-1 hover:text-gray-300">Sobre Nosotros</a>
          <button className="flex bg-brand-1 bg-opacity-25 rounded-full pt-2 pb-2 items-center justify-center"><p className="text-xs text-brand-1">Buscar producto por marca, colección</p><img src="../src/assets/searchHeader.png" alt="profile" className="h-5 w-5 ml-2" /></button>


          <a href={link}><img src="../src/assets/profileHeader.png" alt="profile" className="h-7 w-7 mr-0" /></a>
          <a href="#"><img src="../src/assets/favoritesHeader.png" alt="favorites" className="h-8 w-8" /></a>
          <div className="static" >
            <a className="cursor-pointer" onClick={() => setIsShoppingCartOpen(!isShoppingCartOpen)} ><img src="../src/assets/shopHeader.png" alt="profile" className="h-7 w-7" /></a>
            {isShoppingCartOpen && (
              <ShoppingCart showShoppingCart={handleIsShoppingCartOpen}/>
            )}
          </div></>)}





        </div>
      </div>
    </nav>
  )
}