"use client";

import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { getProjects } from "@/lib/contentful/work";
import { Link } from "@/i18n/routing";
import ProjectPreview from "@/types/ProjectPreview";

const POST_PER_PAGE = Number(process.env.NEXT_PUBLIC_POST_PER_PAGE) ?? 6;

const ProjectsGrid = ({
  initialProjects,
  hasNavigation = false,
  technology,
  emptyMessage,
  locale,
}: {
  initialProjects: ProjectPreview[];
  hasNavigation?: boolean;
  technology?: string;
  emptyMessage?: string;
  locale: string;
}) => {
  const [projects, setProjects] = useState<ProjectPreview[]>(initialProjects);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(
    initialProjects.length >= POST_PER_PAGE
  );

  const fetchProjects = useCallback(async () => {
    if (!hasMore || currentPage === 0) return;

    try {
      setIsLoading(true);

      // fetch projects
      const skip = currentPage * POST_PER_PAGE;
      const projectsCollection: { projects: ProjectPreview[]; total: number } =
        await getProjects(skip, technology, locale);

      // Check if there are more projects
      const total = projectsCollection.total;
      const hasMoreProjects = total > (currentPage + 1) * POST_PER_PAGE;
      setHasMore(hasMoreProjects);

      // Update projects
      setProjects((prevProjects) => [
        ...prevProjects,
        ...projectsCollection.projects,
      ]);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setIsLoading(false);
    }
  }, [technology, currentPage, hasMore, locale]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <section className="projects-grid">
      {projects.length > 0 ? (
        <div className="projects-grid__list">
          {projects?.map((project) => (
            <article className="projects-grid__list__item" key={project.id}>
              <Link href={`/work/${project.slug}`}>
                <div className="projects-grid__list__item__image">
                  <Image
                    src={project.banner}
                    alt={project.title}
                    width={400}
                    height={200}
                    loading="lazy"
                  />
                </div>
                <div className="projects-grid__list__item__content">
                  <h3>{project.title}</h3>
                  <p>{project.excerpt}</p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-results">
          <p>{emptyMessage ?? "No projects found"}</p>
        </div>
      )}

      {hasNavigation && hasMore && (
        <div className="projects-grid__load-more">
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

export default ProjectsGrid;
