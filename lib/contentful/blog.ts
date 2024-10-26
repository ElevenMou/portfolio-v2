import { EntryCollection, EntrySkeletonType } from "contentful";
import contentful from "./contentful";
import PostPreview from "@/types/PostPreview";
import transformPost from "@/helpers/blog/transformPost";
import Technology from "@/types/Technology";
import transformTechnology from "@/helpers/blog/transformTechnology";

const POST_PER_PAGE = Number(process.env.NEXT_PUBLIC_POST_PER_PAGE) ?? 6;

/*
 * Get recent blog posts
 * @param {number} limit
 * @returns {Promise<PostPreview[]>}
 */
export async function getRecentsPosts(
  limit: number = 6
): Promise<PostPreview[]> {
  const recentPosts: EntryCollection<EntrySkeletonType, undefined, string> =
    await contentful.getEntries({
      content_type: "post",
      order: ["-sys.createdAt"],
      limit: limit,
    });

  return recentPosts.items.map(transformPost);
}

/*
 * Get blog posts
 * @param {number} limit
 * @returns {Promise<PostPreview[]>}
 */
export async function getPosts(
  skip: number = 0,
  category?: string
): Promise<{ posts: PostPreview[]; total: number }> {
  const posts: EntryCollection<EntrySkeletonType, undefined, string> =
    await contentful.getEntries({
      content_type: "post",
      limit: POST_PER_PAGE,
      skip: skip,
      order: ["-sys.createdAt"],
      ...(category
        ? {
            "fields.category.sys.id": category,
          }
        : {}),
    });

  return { posts: posts.items.map(transformPost), total: posts.total };
}

/*
 * Get all technologies
 * @returns {Promise<Technology[]>}
 */
export async function getTechnologies(): Promise<Technology[]> {
  const techs: EntryCollection<EntrySkeletonType, undefined, string> =
    await contentful.getEntries({ content_type: "technology" });

  return techs.items.map(transformTechnology);
}
