"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { RiMenuFill } from "react-icons/ri";
import { RiCloseFill } from "react-icons/ri";
import AppLogo from "./AppLogo";
import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "./LocaleSwitcher";

const ThemeChanger = dynamic(() => import("@/components/themed/ThemeChanger"), {
  ssr: false,
});

const Header = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const t = useTranslations("Menu");
  return (
    <header>
      <div>
        <Link href="/">
          <AppLogo />
        </Link>
        <nav className={menuOpen ? "visible" : ""}>
          <ul>
            <li>
              <Link
                href="/blog"
                className={
                  pathname.startsWith("/blog") || pathname === "/blog"
                    ? "active"
                    : ""
                }
                onClick={() => setTimeout(() => setMenuOpen(false), 800)}
              >
                {t("Blog")}
              </Link>
            </li>
            <li>
              <Link
                href="/work"
                className={
                  pathname.startsWith("/work") || pathname === "/work"
                    ? "active"
                    : ""
                }
                onClick={() => setTimeout(() => setMenuOpen(false), 800)}
              >
                {t("Work")}
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className={
                  pathname.startsWith("/contact") || pathname === "/contact"
                    ? "active"
                    : ""
                }
                onClick={() => setTimeout(() => setMenuOpen(false), 800)}
              >
                {t("Contact")}
              </Link>
            </li>
          </ul>
          <div className="header-actions">
            <ThemeChanger />
            <LocaleSwitcher />
          </div>
        </nav>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <RiCloseFill size={28} /> : <RiMenuFill size={28} />}
        </button>
      </div>
    </header>
  );
};

export default Header;
