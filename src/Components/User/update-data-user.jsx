import React from "react";
import { useState, useEffect } from "react";
import { UpdateUserInformation } from "../../api/user.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { unauthenticateUser } from '../../redux/slices/authSlice.js'
import { onLogout } from "../../api/auth.js";


export default function UpdateDataUser({ onClose, name, email }) {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [nameState, setNameState] = useState(name == null ? "" : name);
    const [emailState, setEmailState] = useState(email);
    const [updatePassword, setUpdatePassword] = useState(false);
    const [passwordState, setPasswordState] = useState("");


    //Errors
    const [passwordError, setPasswordError] = useState();


    const handleSubmit = async (event) => {

        event.preventDefault();


        // Si el usuario quiere actualizar la contraseña, verifica que cumpla con los requisitos
        if (updatePassword) {
            const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
            if (!passwordRegex.test(passwordState)) {

                setPasswordError("La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una minúscula y un número")
                return;
            }
        }


        const data = {
            name: nameState,
            email: emailState,
            ...(updatePassword && { password: passwordState })
        };


        await UpdateUserInformation(data)
            .then((res) => {
                if (email !== emailState) { // Si el correo electrónico se actualizó, cierra la sesión


                    try {
                        const res = onLogout();

                        localStorage.setItem('isAuth', 'false')
                        localStorage.setItem('role', 'null')

                        dispatch(unauthenticateUser())

                    } catch (err) {

                        setError(err.response.data.errors[0].msg)
                    }


                    navigate("/login"); // Redirige al usuario a la página de inicio de sesión
                } else {
                    window.location.reload(false);
                }
                alert("se ha actualizado la informacion correctamente")

            })
            .catch((err) => {

                alert("NO se ha actualizado la información: " + err.response.data.message)
            });
    };



    return (
        <div className="fixed  z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4 ">
            <div className="relative top-40 mx-auto shadow-xl rounded-md bg-white max-w-md font-inknut  ">
                <button onClick={onClose} className="absolute right-0 top-0 m-2 bg-transparent ">
                    X
                </button>

                <div className="p-10" onSubmit={handleSubmit}>

                    <form className="space-y-5" >
                        <p className="font-bold text-2xl">MODIFICAR DATOS</p>

                        <div>
                            <p> Nombre de la marca: </p>
                            <input value={nameState} onChange={(e) => setNameState(e.target.value)} className="block w-96 py-2.3 px-3 text-sm text-gray-700 bg-transparent border-0 border-b-2 border-gray-300  focus_outline-non" id="name" name="name"
                                type="text" required />
                        </div>

                        <div>
                            <p> Correo electronico: </p>
                            <input value={emailState} onChange={(e) => setEmailState(e.target.value)} className="block w-96 py-2.3 px-3 text-sm text-gray-700 bg-transparent border-0 border-b-2 border-gray-300  focus_outline-non" id="email" name="email"
                                type="email" required />
                            <p className="text-sm text-red-500 mt-3">* Al modificar este campo, se cerrará la sesión</p>
                        </div>

                        <div className="flex items-center space-x-3" >

                            <input className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="checkbox" checked={updatePassword} onChange={(e) => setUpdatePassword(e.target.checked)} />

                            <label > ¿Quiere actualizar la contraseña?</label>
                        </div>

                        {updatePassword && (
                            <div>
                                <p> Nueva contraseña: </p>
                                <input value={passwordState} onChange={(e) => setPasswordState(e.target.value)} className="block w-96 py-2.3 px-3 text-sm text-gray-700 bg-transparent border-0 border-b-2 border-gray-300  focus_outline-non" id="password" name="password"
                                    type="password" required />
                                {passwordError && <span className="text-danger text-red-800 text-left block w-96 mt-1 text-sm">{passwordError}</span>}
                            </div>
                        )}

                        <div className="pagination space-x-5 items-center text-black ">
                            <button className=" bg-[#D9D9D9] rounded " type="button" onClick={onClose}>
                                Cancelar
                            </button>
                            <button className=" bg-[#D9D9D9] rounded " type="submit">
                                Actualizar
                            </button>
                        </div>
                    </form>
                </div>

            </div>

        </div>
    )
}