import Banner from "@/components/home/Banner";
import Skills from "@/components/home/Skills";
import Technology from "@/types/Technology";
import PostPreview from "@/types/PostPreview";
import RecentPosts from "@/app/[locale]/(pages)/blog/(components)/RecentPosts";
import { getRecentsPosts } from "@/lib/contentful/blog";
import { getRecentsProjects, getTechnologies } from "@/lib/contentful/work";
import RecentProjects from "./(pages)/work/(components)/RecentProjects";
import ProjectPreview from "@/types/ProjectPreview";

export default async function Home({ params }: { params: { locale: string } }) {
  const technologies: Technology[] = await getTechnologies();
  const posts: PostPreview[] = await getRecentsPosts(6, params.locale);
  const projects: ProjectPreview[] = await getRecentsProjects(6, params.locale);

  return (
    <div className="home-page">
      <Banner locale={params.locale} />
      <Skills data={technologies} />
      <RecentPosts posts={posts} />
      <RecentProjects projects={projects} />
    </div>
  );
}
