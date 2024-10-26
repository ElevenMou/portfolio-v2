/* Images */
import Profile from "@/assets/images/profile-pic.jpg";
import Image from "next/image";
import SocialLinks from "@/components/layout/SocialLinks";

const Banner = () => {
  return (
    <section className="banner">
      <div>
        <div className="banner__left">
          <p>Hello I&apos;m Moussa</p>
          <h1>Software Engineer</h1>
          <div className="banner__left__location">
            <p>Based in Morocco</p>{" "}
            <Image
              src="https://s.w.org/images/core/emoji/15.0.3/svg/1f1f2-1f1e6.svg"
              alt="morocco flag"
              width={24}
              height={24}
            />
          </div>
          <p className="margin-bottom-l">
            I&apos;m a software engineer with a passion for solving complex
            problems and delivering high-quality, user-centric solutions.
          </p>

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
