"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("krob-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const useDark = saved ? saved === "dark" : prefersDark;
    setDark(useDark);
    document.documentElement.dataset.theme = useDark ? "dark" : "light";
  }, []);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? "dark" : "light";
    localStorage.setItem("krob-theme", next ? "dark" : "light");
  }

  return (
    <header className="header">
      <div className="container header-inner">
        <Link className="brand" href="/" aria-label="ครบเครื่อง หน้าแรก">
          <span className="brand-mark" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
          <span className="brand-copy">ครบเครื่อง<small>KROBKRUENG</small></span>
        </Link>

        <nav className={open ? "nav open" : "nav"} aria-label="เมนูหลัก">
          <Link href="/tools" onClick={() => setOpen(false)}>เครื่องมือทั้งหมด</Link>
          <Link href="/categories" onClick={() => setOpen(false)}>หมวดหมู่</Link>
          <Link href="/about" onClick={() => setOpen(false)}>เกี่ยวกับเรา</Link>
        </nav>

        <div className="header-actions">
          <Link className="header-search" href="/tools">⌕ <span>ค้นหาเครื่องมือ</span></Link>
          <button className="icon-btn" type="button" onClick={toggleTheme} aria-label="สลับโหมดสี">{dark ? "☀" : "☾"}</button>
          <button className="icon-btn menu-btn" type="button" onClick={() => setOpen(!open)} aria-label="เปิดเมนู" aria-expanded={open}>{open ? "×" : "☰"}</button>
        </div>
      </div>
    </header>
  );
}
