"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ToolIcon, UiIcon } from "../KrobkruengIcons";
import { homeToolMap, type HomeToolId } from "../../data/homeTools";
import styles from "./tool-page.module.css";

export type ToolKind = HomeToolId;

const relatedMap: Record<ToolKind, ToolKind[]> = {
  "split-bill": ["salary", "percentage", "discount"],
  discount: ["percentage", "compare-value", "split-bill"],
  "what-to-eat": ["split-bill", "leave-time", "salary"],
  "leave-time": ["date-count", "what-to-eat", "split-bill"],
  "date-count": ["leave-time", "percentage", "salary"],
  salary: ["split-bill", "percentage", "compare-value"],
  "compare-value": ["discount", "percentage", "salary"],
  percentage: ["discount", "compare-value", "salary"],
};

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

function useToolPreferences(id: ToolKind) {
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
        JSON.stringify([id, ...current.filter((item: string) => item !== id)].slice(0, 6)),
      );
      localStorage.setItem(
        "krobkrueng-recent-meta",
        JSON.stringify({ id, openedAt: Date.now() }),
      );
    } catch {
      // Storage is optional; tools continue working without it.
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

function ResultActions({
  onReset,
  text,
}: {
  onReset: () => void;
  text?: string;
}) {
  const [feedback, setFeedback] = useState("");

  const copy = async () => {
    if (!text) return;
    if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(text);
    setFeedback("คัดลอกแล้ว ✓");
    window.setTimeout(() => setFeedback(""), 1400);
  };

  const share = async () => {
    if (!text) return;
    if (navigator.share) {
      try {
        await navigator.share({ title: "ผลลัพธ์จากครบเครื่อง", text });
        return;
      } catch {
        return;
      }
    }
    await copy();
  };

  return (
    <div className={styles.actions}>
      <button type="button" className={styles.secondaryButton} onClick={onReset}>
        ล้างค่า
      </button>
      <button
        type="button"
        className={styles.secondaryButton}
        onClick={share}
        disabled={!text}
      >
        แชร์
      </button>
      <button
        type="button"
        className={styles.primaryButton}
        onClick={copy}
        disabled={!text}
      >
        {feedback || "คัดลอกผลลัพธ์"}
      </button>
    </div>
  );
}

function ToolHistory({ toolId, summary }: { toolId: ToolKind; summary?: string }) {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(`krobkrueng-tool-history:${toolId}`) || "[]");
      setItems(Array.isArray(saved) ? saved : []);
    } catch {
      setItems([]);
    }
  }, [toolId]);

  useEffect(() => {
    if (!summary) return;
    try {
      const key = `krobkrueng-tool-history:${toolId}`;
      const saved = JSON.parse(localStorage.getItem(key) || "[]");
      const current: string[] = Array.isArray(saved) ? saved : [];
      const next = [summary, ...current.filter((item) => item !== summary)].slice(0, 5);
      localStorage.setItem(key, JSON.stringify(next));
      setItems(next);
    } catch {
      // History is optional.
    }
  }, [summary, toolId]);

  if (!items.length) return null;

  return (
    <section className={styles.historyPanel}>
      <div className={styles.historyHead}>
        <div>
          <span>เก็บในอุปกรณ์นี้</span>
          <h3>ผลลัพธ์ล่าสุด</h3>
        </div>
        <button
          type="button"
          onClick={() => {
            localStorage.removeItem(`krobkrueng-tool-history:${toolId}`);
            setItems([]);
          }}
        >
          ล้างประวัติ
        </button>
      </div>
      <div className={styles.historyList}>
        {items.map((item, index) => <p key={item + index}>{item}</p>)}
      </div>
    </section>
  );
}

