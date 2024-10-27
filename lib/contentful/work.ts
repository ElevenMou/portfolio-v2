import { Entry, EntryCollection, EntrySkeletonType } from "contentful";
import contentful from "./contentful";
import PostPreview from "@/types/PostPreview";
import transformPost from "@/helpers/blog/transformPost";
import Technology from "@/types/Technology";
import transformTechnology from "@/helpers/blog/transformTechnology";
import ProjectPreview from "@/types/ProjectPreview";
import transformProject from "@/helpers/work/transformProject";

const POST_PER_PAGE = Number(process.env.NEXT_PUBLIC_POST_PER_PAGE) ?? 6;

/*
 * Get recent work
 * @param {number} limit
 * @returns {Promise<ProjectPreview[]>}
 */
export async function getRecentsWork(
  limit: number = 6,
  locale?: string
): Promise<ProjectPreview[]> {
  const recentProjects: EntryCollection<EntrySkeletonType, undefined, string> =
    await contentful.getEntries({
      content_type: "project",
      order: ["-sys.createdAt"],
      limit: limit,
      locale: locale,
    });

  if (recentProjects.items.length === 0) {
    return [];
  }

  return recentProjects.items.map(transformProject);
}

/*
 * Get blog posts
 * @param {number} limit
 * @returns {Promise<PostPreview[]>}
 */
export async function getPosts(
  skip: number = 0,
  category?: string,
  locale?: string
): Promise<{ posts: PostPreview[]; total: number }> {
  const posts: EntryCollection<EntrySkeletonType, undefined, string> =
    await contentful.getEntries({
      content_type: "post",
      limit: POST_PER_PAGE,
      skip: skip,
      locale: locale,
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
  slug: string,
  locale?: string
): Promise<Entry<EntrySkeletonType, undefined, string> | null> {
  const posts: EntryCollection<EntrySkeletonType, undefined, string> =
    await contentful.getEntries({
      content_type: "post",
      "fields.slug": slug,
      include: 2,
      locale: locale,
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