import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#006b32",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://krobkrueng.netlify.app"),
  title: "ครบเครื่อง — เครื่องมือฟรีสำหรับชีวิตประจำวัน",
  description:
    "ครบเครื่อง รวมเครื่องมือออนไลน์ฟรี ช่วยคิด คำนวณ และจัดการเรื่องจุกจิกในชีวิตประจำวัน ใช้ง่ายบนทุกอุปกรณ์",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/krobkrueng-logo.webp",
    shortcut: "/krobkrueng-logo.webp",
    apple: "/krobkrueng-logo.webp",
  },
  openGraph: {
    title: "ครบเครื่อง",
    description: "เรื่องเล็ก ๆ ในชีวิต ให้ครบเครื่องช่วย",
    url: "https://krobkrueng.netlify.app",
    siteName: "ครบเครื่อง",
    locale: "th_TH",
    type: "website",
    images: [
      {
        url: "/krobkrueng-logo.webp",
        width: 160,
        height: 160,
        alt: "โลโก้ครบเครื่อง Krobkrueng",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "ครบเครื่อง",
    description: "เครื่องมือฟรีสำหรับชีวิตประจำวัน",
    images: ["/krobkrueng-logo.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
