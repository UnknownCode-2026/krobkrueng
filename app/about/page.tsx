import type { Metadata } from "next";
import Link from "next/link";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "เกี่ยวกับเรา — ครบเครื่อง",
  description: "รู้จักครบเครื่อง Krobkrueng เว็บไซต์เครื่องมือออนไลน์ฟรีสำหรับชีวิตประจำวัน",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <Link className={styles.back} href="/" aria-label="กลับหน้าหลัก">
          <span aria-hidden="true">←</span>
          <span>กลับหน้าหลัก</span>
        </Link>

        <section className={styles.hero}>
          <div className={styles.brand}>
            <img
              src="/krobkrueng-logo.webp"
              alt="ครบเครื่อง Krobkrueng"
              width={76}
              height={76}
            />
            <div>
              <span className={styles.eyebrow}>เกี่ยวกับเรา</span>
              <h1>ครบเครื่อง</h1>
              <small>Krobkrueng</small>
            </div>
          </div>

          <p className={styles.lead}>
            เว็บไซต์รวมเครื่องมือออนไลน์ฟรีที่ช่วยให้เรื่องเล็ก ๆ ในชีวิตประจำวัน
            ทำได้ง่าย เร็ว และสะดวกขึ้น โดยออกแบบให้ใช้งานง่ายบนมือถือเป็นหลัก
          </p>

          <div className={styles.trust}>
            <span>ใช้ฟรี</span>
            <span>ไม่ต้องสมัคร</span>
            <span>Mobile-first</span>
          </div>
        </section>

        <div className={styles.grid}>
          <article>
            <span className={styles.number}>01</span>
            <div>
              <h2>เราทำอะไร</h2>
              <p>
                ครบเครื่องรวบรวมเครื่องมือสำหรับการคำนวณ การเงิน เวลา อาหาร
                การซื้อของ และงานประจำวัน เพื่อช่วยลดขั้นตอนที่ยุ่งยากให้เหลือการใช้งานที่ตรงไปตรงมา
              </p>
            </div>
          </article>

          <article>
            <span className={styles.number}>02</span>
            <div>
              <h2>แนวคิดของเว็บไซต์</h2>
              <p>
                เราเน้นประสบการณ์ที่สะอาด อ่านง่าย และเปิดแล้วใช้งานได้ทันที
                โดยลดองค์ประกอบที่ไม่จำเป็นและให้ความสำคัญกับความเร็วบนอุปกรณ์พกพา
              </p>
            </div>
          </article>

          <article>
            <span className={styles.number}>03</span>
            <div>
              <h2>ความเป็นส่วนตัว</h2>
              <p>
                เครื่องมือพื้นฐานใช้งานได้โดยไม่ต้องสมัครสมาชิก และการตั้งค่าบางส่วน
                เช่น รายการโปรด ธีม และประวัติใช้งานล่าสุดจะถูกเก็บไว้ในเบราว์เซอร์ของอุปกรณ์
              </p>
              <Link className={styles.inlineLink} href="/privacy">
                อ่านนโยบายความเป็นส่วนตัว →
              </Link>
            </div>
          </article>

          <article>
            <span className={styles.number}>04</span>
            <div>
              <h2>การพัฒนาต่อไป</h2>
              <p>
                ครบเครื่องจะทยอยเพิ่มเครื่องมือใหม่และพัฒนาฟังก์ชันเดิม
                โดยรักษาหลักการเดิมคือใช้งานง่าย เร็ว และเหมาะกับชีวิตประจำวัน
              </p>
            </div>
          </article>
        </div>

        <footer className={styles.footer}>
          <span>ครบเครื่อง · เครื่องมือฟรีสำหรับชีวิตประจำวัน</span>
          <Link href="/">กลับไปใช้เครื่องมือ</Link>
        </footer>
      </div>
    </main>
  );
}
