"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { categories, tools } from "@/data/tools";
import ToolCard from "@/components/ToolCard";

export default function ToolExplorer({
  initialQuery = "",
  initialCategory = "",
  initialStatus = "",
}: {
  initialQuery?: string;
  initialCategory?: string;
  initialStatus?: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const deferredQuery = useDeferredValue(query);

  const results = useMemo(() => {
    const normalized = deferredQuery.trim().toLowerCase();
    return tools.filter((tool) => {
      const matchesCategory = !category || tool.categorySlug === category;
      const matchesStatus = !initialStatus || tool.status === initialStatus;
      const haystack = [tool.name, tool.description, tool.category, ...tool.keywords].join(" ").toLowerCase();
      return matchesCategory && matchesStatus && (!normalized || haystack.includes(normalized));
    });
  }, [deferredQuery, category, initialStatus]);

  return (
    <>
      <div className="tool-search-panel">
        <div className="search-panel-head">
          <div>
            <span className="eyebrow">SMART SEARCH</span>
            <strong>หาเครื่องมือที่ต้องการ</strong>
          </div>
          <span className="result-pill">{results.length} / {tools.length}</span>
        </div>

        <label className="search-box compact">
          <span>⌕</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="ลองค้นหา “ภาษี”, “ผ่อนรถ”, “QR” หรือ “ย่อรูป”…"
          />
          {query ? <button type="button" className="search-clear" onClick={() => setQuery("")}>ล้าง</button> : null}
        </label>

        <div className="chips scroll-x category-rail">
          <button className={!category ? "chip active" : "chip"} onClick={() => setCategory("")}>
            <span>✦</span> ทั้งหมด <b>{tools.length}</b>
          </button>
          {categories.map((item) => {
            const count = tools.filter((tool) => tool.categorySlug === item.slug).length;
            return (
              <button key={item.slug} className={category === item.slug ? "chip active" : "chip"} onClick={() => setCategory(item.slug)}>
                <span>{item.icon}</span> {item.name} <b>{count}</b>
              </button>
            );
          })}
        </div>
      </div>

      <div className="result-head">
        <div>
          <span className="eyebrow">RESULTS</span>
          <h2>{query || category ? "ผลลัพธ์ที่ตรงกับคุณ" : "สำรวจเครื่องมือทั้งหมด"}</h2>
          <p>พบ {results.length} เครื่องมือที่พร้อมให้เลือกใช้งาน</p>
        </div>
      </div>

      <div className="tools-grid">
        {results.map((tool) => <ToolCard key={tool.slug} tool={tool} />)}
      </div>

      {!results.length ? (
        <div className="empty-state">
          <span className="empty-icon">⌕</span>
          <strong>ยังไม่พบเครื่องมือที่ตรงคำค้น</strong>
          <p>ลองใช้คำสั้นลง เช่น “ภาษี”, “QR”, “รถ” หรือ “PDF”</p>
          <button className="secondary-btn" onClick={() => { setQuery(""); setCategory(""); }}>ดูเครื่องมือทั้งหมด</button>
        </div>
      ) : null}
    </>
  );
}
