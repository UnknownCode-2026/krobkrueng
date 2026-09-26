import type { Metadata } from "next";
import ToolPageClient from "../../../components/tools/ToolPageClient";

export const metadata: Metadata = {
  title: "คำนวณส่วนลดออนไลน์ ฟรี — ครบเครื่อง",
  description: "คำนวณราคาหลังลด จำนวนเงินที่ประหยัด และเปอร์เซ็นต์ส่วนลดได้ทันที ใช้งานฟรีบนมือถือ",
  alternates: { canonical: "/tools/discount" },
  openGraph: {
    title: "คำนวณส่วนลดออนไลน์ ฟรี — ครบเครื่อง",
    description: "คำนวณราคาหลังลดและจำนวนเงินที่ประหยัดได้ทันที",
    url: "/tools/discount",
    images: ["/krobkrueng-logo.webp"],
  },
};

export default function DiscountPage() {
  return <ToolPageClient kind="discount" />;
}
