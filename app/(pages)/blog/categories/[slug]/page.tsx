import PostsGrid from "@/components/themed/PostsGrid";
import contentful from "@/lib/contentful/contentful";
import PostPreview from "@/types/PostPreview";
import { EntryCollection, EntrySkeletonType } from "contentful";
import CategoriesList from "@/app/(pages)/blog/(components)/CategoriesList";
import { Metadata } from "next";
import { cache } from "react";
import { notFound } from "next/navigation";
import Category from "@/types/Category";
import transformCategory from "@/helpers/blog/transformCategory";
import { getPosts } from "@/lib/contentful/blog";

const getCategory = cache(async (slug: string): Promise<Category> => {
  const categories: EntryCollection<EntrySkeletonType, undefined, string> =
    await contentful.getEntries({
      content_type: "category",
      "fields.slug": slug,
    });

  if (categories.items.length === 0) {
    notFound();
  }

  const category: Category = transformCategory(categories.items[0]);

  return category;
});

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const category = await getCategory(params.slug);

  return {
    title: category.name ?? "Category posts",
    description: `List of posts in the ${category.name} category`,
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const category = await getCategory(params.slug);
  const postsList: PostPreview[] = (await getPosts(0, category.id)).posts;

  return (
    <>
      <div>
        <h1 className="page-title">{`${category.name} Posts`}</h1>
        <PostsGrid
          initialPosts={postsList}
          hasNavigation
          category={params.slug}
        />
      </div>
      <aside>
        <h2 className="margin-bottom-l">Categories</h2>
        <CategoriesList />
      </aside>
    </>
  );
}
