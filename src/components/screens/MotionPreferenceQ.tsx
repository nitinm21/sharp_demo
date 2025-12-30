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

// Smooth motion visual - flowing waves
function SmoothVisual({ isSelected }: { isSelected: boolean }) {
  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl bg-gradient-to-br from-[#0c1929] to-[#0a1220]">
      {/* Animated flowing lines */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-0.5 rounded-full"
          style={{
            width: "120%",
            left: "-10%",
            top: `${25 + i * 12}%`,
            background: `linear-gradient(90deg, transparent 0%, rgba(94, 179, 228, ${0.2 + i * 0.1}) 30%, rgba(94, 179, 228, ${0.4 + i * 0.1}) 50%, rgba(94, 179, 228, ${0.2 + i * 0.1}) 70%, transparent 100%)`,
          }}
          animate={
            isSelected
              ? {
                  x: ["-10%", "10%", "-10%"],
                  scaleY: [1, 1.5, 1],
                }
              : {}
          }
          transition={{
            duration: 2 + i * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.15,
          }}
        />
      ))}

      {/* Ambient glow */}
      <motion.div
        animate={isSelected ? { opacity: [0.3, 0.5, 0.3] } : { opacity: 0.2 }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, rgba(94, 179, 228, 0.15) 0%, transparent 60%)",
        }}
      />
    </div>
  );
}

// Cinematic motion visual - film frames
function CinematicVisual({ isSelected }: { isSelected: boolean }) {
  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl bg-gradient-to-br from-[#0c1929] to-[#0a1220]">
      {/* Film frames */}
      <div className="absolute inset-4 flex gap-2">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-lg overflow-hidden relative"
            style={{
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}
            animate={
              isSelected
                ? {
                    opacity: [0.6, 1, 0.6],
                    scale: [0.98, 1, 0.98],
                  }
                : {}
            }
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          >
            {/* Frame content gradient */}
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(${135 + i * 20}deg, rgba(167, 139, 250, 0.1) 0%, rgba(94, 179, 228, 0.1) 100%)`,
              }}
            />
            {/* Sprocket holes indicator */}
            <div className="absolute left-0 top-0 bottom-0 w-1.5 flex flex-col justify-between py-1">
              {[...Array(4)].map((_, j) => (
                <div
                  key={j}
                  className="w-1 h-1 rounded-full bg-white/20 mx-auto"
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Film grain overlay */}
      {isSelected && (
        <motion.div
          animate={{ opacity: [0.02, 0.04, 0.02] }}
          transition={{ duration: 0.1, repeat: Infinity }}
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      )}
    </div>
  );
}

const motionOptions: { value: MotionPreference; label: string }[] = [
  { value: "smooth", label: "Smooth" },
  { value: "cinematic", label: "Cinematic" },
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
          Motion style?
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
              className="relative group cursor-pointer w-[240px] h-[150px] sm:w-[300px] sm:h-[180px] lg:w-[360px] lg:h-[210px]"
            >
              {/* Visual */}
              {option.value === "smooth" ? (
                <SmoothVisual isSelected={isSelected} />
              ) : (
                <CinematicVisual isSelected={isSelected} />
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
                className="absolute bottom-0 left-0 right-0 p-4 rounded-b-xl"
                style={{
                  background: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.8) 100%)",
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
