import Category from "@/types/Category";
import CategoryLabel from "./CategoryLabel";
import { getCategories } from "@/lib/contentful/blog";

async function CategoriesList() {
  const categoriesList: Category[] = await getCategories();

  return (
    <div className="categories-list">
      {categoriesList.map((category) => (
        <CategoryLabel key={category.id} category={category} />
      ))}
    </div>
  );
}

export default CategoriesList;
