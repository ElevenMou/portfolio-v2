import { getCategories, getPosts } from "@/lib/contentful/blog";
import Category from "@/types/Category";
import PostPreview from "@/types/PostPreview";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts: PostPreview[] = (await getPosts()).posts || [];

  const postsEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${process.env.NEXT_PUBLIC_APP_URL}/blog/${post.slug}`,
    lastModified: post.updateDate || post.date,
  }));

  const categories: Category[] = (await getCategories()) || [];

  const categoriesEntries: MetadataRoute.Sitemap = categories.map(
    (category) => ({
      url: `${process.env.NEXT_PUBLIC_APP_URL}/blog/categories/${category.slug}`,
      lastModified: category.updateDate,
    })
  );

  return [
    {
      url: `${process.env.NEXT_PUBLIC_APP_URL}/`,
    },
    ...postsEntries,
    ...categoriesEntries,
  ];
}
