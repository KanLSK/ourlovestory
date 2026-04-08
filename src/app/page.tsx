"use client";

import FloatingSakura from "@/components/FloatingSakura";
import BackgroundAura from "@/components/BackgroundAura";
import EnvelopeScene from "@/components/EnvelopeScene";
import CalendarCarousel from "@/components/CalendarCarousel";

export default function Home() {
  return (
    <main className="relative grain">
      {/* Ambient backgrounds */}
      <BackgroundAura />
      <FloatingSakura />

      {/* Main UI components hoisted into a higher Z-context so they sit above Sakura/Aura */}
      <div style={{ position: "relative", zIndex: 10 }}>
        {/* ═══════════════════════════════════════════
          SECTION 1 — Envelope Intro
          Cream envelope enclosed by heart, flap opens on scroll
          ═══════════════════════════════════════════ */}
      <EnvelopeScene />


      {/* ═══════════════════════════════════════════
          SECTION 3+4 — Calendar Emerges + 3D Rotating Calendar
          Expands from letter, rotates Jan → Feb → Mar → Apr
          April 8 highlighted with stars and sparkle
          ═══════════════════════════════════════════ */}
      <CalendarCarousel />

      {/* ═══════════════════════════════════════════
          FOOTER
          ═══════════════════════════════════════════ */}
      <footer
        style={{
          padding: "4rem 1.5rem",
          textAlign: "center",
        }}
      >
        <p
          className="font-sans"
          style={{
            color: "rgba(244, 143, 177, 0.3)",
            fontSize: "0.7rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
         ❤️❤️❤️❤️❤️❤️
        </p>
        <p
          style={{
            color: "rgba(244, 143, 177, 0.2)",
            fontSize: "0.7rem",
            marginTop: "0.5rem",
          }}
        >
          ❤️
        </p>
      </footer>
      </div>
    </main>
  );
}
