"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ToolIcon, UiIcon } from "../KrobkruengIcons";
import styles from "./tool-page.module.css";

export type V16ToolKind = "discount" | "percentage" | "date-count";

type ToolDefinition = {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
};

const definitions: Record<V16ToolKind, ToolDefinition> = {
  discount: {
    id: "discount",
    title: "คำนวณส่วนลด",
    description: "คำนวณราคาหลังลด จำนวนเงินที่ประหยัด และสรุปผลให้พร้อมใช้งาน",
    category: "ซื้อของ",
    icon: "tag",
  },
  percentage: {
    id: "percentage",
    title: "คำนวณเปอร์เซ็นต์",
    description: "หาเปอร์เซ็นต์ของจำนวน สัดส่วนระหว่างสองค่า และเปอร์เซ็นต์การเปลี่ยนแปลง",
    category: "คำนวณ",
    icon: "percent",
  },
  "date-count": {
    id: "date-count",
    title: "นับวัน",
    description: "นับจำนวนวันระหว่างสองวันที่ พร้อมสรุปเป็นสัปดาห์และวัน",
    category: "เวลา",
    icon: "calendar",
  },
};

const related: Array<{ kind: V16ToolKind; href: string; title: string; icon: string }> = [
  { kind: "discount", href: "/tools/discount", title: "คำนวณส่วนลด", icon: "tag" },
  { kind: "percentage", href: "/tools/percentage", title: "คำนวณเปอร์เซ็นต์", icon: "percent" },
  { kind: "date-count", href: "/tools/date-count", title: "นับวัน", icon: "calendar" },
];

const money = (value: number) =>
  new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number.isFinite(value) ? value : 0);

const number = (value: number, digits = 2) =>
  new Intl.NumberFormat("th-TH", { maximumFractionDigits: digits }).format(
    Number.isFinite(value) ? value : 0,
  );

function parseDate(value: string) {
  if (!value) return null;
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day);
}

function useToolPreferences(id: string) {
  const [favorite, setFavorite] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("krobkrueng-theme") === "dark" ? "dark" : "light";
    setTheme(savedTheme);
    document.documentElement.dataset.theme = savedTheme;

    try {
      const savedFavorites = JSON.parse(localStorage.getItem("krobkrueng-favorites") || "[]");
      setFavorite(Array.isArray(savedFavorites) && savedFavorites.includes(id));

      const savedRecent = JSON.parse(localStorage.getItem("krobkrueng-recent") || "[]");
      const current = Array.isArray(savedRecent) ? savedRecent : [];
      localStorage.setItem(
        "krobkrueng-recent",
        JSON.stringify([id, ...current.filter((item: string) => item !== id)].slice(0, 4)),
      );
    } catch {
      // Keep the tool usable even if browser storage is unavailable.
    }
  }, [id]);

  const toggleFavorite = () => {
    try {
      const saved = JSON.parse(localStorage.getItem("krobkrueng-favorites") || "[]");
      const current: string[] = Array.isArray(saved) ? saved : [];
      const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
      localStorage.setItem("krobkrueng-favorites", JSON.stringify(next));
      setFavorite(next.includes(id));
    } catch {
      setFavorite((value) => !value);
    }
  };

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    localStorage.setItem("krobkrueng-theme", next);
  };

  return { favorite, theme, toggleFavorite, toggleTheme };
}

function ActionRow({
  onReset,
  onCopy,
  copyDisabled,
  copied,
}: {
  onReset: () => void;
  onCopy: () => void;
  copyDisabled?: boolean;
  copied: boolean;
}) {
  return (
    <div className={styles.actions}>
      <button type="button" className={styles.secondaryButton} onClick={onReset}>
        ล้างค่า
      </button>
      <button
        type="button"
        className={styles.primaryButton}
        onClick={onCopy}
        disabled={copyDisabled}
      >
        {copied ? "คัดลอกแล้ว ✓" : "คัดลอกผลลัพธ์"}
      </button>
    </div>
  );
}

