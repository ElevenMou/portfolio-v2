import { Entry, EntryCollection, EntrySkeletonType } from "contentful";
import contentful from "./contentful";
import PostPreview from "@/types/PostPreview";
import transformPost from "@/helpers/blog/transformPost";
import Technology from "@/types/Technology";
import transformTechnology from "@/helpers/blog/transformTechnology";
import Category from "@/types/Category";
import transformCategory from "@/helpers/blog/transformCategory";

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

  if (recentPosts.items.length === 0) {
    return [];
  }

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

  if (posts.items.length === 0) {
    return { posts: [], total: 0 };
  }

  return { posts: posts.items.map(transformPost), total: posts.total };
}

/*
 * Get post by slug
 * @param {string} slug
 * @returns {Promise<Post>}
 */
export async function getPostBySlug(
  slug: string
): Promise<Entry<EntrySkeletonType, undefined, string> | null> {
  const posts: EntryCollection<EntrySkeletonType, undefined, string> =
    await contentful.getEntries({
      content_type: "post",
      "fields.slug": slug,
    });

  if (posts.items.length === 0) {
    return null;
  }

  return posts.items[0];
}

/*
 * Get all technologies
 * @returns {Promise<Technology[]>}
 */
export async function getTechnologies(): Promise<Technology[]> {
  const techs: EntryCollection<EntrySkeletonType, undefined, string> =
    await contentful.getEntries({ content_type: "technology" });

  if (techs.items.length === 0) {
    return [];
  }

  return techs.items.map(transformTechnology);
}

/*
 * Get all categories
 * @returns {Promise<Category[]>}
 */
export async function getCategories(): Promise<Category[]> {
  const categories: EntryCollection<EntrySkeletonType, undefined, string> =
    await contentful.getEntries({ content_type: "category" });

  if (categories.items.length === 0) {
    return [];
  }

  return categories.items.map(transformCategory);
}

/*
 * Get category by slug
 * @param {string} slug
 * @returns {Promise<Category>}
 */
export async function getCategoryBySlug(
  slug: string
): Promise<Category | null> {
  const categories: EntryCollection<EntrySkeletonType, undefined, string> =
    await contentful.getEntries({
      content_type: "category",
      "fields.slug": slug,
    });

  if (categories.items.length === 0) {
    return null;
  }

  return transformCategory(categories.items[0]);
}
