import { useState } from "react"
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FaFileUpload, FaShoppingCart, FaSearch, FaUserCircle, FaHeart } from "react-icons/fa";

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
    <nav className="bg-brand-6 p-3 font-default">
      <div className="mx-auto flex justify-between items-center">
        <div className="flex items-center font-logo">
          <img src="/favicon.svg" alt="Logo" className="h-14 w-14 mr-2" />
          {role === 'brand' ? (<>
          <div className=' flex flex-col'>
          <span className="text-brand-1 font-semibold text-5xl">TETO </span>
          <span className="text-brand-1 font-semibold text-3xl">marcas</span> </div></>):(<span className="text-brand-1 font-semibold text-5xl">TETO</span>)}

        </div>
        <div className="flex items-center space-x-4">

          {location.pathname == '/brandpage-brand' ? (
            <>
              <a href="/" className="text-brand-1 hover:text-gray-300 ">Sobre Nosotros</a>
              <a href="/product-register" className='flex items-center space-x-2'>
                <FaFileUpload color="white" size="2em" />
                <span className="text-brand-1 hover:text-gray-300">Agregar productos</span>
              </a>

              <a href="/" className='flex items-center space-x-2'>
                <FaShoppingCart color="white" size="2em" />
                <span className="text-brand-1 hover:text-gray-300">Pedidos</span>
              </a>
            </>) :

            (<><a href="/" className="text-brand-1 hover:text-gray-300">Inicio</a>
              <a href="/brand-search" className="text-brand-1 hover:text-gray-300">Marcas</a>
              <a href="#" className="text-brand-1 hover:text-gray-300">Sobre Nosotros</a>
              <a href="/search"><button className="flex bg-brand-1 bg-opacity-25 rounded-full pt-2 pb-2 items-center justify-center"><p className="text-xs text-brand-1">Buscar producto por marca, colección</p><FaSearch color="white" size="1.5em" className="pl-2" /></button></a>


              <a href={link}><FaUserCircle color="white" size="2em" className="pl-2" /></a>
              <a href="#"><FaHeart color="white" size="2em" className="pl-2" /></a>
              <div className="static" id="shopping-cart-icon" >
                <a 
                className="cursor-pointer" 
                onClick={(event) => {
                  handleIsShoppingCartOpen(!isShoppingCartOpen);
                  event.preventDefault();
                }} 
                id="shopping-cart-icon" 
                href="/shopping-cart">
                  <FaShoppingCart color="white" size="2.5em" className="pl-2 pr-2" id="shopping-cart-icon" />
                </a>
                {isShoppingCartOpen && (
                  <ShoppingCart showShoppingCart={handleIsShoppingCartOpen} />
                )}
              </div></>)}
        </div>
      </div>
    </nav>
  )
}