"use client";

import PostPreview from "@/types/PostPreview";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import CategoryLabel from "../../app/[locale]/(pages)/blog/(components)/CategoryLabel";
import { IoCalendarOutline } from "react-icons/io5";
import { AiOutlineClockCircle } from "react-icons/ai";
import { getPosts } from "@/lib/contentful/blog";
import { Link } from "@/i18n/routing";

const POST_PER_PAGE = Number(process.env.NEXT_PUBLIC_POST_PER_PAGE) ?? 6;

const PostsGrid = ({
  initialPosts,
  hasNavigation = false,
  category,
}: {
  initialPosts: PostPreview[];
  hasNavigation?: boolean;
  category?: string;
}) => {
  const [posts, setPosts] = useState<PostPreview[]>(initialPosts);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialPosts.length >= POST_PER_PAGE);

  const fetchPosts = useCallback(async () => {
    if (!hasMore || currentPage === 0) return;

    try {
      setIsLoading(true);

      /* fetch posts */
      const skip = currentPage * POST_PER_PAGE;
      const postsCollection: { posts: PostPreview[]; total: number } =
        await getPosts(skip, category);

      /* Check if there are more posts */
      const total = postsCollection.total;
      const hasMorePosts = total > (currentPage + 1) * POST_PER_PAGE;
      setHasMore(hasMorePosts);

      /* Update posts */
      setPosts((prevPosts) => [...prevPosts, ...postsCollection.posts]);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false);
    }
  }, [category, currentPage, hasMore]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <section className="posts-grid">
      <div className="posts-grid__list">
        {posts?.map((post) => (
          <article className="posts-grid__list__item" key={post.id}>
            <Link href={`/blog/${post.slug}`}>
              <div className="posts-grid__list__item__image">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  width={400}
                  height={200}
                  loading="lazy"
                />
              </div>
              <div className="posts-grid__list__item__content">
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <div className="posts-grid__list__item__content__footer">
                  <div>
                    <IoCalendarOutline aria-hidden="true" size={24} />
                    <span>{formatDate(post.date)}</span>
                  </div>
                  <div>
                    <AiOutlineClockCircle aria-hidden="true" size={24} />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
            </Link>
            <div className="posts-grid__list__item__categories">
              <CategoryLabel key={post.category.id} category={post.category} />
            </div>
          </article>
        ))}
      </div>

      {hasNavigation && hasMore && (
        <div className="posts-grid__load-more">
          <button
            className="btn btn-primary"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Load more"}
          </button>
        </div>
      )}
    </section>
  );
};

export default PostsGrid;
