# Raw Requirements — AI Hub Landing Page

## 0. บริบทการประชุม

- วันที่ (ถ้ามีระบุ): ไม่ระบุในเสียง
- ผู้เข้าร่วม (ระบุเป็น role เท่านั้นถ้าทำได้): ผู้สัมภาษณ์/ผู้เก็บ Requirements และผู้ให้ข้อมูลเกี่ยวกับ AI Hub (ชื่อและตำแหน่งไม่ระบุ)
- วัตถุประสงค์หลัก (1-2 ประโยค): เก็บ Requirements สำหรับ Landing Page ของ AI Hub เพื่อนำไปจัดทำ PRD, UX Flow, UI Design และ Development

## 1. ปัญหา

- P-001: ลูกค้าส่วนใหญ่เข้าเว็บไซต์แล้วไม่เข้าใจว่า Product ทำอะไร และต้องคุยกับทีม Sales ก่อนจึงเริ่มใช้งานได้ ทำให้เสีย Conversion และเสียเวลา
- P-002: ลูกค้าต้องสมัครหลาย Platform, มี API หลายชุด, เปรียบเทียบ Model ยาก และ Documentation กระจัดกระจาย
- P-003: หากไม่มี Landing Page ลูกค้าอาจออกจากเว็บไซต์เร็ว ไม่เข้าใจคุณค่าของ Product และไม่เริ่มทดลองใช้งาน

## 2. เป้าหมาย

- เป้าหมายทางธุรกิจ: เพิ่มจำนวนผู้สมัคร เพิ่มการใช้งาน API สร้างความน่าเชื่อถือของ Product และลดภาระทีม Sales
- เป้าหมายของผลิตภัณฑ์ / outcomes ที่ต้องการ: ช่วยให้ผู้ใช้เข้าใจ Product ภายในไม่กี่วินาที ดูราคา เปรียบเทียบ Model และกดสมัครได้ทันที
- Success signals ที่กล่าวถึง: Conversion Rate สูงขึ้น, Sign Up เพิ่มขึ้น, CTA ถูกกดมากขึ้น และผู้ใช้อยู่ในเว็บไซต์นานขึ้น (ไม่มีการระบุค่าเป้าหมายเชิงตัวเลข)

## 3. ผู้ใช้ / Personas

- Developer และ AI Engineer (กลุ่มหลัก): ต้องการเข้าใจ Product ดูราคา เปรียบเทียบ Model และสมัครใช้งานได้ทันที; ปัจจุบันพบความยุ่งยากจากหลาย Platform/API และ Documentation ที่กระจัดกระจาย
- Startup Founder, Product Manager และ UX Designer ที่อยากทดลอง AI (กลุ่มรอง): ต้องการเข้าใจ Product และทดลองเลือกใช้ AI (รายละเอียดความต้องการเพิ่มเติมไม่ได้ระบุ)

## 4. Use Cases / Jobs To Be Done

- UC-001: ในฐานะ Developer หรือ AI Engineer ฉันต้องการเข้าใจ AI Hub ได้ภายในไม่กี่วินาที เพื่อให้ประเมินได้ว่า Product ช่วยเรื่องใด
- UC-002: ในฐานะผู้สนใจ AI Hub ฉันต้องการดูและเปรียบเทียบ AI Models และราคา เพื่อให้เลือกแนวทางที่เหมาะกับการใช้งาน
- UC-003: ในฐานะผู้สนใจ AI Hub ฉันต้องการเปิด Documentation โดยไม่ต้องล็อกอิน เพื่อให้ศึกษาวิธีใช้งานได้
- UC-004: ในฐานะผู้สนใจ AI Hub ฉันต้องการกด Get Started และไปหน้า Sign Up เพื่อเริ่มสมัครใช้บริการ

## 5. Functional Requirements (Raw)

- FR-R-001: Landing Page ต้องแสดง Hero Section พร้อมข้อความหลักเพื่ออธิบาย AI Hub
- FR-R-002: Landing Page ต้องแสดง Feature Overview/Feature Cards, AI Models, AI Agents Marketplace Preview, Pricing, Documentation, FAQ, CTA และ Footer; ต้องมี Dashboard Preview ด้วย
- FR-R-003: Landing Page ต้องมี CTA หลายตำแหน่ง ได้แก่ Get Started, Explore Models และ View Documentation โดย CTA ทุกตัวต้องไปหน้า Sign Up
- FR-R-004: หน้าเว็บต้องแสดง AI Models ล่าสุดใน Hero และจัดเรียงรายการ Models ตาม Popularity
- FR-R-005: Pricing ต้องดึงข้อมูลจากระบบกลาง และ Documentation ต้องเปิดได้โดยไม่ต้องล็อกอิน
- FR-R-006: หน้าเว็บต้องมี Scroll Animation, Card Hover, Number Counter, Gradient Background Animation และ Smooth Transition; Dark Mode เป็นค่าเริ่มต้น
- FR-R-007: หากโหลด AI Models ไม่ได้ให้ใช้ข้อมูล Cache; หาก Pricing API ล่มให้แสดง Default Pricing; หากรูปไม่โหลดให้ใช้ Placeholder; หาก Browser ไม่รองรับ Animation ให้แสดงหน้าแบบ Static

