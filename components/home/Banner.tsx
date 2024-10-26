/* Images */
import Profile from "@/assets/images/profile-pic.jpg";
import Image from "next/image";
import SocialLinks from "@/components/layout/SocialLinks";
import { getTranslations } from "next-intl/server";

const Banner = async ({ locale }: { locale: string }) => {
  const t = await getTranslations({
    locale: locale,
    namespace: "HomeBanner",
  });
  return (
    <section className="banner">
      <div>
        <div className="banner__left">
          <p>{t("Greeting")}</p>
          <h1>{t("Subtitle")}</h1>
          <div className="banner__left__location">
            <p>{t("Location")}</p>
            <Image
              src="https://s.w.org/images/core/emoji/15.0.3/svg/1f1f2-1f1e6.svg"
              alt="morocco flag"
              width={24}
              height={24}
            />
          </div>
          <p className="margin-bottom-l">{t("Intro")}</p>

          <SocialLinks />
        </div>
        <div className="banner__right">
          <div className="banner__right__image">
            <Image
              src={Profile}
              alt="profile picture"
              width={300}
              height={300}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
