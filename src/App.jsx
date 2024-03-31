import { Routes, Route, BrowserRouter, Navigate, Outlet } from "react-router-dom";
import { useSelector } from 'react-redux'
import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'
import RegisterProduct from "./pages/product-register";
import ErrorPage from "./pages/error-page";

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
          <Route path="*" element={<ErrorPage />}/>
          {/* aqui entra gente de cualquier tipo menos Abcdo, para Abcedo esta .|. */}
          <Route path='/' element={<Home />} />

          {/* aqui solo hay gente loggeada */}
          <Route element={<PrivateRoutes />}>
            <Route path='/product-register' element={<RegisterProduct />} />
          </Route>

          {/* aqui solo gente sin logear */}
          <Route element={<RestrictedRoutes />}>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
