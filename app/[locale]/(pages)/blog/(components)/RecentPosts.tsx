import PostPreview from "@/types/PostPreview";
import React from "react";
import PostsGrid from "@/app/[locale]/(pages)/blog/(components)/PostsGrid";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import getLocaleFromHeaders from "@/helpers/getLocaleFromHeaders";

const RecentPosts = async ({ posts }: { posts: PostPreview[] }) => {
  const locale = getLocaleFromHeaders();

  const t = await getTranslations({
    locale: locale,
    namespace: "RecentPosts",
  });
  return (
    <section className="recent-posts">
      <div>
        <h2>{t("Title")}</h2>
        <PostsGrid initialPosts={posts} />
        <div className="display-flex justify-content-center margin-top-l">
          <Link href="/blog" className="btn">
            {t("ReadMore")}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RecentPosts;
