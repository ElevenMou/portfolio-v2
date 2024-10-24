import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/styles.scss";
import { ThemeProvider } from "next-themes";
import Header from "@/components/layout/Header";
import "@splidejs/splide/css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <Header />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
