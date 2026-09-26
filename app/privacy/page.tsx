import type { Metadata } from "next";
import Link from "next/link";
import styles from "./privacy.module.css";

export const metadata: Metadata = {
  title: "นโยบายความเป็นส่วนตัว — ครบเครื่อง",
  description: "นโยบายความเป็นส่วนตัวของเว็บไซต์ครบเครื่อง Krobkrueng",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <Link className={styles.back} href="/" aria-label="กลับหน้าหลัก">
          <span aria-hidden="true">←</span>
          <span>กลับหน้าหลัก</span>
        </Link>

        <div className={styles.brand}>
          <img
            src="/krobkrueng-logo.webp"
            alt="ครบเครื่อง Krobkrueng"
            width={44}
            height={44}
          />
          <div>
            <strong>ครบเครื่อง</strong>
            <small>Krobkrueng</small>
          </div>
        </div>

        <header className={styles.hero}>
          <span className={styles.eyebrow}>ข้อมูลของคุณ</span>
          <h1>นโยบายความเป็นส่วนตัว</h1>
          <p>
            ครบเครื่องให้ความสำคัญกับความเป็นส่วนตัว และออกแบบเครื่องมือพื้นฐาน
            ให้ใช้งานได้โดยลดการเก็บข้อมูลที่ไม่จำเป็น
          </p>
        </header>

        <div className={styles.content}>
          <section>
            <span className={styles.number}>01</span>
            <div>
              <h2>ข้อมูลที่จัดเก็บในอุปกรณ์</h2>
              <p>
                รายการโปรด ธีม เครื่องมือที่ใช้ล่าสุด และผลลัพธ์ล่าสุดบางรายการของเครื่องมือ
                จะถูกบันทึกด้วย Local Storage ภายในเบราว์เซอร์ของอุปกรณ์ที่คุณใช้งาน
                เพื่อให้เว็บไซต์จดจำการตั้งค่าและช่วยให้กลับมาใช้งานได้สะดวกขึ้น
              </p>
            </div>
          </section>

          <section>
            <span className={styles.number}>02</span>
            <div>
              <h2>บัญชีผู้ใช้และข้อมูลส่วนบุคคล</h2>
              <p>
                ขณะนี้เครื่องมือพื้นฐานของครบเครื่องไม่จำเป็นต้องสมัครสมาชิกหรือเข้าสู่ระบบ
                เว็บไซต์จึงไม่ได้ขอชื่อ อีเมล หรือรหัสผ่านเพื่อใช้งานเครื่องมือเหล่านี้
              </p>
            </div>
          </section>

          <section>
            <span className={styles.number}>03</span>
            <div>
              <h2>การควบคุมข้อมูลของคุณ</h2>
              <p>
                คุณสามารถล้างประวัติผลลัพธ์จากหน้าเครื่องมือที่รองรับได้โดยตรง
                และสามารถลบ Local Storage ทั้งหมดได้จากการตั้งค่าหรือล้างข้อมูลเว็บไซต์ในเบราว์เซอร์
              </p>
            </div>
          </section>

          <section>
            <span className={styles.number}>04</span>
            <div>
              <h2>บริการและฟีเจอร์ในอนาคต</h2>
              <p>
                หากมีการเพิ่มบริการที่ต้องรับหรือประมวลผลข้อมูลเพิ่มเติม
                นโยบายนี้จะได้รับการปรับปรุงเพื่ออธิบายประเภทข้อมูล วัตถุประสงค์
                และวิธีการจัดการข้อมูลให้เหมาะสมกับบริการนั้น
              </p>
            </div>
          </section>

          <section>
            <span className={styles.number}>05</span>
            <div>
              <h2>การเปลี่ยนแปลงนโยบาย</h2>
              <p>
                ครบเครื่องอาจปรับปรุงนโยบายความเป็นส่วนตัวเมื่อฟีเจอร์หรือวิธีการให้บริการเปลี่ยนแปลง
                โดยจะแสดงเนื้อหาฉบับล่าสุดไว้ในหน้านี้
              </p>
            </div>
          </section>
        </div>

        <footer className={styles.footer}>
          <span>ปรับปรุงล่าสุด: 26 กันยายน 2026</span>
          <Link href="/">กลับไปใช้เครื่องมือ</Link>
        </footer>
      </div>
    </main>
  );
}
