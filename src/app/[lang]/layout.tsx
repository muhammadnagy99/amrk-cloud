import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import { Locale } from "@/src/i18n-config";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-rubik",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Amrk Cloud",
  description:
    "Transform your restaurant's operations with Amrk RMS, an innovative management solution built to enhance productivity and customer satisfaction.",
};

export default async function RootLayout({
  children, params
}: {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}) {

  const param = await params;

  const lang = param.lang;
  let dir = 'rtl';

  if (lang === 'en') {
    dir = 'ltr';

  }
  return (
    <html lang={lang} dir={dir}>
      <body
        className={`flex flex-col justify-center antialiased bg-white`}
      >
        {children}
      </body>
    </html>
  );
}
