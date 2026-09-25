import Link from "next/link";
import Reveal from "@/components/Reveal";
import ToolCard from "@/components/ToolCard";
import { categories, featuredTools, tools } from "@/data/tools";

export default function HomePage() {
  const ready = tools.filter((tool) => tool.status === "ready").length;

  return (
    <>
      <section className="hero">
        <div className="hero-mesh" aria-hidden="true"></div>
        <div className="hero-orb orb-one" aria-hidden="true"></div>
        <div className="hero-orb orb-two" aria-hidden="true"></div>

        <div className="container hero-inner">
          <div className="hero-kicker"><span></span>KROBKRUENG V1.1 · GOLD EXPERIENCE</div>
          <h1>เครื่องมือออนไลน์ที่<br /><em>คิดมาเพื่อชีวิตจริง</em></h1>
          <p>คำนวณ จัดการไฟล์ สร้าง QR และแก้เรื่องจุกจิกในแต่ละวัน<br className="desktop-break" />ด้วยประสบการณ์ที่เร็ว เรียบง่าย และดูดีทุกหน้าจอ</p>

          <form className="search-box hero-search" action="/tools">
            <span className="search-orb" aria-hidden="true">⌕</span>
            <input name="q" aria-label="ค้นหาเครื่องมือ" placeholder="วันนี้อยากให้ครบเครื่องช่วยเรื่องอะไร?" />
            <span className="search-hint">58 tools</span>
            <button type="submit">ค้นหา <b>→</b></button>
          </form>

          <div className="quick-links">
            <span>ยอดนิยมตอนนี้</span>
            <Link href="/tools/thai-income-tax">ภาษีเงินได้ <b>↗</b></Link>
            <Link href="/tools/promptpay-qr">QR รับเงิน <b>↗</b></Link>
            <Link href="/tools/car-loan">ผ่อนรถ <b>↗</b></Link>
            <Link href="/tools/resize-image">ย่อรูป <b>↗</b></Link>
          </div>

          <div className="hero-proof">
            <div><strong>{tools.length}</strong><span>เครื่องมือทั้งหมด</span></div>
            <i></i>
            <div><strong>{ready}</strong><span>พร้อมใช้งาน</span></div>
            <i></i>
            <div><strong>0฿</strong><span>ใช้ฟรี ไม่ต้องสมัคร</span></div>
          </div>
        </div>
      </section>

      <section className="category-strip">
        <div className="container chips scroll-x">
          <Link className="chip active" href="/tools"><span>✦</span> ทั้งหมด</Link>
          {categories.map((category) => (
            <Link className="chip" key={category.slug} href={"/categories/" + category.slug}>
              <span>{category.icon}</span> {category.name}
            </Link>
          ))}
        </div>
      </section>

      <Reveal>
        <section className="container section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">CURATED FOR YOU</span>
              <h2>เครื่องมือที่ควรมีติดมือ</h2>
              <p>งานที่คนไทยใช้บ่อย จัดให้อยู่ในระยะคลิกเดียว</p>
            </div>
            <Link className="text-link" href="/tools">ดูทั้งหมด {tools.length} เครื่องมือ <span>↗</span></Link>
          </div>

          <div className="tools-grid featured-grid premium-grid">
            {featuredTools.slice(0, 8).map((tool) => <ToolCard key={tool.slug} tool={tool} featured />)}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="gold-showcase">
          <div className="showcase-glow" aria-hidden="true"></div>
          <div className="container gold-banner-inner">
            <div className="showcase-copy">
              <span className="eyebrow dark">PROMPTPAY · PRIVATE BY DESIGN</span>
              <h2>สร้าง QR รับเงิน<br />ให้ดูดีในไม่กี่วินาที</h2>
              <p>ระบุพร้อมเพย์และยอดเงิน ระบบสร้าง QR บนอุปกรณ์ของคุณ พร้อมดาวน์โหลดเป็น PNG ได้ทันที</p>
              <div className="showcase-actions">
                <Link className="dark-btn" href="/tools/promptpay-qr">สร้าง QR รับเงิน <span>↗</span></Link>
                <span className="privacy-chip">◉ ไม่บันทึกข้อมูล</span>
              </div>
            </div>

            <div className="payment-visual" aria-hidden="true">
              <div className="payment-orbit orbit-a"></div>
              <div className="payment-orbit orbit-b"></div>
              <div className="phone-card">
                <div className="phone-top"><span>พร้อมเพย์</span><b>•••</b></div>
                <div className="mock-qr">
                  <i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>
                </div>
                <strong>฿ 1,250.00</strong>
                <small>พร้อมรับเงินทันที</small>
                <div className="scan-line"></div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="container section categories-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">EXPLORE BY CATEGORY</span>
              <h2>เริ่มจากเรื่องที่คุณกำลังทำ</h2>
              <p>หมวดหมู่ชัดเจน หาเครื่องมือได้เร็วโดยไม่ต้องไล่ดูทีละรายการ</p>
            </div>
            <Link className="text-link" href="/categories">ทุกหมวดหมู่ <span>↗</span></Link>
          </div>

          <div className="category-grid">
            {categories.map((category) => {
              const count = tools.filter((tool) => tool.categorySlug === category.slug).length;
              return (
                <Link className="category-card" key={category.slug} href={"/categories/" + category.slug}>
                  <span className="category-icon">{category.icon}</span>
                  <div><h3>{category.name}</h3><p>{category.description}</p></div>
                  <b>{String(count).padStart(2, "0")}</b>
                  <span className="card-arrow">↗</span>
                </Link>
              );
            })}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="container experience-section">
          <div className="experience-card">
            <span className="experience-number">01</span><div className="experience-icon">⚡</div>
            <h3>เร็วและตรงประเด็น</h3><p>เปิดเครื่องมือ กรอกข้อมูล เห็นผลลัพธ์ทันที ไม่มีขั้นตอนที่ไม่จำเป็น</p>
          </div>
          <div className="experience-card">
            <span className="experience-number">02</span><div className="experience-icon">◇</div>
            <h3>ข้อมูลอยู่กับคุณ</h3><p>เครื่องมือที่รองรับประมวลผลในเบราว์เซอร์ ลดการส่งข้อมูลออกจากอุปกรณ์</p>
          </div>
          <div className="experience-card">
            <span className="experience-number">03</span><div className="experience-icon">◎</div>
            <h3>ออกแบบเพื่อมือถือ</h3><p>ปุ่ม ฟอร์ม และผลลัพธ์ถูกจัดให้แตะง่าย อ่านง่าย และลื่นบนหน้าจอเล็ก</p>
          </div>
        </section>
      </Reveal>

      <section className="trust-section">
        <div className="container trust-grid">
          <div><strong>{tools.length}</strong><span>เครื่องมือในแคตตาล็อก</span></div>
          <div><strong>{ready}</strong><span>พร้อมใช้ใน V1.1</span></div>
          <div><strong>0฿</strong><span>ใช้ฟรี ไม่ต้องสมัคร</span></div>
          <div><strong>TH</strong><span>ออกแบบเพื่อผู้ใช้ภาษาไทย</span></div>
        </div>
      </section>
    </>
  );
}
