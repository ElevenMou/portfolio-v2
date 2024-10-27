import React from "react";
import SocialLinks from "./SocialLinks";
import { getTranslations } from "next-intl/server";
import getLocaleFromHeaders from "@/helpers/getLocaleFromHeaders";

async function Footer() {
  const locale = getLocaleFromHeaders();
  const t = await getTranslations({
    locale: locale,
    namespace: "Footer",
  });
  return (
    <footer className="footer">
      <div>
        <p>{t("Copyright", { year: new Date().getFullYear() })}</p>
        <SocialLinks />
      </div>
    </footer>
  );
}

export default Footer;
