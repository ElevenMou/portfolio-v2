import PostPreview from "@/types/PostPreview";
import { Entry, EntrySkeletonType } from "contentful";

const transformPost = (
  item: Entry<EntrySkeletonType, undefined, string>
): PostPreview => ({
  id: item.sys.id,
  title: item.fields?.title as string,
  coverImage: `https:${
    (item.fields?.banner as EntrySkeletonType)?.fields?.file?.url
  }`,
  date: item.sys?.createdAt as string,
  excerpt: item.fields?.excerpt as string,
  category: {
    id: String(
      (item.fields?.category as Entry<EntrySkeletonType, undefined, string>)
        ?.sys?.id
    ),
    name: String(
      (item.fields?.category as Entry<EntrySkeletonType, undefined, string>)
        ?.fields?.title
    ),
    slug: String(
      (item.fields?.category as Entry<EntrySkeletonType, undefined, string>)
        ?.fields?.slug
    ),
    description: String(
      (item.fields?.category as Entry<EntrySkeletonType, undefined, string>)
        ?.fields?.description
    ),
  },
  slug: item.fields?.slug as string,
  readTime: item.fields?.readTime as string,
});

export default transformPost;
