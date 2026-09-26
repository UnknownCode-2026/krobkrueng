import type { Metadata } from "next";
import Link from "next/link";
import { ToolIcon } from "../../components/KrobkruengIcons";
import { homeTools } from "../../data/homeTools";
import styles from "./tools.module.css";

export const metadata: Metadata = {
  title: "เครื่องมือทั้งหมด — ครบเครื่อง",
  description: "รวมเครื่องมือออนไลน์ฟรีของครบเครื่องที่พร้อมใช้งานจริง",
  alternates: { canonical: "/tools" },
};

export default function ToolsPage() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <Link href="/" className={styles.back}>← กลับหน้าหลัก</Link>

        <header className={styles.header}>
          <div className={styles.brand}>
            <img src="/krobkrueng-logo.webp" alt="ครบเครื่อง" width={44} height={44} />
            <div><strong>ครบเครื่อง</strong><small>Krobkrueng</small></div>
          </div>
          <span className={styles.eyebrow}>เครื่องมือพร้อมใช้</span>
          <h1>เครื่องมือทั้งหมด</h1>
          <p>เลือกเครื่องมือที่ต้องการ ใช้งานฟรี ไม่ต้องสมัคร และออกแบบให้ใช้ง่ายบนมือถือ</p>
          <div className={styles.count}><strong>{homeTools.length}</strong><span>เครื่องมือพร้อมใช้งาน</span></div>
        </header>

        <section className={styles.grid} aria-label="เครื่องมือทั้งหมด">
          {homeTools.map((tool) => (
            <Link href={tool.href} className={styles.card} key={tool.id}>
              <div className={styles.icon}><ToolIcon name={tool.icon} size={58} /></div>
              <div className={styles.copy}>
                <span>{tool.category}</span>
                <h2>{tool.title}</h2>
                <p>{tool.desc}</p>
              </div>
              <b className={styles.arrow}>→</b>
            </Link>
          ))}
        </section>

        <footer className={styles.footer}>
          <span>ครบเครื่อง · เครื่องมือฟรีสำหรับชีวิตประจำวัน</span>
          <div><Link href="/about">เกี่ยวกับ</Link><Link href="/privacy">ความเป็นส่วนตัว</Link></div>
        </footer>
      </div>
    </main>
  );
}
