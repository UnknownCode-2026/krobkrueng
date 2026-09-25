import Link from "next/link";
import type { Tool } from "@/data/tools";

export default function ToolCard({ tool, featured = false }: { tool: Tool; featured?: boolean }) {
  return (
    <Link className={featured ? "tool-card featured" : "tool-card"} href={"/tools/" + tool.slug}>
      <span className="card-glow" aria-hidden="true"></span>
      <div className="tool-card-top">
        <span className="tool-icon-shell"><span className="tool-icon">{tool.icon}</span></span>
        <div className="tool-badges">
          {tool.status === "beta" ? <span className="badge muted">BETA</span> : null}
          {featured && tool.status === "ready" ? <span className="badge">แนะนำ</span> : null}
        </div>
        <span className="card-arrow" aria-hidden="true">↗</span>
      </div>
      <span className="tool-category">{tool.category}</span>
      <h3>{tool.name}</h3>
      <p>{tool.description}</p>
      <span className="tool-cta"><span>{tool.status === "ready" ? "เปิดเครื่องมือ" : "ดูรายละเอียด"}</span><b aria-hidden="true">→</b></span>
    </Link>
  );
}
