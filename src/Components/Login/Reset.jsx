import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { RecoveryContext } from "../../pages/login";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Reset() {
  const { email, otp, setPage } = useContext(RecoveryContext);
  const [values, setValues] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setError] = useState({});
  const validation = () => {
    //Errores
    const error = {};
    error.password="";
    error.confirmPassword="";

    // La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(values.password)) {
      error.password =
        "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número.";
    }
    let confirmPasswordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!confirmPasswordRegex.test(values.confirmPassword)) {
      error.confirmPasswordRegex =
        "La contraseña confirmada debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número.";
    }
    return error;
  };
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  function changePassword() {
    let errorL = validation();
    setError(errorL);
    if (errorL.password === "" && errorL.confirmPassword === "") {
      if (values.password === values.confirmPassword) {
        axios
          .post(import.meta.env.VITE_LOCAL_URL + "change-password", {
            pass: values.password,
            email: email,
          })
          .then(() => setPage("login"))
          .catch();
        setPage("reset");

        return;
      }
      toast.warn("las contraseñas no coinciden")
      return 
    }
    console.log(errorL)
    return 
  }

  return (
    <div>
      <section className="flex justify-center items-center w-screen h-screen bg-gray-50">
        <div className="bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
          <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
            <h2 className="block text-gray-700 font-bold mb-2 font-default text-left text-lg">
              Cambiar Contraseña
            </h2>
            <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
              <div>
                <label
                  htmlFor="password"
                  className="block text-gray-700 font-bold mb-2 font-default text-left text-lg"
                >
                  Nueva Contraseña
                </label>
                <input
                  onChange={(e) => onChange(e)}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="text-brand-6 w-full h-full flex flex-col items-left justify-left text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                  required=""
                ></input>
                {errors.password && <span className="text-danger text-red-800 text-left block w-96 mt-1 text-sm">{errors.password}</span>}
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-gray-700 font-bold mb-2 font-default text-left text-lg"
                >
                  Confirmar contraseña
                </label>
                <input
                  onChange={(e) => onChange(e)}
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="••••••••"
                  className="text-brand-6 w-full h-full flex flex-col items-left justify-left text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                  required=""
                ></input>
                 {errors.password && <span className="text-danger text-red-800 text-left block w-96 mt-1 text-sm">{errors.password}</span>}
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="newsletter"
                    aria-describedby="newsletter"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required=""
                  ></input>
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="newsletter"
                    className="block text-gray-700 font-bold mb-2 font-default text-left text-lg"
                  >
                    Acepto que he leido los{" "}
                    <a
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      href="#"
                    >
                      Terminos y condiciones
                    </a>
                  </label>
                </div>
              </div>
            </form>
            <a
              onClick={() => changePassword()}
              className="flex flex-row cursor-pointer items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
            >
              Cambiar Contraseña
            </a>
            <ToastContainer />
          </div>
        </div>
      </section>
    </div>
  );
}
