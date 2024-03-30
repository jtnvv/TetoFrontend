import React, { useState } from "react"
import { onLogin } from '../api/auth'
import Layout from '../Components/layout'
import { useDispatch } from 'react-redux'
import { authenticateUser } from '../redux/slices/authSlice'
import BackButton from "../Components/back-button";

const Login = () => {
    // document.body.style = "background: url('../src/assets/bgRegister.png'); background-size: cover;";
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

    return (
        
        <div className="flex w-screen h-screen">
                <div class="bg-[url('/bgs.png')] w-[500px] h-[500px] bg-cover bg-center"
                ></div>
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
                                Siguiente
                            </button>
                        </div>
                    </form>
                </div>


            </div>
        

    )
}
export default Login