"use client";
import getRandomLightColor from "@/helpers/getRandomColor";
import { Link } from "@/i18n/routing";
import Technology from "@/types/Technology";
import { useEffect, useState } from "react";

const TechnologyLabel = ({ technology }: { technology: Technology }) => {
  const [bgColor, setBgColor] = useState("#ffffff");
  useEffect(() => {
    setBgColor(getRandomLightColor());
  }, []);

  return (
    <Link
      className="technology-label"
      href={`/work/technologies/${technology.slug}`}
      key={technology.id}
    >
      <span style={{ backgroundColor: bgColor }}>{technology.title}</span>
    </Link>
  );
};

export default TechnologyLabel;
