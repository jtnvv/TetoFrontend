import { useParams } from "react-router-dom";
import Layout from "../Components/Layout/layout";
import CardsSearchCategory from "../Components/Search/cards-search-category";

export default function SearchCategory() {
  const { category } = useParams();

  return (
    <div className="flex justify-center mt-3 flex-wrap">
      <Layout>
        <CardsSearchCategory category={category} />
      </Layout>
    </div>
  );
}
