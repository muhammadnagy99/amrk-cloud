import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import MobileWrapper from "./mobile-wrapper";
import ScreenWrapper from "./screen-wrapper";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="rtl">
      <body
        className={`flex flex-col justify-center ${rubik.variable} antialiased bg-white`}
      >
        <MobileWrapper>
          <ScreenWrapper>{children}</ScreenWrapper>
        </MobileWrapper>
      </body>
    </html>
  );
}
