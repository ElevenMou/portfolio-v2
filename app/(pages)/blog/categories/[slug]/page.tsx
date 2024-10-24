import PostsGrid from "@/components/home/PostsGrid";
import contentful from "@/lib/contentful/contentful";
import PostPreview from "@/types/PostPreview";
import { EntryCollection, EntrySkeletonType } from "contentful";
import CategoriesList from "@/app/(pages)/blog/(components)/CategoriesList";
import transformPost from "@/lib/contentful/transformPost";
import { Metadata } from "next";
import { cache } from "react";
import { notFound } from "next/navigation";
import Category from "@/types/Category";
import formatCategory from "@/lib/contentful/formatCategory";

const POST_PER_PAGE = parseInt(
  process.env.NEXT_PUBLIC_POST_PER_PAGE || "6",
  10
);

const getCategory = cache(async (slug: string): Promise<Category> => {
  const categories: EntryCollection<EntrySkeletonType, undefined, string> =
    await contentful.getEntries({
      content_type: "category",
      "fields.slug": slug,
    });

  if (categories.items.length === 0) {
    notFound();
  }

  const category: Category = formatCategory(categories.items[0]);

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

  const posts: EntryCollection<EntrySkeletonType, undefined, string> =
    await contentful.getEntries({
      content_type: "post",
      limit: POST_PER_PAGE,
      skip: 0,
      order: ["-sys.createdAt"],
      "fields.category.sys.id": category.id,
    });

  const postsList: PostPreview[] = posts.items?.map(transformPost);

  console.log(postsList);

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
