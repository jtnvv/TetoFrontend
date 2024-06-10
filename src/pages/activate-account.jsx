import { useState } from "react";
import Layout from "../Components/Layout/layout";
import { validateCode } from "../api/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { authenticateUser } from "../redux/slices/authSlice";

export default function ActivateAccount() {
    const [code, setCode] = useState(null);
    const dispatch = useDispatch();

    const sendCode = (event) => {
        event.preventDefault();

        validateCode(code)
        .then(res => {
            toast.success("Cuenta activada con exito, ya puedes ir a tu perfil");
            localStorage.setItem("isAuth", "true");
            localStorage.setItem("role", res.data.role);
            dispatch(authenticateUser());
        })
        .catch(err => toast.error(err.response.data.message));
    };

    const onChange = (event) => {
        setCode(event.target.value);
    };

  return (
    <Layout>
        <ToastContainer />
        <form className="flex flex-col items-center" onSubmit={sendCode}>
            <h1>Activa tu cuenta</h1>
            <p className="text-3xl mb-10">Revisa tu correo asociado a la cuenta para obtener el codigo de activación</p>
            <input onChange={onChange} type="numer" min="1000000" maxLength={6} className="bg-brand-1 border-2 border-b-brand-6 p-5 text-2xl mb-10 text-center focus:outline-none"/>
            <button type="submit" className="bg-brand-4 hover:bg-brand-2 text-brand-1">Validar cuenta</button>
        </form>
    </Layout>
  )
}
