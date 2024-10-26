"use client";
import getRandomLightColor from "@/helpers/getRandomColor";
import { Link } from "@/i18n/routing";
import Category from "@/types/Category";
import { useEffect, useState } from "react";

const CategoryLabel = ({ category }: { category: Category }) => {
  const [bgColor, setBgColor] = useState("#ffffff");
  useEffect(() => {
    setBgColor(getRandomLightColor());
  }, []);

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
