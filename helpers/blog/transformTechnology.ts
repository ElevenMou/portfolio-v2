import Technology from "@/types/Technology";
import { Entry, EntrySkeletonType } from "contentful";

export default function transformTechnology(
  item: Entry<EntrySkeletonType, undefined, string>
): Technology {
  return {
    id: item.sys.id,
    title: item.fields?.title as string,
    logo: `https:${
      (item.fields?.logo as EntrySkeletonType)?.fields?.file?.url
    }`,
  };
}
