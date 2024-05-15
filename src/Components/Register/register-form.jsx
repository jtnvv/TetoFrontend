import React, { useState } from "react";
import { onRegistration } from '../../api/auth'
import { useNavigate } from 'react-router-dom'


const RegisterForm = () => {

  const navigate = useNavigate()

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
        alert(data.message);
        setError('')
        setSuccess(data.message)
        //setState({ name:'',email: '', password: '' })
        navigate("/login")
      } catch (err) {
        setError(err.response.data.error)

        alert("USUARIO NO CREADO: " + err.response.data.error)
        setSuccess('')
      }

    } else {

      alert("USUARIO NO CREADO");
    }
  }

  return (

    <div className="bg-white rounded-lg shadow-lg p-20 max-w-x1 mx-auto"  >

      <div className="flex items-center justify-center mb-20 ">
        <img className="w-20 mx-5 " src="https://raw.githubusercontent.com/jtnvv/TetoFrontend/main/src/assets/TetoLogo.png" alt='Teto Logo' />
        <h1 className="text-5xl font-bold text-center text-gray-700  font-default"  >TETO</h1>
      </div>



      <form className="space-y-16" onSubmit={handleSubmit}>

        <div>
          <label className="block text-gray-700 font-bold mb-2 font-default text-left text-lg " htmlFor="name">
            Nombre
          </label>
          <input className="block w-96 py-2.3 px-3 text-sm text-gray-700 bg-transparent border-0 border-b-2 border-gray-300  focus_outline-non" id="name" name="name" onChange={handleInput}
            type="text" />
          {errors.name && <span className="text-danger text-red-800 text-left block w-96 mt-1 text-sm">{errors.name}</span>}

        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-2 font-default text-left text-lg" htmlFor="email">
            Correo Electronico
          </label>
          <input className="block w-96 py-2.3 px-3 text-sm text-gray-700 bg-transparent border-0 border-b-2 border-gray-300 apparance-none  focus_outline-non" id="email" name="email" onChange={handleInput}
            type="email" />
          {errors.email && <span className="text-danger text-red-800 text-left block w-96 mt-1 text-sm">{errors.email}</span>}
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-2 font-default text-left text-lg" htmlFor="password">
            Contraseña
          </label>
          <input className="block w-96 py-2.3 px-3 text-sm text-gray-700 bg-transparent border-0 border-b-2 border-gray-300 apparance-none focus_outline-non" id="password" name="password" onChange={handleInput}
            type="password" />
          {errors.password && <span className="text-danger text-red-800 text-left block w-96 mt-1 text-sm">{errors.password}</span>}
        </div>
        <div >
          <button className="w-full bg-brand-2 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded-lg mt-10">
            Registrarse
          </button>
        </div>
        <div className="text-black font-default">
          ¿Eres una marca? <a href="/register-brand">Regístrate aquí</a>

        </div>
      </form>
    </div>

  )
}

export default RegisterForm
