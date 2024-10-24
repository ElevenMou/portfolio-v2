import * as cf from "contentful";
const contentful = cf.createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID ?? "",
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN ?? "",
});

export default contentful;
