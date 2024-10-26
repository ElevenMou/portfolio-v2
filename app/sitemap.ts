import { getCategories, getPosts } from "@/lib/contentful/blog";
import Category from "@/types/Category";
import PostPreview from "@/types/PostPreview";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts: PostPreview[] = (await getPosts()).posts || [];

  const postsEntries: MetadataRoute.Sitemap = posts.flatMap((post) => [
    {
      url: `${process.env.NEXT_PUBLIC_APP_URL}/en/blog/${post.slug}`,
      lastModified: post.updateDate || post.date,
    },
    {
      url: `${process.env.NEXT_PUBLIC_APP_URL}/fr/blog/${post.slug}`,
      lastModified: post.updateDate || post.date,
    },
  ]);

  const categories: Category[] = (await getCategories()) || [];

  const categoriesEntries: MetadataRoute.Sitemap = categories.flatMap(
    (category) => [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/en/blog/categories/${category.slug}`,
        lastModified: category.updateDate,
      },
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/fr/blog/categories/${category.slug}`,
        lastModified: category.updateDate,
      },
    ]
  );

  return [
    {
      url: `${process.env.NEXT_PUBLIC_APP_URL}/en`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_APP_URL}/fr`,
    },
    ...postsEntries,
    ...categoriesEntries,
  ];
}
