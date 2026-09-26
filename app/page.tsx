"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type ToolItem = {
  id: string;
  icon: string;
  title: string;
  desc: string;
  category: string;
  popular?: boolean;
  isNew?: boolean;
  keywords: string[];
};

const tools: ToolItem[] = [
  { id: "split-bill", icon: "split", title: "หารค่าใช้จ่าย", desc: "แบ่งบิลกับเพื่อนให้ลงตัว", category: "การเงิน", popular: true, keywords: ["หารบิล","แชร์บิล","ค่าใช้จ่าย","เงิน"] },
  { id: "discount", icon: "tag", title: "คำนวณส่วนลด", desc: "รู้ราคาจริงหลังลดทันที", category: "ซื้อของ", popular: true, keywords: ["ส่วนลด","ลดราคา","เปอร์เซ็นต์","ซื้อของ"] },
  { id: "what-to-eat", icon: "bowl", title: "วันนี้กินอะไรดี", desc: "ช่วยเลือกมื้อถัดไปให้เร็วขึ้น", category: "อาหาร", popular: true, keywords: ["อาหาร","กินอะไร","สุ่มอาหาร","มื้อ"] },
  { id: "leave-time", icon: "clock", title: "ควรออกกี่โมง", desc: "ช่วยกะเวลาให้ไปถึงทัน", category: "เวลา", isNew: true, keywords: ["เวลา","ออกจากบ้าน","นัด","เดินทาง"] },
  { id: "date-count", icon: "calendar", title: "นับวัน", desc: "หาจำนวนวันระหว่างสองวันที่", category: "เวลา", popular: true, keywords: ["นับวัน","วันที่","เวลา","ระยะห่าง"] },
  { id: "salary", icon: "wallet", title: "แบ่งเงินเดือน", desc: "วางสัดส่วนค่าใช้จ่ายแบบง่าย", category: "การเงิน", keywords: ["เงินเดือน","แบ่งเงิน","งบ","การเงิน"] },
  { id: "compare-value", icon: "scale", title: "เทียบความคุ้มค่า", desc: "เทียบราคาต่อหน่วยก่อนซื้อ", category: "ซื้อของ", keywords: ["คุ้มค่า","เปรียบเทียบ","ราคา","ซื้อของ"] },
  { id: "percentage", icon: "percent", title: "คำนวณเปอร์เซ็นต์", desc: "คิดเปอร์เซ็นต์แบบไม่ต้องจำสูตร", category: "คำนวณ", isNew: true, keywords: ["เปอร์เซ็นต์","คำนวณ","ร้อยละ","%"] },
];

const categories = [
  { icon: "grid", name: "ทั้งหมด" },
  { icon: "wallet", name: "การเงิน" },
  { icon: "percent", name: "คำนวณ" },
  { icon: "clock", name: "เวลา" },
  { icon: "bowl", name: "อาหาร" },
  { icon: "bag", name: "ซื้อของ" },
];

