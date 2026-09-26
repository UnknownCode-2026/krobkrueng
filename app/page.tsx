export default function HomePage() {
  const previews = [
    ["💰","วางแผนงบรายวัน","วันนี้ใช้ได้เท่าไรถึงจะพอดี"],
    ["🛒","เทียบความคุ้มค่า","ชิ้นไหนคุ้มกว่ากัน คิดให้เร็วขึ้น"],
    ["🍜","วันนี้กินอะไรดี","ช่วยลดเวลาคิดเรื่องมื้อถัดไป"],
    ["⏰","ควรออกจากบ้านกี่โมง","วางแผนเวลาให้ไม่รีบเกินไป"],
    ["👥","หารค่าใช้จ่าย","แบ่งบิลกับเพื่อนแบบเข้าใจง่าย"],
    ["📊","แบ่งเงินเดือน","จัดสัดส่วนเงินให้เห็นภาพง่ายขึ้น"]
  ];
  return (
    <>
      <header className="site-header"><div className="wrap nav"><a className="brand" href="#"><span className="brand-icon">ค</span><span><b>ครบเครื่อง</b><small>Krobkrueng</small></span></a><a className="nav-cta" href="#preview">เริ่มใช้งาน</a></div></header>
      <main>
        <section className="hero"><div className="wrap hero-grid"><div><span className="pill">เว็บไซต์ฟรี เพื่อชีวิตประจำวันที่ง่ายขึ้น</span><h1>เรื่องยุ่ง ๆ ในชีวิต<br/><em>ให้ครบเครื่องช่วย</em></h1><p className="lead">รวมเครื่องมือเล็ก ๆ ที่ช่วยคิด คำนวณ และตัดสินใจเรื่องประจำวัน ให้คุณทำเรื่องจุกจิกได้ง่ายและเร็วขึ้น</p><div className="actions"><a className="primary" href="#preview">ลองดูเครื่องมือ</a><a className="secondary" href="#why">รู้จักครบเครื่อง</a></div><div className="mini-proof"><span>✓ ใช้ฟรี</span><span>✓ ไม่ต้องสมัคร</span><span>✓ รองรับมือถือ</span></div></div><div className="hero-demo"><div className="demo-top"><i></i><i></i><i></i><span>krobkrueng.vercel.app</span></div><div className="demo-body"><span className="tiny-pill">✨ วันนี้มีอะไรให้ช่วย?</span><h3>วันนี้อยากให้<br/>ครบเครื่องช่วยเรื่องอะไร?</h3><div className="fake-search">🔎 ลองพิมพ์ “แบ่งเงินเดือน 30,000 ใช้ได้วันละเท่าไร?”</div><div className="demo-chips"><span>💰 เรื่องเงิน</span><span>🛒 ซื้อของ</span><span>⏰ เวลา</span><span>🍜 อาหาร</span></div></div></div></div></section>
        <section id="preview" className="search-section"><div className="wrap narrow"><span className="eyebrow">เริ่มจากเรื่องของคุณ</span><h2>วันนี้อยากให้ครบเครื่องช่วยเรื่องอะไร?</h2><p>V1 เน้นสร้างประสบการณ์หน้าหลักให้เรียบง่ายก่อน เครื่องมือจริงจะทยอยเปิดในเวอร์ชันถัดไป</p><div className="big-search"><span>🔎</span><input disabled placeholder="เช่น เดือนนี้ควรแบ่งเงินยังไงดี?"/><button disabled>เร็ว ๆ นี้</button></div></div></section>
        <section id="why" className="section"><div className="wrap"><div className="heading"><span className="eyebrow">ทำไมต้องครบเครื่อง</span><h2>สร้างมาให้ใช้ง่าย ตั้งแต่ครั้งแรก</h2></div><div className="benefits"><article><span>●</span><h3>ใช้งานฟรี</h3><p>เครื่องมือพื้นฐานเปิดให้ใช้โดยไม่ต้องจ่ายเงิน</p></article><article><span>⚡</span><h3>ใช้งานง่าย</h3><p>เข้าใจได้ทันที ไม่ต้องเรียนรู้ระบบที่ซับซ้อน</p></article><article><span>▣</span><h3>ใช้ได้ทุกอุปกรณ์</h3><p>ออกแบบ Mobile-first ให้ใช้งานบนมือถือได้สะดวก</p></article><article><span>🌱</span><h3>เพื่อชีวิตประจำวัน</h3><p>เน้นปัญหาที่คนทั่วไปเจอจริง และช่วยลดเวลาคิด</p></article></div></div></section>
        <section className="section soft"><div className="wrap"><div className="heading"><span className="eyebrow">ตัวอย่างเครื่องมือในอนาคต</span><h2>เรื่องเล็ก ๆ ให้เราช่วยคิด</h2><p>ตัวอย่างแนวทางของเครื่องมือที่จะทยอยเพิ่มเข้ามา</p></div><div className="preview-grid">{previews.map(([icon,title,desc])=><article className="tool-card" key={title}><span>{icon}</span><div><h3>{title}</h3><p>{desc}</p></div><b>เร็ว ๆ นี้</b></article>)}</div></div></section>
        <section className="pain"><div className="wrap pain-grid"><div><span className="eyebrow">ถ้าเคยคิดแบบนี้ เราเข้าใจ</span><h2>ปัญหาเล็ก ๆ<br/>ที่เจอได้ทุกวัน</h2></div><div className="questions"><p>“เงินเดือนเท่านี้ วันนี้ใช้ได้อีกเท่าไร?”</p><p>“สองแพ็กนี้ อันไหนคุ้มกว่ากัน?”</p><p>“ออกจากบ้านกี่โมงถึงจะไม่สาย?”</p><p>“มื้อนี้กินอะไรดี คิดไม่ออกแล้ว”</p><strong>เรื่องพวกนี้ ให้ครบเครื่องช่วย →</strong></div></div></section>
        <section className="section"><div className="wrap"><div className="heading center"><span className="eyebrow">COMING SOON</span><h2>กำลังเตรียมเครื่องมือให้ครบขึ้น</h2></div><div className="categories"><span>💰 การเงิน</span><span>🛒 ซื้อของ</span><span>⏰ เวลา</span><span>🍜 อาหาร</span><span>🏡 ชีวิตประจำวัน</span></div><div className="cta"><h2>ชีวิตประจำวัน ไม่จำเป็นต้องยุ่งยาก</h2><p>ครบเครื่องกำลังสร้างเครื่องมือที่เรียบง่าย ใช้ฟรี และช่วยคุณได้จริง</p><a href="#preview">เริ่มจากหน้าหลักของครบเครื่อง</a></div></div></section>
      </main>
      <footer><div className="wrap footer"><div><b>ครบเครื่อง</b><p>เครื่องมือออนไลน์ฟรี เพื่อชีวิตประจำวันที่สะดวกขึ้น</p></div><span>© 2026 Krobkrueng · V1</span></div></footer>
    </>
  );
}