## 6. Non-functional Requirements (Raw)

- รองรับ Responsive ทุก Device
- SEO Friendly
- ใช้ Next.js และ Deploy บน Vercel
- รองรับ Accessibility ระดับ AA
- โหลดหน้าแรกไม่เกินสองวินาที

## 7. Constraints / Dependencies / Risks

- Constraints: ใช้ Next.js, Deploy บน Vercel, รองรับทุก Device, SEO Friendly, Accessibility ระดับ AA, เวลาโหลดหน้าแรกไม่เกินสองวินาที
- Dependencies: Pricing ดึงข้อมูลจากระบบกลาง; AI Models ต้องมีข้อมูลล่าสุดและข้อมูล Cache สำหรับกรณีโหลดไม่สำเร็จ; CTA ปลายทางเป็นหน้า Sign Up
- Risks / unresolved decisions: ยังไม่ตัดสินใจเรื่อง Hero แบบวิดีโอหรือ Illustration, AI Chat Assistant, รูปแบบ Pricing และเวลาที่จะเปิด AI Agent Marketplace

## 8. Business Rules (Raw)

- BR-R-001: Pricing ต้องดึงจากระบบกลาง; หาก Pricing API ใช้งานไม่ได้ให้แสดง Default Pricing
- BR-R-002: Documentation ต้องเข้าถึงได้โดยไม่ต้องล็อกอิน
- BR-R-003: CTA ทุกตัวต้องนำไปหน้า Sign Up
- BR-R-004: Hero ต้องแสดง AI Models ล่าสุด และรายการ Models ต้องจัดเรียงตาม Popularity

## 9. Edge Cases / Special Scenarios

- โหลด AI Models ไม่ได้: ใช้ข้อมูล Cache
- Pricing API ล่ม: แสดง Default Pricing
- รูปภาพโหลดไม่สำเร็จ: แสดง Placeholder
- Browser ไม่รองรับ Animation: แสดงแบบ Static

## 10. Out-of-scope

- Blog
- Community
- Dashboard (ตัวผลิตภัณฑ์; ใน Landing Page ยังมีการกล่าวถึง Dashboard Preview)
- Search แบบละเอียด
- User Login
- Live Playground

## 11. Open Questions / Ambiguities

- [AMBIGUOUS] ชื่อ/บทบาทของผู้เข้าร่วมและวันที่ประชุมไม่ปรากฏในเสียง
- [AMBIGUOUS] รูปแบบ Hero จะใช้วิดีโอหรือ Illustration
- [AMBIGUOUS] จะมี AI Chat Assistant บนหน้าเว็บหรือไม่
- [AMBIGUOUS] รูปแบบ Pricing ยังไม่สรุป รวมถึงรายละเอียด Default Pricing เมื่อ Pricing API ล่ม
- [AMBIGUOUS] AI Agent Marketplace จะเปิดในเวอร์ชันแรกหรือเวอร์ชันถัดไป แม้มีการระบุ Marketplace Preview ใน Scope
- [AMBIGUOUS] รายละเอียดข้อความหลักใน Hero, เนื้อหา Features, FAQ, ข้อมูล Dashboard Preview และตำแหน่ง/ปลายทางเฉพาะของ CTA Explore Models และ View Documentation ยังไม่ระบุ (มีกฎว่า CTA ทุกตัวไปหน้า Sign Up)
- [AMBIGUOUS] ไม่มีการระบุตัวเลขเป้าหมายของ Success Metrics, วิธีวัดผล หรือระยะเวลา
- [AMBIGUOUS] ไม่มีการระบุผู้รับผิดชอบและกำหนดส่งของงานต่อ
- [AMBIGUOUS] ไม่ได้ระบุแหล่ง/เกณฑ์ความหมายของ AI Models ล่าสุด, Popularity, วิธีอัปเดต Cache หรือระยะเวลา Cache
- [AMBIGUOUS] ไม่ได้ระบุการทำงานของ Animation/Interaction นอกเหนือจากชื่อที่กล่าวถึง
