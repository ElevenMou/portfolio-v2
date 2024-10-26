import PostsGrid from "@/app/[locale]/(pages)/blog/(components)/PostsGrid";
import PostPreview from "@/types/PostPreview";
import CategoriesList from "@/app/[locale]/(pages)/blog/(components)/CategoriesList";
import { Metadata } from "next";
import { cache } from "react";
import { notFound } from "next/navigation";
import Category from "@/types/Category";
import { getCategoryBySlug, getPosts } from "@/lib/contentful/blog";
import { getTranslations } from "next-intl/server";

const getCategory = cache(
  async (slug: string, locale?: string): Promise<Category> => {
    const category: Category | null = await getCategoryBySlug(slug, locale);
    if (!category) {
      notFound();
    }
    return category;
  }
);

export async function generateMetadata({
  params,
}: {
  params: { slug: string; locale: string };
}): Promise<Metadata> {
  const category = await getCategory(params.slug, params.locale);

  return {
    title: category.name ?? "Category posts",
    description: `List of posts in the ${category.name} category`,
  };
}

export default async function Page({
  params,
}: {
  params: { slug: string; locale: string };
}) {
  const category = await getCategory(params.slug, params.locale);
  const postsList: PostPreview[] = (await getPosts(0, category.id)).posts;

  const t = await getTranslations({
    locale: params.locale,
    namespace: "Blog",
  });

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
        <h2 className="margin-bottom-l">{t("Categories")}</h2>
        <CategoriesList locale={params.locale} />
      </aside>
    </>
  );
}
