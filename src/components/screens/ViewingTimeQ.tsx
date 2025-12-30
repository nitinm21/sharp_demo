"use client";

import { motion } from "framer-motion";
import { Check, ChevronRight } from "lucide-react";
import { useWizard, ViewingTime } from "@/context/WizardContext";

// TV-style progress bar
function ProgressBar({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex gap-3">
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className="h-1.5 rounded-full transition-all duration-300"
          style={{
            width: i + 1 === current ? "44px" : "22px",
            background:
              i + 1 <= current
                ? "var(--accent-primary)"
                : "rgba(255, 255, 255, 0.1)",
            boxShadow:
              i + 1 === current
                ? "0 0 8px var(--accent-primary-glow)"
                : "none",
          }}
        />
      ))}
    </div>
  );
}

// Abstract time-of-day visual
function TimeVisual({ type, isSelected }: { type: ViewingTime; isSelected: boolean }) {
  if (type === "daytime") {
    return (
      <div className="relative w-full h-full overflow-hidden rounded-xl">
        {/* Warm gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(145deg, #fef9c3 0%, #fde047 30%, #facc15 60%, #eab308 100%)",
          }}
        />
        {/* Sun representation */}
        <motion.div
          animate={isSelected ? { scale: [1, 1.1, 1], opacity: [0.9, 1, 0.9] } : {}}
          transition={{ duration: 3, repeat: Infinity }}
        className="absolute top-6 right-6 w-14 h-14 rounded-full"
          style={{
            background: "radial-gradient(circle, #ffffff 0%, #fef08a 60%, transparent 100%)",
            boxShadow: "0 0 40px rgba(254, 240, 138, 0.8)",
          }}
        />
        {/* Light rays */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-6 right-6 w-0.5 h-24 origin-bottom"
              style={{
                background: "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)",
                transform: `rotate(${i * 45}deg)`,
              }}
              animate={isSelected ? { opacity: [0.3, 0.6, 0.3] } : {}}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (type === "nighttime") {
    return (
      <div className="relative w-full h-full overflow-hidden rounded-xl">
        {/* Deep blue gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(145deg, #0f172a 0%, #1e1b4b 30%, #312e81 60%, #3730a3 100%)",
          }}
        />
        {/* Moon */}
        <motion.div
          animate={isSelected ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-6 right-8 w-12 h-12 rounded-full"
          style={{
            background: "linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)",
            boxShadow: "0 0 30px rgba(203, 213, 225, 0.4)",
          }}
        />
        {/* Stars */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full"
            style={{
              background: "#ffffff",
              left: `${10 + (i % 4) * 25}%`,
              top: `${15 + Math.floor(i / 4) * 25}%`,
              boxShadow: "0 0 4px rgba(255, 255, 255, 0.8)",
            }}
            animate={isSelected ? { opacity: [0.4, 1, 0.4] } : { opacity: 0.6 }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
    );
  }

  // Both
  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl">
      {/* Split gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #fef08a 0%, #facc15 30%, #6366f1 70%, #312e81 100%)",
        }}
      />
      {/* Center blend */}
      <motion.div
        animate={isSelected ? { opacity: [0.5, 0.7, 0.5] } : {}}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, rgba(255,255,255,0.2) 0%, transparent 60%)",
        }}
      />
      {/* Sun side */}
      <motion.div
        className="absolute top-4 left-4 w-10 h-10 rounded-full"
        style={{
          background: "radial-gradient(circle, #ffffff 0%, #fef08a 100%)",
          boxShadow: "0 0 20px rgba(254, 240, 138, 0.6)",
        }}
        animate={isSelected ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 3, repeat: Infinity }}
      />
      {/* Moon side */}
      <motion.div
        className="absolute bottom-4 right-4 w-8 h-8 rounded-full"
        style={{
          background: "linear-gradient(135deg, #e2e8f0 0%, #94a3b8 100%)",
          boxShadow: "0 0 15px rgba(148, 163, 184, 0.5)",
        }}
        animate={isSelected ? { scale: [1, 1.08, 1] } : {}}
        transition={{ duration: 3.5, repeat: Infinity }}
      />
    </div>
  );
}

const viewingOptions: { value: ViewingTime; label: string }[] = [
  { value: "daytime", label: "Daytime" },
  { value: "nighttime", label: "Nighttime" },
  { value: "both", label: "Both" },
];

export default function ViewingTimeQ() {
  const {
    goToNext,
    answers,
    setAnswer,
    canProceed,
    stepNumber,
    totalQuestions,
  } = useWizard();

  const handleSelect = (value: ViewingTime) => {
    setAnswer("viewingTime", value);
  };

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center px-10 py-10 md:px-14 md:py-12 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0a0c12 0%, var(--bg-screen) 100%)",
      }}
    >
      {/* Question header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center relative z-10"
      >
        <h2
          className="text-4xl md:text-5xl font-medium text-white tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          When do you watch?
        </h2>
      </motion.div>

      {/* Abstract visual options */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap justify-center gap-6 md:gap-8 mb-12 relative z-10"
      >
        {viewingOptions.map((option, index) => {
          const isSelected = answers.viewingTime === option.value;

          return (
            <motion.button
              key={option.value}
              type="button"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.15 + index * 0.08,
                duration: 0.4,
                ease: "easeOut",
              }}
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect(option.value)}
              className="relative group cursor-pointer w-[220px] h-[150px] sm:w-[240px] sm:h-[165px] lg:w-[280px] lg:h-[190px]"
            >
              {/* Visual background */}
              <TimeVisual type={option.value} isSelected={isSelected} />

              {/* Selection ring */}
              <div
                className="absolute inset-0 rounded-xl transition-all duration-300 pointer-events-none"
                style={{
                  border: isSelected
                    ? "2px solid var(--accent-primary)"
                    : "1px solid rgba(255, 255, 255, 0.15)",
                  boxShadow: isSelected
                    ? "0 0 24px rgba(94, 179, 228, 0.35)"
                    : "none",
                }}
              />

              {/* Label */}
              <div
                className="absolute bottom-0 left-0 right-0 p-4 rounded-b-xl"
                style={{
                  background: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.7) 100%)",
                }}
              >
                <span
                  className="text-white font-medium text-base"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {option.label}
                </span>
              </div>

              {/* Selection indicator */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center"
                  style={{
                    background: "var(--accent-primary)",
                    boxShadow: "0 2px 8px rgba(94, 179, 228, 0.4)",
                  }}
                >
                  <Check className="w-4 h-4 text-white" strokeWidth={3} />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </motion.div>

      {/* Continue Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mb-10 relative z-10"
      >
        <motion.button
          whileHover={canProceed ? { scale: 1.02, y: -2 } : {}}
          whileTap={canProceed ? { scale: 0.98 } : {}}
          onClick={canProceed ? goToNext : undefined}
          disabled={!canProceed}
          className="group flex items-center gap-3 px-10 py-4 rounded-xl font-medium text-base cursor-pointer transition-all duration-300"
          style={{
            fontFamily: "var(--font-display)",
            background: canProceed
              ? "linear-gradient(135deg, var(--accent-primary) 0%, #4a9ed4 100%)"
              : "rgba(255, 255, 255, 0.05)",
            color: canProceed ? "#ffffff" : "var(--text-muted)",
            boxShadow: canProceed
              ? "0 4px 20px rgba(94, 179, 228, 0.3)"
              : "none",
            opacity: canProceed ? 1 : 0.5,
          }}
        >
          <span>Continue</span>
          <ChevronRight
            className={`w-5 h-5 transition-transform ${canProceed ? "group-hover:translate-x-1" : ""}`}
          />
        </motion.button>
      </motion.div>

      {/* Progress Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="relative z-10"
      >
        <ProgressBar current={stepNumber} total={totalQuestions} />
      </motion.div>
    </div>
  );
}
