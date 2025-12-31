"use client";

import { motion } from "framer-motion";
import { Check, ChevronRight } from "lucide-react";
import { useWizard, MotionPreference } from "@/context/WizardContext";

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

// Clear motion visual - crisp trails and speed lines
function ClearMotionVisual({ isSelected }: { isSelected: boolean }) {
  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl">
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(145deg, #0b1c2c 0%, #0b1424 55%, #0a0f1b 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(94, 179, 228, 0.18) 0.5px, transparent 0.5px)",
          backgroundSize: "100% 18px",
        }}
      />
      <motion.div
        animate={isSelected ? { opacity: [0.2, 0.45, 0.2] } : { opacity: 0.2 }}
        transition={{ duration: 2.8, repeat: Infinity }}
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 70% 40%, rgba(94, 179, 228, 0.35) 0%, transparent 55%)",
        }}
      />
      <div className="absolute left-8 top-1/2 -translate-y-1/2">
        <motion.div
          animate={isSelected ? { x: [0, 28, 0] } : {}}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          className="relative"
        >
          <div
            className="absolute -left-10 w-12 h-8 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, rgba(94, 179, 228, 0) 0%, rgba(94, 179, 228, 0.25) 100%)",
              filter: "blur(6px)",
            }}
          />
          <div
            className="absolute -left-5 w-14 h-9 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, rgba(94, 179, 228, 0.1) 0%, rgba(94, 179, 228, 0.45) 100%)",
              filter: "blur(3px)",
            }}
          />
          <div
            className="relative w-20 h-10 rounded-full"
            style={{
              background: "linear-gradient(135deg, #6bc1ef 0%, #3f88bd 100%)",
              boxShadow: "0 0 18px rgba(94, 179, 228, 0.5)",
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}

// Original motion visual - discrete frames and cadence markers
function OriginalMotionVisual({ isSelected }: { isSelected: boolean }) {
  const dotPositions = [25, 50, 75];

  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl">
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(145deg, #171925 0%, #10131d 55%, #0a0b12 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 20% 20%, rgba(167, 139, 250, 0.18) 0%, transparent 55%)",
        }}
      />
      <div className="absolute inset-6 rounded-lg border border-white/10" />
      <div className="absolute inset-0 flex items-center justify-center gap-5 px-10">
        {dotPositions.map((left, index) => (
          <motion.div
            key={left}
            animate={isSelected ? { opacity: [0.5, 1, 0.5] } : { opacity: 0.7 }}
            transition={{ duration: 2.4, repeat: Infinity, delay: index * 0.2 }}
            className="relative w-16 h-16 md:w-20 md:h-20 rounded-lg border border-white/10 bg-white/[0.04]"
          >
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(145deg, rgba(255, 255, 255, 0.08) 0%, transparent 60%)",
              }}
            />
            <div
              className="absolute bottom-3 -translate-x-1/2"
              style={{ left: `${left}%` }}
            >
              <motion.div
                animate={isSelected ? { y: [0, -2, 0] } : {}}
                transition={{ duration: 1.8, repeat: Infinity, delay: index * 0.2 }}
                className="w-4 h-4 rounded-full"
                style={{
                  background: "linear-gradient(135deg, #d8b4fe 0%, #9f7aea 100%)",
                  boxShadow: "0 0 12px rgba(167, 139, 250, 0.45)",
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div
        animate={isSelected ? { opacity: [0.35, 0.6, 0.35] } : { opacity: 0.35 }}
        transition={{ duration: 2.6, repeat: Infinity }}
        className="absolute bottom-5 left-6 right-6 flex items-center gap-1"
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="rounded-full"
            style={{
              height: "3px",
              width: i % 3 === 0 ? "18px" : "8px",
              background: "rgba(255, 255, 255, 0.2)",
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}

const motionOptions: {
  value: MotionPreference;
  label: string;
  description: string;
}[] = [
  {
    value: "smooth",
    label: "Clear motion",
    description: "Smoother, less blur.",
  },
  {
    value: "cinematic",
    label: "Original motion",
    description: "Cinematic pacing.",
  },
];

export default function MotionPreferenceQ() {
  const {
    goToNext,
    answers,
    setAnswer,
    canProceed,
    stepNumber,
    totalQuestions,
  } = useWizard();

  const handleSelect = (value: MotionPreference) => {
    setAnswer("motionPreference", value);
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
          Do you want smoother motion or a cinematic look?
        </h2>
      </motion.div>

      {/* Visual options */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap justify-center gap-6 md:gap-10 mb-12 relative z-10"
      >
        {motionOptions.map((option, index) => {
          const isSelected = answers.motionPreference === option.value;

          return (
            <motion.button
              key={option.value}
              type="button"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.15 + index * 0.1,
                duration: 0.4,
                ease: "easeOut",
              }}
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect(option.value)}
              className="relative group cursor-pointer w-[280px] h-[180px] sm:w-[320px] sm:h-[210px] md:w-[380px] md:h-[240px] xl:w-[420px] xl:h-[280px]"
            >
              {/* Visual */}
              {option.value === "smooth" ? (
                <ClearMotionVisual isSelected={isSelected} />
              ) : (
                <OriginalMotionVisual isSelected={isSelected} />
              )}

              {/* Selection ring */}
              <div
                className="absolute inset-0 rounded-xl transition-all duration-300 pointer-events-none"
                style={{
                  border: isSelected
                    ? "2px solid var(--accent-primary)"
                    : "1px solid rgba(255, 255, 255, 0.1)",
                  boxShadow: isSelected
                    ? "0 0 24px rgba(94, 179, 228, 0.35)"
                    : "none",
                }}
              />

              {/* Label */}
              <div
                className="absolute bottom-0 left-0 right-0 p-5 md:p-6 rounded-b-xl"
                style={{
                  background: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.8) 100%)",
                }}
              >
                <div className="flex flex-col gap-1">
                  <span
                    className="text-white font-medium text-lg md:text-xl"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {option.label}
                  </span>
                  <span
                    className="text-xs md:text-sm leading-snug"
                    style={{
                      fontFamily: "var(--font-body)",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {option.description}
                  </span>
                </div>
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
