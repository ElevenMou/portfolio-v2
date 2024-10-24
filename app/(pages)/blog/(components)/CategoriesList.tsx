import contentful from "@/lib/contentful/contentful";
import Category from "@/types/Category";
import { EntryCollection, EntrySkeletonType } from "contentful";
import CategoryLabel from "./CategoryLabel";

async function CategoriesList() {
  const categories: EntryCollection<EntrySkeletonType, undefined, string> =
    await contentful.getEntries({
      content_type: "category",
    });

  const categoriesList: Category[] = categories.items.map((item) => ({
    id: item.sys.id,
    name: item.fields.title as string,
    slug: item.fields.slug as string,
    description: item.fields.description as string,
  }));

  return (
    <div className="categories-list">
      {categoriesList.map((category) => (
        <CategoryLabel key={category.id} category={category} />
      ))}
    </div>
  );
}

export default CategoriesList;
