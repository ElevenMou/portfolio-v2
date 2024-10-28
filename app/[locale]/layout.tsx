import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/styles.scss";
import { ThemeProvider } from "next-themes";
import Header from "@/components/layout/Header";
import { routing } from "@/i18n/routing";
import { Analytics } from "@vercel/analytics/react";

import "@splidejs/splide/css";
import VercelSpeedInsights from "@/components/layout/VercelSpeedInsights";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/layout/BackToTop";
import { notFound } from "next/navigation";
import ILocale from "@/i18n/ILocale";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "Moussa Saidi",
    template: "%s | Moussa Saidi",
  },
  description: "Moussa Saidi Portfolio and Blog",
  keywords: [
    "Moussa Saidi",
    "Portfolio",
    "Blog",
    "Software Engineer",
    "Software Engineer in Morocco",
    "Software Engineer in Africa",
    "React Developer",
    "Next.js Developer",
    "Developer in Africa",
    "Developer in Morocco",
    "Developer in Africa and Morocco",
    "node.js Developer",
    "Moussa Saidi Portfolio",
    "Moussa Saidi Blog",
    "Frontend Developer",
    "Backend Developer",
    "Fullstack Developer",
    "Software Developer",
  ],
  alternates: {
    canonical: `./`,
  },
  openGraph: {
    siteName: "Moussa Saidi",
    url: process.env.NEXT_PUBLIC_APP_URL,
    title: "Moussa Saidi",
    description: "Moussa Saidi Portfolio and Blog",
  },
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  if (!routing.locales.includes(locale as ILocale)) {
    notFound();
  }
  const messages = await getMessages();
  return (
    <html lang={locale} suppressHydrationWarning>
      <GoogleTagManager gtmId="GTM-WZMBKRGW" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <a href="#main-content" className="skip-link">
              Skip to main content
            </a>
            <Header />
            <main id="main-content">
              {children}
              <BackToTop />
            </main>
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
      <Analytics />
      <VercelSpeedInsights />
      <GoogleAnalytics gaId="G-WE9JC34QQJ" />
    </html>
  );
}
