import { Routes, Route, BrowserRouter, Navigate, Outlet } from "react-router-dom";

import Home from './pages/home'
import Login from './pages/login'
import Dashboard from './pages/dashboard'
import Register from './pages/register'
import RegisterBrand from './pages/register-brand'
import BrandUser from './pages/brand-user'

import { useSelector } from 'react-redux'
import BrandsSearch from "./pages/brands-search";

const PrivateRoutes = () => {
  const { isAuth } = useSelector(state => state.auth)
  return <>{isAuth ? <Outlet /> : <Navigate to='/login' />}</>
}

const RestrictedRoutes = () => {
  const { isAuth } = useSelector(state => state.auth)
  return <>{!isAuth ? <Outlet /> : <Navigate to='/dashboard' />}</>
}


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* aqui entra gente de cualquier tipo menos Abcdo, para Abcedo esta .|. */}
          <Route path='/' element={<Home />} />
          <Route path='/brand' element={<BrandUser />} /> {/* perfil de la marca desde usuario */}
          <Route path='/brandsSearch' element={<BrandsSearch />} /> {/* vista para ver las marcas disponibles */} 
          {/* aqui solo hay gente loggeada */}
          <Route element={<PrivateRoutes />}>
            <Route path='/dashboard' element={<Dashboard />} />
          </Route>

          {/* aqui solo gente sin logear */}
          <Route element={<RestrictedRoutes />}>
            <Route path='/register' element={<Register />} />
            <Route path='/registerBrand' element={<RegisterBrand />} />
            <Route path='/login' element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>



    </>
  )
}

export default App
