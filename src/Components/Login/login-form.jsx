import React, { useState } from "react"
import { onLogin, sendRecoveryEmail } from '../../api/auth'
import { useDispatch } from 'react-redux'
import { authenticateUser } from '../../redux/slices/authSlice'
import BackButton from "../Layout/back-button";
import { useContext } from "react";
import { RecoveryContext } from "../../pages/login";

export default function LoginForm() {
    const { setPage, setOTP, setEmail } = useContext(RecoveryContext);
    const inputStyle = "text-brand-6 bg-brand-1 border border-brand-6 p-4 w-full";

    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState(false)

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const dispatch = useDispatch()
    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await onLogin(values);

            localStorage.setItem('isAuth', 'true')
            localStorage.setItem('role', res.data.role)

            dispatch(authenticateUser())

        } catch (err) {
            setError(err.response.data.errors[0].msg)
        }

    }
    async function nagigateToOtp() {
        if (values.email) {
            const OTP = Math.floor(Math.random() * 9000 + 1000);
            setOTP(OTP);

            try {
                const res = await sendRecoveryEmail({ OTP, recipient_email: values.email, });
                if(res.status==409){
                    return alert("Correo no registrado")
                }
                setPage("otp")
            } catch (error) {
                console.log(error);
            }
            setEmail(values.email)
            return;
        }
        return alert("Please enter your email");
    }

    return (

        <div className="flex flex-col bg-white rounded-lg shadow-lg responsive:p-11 p-5 pt-20 responsive:w-[30rem] responsive:h-max w-screen h-full"  >
            <div className="bg-white rounded-lg  responsive:p-20 p-10 pt-16 max-w-x1 min-h-screen">
                <BackButton />
                <div className="flex items-center justify-center mb-20 ">
                    <img className="w-20 mx-5 " src="https://raw.githubusercontent.com/jtnvv/TetoFrontend/main/src/assets/TetoLogo.png" alt='Teto Logo' />
                    <h1 className="text-5xl font-bold text-center text-brand-6  font-logo"  >TETO</h1>
                </div>
                <form onSubmit={(e) => onSubmit(e)} className="space-y-16">

                    <div>
                        <label className="block text-brand-6 font-bold mb-2 font-default text-left text-lg" htmlFor='email' >
                            Correo Electrónico
                        </label>
                        <input
                            onChange={(e) => onChange(e)}
                            type='email'
                            className={inputStyle}
                            id='email'
                            name='email'
                            value={values.email}
                            placeholder='correo@gmail.com'
                            required
                        />
                    </div>

                    <div className='mb-3'>
                        <label htmlFor='password' className="block text-brand-6 font-bold mb-2 font-default text-left text-lg">
                            Contraseña
                        </label>
                        <input
                            onChange={(e) => onChange(e)}
                            type='password'
                            value={values.password}
                            className={inputStyle}
                            id='password'
                            name='password'
                            placeholder='Contraseña'
                            required
                        />
                    </div>

                    <div style={{ color: 'red', margin: '10px 0' }}>{error}</div>

                    <div  className="font-default ">
                        <button type='submit' className="w-full bg-brand-2 hover:bg-white-900 text-white font-bold py-2 px-4 rounded-lg mt-1 mb-4">
                            Iniciar Sesion
                        </button>
                        <a
                            href="#"
                            onClick={() => nagigateToOtp()}
                            className="text-gray-800"
                        >
                            Olvidaste tu contraseña?
                        </a>
                    </div>

                    <div className="text-black font-default">
                       ¿No estás registrado? <a href="/register">Regístrate aquí</a>

                    </div>
                </form>
            </div>


        </div>


    )
}