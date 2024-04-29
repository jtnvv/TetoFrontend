import { createSlice } from '@reduxjs/toolkit'

const userAuthFromLocalStorage = () => {
  const isAuth = localStorage.getItem('isAuth')
  if(isAuth && JSON.parse(isAuth) === true){
    return true
  }
  return false
}

const getRoleFromLocalStorage = () => {
  return localStorage.getItem('role');
};

const initialState = {
  isAuth: userAuthFromLocalStorage(),
  role: getRoleFromLocalStorage()
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticateUser:(state)=>{
        state.isAuth = true,
        state.role = getRoleFromLocalStorage()
    },
    unauthenticateUser:(state)=>{
      state.isAuth = false,
      state.role = null
    }
  },
})

export const {authenticateUser, unauthenticateUser} = authSlice.actions

export default authSlice.reducer