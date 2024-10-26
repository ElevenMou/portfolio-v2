import PostPreview from "@/types/PostPreview";
import React from "react";
import PostsGrid from "@/components/themed/PostsGrid";
import Link from "next/link";

const RecentPosts = ({ posts }: { posts: PostPreview[] }) => {
  return (
    <section className="recent-posts">
      <div>
        <h2>Recent Posts</h2>
        <PostsGrid initialPosts={posts} />
        <div className="display-flex justify-content-center margin-top-l">
          <Link href="/blog" className="btn">
            All posts
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RecentPosts;
