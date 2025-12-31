"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { useWizard, BrightnessPreference } from "@/context/WizardContext";

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

// Bright visual - high contrast, vibrant
function BrightVisual({ isSelected }: { isSelected: boolean }) {
  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl">
      {/* Bright background */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(145deg, #1a2840 0%, #0f1a2d 50%, #162236 100%)",
        }}
      />

      {/* Bright central element */}
      <motion.div
        animate={
          isSelected
            ? {
                boxShadow: [
                  "0 0 40px rgba(255, 255, 255, 0.3), 0 0 80px rgba(255, 255, 255, 0.1)",
                  "0 0 60px rgba(255, 255, 255, 0.5), 0 0 100px rgba(255, 255, 255, 0.2)",
                  "0 0 40px rgba(255, 255, 255, 0.3), 0 0 80px rgba(255, 255, 255, 0.1)",
                ],
              }
            : {}
        }
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full"
        style={{
          background: "radial-gradient(circle, #ffffff 0%, #e0e7ff 40%, rgba(224, 231, 255, 0.5) 70%, transparent 100%)",
          boxShadow: "0 0 40px rgba(255, 255, 255, 0.3), 0 0 80px rgba(255, 255, 255, 0.1)",
        }}
      />

      {/* Light rays */}
      {isSelected && (
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 w-0.5 origin-bottom"
              style={{
                height: "80px",
                background: "linear-gradient(180deg, rgba(255,255,255,0.4) 0%, transparent 100%)",
                transform: `translate(-50%, -100%) rotate(${i * 30}deg)`,
              }}
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
            />
          ))}
        </div>
      )}

      {/* High contrast overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle at center, transparent 30%, rgba(15, 26, 45, 0.4) 100%)",
        }}
      />
    </div>
  );
}

// Comfortable visual - softer, warmer
function ComfortableVisual({ isSelected }: { isSelected: boolean }) {
  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl">
      {/* Dim, warm background */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(145deg, #1a1714 0%, #0d0b09 50%, #141210 100%)",
        }}
      />

      {/* Soft warm glow */}
      <motion.div
        animate={
          isSelected
            ? {
                opacity: [0.6, 0.8, 0.6],
                scale: [1, 1.05, 1],
              }
            : {}
        }
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(240, 198, 116, 0.4) 0%, rgba(240, 198, 116, 0.15) 40%, transparent 70%)",
          filter: "blur(4px)",
        }}
      />

      {/* Central soft element */}
      <motion.div
        animate={isSelected ? { scale: [1, 1.02, 1] } : {}}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(240, 198, 116, 0.5) 0%, rgba(217, 176, 99, 0.3) 50%, transparent 100%)",
          boxShadow: "0 0 30px rgba(240, 198, 116, 0.2)",
        }}
      />

      {/* Warm ambient particles */}
      {isSelected && (
        <>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                background: "rgba(240, 198, 116, 0.6)",
                left: `${30 + (i % 3) * 20}%`,
                top: `${30 + Math.floor(i / 3) * 30}%`,
              }}
              animate={{
                opacity: [0.3, 0.7, 0.3],
                y: [0, -5, 0],
              }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
            />
          ))}
        </>
      )}
    </div>
  );
}

const brightnessOptions: { value: BrightnessPreference; label: string }[] = [
  { value: "bright", label: "Punchy & bright" },
  { value: "comfortable", label: "Soft & comfortable" },
];

export default function BrightnessQ() {
  const {
    goToNext,
    answers,
    setAnswer,
    canProceed,
    stepNumber,
    totalQuestions,
  } = useWizard();

  const handleSelect = (value: BrightnessPreference) => {
    setAnswer("brightnessPreference", value);
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
          How should the picture feel?
        </h2>
      </motion.div>

      {/* Visual options */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap justify-center gap-6 md:gap-10 mb-12 relative z-10"
      >
        {brightnessOptions.map((option, index) => {
          const isSelected = answers.brightnessPreference === option.value;

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
              {option.value === "bright" ? (
                <BrightVisual isSelected={isSelected} />
              ) : (
                <ComfortableVisual isSelected={isSelected} />
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

      {/* Final CTA Button */}
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
              ? "linear-gradient(135deg, var(--accent-success) 0%, #4bc4a0 100%)"
              : "rgba(255, 255, 255, 0.05)",
            color: canProceed ? "#ffffff" : "var(--text-muted)",
            boxShadow: canProceed
              ? "0 4px 20px rgba(93, 212, 179, 0.3)"
              : "none",
            opacity: canProceed ? 1 : 0.5,
          }}
        >
          <Sparkles className="w-5 h-5" />
          <span>See My Profile</span>
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
