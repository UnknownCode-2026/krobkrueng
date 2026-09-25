export type ToolStatus = "ready" | "beta";

export type Tool = {
  slug: string;
  name: string;
  description: string;
  category: string;
  categorySlug: string;
  icon: string;
  featured?: boolean;
  status: ToolStatus;
  keywords: string[];
};

export type Category = {
  slug: string;
  name: string;
  icon: string;
  description: string;
};

export const categories: Category[] = [
  { slug: "finance", name: "การเงิน", icon: "฿", description: "ภาษี เงินเดือน ดอกเบี้ย และการวางแผนเงิน" },
  { slug: "home-car", name: "บ้านและรถ", icon: "⌂", description: "สินเชื่อ ค่างวด บ้าน รถ และการปิดหนี้" },
  { slug: "business", name: "ค้าขาย", icon: "▣", description: "VAT กำไร ราคาขาย และต้นทุนธุรกิจ" },
  { slug: "land", name: "ที่ดิน", icon: "◇", description: "หน่วยพื้นที่ ราคา และค่าใช้จ่ายเกี่ยวกับที่ดิน" },
  { slug: "date-time", name: "วันเวลา", icon: "◷", description: "อายุ วันที่ ปี พ.ศ. และการนับช่วงเวลา" },
  { slug: "daily", name: "ชีวิตประจำวัน", icon: "✦", description: "ค่าใช้จ่าย สุขภาพ หน่วย และเรื่องใช้บ่อย" },
  { slug: "qr", name: "QR / PromptPay", icon: "▦", description: "สร้าง QR รับเงิน QR ทั่วไป และอ่านข้อมูล" },
  { slug: "documents", name: "เอกสาร / PDF", icon: "▤", description: "จัดการ PDF Excel CSV และ Word ในเบราว์เซอร์" },
  { slug: "images", name: "รูปภาพ", icon: "▧", description: "ย่อ บีบอัด ครอป และแปลงไฟล์รูป" },
  { slug: "random", name: "สุ่ม", icon: "↝", description: "สุ่มตัวเลข รายชื่อ ทีม รหัสผ่าน และคำตอบ" },
  { slug: "video", name: "วิดีโอและลิงก์", icon: "▷", description: "เครื่องมือช่วยจัดการลิงก์และสื่อออนไลน์" },
  { slug: "thai-life", name: "ไทยและความเชื่อ", icon: "✺", description: "ตรวจสลาก ทำนายฝัน และเครื่องมือภาษาไทย" }
];

