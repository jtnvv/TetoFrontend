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
import ErrorPage from "./pages/error-page";
import BrandsSearch from "./pages/brands-search";


const PrivateRoutes = () => {
  const { isAuth } = useSelector(state => state.auth)
  return <>{isAuth ? <Outlet /> : <Navigate to='/login' />}</>
}

const RestrictedRoutes = () => {
  const { isAuth } = useSelector(state => state.auth)
  return <>{!isAuth ? <Outlet /> : <Navigate to='/' />}</>
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
          <Route path='/search' element={<Search />} />
          <Route path="/category/:category" element={<SearchCategory />} />

          <Route element={<PrivateRoutes />}>
            <Route path='/product-register' element={<RegisterProduct />} />
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
