"use client";

import { useState, useEffect } from "react";

interface SparkleProps {
  count?: number;
  color?: string;
  className?: string;
}

export default function SparkleEffect({
  count = 25,
  color = "rgba(255, 200, 210, 0.9)",
  className = "",
}: SparkleProps) {
  const [sparkles, setSparkles] = useState<
    { x: number; y: number; size: number; delay: number; duration: number; char: string }[]
  >([]);

  useEffect(() => {
    const chars = ["✦", "✧", "★", "⋆", "✵", "✶"];
    const s = Array.from({ length: count }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 6 + Math.random() * 16,
      delay: Math.random() * 4,
      duration: 1.2 + Math.random() * 2,
      char: chars[Math.floor(Math.random() * chars.length)],
    }));
    setSparkles(s);
  }, [count]);

  return (
    <div
      className={className}
      style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}
    >
      {sparkles.map((s, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            left: `${s.x}%`,
            top: `${s.y}%`,
            fontSize: `${s.size}px`,
            color,
            animation: `sparkle ${s.duration}s ${s.delay}s infinite ease-in-out`,
            textShadow: `0 0 ${s.size}px ${color}`,
          }}
        >
          {s.char}
        </span>
      ))}
    </div>
  );
}
