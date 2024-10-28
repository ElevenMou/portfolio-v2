import ProjectsGrid from "@/app/[locale]/(pages)/work/(components)/ProjectsGrid";
import TechnologiesList from "@/app/[locale]/(pages)/work/(components)/TechnologiesList";
import { Metadata } from "next";
import { getProjects } from "@/lib/contentful/work";
import { getTranslations } from "next-intl/server";
import ProjectPreview from "@/types/ProjectPreview";

export async function generateMetadata({
  params,
}: {
  params: { slug: string; locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({
    locale: params.locale,
    namespace: "Work",
  });

  return {
    title: t("Title", { technology: "" }),
    description: t("Description"),
  };
}

export default async function Page({ params }: { params: { locale: string } }) {
  const ProjectsList: ProjectPreview[] = (
    await getProjects(0, undefined, params.locale)
  ).projects;

  const t = await getTranslations({
    locale: params.locale,
    namespace: "Work",
  });

  return (
    <>
      <div>
        <h1 className="page-title">{t("Title", { technology: "" })}</h1>
        <ProjectsGrid
          initialProjects={ProjectsList}
          hasNavigation
          locale={params.locale}
          emptyMessage={t("empty", { technology: "" })}
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
