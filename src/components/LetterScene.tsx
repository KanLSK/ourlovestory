"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { senderName, letterBody, letterEndingThai } from "@/data/siteData";

gsap.registerPlugin(ScrollTrigger);

export default function LetterScene() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const paperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const calendarAttachRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const paper = paperRef.current;
      const content = contentRef.current;
      const calendarAttach = calendarAttachRef.current;
      if (!section || !paper || !content || !calendarAttach) return;

      // Calculate how much the content needs to scroll
      const updateScrollAmount = () => {
        const paperHeight = paper.offsetHeight;
        const contentHeight = content.scrollHeight;
        const scrollAmount = Math.max(0, contentHeight - paperHeight + 80);

        // Clear previous ScrollTrigger
        ScrollTrigger.getAll()
          .filter((st) => st.vars.trigger === section)
          .forEach((st) => st.kill());

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            pin: true,
            start: "top top",
            end: `+=${Math.max(4000, scrollAmount * 4)}`,
            scrub: 1.5,
          },
        });

        // Phase 1: Paper naturally scroll into view perfectly sized from EnvelopeScene. We orchestrate the text fading in smoothly.
        tl.fromTo(
          content,
          { opacity: 0 },
          { opacity: 1, duration: 0.1, ease: "power2.inOut" },
          0
        );

        // Phase 2: Content scrolls within the paper (0.1 - 0.78)
        tl.to(
          content,
          {
            y: -scrollAmount,
            duration: 0.68,
            ease: "none",
          },
          0.1
        );

        // Phase 3: Calendar attachment fades in (0.78 - 0.88)
        tl.fromTo(
          calendarAttach,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.1, ease: "power2.out" },
          0.78
        );

        // Phase 4: Everything scales down to transition out (0.9 - 1.0)
        tl.to(
          paper,
          {
            scale: 0.88,
            opacity: 0,
            duration: 0.1,
            ease: "power2.in",
          },
          0.9
        );
      };

      // Initial setup
      updateScrollAmount();

      // Re-calc on resize
      const resizeObserver = new ResizeObserver(() => {
        ScrollTrigger.refresh();
      });
      resizeObserver.observe(content);

      return () => resizeObserver.disconnect();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      style={{
        height: "100vh",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(ellipse, rgba(244,143,177,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* ════════ Letter Paper ════════ */}
      <div
        ref={paperRef}
        style={{
          position: "relative",
          width: "clamp(320px, 55vw, 580px)",
          height: "clamp(420px, 70vh, 700px)",
          background: "linear-gradient(180deg, #ffffff 0%, #fdfcfa 50%, #faf8f5 100%)",
          borderRadius: "6px",
          boxShadow: `
            0 25px 70px rgba(0,0,0,0.25),
            0 0 40px rgba(244,143,177,0.06),
            inset 0 0 0 1px rgba(0,0,0,0.04)
          `,
          overflow: "hidden",
        }}
      >
        {/* Subtle paper texture */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.025,
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 28px, rgba(0,0,0,0.12) 28px, rgba(0,0,0,0.12) 29px)
            `,
            pointerEvents: "none",
          }}
        />

        {/* Left decorative margin line */}
        <div
          style={{
            position: "absolute",
            left: "clamp(28px, 7%, 42px)",
            top: 0,
            bottom: 0,
            width: "1px",
            background: "rgba(244, 143, 177, 0.12)",
            pointerEvents: "none",
          }}
        />

        {/* ════════ Scrolling Content ════════ */}
        <div
          ref={contentRef}
          style={{
            position: "relative",
            padding: "clamp(2rem, 6%, 3rem) clamp(2.5rem, 10%, 4rem)",
            paddingLeft: "clamp(3rem, 12%, 5rem)",
          }}
        >
          {/* Sender name: "from TK" */}
          <div
            className="font-cursive"
            style={{
              color: "#8b6f5a",
              fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
              marginBottom: "0.5rem",
              opacity: 0.85,
            }}
          >
            {senderName}
          </div>

          {/* Decorative line */}
          <div
            style={{
              width: "40px",
              height: "1px",
              background: "linear-gradient(90deg, rgba(244,143,177,0.3), transparent)",
              marginBottom: "2rem",
            }}
          />

          {/* ═══ LETTER BODY — Edit content in siteData.ts ═══ */}
          {letterBody.map((paragraph, i) => (
            <p
              key={i}
              className="font-sans"
              style={{
                color: "#4a3a30",
                fontSize: "clamp(0.9rem, 2vw, 1.05rem)",
                lineHeight: 2,
                marginBottom: "1.5rem",
                fontWeight: 400,
                letterSpacing: "0.01em",
              }}
            >
              {paragraph}
            </p>
          ))}

          {/* ═══ THAI ENDING — Edit in siteData.ts ═══ */}
          <div
            style={{
              marginTop: "2rem",
              marginBottom: "2rem",
              padding: "1.25rem",
              background: "rgba(244, 143, 177, 0.04)",
              borderLeft: "3px solid rgba(244, 143, 177, 0.2)",
              borderRadius: "0 8px 8px 0",
            }}
          >
            <p
              className="font-sans"
              style={{
                color: "#6b4a3a",
                fontSize: "clamp(0.85rem, 1.8vw, 1rem)",
                lineHeight: 2,
                fontWeight: 500,
                fontStyle: "italic",
              }}
            >
              &ldquo;{letterEndingThai}&rdquo;
            </p>
          </div>

          {/* Signature */}
          <div style={{ textAlign: "right", marginTop: "1.5rem" }}>
            <span
              className="font-cursive"
              style={{
                color: "#8b6f5a",
                fontSize: "clamp(1.3rem, 3vw, 1.8rem)",
                opacity: 0.8,
              }}
            >
              — {senderName.replace("from ", "")} 💕
            </span>
          </div>

          {/* ════════ Calendar Attachment Preview ════════ */}
          <div
            ref={calendarAttachRef}
            style={{
              marginTop: "3rem",
              padding: "1rem",
              background: "linear-gradient(135deg, rgba(244,143,177,0.06), rgba(244,143,177,0.02))",
              border: "1px dashed rgba(244,143,177,0.2)",
              borderRadius: "12px",
              textAlign: "center",
              opacity: 0,
            }}
          >
            <p
              className="font-sans"
              style={{
                color: "rgba(139, 111, 90, 0.6)",
                fontSize: "0.75rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: "0.5rem",
              }}
            >
              📎 แนบ: ความทรงจำของเรา
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "6px",
              }}
            >
              {["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย."].map((m) => (
                <div
                  key={m}
                  style={{
                    padding: "6px 4px",
                    background: "rgba(244,143,177,0.08)",
                    borderRadius: "6px",
                    fontSize: "0.65rem",
                    color: "rgba(139, 111, 90, 0.5)",
                  }}
                  className="font-sans"
                >
                  {m}
                </div>
              ))}
            </div>
            <p
              className="font-sans"
              style={{
                color: "rgba(139, 111, 90, 0.4)",
                fontSize: "0.7rem",
                marginTop: "0.75rem",
                fontStyle: "italic",
              }}
            >
              เลื่อนต่อเพื่อดูความทรงจำ ↓
            </p>
          </div>

          {/* Extra spacing at bottom */}
          <div style={{ height: "2rem" }} />
        </div>
      </div>
    </section>
  );
}
