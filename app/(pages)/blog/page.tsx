import PostsGrid from "@/components/home/PostsGrid";
import contentful from "@/lib/contentful/contentful";
import PostPreview from "@/types/PostPreview";
import { EntryCollection, EntrySkeletonType } from "contentful";
import CategoriesList from "@/app/(pages)/blog/(components)/CategoriesList";
import transformPost from "@/lib/contentful/transformPost";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Blog Posts",
  description: "Navigate through all blog posts and categories by Moussa Saidi",
};

const POST_PER_PAGE = Number(process.env.NEXT_PUBLIC_POST_PER_PAGE) ?? 6;

export default async function page() {
  const posts: EntryCollection<EntrySkeletonType, undefined, string> =
    await contentful.getEntries({
      content_type: "post",
      limit: POST_PER_PAGE,
      skip: 0,
      order: ["-sys.createdAt"],
    });

  const postsList: PostPreview[] = posts.items.map(transformPost);
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
