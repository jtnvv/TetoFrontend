import { useState } from 'react'
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import './App.css'

import Register from './Components/Register'

function App() {
  const [count, setCount] = useState(0)

  

  return (
    <>
      
      <Routes>  
      
        <Route exact path="/register" element={<Register />} /> 

      </Routes>
      
    
      
    </>
  )
}

export default App
