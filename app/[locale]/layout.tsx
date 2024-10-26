import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/styles.scss";
import { ThemeProvider } from "next-themes";
import Header from "@/components/layout/Header";
import { GoogleAnalytics } from "@next/third-parties/google";
import { routing } from "@/i18n/routing";

import "@splidejs/splide/css";
import VercelSpeedInsights from "@/components/layout/VercelSpeedInsights";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/layout/BackToTop";
import { notFound } from "next/navigation";
import ILocale from "@/i18n/ILocale";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

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
    url: `./`,
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <Header />
            <main>
              {children}
              <BackToTop />
            </main>
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
      <GoogleAnalytics gaId="G-WE9JC34QQJ" />

      <VercelSpeedInsights />
    </html>
  );
}
