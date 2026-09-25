import Link from "next/link";
import { categories } from "@/data/tools";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-glow" aria-hidden="true"></div>

      <div className="container footer-topline">
        <span>ครบทุกเรื่องที่ต้องใช้เครื่องมือ</span>
        <Link href="/tools">สำรวจเครื่องมือทั้งหมด <b>↗</b></Link>
      </div>

      <div className="container footer-grid">
        <div className="footer-brand-col">
          <Link className="brand footer-brand" href="/">
            <span className="brand-mark" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
            <span className="brand-copy">ครบเครื่อง<small>KROBKRUENG · V1.1</small></span>
          </Link>
          <p>เครื่องมือออนไลน์ภาษาไทยที่ออกแบบให้เร็ว สวย ใช้ง่ายบนมือถือ และเคารพความเป็นส่วนตัว</p>
          <span className="footer-badge">GOLD EXPERIENCE</span>
        </div>

        <div>
          <h3>สำรวจ</h3>
          <Link href="/tools">เครื่องมือทั้งหมด</Link>
          <Link href="/categories">หมวดหมู่</Link>
          <Link href="/about">เกี่ยวกับเรา</Link>
        </div>

        <div>
          <h3>หมวดหมู่ยอดนิยม</h3>
          {categories.slice(0, 5).map((category) => <Link key={category.slug} href={"/categories/" + category.slug}>{category.name}</Link>)}
        </div>

        <div>
          <h3>Privacy-first</h3>
          <p>เครื่องมือคำนวณและงานไฟล์ที่รองรับทำงานบนอุปกรณ์ของคุณเป็นหลัก โดยไม่บันทึกค่าที่กรอกไว้บนเซิร์ฟเวอร์</p>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© 2026 ครบเครื่อง — KrobKrueng</span>
        <div><span>V1.1</span><i></i><span>Gold Edition</span></div>
      </div>
    </footer>
  );
}
