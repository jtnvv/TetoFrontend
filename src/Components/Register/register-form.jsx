import React, { useState } from "react";
import { onRegistration } from '../../api/auth'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const RegisterForm = () => {

  const navigate = useNavigate()
  const inputStyle = "w-full block py-2 px-3 text-sm text-gray-700 bg-transparent border-0 border-b-2 border-gray-300  focus:border-brand-6 focus:outline-none focus:ring-0";
  //Variables del usuario
  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
  });

  //Errores
  const [errors, setError] = useState({

  })

  //Validación de contraseña y nombre

  const validation = (values) => {

    //Errores
    const error = {};
    error.password = "";
    error.name = "";
    error.email = "";
    // Validar que el nombre no esté vacío
    if (!state.name.trim()) {
      error.name = "El nombre no puede estar vacío.";
    }

    // Expresión regular para validar el correo electrónico
    let emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(state.email)) {
      error.email = "El correo electrónico no es válido.";
    }

    // La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(state.password)) {
      error.password = "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número.";
    }
    return error


  }

  //capturar datos

  const handleInput = (event) => {

    setState({
      ...state,
      [event.target.name]: event.target.value
    });


  }
  const [success, setSuccess] = useState()

  //Submit al formulario

  const handleSubmit = async (event) => {
    event.preventDefault();

    //actualizar los errores y validar
    let errorL = validation(state)
    setError(errorL)


    if (errorL.name === "" && errorL.password === "" && errorL.email === "") {

      //añadir función de registro aqui, pues no se ha encontrado errores 

      try {
        const { data } = await onRegistration(state)
      
        setError('')
        setSuccess(data.message)
        toast.success("Registro Exitoso", {
          position: "top-right",
        });
        setTimeout(() => {
          navigate("/login")
        }, 3000); 
      } catch (err) {
        setError(err.response.data.error)

        toast.error("Esta cuenta ya existe", {
          position: "top-right",
        });
        setSuccess('')
      }

    } else {

      toast.error("Campos no validos", {
        position: "top-right",
      });
    }
  }

  return (

    <div className="flex flex-col bg-white rounded-lg shadow-lg responsive:p-14 p-10 pt-20 responsive:w-[30rem] w-screen responsive:h-max min-h-screen h-full responsive:min-h-max justify-center text-center">
      <ToastContainer />
      <div className="flex items-center justify-center mb-12">
        <img className="w-20 mx-5 " src="https://raw.githubusercontent.com/jtnvv/TetoFrontend/main/src/assets/TetoLogo.png" alt='Teto Logo' />
        <h1 className="text-6xl font-bold text-center text-brand-6 font-logo"  >TETO</h1>
      </div>


      <form className="space-y-8 flex flex-col items-center responsive:block" onSubmit={handleSubmit}>

        <div className="flex flex-col w-full">
          <label className="block text-brand-6 font-bold mb-2 font-default text-left text-lg " htmlFor="name">
            Nombre de usuario
          </label>
          <input className={inputStyle} id="name" name="name" onChange={handleInput}
            type="text" placeholder="Nombre" required />
          {errors.name && <span className="text-danger text-red-800 text-left block w-96 mt-1 text-sm">{errors.name}</span>}

        </div>
        <div className="flex flex-col w-full">
          <label className="block text-brand-6 font-bold mb-2 font-default text-left text-lg" htmlFor="email">
            Correo Electrónico
          </label>
          <input className={inputStyle} id="email" name="email" onChange={handleInput}
            type="email" placeholder="ejemplo@gmail.com" required />
          {errors.email && <span className="text-danger text-red-800 text-left block w-96 mt-1 text-sm">{errors.email}</span>}
        </div>
        <div className="flex flex-col w-full">
          <label className="block text-brand-6 font-bold mb-2 font-default text-left text-lg" htmlFor="password">
            Contraseña
          </label>
          <input className={inputStyle} id="password" name="password" onChange={handleInput}
            type="password" placeholder="***********" required />
          {errors.password && <span className="text-danger text-red-800 text-left block w-96 mt-1 text-sm">{errors.password}</span>}
        </div>
        <div className="flex text-brand-6 responsive:text-start">
          <input type="checkbox" className="mr-2 before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10" required />
          <p className="m-0 text-start">He leido y acepto los <a href="/terminos" className="text-brand-6 underline">Terminos y condiciones</a></p>
        </div>
        <div className="flex flex-col">
          <button className="w-full bg-brand-2 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded-lg mt-2">
            Registrarse
          </button>
        </div>
        <div className="text-black font-default">
          ¿Eres una marca? <a href="/register-brand" className="text-brand-6 underline">Regístrate aquí</a>

        </div>
      </form>
    </div>

  )
}

export default RegisterForm