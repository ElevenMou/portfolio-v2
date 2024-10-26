import PostsGrid from "@/app/[locale]/(pages)/blog/(components)/PostsGrid";
import PostPreview from "@/types/PostPreview";
import CategoriesList from "@/app/[locale]/(pages)/blog/(components)/CategoriesList";
import { Metadata } from "next";
import { getPosts } from "@/lib/contentful/blog";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "All Blog Posts",
  description: "Navigate through all blog posts and categories by Moussa Saidi",
};

export default async function Page({ params }: { params: { locale: string } }) {
  const postsList: PostPreview[] = (await getPosts(0, undefined, params.locale))
    .posts;

  const t = await getTranslations({
    locale: params.locale,
    namespace: "Blog",
  });

  return (
    <>
      <div>
        <h1 className="page-title">{t("AllPosts")}</h1>
        <PostsGrid initialPosts={postsList} hasNavigation />
      </div>
      <aside>
        <h2 className="margin-bottom-l">{t("Categories")}</h2>
        <CategoriesList locale={params.locale} />
      </aside>
    </>
  );
}
