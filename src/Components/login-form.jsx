import React, { useState } from "react"
import { onLogin } from '../api/auth'
import { useDispatch } from 'react-redux'
import { authenticateUser } from '../redux/slices/authSlice'
import BackButton from "./back-button";
import axios from "axios";
import { useContext } from "react";
import { RecoveryContext } from "../pages/login";

export default function LoginForm (){
    // document.body.style = "background: url('../src/assets/bgRegister.png'); background-size: cover;";
    const {  setPage, setOTP, setEmail } = useContext(RecoveryContext);

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
            await onLogin(values)
            dispatch(authenticateUser())

            localStorage.setItem('isAuth', 'true')

        } catch (err) {
            console.log(err.response.data.errors[0].msg)
            setError(err.response.data.errors[0].msg)
        }

    }
    function nagigateToOtp() {
        if (values.email) {
            const OTP = Math.floor(Math.random() * 9000 + 1000);
            console.log(OTP);
            setOTP(OTP);
    
            axios
                .post("http://localhost:8080/send_recovery_email", {
                    OTP,
                    recipient_email: values.email,
                })
                .then(() => setPage("otp"))
                .catch(console.log);
            setPage("otp")
            setEmail(values.email)
          return;
        }
        return alert("Please enter your email");
      }

    return (

        <div className="flex w-screen h-screen" style={{
            backgroundImage: "url('../src/assets/bgRegister.png')",
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
        }}>

            <div className="bg-white rounded-lg shadow-lg p-20 max-w-x1 mx-auto">
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
                            className="block w-96 py-2.3 px-3 text-sm text-gray-700 bg-transparent border-0 border-b-2 border-gray-300  focus_outline-non"
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
                            className="block w-96 py-2.3 px-3 text-sm text-gray-700 bg-transparent border-0 border-b-2 border-gray-300  focus_outline-non"
                            id='password'
                            name='password'
                            placeholder='Contraseña'
                            required
                        />
                    </div>

                    <div style={{ color: 'red', margin: '10px 0' }}>{error}</div>

                    <div >
                        <button type='submit' className="w-full bg-brand-2 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded-lg mt-10">
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
                </form>
            </div>


        </div>


    )
}