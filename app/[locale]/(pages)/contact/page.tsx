import { getTranslations } from "next-intl/server";
import React from "react";
import ContactMeForm from "@/app/[locale]/(pages)/contact/(components)/ContactMeForm";
import SocialLinks from "@/components/layout/SocialLinks";

export default async function Page({ params }: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: params.locale,
    namespace: "Contact",
  });
  return (
    <>
      <div>
        <h1>{t("Title")}</h1>
        <p>{t("Subtitle")}</p>

        <ContactMeForm />
      </div>
      <aside>
        <h2>Contact info</h2>

        <p>Email: contact@moussasaidi.com</p>
        <p>Phone: +212 6 32 64 35 67</p>

        <SocialLinks />
      </aside>
    </>
  );
}
