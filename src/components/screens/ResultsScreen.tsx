"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, RotateCcw, Sparkles, Star } from "lucide-react";
import { useWizard } from "@/context/WizardContext";
import { getProfile } from "@/data/profiles";
import Button from "@/components/ui/Button";

// Seeded random function for deterministic values (avoids hydration mismatch)
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

// Premium confetti particle
function ConfettiParticle({
  delay,
  startX,
  color,
  size,
  endXOffset,
  endYOffset,
  rotation,
  isRound,
}: {
  delay: number;
  startX: number;
  color: string;
  size: number;
  endXOffset: number;
  endYOffset: number;
  rotation: number;
  isRound: boolean;
}) {
  const endX = startX + endXOffset;
  const endY = 300 + endYOffset;

  return (
    <motion.div
      initial={{ opacity: 1, x: startX, y: -20, scale: 1, rotate: 0 }}
      animate={{
        opacity: [1, 1, 0],
        x: endX,
        y: endY,
        scale: [1, 1.2, 0.6],
        rotate: rotation,
      }}
      transition={{
        duration: 2.5,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="absolute pointer-events-none"
      style={{
        width: size,
        height: size,
        background: color,
        borderRadius: isRound ? "50%" : "2px",
        boxShadow: `0 0 ${size}px ${color}`,
      }}
    />
  );
}

// Glow ring that expands outward
function GlowRing({ delay, color }: { delay: number; color: string }) {
  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0.8 }}
      animate={{ scale: 3, opacity: 0 }}
      transition={{
        duration: 1.8,
        delay,
        ease: "easeOut",
      }}
      className="absolute inset-0 rounded-full"
      style={{
        border: `2px solid ${color}`,
        boxShadow: `0 0 20px ${color}`,
      }}
    />
  );
}

