import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f8f4e",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://krobkrueng.netlify.app"),
  title: "ครบเครื่อง — เครื่องมือฟรีสำหรับชีวิตประจำวัน",
  description:
    "ครบเครื่อง รวมเครื่องมือออนไลน์ฟรี ช่วยคิด คำนวณ และจัดการเรื่องจุกจิกในชีวิตประจำวัน ใช้ง่ายบนทุกอุปกรณ์",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ครบเครื่อง",
    description: "เรื่องเล็ก ๆ ในชีวิต ให้ครบเครื่องช่วย",
    url: "https://krobkrueng.netlify.app",
    siteName: "ครบเครื่อง",
    locale: "th_TH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ครบเครื่อง",
    description: "เครื่องมือฟรีสำหรับชีวิตประจำวัน",
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
