import React, { useState } from "react";
import { onRegistration } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterForm = () => {
  const navigate = useNavigate();
  const inputStyle =
    "w-full block py-2 px-3 text-sm text-gray-700 bg-transparent border-0 border-b-2 border-gray-300  focus:border-brand-6 focus:outline-none focus:ring-0";
  const [errorsMessages, setErrorMessages] = useState({});
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const setUserDataOnInputChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await onRegistration(userData);
      toast.success("Registro Exitoso", { position: "top-right" });
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 3000);
    } catch (error) {
      const errorResponse = error.response.data.errors;
      const errorMessages = {};
      errorResponse.forEach((error) => {
        errorMessages[error.path] = error.msg;
      });
      setErrorMessages(errorMessages);
      toast.error("Un error ha ocurrido", { position: "top-right" });
    }
  };

  return (
    <div className="flex flex-col bg-white rounded-lg shadow-lg responsive:p-14 p-10 pt-20 responsive:w-[30rem] w-screen responsive:h-max min-h-screen h-full responsive:min-h-max justify-center text-center">
      <ToastContainer />
      <div className="flex items-center justify-center mb-12">
        <img
          className="w-20 mx-5 "
          src="https://raw.githubusercontent.com/jtnvv/TetoFrontend/main/src/assets/TetoLogo.png"
          alt="Teto Logo"
        />
        <h1 className="text-6xl font-bold text-center text-brand-6 font-logo">
          TETO
        </h1>
      </div>

      <form
        className="space-y-8 flex flex-col items-center responsive:block"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col w-full">
          <label
            className="block text-brand-6 font-bold mb-2 font-default text-left text-lg "
            htmlFor="name"
          >
            Nombre de usuario
          </label>
          <input
            className={inputStyle}
            id="name"
            name="name"
            onChange={setUserDataOnInputChange}
            type="text"
            placeholder="Nombre"
          />
          {errorsMessages.name && (
            <span className="text-danger text-red-800 text-left block w-96 mt-1 text-sm">
              {errorsMessages.name}
            </span>
          )}
        </div>
        <div className="flex flex-col w-full">
          <label
            className="block text-brand-6 font-bold mb-2 font-default text-left text-lg"
            htmlFor="email"
          >
            Correo Electrónico
          </label>
          <input
            className={inputStyle}
            id="email"
            name="email"
            onChange={setUserDataOnInputChange}
            type="email"
            placeholder="ejemplo@gmail.com"
          />
          {errorsMessages.email && (
            <span className="text-danger text-red-800 text-left block w-96 mt-1 text-sm">
              {errorsMessages.email}
            </span>
          )}
        </div>
        <div className="flex flex-col w-full">
          <label
            className="block text-brand-6 font-bold mb-2 font-default text-left text-lg"
            htmlFor="password"
          >
            Contraseña
          </label>
          <input
            className={inputStyle}
            id="password"
            name="password"
            onChange={setUserDataOnInputChange}
            type="password"
            placeholder="***********"
          />
          {errorsMessages.password && (
            <span className="text-danger text-red-800 text-left block w-96 mt-1 text-sm">
              {errorsMessages.password}
            </span>
          )}
        </div>
        <div className="flex text-brand-6 responsive:text-start">
          <input
            type="checkbox"
            className="mr-2 before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
            required
          />
          <p className="m-0 text-start">
            He leido y acepto los{" "}
            <a href="/terminos" className="text-brand-6 underline">
              Terminos y condiciones
            </a>
          </p>
        </div>
        <div className="flex flex-col">
          <button className="w-full bg-brand-2 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded-lg mt-2">
            Registrarse
          </button>
        </div>
        <div className="text-black font-default">
          ¿Eres una marca?{" "}
          <a href="/register-brand" className="text-brand-6 underline">
            Regístrate aquí
          </a>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
