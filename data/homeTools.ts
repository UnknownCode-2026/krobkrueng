export type HomeToolId =
  | "split-bill"
  | "discount"
  | "what-to-eat"
  | "leave-time"
  | "date-count"
  | "salary"
  | "compare-value"
  | "percentage";

export type HomeTool = {
  id: HomeToolId;
  icon: string;
  title: string;
  desc: string;
  category: string;
  popular?: boolean;
  isNew?: boolean;
  keywords: string[];
  href: string;
  status: "ready";
};

export const homeTools: HomeTool[] = [
  { id: "split-bill", icon: "split", title: "หารค่าใช้จ่าย", desc: "แบ่งบิลกับเพื่อนให้ลงตัว", category: "การเงิน", popular: true, keywords: ["หารบิล","แชร์บิล","ค่าใช้จ่าย","เงิน","service charge","vat","ทิป"], href: "/tools/split-bill", status: "ready" },
  { id: "discount", icon: "tag", title: "คำนวณส่วนลด", desc: "รู้ราคาจริงหลังลดทันที", category: "ซื้อของ", popular: true, keywords: ["ส่วนลด","ลดราคา","เปอร์เซ็นต์","ซื้อของ"], href: "/tools/discount", status: "ready" },
  { id: "what-to-eat", icon: "bowl", title: "วันนี้กินอะไรดี", desc: "ช่วยเลือกมื้อถัดไปให้เร็วขึ้น", category: "อาหาร", popular: true, keywords: ["อาหาร","กินอะไร","สุ่มอาหาร","มื้อ","เมนู"], href: "/tools/what-to-eat", status: "ready" },
  { id: "leave-time", icon: "clock", title: "ควรออกกี่โมง", desc: "ช่วยกะเวลาให้ไปถึงทัน", category: "เวลา", isNew: true, keywords: ["เวลา","ออกจากบ้าน","นัด","เดินทาง","เผื่อเวลา"], href: "/tools/leave-time", status: "ready" },
  { id: "date-count", icon: "calendar", title: "นับวัน", desc: "หาจำนวนวันระหว่างสองวันที่", category: "เวลา", popular: true, keywords: ["นับวัน","วันที่","เวลา","ระยะห่าง"], href: "/tools/date-count", status: "ready" },
  { id: "salary", icon: "wallet", title: "แบ่งเงินเดือน", desc: "วางสัดส่วนค่าใช้จ่ายแบบง่าย", category: "การเงิน", keywords: ["เงินเดือน","แบ่งเงิน","งบ","การเงิน","50 30 20"], href: "/tools/salary", status: "ready" },
  { id: "compare-value", icon: "scale", title: "เทียบความคุ้มค่า", desc: "เทียบราคาต่อหน่วยก่อนซื้อ", category: "ซื้อของ", keywords: ["คุ้มค่า","เปรียบเทียบ","ราคา","ซื้อของ","ราคาต่อหน่วย"], href: "/tools/compare-value", status: "ready" },
  { id: "percentage", icon: "percent", title: "คำนวณเปอร์เซ็นต์", desc: "คิดเปอร์เซ็นต์แบบไม่ต้องจำสูตร", category: "คำนวณ", isNew: true, keywords: ["เปอร์เซ็นต์","คำนวณ","ร้อยละ","%"], href: "/tools/percentage", status: "ready" },
];

export const homeCategories = [
  { icon: "grid", name: "ทั้งหมด" },
  { icon: "wallet", name: "การเงิน" },
  { icon: "percent", name: "คำนวณ" },
  { icon: "clock", name: "เวลา" },
  { icon: "bowl", name: "อาหาร" },
  { icon: "bag", name: "ซื้อของ" },
];

export const homeToolMap = Object.fromEntries(
  homeTools.map((tool) => [tool.id, tool]),
) as Record<HomeToolId, HomeTool>;
