"use client"; 

import { useTranslations } from "next-intl";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("Error");
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="main-content page">
      <div>
        <h1>{t("Title")}</h1>
        <p>{t("Message")}</p>
        <button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
          className="btn btn-primary"
        >
          {t("Button")}
        </button>
      </div>
    </div>
  );
}