function DiscountTool() {
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    const p = Number(price);
    const d = Number(discount);
    if (!price || !discount) return null;
    if (!Number.isFinite(p) || p < 0) return { error: "กรุณากรอกราคาเดิมเป็นตัวเลขตั้งแต่ 0 ขึ้นไป" };
    if (!Number.isFinite(d) || d < 0 || d > 100) return { error: "ส่วนลดต้องอยู่ระหว่าง 0–100%" };
    const saved = p * (d / 100);
    return { final: p - saved, saved, price: p, discount: d };
  }, [price, discount]);

  const copy = async () => {
    if (!result || "error" in result) return;
    const text = `ราคาเดิม ${money(result.price)} · ลด ${number(result.discount)}% · ประหยัด ${money(result.saved)} · เหลือ ${money(result.final)}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div className={styles.workspaceGrid}>
      <section className={styles.formCard}>
        <div className={styles.cardHeading}>
          <span>ข้อมูลที่ใช้คำนวณ</span>
          <small>ผลลัพธ์อัปเดตทันที</small>
        </div>
        <div className={styles.fields}>
          <label className={styles.field}>
            <span>ราคาเดิม</span>
            <div className={styles.inputWrap}>
              <input
                type="number"
                inputMode="decimal"
                min="0"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                placeholder="1,290"
              />
              <b>บาท</b>
            </div>
          </label>
          <label className={styles.field}>
            <span>ส่วนลด</span>
            <div className={styles.inputWrap}>
              <input
                type="number"
                inputMode="decimal"
                min="0"
                max="100"
                value={discount}
                onChange={(event) => setDiscount(event.target.value)}
                placeholder="25"
              />
              <b>%</b>
            </div>
          </label>
        </div>
        <ActionRow
          onReset={() => {
            setPrice("");
            setDiscount("");
            setCopied(false);
          }}
          onCopy={copy}
          copyDisabled={!result || "error" in result}
          copied={copied}
        />
      </section>

      <section className={styles.resultCard} aria-live="polite">
        <span className={styles.resultEyebrow}>ผลลัพธ์</span>
        {!result ? (
          <div className={styles.placeholder}>
            <ToolIcon name="tag" size={68} />
            <h3>กรอกราคาและส่วนลด</h3>
            <p>ระบบจะคำนวณราคาหลังลดให้ทันที</p>
          </div>
        ) : "error" in result ? (
          <div className={styles.errorBox}>{result.error}</div>
        ) : (
          <div className={styles.resultContent}>
            <small>ราคาหลังลด</small>
            <strong>{money(result.final)}</strong>
            <div className={styles.resultStats}>
              <div><span>ราคาเดิม</span><b>{money(result.price)}</b></div>
              <div><span>ประหยัด</span><b>{money(result.saved)}</b></div>
              <div><span>ส่วนลด</span><b>{number(result.discount)}%</b></div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

function PercentageTool() {
  const [mode, setMode] = useState<"of" | "ratio" | "change">("of");
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    const x = Number(a);
    const y = Number(b);
    if (!a || !b) return null;
    if (!Number.isFinite(x) || !Number.isFinite(y)) return { error: "กรุณากรอกตัวเลขให้ครบทั้งสองช่อง" };

    if (mode === "of") {
      return {
        value: x * y / 100,
        label: `${number(y)}% ของ ${number(x)}`,
        text: `${number(y)}% ของ ${number(x)} = ${number(x * y / 100)}`,
      };
    }
    if (mode === "ratio") {
      if (y === 0) return { error: "ค่าหลักต้องไม่เป็น 0" };
      const value = x / y * 100;
      return {
        value,
        label: `${number(x)} คิดเป็นกี่ % ของ ${number(y)}`,
        suffix: "%",
        text: `${number(x)} คิดเป็น ${number(value)}% ของ ${number(y)}`,
      };
    }
    if (x === 0) return { error: "ค่าเดิมต้องไม่เป็น 0" };
    const value = (y - x) / Math.abs(x) * 100;
    return {
      value,
      label: value >= 0 ? "เพิ่มขึ้น" : "ลดลง",
      suffix: "%",
      text: `จาก ${number(x)} เป็น ${number(y)} = ${value >= 0 ? "เพิ่มขึ้น" : "ลดลง"} ${number(Math.abs(value))}%`,
      absolute: Math.abs(value),
    };
  }, [a, b, mode]);

  const labels =
    mode === "of"
      ? ["จำนวน", "เปอร์เซ็นต์"]
      : mode === "ratio"
        ? ["ค่าที่ต้องการเทียบ", "ค่าหลัก"]
        : ["ค่าเดิม", "ค่าใหม่"];

  const copy = async () => {
    if (!result || "error" in result) return;
    await navigator.clipboard.writeText(result.text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div className={styles.workspaceGrid}>
      <section className={styles.formCard}>
        <div className={styles.cardHeading}>
          <span>เลือกรูปแบบ</span>
          <small>3 วิธีที่ใช้บ่อย</small>
        </div>
        <div className={styles.segmented}>
          <button className={mode === "of" ? styles.active : ""} onClick={() => { setMode("of"); setCopied(false); }} type="button">% ของจำนวน</button>
          <button className={mode === "ratio" ? styles.active : ""} onClick={() => { setMode("ratio"); setCopied(false); }} type="button">คิดเป็นกี่ %</button>
          <button className={mode === "change" ? styles.active : ""} onClick={() => { setMode("change"); setCopied(false); }} type="button">% เปลี่ยนแปลง</button>
        </div>
        <div className={styles.fields}>
          <label className={styles.field}>
            <span>{labels[0]}</span>
            <input type="number" inputMode="decimal" value={a} onChange={(event) => setA(event.target.value)} placeholder={mode === "change" ? "800" : "1,500"} />
          </label>
          <label className={styles.field}>
            <span>{labels[1]}</span>
            <input type="number" inputMode="decimal" value={b} onChange={(event) => setB(event.target.value)} placeholder={mode === "change" ? "1,000" : mode === "of" ? "20" : "1,200"} />
          </label>
        </div>
        <ActionRow
          onReset={() => { setA(""); setB(""); setCopied(false); }}
          onCopy={copy}
          copyDisabled={!result || "error" in result}
          copied={copied}
        />
      </section>

      <section className={styles.resultCard} aria-live="polite">
        <span className={styles.resultEyebrow}>ผลลัพธ์</span>
        {!result ? (
          <div className={styles.placeholder}>
            <ToolIcon name="percent" size={68} />
            <h3>กรอกตัวเลขเพื่อเริ่มคำนวณ</h3>
            <p>เลือกวิธีคำนวณด้านซ้ายได้ตลอดเวลา</p>
          </div>
        ) : "error" in result ? (
          <div className={styles.errorBox}>{result.error}</div>
        ) : (
          <div className={styles.resultContent}>
            <small>{result.label}</small>
            <strong>{number("absolute" in result && typeof result.absolute === "number" ? result.absolute : result.value)}{result.suffix || ""}</strong>
            <p className={styles.summary}>{result.text}</p>
          </div>
        )}
      </section>
    </div>
  );
}

function DateCountTool() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    if (!start || !end) return null;
    const a = parseDate(start);
    const b = parseDate(end);
    if (!a || !b) return { error: "กรุณาเลือกวันที่ให้ครบ" };
    if (b.getTime() < a.getTime()) return { error: "วันที่สิ้นสุดต้องไม่อยู่ก่อนวันที่เริ่มต้น" };
    const days = Math.round((b.getTime() - a.getTime()) / 86400000);
    const weeks = Math.floor(days / 7);
    const remainder = days % 7;
    const endDay = new Intl.DateTimeFormat("th-TH", { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(b);
    return {
      days,
      weeks,
      remainder,
      endDay,
      text: `จาก ${new Intl.DateTimeFormat("th-TH", { dateStyle: "medium" }).format(a)} ถึง ${new Intl.DateTimeFormat("th-TH", { dateStyle: "medium" }).format(b)} = ${number(days, 0)} วัน (${weeks} สัปดาห์ ${remainder} วัน)`,
    };
  }, [start, end]);

  const copy = async () => {
    if (!result || "error" in result) return;
    await navigator.clipboard.writeText(result.text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div className={styles.workspaceGrid}>
      <section className={styles.formCard}>
        <div className={styles.cardHeading}>
          <span>เลือกช่วงวันที่</span>
          <small>คำนวณตามวันปฏิทิน</small>
        </div>
        <div className={styles.fields}>
          <label className={styles.field}>
            <span>วันที่เริ่มต้น</span>
            <input type="date" value={start} onChange={(event) => setStart(event.target.value)} />
          </label>
          <label className={styles.field}>
            <span>วันที่สิ้นสุด</span>
            <input type="date" min={start || undefined} value={end} onChange={(event) => setEnd(event.target.value)} />
          </label>
        </div>
        <ActionRow
          onReset={() => { setStart(""); setEnd(""); setCopied(false); }}
          onCopy={copy}
          copyDisabled={!result || "error" in result}
          copied={copied}
        />
      </section>

      <section className={styles.resultCard} aria-live="polite">
        <span className={styles.resultEyebrow}>ผลลัพธ์</span>
        {!result ? (
          <div className={styles.placeholder}>
            <ToolIcon name="calendar" size={68} />
            <h3>เลือกวันที่เริ่มและสิ้นสุด</h3>
            <p>ระบบจะแสดงจำนวนวันและสัปดาห์ให้ทันที</p>
          </div>
        ) : "error" in result ? (
          <div className={styles.errorBox}>{result.error}</div>
        ) : (
          <div className={styles.resultContent}>
            <small>ระยะห่างทั้งหมด</small>
            <strong>{number(result.days, 0)} วัน</strong>
            <div className={styles.resultStats}>
              <div><span>คิดเป็น</span><b>{result.weeks} สัปดาห์ {result.remainder} วัน</b></div>
              <div><span>วันสิ้นสุด</span><b>{result.endDay}</b></div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default function ToolPageClient({ kind }: { kind: V16ToolKind }) {
  const tool = definitions[kind];
  const { favorite, theme, toggleFavorite, toggleTheme } = useToolPreferences(tool.id);

  return (
    <div className={styles.page}>
      <header className={styles.topbar}>
        <div className={styles.topbarInner}>
          <Link className={styles.brand} href="/">
            <img src="/krobkrueng-logo.webp" alt="ครบเครื่อง Krobkrueng" width={38} height={38} />
            <span><strong>ครบเครื่อง</strong><small>Krobkrueng</small></span>
          </Link>
          <div className={styles.topActions}>
            <button type="button" onClick={toggleFavorite} className={favorite ? styles.favoriteActive : ""} aria-label={favorite ? "นำออกจากรายการโปรด" : "เพิ่มในรายการโปรด"}>
              <UiIcon name="heart" size={18} />
            </button>
            <button type="button" onClick={toggleTheme} aria-label="เปลี่ยนธีม">
              <UiIcon name={theme === "light" ? "moon" : "sun"} size={18} />
            </button>
          </div>
        </div>
      </header>

      <main className={styles.shell}>
        <nav className={styles.breadcrumb} aria-label="breadcrumb">
          <Link href="/">หน้าหลัก</Link>
          <span>›</span>
          <Link href="/#tools">เครื่องมือ</Link>
          <span>›</span>
          <b>{tool.title}</b>
        </nav>

        <section className={styles.toolHero}>
          <div className={styles.heroIcon}><ToolIcon name={tool.icon} size={78} /></div>
          <div className={styles.heroCopy}>
            <span className={styles.category}>{tool.category}</span>
            <h1>{tool.title}</h1>
            <p>{tool.description}</p>
            <div className={styles.trustRow}>
              <span>ใช้ฟรี</span>
              <span>ไม่ต้องสมัคร</span>
              <span>ประมวลผลในเบราว์เซอร์</span>
            </div>
          </div>
        </section>

        <section className={styles.workspace}>
          {kind === "discount" && <DiscountTool />}
          {kind === "percentage" && <PercentageTool />}
          {kind === "date-count" && <DateCountTool />}
        </section>

        <section className={styles.related}>
          <div className={styles.sectionHead}>
            <span>ใช้งานต่อได้ทันที</span>
            <h2>เครื่องมือที่เกี่ยวข้อง</h2>
          </div>
          <div className={styles.relatedGrid}>
            {related.filter((item) => item.kind !== kind).map((item) => (
              <Link href={item.href} key={item.kind} className={styles.relatedCard}>
                <ToolIcon name={item.icon} size={48} />
                <div><strong>{item.title}</strong><small>เปิดเครื่องมือ →</small></div>
              </Link>
            ))}
          </div>
        </section>

        <footer className={styles.footer}>
          <span>ครบเครื่อง · เครื่องมือฟรีสำหรับชีวิตประจำวัน</span>
          <div><Link href="/about">เกี่ยวกับ</Link><Link href="/privacy">ความเป็นส่วนตัว</Link></div>
        </footer>
      </main>
    </div>
  );
}