function DiscountTool() {
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");

  const result = useMemo(() => {
    const p = Number(price);
    const d = Number(discount);
    if (!price || !discount) return null;
    if (!Number.isFinite(p) || p < 0) return { error: "กรุณากรอกราคาเดิมเป็นตัวเลขตั้งแต่ 0 ขึ้นไป" };
    if (!Number.isFinite(d) || d < 0 || d > 100) return { error: "ส่วนลดต้องอยู่ระหว่าง 0–100%" };
    const saved = p * (d / 100);
    const final = p - saved;
    return {
      final,
      saved,
      price: p,
      discount: d,
      text: `ราคาเดิม ${money(p)} · ลด ${number(d)}% · ประหยัด ${money(saved)} · เหลือ ${money(final)}`,
    };
  }, [price, discount]);

  return (
    <div className={styles.workspaceGrid}>
      <section className={styles.formCard}>
        <div className={styles.cardHeading}><span>ข้อมูลที่ใช้คำนวณ</span><small>ผลลัพธ์อัปเดตทันที</small></div>
        <div className={styles.presetRow}>
          {[10,20,25,30,50].map((value) => (
            <button key={value} type="button" onClick={() => setDiscount(String(value))}>{value}%</button>
          ))}
        </div>
        <div className={styles.fields}>
          <label className={styles.field}>
            <span>ราคาเดิม</span>
            <div className={styles.inputWrap}>
              <input type="number" inputMode="decimal" min="0" value={price} onChange={(event) => setPrice(event.target.value)} placeholder="1,290" />
              <b>บาท</b>
            </div>
          </label>
          <label className={styles.field}>
            <span>ส่วนลด</span>
            <div className={styles.inputWrap}>
              <input type="number" inputMode="decimal" min="0" max="100" value={discount} onChange={(event) => setDiscount(event.target.value)} placeholder="25" />
              <b>%</b>
            </div>
          </label>
        </div>
        <ResultActions onReset={() => { setPrice(""); setDiscount(""); }} text={result && !("error" in result) ? result.text : undefined} />
      </section>
      <section className={styles.resultCard} aria-live="polite">
        <span className={styles.resultEyebrow}>ผลลัพธ์</span>
        {!result ? <Empty icon="tag" title="กรอกราคาและส่วนลด" detail="ระบบจะคำนวณราคาหลังลดให้ทันที" /> :
        "error" in result ? <ErrorBox text={result.error} /> :
        <div className={styles.resultContent}>
          <small>ราคาหลังลด</small><strong>{money(result.final)}</strong>
          <div className={styles.resultStats}>
            <div><span>ราคาเดิม</span><b>{money(result.price)}</b></div>
            <div><span>ประหยัด</span><b>{money(result.saved)}</b></div>
            <div><span>ส่วนลด</span><b>{number(result.discount)}%</b></div>
          </div>
        </div>}
      </section>
      <ToolHistory toolId="discount" summary={result && !("error" in result) ? result.text : undefined} />
    </div>
  );
}

function PercentageTool() {
  const [mode, setMode] = useState<"of" | "ratio" | "change">("of");
  const [a, setA] = useState("");
  const [b, setB] = useState("");

  const result = useMemo(() => {
    const x = Number(a), y = Number(b);
    if (!a || !b) return null;
    if (!Number.isFinite(x) || !Number.isFinite(y)) return { error: "กรุณากรอกตัวเลขให้ครบทั้งสองช่อง" };
    if (mode === "of") {
      const value = x * y / 100;
      return { value, label: `${number(y)}% ของ ${number(x)}`, text: `${number(y)}% ของ ${number(x)} = ${number(value)}` };
    }
    if (mode === "ratio") {
      if (y === 0) return { error: "ค่าหลักต้องไม่เป็น 0" };
      const value = x / y * 100;
      return { value, label: `${number(x)} คิดเป็นกี่ % ของ ${number(y)}`, suffix: "%", text: `${number(x)} คิดเป็น ${number(value)}% ของ ${number(y)}` };
    }
    if (x === 0) return { error: "ค่าเดิมต้องไม่เป็น 0" };
    const value = (y - x) / Math.abs(x) * 100;
    return { value: Math.abs(value), label: value >= 0 ? "เพิ่มขึ้น" : "ลดลง", suffix: "%", text: `จาก ${number(x)} เป็น ${number(y)} = ${value >= 0 ? "เพิ่มขึ้น" : "ลดลง"} ${number(Math.abs(value))}%` };
  }, [a, b, mode]);

  const labels = mode === "of" ? ["จำนวน", "เปอร์เซ็นต์"] : mode === "ratio" ? ["ค่าที่ต้องการเทียบ", "ค่าหลัก"] : ["ค่าเดิม", "ค่าใหม่"];

  return (
    <div className={styles.workspaceGrid}>
      <section className={styles.formCard}>
        <div className={styles.cardHeading}><span>เลือกรูปแบบ</span><small>3 วิธีที่ใช้บ่อย</small></div>
        <div className={styles.segmented}>
          <button className={mode === "of" ? styles.active : ""} onClick={() => setMode("of")} type="button">% ของจำนวน</button>
          <button className={mode === "ratio" ? styles.active : ""} onClick={() => setMode("ratio")} type="button">คิดเป็นกี่ %</button>
          <button className={mode === "change" ? styles.active : ""} onClick={() => setMode("change")} type="button">% เปลี่ยนแปลง</button>
        </div>
        <div className={styles.fields}>
          <label className={styles.field}><span>{labels[0]}</span><input type="number" inputMode="decimal" value={a} onChange={(event) => setA(event.target.value)} placeholder={mode === "change" ? "800" : "1,500"} /></label>
          <label className={styles.field}><span>{labels[1]}</span><input type="number" inputMode="decimal" value={b} onChange={(event) => setB(event.target.value)} placeholder={mode === "change" ? "1,000" : mode === "of" ? "20" : "1,200"} /></label>
        </div>
        <ResultActions onReset={() => { setA(""); setB(""); }} text={result && !("error" in result) ? result.text : undefined} />
      </section>
      <section className={styles.resultCard} aria-live="polite">
        <span className={styles.resultEyebrow}>ผลลัพธ์</span>
        {!result ? <Empty icon="percent" title="กรอกตัวเลขเพื่อเริ่มคำนวณ" detail="เลือกวิธีคำนวณได้ตลอดเวลา" /> :
        "error" in result ? <ErrorBox text={result.error} /> :
        <div className={styles.resultContent}><small>{result.label}</small><strong>{number(result.value)}{result.suffix || ""}</strong><p className={styles.summary}>{result.text}</p></div>}
      </section>
      <ToolHistory toolId="percentage" summary={result && !("error" in result) ? result.text : undefined} />
    </div>
  );
}

