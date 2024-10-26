import { headers } from "next/headers";

// Helper function to get locale from headers
export default function getLocaleFromHeaders() {
  const headersList = headers();
  const headerLocale = headersList.get("x-next-intl-locale") || "en";
  return headerLocale;
}
