import { getCategories, getPosts } from "@/lib/contentful/blog";
import Category from "@/types/Category";
import PostPreview from "@/types/PostPreview";
import { MetadataRoute } from "next";

const URL = "https://www.moussasaidi.com"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts: PostPreview[] = (await getPosts()).posts || [];

  const postsEntries: MetadataRoute.Sitemap = posts.flatMap((post) => [
    {
      url: `${URL}/en/blog/${post.slug}`,
      lastModified: post.updateDate || post.date,
    },
    {
      url: `${URL}/fr/blog/${post.slug}`,
      lastModified: post.updateDate || post.date,
    },
  ]);

  const categories: Category[] = (await getCategories()) || [];

  const categoriesEntries: MetadataRoute.Sitemap = categories.flatMap(
    (category) => [
      {
        url: `${URL}/en/blog/categories/${category.slug}`,
        lastModified: category.updateDate,
      },
      {
        url: `${URL}/fr/blog/categories/${category.slug}`,
        lastModified: category.updateDate,
      },
    ]
  );

  return [
    {
      url: `${URL}/en`,
    },
    {
      url: `${URL}/fr`,
    },
    ...postsEntries,
    ...categoriesEntries,
  ];
}
