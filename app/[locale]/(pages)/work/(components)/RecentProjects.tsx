import React from "react";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import getLocaleFromHeaders from "@/helpers/getLocaleFromHeaders";
import ProjectPreview from "@/types/ProjectPreview";
import ProjectsGrid from "./ProjectsGrid";

const RecentProjects = async ({ projects }: { projects: ProjectPreview[] }) => {
  const locale = getLocaleFromHeaders();

  const t = await getTranslations({
    locale: locale,
    namespace: "RecentProjects",
  });
  return (
    <section className="recent-projects">
      <div>
        <h2>{t("Title")}</h2>
        <ProjectsGrid initialProjects={projects} locale={locale} />
        <div className="display-flex justify-content-center margin-top-l">
          <Link href="/work" className="btn">
            {t("SeeMore")}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RecentProjects;