function Icon({ name, size = 24 }: { name: string; size?: number }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  switch (name) {
    case "split": return <svg {...common}><path d="M7 5v5.5a2 2 0 0 0 2 2h6"/><path d="m12 9 3.5 3.5L12 16"/><circle cx="6.5" cy="4.5" r="2"/><circle cx="17.5" cy="12.5" r="2"/><circle cx="6.5" cy="19.5" r="2"/><path d="M8.5 19.5h2a4 4 0 0 0 4-4"/></svg>;
    case "tag": return <svg {...common}><path d="M4 4h6.6a2 2 0 0 1 1.4.6l7.4 7.4a2 2 0 0 1 0 2.8l-4.6 4.6a2 2 0 0 1-2.8 0L4.6 12A2 2 0 0 1 4 10.6Z"/><circle cx="8" cy="8" r="1.4"/><path d="m10 16 5-5"/></svg>;
    case "bowl": return <svg {...common}><path d="M4 11h16c0 5-3.2 8-8 8s-8-3-8-8Z"/><path d="M7 19h10"/><path d="M8 8c0-1.3 1-1.7 1-3"/><path d="M12 8c0-1.3 1-1.7 1-3"/><path d="M16 8c0-1.3 1-1.7 1-3"/></svg>;
    case "clock": return <svg {...common}><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3.2 2"/><path d="M12 3v1.4"/></svg>;
    case "calendar": return <svg {...common}><rect x="4" y="5.5" width="16" height="14" rx="2.5"/><path d="M8 3.5v4M16 3.5v4M4 9.5h16"/><path d="M8 13h3M8 16h6"/></svg>;
    case "wallet": return <svg {...common}><path d="M5 6.5A2.5 2.5 0 0 1 7.5 4H18a2 2 0 0 1 2 2v12H7a3 3 0 0 1-3-3V7.5A1.5 1.5 0 0 1 5.5 6H18"/><path d="M20 10h-4a2 2 0 0 0 0 4h4"/><circle cx="16" cy="12" r=".7" fill="currentColor" stroke="none"/></svg>;
    case "scale": return <svg {...common}><path d="M12 4v16M7 20h10M6 6h12"/><path d="m6 6-3 5h6L6 6Zm12 0-3 5h6l-3-5Z"/><path d="M3 11c0 1.7 1.2 3 3 3s3-1.3 3-3M15 11c0 1.7 1.2 3 3 3s3-1.3 3-3"/></svg>;
    case "percent": return <svg {...common}><circle cx="8" cy="8" r="2.3"/><circle cx="16" cy="16" r="2.3"/><path d="M17.5 6.5 6.5 17.5"/></svg>;
    case "grid": return <svg {...common}><rect x="4" y="4" width="6" height="6" rx="1.5"/><rect x="14" y="4" width="6" height="6" rx="1.5"/><rect x="4" y="14" width="6" height="6" rx="1.5"/><rect x="14" y="14" width="6" height="6" rx="1.5"/></svg>;
    case "bag": return <svg {...common}><path d="M5.5 8.5h13l1 11h-15l1-11Z"/><path d="M9 9V7a3 3 0 0 1 6 0v2"/></svg>;
    case "search": return <svg {...common}><circle cx="10.5" cy="10.5" r="6"/><path d="m15 15 4.5 4.5"/></svg>;
    case "heart": return <svg {...common}><path d="M20 8.4c0 5-8 10.1-8 10.1S4 13.4 4 8.4A4.1 4.1 0 0 1 11.2 5.7L12 6.6l.8-.9A4.1 4.1 0 0 1 20 8.4Z"/></svg>;
    case "sun": return <svg {...common}><circle cx="12" cy="12" r="3.6"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M18.7 5.3l-1.4 1.4M6.7 17.3l-1.4 1.4"/></svg>;
    case "moon": return <svg {...common}><path d="M19 15.5A8 8 0 0 1 8.5 5a8.2 8.2 0 1 0 10.5 10.5Z"/></svg>;
    case "home": return <svg {...common}><path d="m4 10 8-6 8 6v9a1 1 0 0 1-1 1h-5v-6h-4v6H5a1 1 0 0 1-1-1Z"/></svg>;
    case "info": return <svg {...common}><circle cx="12" cy="12" r="9"/><path d="M12 10v6M12 7h.01"/></svg>;
    case "chevron-left": return <svg {...common}><path d="m14.5 6-6 6 6 6"/></svg>;
    case "chevron-right": return <svg {...common}><path d="m9.5 6 6 6-6 6"/></svg>;
    case "arrow": return <svg {...common}><path d="M5 12h14M14 7l5 5-5 5"/></svg>;
    default: return <svg {...common}><circle cx="12" cy="12" r="8"/></svg>;
  }
}

function Logo({ className = "" }: { className?: string }) {
  return <img className={className} src="/krobkrueng-logo.webp" alt="ครบเครื่อง Krobkrueng" />;
}

