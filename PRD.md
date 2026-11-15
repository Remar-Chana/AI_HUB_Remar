# PRD: AI Hub Landing Page (PRD-ID: PRD--001)

- เวอร์ชัน: 1.0
- สถานะ: Draft
- Owner: ไม่ระบุ
- อัปเดตล่าสุด: 2026-11-13

## 1. Product Context

- ฟีเจอร์/โปรดักต์นี้คืออะไร? Landing Page สำหรับ AI Hub ซึ่งเป็นแพลตฟอร์มรวม AI Models และ AI Agents จากหลาย Provider ให้ผู้ใช้เลือก Model เปรียบเทียบราคา ทดลองใช้งาน และเชื่อมต่อ API ผ่าน Endpoint เดียว รวมถึงมี Marketplace สำหรับ AI Agents และ Workflow
- ทำไมต้องทำตอนนี้? ลูกค้าส่วนใหญ่ยังไม่เข้าใจ Product จากเว็บไซต์และต้องคุยกับทีม Sales ก่อนเริ่มใช้งาน ส่งผลให้เสียเวลาและ Conversion เป้าหมายคือให้เว็บไซต์อธิบาย Product ได้ด้วยตัวเอง

## 2. Problem Statement

- เรากำลังแก้ปัญหาอะไร?
  - P-001: ผู้เข้าชมไม่เข้าใจว่า Product ทำอะไรและต้องพึ่งทีม Sales ก่อนเริ่มใช้งาน
  - P-002: ผู้ใช้ต้องสมัครหลาย Platform จัดการ API หลายชุด เปรียบเทียบ Model ยาก และพบ Documentation กระจัดกระจาย
  - P-003: ผู้เข้าชมออกจากเว็บไซต์โดยไม่เข้าใจคุณค่าหรือเริ่มทดลองใช้งาน
- ใครคือคนที่มีปัญหาเหล่านี้? Developer และ AI Engineer เป็นกลุ่มหลัก; Startup Founder, Product Manager และ UX Designer ที่อยากทดลอง AI เป็นกลุ่มรอง

## 3. Goals & Non-goals

- Goals
  - เพิ่มจำนวนผู้สมัครและการใช้งาน API
  - สร้างความน่าเชื่อถือของ Product และลดภาระทีม Sales
  - เพิ่ม Conversion Rate, Sign Up, การกด CTA และเวลาที่ผู้ใช้อยู่บนเว็บไซต์ (ไม่มีค่าเป้าหมายเชิงตัวเลขในข้อมูลต้นทาง)
  - ช่วยให้ผู้ใช้เข้าใจ Product ภายในไม่กี่วินาที ดูราคา เปรียบเทียบ Model และไปสมัครได้
- Non-goals
  - Blog, Community, Dashboard, Search แบบละเอียด, User Login และ Live Playground ไม่อยู่ใน Release นี้

## 4. Target Users / Personas

- Persona 1: Developer หรือ AI Engineer — ผู้ใช้หลักที่ต้องการเข้าใจ AI Hub ดูราคา เปรียบเทียบ Model และเริ่มสมัครได้ โดยเผชิญความยุ่งยากจากหลาย Platform/API และ Documentation ที่กระจัดกระจาย
- Persona 2: Startup Founder, Product Manager หรือ UX Designer ที่อยากทดลอง AI — ผู้ใช้รองที่ต้องการทำความเข้าใจ Product และพิจารณาการทดลองใช้ รายละเอียดความต้องการเพิ่มเติมไม่ระบุ

## 5. Use Cases / Jobs To Be Done

- UC-001: ในฐานะ Developer หรือ AI Engineer ฉันต้องการเข้าใจ AI Hub ได้ภายในไม่กี่วินาที เพื่อให้ประเมินได้ว่า Product ช่วยเรื่องใด
- UC-002: ในฐานะผู้สนใจ AI Hub ฉันต้องการดูและเปรียบเทียบ AI Models และราคา เพื่อให้เลือกแนวทางที่เหมาะกับการใช้งาน
- UC-003: ในฐานะผู้สนใจ AI Hub ฉันต้องการเปิด Documentation โดยไม่ต้องล็อกอิน เพื่อให้ศึกษาวิธีใช้งานได้
- UC-004: ในฐานะผู้สนใจ AI Hub ฉันต้องการกด Get Started และไปหน้า Sign Up เพื่อเริ่มสมัครใช้บริการ

## 6. Assumptions / Constraints / Dependencies

