import React, { useState } from "react"
import { useDispatch } from 'react-redux'
import { onLoginStore } from "../api/auth";
import { authenticateUser } from '../redux/slices/authSlice'


const LoginForm = () => {

    const [state, setState] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState({})

    

    const handleInput = (event) => {
        
        setState({
          ...state,
          [event.target.name]: event.target.value
         });
        

    }

    const dispatch = useDispatch()
    const onSubmit = async (e) => {
        e.preventDefault()
        
        try {
            await onLoginStore(state)
            dispatch(authenticateUser())

            localStorage.setItem('isAuth', 'true')
            alert("inicio de sesion exitoso")

        } catch (err) {

            console.log(err.response.data.errors[0].msg)
            setError(err.response.data.errors[0].msg)
            alert(err.response.data.errors[0].msg)
           
        }

    }

    return (
        <div className="h-screen flex">
        {/* Image Section */}
        <div className="w-3/5 bg-cover bg-center relative " style={{backgroundImage: `url(../src/assets/imgLoginFormBrand.png)`}}>
            <div className="absolute bottom-0 left-0 right-0 text-white text-center mb-40">
                <p>
                    <a href="#" className="underline text-white">Términos y condiciones</a>
                </p>
                </div>
        </div>
        {/* Login Form Section */}
        <div className="w-2/5 flex  items-center  p-10 ">
            <form className="space-y-10 w-full max-w-full mx-auto p-16" onSubmit={onSubmit} >
                
                <div className="flex items-center  mb-1 ">
                    <img className="w-20 mx-0 " src="../src/assets/TetoLogo.png" alt='Teto Logo'/>
                    <h1  className="text-20xl font-bold text-left text-gray-700  mx-5 font-inknut"  >TETO</h1>
                </div>

                <div>
                    <label className="block text-gray-700 font-bold mb-8 font-inknut text-left text-lg"  htmlFor="email">
                        Correo Electronico
                    </label>
                    <input className="block w-full py-2.3 px-3 text-sm text-gray-700 bg-transparent border-0 border-b-2 border-gray-300 apparance-none  focus_outline-non" id="email" name="email"
                        onChange={handleInput} 
                        type="email"/>
                    
                </div>
                
                
                <div>
                    <label className="block text-gray-700 font-bold mb-8 font-inknut text-left text-lg"  htmlFor="password">
                        Contraseña
                    </label>
                    <input className="block w-full py-2.3 px-4 text-sm text-gray-700 bg-transparent border-0 border-b-2 border-gray-300 apparance-none focus_outline-non" id="password" name="password"
                        onChange={handleInput} 
                        type="password"/>
                    
                </div>
                <div >
                    <button className="w-full bg-brand-2 hover:bg-purple-900 text-black font-bold py-2 px-6 rounded-lg mt-8">
                    Iniciar sesión
                    </button>
                </div>
                {/* Forgot password link */}
                <p className="text-gray-700 font-bold text-left">
                    ¿Olvidaste la contraseña?  
                    <a href="#" className="underline text-black"> Haz click aquí</a>
                    <br />
                    <br />
                    ¿no tienes cuenta?
                    <br />
                
                    
                    Registrate como  <a href="Register" className="underline text-black"> cliente</a> o  <a href="registerBrand" className="underline text-black"> marca</a>
                    
                   
                </p>

                
                
                
                    
                </form>
        </div>
        </div>
    
    );
};

export default LoginForm;
