import { useState } from "react"
import { useSelector } from 'react-redux'
import { FaFileUpload, FaShoppingCart, FaSearch, FaUserCircle, FaHeart, FaSignOutAlt, FaBars } from "react-icons/fa";
import { onLogout } from "../../api/auth";
import { useDispatch } from "react-redux";
import ShoppingCart from "../Shopping Cart/shopping-cart";
import { unauthenticateUser } from '../../redux/slices/authSlice.js'

export default function Header() {

  const [isShoppingCartOpen, setIsShoppingCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { role } = useSelector(state => state.auth);
  const { isAuth } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  let link;

  if (isAuth && role === 'brand') {
    link = "/brandpage-brand";
  } else if (isAuth && role === 'user') {
    link = "/userpage-profile";
  } else {
    link = "/login";
  }
  const handleLogout = async () => {
    await onLogout();
    localStorage.removeItem('isAuth');
    localStorage.removeItem('role');
    dispatch(unauthenticateUser());
    window.location.href = '/login';
  };
  const handleIsShoppingCartOpen = (state) => {
    setIsShoppingCartOpen(state);
  };

  return (
    <nav className="bg-brand-6 p-3 font-default sticky top-0 w-full z-50 min-h-24">
      <div className="mx-auto flex justify-between items-center">

        {/* Logo */}
        <div className="flex items-center font-logo cursor-pointer" onClick={() => window.location.href = "/"}>
          <img src="/favicon.svg" alt="Logo" className="h-14 w-14 mr-2" />
          {role === 'brand' ? (<>
            <div className=' flex flex-col'>
              <span className="text-brand-1 font-semibold text-5xl">TETO </span>
              <span className="text-brand-1 font-semibold text-3xl">marcas</span> </div></>) : (<span className="text-brand-1 font-semibold text-5xl">TETO</span>)}

        </div>

        <button className={"responsive:hidden p-0 focus:outline-none transition-transform duration-700" + (!isMobileMenuOpen && (" rotate-180"))} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} >
          <FaBars size="2em" />
        </button>

        {/* Menú */}
        <div className={"h-screen responsive:h-full responsive:static absolute right-0 left-0 top-24 responsive:bg-transparent bg-brand-6 p-5 flex responsive:flex-row flex-col responsive:space-y-0 space-y-5 items-center responsive:space-x-4 transition-transform duration-500 ease-in-out responsive:translate-x-0" + (!isMobileMenuOpen && (" translate-x-[110%]"))} >

          {role === 'brand' ? (
            <>
              <a href="/about-us" className="flex text-brand-1 hover:text-gray-300 responsive:w-auto w-full justify-center">Sobre Nosotros</a>
              <a href="/product-register" className='flex items-center space-x-2 responsive:w-auto w-full justify-center'>
                <FaFileUpload color="white" size="2em" />
                <span className="text-brand-1 hover:text-gray-300">Agregar productos</span>
              </a>

              <a href="/brandpage-profile" className='flex items-center space-x-2 responsive:w-auto w-full justify-center'>
                <FaShoppingCart color="white" size="2em" />
                <span className="text-brand-1 hover:text-gray-300">Pedidos</span>
              </a>

              <a href={link} className="flex items-center space-x-2 responsive:w-auto w-full justify-center">
                <FaUserCircle color="white" size="2em" />
                <span className="text-brand-1 hover:text-gray-300">Tu marca de ropa</span>
              </a>

              {isAuth && (
                <button onClick={handleLogout} className="flex items-center p-0 bg-brand-6 responsive:w-auto w-full justify-center">
                  <FaSignOutAlt color="white" size="2em" />
                  <span className="responsive:hidden pl-2">Cerrar sesión</span>
                </button>
              )}

            </>
          ) : (
            <>
              <a href="/search" className="flex responsive:hidden responsive:w-auto w-full justify-center">
                <button className="flex bg-brand-1 bg-opacity-25 rounded-full pt-2 pb-2 items-center justify-center">
                  <p className="text-xs text-brand-1">Buscar producto por marca, colección</p><FaSearch color="white" size="1.5em" className="pl-2" />
                </button>
              </a>
              <a href="/" className="flex text-brand-1 hover:text-gray-300 responsive:w-auto w-full justify-center">Inicio</a>
              <a href="/brand-search" className="flex text-brand-1 hover:text-gray-300 responsive:w-auto w-full justify-center">Marcas</a>
              <a href="/about-us" className="flex text-brand-1 hover:text-gray-300 responsive:w-auto w-full justify-center">Sobre Nosotros</a>
              <a href="/search" className="hidden responsive:block">
                <button className="flex bg-brand-1 bg-opacity-25 rounded-full pt-2 pb-2 items-center justify-center">
                  <p className="text-xs text-brand-1">Buscar producto por marca, colección</p><FaSearch color="white" size="1.5em" className="pl-2" />
                </button>
              </a>

              <div className="flex responsive:space-x-2 space-x-5 responsive:w-auto w-full justify-center">
                <a href={link}><FaUserCircle color="white" size="2em" className="responsive:pl-2" /></a>
                <a href="/favorites"><FaHeart color="white" size="2em" className="responsive:pl-2" /></a>

                <div className="static" id="flex shopping-cart-icon" >
                  <a
                    className="cursor-pointer"
                    onClick={(event) => {
                      handleIsShoppingCartOpen(!isShoppingCartOpen);
                      event.preventDefault();
                    }}
                    id="shopping-cart-icon"
                    href="/shopping-cart">
                    <FaShoppingCart color="white" size="2em" className="responsive:pl-2 responsive:mr-2" id="shopping-cart-icon" />
                  </a>
                  {isShoppingCartOpen && (
                    <ShoppingCart showShoppingCart={handleIsShoppingCartOpen} />
                  )}
                </div>

                {isAuth && (
                  <button onClick={handleLogout} className="responsive:block p-0 m-0 bg-brand-6">
                    <FaSignOutAlt color="white" size="2em" className="responsive:pl-2" />
                  </button>
                )}
              </div>

            </>
          )}
        </div>
      </div>
    </nav>
  )
}