- Assumptions: ไม่มีการเพิ่มสมมติฐานผลิตภัณฑ์นอกเหนือจากข้อมูลต้นทาง; รายละเอียดที่ยังไม่ชัดเจนบันทึกไว้ใน Open Questions
- Constraints: ใช้ Next.js, Deploy บน Vercel, Responsive ทุก Device, SEO Friendly, Accessibility ระดับ AA และโหลดหน้าแรกไม่เกินสองวินาที
- Dependencies: Pricing ดึงจากระบบกลาง; ข้อมูล AI Models ล่าสุดและข้อมูล Cache; หน้า Sign Up เป็นปลายทางของ CTA ทุกตัว
- ขอบเขต Marketplace ยังไม่ชัดเจน: มีข้อกำหนดให้แสดง AI Agents Marketplace Preview แต่ยังไม่ตัดสินใจว่าจะเปิด Marketplace ใน Release แรกหรือ Release ถัดไป

## 7. Functional Requirements

### FR--001: อธิบาย AI Hub ใน Hero

- คำอธิบาย (ระบุว่า WHAT ไม่ใช่ HOW): Landing Page ต้องแสดง Hero พร้อมข้อความหลักที่ช่วยให้ผู้เข้าชมเข้าใจ AI Hub ภายในไม่กี่วินาที และ Hero ต้องแสดง AI Models ล่าสุด
- Use cases ที่เกี่ยวข้อง: [UC-001, UC-002]
- ปัญหาที่เกี่ยวข้อง: [P-001, P-003]
- ผู้ใช้งานหลัก / actor หลัก: ผู้เข้าชม Landing Page
- Triggers / inputs: ผู้ใช้เปิดหน้า Landing Page; ข้อมูล AI Models ล่าสุด (เกณฑ์และแหล่งข้อมูลยังไม่ระบุ)
- ผลลัพธ์ที่คาดหวัง: ผู้ใช้เห็นคำอธิบาย Product และ AI Models ล่าสุด

### FR--002: แสดงข้อมูล Features และส่วนประกอบของ Product

- คำอธิบาย (ระบุว่า WHAT ไม่ใช่ HOW): Landing Page ต้องแสดง Feature Overview/Feature Cards, AI Models, AI Agents Marketplace Preview, Dashboard Preview, FAQ และ Footer เพื่อสื่อสารข้อมูล Product ตามขอบเขตที่ระบุ
- Use cases ที่เกี่ยวข้อง: [UC-001, UC-002]
- ปัญหาที่เกี่ยวข้อง: [P-001, P-002, P-003]
- ผู้ใช้งานหลัก / actor หลัก: ผู้เข้าชม Landing Page
- Triggers / inputs: ผู้ใช้เปิดหรือเลื่อนดู Landing Page
- ผลลัพธ์ที่คาดหวัง: ผู้ใช้เห็น Features, Models และ Preview ที่ระบุ

### FR--003: แสดงราคาและเรียง AI Models

- คำอธิบาย (ระบุว่า WHAT ไม่ใช่ HOW): Landing Page ต้องแสดง Pricing ที่ดึงจากระบบกลาง และแสดง AI Models โดยรายการ Models เรียงตาม Popularity
- Use cases ที่เกี่ยวข้อง: [UC-002]
- ปัญหาที่เกี่ยวข้อง: [P-002]
- ผู้ใช้งานหลัก / actor หลัก: ผู้เข้าชม Landing Page
- Triggers / inputs: ข้อมูล Pricing จากระบบกลางและข้อมูล AI Models/Popularity
- ผลลัพธ์ที่คาดหวัง: ผู้ใช้ดูราคาและเปรียบเทียบ Models ได้

### FR--004: ให้เข้าถึง Documentation โดยไม่ต้องล็อกอิน

- คำอธิบาย (ระบุว่า WHAT ไม่ใช่ HOW): Landing Page ต้องให้ผู้ใช้เปิด Documentation ได้โดยไม่ต้องล็อกอิน
- Use cases ที่เกี่ยวข้อง: [UC-003]
- ปัญหาที่เกี่ยวข้อง: [P-002]
- ผู้ใช้งานหลัก / actor หลัก: ผู้เข้าชม Landing Page
- Triggers / inputs: ผู้ใช้เลือกเข้าถึง Documentation
- ผลลัพธ์ที่คาดหวัง: ผู้ใช้เปิด Documentation ได้โดยไม่ผ่านการล็อกอิน

### FR--005: แสดง CTA และนำผู้ใช้ไปสมัคร

- คำอธิบาย (ระบุว่า WHAT ไม่ใช่ HOW): Landing Page ต้องแสดง CTA หลายตำแหน่ง โดยมี Get Started, Explore Models และ View Documentation และทุก CTA ต้องนำไปหน้า Sign Up
- Use cases ที่เกี่ยวข้อง: [UC-004]
- ปัญหาที่เกี่ยวข้อง: [P-001, P-003]
- ผู้ใช้งานหลัก / actor หลัก: ผู้เข้าชม Landing Page
- Triggers / inputs: ผู้ใช้กด CTA
- ผลลัพธ์ที่คาดหวัง: ผู้ใช้ถูกนำไปหน้า Sign Up

