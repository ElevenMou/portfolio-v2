import ProjectsGrid from "@/app/[locale]/(pages)/work/(components)/ProjectsGrid";
import TechnologiesList from "@/app/[locale]/(pages)/work/(components)/TechnologiesList";
import { Metadata } from "next";
import { getProjects, getTechnologyBySlug } from "@/lib/contentful/work";
import { getTranslations } from "next-intl/server";
import ProjectPreview from "@/types/ProjectPreview";
import Technology from "@/types/Technology";
import { cache } from "react";
import { notFound } from "next/navigation";

const getTechnology = cache(async (slug: string) => {
  const technology: Technology | null = await getTechnologyBySlug(slug);
  if (!technology) {
    notFound();
  }
  return technology;
});

export async function generateMetadata({
  params,
}: {
  params: { slug: string; locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({
    locale: params.locale,
    namespace: "Work",
  });

  const technology: Technology | null = await getTechnology(params.slug);
  return {
    title: t("Title", { technology: technology?.title ?? "" }),
    description: t("Description"),
  };
}

export default async function Page({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const ProjectsList: ProjectPreview[] = (
    await getProjects(0, params.slug, params.locale)
  ).projects;

  const technology: Technology | null = await getTechnology(params.slug);

  const t = await getTranslations({
    locale: params.locale,
    namespace: "Work",
  });

  return (
    <>
      <div>
        <h1 className="page-title">
          {t("Title", { technology: technology?.title ?? "" })}
        </h1>
        <ProjectsGrid
          initialProjects={ProjectsList}
          hasNavigation
          technology={params.slug}
          emptyMessage={t("empty", { technology: technology?.title ?? "" })}
          locale={params.locale}
        />
      </div>
      <aside>
        <div>
          <h2 className="margin-bottom-l">{t("Technologies")}</h2>
          <TechnologiesList />
        </div>
      </aside>
    </>
  );
}
