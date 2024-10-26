import Category from "./Category";

interface PostPreview {
  id: string;
  title: string;
  coverImage: string;
  date: string;
  updateDate?: string;
  excerpt: string;
  category: Category;
  slug: string;
  readTime: string;
}

export default PostPreview;
