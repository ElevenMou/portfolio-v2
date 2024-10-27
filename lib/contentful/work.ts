import { Entry, EntryCollection, EntrySkeletonType } from "contentful";
import contentful from "./contentful";
import Technology from "@/types/Technology";
import transformTechnology from "@/helpers/blog/transformTechnology";
import ProjectPreview from "@/types/ProjectPreview";
import transformProject from "@/helpers/work/transformProject";

const POST_PER_PAGE = Number(process.env.NEXT_PUBLIC_POST_PER_PAGE) ?? 6;

/*
 * Get recent projects
 * @param {number} limit
 * @returns {Promise<ProjectPreview[]>}
 */
export async function getRecentsProjects(
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
 * Get all Projects
 * @param {number} limit
 * @param {string} technology
 * @param {string} locale
 * @returns {Promise<{ projects: ProjectPreview[]; total: number }>}
 */
export async function getProjects(
  skip: number = 0,
  technology?: string,
  locale?: string
): Promise<{ projects: ProjectPreview[]; total: number }> {
  let technologyEntry;
  if (technology) {
    const techResult = await contentful.getEntries({
      content_type: "technology",
      "fields.slug": technology,
      limit: 1,
    });

    technologyEntry = techResult.items[0]?.sys.id;
  }

  const projects: EntryCollection<EntrySkeletonType, undefined, string> =
    await contentful.getEntries({
      content_type: "project",
      limit: POST_PER_PAGE,
      skip: skip,
      locale: locale,
      order: ["-sys.createdAt"],
      ...(technologyEntry
        ? {
            links_to_entry: technologyEntry,
          }
        : {}),
    });

  if (projects.items.length === 0) {
    return { projects: [], total: 0 };
  }

  return {
    projects: projects.items.map(transformProject),
    total: projects.total,
  };
}

/*
 * Get project by slug
 * @param {string} slug
 * @returns {Promise<ProjectPreview>}
 */
export async function getProjectBySlug(
  slug: string,
  locale?: string
): Promise<Entry<EntrySkeletonType, undefined, string> | null> {
  const Projects: EntryCollection<EntrySkeletonType, undefined, string> =
    await contentful.getEntries({
      content_type: "project",
      "fields.slug": slug,
      include: 2,
      locale: locale,
    });

  if (Projects.items.length === 0) {
    return null;
  }

  return Projects.items[0];
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
 * Get technology by slug
 * @param {string} slug
 * @returns {Promise<Technology>}
 */
export async function getTechnologyBySlug(
  slug: string
): Promise<Technology | null> {
  const techs: EntryCollection<EntrySkeletonType, undefined, string> =
    await contentful.getEntries({
      content_type: "technology",
      "fields.slug": slug,
    });

  if (techs.items.length === 0) {
    return null;
  }

  return transformTechnology(techs.items[0]);
}
