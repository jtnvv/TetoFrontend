import { useParams } from 'react-router-dom';
import Layout from "../Components/layout";
import CardsSearchCategory from "../Components/cards-search-category";

export default function SearchCategory() {
    const { category } = useParams();

    return (
        <Layout>
            <CardsSearchCategory category={category} />
        </Layout>
    )
}