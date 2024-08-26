import { Routes, Route, BrowserRouter, Navigate, Outlet } from "react-router-dom";
import { useSelector } from 'react-redux'
import ShoppingCartPage from "./pages/shopping-cart-page";
import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'
import RegisterBrand from './pages/register-brand'
import BrandUser from './pages/brand-user'
import Search from './pages/search'
import SearchCategory from "./pages/search-category";
import RegisterProduct from "./pages/product-register";
import BrandsSearch from "./pages/brands-search";
import BrandPageBrand from "./pages/brandpage-brand";
import BrandPageProfile from "./pages/brandpage-profile";
import UserPageProfile from "./pages/userpage-profile";
import Product from "./pages/product";
import Favorites from "./pages/favorites";
import AboutUs from "./pages/about-us";
import PaymentSuccess from "./pages/payment-success";
import Contact from "./pages/contact";
import ActivateAdvertisement from "./pages/activate-advertisement";
import ActivateAccount from "./pages/activate-account";
import Terminos from "./pages/terms";
import Manual from "./pages/manual";
import Faq from "./pages/faq";


const PrivateRoutes = () => {
  const { isAuth } = useSelector(state => state.auth);
  return <>{isAuth ? <Outlet /> : <Navigate to='/login' />}</>
}

const RestrictedRoutes = () => {
  const { isAuth } = useSelector(state => state.auth)
  return <>{!isAuth ? <Outlet /> : <Navigate to='/' />}</>
}

const InactiveRoutes = () => {
  const { role } = useSelector(state => state.auth);
  return <>{role == "inactive" ? <Navigate to='/activate-advertisement' /> : <Outlet />}</>
}

const UserRoutes = () => {
  const { role } = useSelector(state => state.auth);
  return <>{role == "brand" ? <Navigate to='/' /> : (role == "inactive" ? <Navigate to='/activate-advertisement' /> : <Outlet />)}</>
}

const BrandRoutes = () => {
  const { role } = useSelector(state => state.auth);
  return <>{role == "user" ? <Navigate to='/' /> : (role == "inactive" ? <Navigate to='/activate-advertisement' /> : <Outlet />)}</>
}

const MobileRoutes = () => {
  return <>{window.innerWidth > 1040 ? <Navigate to='/' /> : <Outlet />}</>
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/brand/:idbrand' element={<BrandUser />} /> {/* perfil de la marca desde usuario */}
          <Route path='/brand-search' element={<BrandsSearch />} /> {/* vista para ver las marcas disponibles */}
          <Route path="/category/:category" element={<SearchCategory />} />
          <Route path='/search' element={<Search />} />
          <Route path='/product/:product_id' element={<Product />} />
          <Route path='/about-us' element={<AboutUs />} />
          <Route path='contact' element={<Contact />} />
          <Route path='/terminos' element={<Terminos />} />
          <Route path='/manual' element={<Manual />} />
          <Route path='/faq' element={<Faq />} />

          <Route element={<PrivateRoutes />}>

            <Route path="/activate-account" element={<ActivateAccount />} />
            <Route path="/activate-advertisement" element={<ActivateAdvertisement />} />

            <Route element={<UserRoutes />}>
              <Route path='/userpage-profile' element={<UserPageProfile />} />
              <Route path='/favorites' element={<Favorites />} />
              <Route path='/success' element={<PaymentSuccess />} />
            </Route>

            <Route element={<BrandRoutes />}>
              <Route path='/product-register' element={<RegisterProduct />} />
              <Route path='/brandpage-brand' element={<BrandPageBrand />} />
              <Route path='/brandpage-profile' element={<BrandPageProfile />} />
            </Route>

          </Route>

          <Route element={<RestrictedRoutes />}>
            <Route path='/register' element={<Register />} />
            <Route path='/register-brand' element={<RegisterBrand />} />
            <Route path='/login' element={<Login />} />
          </Route>

          <Route element={<MobileRoutes />}>
            <Route path="/shopping-cart" element={<ShoppingCartPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
