import ProjectPreview from "@/types/ProjectPreview";
import { Entry, EntrySkeletonType } from "contentful";

const transformProject = (
  item: Entry<EntrySkeletonType, undefined, string>
): ProjectPreview => ({
  id: item.sys.id,
  title: item.fields?.title as string,
  banner: `https:${
    (item.fields?.banner as EntrySkeletonType)?.fields?.file?.url
  }`,
  date: item.sys?.createdAt as string,
  updateDate: item.sys?.updatedAt as string,
  excerpt: item.fields?.excerpt as string,
  slug: item.fields?.slug as string,
});

export default transformProject;
