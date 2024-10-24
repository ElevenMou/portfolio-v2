import Category from "@/types/Category";
import { Entry, EntrySkeletonType } from "contentful";

const formatCategory = (
  category: Entry<EntrySkeletonType, undefined, string>
): Category => {
  return {
    id: category.sys.id,
    name: category.fields.title as string,
    slug: category.fields.slug as string,
    description: category.fields.description as string,
  };
};

export default formatCategory;
