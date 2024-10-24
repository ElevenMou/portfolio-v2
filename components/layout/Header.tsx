"use client";
import Link from "next/link";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { RiMenuFill } from "react-icons/ri";
import { RiCloseFill } from "react-icons/ri";
import AppLogo from "./AppLogo";

const ThemeChanger = dynamic(() => import("@/components/themed/ThemeChanger"), {
  ssr: false,
});

const Header = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

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
                Blog
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
                Work
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
                Contact
              </Link>
            </li>
          </ul>
          <ThemeChanger />
        </nav>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <RiCloseFill size={28} /> : <RiMenuFill size={28} />}
        </button>
      </div>
    </header>
  );
};

export default Header;
