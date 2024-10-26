"use client";
import Image from "next/image";

import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import Technology from "@/types/Technology";
import { useTranslations } from "next-intl";

const Skills = ({ data }: { data: Technology[] }) => {
  const t = useTranslations("HomeSkills");
  return (
    <section className="skills">
      <h2>{t("Title")}</h2>
      <Splide
        aria-label="My Skills"
        options={{
          type: "loop",
          gap: "2rem",
          arrows: false,
          pagination: false,
          autoplay: true,
          interval: 1000,
          perMove: 1,
          autoWidth: true,
          focus: "center",
          breakpoints: {
            768: {
              gap: "1rem",
            },
          },
        }}
        hasTrack={false}
      >
        <SplideTrack>
          {data.map((item) => (
            <SplideSlide key={item.id}>
              <div className="skill">
                <Image
                  src={item.logo}
                  alt={String(item?.title) ?? t("Skill")}
                  width={50}
                  height={50}
                  title={String(item?.title ?? t("Skill"))}
                />
              </div>
            </SplideSlide>
          ))}
        </SplideTrack>
      </Splide>
    </section>
  );
};

export default Skills;
