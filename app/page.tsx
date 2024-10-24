import contentful from "@/lib/contentful/contentful";
import { EntryCollection, EntrySkeletonType } from "contentful";
import Banner from "@/components/home/Banner";
import Skills from "@/components/home/Skills";
import Technology from "@/types/Technology";
import PostPreview from "@/types/PostPreview";
import PostsGrid from "@/components/home/RecentPosts";

export default async function Home() {
  const techs: EntryCollection<EntrySkeletonType, undefined, string> =
    await contentful.getEntries({ content_type: "technology" });

  const technologies: Technology[] = techs.items.map((item) => ({
    id: item.sys.id,
    title: item.fields?.title as string,
    logo: `https:${
      (item.fields?.logo as EntrySkeletonType)?.fields?.file?.url
    }`,
  }));

  const recentPosts: EntryCollection<EntrySkeletonType, undefined, string> =
    await contentful.getEntries({
      content_type: "post",
      order: ["-sys.createdAt"],
      limit: 4,
    });

  const posts: PostPreview[] = recentPosts.items.map((item) => ({
    id: item.sys.id,
    title: item.fields?.title as string,
    coverImage: `https:${
      (item.fields?.banner as EntrySkeletonType)?.fields?.file?.url
    }`,
    date: item.sys?.createdAt as string,
    excerpt: item.fields?.excerpt as string,
    categories: (item.fields?.categories as never[])?.map(
      (category: {
        sys: { id: string };
        fields: { title: string; slug: string; description: string };
      }) => ({
        id: category.sys.id as string,
        name: category.fields.title as string,
        slug: category.fields.slug as string,
        description: category.fields.description as string,
      })
    ),
    slug: item.fields?.slug as string,
    readTime: item.fields?.readTime as string,
  }));

  return (
    <div className="home-page">
      <Banner />
      <Skills data={technologies} />
      <PostsGrid posts={posts} />
    </div>
  );
}
