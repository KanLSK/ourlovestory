// ═══════════════════════════════════════════════════════════════
// EDITABLE DATA — Change names, letter content, memories here
// ═══════════════════════════════════════════════════════════════

// ── Recipient & Sender ──────────────────────────────────────────
export const recipientName = "To Ying"; // Displayed on envelope
export const senderName = "from TK"; // Displayed on letter header

// ── Letter Content ──────────────────────────────────────────────
// Each string = one paragraph. Edit freely. Supports Thai + English.
export const letterBody: string[] = [
  "ถึงน้องหญิงง 💕",
  "ตั้งแต่วันที่เราทั้งสองคนได้คุยกัน พี่มีความสุขมากๆเลยนะะ ตลอด 3 เดือนทีผ่านมา พี่รู้สึกสบายใจเวลาที่ได้อยู่กับหนู เหมือนได้ทิ้งความเครียดออกไปเลย หนุเป็น safe space ของพี่จริงๆ ขอบคุณที่อยู่เคียงข้างพี่มาตลอดในวันที่พี่เศร้าหรือเครียดนะ ขอบคุณที่เชื่อมั่นในตัวพี่มาเสมอ",
  "ต่อจากนี้พี่อยากให้เราสองคนได้เติบโตไปด้วยกัน เรืยนรู้กันและกันไปเรื่อยๆ ไปตามหาความฝันของตนเองแล้วกลับมาแบ่งปันประสบการณ์ให้กัน เป็นที่พักผิงของกันและกัน เหนื่อยก้แค่มาหา ก้แค่เล่า หรือถ้าอยากบ่นอะไรก้มาบ่นให้ฟังได้ตลอดเลย พี่พร้อมรับฟัง พร้อมยุตรงนี้เสมอให้หนู",
  "ท้ายที่สุดแล้ว ขอบคุณที่เราทั้งสองเลือกให้โอกาสกันและกัน ที่ทำให้เราทั้งสองคนได้มาอยู่ตรง ณ จุดนี้นะะ หนูเป้นความสดใสให้พี่ได้เสมอเลย อยู่ด้วยกันไปนานๆนะ รักหญิงนะคับบ ❤️"
];

// ── Thai Ending Line ────────────────────────────────────────────
export const letterEndingThai =
  "แล้วโตไปด้วยกันอีกนานๆนะะ";

// ── Memory Calendar Months ──────────────────────────────────────
export interface MemoryItem {
  image: string; // Path in /public/
  title: string; // Short title
  subtitle?: string; // Optional subtitle
  popupMessage: string; // Message shown in popup
  tilt?: number; // Rotation in degrees (scrapbook feel)
  day: number; // Day of the month for calendar view
}

export interface MonthData {
  name: string; // Month name
  nameEN: string; // English month name
  memories: MemoryItem[];
}

