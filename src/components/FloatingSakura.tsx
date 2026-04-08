"use client";

import { useEffect, useState } from "react";

interface Petal {
  x: number;
  yOffset: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
  rotation: number;
}

export default function FloatingSakura() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    // Generate 35 beautiful floating sakura petals
    const generated: Petal[] = Array.from({ length: 35 }).map(() => ({
      x: Math.random() * 100, // starting position % across the screen
      yOffset: Math.random() * -20 - 10, // start slightly above screen
      size: 8 + Math.random() * 12, // size in px
      delay: Math.random() * 15,
      duration: 12 + Math.random() * 15, // how long to fall entirely down
      opacity: 0.15 + Math.random() * 0.15, // Made much more transparent
      rotation: Math.random() * 360,
    }));
    setPetals(generated);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 1, // On top of the Aura, behind the UI
        overflow: "hidden",
      }}
    >
      {petals.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${p.x}vw`,
            top: `${p.yOffset}vh`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animation: `sakura-fall ${p.duration}s ${p.delay}s linear infinite`,
          }}
        >
          {/* Inner petal swaying randomly */}
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "linear-gradient(135deg, #ffb7c5 0%, #ff6b9e 100%)",
              // Petal shape using curved borders
              borderRadius: "50% 0 50% 50%",
              transform: `rotate(${p.rotation}deg)`,
              boxShadow: "0 2px 4px rgba(255, 107, 158, 0.2)",
              animation: `sakura-sway ${p.duration / 4}s ease-in-out infinite alternate`,
            }}
          />
        </div>
      ))}

      {/* Global styles for the animations */}
      <style>{`
        @keyframes sakura-fall {
          0% {
            transform: translateY(-10vh) rotate(0deg);
            opacity: 0;
          }
          5% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(115vh) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes sakura-sway {
          0% {
            transform: translateX(-20px) rotate(-15deg);
          }
          100% {
            transform: translateX(20px) rotate(15deg);
          }
        }
      `}</style>
    </div>
  );
}
