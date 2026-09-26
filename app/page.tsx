const tools = [
  { icon: "💸", title: "หารค่าใช้จ่าย", desc: "แบ่งบิลกับเพื่อนให้ลงตัว", category: "การเงิน", tone: "mint" },
  { icon: "🏷️", title: "คำนวณส่วนลด", desc: "รู้ราคาจริงหลังลดทันที", category: "ซื้อของ", tone: "blue" },
  { icon: "🍜", title: "วันนี้กินอะไรดี", desc: "ช่วยเลือกมื้อถัดไปให้เร็วขึ้น", category: "อาหาร", tone: "orange" },
  { icon: "⏰", title: "ควรออกกี่โมง", desc: "ช่วยกะเวลาให้ไปถึงทัน", category: "เวลา", tone: "violet" },
  { icon: "📅", title: "นับวัน", desc: "หาจำนวนวันระหว่างสองวันที่", category: "เวลา", tone: "rose" },
  { icon: "💰", title: "แบ่งเงินเดือน", desc: "วางสัดส่วนค่าใช้จ่ายแบบง่าย", category: "การเงิน", tone: "green" },
  { icon: "⚖️", title: "เทียบความคุ้มค่า", desc: "เทียบราคาต่อหน่วยก่อนซื้อ", category: "ซื้อของ", tone: "sky" },
  { icon: "🧮", title: "คำนวณเปอร์เซ็นต์", desc: "คิดเปอร์เซ็นต์แบบไม่ต้องจำสูตร", category: "คำนวณ", tone: "yellow" },
];

const categories = [
  { icon: "💰", name: "การเงิน" },
  { icon: "🧮", name: "คำนวณ" },
  { icon: "⏰", name: "เวลา" },
  { icon: "🍜", name: "อาหาร" },
  { icon: "🛒", name: "ซื้อของ" },
  { icon: "✨", name: "ทั้งหมด" },
];

