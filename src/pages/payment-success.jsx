import { useParams } from "react-router-dom";
import Layout from "../Components/Layout/layout";

export default function PaymentSuccess() {
    const params = useParams();

  return (
    <Layout>
        <div className="flex">
            <img src="https://firebasestorage.googleapis.com/v0/b/teto-6d5a7.appspot.com/o/image%209.png?alt=media&token=c7313411-a140-4468-a763-e55bb6db54a5" alt="banner-payment-succesfull" />
            <div className="flex items-center justify-center">
                <h1>¡El pago fue hecho de manera exitosa!</h1>
            </div>
        </div>
    </Layout>
  )
}
