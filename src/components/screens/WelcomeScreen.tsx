"use client";

import { motion } from "framer-motion";
import { Sparkles, ChevronRight, Play, Monitor } from "lucide-react";
import { useWizard } from "@/context/WizardContext";
import Button from "@/components/ui/Button";

// Seeded random function for deterministic values
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

// Premium floating orb component
function FloatingOrb({
  delay,
  x,
  y,
  size,
  color,
  duration,
  drift,
}: {
  delay: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  drift: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 0.6, 0.6, 0],
        scale: [0.5, 1, 1, 0.5],
        y: [y, y - 150],
        x: [x, x + drift],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: "blur(2px)",
      }}
    />
  );
}

// Ambient particle that drifts slowly - using deterministic values
function AmbientParticle({ index }: { index: number }) {
  const xPosition = (index % 5) * 180 - 360;
  const delayValue = index * 0.8;
  // Use seeded random for deterministic values
  const durationValue = 10 + seededRandom(index * 7) * 5;
  const sizeValue = 3 + seededRandom(index * 13) * 4;
  const driftValue = (seededRandom(index * 17) - 0.5) * 80;
  const colors = [
    "rgba(99, 179, 237, 0.5)",
    "rgba(183, 148, 244, 0.4)",
    "rgba(104, 211, 145, 0.3)",
    "rgba(246, 224, 94, 0.3)",
  ];
  const color = colors[index % colors.length];

  return (
    <FloatingOrb
      delay={delayValue}
      x={xPosition}
      y={200}
      size={sizeValue}
      color={color}
      duration={durationValue}
      drift={driftValue}
    />
  );
}

export default function WelcomeScreen() {
  const { goToNext } = useWizard();

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center text-center px-12 relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at center, #080c14 0%, #020304 100%)",
      }}
    >
      {/* Premium background gradient layers */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Central radial glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px]"
            style={{
              background:
                "radial-gradient(circle, rgba(99, 179, 237, 0.12) 0%, rgba(183, 148, 244, 0.06) 35%, transparent 65%)",
              filter: "blur(60px)",
            }}
          />
        </motion.div>

        {/* Secondary accent glow */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.35, 0.2],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/3 left-1/3 w-[400px] h-[400px]"
          style={{
            background:
              "radial-gradient(circle, rgba(183, 148, 244, 0.15) 0%, transparent 60%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      {/* Floating ambient particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        {Array.from({ length: 15 }, (_, i) => (
          <AmbientParticle key={i} index={i} />
        ))}
      </div>

      {/* Main content container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col items-center"
      >
        {/* Premium TV Icon with animated glow */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            delay: 0.2,
            type: "spring",
            stiffness: 120,
            damping: 14,
          }}
          className="mb-12 relative"
        >
          {/* Outer pulse ring */}
          <motion.div
            animate={{
              scale: [1, 1.6, 1],
              opacity: [0.3, 0, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeOut",
            }}
            className="absolute inset-0 w-24 h-24 rounded-3xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(99, 179, 237, 0.3) 0%, rgba(183, 148, 244, 0.2) 100%)",
              filter: "blur(20px)",
            }}
          />

          {/* Secondary pulse ring */}
          <motion.div
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.2, 0, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeOut",
              delay: 0.5,
            }}
            className="absolute inset-0 w-24 h-24 rounded-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(99, 179, 237, 0.4) 0%, transparent 70%)",
              filter: "blur(15px)",
            }}
          />

          {/* Icon container with premium glass effect */}
          <motion.div
            animate={{
              boxShadow: [
                "0 0 40px rgba(99, 179, 237, 0.2), inset 0 0 30px rgba(99, 179, 237, 0.05)",
                "0 0 60px rgba(99, 179, 237, 0.35), inset 0 0 40px rgba(99, 179, 237, 0.1)",
                "0 0 40px rgba(99, 179, 237, 0.2), inset 0 0 30px rgba(99, 179, 237, 0.05)",
              ],
            }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="w-24 h-24 rounded-3xl flex items-center justify-center relative overflow-hidden"
            style={{
              background:
                "linear-gradient(145deg, rgba(99, 179, 237, 0.12) 0%, rgba(99, 179, 237, 0.04) 100%)",
              border: "1px solid rgba(99, 179, 237, 0.25)",
              backdropFilter: "blur(12px)",
            }}
          >
            {/* Inner shine effect */}
            <motion.div
              animate={{ x: [-100, 200] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                repeatDelay: 2,
              }}
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
                width: "50%",
              }}
            />

            {/* TV Icon - Custom premium design */}
            <div className="relative">
              <Monitor
                className="w-11 h-11 text-[var(--accent-primary)]"
                strokeWidth={1.5}
              />
              {/* Animated "screen" indicator */}
              <motion.div
                animate={{
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-3 rounded-sm"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(99, 179, 237, 0.6) 0%, rgba(183, 148, 244, 0.4) 100%)",
                  marginTop: "-2px",
                }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Headline with staggered reveal and text glow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-2"
        >
          <h1
            className="text-5xl font-semibold leading-tight tracking-tight"
            style={{
              fontFamily: "var(--font-display)",
              background: "linear-gradient(135deg, #ffffff 0%, #c4d4e4 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Perfect Picture
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 relative"
        >
          {/* Text glow effect */}
          <motion.div
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute inset-0 blur-2xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(99, 179, 237, 0.3) 0%, rgba(183, 148, 244, 0.2) 100%)",
            }}
          />
          <h2
            className="text-5xl font-semibold relative tracking-tight"
            style={{
              fontFamily: "var(--font-display)",
              background:
                "linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            In Seconds
          </h2>
        </motion.div>

        {/* Subtext - refined and elegant */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.6 }}
          className="text-lg mb-14 max-w-md leading-relaxed font-light"
          style={{
            fontFamily: "var(--font-body)",
            color: "var(--text-secondary)",
          }}
        >
          Answer a few quick questions and we&apos;ll optimize your TV settings
          for the ultimate viewing experience.
        </motion.p>

        {/* Premium CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.6 }}
          className="relative"
        >
          {/* Button glow */}
          <motion.div
            animate={{
              opacity: [0.4, 0.7, 0.4],
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute inset-0 -m-2 rounded-2xl blur-xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(99, 179, 237, 0.4) 0%, rgba(99, 179, 237, 0.2) 100%)",
            }}
          />
          <Button onClick={goToNext} size="large">
            <Sparkles className="w-5 h-5" />
            Get Started
            <ChevronRight className="w-5 h-5" />
          </Button>
        </motion.div>

        {/* Trust indicator - subtle and premium */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-10 flex items-center gap-2"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "var(--accent-success)" }}
          />
          <p
            className="text-xs tracking-widest uppercase font-medium"
            style={{ color: "var(--text-muted)" }}
          >
            Takes less than 60 seconds
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
