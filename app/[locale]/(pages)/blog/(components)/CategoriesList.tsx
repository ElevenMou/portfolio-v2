import Category from "@/types/Category";
import CategoryLabel from "./CategoryLabel";
import { getCategories } from "@/lib/contentful/blog";

async function CategoriesList({ locale }: { locale: string }) {
  const categoriesList: Category[] = await getCategories(locale);

  return (
    <div className="categories-list">
      {categoriesList.map((category) => (
        <CategoryLabel key={category.id} category={category} />
      ))}
    </div>
  );
}

export default CategoriesList;
