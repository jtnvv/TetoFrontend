import Layout from "../Components/layout"
import ProductRegisterForm from "../Components/product-register-form"

export default function RegisterProduct() {
  return (
    <Layout>
        <div className="h-full px-20 py-10">
            <ProductRegisterForm />
        </div>
    </Layout>
  )
}
