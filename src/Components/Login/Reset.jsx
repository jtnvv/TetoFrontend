import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { RecoveryContext } from "../../pages/login";
import axios from "axios";

export default function Reset() {
  const { email, otp, setPage } = useContext(RecoveryContext);
  const [values, setValues] = useState({
    password: '',
    confirmPassword: '',
  })

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  
  function changePassword() {
    if (values.password===values.confirmPassword) {
      axios.post("http://localhost:8080/change-password", {
        pass: values.password,
        email: email,
      })
      .then(() => setPage("otp"))
      .catch();
      setPage("recovered");

      return;
    }
    return alert("La contraseñas no coinciden");
  }


return (
  <div>
    <section className="bg-gray-50 w-screen dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
          <h2 className="block text-gray-700 font-bold mb-2 font-inknut text-left text-lg">
            Cambiar Contraseña
          </h2>
          <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 font-bold mb-2 font-inknut text-left text-lg"
              >
                Nueva Contraseña
              </label>
              <input
                onChange={(e) => onChange(e)}
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
              ></input>
            </div>
            <div>
              <label
                htmlFor="confirm-password"
                className="block text-gray-700 font-bold mb-2 font-inknut text-left text-lg"
              >
                Confirmar contraseña
              </label>
              <input
                onChange={(e) => onChange(e)}
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
              ></input>
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
                  className="block text-gray-700 font-bold mb-2 font-inknut text-left text-lg"
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
          <button
            onClick={() => changePassword()}
            className="block text-gray-700 font-bold mb-2 font-inknut text-left text-lg"
          >
            Cambiar Contraseña
          </button>
        </div>
      </div>
    </section>
  </div>
);
}