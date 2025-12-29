"use client";

import { motion } from "framer-motion";
import { Waves, Film, ChevronRight, Zap } from "lucide-react";
import { useWizard, MotionPreference } from "@/context/WizardContext";
import Button from "@/components/ui/Button";
import ProgressDots from "@/components/ui/ProgressDots";

const motionOptions: {
  value: MotionPreference;
  icon: React.ReactNode;
  label: string;
  subtext: string;
}[] = [
  {
    value: "smooth",
    icon: <Waves className="w-12 h-12" strokeWidth={1.5} />,
    label: "Smooth",
    subtext: "Fluid motion, great for sports",
  },
  {
    value: "cinematic",
    icon: <Film className="w-12 h-12" strokeWidth={1.5} />,
    label: "Cinematic",
    subtext: "Preserves the director's intent",
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
      className="w-full h-full flex flex-col items-center justify-center px-8 py-6 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, var(--bg-screen) 0%, #010203 100%)",
      }}
    >
      {/* Background glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(56, 189, 248, 0.04) 0%, transparent 60%)",
        }}
      />

      {/* Question header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="mb-10 text-center relative z-10"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-4"
        >
          <Zap className="w-3.5 h-3.5 text-[--accent-primary]" />
          <span className="text-xs font-medium text-[--text-secondary] uppercase tracking-wider">
            Motion Style
          </span>
        </motion.div>

        <h2
          className="text-3xl font-bold text-white"
          style={{ fontFamily: "var(--font-display)" }}
        >
          How should motion look?
        </h2>
      </motion.div>

      {/* Options */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex gap-8 mb-10 relative z-10"
      >
        {motionOptions.map((option, index) => {
          const isSelected = answers.motionPreference === option.value;

          return (
            <motion.button
              key={option.value}
              type="button"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + index * 0.1, type: "spring", stiffness: 100 }}
              whileHover={{ scale: 1.04, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect(option.value)}
              className={`
                w-[240px] h-[180px]
                flex flex-col items-center justify-center gap-4
                rounded-2xl cursor-pointer
                transition-all duration-300 relative overflow-hidden
                backdrop-blur-xl
                ${
                  isSelected
                    ? "bg-[--accent-primary]/15 border-2 border-[--accent-primary] selection-glow"
                    : "bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] hover:border-white/[0.15]"
                }
              `}
            >
              {/* Background gradient on selection */}
              {isSelected && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, rgba(56, 189, 248, 0.1) 0%, transparent 70%)",
                  }}
                />
              )}

              {/* Animated icon */}
              <motion.div
                animate={
                  option.value === "smooth"
                    ? {
                        y: [0, -4, 0],
                        transition: { repeat: Infinity, duration: 2, ease: "easeInOut" },
                      }
                    : {}
                }
                className={`relative z-10 transition-colors duration-300 ${
                  isSelected ? "text-[--accent-primary]" : "text-[--text-secondary]"
                }`}
              >
                {/* Icon glow */}
                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 -m-4 rounded-full"
                    style={{
                      background:
                        "radial-gradient(circle, rgba(56, 189, 248, 0.3) 0%, transparent 70%)",
                      filter: "blur(10px)",
                    }}
                  />
                )}
                <div className="relative z-10">{option.icon}</div>
              </motion.div>

              <div
                className={`text-lg font-semibold relative z-10 transition-colors duration-300 ${
                  isSelected ? "text-white" : "text-[--text-primary]"
                }`}
                style={{ fontFamily: "var(--font-display)" }}
              >
                {option.label}
              </div>

              <div className="text-sm text-[--text-muted] text-center px-4 relative z-10">
                {option.subtext}
              </div>

              {/* Selection checkmark */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className="absolute top-3 right-3 w-6 h-6 rounded-full bg-[--accent-primary] flex items-center justify-center"
                >
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </motion.div>

      {/* Next Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: canProceed ? 1 : 0.4, y: 0 }}
        transition={{ delay: 0.5, duration: 0.3 }}
        className="mb-8 relative z-10"
      >
        <Button onClick={goToNext} disabled={!canProceed}>
          Continue
          <ChevronRight className="w-4 h-4" />
        </Button>
      </motion.div>

      {/* Progress Dots */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="relative z-10"
      >
        <ProgressDots currentStep={stepNumber} totalSteps={totalQuestions} />
      </motion.div>
    </div>
  );
}
