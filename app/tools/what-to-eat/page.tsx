import type { Metadata } from "next";
import ToolPageClient from "../../../components/tools/ToolPageClient";

export const metadata: Metadata = {
  title: "วันนี้กินอะไรดี — สุ่มเมนูอาหาร ฟรี | ครบเครื่อง",
  description: "สุ่มเมนูอาหารตามประเภท งบประมาณ และความเผ็ด ช่วยเลือกมื้อถัดไปได้ง่ายขึ้น",
  alternates: { canonical: "/tools/what-to-eat" },
  openGraph: {
    title: "วันนี้กินอะไรดี — สุ่มเมนูอาหาร ฟรี | ครบเครื่อง",
    description: "สุ่มเมนูอาหารตามประเภท งบประมาณ และความเผ็ด ช่วยเลือกมื้อถัดไปได้ง่ายขึ้น",
    url: "/tools/what-to-eat",
    images: ["/krobkrueng-logo.webp"],
  },
};

export default function ToolPage() {
  return <ToolPageClient kind="what-to-eat" />;
}
