import { useState } from "react"
import{onLogin}from'../api/auth'
import{useDispatch} from 'react-redux'
import{authenticateUser} from '../redux/slices/authSlice'

const Login = () => {
    const dispatch = useDispatch()
    const [error, setError] = useState(false)
    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const onChange = (event) => {
        setValues({...values, [event.target.name]:event.target.value})
    }

    const onSubmit = async(event) => {
        event.preventDefault()

        try {
            await onLogin(values)
            dispatch(authenticateUser())
            localStorage.setItem('isAuth','true')
        } catch (err) {
            console.log(err.response.data.errors[0].msg)
            setError(err.response.data.errors[0].msg)
        }

    }

    return (
            <form onSubmit={onSubmit} className="container mt-3">
                <h1>Login</h1>
                <div className='mb-3'>
                    <label htmlFor='email' className='form-label'>
                        Email address
                    </label>
                    <input
                        onChange={onChange}
                        type='email'
                        className='form-control'
                        id='email'
                        name='email'
                        value={values.email}
                        placeholder='test@gmail.com'
                        required
                    />
                </div>

                <div className='mb-3'>
                    <label htmlFor='password' className='form-label'>
                        Password
                    </label>
                    <input
                        onChange={(e) => onChange(e)}
                        type='password'
                        value={values.password}
                        className='form-control'
                        id='password'
                        name='password'
                        placeholder='passwod'
                        required
                    />
                </div>

                <div style={{ color: 'red', margin: '10px 0' }}>{error}</div>

                <button type='submit' className='btn btn-primary'>
                    Submit
                </button>
            </form>
    )
}
export default Login