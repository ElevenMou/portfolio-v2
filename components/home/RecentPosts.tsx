import PostPreview from "@/types/PostPreview";
import React from "react";
import PostsGrid from "./PostsGrid";

const RecentPosts = ({ posts }: { posts: PostPreview[] }) => {
  return (
    <section className="recent-posts">
      <div>
        <h2>Recent Posts</h2>
        <PostsGrid initialPosts={posts} />
      </div>
    </section>
  );
};

export default RecentPosts;
