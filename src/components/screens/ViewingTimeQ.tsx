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
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(145deg, #fff2b1 0%, #fbd34d 35%, #f59e0b 70%, #d97706 100%)",
          }}
        />
        <motion.div
          animate={isSelected ? { opacity: [0.25, 0.45, 0.25] } : { opacity: 0.25 }}
          transition={{ duration: 3.2, repeat: Infinity }}
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle at 65% 30%, rgba(255, 255, 255, 0.6) 0%, transparent 55%)",
          }}
        />
        <motion.div
          animate={isSelected ? { y: [-2, 2, -2] } : {}}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-6 right-8 w-16 h-16 rounded-full"
          style={{
            background: "radial-gradient(circle, #ffffff 0%, #fef3c7 55%, transparent 70%)",
            boxShadow: "0 0 40px rgba(254, 215, 170, 0.8)",
          }}
        />
        <motion.div
          animate={isSelected ? { x: [-6, 6, -6], opacity: [0.2, 0.35, 0.2] } : { opacity: 0.2 }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-6 bottom-8 right-20 h-8 rounded-full"
          style={{
            background: "linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.35) 50%, rgba(255, 255, 255, 0) 100%)",
            filter: "blur(6px)",
          }}
        />
      </div>
    );
  }

  if (type === "nighttime") {
    return (
      <div className="relative w-full h-full overflow-hidden rounded-xl">
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(145deg, #0f172a 0%, #1e1b4b 35%, #312e81 70%, #1e1b4b 100%)",
          }}
        />
        <motion.div
          animate={isSelected ? { opacity: [0.15, 0.3, 0.15] } : { opacity: 0.15 }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle at 30% 20%, rgba(129, 140, 248, 0.35) 0%, transparent 55%)",
          }}
        />
        <motion.div
          animate={isSelected ? { scale: [1, 1.03, 1] } : {}}
          transition={{ duration: 4.8, repeat: Infinity }}
          className="absolute top-6 right-8 w-14 h-14 rounded-full"
          style={{
            background: "linear-gradient(135deg, #e2e8f0 0%, #cbd5f5 100%)",
            boxShadow: "0 0 32px rgba(203, 213, 225, 0.45)",
          }}
        />
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full"
            style={{
              background: "#ffffff",
              left: `${12 + (i % 4) * 22}%`,
              top: `${18 + Math.floor(i / 4) * 28}%`,
              boxShadow: "0 0 6px rgba(255, 255, 255, 0.8)",
            }}
            animate={isSelected ? { opacity: [0.4, 0.9, 0.4] } : { opacity: 0.65 }}
            transition={{ duration: 2.8, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl">
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #fde68a 0%, #f59e0b 30%, #6366f1 70%, #312e81 100%)",
        }}
      />
      <motion.div
        animate={isSelected ? { x: [-10, 10, -10], opacity: [0.25, 0.45, 0.25] } : { opacity: 0.25 }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, rgba(255, 255, 255, 0.25) 0%, transparent 60%)",
        }}
      />
      <motion.div
        animate={isSelected ? { y: [-2, 2, -2] } : {}}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-5 left-6 w-11 h-11 rounded-full"
        style={{
          background: "radial-gradient(circle, #ffffff 0%, #fde68a 70%, transparent 100%)",
          boxShadow: "0 0 20px rgba(253, 230, 138, 0.7)",
        }}
      />
      <motion.div
        animate={isSelected ? { y: [2, -2, 2] } : {}}
        transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-5 right-6 w-9 h-9 rounded-full"
        style={{
          background: "linear-gradient(135deg, #e2e8f0 0%, #94a3b8 100%)",
          boxShadow: "0 0 16px rgba(148, 163, 184, 0.6)",
        }}
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
              className="relative group cursor-pointer w-[240px] h-[160px] sm:w-[280px] sm:h-[180px] md:w-[320px] md:h-[210px] xl:w-[380px] xl:h-[240px]"
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
                className="absolute bottom-0 left-0 right-0 p-5 md:p-6 rounded-b-xl"
                style={{
                  background: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.7) 100%)",
                }}
              >
                <span
                  className="text-white font-medium text-lg md:text-xl"
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
                  className="absolute top-3 right-3 w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center"
                  style={{
                    background: "var(--accent-primary)",
                    boxShadow: "0 2px 8px rgba(94, 179, 228, 0.4)",
                  }}
                >
                  <Check className="w-4 h-4 md:w-5 md:h-5 text-white" strokeWidth={3} />
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
