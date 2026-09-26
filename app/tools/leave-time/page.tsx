import type { Metadata } from "next";
import ToolPageClient from "../../../components/tools/ToolPageClient";

export const metadata: Metadata = {
  title: "ควรออกกี่โมง — คำนวณเวลาเดินทาง ฟรี | ครบเครื่อง",
  description: "คำนวณเวลาที่ควรออกจากบ้านจากเวลาที่ต้องถึง เวลาเดินทาง และเวลาสำรอง",
  alternates: { canonical: "/tools/leave-time" },
  openGraph: {
    title: "ควรออกกี่โมง — คำนวณเวลาเดินทาง ฟรี | ครบเครื่อง",
    description: "คำนวณเวลาที่ควรออกจากบ้านจากเวลาที่ต้องถึง เวลาเดินทาง และเวลาสำรอง",
    url: "/tools/leave-time",
    images: ["/krobkrueng-logo.webp"],
  },
};

export default function ToolPage() {
  return <ToolPageClient kind="leave-time" />;
}
