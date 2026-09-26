import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ToolCard from "@/components/ToolCard";
import ToolWorkspace from "@/components/ToolWorkspace";
import { getTool, tools } from "@/data/tools";

export function generateStaticParams() {
  return tools.filter((tool) => !["discount", "percentage", "split-bill"].includes(tool.slug)).map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) return {};
  return {
    title: tool.name,
    description: tool.description,
    alternates: { canonical: "/tools/" + slug },
    openGraph: { title: tool.name + " | ครบเครื่อง", description: tool.description, url: "/tools/" + slug },
  };
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) notFound();

  const related = tools.filter((item) => item.categorySlug === tool.categorySlug && item.slug !== tool.slug).slice(0, 3);

  return (
    <section className="container tool-page">
      <nav className="breadcrumb" aria-label="breadcrumb">
        <Link href="/">หน้าแรก</Link><span>›</span>
        <Link href={"/categories/" + tool.categorySlug}>{tool.category}</Link><span>›</span>
        <span>{tool.name}</span>
      </nav>

      <div className="tool-title tool-title-premium">
        <div className="tool-title-copy">
          <div className="tool-title-meta">
            <span className="eyebrow">{tool.category}</span>
            <span className={tool.status === "ready" ? "status ready" : "status"}>{tool.status === "ready" ? "● พร้อมใช้งาน" : "● BETA"}</span>
          </div>
          <h1>{tool.name}</h1>
          <p>{tool.description}</p>
          <div className="tool-trust-row">
            <span>⚡ ใช้งานทันที</span>
            <span>◇ ไม่ต้องสมัคร</span>
            <span>◎ รองรับมือถือ</span>
          </div>
        </div>
        <div className="tool-title-icon"><span>{tool.icon}</span></div>
      </div>

      <div className="workspace-shell">
        <div className="workspace-label">
          <div><span className="workspace-dot"></span>KROBKRUENG WORKSPACE</div>
          <span>ประมวลผลแบบ Private-first</span>
        </div>
        <ToolWorkspace tool={tool} />
      </div>

      <section className="tool-info">
        <div>
          <span className="eyebrow">PRIVACY FIRST</span>
          <h2>ข้อมูลของคุณ<br />อยู่กับคุณ</h2>
        </div>
        <div className="tool-info-copy">
          <p>เครื่องมือ V1.1 ที่รองรับจะคำนวณ สร้าง QR และประมวลผลรูปในเบราว์เซอร์เป็นหลัก เว็บไซต์ไม่บันทึกค่าที่คุณกรอกเพื่อคำนวณ</p>
          <div className="privacy-points">
            <span>01 · ไม่ต้องสร้างบัญชี</span>
            <span>02 · ใช้งานได้ทันที</span>
            <span>03 · ออกแบบให้เข้าใจง่าย</span>
          </div>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="related-section">
          <div className="section-heading">
            <div><span className="eyebrow">RELATED</span><h2>เครื่องมือที่เกี่ยวข้อง</h2></div>
          </div>
          <div className="tools-grid">{related.map((item) => <ToolCard key={item.slug} tool={item} />)}</div>
        </section>
      ) : null}
    </section>
  );
}
