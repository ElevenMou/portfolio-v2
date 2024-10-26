import contentful from "@/lib/contentful/contentful";
import { EntryCollection, EntrySkeletonType } from "contentful";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts: EntryCollection<EntrySkeletonType, undefined, string> =
    await contentful.getEntries({
      content_type: "post",
      skip: 0,
      order: ["-sys.createdAt"],
    });

  const postsEntries: MetadataRoute.Sitemap = posts.items.map((post) => ({
    url: `${process.env.NEXT_PUBLIC_APP_URL}/blog/${post.fields.slug}`,
    lastModified: post.sys.updatedAt,
  }));

  const categories: EntryCollection<EntrySkeletonType, undefined, string> =
    await contentful.getEntries({
      content_type: "category",
    });

  const categoriesEntries: MetadataRoute.Sitemap = categories.items.map(
    (category) => ({
      url: `${process.env.NEXT_PUBLIC_APP_URL}/blog/categories/${category.fields.slug}`,
      lastModified: category.sys.updatedAt,
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
