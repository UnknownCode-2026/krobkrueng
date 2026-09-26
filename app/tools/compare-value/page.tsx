import type { Metadata } from "next";
import ToolPageClient from "../../../components/tools/ToolPageClient";

export const metadata: Metadata = {
  title: "เทียบความคุ้มค่าออนไลน์ ฟรี — ครบเครื่อง",
  description: "เปรียบเทียบราคาต่อหน่วยของสินค้า A และ B พร้อมรองรับชิ้น กรัม กิโลกรัม มิลลิลิตร และลิตร",
  alternates: { canonical: "/tools/compare-value" },
  openGraph: {
    title: "เทียบความคุ้มค่าออนไลน์ ฟรี — ครบเครื่อง",
    description: "เปรียบเทียบราคาต่อหน่วยของสินค้า A และ B พร้อมรองรับชิ้น กรัม กิโลกรัม มิลลิลิตร และลิตร",
    url: "/tools/compare-value",
    images: ["/krobkrueng-logo.webp"],
  },
};

export default function ToolPage() {
  return <ToolPageClient kind="compare-value" />;
}
