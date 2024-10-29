import { getCategories, getPosts } from "@/lib/contentful/blog";
import { getProjects, getTechnologies } from "@/lib/contentful/work";
import Category from "@/types/Category";
import PostPreview from "@/types/PostPreview";
import ProjectPreview from "@/types/ProjectPreview";
import Technology from "@/types/Technology";
import { MetadataRoute } from "next";

const URL = "https://www.moussasaidi.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts: PostPreview[] = (await getPosts()).posts || [];

  const postsEntries: MetadataRoute.Sitemap = posts.flatMap((post) => [
    {
      url: `${URL}/en/blog/${post.slug}`,
      lastModified: post.updateDate || post.date,
    },
    {
      url: `${URL}/fr/blog/${post.slug}`,
      lastModified: post.updateDate || post.date,
    },
  ]);

  const categories: Category[] = (await getCategories()) || [];

  const categoriesEntries: MetadataRoute.Sitemap = categories.flatMap(
    (category) => [
      {
        url: `${URL}/en/blog/categories/${category.slug}`,
        lastModified: category.updateDate,
      },
      {
        url: `${URL}/fr/blog/categories/${category.slug}`,
        lastModified: category.updateDate,
      },
    ]
  );

  const work: ProjectPreview[] = (await getProjects()).projects || [];

  const projectsEntries: MetadataRoute.Sitemap = work.flatMap((project) => [
    {
      url: `${URL}/en/work/${project.slug}`,
      lastModified: project.updateDate || project.date,
    },
    {
      url: `${URL}/fr/work/${project.slug}`,
      lastModified: project.updateDate || project.date,
    },
  ]);

  const technologies: Technology[] = (await getTechnologies()) || [];

  const technologiesEntries: MetadataRoute.Sitemap = technologies.flatMap(
    (technology) => [
      {
        url: `${URL}/en/work/technologies/${technology.slug}`,
        lastModified: technology.updateDate,
      },
      {
        url: `${URL}/fr/work/technologies/${technology.slug}`,
        lastModified: technology.updateDate,
      },
    ]
  );

  return [
    {
      url: `${URL}/en`,
    },
    {
      url: `${URL}/fr`,
    },
    ...postsEntries,
    ...categoriesEntries,
    ...projectsEntries,
    ...technologiesEntries,
  ];
}
