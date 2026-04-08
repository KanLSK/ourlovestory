"use client";

import { useEffect, useState } from "react";

interface Particle {
  x: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
}

export default function FloatingHearts() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generated: Particle[] = Array.from({ length: 25 }).map(() => ({
      x: Math.random() * 100,
      size: 2 + Math.random() * 5,
      delay: Math.random() * 25,
      duration: 18 + Math.random() * 25,
      opacity: 0.06 + Math.random() * 0.14,
    }));
    setParticles(generated);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 1,
        overflow: "hidden",
      }}
    >
      {particles.map((p, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            bottom: "-10px",
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(244,143,177,${p.opacity * 1.5}) 0%, rgba(244,143,177,0) 70%)`,
            boxShadow: `0 0 ${p.size * 2}px rgba(244,143,177,${p.opacity * 0.5})`,
            animation: `dust-rise ${p.duration}s ${p.delay}s linear infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes dust-rise {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          8% { opacity: 1; }
          85% { opacity: 0.5; }
          100% { transform: translateY(-110vh) translateX(30px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
