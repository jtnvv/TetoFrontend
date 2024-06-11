import React, { useState } from "react";
import { onLogin, sendRecoveryEmail } from "../../api/auth";
import { useDispatch } from "react-redux";
import { authenticateUser } from "../../redux/slices/authSlice";
import BackButton from "../Layout/back-button";
import { useContext } from "react";
import { RecoveryContext } from "../../pages/login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginForm() {
  const { setPage, setOTP, setEmail } = useContext(RecoveryContext);
  const inputStyle = "w-full block py-2 px-3 text-sm text-gray-700 bg-transparent border-0 border-b-2 border-gray-300 focus:border-brand-6 focus:outline-none focus:ring-0";

  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [error1, setError1] = useState(false);
  const [success, setSuccess] = useState()
  //Errores
  const [errors, setError] = useState({});

  const validation = () => {
    //Errores
    const error = {};
    error.password = "";
    error.email = "";

    // Expresión regular para validar el correo electrónico
    let emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(values.email)) {
      error.email = "El correo electrónico no es válido.";
    }

    // La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(values.password)) {
      error.password =
        "contraseña incorrecta";
    }
    return error;
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();
    let errorL = validation(values);
    setError(errorL);
    if (errorL.password === "" && errorL.email === "") {
      try {
        const res = await onLogin(values);
        localStorage.setItem("isAuth", "true");
        localStorage.setItem("role", res.data.role);
        dispatch(authenticateUser());
        setError('')
        setSuccess(res.message)
      } catch (err) {
        toast.error("Revisa el email y contraseña introducidos", {
          position: "top-right",
        });
        setError(err.response.data.errors[0].msg);
        setSuccess('')
      }
    }
  };
  const toastError = () => {
    toast.error("Email incorrecto", {
      position: "top-right",
    });
  }
  async function nagigateToOtp() {
    if (values.email) {
      const OTP = Math.floor(Math.random() * 9000 + 1000);
      setOTP(OTP);
      try {
        await sendRecoveryEmail({
          OTP,
          recipient_email: values.email,
        });
        setPage("otp");
      } catch (error) {
        toastError();
        return;
      }
      setEmail(values.email);
      return;
    }

    toast.error("Introduce el email", {
      position: "top-right",
    });
    return;
  }

  return (
    <div className="flex flex-col bg-white rounded-lg shadow-lg responsive:p-14 p-10 pt-20 responsive:w-[30rem] w-screen responsive:h-max min-h-screen h-full responsive:min-h-max justify-center text-center">
      <ToastContainer />
      <div className="flex items-center justify-center mb-12 ">
        <img
          className="w-20 mx-5 "
          src="https://raw.githubusercontent.com/jtnvv/TetoFrontend/main/src/assets/TetoLogo.png"
          alt="Teto Logo"
        />
        <h1 className="text-6xl font-bold text-center text-brand-6 font-logo">
          TETO
        </h1>
      </div>

      <BackButton />
      <form
        className="space-y-8 flex flex-col items-center responsive:block w-full"
        onSubmit={(e) => onSubmit(e)}
      >
        <div className="w-full">
          <label
            className="block text-brand-6 font-bold mb-2 font-default text-left text-lg"
            htmlFor="email"
          >
            Correo Electrónico
          </label>
          <input
            onChange={(e) => onChange(e)}
            className={inputStyle}
            id="email"
            name="email"
            value={values.email}
            placeholder="correo@gmail.com"
            required
          />
          {errors.email && <span className="text-danger text-red-800 text-left block w-96 mt-1 text-sm">{errors.email}</span>}
        </div>

        <div className="mb-3 w-full">
          <label
            htmlFor="password"
            className="block text-brand-6 font-bold mb-2 font-default text-left text-lg"
          >
            Contraseña
          </label>
          <input
            onChange={(e) => onChange(e)}
            type="password"
            value={values.password}
            className={inputStyle}
            id="password"
            name="password"
            placeholder="Contraseña"
            required
          />

          {errors.password && <span className="text-danger text-red-800 text-left block w-96 mt-1 text-sm">{errors.password}</span>}
        </div>

        <div className="font-default flex flex-col justify-center">
          <button
            type="submit"
            className="w-full bg-brand-2 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded-lg mt-1 mb-7"
          >
            Iniciar Sesion
          </button>
          <p className="text-brand-6">
            ¿Olvidaste tu contraseña? &nbsp;
            <a href="#" onClick={() => nagigateToOtp()} className="text-brand-6 underline">
              Haz clic aquí
            </a>
          </p>
        </div>

        <div className="text-black font-default">
          <p>¿No tienes una cuenta?</p>
          <p>Registrate como <a href="/register" className="text-brand-6 underline">cliente</a> o como <a href="/register-brand" className="text-brand-6 underline">marca</a></p>
        </div>
      </form>
    </div>
  );
}
