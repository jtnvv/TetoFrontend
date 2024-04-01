import { useParams } from "react-router-dom"
import BrandProfileUser from "../Components/brand-profile-user"
import Layout from "../Components/layout"
export default function BrandUser() {
    const id  = useParams();
    return (
        <div className="hide-scrollbar">
            <Layout>
                <BrandProfileUser id_store = {id.idbrand} />
            </Layout>
        </div>

    )
}