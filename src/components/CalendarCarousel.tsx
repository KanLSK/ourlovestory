"use client";

import { useRef, useState, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { months, specialDate } from "@/data/siteData";
import type { MemoryItem } from "@/data/siteData";
import SparkleEffect from "./SparkleEffect";
import FloatingHearts from "./FloatingHearts";

gsap.registerPlugin(ScrollTrigger);

const YEAR = 2026;
const DAY_HEADERS = ["S", "M", "T", "W", "T", "F", "S"];

function getCalendarGrid(year: number, month: number) {
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const cells: { day: number; isCurrentMonth: boolean }[] = [];

  for (let i = 0; i < firstDayOfWeek; i++) {
    cells.push({
      day: daysInPrevMonth - firstDayOfWeek + 1 + i,
      isCurrentMonth: false,
    });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, isCurrentMonth: true });
  }
  const targetLen = cells.length <= 35 ? 35 : 42;
  for (let d = 1; cells.length < targetLen; d++) {
    cells.push({ day: d, isCurrentMonth: false });
  }
  return cells;
}

const getCardPos = (idx: number, total: number) => {
  // Push images into the vertical empty space (top and bottom) instead of horizontal,
  // ensuring they remain fully inside the viewport on mobile devices!
  if (total === 1) return { top: "-15%", right: "5%" };
  if (total === 2) {
    if (idx === 0) return { top: "-20%", left: "5%" };
    if (idx === 1) return { bottom: "-20%", right: "5%" };
  }
  if (total === 3) {
    if (idx === 0) return { top: "-20%", left: "0%" };
    if (idx === 1) return { top: "5%", right: "-5%" };
    if (idx === 2) return { bottom: "-20%", left: "10%" };
  }
  if (total >= 4) {
    if (idx === 0) return { top: "-28%", left: "0%" }; // Directly above calendar left
    if (idx === 1) return { top: "-28%", right: "0%" }; // Directly above calendar right
    if (idx === 2) return { bottom: "-28%", left: "0%" }; // Directly below calendar left
    if (idx === 3) return { bottom: "-28%", right: "0%" }; // Directly below calendar right
  }
  return { top: "50%", left: "50%" }; 
};

