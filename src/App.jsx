import { Routes, Route, BrowserRouter, Navigate, Outlet } from "react-router-dom";

import Home from './pages/home'
import Login from './pages/login'
import Dashboard from './pages/dashboard'
import Register from './pages/register'

import { useSelector } from 'react-redux'

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
          {/* aqui entra gente de cualquier tipo  */}
          <Route path='/' element={<Home />} />

          {/* aqui solo hay gente loggeada */}
          <Route element={<PrivateRoutes />}>
            <Route path='/dashboard' element={<Dashboard />} />
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
