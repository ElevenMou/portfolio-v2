"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { useEffect, useState, useTransition } from "react";
import { useParams } from "next/navigation";
import franceFlag from "@/assets/images/fr.png";
import usFlag from "@/assets/images/us.png";
import Image from "next/image";

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();
  const [currentLocale, setCurrentLocale] = useState(locale);

  function onSelectChange() {
    const nextLocale = currentLocale === "en" ? "fr" : "en";
    setCurrentLocale(nextLocale);
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale }
      );
    });
  }

  useEffect(() => {
    setCurrentLocale(locale);
  }, [locale]);
  return (
    <button
      className="locale-switcher"
      onClick={() => onSelectChange()}
      disabled={isPending}
      title={
        currentLocale === "en" ? "Changer en Français" : "Change to English"
      }
    >
      {currentLocale === "en" ? (
        <Image src={franceFlag} alt="France" width={24} height={24} />
      ) : (
        <Image src={usFlag} alt="United States" width={24} height={24} />
      )}
    </button>
  );
}