export default function ResultsScreen() {
  const { resetWizard, answers } = useWizard();
  const [isApplied, setIsApplied] = useState(false);
  const [showStartOver, setShowStartOver] = useState(false);
  const [showCelebration, setShowCelebration] = useState(true);

  const profile = getProfile(answers);

  // Generate celebration particles with varied colors
  const confettiColors = [
    "rgba(104, 211, 145, 0.9)",
    "rgba(99, 179, 237, 0.9)",
    "rgba(183, 148, 244, 0.9)",
    "rgba(246, 224, 94, 0.9)",
    "rgba(255, 255, 255, 0.9)",
  ];

  // Use useMemo with seeded random for deterministic values (avoids hydration mismatch)
  const particles = useMemo(() => Array.from({ length: 40 }, (_, i) => ({
    id: i,
    delay: i * 0.02,
    startX: (seededRandom(i * 3) - 0.5) * 100,
    color: confettiColors[i % confettiColors.length],
    size: 4 + seededRandom(i * 5) * 6,
    endXOffset: (seededRandom(i * 7) - 0.5) * 300,
    endYOffset: seededRandom(i * 11) * 200,
    rotation: seededRandom(i * 13) * 720 - 360,
    isRound: seededRandom(i * 17) > 0.5,
  })), []);

  useEffect(() => {
    const timer = setTimeout(() => setShowCelebration(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleApply = () => {
    setIsApplied(true);
    setTimeout(() => {
      setShowStartOver(true);
    }, 1500);
  };

  const handleStartOver = () => {
    setIsApplied(false);
    setShowStartOver(false);
    resetWizard();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full flex flex-col items-center justify-center px-8 py-6 relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at center top, #0a1018 0%, #020304 100%)",
      }}
    >
      {/* Celebration confetti */}
      <AnimatePresence>
        {showCelebration && (
          <div className="absolute inset-0 flex items-start justify-center pointer-events-none overflow-hidden">
            {particles.map((p) => (
              <ConfettiParticle
                key={p.id}
                delay={p.delay}
                startX={p.startX}
                color={p.color}
                size={p.size}
                endXOffset={p.endXOffset}
                endYOffset={p.endYOffset}
                rotation={p.rotation}
                isRound={p.isRound}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Background success glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 pointer-events-none"
      >
        <motion.div
          animate={{
            opacity: [0.15, 0.25, 0.15],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px]"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(104, 211, 145, 0.15) 0%, transparent 60%)",
            filter: "blur(60px)",
          }}
        />
      </motion.div>

      {/* Success checkmark with premium glow rings */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
        className="mb-6 relative"
      >
        {/* Expanding glow rings */}
        <GlowRing delay={0.3} color="rgba(104, 211, 145, 0.5)" />
        <GlowRing delay={0.5} color="rgba(104, 211, 145, 0.4)" />
        <GlowRing delay={0.7} color="rgba(104, 211, 145, 0.3)" />

        {/* Success icon container */}
        <motion.div
          animate={{
            boxShadow: [
              "0 0 40px rgba(104, 211, 145, 0.3), inset 0 0 20px rgba(104, 211, 145, 0.1)",
              "0 0 60px rgba(104, 211, 145, 0.5), inset 0 0 30px rgba(104, 211, 145, 0.15)",
              "0 0 40px rgba(104, 211, 145, 0.3), inset 0 0 20px rgba(104, 211, 145, 0.1)",
            ],
          }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="w-18 h-18 rounded-2xl flex items-center justify-center relative z-10"
          style={{
            width: 72,
            height: 72,
            background:
              "linear-gradient(145deg, rgba(104, 211, 145, 0.15) 0%, rgba(104, 211, 145, 0.05) 100%)",
            border: "1px solid rgba(104, 211, 145, 0.35)",
            backdropFilter: "blur(12px)",
          }}
        >
          <Check
            className="w-9 h-9"
            strokeWidth={2.5}
            style={{ color: "var(--accent-success)" }}
          />
        </motion.div>
      </motion.div>

      {/* Header text */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-sm tracking-widest uppercase font-medium mb-3"
        style={{
          fontFamily: "var(--font-body)",
          color: "var(--text-secondary)",
        }}
      >
        Your Profile is Ready
      </motion.p>

      {/* Profile Name with premium gradient */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-4xl font-semibold mb-2 text-center tracking-tight"
        style={{
          fontFamily: "var(--font-display)",
          background:
            "linear-gradient(135deg, #ffffff 0%, var(--accent-success-bright) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {profile.name}
      </motion.h1>

      {/* Profile Description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-sm mb-10 text-center max-w-md font-light"
        style={{
          fontFamily: "var(--font-body)",
          color: "var(--text-muted)",
        }}
      >
        {profile.description}
      </motion.p>

      {/* Settings Strip - Premium Chips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="flex flex-wrap justify-center gap-3 mb-10 max-w-2xl"
      >
        {profile.settings.map((setting, index) => (
          <motion.div
            key={setting.label}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              delay: 0.8 + index * 0.08,
              type: "spring",
              stiffness: 250,
              damping: 20,
            }}
            whileHover={{ scale: 1.05, y: -3 }}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl relative overflow-hidden group cursor-default"
            style={{
              background:
                "linear-gradient(145deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              boxShadow:
                "0 2px 12px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.04)",
            }}
          >
            {/* Hover glow */}
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(104, 211, 145, 0.08) 0%, transparent 70%)",
              }}
            />

            <span className="text-lg relative z-10">{setting.icon}</span>
            <span
              className="text-sm font-medium relative z-10"
              style={{
                fontFamily: "var(--font-body)",
                color: "var(--text-secondary)",
              }}
            >
              {setting.label}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="flex flex-col items-center gap-4"
      >
        <AnimatePresence mode="wait">
          {!isApplied ? (
            <motion.div
              key="apply"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
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
                    "linear-gradient(135deg, rgba(104, 211, 145, 0.4) 0%, rgba(104, 211, 145, 0.2) 100%)",
                }}
              />
              <Button onClick={handleApply} variant="success" size="large">
                <Sparkles className="w-5 h-5" />
                Apply This Profile
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="applied"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-3 px-8 py-4 rounded-xl font-medium text-base relative overflow-hidden"
              style={{
                background:
                  "linear-gradient(145deg, rgba(104, 211, 145, 0.15) 0%, rgba(104, 211, 145, 0.05) 100%)",
                border: "1px solid rgba(104, 211, 145, 0.3)",
                color: "var(--accent-success)",
                fontFamily: "var(--font-display)",
                boxShadow:
                  "0 0 30px rgba(104, 211, 145, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
              }}
            >
              {/* Success shimmer */}
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{ duration: 1.2, delay: 0.2 }}
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)",
                }}
              />

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, delay: 0.1 }}
              >
                <Check className="w-5 h-5" />
              </motion.div>
              <span className="relative z-10">Profile Applied!</span>

              {/* Success star */}
              <motion.div
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 0.4, type: "spring" }}
                className="absolute -right-1 -top-1"
              >
                <Star
                  className="w-4 h-4"
                  style={{
                    color: "var(--accent-warm)",
                    fill: "var(--accent-warm)",
                  }}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Start Over Button */}
        <AnimatePresence>
          {showStartOver && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Button onClick={handleStartOver} variant="secondary">
                <RotateCcw className="w-4 h-4" />
                Start Over
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
