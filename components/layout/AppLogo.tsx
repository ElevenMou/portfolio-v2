"use client";

import Image from "next/image";
import fullLogoLight from "@/assets/images/FullLogo.png";
import fullLogo from "@/assets/images/FullLogo-light.png";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const AppLogo: React.FC = () => {
  const { theme } = useTheme();
  const [logoSrc, setLogoSrc] = useState(fullLogoLight);

  useEffect(() => {
    setLogoSrc(theme === "light" ? fullLogo : fullLogoLight);
  }, [theme]);

  return (
    <Image
      className="app-logo"
      src={logoSrc}
      alt="Moussa Saidi Logo"
      width={235}
      height={50}
    />
  );
};

export default AppLogo;
