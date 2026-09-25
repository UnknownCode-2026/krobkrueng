import Link from "next/link";
import { categories } from "@/data/tools";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Link className="brand footer-brand" href="/">
            <span className="brand-mark" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
            <span className="brand-copy">ครบเครื่อง<small>KROBKRUENG</small></span>
          </Link>
          <p>เครื่องมือออนไลน์ภาษาไทย ใช้ง่ายบนมือถือ ใช้ฟรี และเน้นประมวลผลในเบราว์เซอร์</p>
        </div>
        <div>
          <h3>เครื่องมือ</h3>
          <Link href="/tools">เครื่องมือทั้งหมด</Link>
          <Link href="/categories">หมวดหมู่</Link>
          <Link href="/tools?status=ready">พร้อมใช้งาน</Link>
        </div>
        <div>
          <h3>หมวดหมู่</h3>
          {categories.slice(0, 5).map((category) => <Link key={category.slug} href={"/categories/" + category.slug}>{category.name}</Link>)}
        </div>
        <div>
          <h3>ความเป็นส่วนตัว</h3>
          <p>เครื่องมือคำนวณและงานไฟล์ที่รองรับจะทำในอุปกรณ์ของคุณเป็นหลัก โดยไม่บันทึกค่าที่กรอกไว้บนเซิร์ฟเวอร์</p>
        </div>
      </div>
      <div className="container footer-bottom"><span>© 2026 ครบเครื่อง — KrobKrueng V1</span><span>Gold Edition</span></div>
    </footer>
  );
}