### FR--006: รองรับรูปแบบและการโต้ตอบของหน้า

- คำอธิบาย (ระบุว่า WHAT ไม่ใช่ HOW): Landing Page ต้องใช้ Dark Mode เป็นค่าเริ่มต้น และมี Scroll Animation, Card Hover, Number Counter, Gradient Background Animation และ Smooth Transition
- Use cases ที่เกี่ยวข้อง: [UC-001, UC-002]
- ปัญหาที่เกี่ยวข้อง: [P-001]
- ผู้ใช้งานหลัก / actor หลัก: ผู้เข้าชม Landing Page
- Triggers / inputs: ผู้ใช้เปิดหรือโต้ตอบกับหน้าเว็บ
- ผลลัพธ์ที่คาดหวัง: แสดงหน้าใน Dark Mode พร้อม Interaction/Animation ที่ระบุ

### FR--007: จัดการกรณีโหลดข้อมูลหรือสื่อไม่สำเร็จ

- คำอธิบาย (ระบุว่า WHAT ไม่ใช่ HOW): เมื่อโหลด AI Models ไม่ได้ต้องใช้ข้อมูล Cache; เมื่อ Pricing API ล่มต้องแสดง Default Pricing; เมื่อรูปไม่โหลดต้องแสดง Placeholder; และเมื่อ Browser ไม่รองรับ Animation ต้องแสดงแบบ Static
- Use cases ที่เกี่ยวข้อง: [UC-001, UC-002]
- ปัญหาที่เกี่ยวข้อง: [P-001, P-002]
- ผู้ใช้งานหลัก / actor หลัก: ผู้เข้าชม Landing Page
- Triggers / inputs: Models โหลดไม่สำเร็จ, Pricing API ใช้งานไม่ได้, รูปโหลดไม่สำเร็จ หรือ Browser ไม่รองรับ Animation
- ผลลัพธ์ที่คาดหวัง: ผู้ใช้เห็นข้อมูลสำรองหรือหน้า Static ตามกรณี

## 8. Non-functional Requirements

- Performance: หน้าแรกต้องโหลดไม่เกินสองวินาที
- Reliability: [DRAFT] เมื่อ Models โหลดไม่สำเร็จต้องใช้ Cache; เมื่อ Pricing API ล่มต้องแสดง Default Pricing; กรณีดังกล่าวเป็นพฤติกรรมที่ระบุไว้ แต่รายละเอียดความพร้อมใช้งานและการกู้คืนไม่ระบุ
- Security / privacy: ไม่ได้มีการพูดถึงข้อกำหนดด้าน Security/Privacy; ระบุเพียงว่า Documentation เปิดได้โดยไม่ต้องล็อกอิน
- UX / accessibility: Responsive ทุก Device, SEO Friendly, Accessibility ระดับ AA, Dark Mode เป็นค่า Default; เมื่อ Browser ไม่รองรับ Animation ให้แสดงแบบ Static
- Platform: ใช้ Next.js และ Deploy บน Vercel

## 9. Business Rules

- BR--001: Pricing ต้องดึงจากระบบกลาง; หาก Pricing API ล่มให้แสดง Default Pricing
- BR--002: Documentation เปิดได้โดยไม่ต้องล็อกอิน
- BR--003: CTA ทุกตัวต้องไปหน้า Sign Up
- BR--004: Hero ต้องแสดง AI Models ล่าสุด และ Features Models ต้องจัดเรียงตาม Popularity

## 10. User Flows (High-level)

- FLOW--001: สำรวจ AI Hub และสมัครใช้งาน — 1) ผู้ใช้เข้าเว็บไซต์ 2) อ่าน Hero 3) เลื่อนดู Features 4) ดู AI Models 5) ดู Pricing 6) อ่าน FAQ 7) กด Get Started 8) ไปหน้า Sign Up

## 11. Edge Cases & Error Scenarios

- โหลด AI Models ไม่ได้: ใช้ข้อมูล Cache
- Pricing API ล่ม: แสดง Default Pricing (รายละเอียดเนื้อหา Default Pricing ยังไม่ระบุ)
- รูปไม่โหลด: แสดง Placeholder
- Browser ไม่รองรับ Animation: แสดงแบบ Static

## 12. Out-of-scope

- Blog
- Community
- Dashboard (ผลิตภัณฑ์; มี Dashboard Preview อยู่ในข้อกำหนด Landing Page)
- Search แบบละเอียด
- User Login
- Live Playground

## 13. Success Metrics

