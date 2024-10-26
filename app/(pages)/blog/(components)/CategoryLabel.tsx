import getRandomLightColor from "@/helpers/getRandomColor";
import Category from "@/types/Category";
import Link from "next/link";

const CategoryLabel = async ({ category }: { category: Category }) => {
  const bgColor = getRandomLightColor();

  return (
    <Link
      className="category-label"
      href={`/blog/categories/${category.slug}`}
      key={category.id}
    >
      <span style={{ backgroundColor: bgColor }}>{category.name}</span>
    </Link>
  );
};

export default CategoryLabel;