function DateCountTool() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const result = useMemo(() => {
    if (!start || !end) return null;
    const a = parseDate(start), b = parseDate(end);
    if (!a || !b) return { error: "กรุณาเลือกวันที่ให้ครบ" };
    if (b.getTime() < a.getTime()) return { error: "วันที่สิ้นสุดต้องไม่อยู่ก่อนวันที่เริ่มต้น" };
    const days = Math.round((b.getTime() - a.getTime()) / 86400000);
    const weeks = Math.floor(days / 7), remainder = days % 7;
    const endDay = new Intl.DateTimeFormat("th-TH", { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(b);
    const text = `จาก ${new Intl.DateTimeFormat("th-TH", { dateStyle: "medium" }).format(a)} ถึง ${new Intl.DateTimeFormat("th-TH", { dateStyle: "medium" }).format(b)} = ${number(days, 0)} วัน (${weeks} สัปดาห์ ${remainder} วัน)`;
    return { days, weeks, remainder, endDay, text };
  }, [start, end]);

  return (
    <div className={styles.workspaceGrid}>
      <section className={styles.formCard}>
        <div className={styles.cardHeading}><span>เลือกช่วงวันที่</span><small>คำนวณตามวันปฏิทิน</small></div>
        <div className={styles.fields}>
          <label className={styles.field}><span>วันที่เริ่มต้น</span><input type="date" value={start} onChange={(event) => setStart(event.target.value)} /></label>
          <label className={styles.field}><span>วันที่สิ้นสุด</span><input type="date" min={start || undefined} value={end} onChange={(event) => setEnd(event.target.value)} /></label>
        </div>
        <ResultActions onReset={() => { setStart(""); setEnd(""); }} text={result && !("error" in result) ? result.text : undefined} />
      </section>
      <section className={styles.resultCard} aria-live="polite">
        <span className={styles.resultEyebrow}>ผลลัพธ์</span>
        {!result ? <Empty icon="calendar" title="เลือกวันที่เริ่มและสิ้นสุด" detail="ระบบจะแสดงจำนวนวันและสัปดาห์ให้ทันที" /> :
        "error" in result ? <ErrorBox text={result.error} /> :
        <div className={styles.resultContent}><small>ระยะห่างทั้งหมด</small><strong>{number(result.days, 0)} วัน</strong><div className={styles.resultStats}><div><span>คิดเป็น</span><b>{result.weeks} สัปดาห์ {result.remainder} วัน</b></div><div><span>วันสิ้นสุด</span><b>{result.endDay}</b></div></div></div>}
      </section>
      <ToolHistory toolId="date-count" summary={result && !("error" in result) ? result.text : undefined} />
    </div>
  );
}

function SplitBillTool() {
  const [total, setTotal] = useState("");
  const [people, setPeople] = useState("2");
  const [service, setService] = useState("0");
  const [vat, setVat] = useState("0");
  const [tip, setTip] = useState("0");
  const [roundUp, setRoundUp] = useState(false);

  const result = useMemo(() => {
    const base = Number(total), count = Number(people), serviceRate = Number(service), vatRate = Number(vat), tipValue = Number(tip || 0);
    if (!total) return null;
    if (!Number.isFinite(base) || base < 0) return { error: "ยอดรวมต้องเป็นตัวเลขตั้งแต่ 0 ขึ้นไป" };
    if (!Number.isInteger(count) || count < 1 || count > 100) return { error: "จำนวนคนต้องเป็นเลขจำนวนเต็ม 1–100 คน" };
    if ([serviceRate, vatRate, tipValue].some((value) => !Number.isFinite(value) || value < 0)) return { error: "Service Charge, VAT และทิปต้องไม่ติดลบ" };
    const serviceAmount = base * serviceRate / 100;
    const beforeVat = base + serviceAmount;
    const vatAmount = beforeVat * vatRate / 100;
    const grand = beforeVat + vatAmount + tipValue;
    const rawEach = grand / count;
    const each = roundUp ? Math.ceil(rawEach) : rawEach;
    const text = `ยอดรวม ${money(grand)} · ${count} คน · คนละ ${money(each)}`;
    return { base, count, serviceAmount, vatAmount, grand, each, text };
  }, [total, people, service, vat, tip, roundUp]);

  return (
    <div className={styles.workspaceGrid}>
      <section className={styles.formCard}>
        <div className={styles.cardHeading}><span>รายละเอียดบิล</span><small>รองรับ Service / VAT / ทิป</small></div>
        <div className={styles.presetRow}>{[2,3,4,5,6].map((value) => <button type="button" key={value} onClick={() => setPeople(String(value))}>{value} คน</button>)}</div>
        <div className={styles.fields}>
          <label className={styles.field}><span>ยอดอาหาร/ยอดก่อนบวกเพิ่ม</span><div className={styles.inputWrap}><input type="number" inputMode="decimal" min="0" value={total} onChange={(e) => setTotal(e.target.value)} placeholder="1,500" /><b>บาท</b></div></label>
          <div className={styles.twoFields}>
            <label className={styles.field}><span>จำนวนคน</span><input type="number" inputMode="numeric" min="1" max="100" value={people} onChange={(e) => setPeople(e.target.value)} /></label>
            <label className={styles.field}><span>Service Charge</span><div className={styles.inputWrap}><input type="number" inputMode="decimal" min="0" value={service} onChange={(e) => setService(e.target.value)} /><b>%</b></div></label>
            <label className={styles.field}><span>VAT</span><div className={styles.inputWrap}><input type="number" inputMode="decimal" min="0" value={vat} onChange={(e) => setVat(e.target.value)} /><b>%</b></div></label>
            <label className={styles.field}><span>ทิปเพิ่มเติม</span><div className={styles.inputWrap}><input type="number" inputMode="decimal" min="0" value={tip} onChange={(e) => setTip(e.target.value)} /><b>บาท</b></div></label>
          </div>
          <label className={styles.checkRow}><input type="checkbox" checked={roundUp} onChange={(e) => setRoundUp(e.target.checked)} /><span>ปัดยอดต่อคนขึ้นเป็นบาทถัดไป</span></label>
        </div>
        <ResultActions onReset={() => { setTotal(""); setPeople("2"); setService("0"); setVat("0"); setTip("0"); setRoundUp(false); }} text={result && !("error" in result) ? result.text : undefined} />
      </section>
      <section className={styles.resultCard} aria-live="polite">
        <span className={styles.resultEyebrow}>ผลลัพธ์</span>
        {!result ? <Empty icon="split" title="กรอกยอดรวมของบิล" detail="เลือกจำนวนคนแล้วดูยอดต่อคนได้ทันที" /> :
        "error" in result ? <ErrorBox text={result.error} /> :
        <div className={styles.resultContent}><small>แต่ละคนจ่าย</small><strong>{money(result.each)}</strong><div className={styles.resultStats}><div><span>ยอดรวมสุดท้าย</span><b>{money(result.grand)}</b></div><div><span>Service Charge</span><b>{money(result.serviceAmount)}</b></div><div><span>VAT</span><b>{money(result.vatAmount)}</b></div><div><span>จำนวนคน</span><b>{result.count} คน</b></div></div></div>}
      </section>
      <ToolHistory toolId="split-bill" summary={result && !("error" in result) ? result.text : undefined} />
    </div>
  );
}

function SalaryTool() {
  const [salary, setSalary] = useState("");
  const [needs, setNeeds] = useState("50");
  const [wants, setWants] = useState("30");
  const [saving, setSaving] = useState("20");

  const result = useMemo(() => {
    const value = Number(salary), a = Number(needs), b = Number(wants), c = Number(saving);
    if (!salary) return null;
    if (!Number.isFinite(value) || value < 0) return { error: "กรุณากรอกเงินเดือนสุทธิเป็นตัวเลขตั้งแต่ 0 ขึ้นไป" };
    if ([a,b,c].some((x) => !Number.isFinite(x) || x < 0 || x > 100)) return { error: "สัดส่วนแต่ละหมวดต้องอยู่ระหว่าง 0–100%" };
    const sum = a + b + c;
    if (Math.abs(sum - 100) > 0.001) return { error: `สัดส่วนรวมต้องเท่ากับ 100% (ตอนนี้ ${number(sum)}%)` };
    const needsValue = value * a / 100, wantsValue = value * b / 100, savingValue = value * c / 100;
    return { value, needsValue, wantsValue, savingValue, text: `เงินเดือน ${money(value)} · จำเป็น ${money(needsValue)} · ส่วนตัว ${money(wantsValue)} · ออม ${money(savingValue)}` };
  }, [salary, needs, wants, saving]);

  const preset = (a: number, b: number, c: number) => { setNeeds(String(a)); setWants(String(b)); setSaving(String(c)); };

  return (
    <div className={styles.workspaceGrid}>
      <section className={styles.formCard}>
        <div className={styles.cardHeading}><span>วางแผนเงินเดือน</span><small>ปรับสัดส่วนได้เอง</small></div>
        <div className={styles.presetRow}><button type="button" onClick={() => preset(50,30,20)}>50/30/20</button><button type="button" onClick={() => preset(60,20,20)}>60/20/20</button><button type="button" onClick={() => preset(70,20,10)}>70/20/10</button></div>
        <div className={styles.fields}>
          <label className={styles.field}><span>เงินเดือนสุทธิ</span><div className={styles.inputWrap}><input type="number" inputMode="decimal" min="0" value={salary} onChange={(e) => setSalary(e.target.value)} placeholder="30,000" /><b>บาท</b></div></label>
          <div className={styles.threeFields}>
            <label className={styles.field}><span>จำเป็น</span><div className={styles.inputWrap}><input type="number" inputMode="decimal" min="0" max="100" value={needs} onChange={(e) => setNeeds(e.target.value)} /><b>%</b></div></label>
            <label className={styles.field}><span>ส่วนตัว</span><div className={styles.inputWrap}><input type="number" inputMode="decimal" min="0" max="100" value={wants} onChange={(e) => setWants(e.target.value)} /><b>%</b></div></label>
            <label className={styles.field}><span>ออม</span><div className={styles.inputWrap}><input type="number" inputMode="decimal" min="0" max="100" value={saving} onChange={(e) => setSaving(e.target.value)} /><b>%</b></div></label>
          </div>
        </div>
        <ResultActions onReset={() => { setSalary(""); preset(50,30,20); }} text={result && !("error" in result) ? result.text : undefined} />
      </section>
      <section className={styles.resultCard} aria-live="polite">
        <span className={styles.resultEyebrow}>แผนเงินเดือน</span>
        {!result ? <Empty icon="wallet" title="กรอกเงินเดือนสุทธิ" detail="ระบบจะแบ่งยอดตามสัดส่วนที่เลือก" /> :
        "error" in result ? <ErrorBox text={result.error} /> :
        <div className={styles.resultContent}><small>เงินเดือนที่นำมาวางแผน</small><strong>{money(result.value)}</strong><div className={styles.resultStats}><div><span>ค่าใช้จ่ายจำเป็น</span><b>{money(result.needsValue)}</b></div><div><span>ใช้ส่วนตัว</span><b>{money(result.wantsValue)}</b></div><div><span>ออม/ลงทุน</span><b>{money(result.savingValue)}</b></div></div></div>}
      </section>
      <ToolHistory toolId="salary" summary={result && !("error" in result) ? result.text : undefined} />
    </div>
  );
}

const units = [
  { value: "piece", label: "ชิ้น", group: "count", factor: 1 },
  { value: "g", label: "กรัม", group: "mass", factor: 1 },
  { value: "kg", label: "กก.", group: "mass", factor: 1000 },
  { value: "ml", label: "มล.", group: "volume", factor: 1 },
  { value: "l", label: "ลิตร", group: "volume", factor: 1000 },
] as const;

function CompareValueTool() {
  const [priceA, setPriceA] = useState("");
  const [qtyA, setQtyA] = useState("");
  const [unitA, setUnitA] = useState("piece");
  const [priceB, setPriceB] = useState("");
  const [qtyB, setQtyB] = useState("");
  const [unitB, setUnitB] = useState("piece");

  const result = useMemo(() => {
    if (!priceA || !qtyA || !priceB || !qtyB) return null;
    const pa = Number(priceA), qa = Number(qtyA), pb = Number(priceB), qb = Number(qtyB);
    if ([pa,qa,pb,qb].some((value) => !Number.isFinite(value) || value <= 0)) return { error: "ราคาและปริมาณต้องมากกว่า 0" };
    const ua = units.find((u) => u.value === unitA)!;
    const ub = units.find((u) => u.value === unitB)!;
    if (ua.group !== ub.group) return { error: "กรุณาเลือกหน่วยที่เป็นประเภทเดียวกัน เช่น กรัมกับกิโลกรัม" };
    const unitPriceA = pa / (qa * ua.factor);
    const unitPriceB = pb / (qb * ub.factor);
    const winner = unitPriceA <= unitPriceB ? "A" : "B";
    const low = Math.min(unitPriceA, unitPriceB), high = Math.max(unitPriceA, unitPriceB);
    const savingPct = high > 0 ? (high - low) / high * 100 : 0;
    const baseUnit = ua.group === "mass" ? "กรัม" : ua.group === "volume" ? "มล." : "ชิ้น";
    const text = `สินค้า ${winner} คุ้มกว่า · A ${money(unitPriceA)}/${baseUnit} · B ${money(unitPriceB)}/${baseUnit} · ต่างประมาณ ${number(savingPct)}%`;
    return { unitPriceA, unitPriceB, winner, savingPct, baseUnit, text };
  }, [priceA, qtyA, unitA, priceB, qtyB, unitB]);

  const ProductFields = ({ label, price, qty, unit, setPrice, setQty, setUnit }: { label: string; price: string; qty: string; unit: string; setPrice: (v:string)=>void; setQty: (v:string)=>void; setUnit: (v:string)=>void }) => (
    <div className={styles.productBox}>
      <strong>{label}</strong>
      <div className={styles.twoFields}>
        <label className={styles.field}><span>ราคา</span><input type="number" inputMode="decimal" min="0" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="59" /></label>
        <label className={styles.field}><span>ปริมาณ</span><input type="number" inputMode="decimal" min="0" value={qty} onChange={(e) => setQty(e.target.value)} placeholder="750" /></label>
      </div>
      <label className={styles.field}><span>หน่วย</span><select value={unit} onChange={(e) => setUnit(e.target.value)}>{units.map((u) => <option key={u.value} value={u.value}>{u.label}</option>)}</select></label>
    </div>
  );

  return (
    <div className={styles.workspaceGrid}>
      <section className={styles.formCard}>
        <div className={styles.cardHeading}><span>สินค้า A เทียบ B</span><small>แปลงหน่วยให้อัตโนมัติ</small></div>
        <div className={styles.fields}>
          <ProductFields label="สินค้า A" price={priceA} qty={qtyA} unit={unitA} setPrice={setPriceA} setQty={setQtyA} setUnit={setUnitA} />
          <ProductFields label="สินค้า B" price={priceB} qty={qtyB} unit={unitB} setPrice={setPriceB} setQty={setQtyB} setUnit={setUnitB} />
        </div>
        <ResultActions onReset={() => { setPriceA(""); setQtyA(""); setUnitA("piece"); setPriceB(""); setQtyB(""); setUnitB("piece"); }} text={result && !("error" in result) ? result.text : undefined} />
      </section>
      <section className={styles.resultCard} aria-live="polite">
        <span className={styles.resultEyebrow}>ผลการเปรียบเทียบ</span>
        {!result ? <Empty icon="scale" title="กรอกสินค้า A และ B" detail="ระบบจะเทียบราคาต่อหน่วยให้ทันที" /> :
        "error" in result ? <ErrorBox text={result.error} /> :
        <div className={styles.resultContent}><small>ตัวเลือกที่คุ้มกว่า</small><strong>สินค้า {result.winner}</strong><div className={styles.resultStats}><div><span>สินค้า A / {result.baseUnit}</span><b>{money(result.unitPriceA)}</b></div><div><span>สินค้า B / {result.baseUnit}</span><b>{money(result.unitPriceB)}</b></div><div><span>ประหยัดกว่าโดยประมาณ</span><b>{number(result.savingPct)}%</b></div></div></div>}
      </section>
      <ToolHistory toolId="compare-value" summary={result && !("error" in result) ? result.text : undefined} />
    </div>
  );
}

function LeaveTimeTool() {
  const [arrival, setArrival] = useState("");
  const [travel, setTravel] = useState("");
  const [buffer, setBuffer] = useState("15");

  const result = useMemo(() => {
    if (!arrival || !travel) return null;
    const [h,m] = arrival.split(":").map(Number), t = Number(travel), b = Number(buffer);
    if (!Number.isFinite(h) || !Number.isFinite(m)) return { error: "กรุณาเลือกเวลาที่ต้องถึง" };
    if (!Number.isFinite(t) || t < 0 || !Number.isFinite(b) || b < 0) return { error: "เวลาเดินทางและเวลาสำรองต้องไม่ติดลบ" };
    const target = h * 60 + m;
    const raw = target - t - b;
    const previousDay = raw < 0;
    const normalized = ((raw % 1440) + 1440) % 1440;
    const hh = String(Math.floor(normalized / 60)).padStart(2, "0");
    const mm = String(normalized % 60).padStart(2, "0");
    const leave = `${hh}:${mm}`;
    const text = `ต้องถึง ${arrival} · เดินทาง ${number(t,0)} นาที · เผื่อ ${number(b,0)} นาที · ควรออก ${previousDay ? "วันก่อนหน้า " : ""}${leave} น.`;
    return { leave, previousDay, t, b, text };
  }, [arrival, travel, buffer]);

  return (
    <div className={styles.workspaceGrid}>
      <section className={styles.formCard}>
        <div className={styles.cardHeading}><span>วางเวลาเดินทาง</span><small>หักเวลาให้อัตโนมัติ</small></div>
        <div className={styles.presetRow}>{[10,15,30,45].map((value) => <button key={value} type="button" onClick={() => setBuffer(String(value))}>เผื่อ {value} นาที</button>)}</div>
        <div className={styles.fields}>
          <label className={styles.field}><span>เวลาที่ต้องถึง</span><input type="time" value={arrival} onChange={(e) => setArrival(e.target.value)} /></label>
          <label className={styles.field}><span>เวลาเดินทาง</span><div className={styles.inputWrap}><input type="number" inputMode="numeric" min="0" value={travel} onChange={(e) => setTravel(e.target.value)} placeholder="45" /><b>นาที</b></div></label>
          <label className={styles.field}><span>เวลาสำรอง</span><div className={styles.inputWrap}><input type="number" inputMode="numeric" min="0" value={buffer} onChange={(e) => setBuffer(e.target.value)} /><b>นาที</b></div></label>
        </div>
        <ResultActions onReset={() => { setArrival(""); setTravel(""); setBuffer("15"); }} text={result && !("error" in result) ? result.text : undefined} />
      </section>
      <section className={styles.resultCard} aria-live="polite">
        <span className={styles.resultEyebrow}>เวลาที่แนะนำ</span>
        {!result ? <Empty icon="clock" title="ใส่เวลาที่ต้องถึง" detail="ระบบจะถอยเวลาเดินทางและเวลาสำรองให้" /> :
        "error" in result ? <ErrorBox text={result.error} /> :
        <div className={styles.resultContent}><small>{result.previousDay ? "ควรออกวันก่อนหน้า" : "ควรออกประมาณ"}</small><strong>{result.leave} น.</strong><div className={styles.resultStats}><div><span>เวลาเดินทาง</span><b>{number(result.t,0)} นาที</b></div><div><span>เวลาสำรอง</span><b>{number(result.b,0)} นาที</b></div></div></div>}
      </section>
      <ToolHistory toolId="leave-time" summary={result && !("error" in result) ? result.text : undefined} />
    </div>
  );
}

const menuItems = [
  { name:"ข้าวกะเพรา", category:"ข้าว", budget:"low", spicy:true },
  { name:"ข้าวมันไก่", category:"ข้าว", budget:"low", spicy:false },
  { name:"ข้าวหมูกรอบ", category:"ข้าว", budget:"mid", spicy:false },
  { name:"ข้าวผัด", category:"ข้าว", budget:"low", spicy:false },
  { name:"ก๋วยเตี๋ยวเรือ", category:"เส้น", budget:"low", spicy:true },
  { name:"ก๋วยเตี๋ยวต้มยำ", category:"เส้น", budget:"low", spicy:true },
  { name:"ผัดไทย", category:"เส้น", budget:"mid", spicy:false },
  { name:"สุกี้น้ำ", category:"เส้น", budget:"mid", spicy:false },
  { name:"ส้มตำไก่ย่าง", category:"อีสาน", budget:"mid", spicy:true },
  { name:"ลาบหมู", category:"อีสาน", budget:"mid", spicy:true },
  { name:"คอหมูย่าง", category:"อีสาน", budget:"mid", spicy:false },
  { name:"สลัดอกไก่", category:"คลีน", budget:"mid", spicy:false },
  { name:"ข้าวอกไก่ย่าง", category:"คลีน", budget:"mid", spicy:false },
  { name:"แซลมอนย่าง", category:"คลีน", budget:"high", spicy:false },
  { name:"หมูกระทะ", category:"จัดเต็ม", budget:"high", spicy:false },
  { name:"ชาบู", category:"จัดเต็ม", budget:"high", spicy:false },
  { name:"พิซซ่า", category:"จัดเต็ม", budget:"high", spicy:false },
  { name:"บิงซู", category:"ของหวาน", budget:"mid", spicy:false },
  { name:"ไอศกรีม", category:"ของหวาน", budget:"low", spicy:false },
  { name:"ขนมปังปิ้ง", category:"ของหวาน", budget:"low", spicy:false },
];

function WhatToEatTool() {
  const [category, setCategory] = useState("ทั้งหมด");
  const [budget, setBudget] = useState("all");
  const [spicy, setSpicy] = useState("all");
  const [picked, setPicked] = useState("");

  const candidates = useMemo(() => menuItems.filter((item) =>
    (category === "ทั้งหมด" || item.category === category) &&
    (budget === "all" || item.budget === budget) &&
    (spicy === "all" || (spicy === "yes" ? item.spicy : !item.spicy))
  ), [category, budget, spicy]);

  const pick = () => {
    if (!candidates.length) { setPicked(""); return; }
    const next = candidates[Math.floor(Math.random() * candidates.length)];
    setPicked(next.name);
  };

  const text = picked ? `วันนี้กิน “${picked}” กัน — สุ่มโดยครบเครื่อง` : undefined;

  return (
    <div className={styles.workspaceGrid}>
      <section className={styles.formCard}>
        <div className={styles.cardHeading}><span>เลือกสไตล์มื้อวันนี้</span><small>{candidates.length} เมนูที่ตรงเงื่อนไข</small></div>
        <div className={styles.fields}>
          <label className={styles.field}><span>ประเภทอาหาร</span><select value={category} onChange={(e) => { setCategory(e.target.value); setPicked(""); }}><option>ทั้งหมด</option><option>ข้าว</option><option>เส้น</option><option>อีสาน</option><option>คลีน</option><option>จัดเต็ม</option><option>ของหวาน</option></select></label>
          <label className={styles.field}><span>งบประมาณ</span><select value={budget} onChange={(e) => { setBudget(e.target.value); setPicked(""); }}><option value="all">ไม่จำกัด</option><option value="low">ประหยัด</option><option value="mid">กลาง ๆ</option><option value="high">จัดเต็ม</option></select></label>
          <label className={styles.field}><span>ความเผ็ด</span><select value={spicy} onChange={(e) => { setSpicy(e.target.value); setPicked(""); }}><option value="all">อะไรก็ได้</option><option value="yes">ขอเผ็ด</option><option value="no">ไม่เผ็ด</option></select></label>
        </div>
        <button type="button" className={styles.randomButton} onClick={pick} disabled={!candidates.length}>สุ่มเมนูให้ฉัน ✦</button>
        <ResultActions onReset={() => { setCategory("ทั้งหมด"); setBudget("all"); setSpicy("all"); setPicked(""); }} text={text} />
      </section>
      <section className={styles.resultCard} aria-live="polite">
        <span className={styles.resultEyebrow}>เมนูที่ได้</span>
        {!candidates.length ? <ErrorBox text="ยังไม่มีเมนูที่ตรงทุกเงื่อนไข ลองปรับตัวกรองใหม่" /> :
        !picked ? <Empty icon="bowl" title="พร้อมสุ่มมื้อถัดไป" detail="ตั้งค่าที่ชอบแล้วกดสุ่มเมนูได้เลย" /> :
        <div className={styles.randomResult}><ToolIcon name="bowl" size={78} /><small>วันนี้ลองกิน</small><strong>{picked}</strong><button type="button" onClick={pick}>สุ่มใหม่อีกครั้ง</button></div>}
      </section>
      <ToolHistory toolId="what-to-eat" summary={text} />
    </div>
  );
}

function Empty({ icon, title, detail }: { icon: string; title: string; detail: string }) {
  return <div className={styles.placeholder}><ToolIcon name={icon} size={68} /><h3>{title}</h3><p>{detail}</p></div>;
}

function ErrorBox({ text }: { text: string }) {
  return <div className={styles.errorBox} role="alert">{text}</div>;
}

export default function ToolPageClient({ kind }: { kind: ToolKind }) {
  const tool = homeToolMap[kind];
  const { favorite, theme, toggleFavorite, toggleTheme } = useToolPreferences(kind);
  const related = relatedMap[kind].map((id) => homeToolMap[id]);

  return (
    <div className={styles.page}>
      <header className={styles.topbar}>
        <div className={styles.topbarInner}>
          <Link className={styles.brand} href="/">
            <img src="/krobkrueng-logo.webp" alt="ครบเครื่อง Krobkrueng" width={38} height={38} />
            <span><strong>ครบเครื่อง</strong><small>Krobkrueng</small></span>
          </Link>
          <div className={styles.topActions}>
            <button type="button" onClick={toggleFavorite} className={favorite ? styles.favoriteActive : ""} aria-label={favorite ? "นำออกจากรายการโปรด" : "เพิ่มในรายการโปรด"}><UiIcon name="heart" size={18} /></button>
            <button type="button" onClick={toggleTheme} aria-label="เปลี่ยนธีม"><UiIcon name={theme === "light" ? "moon" : "sun"} size={18} /></button>
          </div>
        </div>
      </header>

      <main className={styles.shell}>
        <nav className={styles.breadcrumb} aria-label="breadcrumb">
          <Link href="/">หน้าหลัก</Link><span>›</span><Link href="/#tools">เครื่องมือ</Link><span>›</span><b>{tool.title}</b>
        </nav>

        <section className={styles.toolHero}>
          <div className={styles.heroIcon}><ToolIcon name={tool.icon} size={78} /></div>
          <div className={styles.heroCopy}>
            <span className={styles.category}>{tool.category}</span>
            <h1>{tool.title}</h1>
            <p>{tool.desc}</p>
            <div className={styles.trustRow}><span>ใช้ฟรี</span><span>ไม่ต้องสมัคร</span><span>ประมวลผลในเบราว์เซอร์</span></div>
          </div>
        </section>

        <section className={styles.workspace}>
          {kind === "discount" && <DiscountTool />}
          {kind === "percentage" && <PercentageTool />}
          {kind === "date-count" && <DateCountTool />}
          {kind === "split-bill" && <SplitBillTool />}
          {kind === "salary" && <SalaryTool />}
          {kind === "compare-value" && <CompareValueTool />}
          {kind === "leave-time" && <LeaveTimeTool />}
          {kind === "what-to-eat" && <WhatToEatTool />}
        </section>

        <section className={styles.related}>
          <div className={styles.sectionHead}><span>เลือกใช้ต่อได้ทันที</span><h2>เครื่องมือที่เกี่ยวข้อง</h2></div>
          <div className={styles.relatedGrid}>
            {related.map((item) => (
              <Link href={item.href} key={item.id} className={styles.relatedCard}>
                <ToolIcon name={item.icon} size={48} />
                <div><strong>{item.title}</strong><small>{item.category} · เปิดเครื่องมือ →</small></div>
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
