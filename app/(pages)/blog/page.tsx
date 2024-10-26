import PostsGrid from "@/components/themed/PostsGrid";
import PostPreview from "@/types/PostPreview";
import CategoriesList from "@/app/(pages)/blog/(components)/CategoriesList";
import { Metadata } from "next";
import { getPosts } from "@/lib/contentful/blog";

export const metadata: Metadata = {
  title: "All Blog Posts",
  description: "Navigate through all blog posts and categories by Moussa Saidi",
};

export default async function page() {
  const postsList: PostPreview[] = (await getPosts()).posts;
  return (
    <>
      <div>
        <h1 className="page-title">All Blog Posts</h1>
        <PostsGrid initialPosts={postsList} hasNavigation />
      </div>
      <aside>
        <h2 className="margin-bottom-l">Categories</h2>
        <CategoriesList />
      </aside>
    </>
  );
}
