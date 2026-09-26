import type { Metadata } from "next";
import ToolPageClient from "../../../components/tools/ToolPageClient";

export const metadata: Metadata = {
  title: "คำนวณเปอร์เซ็นต์ออนไลน์ ฟรี — ครบเครื่อง",
  description: "หาเปอร์เซ็นต์ของจำนวน สัดส่วนระหว่างสองค่า และเปอร์เซ็นต์การเปลี่ยนแปลงได้ทันที",
  alternates: { canonical: "/tools/percentage" },
  openGraph: {
    title: "คำนวณเปอร์เซ็นต์ออนไลน์ ฟรี — ครบเครื่อง",
    description: "คำนวณเปอร์เซ็นต์หลายรูปแบบได้ง่ายและรวดเร็ว",
    url: "/tools/percentage",
    images: ["/krobkrueng-logo.webp"],
  },
};

export default function PercentagePage() {
  return <ToolPageClient kind="percentage" />;
}
