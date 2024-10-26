"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <div className="main-content page">
      <div>
        <h1>{t("Title")}</h1>
        <p>{t("Message")}</p>
        <Link href="/" className="btn btn-primary">
          {t("Button")}
        </Link>
      </div>
    </div>
  );
}