export default function HomePage() {
  return (
    <>
      <header className="topbar">
        <div className="shell topbar-inner">
          <a className="brand" href="#top" aria-label="ครบเครื่อง หน้าหลัก">
            <span className="brand-mark">ค</span>
            <span className="brand-copy">
              <strong>ครบเครื่อง</strong>
              <small>Krobkrueng</small>
            </span>
          </a>
          <nav className="desktop-nav" aria-label="เมนูหลัก">
            <a className="active" href="#top">หน้าหลัก</a>
            <a href="#popular">เครื่องมือ</a>
            <a href="#categories">หมวดหมู่</a>
          </nav>
          <span className="version-badge">V1.1</span>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="shell hero-inner">
            <span className="update-pill"><i /> อัปเดตใหม่ · V1.1</span>
            <h1>เรื่องเล็ก ๆ ในชีวิต<br /><span>ให้ครบเครื่องช่วย</span></h1>
            <p>รวมเครื่องมือออนไลน์ฟรีที่ช่วยคิด คำนวณ และจัดการเรื่องประจำวันให้ง่ายขึ้น</p>

            <div className="search-box" role="search">
              <span className="search-icon">⌕</span>
              <input aria-label="ค้นหาเครื่องมือ" placeholder="ค้นหาเครื่องมือที่ต้องการ..." />
              <button type="button" aria-label="ค้นหา">ค้นหา</button>
            </div>

            <div className="quick-tags" aria-label="คำค้นยอดนิยม">
              <span>ลองค้นหา:</span>
              <a href="#popular">หารบิล</a>
              <a href="#popular">ส่วนลด</a>
              <a href="#popular">เงินเดือน</a>
              <a href="#popular">นับวัน</a>
            </div>
          </div>
        </section>

        <section id="categories" className="section section-tight">
          <div className="shell">
            <div className="section-head compact-head">
              <div>
                <span className="kicker">เลือกตามเรื่องที่ต้องการ</span>
                <h2>หมวดหมู่</h2>
              </div>
              <a className="text-link" href="#popular">ดูทั้งหมด <span>→</span></a>
            </div>

            <div className="category-row">
              {categories.map((item) => (
                <a className="category-chip" href="#popular" key={item.name}>
                  <span>{item.icon}</span>
                  <b>{item.name}</b>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="popular" className="section tools-section">
          <div className="shell">
            <div className="section-head">
              <div>
                <span className="kicker">หยิบใช้ได้ไว ไม่ต้องหาเมนูซับซ้อน</span>
                <h2>เครื่องมือยอดนิยม</h2>
              </div>
              <span className="section-note">กำลังทยอยเปิดใช้งาน</span>
            </div>

            <div className="tool-grid">
              {tools.map((tool, index) => (
                <article className="tool-card" key={tool.title}>
                  <div className={`tool-icon ${tool.tone}`}>{tool.icon}</div>
                  <div className="tool-copy">
                    <div className="tool-meta">
                      <span>{tool.category}</span>
                      {index < 3 && <b>ยอดนิยม</b>}
                    </div>
                    <h3>{tool.title}</h3>
                    <p>{tool.desc}</p>
                  </div>
                  <span className="tool-arrow">→</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section daily-section">
          <div className="shell daily-card">
            <div className="daily-copy">
              <span className="kicker light">ครบเครื่องในทุกวัน</span>
              <h2>เปิดเว็บ แล้วเลือกสิ่งที่อยากให้ช่วยได้ทันที</h2>
              <p>เราออกแบบให้ทุกอย่างสั้น ชัด และเหมาะกับการใช้งานบนมือถือ ไม่ต้องสมัครสมาชิกสำหรับเครื่องมือพื้นฐาน</p>
              <div className="trust-row">
                <span>✓ ใช้ฟรี</span>
                <span>✓ ไม่ต้องสมัคร</span>
                <span>✓ Mobile-first</span>
              </div>
            </div>
            <div className="phone-preview" aria-hidden="true">
              <div className="phone-top"><i /><span>ครบเครื่อง</span><b>•••</b></div>
              <div className="phone-search">⌕ &nbsp; ค้นหาเครื่องมือ...</div>
              <div className="phone-grid">
                <span>💸<b>หารบิล</b></span>
                <span>🏷️<b>ส่วนลด</b></span>
                <span>🍜<b>กินอะไรดี</b></span>
                <span>⏰<b>เวลา</b></span>
              </div>
            </div>
          </div>
        </section>

        <section className="section roadmap-section">
          <div className="shell roadmap">
            <div>
              <span className="kicker">V1.1 Foundation</span>
              <h2>ตอนนี้เราโฟกัสให้หน้าแรกใช้ง่ายที่สุดก่อน</h2>
              <p>เวอร์ชันถัดไปจะเริ่มเปิดเครื่องมือจริงทีละตัว โดยใช้หน้าตาและประสบการณ์จาก V1.1 เป็นมาตรฐานของทั้งเว็บ</p>
            </div>
            <a className="primary-button" href="#popular">ดูเครื่องมือที่เตรียมไว้</a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="shell footer-inner">
          <div className="footer-brand">
            <span className="brand-mark small">ค</span>
            <div><strong>ครบเครื่อง</strong><p>เครื่องมือฟรีสำหรับชีวิตประจำวัน</p></div>
          </div>
          <span>© 2026 Krobkrueng · V1.1</span>
        </div>
      </footer>

      <nav className="mobile-nav" aria-label="เมนูมือถือ">
        <a className="active" href="#top"><span>⌂</span><b>หน้าหลัก</b></a>
        <a href="#popular"><span>▦</span><b>เครื่องมือ</b></a>
        <a href="#categories"><span>◫</span><b>หมวดหมู่</b></a>
        <a href="#top"><span>ⓘ</span><b>เกี่ยวกับ</b></a>
      </nav>
    </>
  );
}
