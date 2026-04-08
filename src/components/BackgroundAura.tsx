"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function BackgroundAura() {
  const containerRef = useRef<HTMLDivElement>(null);
  const aura1Ref = useRef<HTMLDivElement>(null);
  const aura2Ref = useRef<HTMLDivElement>(null);
  const aura3Ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const a1 = aura1Ref.current;
      const a2 = aura2Ref.current;
      const a3 = aura3Ref.current;
      if (!a1 || !a2 || !a3) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        },
      });

      // Initial state at Envelope Intro (Warm and welcoming)
      gsap.set(a1, { scale: 1, opacity: 0.6, x: "-10vw", y: "-20vh" }); // Top left
      gsap.set(a2, { scale: 0.8, opacity: 0.4, x: "40vw", y: "30vh" }); // Right middle
      gsap.set(a3, { scale: 1.2, opacity: 0, x: "10vw", y: "70vh" });   // Bottom hidden

      // Transition to Letter Scene
      tl.to(a1, { scale: 1.5, x: "-30vw", y: "40vh", opacity: 0.3, duration: 1 }, 0);
      tl.to(a2, { scale: 1.3, x: "-10vw", y: "-10vh", opacity: 0.7, duration: 1 }, 0);
      tl.to(a3, { opacity: 0.5, y: "30vh", duration: 1 }, 0);

      // Deep into Calendar (Dynamic movement across screen)
      tl.to(a1, { scale: 2, x: "20vw", y: "80vh", opacity: 0.5, duration: 1 }, 1);
      tl.to(a2, { scale: 1.5, x: "50vw", y: "10vh", opacity: 0.4, duration: 1 }, 1);
      tl.to(a3, { scale: 1.8, x: "-20vw", y: "-10vh", opacity: 0.6, duration: 1 }, 1);

      // Bottom / End of Calendar
      tl.to(a1, { scale: 1, x: "-20vw", y: "10vh", opacity: 0.3, duration: 1 }, 2);
      tl.to(a2, { scale: 2.2, x: "-30vw", y: "60vh", opacity: 0.6, duration: 1 }, 2);
      tl.to(a3, { scale: 1.2, x: "40vw", y: "80vh", opacity: 0.8, duration: 1 }, 2);
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0, // Behind EVERYTHING
        pointerEvents: "none",
        background: "#fff0f5", // Soft cream/pale pink base background
        overflow: "hidden",
      }}
    >
      <div
        ref={aura1Ref}
        style={{
          position: "absolute",
          width: "60vw",
          height: "60vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,107,158,0.5) 0%, rgba(255,107,158,0) 70%)",
          filter: "blur(60px)",
          transformOrigin: "center center",
        }}
      />
      <div
        ref={aura2Ref}
        style={{
          position: "absolute",
          width: "50vw",
          height: "50vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,204,204,0.7) 0%, rgba(255,204,204,0) 70%)",
          filter: "blur(60px)",
          transformOrigin: "center center",
        }}
      />
      <div
        ref={aura3Ref}
        style={{
          position: "absolute",
          width: "70vw",
          height: "70vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,51,119,0.3) 0%, rgba(255,51,119,0) 70%)",
          filter: "blur(80px)",
          transformOrigin: "center center",
        }}
      />
    </div>
  );
}
