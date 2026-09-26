import type { ReactNode } from "react";

type IconProps = {
  name: string;
  size?: number;
  className?: string;
};

const green = "#0B8F4F";
const greenDark = "#075E36";
const greenDeep = "#06472D";
const lime = "#9BDD3C";
const limeSoft = "#DFF6A8";
const cream = "#FFFDF7";
const white = "#FFFFFF";
const steel = "#DDE7E1";
const warm = "#F4C76A";

function SoftIconFrame({ size, className = "", children }: { size: number; className?: string; children: ReactNode }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function ToolIcon({ name, size = 54, className = "" }: IconProps) {
  switch (name) {
    case "split":
      return (
        <SoftIconFrame size={size} className={className}>
          <rect x="8" y="14" width="42" height="34" rx="11" fill={greenDeep} />
          <rect x="11" y="17" width="36" height="27" rx="9" fill={green} />
          <path d="M13 23c8-4 20-5 32-1v8H13v-7Z" fill="#22B866" opacity=".85" />
          <rect x="34" y="25" width="19" height="15" rx="7.5" fill={cream} />
          <circle cx="42" cy="32.5" r="3.2" fill={lime} />
          <circle cx="18" cy="46" r="7" fill={warm} />
          <circle cx="18" cy="46" r="4.3" fill="#FFE3A8" />
          <path d="M15.5 46h5" stroke="#B47A14" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M15 20c8-2 19-2 27 0" stroke={white} strokeWidth="2.2" strokeLinecap="round" opacity=".55" />
        </SoftIconFrame>
      );
    case "tag":
      return (
        <SoftIconFrame size={size} className={className}>
          <path d="M10 20.5 30 8h19a7 7 0 0 1 7 7v19L36 54 10 28V20.5Z" fill={greenDark} />
          <path d="M13 21.5 31.5 11H48a5 5 0 0 1 5 5v16.5L35.5 50 13 27.5v-6Z" fill={green} />
          <circle cx="43.5" cy="19.5" r="4.6" fill={cream} />
          <circle cx="43.5" cy="19.5" r="2.2" fill={lime} />
          <path d="M23 29 39 45" stroke={white} strokeWidth="4.2" strokeLinecap="round" />
          <circle cx="24" cy="39.5" r="4.3" fill={limeSoft} />
          <circle cx="38.5" cy="31" r="4.3" fill={limeSoft} />
          <path d="M16 21c6-3.5 12-6 18-7.5" stroke={white} strokeWidth="2.4" strokeLinecap="round" opacity=".5" />
        </SoftIconFrame>
      );
    case "bowl":
      return (
        <SoftIconFrame size={size} className={className}>
          <path d="M13 30h38c-1.4 15-8.8 22-19 22S14.4 45 13 30Z" fill={greenDark} />
          <path d="M17 31.5h30c-1.4 10.2-6.8 16.5-15 16.5s-13.6-6.3-15-16.5Z" fill={cream} />
          <path d="M21 31c4-5 18-5 22 0" stroke={lime} strokeWidth="4" strokeLinecap="round" />
          <path d="M23 26c0-3 2.5-4 2.5-8M32 26c0-3 2.5-4 2.5-8M41 26c0-3 2.5-4 2.5-8" stroke="#A6D6B8" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M25 37c5 2.5 9 2.5 14 0" stroke={green} strokeWidth="2.5" strokeLinecap="round" />
          <ellipse cx="32" cy="52" rx="13" ry="2.5" fill="#0A4A2B" opacity=".22" />
        </SoftIconFrame>
      );
    case "clock":
      return (
        <SoftIconFrame size={size} className={className}>
          <circle cx="32" cy="33" r="22" fill={greenDeep} />
          <circle cx="32" cy="33" r="18.5" fill={cream} />
          <circle cx="32" cy="33" r="15.5" fill="#F6FFF8" />
          <path d="M32 23v11l8 4" stroke={green} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="32" cy="33" r="3" fill={lime} />
          <path d="M25 8h14" stroke={greenDeep} strokeWidth="5" strokeLinecap="round" />
          <path d="M20 13 16 9M44 13l4-4" stroke={green} strokeWidth="4" strokeLinecap="round" />
          <path d="M23 17c5-3 12-4 18-1.5" stroke={white} strokeWidth="2.3" strokeLinecap="round" opacity=".7" />
        </SoftIconFrame>
      );
    case "calendar":
      return (
        <SoftIconFrame size={size} className={className}>
          <rect x="11" y="13" width="42" height="40" rx="10" fill={greenDeep} />
          <rect x="14" y="17" width="36" height="32" rx="8" fill={cream} />
          <path d="M14 25h36v-4a4 4 0 0 0-4-4H18a4 4 0 0 0-4 4v4Z" fill={green} />
          <path d="M23 10v10M41 10v10" stroke={greenDeep} strokeWidth="4" strokeLinecap="round" />
          <rect x="21" y="31" width="8" height="7" rx="2.5" fill={limeSoft} />
          <rect x="35" y="31" width="8" height="7" rx="2.5" fill="#DCEBE1" />
          <rect x="21" y="40" width="8" height="5" rx="2.3" fill="#DCEBE1" />
          <rect x="35" y="40" width="8" height="5" rx="2.3" fill={lime} />
          <path d="M17 21c9-2 19-2 29 0" stroke={white} strokeWidth="2" strokeLinecap="round" opacity=".5" />
        </SoftIconFrame>
      );
    case "wallet":
      return (
        <SoftIconFrame size={size} className={className}>
          <path d="M13 17h33a7 7 0 0 1 7 7v24H18a9 9 0 0 1-9-9V22a5 5 0 0 1 4-5Z" fill={greenDeep} />
          <rect x="12" y="20" width="37" height="24" rx="8" fill={green} />
          <path d="M15 23c9-3 20-3 31 0" stroke={white} strokeWidth="2.4" strokeLinecap="round" opacity=".45" />
          <rect x="35" y="27" width="18" height="13" rx="6.5" fill={cream} />
          <circle cx="43" cy="33.5" r="3" fill={lime} />
          <path d="M18 17c4-6 15-7 22-3" stroke={warm} strokeWidth="5" strokeLinecap="round" />
          <path d="M20 15c6-4 13-4 19-1" stroke="#FFE3A8" strokeWidth="2.2" strokeLinecap="round" />
        </SoftIconFrame>
      );
    case "scale":
      return (
        <SoftIconFrame size={size} className={className}>
          <path d="M29 11h6v38h-6z" fill={greenDeep} />
          <rect x="20" y="47" width="24" height="6" rx="3" fill={greenDark} />
          <rect x="15" y="16" width="34" height="5" rx="2.5" fill={green} />
          <circle cx="32" cy="18.5" r="5" fill={lime} />
          <path d="M18 21 11 34h14L18 21ZM46 21 39 34h14L46 21Z" fill={cream} stroke={greenDark} strokeWidth="2" strokeLinejoin="round" />
          <path d="M10 34c1 6 15 6 16 0M38 34c1 6 15 6 16 0" stroke={green} strokeWidth="3" strokeLinecap="round" />
        </SoftIconFrame>
      );
    case "percent":
      return (
        <SoftIconFrame size={size} className={className}>
          <rect x="12" y="9" width="40" height="46" rx="11" fill={greenDeep} />
          <rect x="15" y="12" width="34" height="40" rx="9" fill={cream} />
          <rect x="19" y="16" width="26" height="10" rx="4" fill="#E8F5EC" />
          <path d="M23 21h11" stroke={green} strokeWidth="3" strokeLinecap="round" />
          <circle cx="24" cy="34" r="4.2" fill={lime} />
          <circle cx="40" cy="45" r="4.2" fill={limeSoft} />
          <path d="M42 31 22 48" stroke={green} strokeWidth="4" strokeLinecap="round" />
          <path d="M18 14c6-2 14-2 22 0" stroke={white} strokeWidth="2" strokeLinecap="round" opacity=".55" />
        </SoftIconFrame>
      );
    case "grid":
      return (
        <SoftIconFrame size={size} className={className}>
          <rect x="9" y="9" width="20" height="20" rx="7" fill={green} />
          <rect x="35" y="9" width="20" height="20" rx="7" fill={lime} />
          <rect x="9" y="35" width="20" height="20" rx="7" fill="#DDEBE2" />
          <rect x="35" y="35" width="20" height="20" rx="7" fill={greenDeep} />
          <path d="M14 14h7M40 14h7M14 40h7M40 40h7" stroke={white} strokeWidth="2.4" strokeLinecap="round" opacity=".65" />
        </SoftIconFrame>
      );
    case "bag":
      return (
        <SoftIconFrame size={size} className={className}>
          <path d="M13 23h38l-3 31H16l-3-31Z" fill={greenDeep} />
          <path d="M17 26h30l-2.2 24H19.2L17 26Z" fill={green} />
          <path d="M23 25v-5a9 9 0 0 1 18 0v5" stroke={greenDeep} strokeWidth="4" strokeLinecap="round" />
          <rect x="28" y="33" width="12" height="9" rx="4.5" fill={cream} />
          <path d="M21 29c6-2 15-2 21 0" stroke={white} strokeWidth="2.2" strokeLinecap="round" opacity=".5" />
          <circle cx="34" cy="37.5" r="2.2" fill={lime} />
        </SoftIconFrame>
      );
    default:
      return (
        <SoftIconFrame size={size} className={className}>
          <circle cx="32" cy="32" r="22" fill={green} />
          <circle cx="32" cy="32" r="13" fill={cream} />
        </SoftIconFrame>
      );
  }
}

export function CategoryIcon({ name, size = 30, className = "" }: IconProps) {
  return <ToolIcon name={name} size={size} className={className} />;
}

export function UiIcon({ name, size = 24, className = "" }: IconProps) {
  const common = {
    className,
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.9,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (name) {
    case "search": return <svg {...common}><circle cx="10.5" cy="10.5" r="6"/><path d="m15 15 4.5 4.5"/></svg>;
    case "heart": return <svg {...common}><path d="M20 8.4c0 5-8 10.1-8 10.1S4 13.4 4 8.4A4.1 4.1 0 0 1 11.2 5.7L12 6.6l.8-.9A4.1 4.1 0 0 1 20 8.4Z"/></svg>;
    case "sun": return <svg {...common}><circle cx="12" cy="12" r="3.6"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M18.7 5.3l-1.4 1.4M6.7 17.3l-1.4 1.4"/></svg>;
    case "moon": return <svg {...common}><path d="M19 15.5A8 8 0 0 1 8.5 5a8.2 8.2 0 1 0 10.5 10.5Z"/></svg>;
    case "home": return <svg {...common}><path d="m4 10 8-6 8 6v9a1 1 0 0 1-1 1h-5v-6h-4v6H5a1 1 0 0 1-1-1Z"/></svg>;
    case "grid": return <svg {...common}><rect x="4" y="4" width="6" height="6" rx="1.5"/><rect x="14" y="4" width="6" height="6" rx="1.5"/><rect x="4" y="14" width="6" height="6" rx="1.5"/><rect x="14" y="14" width="6" height="6" rx="1.5"/></svg>;
    case "bag": return <svg {...common}><path d="M5.5 8.5h13l1 11h-15l1-11Z"/><path d="M9 9V7a3 3 0 0 1 6 0v2"/></svg>;
    case "info": return <svg {...common}><circle cx="12" cy="12" r="9"/><path d="M12 10v6M12 7h.01"/></svg>;
    case "chevron-left": return <svg {...common}><path d="m14.5 6-6 6 6 6"/></svg>;
    case "chevron-right": return <svg {...common}><path d="m9.5 6 6 6-6 6"/></svg>;
    case "arrow": return <svg {...common}><path d="M5 12h14M14 7l5 5-5 5"/></svg>;
    default: return <svg {...common}><circle cx="12" cy="12" r="8"/></svg>;
  }
}
