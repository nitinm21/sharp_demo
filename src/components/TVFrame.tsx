"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface TVFrameProps {
  children: ReactNode;
}

export default function TVFrame({ children }: TVFrameProps) {
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-8 relative overflow-hidden"
      style={{
        background: "var(--bg-wall-gradient)",
      }}
    >
      {/* Animated ambient background glow */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Central ambient glow from TV */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[1000px] h-[600px]"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(99, 179, 237, 0.12) 0%, rgba(99, 179, 237, 0.04) 40%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />

        {/* Purple accent - left side */}
        <motion.div
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.15, 1],
            x: [-20, 0, -20],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/3 left-[15%] w-[400px] h-[400px]"
          style={{
            background:
              "radial-gradient(circle, rgba(183, 148, 244, 0.18) 0%, transparent 60%)",
            filter: "blur(100px)",
          }}
        />

        {/* Warm accent - right side */}
        <motion.div
          animate={{
            opacity: [0.25, 0.45, 0.25],
            scale: [1, 1.2, 1],
            x: [20, 0, 20],
          }}
          transition={{
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
          }}
        />
      </div>

      {/* Noise texture overlay for premium feel */}
      <div className="absolute inset-0 noise-overlay pointer-events-none" />

      {/* TV Container with enhanced ambient edge glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 1,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="relative"
      >
        {/* Enhanced Ambilight effect - the key visual element */}
        <div className="absolute -inset-12 pointer-events-none">
          {/* Top edge glow - brightest */}
          <motion.div
            animate={{
              opacity: [0.6, 0.9, 0.6],
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -top-8 left-1/2 -translate-x-1/2 w-4/5 h-32"
            style={{
              background:
                "radial-gradient(ellipse 80% 100% at center bottom, rgba(99, 179, 237, 0.5) 0%, rgba(99, 179, 237, 0.2) 40%, transparent 70%)",
              filter: "blur(35px)",
            }}
          />

          {/* Bottom edge glow */}
          <motion.div
            animate={{
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-4/5 h-28"
            style={{
              background:
                "radial-gradient(ellipse 80% 100% at center top, rgba(99, 179, 237, 0.4) 0%, rgba(183, 148, 244, 0.15) 50%, transparent 70%)",
              filter: "blur(30px)",
            }}
          />

          {/* Left edge glow - purple tint */}
          <motion.div
            animate={{
              opacity: [0.4, 0.7, 0.4],
              x: [-5, 0, -5],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-1/2 -left-8 -translate-y-1/2 w-28 h-4/5"
            style={{
              background:
                "radial-gradient(ellipse 100% 80% at right center, rgba(183, 148, 244, 0.45) 0%, rgba(99, 179, 237, 0.2) 50%, transparent 70%)",
              filter: "blur(30px)",
            }}
          />

          {/* Right edge glow - warm tint */}
          <motion.div
            animate={{
              opacity: [0.35, 0.65, 0.35],
              x: [5, 0, 5],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute top-1/2 -right-8 -translate-y-1/2 w-28 h-4/5"
            style={{
              background:
                "radial-gradient(ellipse 100% 80% at left center, rgba(246, 224, 94, 0.35) 0%, rgba(99, 179, 237, 0.15) 50%, transparent 70%)",
              filter: "blur(30px)",
            }}
          />

          {/* Corner accents for premium feel */}
          <motion.div
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute -top-4 -left-4 w-32 h-32"
            style={{
              background:
                "radial-gradient(circle at bottom right, rgba(183, 148, 244, 0.25) 0%, transparent 60%)",
              filter: "blur(25px)",
            }}
          />

          <motion.div
            animate={{ opacity: [0.25, 0.45, 0.25] }}
            transition={{ duration: 6, repeat: Infinity, delay: 1 }}
            className="absolute -top-4 -right-4 w-32 h-32"
            style={{
              background:
                "radial-gradient(circle at bottom left, rgba(99, 179, 237, 0.3) 0%, transparent 60%)",
              filter: "blur(25px)",
            }}
          />
        </div>

        {/* TV Frame with premium bezel */}
        <div
          className="relative rounded-xl overflow-hidden"
          style={{
            padding: "14px",
            background:
              "linear-gradient(155deg, #1c1c1c 0%, #0c0c0c 40%, #050505 100%)",
            boxShadow: `
              0 60px 120px -20px rgba(0, 0, 0, 0.85),
              0 40px 80px -40px rgba(0, 0, 0, 0.7),
              0 0 0 1px rgba(255, 255, 255, 0.04),
              inset 0 1px 0 rgba(255, 255, 255, 0.06),
              inset 0 -1px 0 rgba(0, 0, 0, 0.6)
            `,
          }}
        >
          {/* Inner bezel highlight - top edge shine */}
          <div
            className="absolute top-0 left-0 right-0 h-[14px] rounded-t-xl pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 100%)",
            }}
          />

          {/* Side bezel highlights */}
          <div
            className="absolute top-[14px] bottom-[14px] left-0 w-[14px] pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, rgba(255,255,255,0.02) 0%, transparent 100%)",
            }}
          />

          {/* TV Screen - 16:9 aspect ratio */}
          <div
            className="relative overflow-hidden rounded-lg"
            style={{
              width: "900px",
              height: "506px",
              background:
                "linear-gradient(180deg, #030508 0%, #010203 100%)",
              boxShadow:
                "inset 0 0 80px rgba(0, 0, 0, 0.9), inset 0 0 2px rgba(255, 255, 255, 0.02)",
            }}
          >
            {/* Screen content */}
            <div className="absolute inset-0 flex items-center justify-center">
              {children}
            </div>

            {/* Subtle screen reflection effect */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(145deg, rgba(255,255,255,0.012) 0%, transparent 35%, transparent 100%)",
              }}
            />

            {/* Screen edge vignette */}
            <div
              className="absolute inset-0 pointer-events-none rounded-lg"
              style={{
                boxShadow: "inset 0 0 120px rgba(0, 0, 0, 0.35)",
              }}
            />
          </div>
        </div>

        {/* TV Stand shadow on wall */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1.5 }}
          className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-3/5 h-12"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0.5) 0%, transparent 70%)",
          }}
        />
      </motion.div>
    </div>
  );
}