function ToolCard({
  tool,
  favorite,
  onFavorite,
  onOpen,
  compact = false,
}: {
  tool: ToolItem;
  favorite: boolean;
  onFavorite: () => void;
  onOpen: () => void;
  compact?: boolean;
}) {
  return (
    <article className={`tool-card ${compact ? "compact" : ""}`}>
      <button className="card-main" type="button" onClick={onOpen} aria-label={`เปิด ${tool.title}`}>
        <div className="tool-top">
          <div className="tool-icon"><Icon name={tool.icon} size={22} /></div>
          <div className="tool-badges">
            {tool.popular && <span>ยอดนิยม</span>}
            {tool.isNew && <span className="new-badge">ใหม่</span>}
          </div>
        </div>
        <div className="tool-copy">
          <small>{tool.category}</small>
          <h3>{tool.title}</h3>
          <p>{tool.desc}</p>
        </div>
        <span className="tool-arrow"><Icon name="arrow" size={18} /></span>
      </button>
      <button
        className={`favorite-btn ${favorite ? "is-favorite" : ""}`}
        type="button"
        onClick={onFavorite}
        aria-label={favorite ? `นำ ${tool.title} ออกจากรายการโปรด` : `เพิ่ม ${tool.title} ในรายการโปรด`}
      >
        <Icon name="heart" size={18} />
      </button>
    </article>
  );
}

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("ทั้งหมด");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recent, setRecent] = useState<string[]>([]);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [toast, setToast] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const categoryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("krobkrueng-favorites") || "[]");
    const savedRecent = JSON.parse(localStorage.getItem("krobkrueng-recent") || "[]");
    const savedTheme = localStorage.getItem("krobkrueng-theme") === "dark" ? "dark" : "light";
    setFavorites(Array.isArray(savedFavorites) ? savedFavorites : []);
    setRecent(Array.isArray(savedRecent) ? savedRecent : []);
    setTheme(savedTheme);
    document.documentElement.dataset.theme = savedTheme;
  }, []);

  useEffect(() => {
    localStorage.setItem("krobkrueng-favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("krobkrueng-recent", JSON.stringify(recent));
  }, [recent]);

  const normalizedQuery = query.trim().toLowerCase();

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const categoryMatch = category === "ทั้งหมด" || tool.category === category;
      const searchText = [tool.title, tool.desc, tool.category, ...tool.keywords].join(" ").toLowerCase();
      return categoryMatch && (!normalizedQuery || searchText.includes(normalizedQuery));
    });
  }, [normalizedQuery, category]);

  const suggestions = useMemo(() => {
    if (!normalizedQuery) return [];
    return tools.filter((tool) => [tool.title, tool.desc, tool.category, ...tool.keywords].join(" ").toLowerCase().includes(normalizedQuery)).slice(0, 5);
  }, [normalizedQuery]);

  const favoriteTools = useMemo(() => tools.filter((tool) => favorites.includes(tool.id)), [favorites]);
  const recentTools = useMemo(() => recent.map((id) => tools.find((tool) => tool.id === id)).filter(Boolean) as ToolItem[], [recent]);
  const popularTools = useMemo(() => tools.filter((tool) => tool.popular), []);
  const newTools = useMemo(() => tools.filter((tool) => tool.isNew), []);

  const toggleFavorite = (id: string) => {
    setFavorites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  };

  const openTool = (tool: ToolItem) => {
    setRecent((current) => [tool.id, ...current.filter((id) => id !== tool.id)].slice(0, 4));
    setToast(`${tool.title} กำลังเตรียมเปิดใช้งาน`);
    window.setTimeout(() => setToast(""), 1800);
  };

  const selectCategory = (name: string) => {
    setCategory(name);
    setQuery("");
    document.getElementById("tools")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const applySearch = (value: string) => {
    setQuery(value);
    setCategory("ทั้งหมด");
    setSearchFocused(false);
    window.setTimeout(() => document.getElementById("tools")?.scrollIntoView({ behavior: "smooth", block: "start" }), 40);
  };

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    localStorage.setItem("krobkrueng-theme", next);
  };

  const slideCategories = (direction: number) => {
    categoryRef.current?.scrollBy({ left: direction * 300, behavior: "smooth" });
  };

  const resetTools = () => {
    setQuery("");
    setCategory("ทั้งหมด");
  };

  const personalizedSections = recentTools.length > 0 || favoriteTools.length > 0;
  const showingFiltered = normalizedQuery.length > 0 || category !== "ทั้งหมด";

  return (
    <>
      <header className="topbar">
        <div className="shell topbar-inner">
          <a className="brand" href="#top" aria-label="ครบเครื่อง หน้าหลัก">
            <Logo className="header-logo" />
            <span className="brand-copy"><strong>ครบเครื่อง</strong><small>Krobkrueng</small></span>
          </a>

          <nav className="desktop-nav" aria-label="เมนูหลัก">
            <a className="active" href="#top">หน้าหลัก</a>
            <a href="#tools">เครื่องมือ</a>
            <a href="#categories">หมวดหมู่</a>
            <a href="#about">เกี่ยวกับ</a>
          </nav>

          <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label="เปลี่ยนธีม">
            <Icon name={theme === "light" ? "moon" : "sun"} size={19} />
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="shell hero-inner">
            <div className="hero-brandline">
              <Logo className="hero-mini-logo" />
              <span>เครื่องมือออนไลน์ฟรีสำหรับทุกวัน</span>
            </div>
            <h1>เรื่องเล็ก ๆ ในชีวิต<br /><span>ให้ครบเครื่องช่วย</span></h1>
            <p>ช่วยคิด คำนวณ และจัดการเรื่องประจำวันให้เร็วขึ้น ใช้ง่าย ฟรี และไม่ต้องสมัครสำหรับเครื่องมือพื้นฐาน</p>

            <div className="search-wrap">
              <div className={`search-box ${searchFocused ? "is-focus" : ""}`} role="search">
                <span className="search-icon"><Icon name="search" size={22} /></span>
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  onFocus={() => { setCategory("ทั้งหมด"); setSearchFocused(true); }}
                  onBlur={() => window.setTimeout(() => setSearchFocused(false), 130)}
                  aria-label="ค้นหาเครื่องมือ"
                  placeholder="ค้นหา เช่น หารบิล, ส่วนลด, นับวัน..."
                />
                {query && <button className="clear-search" type="button" onClick={() => setQuery("")}>ล้าง</button>}
                <a className="search-action" href="#tools">ค้นหา</a>
              </div>

              {searchFocused && query && (
                <div className="search-suggestions">
                  {suggestions.length > 0 ? suggestions.map((tool) => (
                    <button type="button" key={tool.id} onMouseDown={() => applySearch(tool.title)}>
                      <span className="suggestion-icon"><Icon name={tool.icon} size={18} /></span>
                      <span><b>{tool.title}</b><small>{tool.category} · {tool.desc}</small></span>
                      <Icon name="arrow" size={16} />
                    </button>
                  )) : (
                    <div className="suggestion-empty">ไม่พบเครื่องมือที่ตรงกับคำค้น</div>
                  )}
                </div>
              )}
            </div>

            <div className="quick-tags" aria-label="คำค้นยอดนิยม">
              <span>ค้นหายอดนิยม</span>
              {["หารบิล","ส่วนลด","เงินเดือน","นับวัน"].map((item) => (
                <button type="button" key={item} onClick={() => applySearch(item)}>{item}</button>
              ))}
            </div>
          </div>
        </section>

        <section id="categories" className="section category-section">
          <div className="shell">
            <div className="section-head compact-head">
              <div>
                <span className="kicker">เลือกเรื่องที่ต้องการ</span>
                <h2>หมวดหมู่</h2>
              </div>
              <div className="slider-controls" aria-label="เลื่อนหมวดหมู่">
                <button type="button" onClick={() => slideCategories(-1)} aria-label="เลื่อนไปทางซ้าย"><Icon name="chevron-left" size={18} /></button>
                <button type="button" onClick={() => slideCategories(1)} aria-label="เลื่อนไปทางขวา"><Icon name="chevron-right" size={18} /></button>
              </div>
            </div>

            <div className="category-row" ref={categoryRef}>
              {categories.map((item) => (
                <button
                  className={`category-pill ${category === item.name ? "active" : ""}`}
                  type="button"
                  onClick={() => selectCategory(item.name)}
                  key={item.name}
                >
                  <span><Icon name={item.icon} size={19} /></span>
                  <b>{item.name}</b>
                </button>
              ))}
            </div>
          </div>
        </section>

        {personalizedSections && (
          <section className="section personal-section">
            <div className="shell personal-stack">
              {recentTools.length > 0 && (
                <div className="personal-block">
                  <div className="section-head compact-head">
                    <div><span className="kicker">กลับมาใช้ต่อได้ทันที</span><h2>ใช้ล่าสุด</h2></div>
                  </div>
                  <div className="mini-tool-row">
                    {recentTools.map((tool) => (
                      <ToolCard key={tool.id} tool={tool} compact favorite={favorites.includes(tool.id)} onFavorite={() => toggleFavorite(tool.id)} onOpen={() => openTool(tool)} />
                    ))}
                  </div>
                </div>
              )}

              {favoriteTools.length > 0 && (
                <div className="personal-block">
                  <div className="section-head compact-head">
                    <div><span className="kicker">เครื่องมือที่คุณเก็บไว้</span><h2>รายการโปรด</h2></div>
                  </div>
                  <div className="mini-tool-row">
                    {favoriteTools.map((tool) => (
                      <ToolCard key={tool.id} tool={tool} compact favorite onFavorite={() => toggleFavorite(tool.id)} onOpen={() => openTool(tool)} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        <section id="tools" className="section tools-section">
          <div className="shell">
            {showingFiltered ? (
              <>
                <div className="section-head">
                  <div>
                    <span className="kicker">{normalizedQuery ? "ผลลัพธ์จากคำค้นของคุณ" : `กำลังดูหมวด ${category}`}</span>
                    <h2>{normalizedQuery ? `ผลการค้นหา “${query}”` : `เครื่องมือ${category}`}</h2>
                  </div>
                  <span className="section-note">{filteredTools.length} เครื่องมือ</span>
                </div>

                {filteredTools.length > 0 ? (
                  <div className="tool-grid">
                    {filteredTools.map((tool) => (
                      <ToolCard key={tool.id} tool={tool} favorite={favorites.includes(tool.id)} onFavorite={() => toggleFavorite(tool.id)} onOpen={() => openTool(tool)} />
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    <span><Icon name="search" size={26} /></span>
                    <h3>ยังไม่พบเครื่องมือนี้</h3>
                    <p>ลองใช้คำอื่น หรือกลับไปดูเครื่องมือทั้งหมด</p>
                    <button type="button" onClick={resetTools}>ดูเครื่องมือทั้งหมด</button>
                  </div>
                )}
              </>
            ) : (
              <div className="tool-sections">
                <div className="tool-section-block">
                  <div className="section-head">
                    <div><span className="kicker">คนหยิบใช้บ่อย</span><h2>เครื่องมือยอดนิยม</h2></div>
                    <span className="section-note">{popularTools.length} เครื่องมือ</span>
                  </div>
                  <div className="tool-grid">
                    {popularTools.map((tool) => (
                      <ToolCard key={tool.id} tool={tool} favorite={favorites.includes(tool.id)} onFavorite={() => toggleFavorite(tool.id)} onOpen={() => openTool(tool)} />
                    ))}
                  </div>
                </div>

                <div className="tool-section-block">
                  <div className="section-head">
                    <div><span className="kicker">มีอะไรใหม่ให้ลอง</span><h2>เพิ่มใหม่</h2></div>
                    <span className="section-note">{newTools.length} เครื่องมือ</span>
                  </div>
                  <div className="tool-grid compact-grid">
                    {newTools.map((tool) => (
                      <ToolCard key={tool.id} tool={tool} favorite={favorites.includes(tool.id)} onFavorite={() => toggleFavorite(tool.id)} onOpen={() => openTool(tool)} />
                    ))}
                  </div>
                </div>

                <div className="tool-section-block all-tools-block">
                  <div className="section-head">
                    <div><span className="kicker">รวมไว้ให้ครบในหน้าเดียว</span><h2>เครื่องมือทั้งหมด</h2></div>
                    <span className="section-note">{tools.length} เครื่องมือ</span>
                  </div>
                  <div className="tool-grid">
                    {tools.map((tool) => (
                      <ToolCard key={tool.id} tool={tool} favorite={favorites.includes(tool.id)} onFavorite={() => toggleFavorite(tool.id)} onOpen={() => openTool(tool)} />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        <section id="about" className="section about-section">
          <div className="shell about-card">
            <div className="about-brand">
              <Logo className="about-logo" />
              <div><strong>ครบเครื่อง</strong><small>Krobkrueng</small></div>
            </div>
            <div className="about-copy">
              <span className="kicker">ทำเรื่องประจำวันให้เบาลง</span>
              <h2>เครื่องมือเล็ก ๆ ที่เปิดแล้วใช้ได้ทันที</h2>
              <p>ครบเครื่องออกแบบให้เร็ว อ่านง่าย และใช้งานสะดวกบนมือถือ เครื่องมือพื้นฐานใช้งานฟรีโดยไม่ต้องสมัครสมาชิก</p>
            </div>
            <div className="trust-row"><span>ใช้ฟรี</span><span>ไม่ต้องสมัคร</span><span>Mobile-first</span></div>
          </div>
        </section>
      </main>

      <footer id="privacy" className="footer">
        <div className="shell footer-grid">
          <div className="footer-brand">
            <Logo className="footer-logo" />
            <div><strong>ครบเครื่อง</strong><p>เครื่องมือฟรีสำหรับชีวิตประจำวัน</p></div>
          </div>
          <div className="footer-links">
            <a href="#tools">เครื่องมือทั้งหมด</a>
            <a href="#categories">หมวดหมู่</a>
            <a href="#about">เกี่ยวกับ</a>
            <a href="#privacy">ความเป็นส่วนตัว</a>
          </div>
          <div className="privacy-note">รายการโปรด ธีม และประวัติใช้งานล่าสุดจัดเก็บในเบราว์เซอร์ของอุปกรณ์นี้</div>
          <span className="copyright">© 2026 Krobkrueng</span>
        </div>
      </footer>

      <nav className="mobile-nav" aria-label="เมนูมือถือ">
        <a className="active" href="#top"><Icon name="home" size={20} /><b>หน้าหลัก</b><i /></a>
        <a href="#tools"><Icon name="grid" size={20} /><b>เครื่องมือ</b><i /></a>
        <a href="#categories"><Icon name="bag" size={20} /><b>หมวดหมู่</b><i /></a>
        <a href="#about"><Icon name="info" size={20} /><b>เกี่ยวกับ</b><i /></a>
      </nav>

      {toast && <div className="toast" role="status">{toast}</div>}
    </>
  );
}
