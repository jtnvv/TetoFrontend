import Layout from "../Components/Layout/layout"
import ProductRegisterForm from "../Components/Register/product-register-form"

export default function RegisterProduct() {
  return (
    <Layout>
        <div className="h-full px-20 py-10">
            <ProductRegisterForm />
        </div>
    </Layout>
  )
}
