# ครบเครื่อง — Krobkrueng

เว็บไซต์เครื่องมือออนไลน์ฟรีสำหรับช่วยเรื่องเล็ก ๆ ในชีวิตประจำวัน

## V1.5 — Custom Icon & Visual System

V1.5 อัปเกรดงานภาพของทั้งเว็บไซต์โดยคง Layout และ UX Foundation จาก V1.4 เอาไว้ เน้นให้ Icon ดูมีมิติ เป็นวัตถุจริงมากขึ้น และมีเอกลักษณ์ของแบรนด์ครบเครื่อง

- เพิ่ม Krobkrueng Custom Icon System แยกเป็น Tool Icon / Category Icon / UI Icon
- Tool Icons เปลี่ยนจากเส้น SVG ธรรมดาเป็น Soft 3D SVG แบบวัตถุจริงมากขึ้น
- ออกแบบ Icon เฉพาะสำหรับ หารค่าใช้จ่าย, ส่วนลด, อาหาร, เวลา, นับวัน, เงินเดือน, ความคุ้มค่า และเปอร์เซ็นต์
- ใช้ Brand Green, Deep Green, Lime, Cream และสีเสริมในสัดส่วนเดียวกันทั้งชุด
- เพิ่ม Highlight, Layer, Shadow และ Depth โดยไม่ใช้ Emoji
- Category Slider ใช้ Dimensional Icon แบบย่อ
- Search Suggestions ใช้ Icon จริงของแต่ละเครื่องมือ
- Navigation / Search / Favorite / Arrow ยังใช้ Custom Vector Line เพื่อให้ UI อ่านง่าย
- Tool Card ปรับพื้นที่ Icon ให้เด่นขึ้นโดยไม่รื้อ Layout
- เพิ่ม Hover lift และ Favorite micro-animation
- รองรับ Light / Dark Mode สำหรับ Icon System
- Mobile ปรับ Icon scale และ spacing ให้เหมาะกับจอเล็ก
- แยก Icon Component ไปไว้ที่ `components/KrobkruengIcons.tsx` เพื่อรองรับการเพิ่มเครื่องมือใหม่ในอนาคต
- คง Search V2, Search Suggestions, Category Filter, Favorites, Recent Tools และ Local Storage
- ไม่แสดงเลขเวอร์ชันบนหน้าเว็บไซต์สาธารณะ

ยังไม่มี Login, Database, Admin, Payment หรือระบบสมาชิกใน V1.5

Production: https://krobkrueng.netlify.app/