- Conversion Rate สูงขึ้น
- จำนวน Sign Up เพิ่มขึ้น
- จำนวนการกด CTA เพิ่มขึ้น
- เวลาที่ผู้ใช้อยู่บนเว็บไซต์เพิ่มขึ้น
- ค่าเป้าหมายเชิงตัวเลข, วิธีวัดผล และช่วงเวลาการวัด: ไม่ได้ระบุ

## 14. Acceptance Criteria (แยกตาม FR)

### AC--001 (สำหรับ FR--001)

GIVEN ผู้เข้าชมเปิด Landing Page  
WHEN Hero แสดงผล  
THEN มีข้อความหลักและแสดง AI Models ล่าสุด [DRAFT: เกณฑ์คำว่า “ล่าสุด” และข้อความที่ต้องแสดงยังไม่ระบุ]

### AC--002 (สำหรับ FR--002)

GIVEN ผู้เข้าชมกำลังดู Landing Page  
WHEN ตรวจดูส่วนประกอบของหน้า  
THEN พบ Feature Overview/Cards, AI Models, AI Agents Marketplace Preview, Dashboard Preview, FAQ และ Footer [DRAFT: รายละเอียดเนื้อหาและการจัดวางยังไม่ระบุ]

### AC--003 (สำหรับ FR--003)

GIVEN ระบบกลางมีข้อมูล Pricing และมีรายการ AI Models  
WHEN หน้า Landing Page แสดงส่วน Pricing และ Models  
THEN แสดง Pricing จากระบบกลางและเรียง Models ตาม Popularity [DRAFT: วิธีจัดการข้อมูลไม่พร้อมและเกณฑ์ Popularity ยังไม่ระบุ]

### AC--004 (สำหรับ FR--004)

GIVEN ผู้ใช้ยังไม่ได้ล็อกอิน  
WHEN ผู้ใช้เลือกเปิด Documentation  
THEN ผู้ใช้เข้าถึง Documentation ได้โดยไม่ต้องล็อกอิน

### AC--005 (สำหรับ FR--005)

GIVEN ผู้ใช้เห็น CTA บน Landing Page  
WHEN ผู้ใช้กด CTA ใด ๆ  
THEN ระบบนำผู้ใช้ไปหน้า Sign Up [DRAFT: URL และพฤติกรรมปลายทางหลังเปิดหน้า Sign Up ยังไม่ระบุ]

### AC--006 (สำหรับ FR--006)

GIVEN ผู้ใช้เปิด Landing Page  
WHEN หน้าเว็บแสดงผลและผู้ใช้โต้ตอบ  
THEN หน้าเว็บใช้ Dark Mode เป็นค่าเริ่มต้นและมี Animation/Interaction ที่ระบุ [DRAFT: รายละเอียดพฤติกรรมและการเข้าถึงของแต่ละ Animation ยังไม่ระบุ]

### AC--007 (สำหรับ FR--007)

GIVEN เกิดกรณีโหลด Models/Pricing/รูปไม่สำเร็จ หรือ Browser ไม่รองรับ Animation  
WHEN หน้า Landing Page จัดการกรณีนั้น  
THEN ใช้ Cache, Default Pricing, Placeholder หรือ Static display ตามลำดับ [DRAFT: เกณฑ์อายุ Cache และเนื้อหา Default Pricing/Placeholder ยังไม่ระบุ]

## 15. Open Questions

- Hero จะใช้วิดีโอหรือ Illustration และข้อความหลักจะเป็นอย่างไร?
- จะมี AI Chat Assistant บนหน้าเว็บหรือไม่?
- รูปแบบ Pricing และเนื้อหา Default Pricing เมื่อ Pricing API ล่มคืออะไร?
- AI Agent Marketplace จะเปิดในเวอร์ชันแรกหรือเวอร์ชันถัดไป?
- Explore Models และ View Documentation จะมีปลายทางอย่างไรเมื่อกฎกำหนดให้ CTA ทุกตัวไปหน้า Sign Up?
- อะไรคือเกณฑ์/แหล่งข้อมูลของ AI Models ล่าสุดและ Popularity และจะจัดการ Cache อย่างไร?
- อะไรคือรายละเอียด Features, FAQ, Dashboard Preview, CTA placement และ Animation/Interaction?
- ค่าเป้าหมายเชิงตัวเลข วิธีวัดผล และช่วงเวลาสำหรับ Success Metrics คืออะไร?
- ใครเป็น Owner และใครรับผิดชอบงานต่อ รวมถึงกำหนดส่งเมื่อใด?
- วันที่ประชุมและบทบาทของผู้เข้าร่วมคืออะไร?

## 16. Changelog

- v1.0 - ดราฟต์แรกจาก discovery meeting
