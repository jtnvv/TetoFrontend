import React, { useState } from "react"
import { onLogin, sendRecoveryEmail } from '../../api/auth'
import { useDispatch } from 'react-redux'
import { authenticateUser } from '../../redux/slices/authSlice'
import BackButton from "../Layout/back-button";
import { useContext } from "react";
import { RecoveryContext } from "../../pages/login";

export default function LoginForm (){
    const {  setPage, setOTP, setEmail } = useContext(RecoveryContext);
    const inputStyle = "block w-96 py-2.3 px-3 text-sm text-gray-700 bg-transparent border-0 border-b-2 border-gray-300  focus_outline-non outline-none";

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
                await sendRecoveryEmail({ OTP, recipient_email: values.email, });
                setPage("otp")
            } catch (error) {
                console.log(error);
            }
            setPage("otp")
            setEmail(values.email)
          return;
        }
        return alert("Please enter your email");
      }

    return (

        <div className="flex justify-end w-screen h-screen bg-[url('src/assets/bgRegister.png')] bg-cover bg-no-repeat bg-center">
            <div className="bg-white rounded-lg shadow-lg p-20 max-w-x1">
                <BackButton />
                <div className="flex items-center justify-center mb-20 ">
                    <img className="w-20 mx-5 " src="../src/assets/TetoLogo.png" alt='Teto Logo' />
                    <h1 className="text-5xl font-bold text-center text-gray-700  font-inknut"  >TETO</h1>
                </div>
                <form onSubmit={(e) => onSubmit(e)} className="space-y-16">

                    <div>
                        <label className="block text-gray-700 font-bold mb-2 font-inknut text-left text-lg" htmlFor='email' >
                            Email address
                        </label>
                        <input
                            onChange={(e) => onChange(e)}
                            type='email'
                            className={inputStyle}
                            id='email'
                            name='email'
                            value={values.email}
                            placeholder='ejemplo@gmail.com'
                            required
                        />
                    </div>

                    <div className='mb-3'>
                        <label htmlFor='password' className="block text-gray-700 font-bold mb-2 font-inknut text-left text-lg">
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

                    <div  className="font-inknut ">
                        <button type='submit' className="w-full bg-brand-2 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded-lg mt-1 mb-4">
                            Iniciar Sesion
                        </button>
                        <a
                            href="#"
                            onClick={() => nagigateToOtp()}
                            className="text-gray-800"
                        >
                            Forgot password?
                        </a>
                    </div>

                    <div className="text-black font-inknut">
                       ¿No estás registrado? <a href="/register">Regístrate aquí</a>

                    </div>
                </form>
            </div>


        </div>


    )
}