import type { Metadata } from "next";
import ToolPageClient from "../../../components/tools/ToolPageClient";

export const metadata: Metadata = {
  title: "นับวันระหว่างวันที่ออนไลน์ ฟรี — ครบเครื่อง",
  description: "นับจำนวนวันระหว่างสองวันที่ พร้อมสรุปเป็นสัปดาห์และวัน ใช้งานฟรีบนมือถือ",
  alternates: { canonical: "/tools/date-count" },
  openGraph: {
    title: "นับวันระหว่างวันที่ออนไลน์ ฟรี — ครบเครื่อง",
    description: "เลือกวันที่เริ่มต้นและสิ้นสุดเพื่อดูจำนวนวันและสัปดาห์ทันที",
    url: "/tools/date-count",
    images: ["/krobkrueng-logo.webp"],
  },
};

export default function DateCountPage() {
  return <ToolPageClient kind="date-count" />;
}
