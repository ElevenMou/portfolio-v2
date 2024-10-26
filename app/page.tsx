import Banner from "@/components/home/Banner";
import Skills from "@/components/home/Skills";
import Technology from "@/types/Technology";
import PostPreview from "@/types/PostPreview";
import PostsGrid from "@/components/home/RecentPosts";
import { getRecentsPosts, getTechnologies } from "@/lib/contentful/blog";

export default async function Home() {
  const technologies: Technology[] = await getTechnologies();
  const posts: PostPreview[] = await getRecentsPosts();

  return (
    <div className="home-page">
      <Banner />
      <Skills data={technologies} />
      <PostsGrid posts={posts} />
    </div>
  );
}
