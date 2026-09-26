import type { Metadata } from "next";
import ToolPageClient from "../../../components/tools/ToolPageClient";

export const metadata: Metadata = {
  title: "แบ่งเงินเดือนออนไลน์ ฟรี — ครบเครื่อง",
  description: "ช่วยแบ่งเงินเดือนเป็นค่าใช้จ่ายจำเป็น ใช้ส่วนตัว และเงินออม พร้อมปรับสัดส่วนได้เอง",
  alternates: { canonical: "/tools/salary" },
  openGraph: {
    title: "แบ่งเงินเดือนออนไลน์ ฟรี — ครบเครื่อง",
    description: "ช่วยแบ่งเงินเดือนเป็นค่าใช้จ่ายจำเป็น ใช้ส่วนตัว และเงินออม พร้อมปรับสัดส่วนได้เอง",
    url: "/tools/salary",
    images: ["/krobkrueng-logo.webp"],
  },
};

export default function ToolPage() {
  return <ToolPageClient kind="salary" />;
}
