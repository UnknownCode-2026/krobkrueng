import type { Metadata, Viewport } from "next";import "./globals.css";
export const viewport:Viewport={width:"device-width",initialScale:1};
export const metadata:Metadata={metadataBase:new URL("https://krobkrueng.vercel.app"),title:"ครบเครื่อง — เครื่องมือฟรีสำหรับชีวิตประจำวัน",description:"ครบเครื่อง รวมเครื่องมือออนไลน์ฟรี ช่วยคิด คำนวณ และแก้เรื่องจุกจิกในชีวิตประจำวัน ใช้ง่ายบนทุกอุปกรณ์",openGraph:{title:"ครบเครื่อง",description:"เรื่องยุ่ง ๆ ในชีวิต ให้ครบเครื่องช่วย",url:"https://krobkrueng.vercel.app",siteName:"ครบเครื่อง",locale:"th_TH",type:"website"}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="th"><body>{children}</body></html>}