export const months: MonthData[] = [
  // ── JANUARY ──
  {
    name: "มกราคม",
    nameEN: "January",
    memories: [
      {
        image: "/memories/08_01.jpg",
        title: "8 มกราคม",
        subtitle: "ความทรงจำดีๆเริ่มต้นที่นี่",
        popupMessage: "เริ่มต้นปีด้วยความสุขที่มีเราอยู่ข้างๆ 😊",
        tilt: -3,
        day: 8,
      },
      {
        image: "/memories/08_01_2.jpg",
        title: "ภาพแห่งความทรงจำ",
        subtitle: "เก็บไว้ดูทุกครั้งที่คิดถึง",
        popupMessage: "รอยยิ้มพวกนี้คือความสุขของพี่นะ 💕",
        tilt: 4,
        day: 8,
      },
      {
        image: "/memories/08_01_3.jpg",
        title: "วันดีๆอีกมุม",
        subtitle: "เวลาผ่านไปเร็วมากเลย",
        popupMessage: "ไม่อยากให้เวลาวันนี้ผ่านไปเลย 🥰",
        tilt: -2,
        day: 8,
      },
    ],
  },
  // ── FEBRUARY ──
  {
    name: "กุมภาพันธ์",
    nameEN: "February",
    memories: [
      {
        image: "/memories/14_02.jpg",
        title: "วาเลนไทน์แรกด้วยกัน",
        subtitle: "มีความสุขที่สุดเลย",
        popupMessage: "ขอบคุณที่เป็นของขวัญที่ดีที่สุดสำหรับพี่ในวันนี้นะ 🌹💖",
        tilt: 2,
        day: 14,
      },
      {
        image: "/memories/14_02_dinner.jpg",
        title: "มื้อเย็นที่แสนพิเศษ",
        subtitle: "อร่อยกว่าทุกวันเพราะมีเธอ",
        popupMessage: "อาหารอร่อย บรรยากาศดี แต่ที่ดีที่สุดคือคนตรงหน้านี่แหละ 🍝🍷",
        tilt: -4,
        day: 14,
      },
      {
        image: "/memories/14_02_photobooth.png",
        title: "Photobooth มุมน่ารัก",
        subtitle: "ยิ้มกันจนแก้มปวด 📸",
        popupMessage: "Photobooth ด้วยกัน ยิ้มกันจนแก้มปวดเลย น่ารักมากๆ 📸💗",
        tilt: 3,
        day: 14,
      },
      {
        image: "/memories/14_02_drawing.jpeg",
        title: "รูปที่เราวาดด้วยกัน",
        subtitle: "ผลงานชิ้นเอกของเรา 🎨💕",
        popupMessage: "รูปวาดนี้มีความหมายมากเลยนะ พี่จะเก็บไว้ตลอดไปเลย 🦆🌸",
        tilt: -1,
        day: 14,
      },
    ],
  },
  // ── MARCH ──
  {
    name: "มีนาคม",
    nameEN: "March",
    memories: [
      {
        image: "/memories/30_03.jpg",
        title: "เที่ยวทริปของพวกเรา",
        subtitle: "สนุกจนไม่อยากกลับ",
        popupMessage: "ทริปแห่งความสุข ขอบคุณที่ไปด้วยกันนะ 🌍💕",
        tilt: -3,
        day: 30,
      },
      {
        image: "/memories/30_03_2.jpg",
        title: "ความทรงจำในทริป",
        subtitle: "ไปไหนด้วยกันก็มีความสุข",
        popupMessage: "บรรยากาศดีๆที่มีเราอยู่ด้วย ดีที่สุดเลยย ✨",
        tilt: 2,
        day: 30,
      },
    ],
  },
  // ── APRIL ──
  {
    name: "เมษายน",
    nameEN: "April",
    memories: [
      {
        image: "/memories/01_04_1.jpg",
        title: "เริ่มต้นเดือนใหม่",
        subtitle: "กับความทรงจำที่ไม่เคยเก่า",
        popupMessage: "ผ่านไปอีกเดือนแล้ว ขอบคุณที่ให้พี่ดูแลมาตลอดนะ 💗",
        tilt: 3,
        day: 1,
      },
      {
        image: "/memories/01_04_2.jpg",
        title: "โมเมนต์น่ารักๆ",
        subtitle: "เก็บมาฝาก 📸",
        popupMessage: "ไม่ว่าจะหันมุมไหนก็น่ารักไปหมดเลยยย 🥰",
        tilt: -2,
        day: 1,
      },
      {
        image: "/memories/01_04_3.jpg",
        title: "ยิ้มให้กัน",
        subtitle: "กำลังใจของกันและกัน",
        popupMessage: "เห็นแบบนี้แล้วมีกำลังใจทำทุกอย่างเลย ✨",
        tilt: 1,
        day: 1,
      },
      {
        image: "/memories/01_04_4.jpg",
        title: "ความสุขใกล้ตัว",
        subtitle: "จะดูแลไปเรื่อยๆ",
        popupMessage: "พี่มีความสุขทุกครั้งที่นึกถึงตอนนี้นะ 💖",
        tilt: -4,
        day: 1,
      },
    ],
  },
];

// ── April 8 Special Highlight ───────────────────────────────────
export const specialDate = {
  month: "April",
  day: 8,
  label: "8 เมษายน",
  title: "วันพิเศษของเรา",
  // This is the question you'll ask her:
  message: "คุณจะให้เราเป็นแฟนคุณไหม? 💗",
  subtitle: "วันที่พี่อยากถามเราสิ่งพิเศษ...",
  sparkleCount: 30, // Number of sparkle particles
  glowIntensity: 1.0, // 0.0 - 1.0
  glowColor: "rgba(255, 182, 193, 0.8)", // Soft rose glow
};
