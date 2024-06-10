import { sendConfirmationEmail } from "../api/auth.js";
import Layout from "../Components/Layout/layout";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ActivateAdvertisement() {
  const onClickAction = () => {
    sendConfirmationEmail()
    .then(() => location.href = "/activate-account")
    .catch(err => toast.error(err.message));
  }; 
  
  return (
    <Layout>
      <ToastContainer containerId="activate-error"/>
      <div className="flex flex-col items-center space-y-10 mx-10 my-20">
        <h1 className="text-center">Debes activar tu cuenta para ingresar a este sitio</h1>
        <img src="https://i.gifer.com/origin/78/787899e9d4e4491f797aba5c61294dfc_w200.gif" alt="activate-account" />
        <button className="max-w-60 bg-brand-5 text-brand-1 hover:bg-brand-2" onClick={onClickAction}>Activar cuenta</button>
      </div>
    </Layout>
  )
}