export default function CalendarCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const calendarWrapRef = useRef<HTMLDivElement>(null);
  
  const grids = useMemo(() => {
    return months.map((m, i) => getCalendarGrid(YEAR, i));
  }, []);

  const allImages = useMemo(() => {
    const raw = months.map((m) => m.memories.map((mem) => mem.image)).flat();
    const layerExtra = [
      "/layer/15B8242E-8652-49E0-8B61-F6DB47C7CC5E_1_105_c.jpeg",
      "/layer/28413A7B-6780-4256-BF20-43C002274817_1_105_c.jpeg",
      "/layer/5974D36C-407C-40B5-A696-3ECAB00F610B_1_105_c.jpeg",
      "/layer/DSC02574.JPG",
      "/layer/DSC02598.JPG",
      "/layer/DSC02600.JPG",
      "/layer/DSC02830.JPG",
      "/layer/DSC02838.JPG",
      "/layer/IMG_0394.jpeg",
      "/layer/IMG_0828.jpeg",
      "/layer/IMG_0835.jpeg",
      "/layer/IMG_0839.jpeg",
      "/layer/IMG_1867.JPG",
      "/layer/IMG_2867.JPG",
      "/layer/IMG_2882.JPG",
      "/layer/original 2569-01-08 111647.322.JPG",
      "/layer/original 2569-01-09 141822.746.JPG",
    ];
    return [...raw, ...layerExtra];
  }, []);

  useGSAP(
    () => {
      const container = containerRef.current;
      const wrap = calendarWrapRef.current;
      if (!container || !wrap) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=5000", // Tightened scroll distance so the final scene is reached much faster
          scrub: 1.5, // 1.5s smoothing
          pin: true,
        },
      });

      // 1. Initial 3D Pitch Back
      tl.to(
        wrap,
        {
          rotationX: 18,
          rotationY: 3,
          rotationZ: -1,
          scale: 0.85,
          duration: 0.5,
          ease: "power2.inOut",
        },
        0
      );

      const segmentDuration = 2.0;

      months.forEach((month, mIdx) => {
        const startTime = mIdx * segmentDuration + 0.5;
        const wrapper = `.calendar-wrapper-${mIdx}`;

        // Crossfade Calendars
        if (mIdx > 0) {
          // Calendar container slides up and tilts into place
          tl.fromTo(
            wrapper,
            { opacity: 0, y: 100, rotationX: 15, scale: 0.9 },
            { opacity: 1, y: 0, rotationX: 0, scale: 1, duration: 0.8, ease: "power2.out" },
            startTime
          );

          // Massive Background Text pops into existence playfully
          tl.fromTo(
            `.month-bg-text-${mIdx}`,
            { opacity: 0, scale: 0.5, y: 150 },
            { opacity: 1, scale: 1, y: 0, duration: 0.9, ease: "back.out(1.5)" },
            startTime + 0.1
          );

          // Grid cells stagger beautifully like pouring rain into the glass box
          tl.fromTo(
            `.calendar-cell-${mIdx}`,
            { opacity: 0, scale: 0, rotation: -15 },
            { opacity: 1, scale: 1, rotation: 0, duration: 0.4, stagger: 0.012, ease: "back.out(1.7)" },
            startTime + 0.2
          );

          tl.to(
            `.calendar-wrapper-${mIdx - 1}`,
            { opacity: 0, duration: 0.4 },
            startTime - 0.4
          );
        }

        // Fly IN memories
        const cards = gsap.utils.toArray(`.memory-card-${mIdx}`);
        cards.forEach((card: any, i) => {
          gsap.set(card, {
            opacity: 0,
            scale: 0.3,
            y: 150,
            x: i % 2 === 0 ? -100 : 100,
            rotation: gsap.utils.random(-45, 45),
          });

          tl.to(
            card,
            {
              opacity: 1,
              scale: 1,
              y: 0,
              x: 0,
              rotation: month.memories[i]?.tilt || gsap.utils.random(-15, 15),
              duration: 0.8,
              ease: "back.out(1.2)",
            },
            startTime + i * 0.15
          );
        });

        // Fly OUT memories (if not last month)
        if (mIdx < months.length - 1) {
          cards.forEach((card: any, i) => {
            tl.to(
              card,
              {
                opacity: 0,
                y: -150,
                x: i % 2 === 0 ? 50 : -50,
                scale: 1.1,
                rotation: gsap.utils.random(-30, 30),
                duration: 0.6,
                ease: "power2.in",
              },
              startTime + segmentDuration - 0.6
            );
          });
        }
      });

      // ── THE FINAL SCENE: GLASS DISSOLVE ──
      const lastIdx = months.length - 1;
      const finalOutTime = lastIdx * segmentDuration + 1.2; // Start dissolving quickly after April enters!
      
      // 1. Dissolve final calendar AND the static title header
      tl.to(
        [`.calendar-wrapper-${lastIdx}`, `.memory-card-${lastIdx}`, ".calendar-title-header"],
        { opacity: 0, scale: 1.2, filter: "blur(10px)", duration: 1.5, ease: "power2.inOut" },
        finalOutTime
      );

      // 2. Fade in hearts softly
      tl.fromTo(
        ".final-hearts-container",
        { opacity: 0 },
        { opacity: 1, duration: 2.0, ease: "power1.inOut" },
        finalOutTime + 0.5
      );

      // 2.5 Fade and Zoom the Memory Collage
      tl.fromTo(
        ".final-collage-container",
        { opacity: 0, scale: 1.1 },
        { opacity: 1, scale: 1, duration: 3.5, ease: "power2.out" },
        finalOutTime + 0.5
      );

      // 3. Fade in Sentence 1
      tl.fromTo(
        ".final-chinese-1",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" },
        finalOutTime + 1.0
      );

      // 4. Fade in Sentence 2
      tl.fromTo(
        ".final-chinese-2",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" },
        finalOutTime + 2.0
      );
      
      // Buffer space at the end of scroll
      tl.to({}, { duration: 1.5 });

      // Interactive Parallax Mouse Effect
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        // Shift mouse coords to range -1 to 1 centered on screen
        const xPos = (clientX / window.innerWidth - 0.5) * 2;
        const yPos = (clientY / window.innerHeight - 0.5) * 2;
        
        // Gently shift the polaroid wrappers
        gsap.to(".polaroid-wrapper", {
          x: xPos * 30, // 30px max shift
          y: yPos * 30,
          duration: 1.5,
          ease: "power2.out",
        });

        // Gently tilt the glass calendar in 3D
        gsap.to(wrap, {
          rotationY: xPos * 4, // subtle 4deg tilt
          rotationX: -yPos * 4,
          duration: 1.5,
          ease: "power2.out",
        });
      };

      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    },
    { scope: containerRef }
  );

  return (
    <>
      <section ref={containerRef} className="w-full h-screen bg-transparent">
        {/* Viewport window */}
        <div
          className="relative w-full h-full overflow-hidden flex items-center justify-center perspective-1000"
          style={{ padding: "0 1rem" }}
        >
          {/* Static Title Header */}
          <div
            className="calendar-title-header"
            style={{
              position: "absolute",
              top: "max(12vh, 4rem)",
              textAlign: "center",
              zIndex: 20,
              width: "100%",
            }}
          >
            <p
              className="font-sans"
              style={{
                color: "rgba(244,143,177,0.8)",
                fontSize: "0.7rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                marginBottom: "0.5rem",
              }}
            >
              Our Memories
            </p>
            <h2
              className="font-serif text-gradient-pink"
              style={{
                fontSize: "clamp(1.8rem, 5vw, 2.8rem)",
                fontWeight: 700,
                lineHeight: 1.2,
                filter: "drop-shadow(0 2px 10px rgba(255,255,255,0.7))",
              }}
            >
              Memory Calendar
            </h2>
          </div>

          {/* 3D Transform Wrapper */}
          <div
            ref={calendarWrapRef}
            className="preserve-3d relative flex items-center justify-center w-full"
            style={{
              marginTop: "12vh", // Pushed down to give room for parallaxing images
            }}
          >
            {/* 4 Stacked Calendar Cards */}
            {months.map((monthData, mIdx) => {
              const memoryMap: Record<number, MemoryItem> = {};
              monthData.memories.forEach((m) => {
                if (m.day) memoryMap[m.day] = m;
              });
              const isApril = monthData.nameEN === "April";
              const grid = grids[mIdx];

              return (
                <div
                  key={mIdx}
                  className={`calendar-wrapper-${mIdx}`}
                  style={{
                    position: mIdx === 0 ? "relative" : "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    maxWidth: "380px", // Snug width
                    height: "auto", // Instant fix for bottom waste space!
                    opacity: mIdx === 0 ? 1 : 0,
                    zIndex: 10,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* HUGE Background Editorial Typographic Text Layer */}
                  <div
                    className={`month-bg-text-${mIdx}`}
                    style={{
                      position: "absolute",
                      left: "50%",
                      top: "-20%", // Shifted dramatically up above the calendar!
                      transform: "translate(-50%, -50%)",
                      zIndex: -1, 
                      width: "150%",
                      textAlign: "center",
                      pointerEvents: "none",
                    }}
                  >
                    <span
                      className="font-serif"
                      style={{
                        fontSize: "clamp(6rem, 18vw, 12rem)",
                        color: "rgba(255, 107, 158, 0.08)", 
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "-0.05em",
                        lineHeight: 0.8,
                      }}
                    >
                      {monthData.nameEN.slice(0, 3)}
                    </span>
                    <br />
                    <span
                      className="font-serif"
                      style={{
                        fontSize: "clamp(4rem, 12vw, 8rem)",
                        color: "rgba(255, 51, 119, 0.06)",
                        fontWeight: 300,
                      }}
                    >
                      {YEAR}
                    </span>
                  </div>

                  {/* ════════ Frosted Glass Card Body ════════ */}
                  <div
                    style={{
                      background: "rgba(255, 255, 255, 0.45)",
                      backdropFilter: "blur(20px) saturate(1.2)",
                      WebkitBackdropFilter: "blur(20px) saturate(1.2)",
                      borderRadius: "1.5rem",
                      padding: "clamp(1.5rem, 5vw, 2.5rem)",
                      boxShadow: `
                        0 25px 50px -12px rgba(255, 51, 119, 0.15),
                        inset 0 1px 1px rgba(255, 255, 255, 0.8),
                        0 0 20px rgba(255, 255, 255, 0.5)
                      `,
                      border: "1px solid rgba(255, 255, 255, 0.6)",
                      position: "relative",
                      zIndex: 2,
                    }}
                  >
                    {/* Day-of-week Headers */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "2px", marginBottom: "0.8rem" }}>
                      {DAY_HEADERS.map((d, i) => (
                        <div
                          key={i}
                          className="font-sans"
                          style={{
                            textAlign: "center",
                            fontSize: "0.7rem",
                            fontWeight: 700,
                            color: "rgba(255, 51, 119, 0.6)",
                            letterSpacing: "0.08em",
                          }}
                        >
                          {d}
                        </div>
                      ))}
                    </div>

                    {/* Calendar Grid */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "clamp(4px, 1.2vw, 8px)" }}>
                      {grid.map((cell, i) => {
                        const isWeekend = i % 7 === 0 || i % 7 === 6;
                        const hasMemory = cell.isCurrentMonth && !!memoryMap[cell.day];
                        const isApril8 = cell.isCurrentMonth && isApril && cell.day === specialDate.day;
                        const isJan17 = cell.isCurrentMonth && mIdx === 0 && cell.day === 17;
                        const isSpecial = isApril8 || isJan17;

                        return (
                          <div
                            key={i}
                            className={`font-sans calendar-cell-${mIdx}`}
                            style={{
                              aspectRatio: "1",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              borderRadius: "12px",
                              fontSize: "clamp(0.85rem, 2vw, 1rem)",
                              fontWeight: cell.isCurrentMonth ? (isSpecial || hasMemory ? 700 : 500) : 400,
                              color: !cell.isCurrentMonth
                                ? "rgba(255, 51, 119, 0.3)"
                                : isSpecial
                                  ? "#fff"
                                  : hasMemory
                                    ? "#ff3377"
                                    : isWeekend
                                      ? "#ff80ab"
                                      : "#4a3a30",
                              background: isSpecial
                                ? "linear-gradient(135deg, #ff6b9e, #ff3377)"
                                : hasMemory
                                  ? "rgba(255, 255, 255, 0.8)"
                                  : "transparent",
                              border: isSpecial 
                                ? "none"
                                : hasMemory
                                  ? "1px solid rgba(255, 51, 119, 0.2)"
                                  : "1px solid transparent",
                              boxShadow: isSpecial
                                ? "0 4px 15px rgba(255, 51, 119, 0.4)"
                                : hasMemory
                                  ? "0 2px 8px rgba(0,0,0,0.05)"
                                  : "none",
                              position: "relative",
                              transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                            }}
                            onMouseOver={(e) => {
                              if (hasMemory || isSpecial) {
                                  e.currentTarget.style.transform = "scale(1.15) translateY(-2px)";
                                  if(!isSpecial) e.currentTarget.style.boxShadow = "0 8px 20px rgba(255, 51, 119, 0.15)";
                              }
                            }}
                            onMouseOut={(e) => {
                              if (hasMemory || isSpecial) {
                                  e.currentTarget.style.transform = "scale(1) translateY(0)";
                                  if(!isSpecial) e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)";
                              }
                            }}
                          >
                            {cell.day}
                            {isSpecial && (
                              <span style={{ position: "absolute", bottom: "3px", fontSize: "0.35rem", color: "#fff" }}>✦</span>
                            )}
                            {hasMemory && !isSpecial && (
                              <span style={{ position: "absolute", bottom: "4px", width: "4px", height: "4px", borderRadius: "50%", background: "#ff3377", boxShadow: "0 1px 2px rgba(255, 51, 119, 0.2)" }} />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Scattered Memory Polaroids */}
            {months.map((monthData, mIdx) => (
              <div key={`memories-${mIdx}`}>
                {monthData.memories.map((mem, i) => {
                  const pos = getCardPos(i, monthData.memories.length);
                  return (
                    <div
                      key={i}
                      className={`memory-card-${mIdx} polaroid-wrapper`}
                      style={{
                        position: "absolute",
                        zIndex: 20, /* Put images in front of calendar */
                        width: "clamp(150px, 35vw, 200px)", // Increased from 120/160
                        ...pos,
                        opacity: 0,
                      }}
                    >
                      <div className="polaroid-inner polaroid-float" style={{ width: "100%", height: "100%", animationDelay: `${(i + mIdx) * 0.7}s`, animationDuration: `${3 + (i % 2)}s` }}>
                        <div
                          style={{
                            background: "#fff",
                            padding: "8px", // Uniform padding!
                            borderRadius: "6px",
                            boxShadow: "0 10px 30px rgba(255, 51, 119, 0.15), 0 1px 3px rgba(0,0,0,0.1)",
                            transformStyle: "preserve-3d",
                            transition: "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.transform = "scale(1.12) translateZ(20px)";
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.transform = "scale(1) translateZ(0)";
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              aspectRatio: "1",
                              overflow: "hidden",
                              borderRadius: "4px", // Smoother inner border
                              background: "#f0e2e6",
                            }}
                          >
                            <img
                              src={mem.image}
                              alt={mem.title}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* ── THE FINAL SCENE CANVAS ── */}
          <div
            className="final-message-container absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
            style={{ zIndex: 40 }}
          >
             {/* Dynamic Faded Memory Collage */}
             <div className="final-collage-container absolute inset-0 opacity-0 overflow-hidden">
               {allImages.map((src, i) => {
                 // 30 images total -> distribute them roughly into a 5x6 grid
                 const col = i % 5;
                 const row = Math.floor(i / 5);
                 return (
                   <div
                     key={`collage-${i}`}
                     style={{
                       position: "absolute",
                       // Distribute evenly across 5 columns and 6 rows, adding slight pseudo-random scatter
                       left: `${col * 22 - 5 + ((i * 13) % 15)}%`, 
                       top: `${row * 18 - 5 + ((i * 17) % 15)}%`,
                       transform: `translate(-50%, -50%) rotate(${((i * 47) % 60) - 30}deg)`,
                       width: "clamp(120px, 18vw, 180px)", // Restored elegant smaller size
                       opacity: 0.15, // Extremely subtle so text dominates
                       mixBlendMode: "multiply", 
                       borderRadius: "8px",
                       overflow: "hidden",
                     }}
                   >
                     <img src={src} alt="memory overlay" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                   </div>
                 );
               })}
               {/* Vignette mask to softly blend the edges back out to solid pink */}
               <div className="absolute inset-0" style={{ background: "radial-gradient(circle at center, transparent 20%, rgba(255, 244, 248, 0.95) 90%)" }} />
             </div>

             <div className="final-hearts-container absolute inset-0">
               <FloatingHearts />
             </div>
             <div className="text-center z-10 px-6 w-full max-w-4xl flex flex-col gap-10">
               {/* First Block */}
               <div className="final-chinese-1 opacity-0">
                 <h1 
                   style={{ 
                     color: "#d81b60", 
                     fontSize: "clamp(1.8rem, 6vw, 3.2rem)", 
                     fontWeight: 500, 
                     fontFamily: '"Noto Serif SC", "Songti SC", "Songti TC", "MingLiU", serif', 
                     letterSpacing: "0.1em", 
                     textShadow: "0 4px 15px rgba(255, 255, 255, 0.8)", 
                     marginBottom: "0.8rem" 
                   }}
                 >
                   一起创造更多美好的回忆吧
                 </h1>
                 <p 
                   style={{ 
                     color: "#d81b60", 
                     opacity: 0.9,
                     fontSize: "clamp(0.75rem, 2vw, 0.95rem)", 
                     fontWeight: 400, 
                     textShadow: "0 2px 10px rgba(255, 255, 255, 0.9)",
                     letterSpacing: "0.02em"
                   }}
                 >
                   เราไปสร้างความทรงจำดี ๆ ด้วยกันอีกเยอะ ๆ
                 </p>
               </div>

               {/* Second Block */}
               <div className="final-chinese-2 opacity-0">
                 <h1 
                   style={{ 
                     color: "#d81b60", 
                     fontSize: "clamp(1.8rem, 6vw, 3.2rem)", 
                     fontWeight: 500, 
                     fontFamily: '"Noto Serif SC", "Songti SC", "Songti TC", "MingLiU", serif', 
                     letterSpacing: "0.1em", 
                     textShadow: "0 4px 15px rgba(255, 255, 255, 0.8)", 
                     marginBottom: "0.8rem" 
                   }}
                 >
                   今后也要一直在一起哦
                 </h1>
                 <p 
                   style={{ 
                     color: "#d81b60", 
                     opacity: 0.9,
                     fontSize: "clamp(0.75rem, 2vw, 0.95rem)", 
                     fontWeight: 400, 
                     textShadow: "0 2px 10px rgba(255, 255, 255, 0.9)",
                     letterSpacing: "0.02em"
                   }}
                 >
                   และต่อจากนี้ก็ขอให้อยู่ด้วยกันไปเรื่อย ๆ เลยนะ
                 </p>
               </div>
             </div>
          </div>
        </div>
      </section>

    </>
  );
}
