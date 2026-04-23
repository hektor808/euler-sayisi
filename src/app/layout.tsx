import type { Metadata } from "next";
import { Fraunces, JetBrains_Mono, Manrope } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Euler Sayısı: Matematiğin Doğal Sabiti",
  description:
    "Bekir Ozan Demir tarafından hazırlanan, Euler sayısı e üzerine etkileşimli ve kaynaklı 11. sınıf matematik projesi.",
  keywords: [
    "Euler sayısı",
    "e sayısı",
    "doğal logaritma",
    "bileşik faiz",
    "11. sınıf matematik",
    "TED Konya Koleji",
  ],
  authors: [{ name: "Bekir Ozan Demir" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      suppressHydrationWarning
      className={`${manrope.variable} ${fraunces.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
