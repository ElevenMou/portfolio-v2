import { Entry, EntrySkeletonType } from "contentful";
import Image from "next/image";
import { IoCalendarOutline } from "react-icons/io5";
import {
  RenderContent,
  RichTextDocument,
} from "@/components/layout/RenderContent";
import { Metadata } from "next";
import { cache } from "react";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { getProjectBySlug } from "@/lib/contentful/work";
import TechnologiesList from "@/app/[locale]/(pages)/work/(components)/TechnologiesList";
import transformTechnology from "@/helpers/blog/transformTechnology";

const getProject = cache(async (slug: string, locale?: string) => {
  const project: Entry<EntrySkeletonType, undefined, string> | null =
    await getProjectBySlug(slug, locale);

  if (!project) {
    notFound();
  }

  return project;
});

export async function generateMetadata({
  params,
}: {
  params: { slug: string; locale: string };
}): Promise<Metadata> {
  const project = await getProject(params.slug, params.locale);
  return {
    title: String(project.fields.title) ?? "Blog project",
    description: String(project.fields.description) ?? "Blog project",
    openGraph: {
      images: [
        {
          url: `https:${
            (project.fields.banner as EntrySkeletonType)?.fields?.file?.url
          }`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function page({
  params,
}: {
  params: { slug: string; locale: string };
}) {
  const t = await getTranslations({
    locale: params.locale,
    namespace: "Menu",
  });

  const twork = await getTranslations({
    locale: params.locale,
    namespace: "Work",
  });

  const project = await getProject(params.slug, params.locale);

  return (
    <>
      <div>
        <div className="page__breadcrumbs">
          <Link href="/">{t("Home")}</Link>
          <span>&gt;</span>
          <Link href="/work">{t("Work")}</Link>
          <span>&gt;</span>
          <span>
            {typeof project.fields.title === "string"
              ? project.fields.title
              : "Untitled"}
          </span>
        </div>
        <h1>
          {typeof project.fields.title === "string"
            ? project.fields.title
            : "Untitled"}
        </h1>
        <div className="page__details">
          <div>
            <IoCalendarOutline size={24} />
            <span>
              {new Date(project.sys.createdAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
        <Image
          src={`https:${
            (project.fields?.banner as EntrySkeletonType)?.fields?.file?.url
          }`}
          alt={
            typeof project.fields.title === "string"
              ? project.fields.title
              : String(project.fields.title) ?? "Untitled"
          }
          width={900}
          height={500}
          className="page__banner"
        />

        {project.fields.content && (
          <RenderContent
            document={
              project.fields.content as unknown as RichTextDocument["document"]
            }
          />
        )}
      </div>

      <aside>
        <h2 className="margin-bottom-l">{twork("techsUsed")}</h2>
        {project.fields.technologies && (
          <TechnologiesList
            technologies={(
              project.fields.technologies as Entry<
                EntrySkeletonType,
                undefined,
                string
              >[]
            ).map((t) => transformTechnology(t))}
          />
        )}
      </aside>
    </>
  );
}
