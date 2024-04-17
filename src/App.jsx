import { Routes, Route, BrowserRouter, Navigate, Outlet } from "react-router-dom";
import { useSelector } from 'react-redux'
import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'
import RegisterBrand from './pages/register-brand'
import BrandUser from './pages/brand-user'
import Search from './pages/search'
import SearchCategory from "./pages/search-category";
import RegisterProduct from "./pages/product-register";
// import ErrorPage from "./pages/error-page";
import BrandsSearch from "./pages/brands-search";
import Product from "./pages/product";


const PrivateRoutes = () => {
  const { isAuth } = useSelector(state => state.auth);
  return <>{isAuth ? <Outlet /> : <Navigate to='/login' />}</>
}

const RestrictedRoutes = () => {
  const { isAuth } = useSelector(state => state.auth)
  return <>{!isAuth ? <Outlet /> : <Navigate to='/' />}</>
}

const UserRoutes = () => {
  const { role } = useSelector(state => state.auth);
  return <>{role == "brand" ? <Navigate to='/' /> : <Outlet /> }</>
}

const BrandRoutes = () => {
  const { role } = useSelector(state => state.auth);
  return <>{role == "user" ? <Navigate to='/' /> : <Outlet /> }</>
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="*" element={<ErrorPage />}/> */}
          <Route path='/' element={<Home />} />
          <Route path='/brand/:idbrand' element={<BrandUser />} /> {/* perfil de la marca desde usuario */}
          <Route path='/brand-search' element={<BrandsSearch />} /> {/* vista para ver las marcas disponibles */}
          <Route path="/category/:category" element={<SearchCategory />} />
          <Route path='/search' element={<Search />} />
          <Route path='/product/:product_id' element={<Product />} />
          
          <Route element={<PrivateRoutes />}>
            <Route element={<UserRoutes />}>
            </Route>
            <Route element={<BrandRoutes />}>
              <Route path='/product-register' element={<RegisterProduct />} />
            </Route>
          </Route>

          <Route element={<RestrictedRoutes />}>
            <Route path='/register' element={<Register />} />
            <Route path='/register-brand' element={<RegisterBrand />} />
            <Route path='/login' element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
