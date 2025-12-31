"use client";

import { ReactNode, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TVFrameProps {
  children: ReactNode;
}

export default function TVFrame({ children }: TVFrameProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return (
    <div
      className="min-h-screen h-screen w-full relative overflow-hidden"
      style={{
        background: "var(--bg-wall-gradient)",
      }}
    >
      {/* Animated ambient background glow */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Central ambient glow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: prefersReducedMotion ? 0 : 2 }}
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[1000px] h-[600px]"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(99, 179, 237, 0.12) 0%, rgba(99, 179, 237, 0.04) 40%, transparent 70%)",
            filter: "blur(80px)",
            willChange: "opacity",
          }}
        />

        {/* Purple accent - left side */}
        <motion.div
          animate={prefersReducedMotion ? { opacity: 0.4 } : {
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.15, 1],
            x: [-20, 0, -20],
          }}
          transition={prefersReducedMotion ? {} : {
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/3 left-[15%] w-[400px] h-[400px]"
          style={{
            background:
              "radial-gradient(circle, rgba(183, 148, 244, 0.18) 0%, transparent 60%)",
            filter: "blur(100px)",
            willChange: prefersReducedMotion ? "auto" : "transform, opacity",
          }}
        />

        {/* Warm accent - right side */}
        <motion.div
          animate={prefersReducedMotion ? { opacity: 0.35 } : {
            opacity: [0.25, 0.45, 0.25],
            scale: [1, 1.2, 1],
            x: [20, 0, 20],
          }}
          transition={prefersReducedMotion ? {} : {
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute top-1/3 right-[15%] w-[350px] h-[350px]"
          style={{
            background:
              "radial-gradient(circle, rgba(246, 224, 94, 0.12) 0%, transparent 60%)",
            filter: "blur(100px)",
            willChange: prefersReducedMotion ? "auto" : "transform, opacity",
          }}
        />
      </div>

      {/* Noise texture overlay for premium feel */}
      <div className="absolute inset-0 noise-overlay pointer-events-none" />

      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </div>
  );
}
