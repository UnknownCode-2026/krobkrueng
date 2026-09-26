import type { Metadata } from "next";
import ToolPageClient from "../../../components/tools/ToolPageClient";

export const metadata: Metadata = {
  title: "หารค่าใช้จ่าย / หารบิลออนไลน์ ฟรี — ครบเครื่อง",
  description: "หารค่าใช้จ่ายต่อคน พร้อม Service Charge, VAT, ทิป และตัวเลือกปัดยอด ใช้งานฟรีบนมือถือ",
  alternates: { canonical: "/tools/split-bill" },
  openGraph: {
    title: "หารค่าใช้จ่าย / หารบิลออนไลน์ ฟรี — ครบเครื่อง",
    description: "หารค่าใช้จ่ายต่อคน พร้อม Service Charge, VAT, ทิป และตัวเลือกปัดยอด ใช้งานฟรีบนมือถือ",
    url: "/tools/split-bill",
    images: ["/krobkrueng-logo.webp"],
  },
};

export default function ToolPage() {
  return <ToolPageClient kind="split-bill" />;
}
