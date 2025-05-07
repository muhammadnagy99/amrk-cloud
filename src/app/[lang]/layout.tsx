import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import { Locale } from "@/src/i18n-config";
import { CookiesProvider } from 'next-client-cookies/server';
import "primereact/resources/themes/lara-light-indigo/theme.css";



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
  other: {
    'Content-Security-Policy': "default-src 'self'; script-src 'self' https://applepay.cdn-apple.com 'unsafe-inline';"
  }
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
        <CookiesProvider>
          {children}
        </CookiesProvider>
      </body>
    </html>
  );
}
