import { useParams } from "react-router-dom";
import Layout from "../Components/Layout/layout";

export default function PaymentSuccess() {
    const params = useParams();

  return (
    <Layout>
        <div className="flex">
            <img className="hidden responsive:block" src="https://firebasestorage.googleapis.com/v0/b/teto-6d5a7.appspot.com/o/image%209.png?alt=media&token=c7313411-a140-4468-a763-e55bb6db54a5" alt="banner-payment-succesfull" />
            <div className="flex flex-col justify-center m-16 w-full text-3xl space-y-10 text-center">
                <div className='flex items-center justify-center mb-2'>
                    <img src="https://raw.githubusercontent.com/jtnvv/TetoFrontend/calificacion-prendas/src/assets/TetoLogo.png" alt="Logo" className="w-20 mr-2" />
                    <span className="text-brand-6 font-logo font-semibold text-6xl">TETO</span>
                </div>
                <h2>Gracias por confiar en TETO</h2>
                <p>Tú pedido ha sido registrado exitosamente, puedes verlo en el siguiente enlace</p>
                <img className="w-72 self-center" src="https://images.hive.blog/0x0/http://i.stack.imgur.com/e8nZC.gif" alt="payment-succesfull" />
            </div>
        </div>
    </Layout>
  )
}
