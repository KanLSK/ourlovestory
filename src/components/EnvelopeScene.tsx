"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { recipientName, senderName, letterBody, letterEndingThai } from "@/data/siteData";

gsap.registerPlugin(ScrollTrigger);

export default function EnvelopeScene() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const flapWrapperRef = useRef<HTMLDivElement>(null);
  const flapRef = useRef<HTMLDivElement>(null);
  const letterPeekRef = useRef<HTMLDivElement>(null);
  const envelopeGroupRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const sealRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const previewTextRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const flapWrapper = flapWrapperRef.current;
      const flap = flapRef.current;
      const letterPeek = letterPeekRef.current;
      const group = envelopeGroupRef.current;
      const hint = scrollHintRef.current;
      const seal = sealRef.current;
      const glow = glowRef.current;
      const content = contentRef.current;
      const previewText = previewTextRef.current;
      if (!section || !flapWrapper || !flap || !letterPeek || !group || !hint || !seal || !glow || !content || !previewText)
        return;

      gsap.set(flapWrapper, { zIndex: 4 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          start: "top top",
          end: "+=6000", // Combined timeline duration, extended massively
          scrub: 1.5,
          invalidateOnRefresh: true, // Recalculates dynamic y() values on resize
        },
      });

      tl.to(hint, { opacity: 0, duration: 0.02 }, 0);
      tl.to(seal, { scale: 1.3, opacity: 0, duration: 0.05, ease: "power2.out" }, 0.01);
      tl.to(glow, { opacity: 0.8, scale: 1.5, duration: 0.1, ease: "power2.out" }, 0.02);

      // Phase 1: Envelope flap opens
      tl.to(flap, { rotateX: 180, duration: 0.1, ease: "power2.inOut" }, 0.06);
      tl.set(flapWrapper, { zIndex: 1 }, 0.12);

      // Phase 2: Letter physically rises up *as* envelope drops
      const envParts = section.querySelectorAll(".env-back, .env-lining, .env-front, .env-flap-wrap");
      tl.to(envParts, { y: "110vh", opacity: 0, duration: 0.12, ease: "power2.in" }, 0.16);

      // Letter dynamically morphs dimensions, forming the reading paper
      tl.to(
        letterPeek,
        {
          width: "clamp(320px, 55vw, 580px)",
          height: "clamp(420px, 70vh, 700px)",
          y: "22vh", // Pushes down to center exactly
          boxShadow: "0 25px 70px rgba(0,0,0,0.25), 0 0 40px rgba(244,143,177,0.06), inset 0 0 0 1px rgba(0,0,0,0.04)",
          background: "linear-gradient(180deg, #ffffff 0%, #fdfcfa 50%, #faf8f5 100%)",
          borderRadius: "6px",
          duration: 0.15,
          ease: "power2.inOut"
        },
        0.16
      );

      // Crossfade preview text to inner content
      tl.to(previewText, { opacity: 0, duration: 0.05 }, 0.22);
      tl.to(content, { opacity: 1, duration: 0.1, ease: "power2.inOut" }, 0.28);

      // Phase 3: Scrub the inner text naturally
      tl.to(
        content,
        {
          y: () => {
             const paperHeight = letterPeek.offsetHeight || window.innerHeight * 0.7;
             const contentHeight = content.scrollHeight;
             // Protect against negative scroll if text is super short
             return -Math.max(0, contentHeight - paperHeight + 80);
          },
          duration: 0.5,
          ease: "none",
        },
        0.38
      );

      // Phase 4: Final exit scale out
      tl.to(letterPeek, { scale: 0.88, opacity: 0, duration: 0.08, ease: "power2.in" }, 0.9);
      tl.to(glow, { opacity: 0, duration: 0.1 }, 0.9);
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
      {/* Warm ambient pink glow behind envelope */}
      <div
        ref={glowRef}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(ellipse, #ff80ab 0%, rgba(255,128,171,0.15) 30%, transparent 60%)",
          pointerEvents: "none",
          opacity: 0, // Starts invisible
          filter: "blur(40px)",
        }}
      />

      <div ref={envelopeGroupRef} style={{ position: "relative" }}>
        {/* ════════ Envelope container ════════ */}
        <div
          style={{
            position: "relative",
            width: "clamp(320px, 52vw, 480px)",
            height: "clamp(220px, 36vw, 340px)",
            perspective: "1500px",
            zIndex: 2,
          }}
        >
          {/* Envelope back panel (Outside) */}
          <div
            className="env-back"
            style={{
              position: "absolute",
              inset: 0,
              background: "#ffffff",
              borderRadius: "8px",
              zIndex: 1, // Base layer
            }}
          />

          {/* Inner lining — bright pink visible when open */}
          <div
            className="env-lining"
            style={{
              position: "absolute",
              inset: "4px",
              background:
                "linear-gradient(180deg, #ff3377 0%, #ff6b9e 100%)",
              borderRadius: "4px",
              zIndex: 1,
            }}
          >
            {/* Subtle diamond pattern on lining */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "4px",
                opacity: 0.15,
                backgroundImage: `
                  repeating-linear-gradient(45deg, transparent, transparent 12px, rgba(255,255,255,0.4) 12px, rgba(255,255,255,0.4) 13px),
                  repeating-linear-gradient(-45deg, transparent, transparent 12px, rgba(255,255,255,0.4) 12px, rgba(255,255,255,0.4) 13px)
                `,
              }}
            />
          </div>

          {/* ════════ Envelope flap WRAPPER ════════ */}
          <div
            ref={flapWrapperRef}
            className="env-flap-wrap"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "55%",
            }}
          >
            {/* ════════ Envelope flap (3D opening) ════════ */}
            <div
              ref={flapRef}
              style={{
                width: "100%",
                height: "100%",
                transformOrigin: "top center",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Flap front face (Outside) */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, #ffffff 0%, #fff0f5 100%)",
                  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                  backfaceVisibility: "hidden",
                  borderRadius: "8px 8px 0 0",
                  boxShadow: "inset 0 2px 5px rgba(255,255,255,0.5)",
                }}
              >
                {/* Flap inner border */}
                <div
                  style={{
                    position: "absolute",
                    inset: "8px",
                    borderTop: "1px solid rgba(255, 107, 158, 0.15)",
                    borderLeft: "1px solid rgba(255, 107, 158, 0.15)",
                    borderRight: "1px solid rgba(255, 107, 158, 0.15)",
                    clipPath: "polygon(0 0, 100% 0, 50% 92%)",
                  }}
                />
              </div>

              {/* Flap back face (Inside) */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, #ff3377 0%, #ff6b9e 100%)",
                  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              />

              {/* ════════ Wax seal ════════ */}
              <div
                ref={sealRef}
                style={{
                  position: "absolute",
                  top: "100%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "clamp(46px, 7vw, 62px)",
                  height: "clamp(46px, 7vw, 62px)",
                  borderRadius: "50%",
                  background: `radial-gradient(circle at 35% 30%, #ff80ab 0%, #f50057 55%, #c51162 100%)`,
                  boxShadow: `
                    0 4px 15px rgba(245, 0, 87, 0.4),
                    0 1px 3px rgba(0,0,0,0.1),
                    inset 0 2px 4px rgba(255,255,255,0.4),
                    inset 0 -2px 4px rgba(0,0,0,0.1)
                  `,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backfaceVisibility: "hidden",
                  zIndex: 5,
                }}
              >
                <div style={{ position: "absolute", inset: "3px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.3)" }} />
                <div style={{ position: "absolute", inset: "6px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.15)" }} />
                <span style={{ fontSize: "clamp(0.9rem, 2vw, 1.2rem)", color: "rgba(255,255,255,0.85)", textShadow: "0 1px 2px rgba(0,0,0,0.2)", fontFamily: "serif", marginTop: "2px" }}>♥</span>
              </div>
            </div>
          </div>

          {/* Letter paper peeking inside */}
          <div
            ref={letterPeekRef}
            style={{
              position: "absolute",
              left: "50%",
              bottom: "10%",
              transform: "translateX(-50%)",
              width: "86%",
              height: "82%",
              background: "#ffffff",
              borderRadius: "4px",
              boxShadow: "0 -2px 15px rgba(0,0,0,0.08)",
              zIndex: 2,
              overflow: "hidden"
            }}
          >
            {/* Semantic inner wrapper for the letter contents */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
              }}
            >
              {/* Faint preview text on the letter */}
              <div
                ref={previewTextRef}
                className="font-cursive preview-text"
                style={{
                  padding: "12% 10%",
                  color: "#ff3377",
                  opacity: 0.6,
                  fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
                }}
              >
                {recipientName.replace("To ", "Dear ")}...
              </div>

              {/* ════════ Real Scrolling Content ════════ */}
              <div
                ref={contentRef}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  padding: "clamp(2rem, 6%, 3rem) clamp(2.5rem, 10%, 4rem)",
                  paddingLeft: "clamp(3rem, 12%, 5rem)",
                  opacity: 0, // Starts invisible, fades in when morphed
                }}
              >
                {/* Sender name */}
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
                <div style={{ width: "40px", height: "1px", background: "linear-gradient(90deg, rgba(244,143,177,0.3), transparent)", marginBottom: "2rem" }} />

                {/* Letter Body */}
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

                {/* Thai Ending */}
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
                  <p className="font-sans" style={{ color: "#6b4a3a", fontSize: "clamp(0.85rem, 1.8vw, 1rem)", lineHeight: 2, fontWeight: 500, fontStyle: "italic" }}>
                    &ldquo;{letterEndingThai}&rdquo;
                  </p>
                </div>

                {/* Signature */}
                <div style={{ textAlign: "right", marginTop: "1.5rem" }}>
                  <span className="font-cursive" style={{ color: "#8b6f5a", fontSize: "clamp(1.3rem, 3vw, 1.8rem)", opacity: 0.8 }}>
                    — {senderName.replace("from ", "")} 💕
                  </span>
                </div>

                {/* Extra spacing */}
                <div style={{ height: "4rem" }} />
              </div>
            </div>
          </div>

          {/* ════════ Envelope body (front face) ════════ */}
          <div
            className="env-front"
            style={{
              position: "absolute",
              inset: 0,
              background: `
                linear-gradient(145deg, #ffffff 0%, #fff5f8 50%, #ffe0eb 100%)
              `,
              borderRadius: "8px",
              boxShadow: `
                0 25px 50px -12px rgba(255, 51, 119, 0.25),
                inset 0 1px 0 rgba(255,255,255,0.8)
              `,
              zIndex: 3, // In front of the letter
            }}
          >
            {/* Embossed soft pink border */}
            <div
              style={{
                position: "absolute",
                inset: "12px",
                border: "1px solid rgba(255, 107, 158, 0.2)",
                borderRadius: "4px",
                pointerEvents: "none",
              }}
            />

            {/* Handwritten name */}
            <span
              className="font-cursive"
              style={{
                position: "absolute",
                bottom: "12%",
                left: "50%",
                transform: "translateX(-50%)",
                fontSize: "clamp(1.8rem, 4.5vw, 2.8rem)",
                color: "#ff3377",
                textShadow: "0 1px 2px rgba(255, 51, 119, 0.1)",
                whiteSpace: "nowrap",
              }}
            >
              {recipientName}
            </span>
          </div>


        </div>
      </div>

      {/* Scroll hint */}
      <div
        ref={scrollHintRef}
        style={{
          position: "absolute",
          bottom: "3rem",
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
          color: "#ff80ab",
        }}
      >
        <p
          className="font-sans"
          style={{
            fontSize: "0.6rem",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            marginBottom: "0.75rem",
            fontWeight: 700,
          }}
        >
          เลื่อนเพื่อเปิด
        </p>
        <div
          style={{
            width: "2px",
            height: "40px",
            background:
              "linear-gradient(180deg, #ff80ab, transparent)",
            margin: "0 auto",
            animation: "scroll-hint 1.5s ease-in-out infinite",
            borderRadius: "2px"
          }}
        />
      </div>
    </section>
  );
}
