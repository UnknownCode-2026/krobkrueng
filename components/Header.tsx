"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/tools", label: "เครื่องมือทั้งหมด" },
  { href: "/categories", label: "หมวดหมู่" },
  { href: "/about", label: "เกี่ยวกับเรา" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("krob-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const useDark = saved ? saved === "dark" : prefersDark;
    setDark(useDark);
    document.documentElement.dataset.theme = useDark ? "dark" : "light";
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? "dark" : "light";
    localStorage.setItem("krob-theme", next ? "dark" : "light");
  }

  return (
    <header className={scrolled ? "header header-scrolled" : "header"}>
      <div className="container header-inner">
        <Link className="brand" href="/" aria-label="ครบเครื่อง หน้าแรก">
          <span className="brand-mark" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
          <span className="brand-copy">ครบเครื่อง<small>KROBKRUENG · V1.1</small></span>
        </Link>

        <nav className={open ? "nav open" : "nav"} aria-label="เมนูหลัก">
          {links.map((link) => {
            const active = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link key={link.href} href={link.href} className={active ? "nav-link active" : "nav-link"} aria-current={active ? "page" : undefined}>
                {link.label}
              </Link>
            );
          })}
          <div className="mobile-nav-meta"><span>Gold Edition</span><span>58 เครื่องมือ</span></div>
        </nav>

        <div className="header-actions">
          <Link className="header-search" href="/tools" aria-label="ค้นหาเครื่องมือ">
            <span className="search-symbol">⌕</span><span className="search-label">ค้นหา</span><kbd>/</kbd>
          </Link>
          <button className="icon-btn theme-toggle" type="button" onClick={toggleTheme} aria-label={dark ? "ใช้โหมดสว่าง" : "ใช้โหมดมืด"}>
            <span aria-hidden="true">{dark ? "☀" : "☾"}</span>
          </button>
          <button className="icon-btn menu-btn" type="button" onClick={() => setOpen((value) => !value)} aria-label="เปิดเมนู" aria-expanded={open}>
            <span aria-hidden="true">{open ? "×" : "☰"}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