export const tools: Tool[] = [
  { slug:"thai-income-tax", name:"คำนวณภาษีเงินได้", description:"ประเมินภาษีเงินได้บุคคลธรรมดาจากรายได้และค่าลดหย่อนหลัก", category:"การเงิน", categorySlug:"finance", icon:"฿", featured:true, status:"ready", keywords:["ภาษี","เงินได้","รายได้"] },
  { slug:"net-salary", name:"เงินเดือนสุทธิ", description:"ประมาณเงินรับจริงหลังหักประกันสังคมและภาษี", category:"การเงิน", categorySlug:"finance", icon:"฿", featured:true, status:"ready", keywords:["เงินเดือน","สุทธิ","salary"] },
  { slug:"social-security", name:"ประกันสังคม", description:"ประมาณเงินสมทบประกันสังคมจากฐานค่าจ้าง", category:"การเงิน", categorySlug:"finance", icon:"฿", featured:true, status:"ready", keywords:["ประกันสังคม","ม33"] },
  { slug:"severance-pay", name:"ค่าชดเชยเลิกจ้าง", description:"ประเมินค่าชดเชยเบื้องต้นจากเงินเดือนและอายุงาน", category:"การเงิน", categorySlug:"finance", icon:"฿", status:"ready", keywords:["ค่าชดเชย","เลิกจ้าง"] },
  { slug:"overtime", name:"คำนวณ OT", description:"คำนวณค่าล่วงเวลาจากค่าจ้างและจำนวนชั่วโมง", category:"การเงิน", categorySlug:"finance", icon:"฿", status:"ready", keywords:["OT","โอที","ล่วงเวลา"] },
  { slug:"service-years", name:"คำนวณอายุงาน", description:"นับระยะเวลาทำงานระหว่างวันเริ่มงานและวันที่เลือก", category:"การเงิน", categorySlug:"finance", icon:"฿", status:"ready", keywords:["อายุงาน","ทำงาน"] },
  { slug:"withholding-tax", name:"ภาษีหัก ณ ที่จ่าย", description:"คำนวณยอดหักและยอดรับสุทธิจากเปอร์เซ็นต์ที่กำหนด", category:"การเงิน", categorySlug:"finance", icon:"฿", status:"ready", keywords:["หัก ณ ที่จ่าย","ภาษี"] },
  { slug:"compound-interest", name:"ดอกเบี้ยทบต้น", description:"คำนวณเงินปลายทางจากเงินต้น ดอกเบี้ย และระยะเวลา", category:"การเงิน", categorySlug:"finance", icon:"฿", status:"ready", keywords:["ดอกเบี้ย","ทบต้น","เงินออม"] },
  { slug:"percentage", name:"คำนวณเปอร์เซ็นต์", description:"หาเปอร์เซ็นต์ของจำนวนได้อย่างรวดเร็ว", category:"การเงิน", categorySlug:"finance", icon:"%", status:"ready", keywords:["เปอร์เซ็นต์","percent"] },
  { slug:"discount", name:"คำนวณส่วนลด", description:"เช็กราคาหลังลดและจำนวนเงินที่ประหยัดได้", category:"ค้าขาย", categorySlug:"business", icon:"%", status:"ready", keywords:["ส่วนลด","ราคา"] },
  { slug:"vat", name:"คำนวณ VAT 7%", description:"เพิ่มหรือถอด VAT จากยอดสินค้าและบริการ", category:"ค้าขาย", categorySlug:"business", icon:"%", featured:true, status:"ready", keywords:["VAT","ภาษีมูลค่าเพิ่ม"] },
  { slug:"profit", name:"คำนวณกำไร", description:"ดูจำนวนกำไรและอัตรากำไรจากต้นทุนกับราคาขาย", category:"ค้าขาย", categorySlug:"business", icon:"฿", status:"ready", keywords:["กำไร","ต้นทุน"] },
  { slug:"selling-price", name:"ตั้งราคาขาย", description:"หาราคาขายจากต้นทุนและเปอร์เซ็นต์กำไรที่ต้องการ", category:"ค้าขาย", categorySlug:"business", icon:"฿", status:"ready", keywords:["ราคาขาย","กำไร"] },
  { slug:"online-shop-profit", name:"กำไรร้านค้าออนไลน์", description:"รวมต้นทุนและค่าธรรมเนียมเพื่อดูยอดกำไรโดยประมาณ", category:"ค้าขาย", categorySlug:"business", icon:"฿", status:"ready", keywords:["ร้านค้า","ออนไลน์","กำไร"] },
  { slug:"loan-payment", name:"คำนวณค่างวด", description:"ประมาณค่างวดสินเชื่อแบบลดต้นลดดอกจากวงเงินและดอกเบี้ย", category:"บ้านและรถ", categorySlug:"home-car", icon:"⌂", featured:true, status:"ready", keywords:["ค่างวด","สินเชื่อ","ผ่อน"] },
  { slug:"home-loan", name:"คำนวณผ่อนบ้าน", description:"ประเมินค่างวดบ้านรายเดือนจากวงเงิน อัตราดอกเบี้ย และระยะเวลา", category:"บ้านและรถ", categorySlug:"home-car", icon:"⌂", featured:true, status:"ready", keywords:["บ้าน","ผ่อนบ้าน","สินเชื่อ"] },
  { slug:"car-loan", name:"คำนวณผ่อนรถ", description:"คำนวณเงินดาวน์ ยอดจัด และค่างวดแบบดอกเบี้ยคงที่", category:"บ้านและรถ", categorySlug:"home-car", icon:"◉", status:"ready", keywords:["รถ","ผ่อนรถ","ดาวน์"] },
  { slug:"credit-card-payoff", name:"วางแผนปิดหนี้บัตร", description:"ประมาณจำนวนเดือนและดอกเบี้ยจากยอดหนี้และยอดจ่ายต่อเดือน", category:"บ้านและรถ", categorySlug:"home-car", icon:"▭", status:"ready", keywords:["บัตรเครดิต","หนี้"] },
  { slug:"interest-compare", name:"เทียบอัตราดอกเบี้ย", description:"เปรียบเทียบต้นทุนดอกเบี้ยจากเงินต้นและอัตราที่ต่างกัน", category:"บ้านและรถ", categorySlug:"home-car", icon:"%", status:"ready", keywords:["ดอกเบี้ย","เปรียบเทียบ"] },
  { slug:"land-unit", name:"แปลงหน่วยที่ดิน", description:"แปลงไร่ งาน ตารางวา และตารางเมตร", category:"ที่ดิน", categorySlug:"land", icon:"◇", status:"ready", keywords:["ไร่","งาน","ตารางวา","ที่ดิน"] },
  { slug:"land-price", name:"คำนวณราคาที่ดิน", description:"หาราคารวมจากขนาดพื้นที่และราคาต่อตารางวา", category:"ที่ดิน", categorySlug:"land", icon:"◇", status:"ready", keywords:["ราคาที่ดิน","ตารางวา"] },
  { slug:"property-transfer-fee", name:"ค่าธรรมเนียมโอน", description:"ประเมินค่าธรรมเนียมโอนเบื้องต้นจากราคาประเมิน", category:"ที่ดิน", categorySlug:"land", icon:"◇", status:"ready", keywords:["ค่าโอน","ที่ดิน"] },
  { slug:"age", name:"คำนวณอายุ", description:"คำนวณอายุจากวันเกิดจนถึงวันนี้", category:"วันเวลา", categorySlug:"date-time", icon:"◷", status:"ready", keywords:["อายุ","วันเกิด"] },
  { slug:"date-difference", name:"นับจำนวนวัน", description:"หาจำนวนวันระหว่างวันที่สองวัน", category:"วันเวลา", categorySlug:"date-time", icon:"◷", status:"ready", keywords:["จำนวนวัน","วันที่"] },
  { slug:"buddhist-year", name:"แปลง พ.ศ. / ค.ศ.", description:"แปลงปีไทยและคริสต์ศักราชไปมาได้ทันที", category:"วันเวลา", categorySlug:"date-time", icon:"◷", status:"ready", keywords:["พ.ศ.","ค.ศ.","ปี"] },
  { slug:"holiday-count", name:"นับวันทำการ", description:"ประมาณวันทำการระหว่างช่วงวันที่โดยตัดเสาร์อาทิตย์", category:"วันเวลา", categorySlug:"date-time", icon:"◷", status:"ready", keywords:["วันทำการ","วันหยุด"] },
  { slug:"countdown", name:"นับถอยหลังวันสำคัญ", description:"ดูจำนวนวันที่เหลือก่อนถึงวันที่กำหนด", category:"วันเวลา", categorySlug:"date-time", icon:"◷", status:"ready", keywords:["นับถอยหลัง","วันสำคัญ"] },
  { slug:"electricity-bill", name:"คำนวณค่าไฟ", description:"ประมาณค่าไฟจากจำนวนหน่วยที่ใช้ด้วยอัตราเฉลี่ยสำหรับวางแผน", category:"ชีวิตประจำวัน", categorySlug:"daily", icon:"⚡", featured:true, status:"ready", keywords:["ค่าไฟ","ไฟฟ้า"] },
  { slug:"water-bill", name:"คำนวณค่าน้ำ", description:"ประมาณค่าน้ำจากจำนวนหน่วยที่ใช้", category:"ชีวิตประจำวัน", categorySlug:"daily", icon:"◌", status:"ready", keywords:["ค่าน้ำ","ประปา"] },
  { slug:"fuel-cost", name:"คำนวณค่าน้ำมัน", description:"ประมาณค่าเดินทางจากระยะทาง อัตราสิ้นเปลือง และราคาน้ำมัน", category:"ชีวิตประจำวัน", categorySlug:"daily", icon:"◉", status:"ready", keywords:["น้ำมัน","เดินทาง"] },
  { slug:"bmi", name:"คำนวณ BMI", description:"คำนวณดัชนีมวลกายจากน้ำหนักและส่วนสูง", category:"ชีวิตประจำวัน", categorySlug:"daily", icon:"✦", status:"ready", keywords:["BMI","น้ำหนัก","ส่วนสูง"] },
  { slug:"calories", name:"คำนวณพลังงานพื้นฐาน", description:"ประเมิน BMR แบบง่ายจากน้ำหนัก ส่วนสูง อายุ และเพศ", category:"ชีวิตประจำวัน", categorySlug:"daily", icon:"✦", status:"ready", keywords:["BMR","แคลอรี่"] },
  { slug:"split-bill", name:"หารบิล", description:"แบ่งยอดรวมเท่า ๆ กันตามจำนวนคน", category:"ชีวิตประจำวัน", categorySlug:"daily", icon:"÷", status:"ready", keywords:["หารบิล","แบ่งเงิน"] },
  { slug:"unit-converter", name:"แปลงหน่วย", description:"แปลงกิโลเมตรเป็นไมล์และหน่วยพื้นฐานที่ใช้บ่อย", category:"ชีวิตประจำวัน", categorySlug:"daily", icon:"⇄", status:"ready", keywords:["แปลงหน่วย","กิโลเมตร","ไมล์"] },
  { slug:"baht-text", name:"แปลงตัวเลขเป็นบาทถ้วน", description:"แปลงจำนวนเงินเป็นข้อความภาษาไทยสำหรับเอกสาร", category:"ชีวิตประจำวัน", categorySlug:"daily", icon:"ก", status:"ready", keywords:["บาทถ้วน","ตัวเลขเป็นคำ"] },
  { slug:"random-number", name:"สุ่มตัวเลข", description:"สุ่มเลขภายในช่วงที่กำหนด", category:"สุ่ม", categorySlug:"random", icon:"↝", status:"ready", keywords:["สุ่ม","ตัวเลข"] },
  { slug:"random-name", name:"สุ่มรายชื่อ", description:"วางรายชื่อทีละบรรทัดแล้วสุ่มหนึ่งรายการ", category:"สุ่ม", categorySlug:"random", icon:"↝", status:"ready", keywords:["สุ่มชื่อ","รายชื่อ"] },
  { slug:"random-team", name:"สุ่มทีม", description:"สุ่มแบ่งรายชื่อออกเป็นจำนวนทีมที่ต้องการ", category:"สุ่ม", categorySlug:"random", icon:"↝", status:"ready", keywords:["สุ่มทีม","แบ่งทีม"] },
  { slug:"password-generator", name:"สุ่มรหัสผ่าน", description:"สร้างรหัสผ่านแบบสุ่มตามความยาวที่ต้องการ", category:"สุ่ม", categorySlug:"random", icon:"↝", status:"ready", keywords:["รหัสผ่าน","password"] },
  { slug:"yes-no", name:"สุ่ม Yes / No", description:"สุ่มคำตอบใช่หรือไม่สำหรับการตัดสินใจเล่น ๆ", category:"สุ่ม", categorySlug:"random", icon:"↝", status:"ready", keywords:["yes","no","สุ่ม"] },
  { slug:"promptpay-qr", name:"สร้าง QR รับเงิน", description:"สร้าง QR PromptPay จากเบอร์โทรหรือเลขประจำตัว พร้อมระบุยอดเงินได้", category:"QR / PromptPay", categorySlug:"qr", icon:"▦", featured:true, status:"ready", keywords:["พร้อมเพย์","PromptPay","QR"] },
  { slug:"qr-code", name:"สร้าง QR Code", description:"เปลี่ยนข้อความหรือลิงก์ให้เป็น QR Code ดาวน์โหลดได้", category:"QR / PromptPay", categorySlug:"qr", icon:"▦", status:"ready", keywords:["QR","คิวอาร์","ลิงก์"] },
  { slug:"qr-reader", name:"อ่าน QR จากรูปภาพ", description:"หน้าเครื่องมือสำหรับอ่านข้อมูลจาก QR ในไฟล์ภาพ", category:"QR / PromptPay", categorySlug:"qr", icon:"▦", status:"beta", keywords:["อ่าน QR","สแกน"] },
  { slug:"merge-pdf", name:"รวมไฟล์ PDF", description:"พื้นที่เตรียมรวม PDF หลายไฟล์เป็นเอกสารเดียว", category:"เอกสาร / PDF", categorySlug:"documents", icon:"▤", status:"beta", keywords:["รวม PDF","PDF"] },
  { slug:"split-pdf", name:"แยกและเลือกหน้า PDF", description:"พื้นที่เตรียมเลือกหน้าจาก PDF แล้วสร้างไฟล์ใหม่", category:"เอกสาร / PDF", categorySlug:"documents", icon:"▤", status:"beta", keywords:["แยก PDF","PDF"] },
  { slug:"delete-pdf-pages", name:"ลบหน้า PDF", description:"พื้นที่เตรียมลบหน้าที่ไม่ต้องการออกจาก PDF", category:"เอกสาร / PDF", categorySlug:"documents", icon:"▤", status:"beta", keywords:["ลบหน้า PDF","PDF"] },
  { slug:"rotate-pdf", name:"หมุนหน้า PDF", description:"พื้นที่เตรียมหมุนหน้าที่กลับหัวหรือวางแนวผิด", category:"เอกสาร / PDF", categorySlug:"documents", icon:"▤", status:"beta", keywords:["หมุน PDF","PDF"] },
  { slug:"image-to-pdf", name:"แปลงรูปภาพเป็น PDF", description:"พื้นที่เตรียมรวมรูปหลายรูปเป็นเอกสาร PDF", category:"เอกสาร / PDF", categorySlug:"documents", icon:"▤", status:"beta", keywords:["รูปเป็น PDF","PDF"] },
  { slug:"excel-to-csv", name:"แปลง Excel เป็น CSV", description:"พื้นที่เตรียมแปลงตาราง Excel เป็นไฟล์ CSV", category:"เอกสาร / PDF", categorySlug:"documents", icon:"▤", status:"beta", keywords:["Excel","CSV"] },
  { slug:"csv-to-excel", name:"แปลง CSV เป็น Excel", description:"พื้นที่เตรียมแปลง CSV เป็นไฟล์ Excel", category:"เอกสาร / PDF", categorySlug:"documents", icon:"▤", status:"beta", keywords:["CSV","Excel"] },
  { slug:"docx-to-text", name:"แปลง Word เป็นข้อความ", description:"พื้นที่เตรียมดึงข้อความจากเอกสาร DOCX", category:"เอกสาร / PDF", categorySlug:"documents", icon:"▤", status:"beta", keywords:["Word","DOCX","TXT"] },
  { slug:"resize-image", name:"ย่อขนาดรูปภาพ", description:"ย่อความกว้างและความสูงของรูปในเบราว์เซอร์", category:"รูปภาพ", categorySlug:"images", icon:"▧", status:"ready", keywords:["ย่อรูป","resize","รูปภาพ"] },
  { slug:"compress-image", name:"ลดขนาดไฟล์รูปภาพ", description:"ลดคุณภาพ JPEG/WebP เพื่อให้ไฟล์เล็กลง", category:"รูปภาพ", categorySlug:"images", icon:"▧", status:"ready", keywords:["บีบอัดรูป","compress"] },
  { slug:"crop-image", name:"ครอปรูปภาพ", description:"พื้นที่เตรียมครอปรูปในเบราว์เซอร์", category:"รูปภาพ", categorySlug:"images", icon:"▧", status:"beta", keywords:["ครอป","crop"] },
  { slug:"image-converter", name:"แปลง JPG / PNG / WebP", description:"แปลงรูปเป็นชนิดไฟล์ที่เลือกด้วย Canvas", category:"รูปภาพ", categorySlug:"images", icon:"▧", status:"ready", keywords:["JPG","PNG","WebP"] },
  { slug:"youtube-thumbnail", name:"ดาวน์โหลดภาพปก YouTube", description:"ดึงลิงก์ภาพปกจาก URL วิดีโอ YouTube ที่ระบุ", category:"วิดีโอและลิงก์", categorySlug:"video", icon:"▷", status:"ready", keywords:["YouTube","thumbnail","ปก"] },
  { slug:"lottery-check", name:"ตรวจสลากด้วยตนเอง", description:"พื้นที่ช่วยเทียบเลขสลากกับเลขรางวัลที่ผู้ใช้กรอกเอง", category:"ไทยและความเชื่อ", categorySlug:"thai-life", icon:"✺", status:"beta", keywords:["หวย","สลาก","ตรวจหวย"] },
  { slug:"dream-meaning", name:"ค้นหาความหมายความฝัน", description:"ค้นหาคำสำคัญในคลังตัวอย่างความเชื่อไทยเพื่อความบันเทิง", category:"ไทยและความเชื่อ", categorySlug:"thai-life", icon:"✺", status:"ready", keywords:["ทำนายฝัน","ความฝัน"] }
];

export const featuredTools = tools.filter((tool) => tool.featured);
export const getTool = (slug: string) => tools.find((tool) => tool.slug === slug);
export const getCategory = (slug: string) => categories.find((category) => category.slug === slug);
