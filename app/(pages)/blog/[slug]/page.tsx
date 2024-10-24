import PostsGrid from "@/components/home/PostsGrid";
import contentful from "@/lib/contentful/contentful";
import PostPreview from "@/types/PostPreview";
import { EntryCollection, EntrySkeletonType } from "contentful";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineClockCircle } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import {
  RenderContent,
  RichTextDocument,
} from "@/components/layout/RenderContent";
import { Metadata } from "next";
import { cache } from "react";
import { notFound } from "next/navigation";
import transformPost from "@/lib/contentful/transformPost";
import formatCategory from "@/lib/contentful/formatCategory";

const getPost = cache(async (slug: string) => {
  const posts: EntryCollection<EntrySkeletonType, undefined, string> =
    await contentful.getEntries({
      content_type: "post",
      "fields.slug": slug,
    });

  if (posts.items.length === 0) {
    notFound();
  }
  return posts.items[0];
});

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPost(params.slug);
  return {
    title: String(post.fields.title) ?? "Blog post",
    description: String(post.fields.description) ?? "Blog post",
    openGraph: {
      images: [
        {
          url: `https:${
            (post.fields.banner as EntrySkeletonType)?.fields?.file?.url
          }`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function page({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  const relatedPosts: PostPreview[] =
    post.fields.relatedContent &&
    (post.fields.relatedContent as Array<any>).length > 0
      ? (post.fields.relatedContent as any)?.map(transformPost)
      : [];

  return (
    <>
      <div>
        <div className="page__breadcrumbs">
          <Link href="/">Home</Link>
          <span>&gt;</span>
          <Link href="/blog">Blog</Link>
          <span>&gt;</span>
          <Link
            href={`/blog/categories/${
              formatCategory(post.fields.category as any).slug
            }`}
          >
            {formatCategory(post.fields.category as any).name}
          </Link>
          <span>&gt;</span>
          <span>
            {typeof post.fields.title === "string"
              ? post.fields.title
              : "Untitled"}
          </span>
        </div>
        <h1>
          {typeof post.fields.title === "string"
            ? post.fields.title
            : "Untitled"}
        </h1>
        <div className="page__details">
          <div>
            <IoCalendarOutline size={24} />
            <span>
              {new Date(post.sys.createdAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
          <span>•</span>
          <div>
            <AiOutlineClockCircle size={24} />
            <span>{String(post.fields.readTime)} read time</span>
          </div>
        </div>
        <Image
          src={`https:${
            (post.fields?.banner as EntrySkeletonType)?.fields?.file?.url
          }`}
          alt={
            typeof post.fields.title === "string"
              ? post.fields.title
              : String(post.fields.title) ?? "Untitled"
          }
          width={900}
          height={500}
          className="page__banner"
        />

        {post.fields.content && (
          <RenderContent
            document={
              post.fields.content as unknown as RichTextDocument["document"]
            }
          />
        )}

        {relatedPosts.length > 0 && (
          <div className="page__related-posts">
            <h2>Related Posts</h2>
            <PostsGrid initialPosts={relatedPosts} />
          </div>
        )}
      </div>

      <aside>{/* reserved for sidebar */}</aside>
    </>
  );
}
