"use client";

import { motion } from "framer-motion";
import { Sun, Moon, SunMoon, ChevronRight, Clock } from "lucide-react";
import { useWizard, ViewingTime } from "@/context/WizardContext";
import Button from "@/components/ui/Button";
import OptionCard from "@/components/ui/OptionCard";
import ProgressDots from "@/components/ui/ProgressDots";

const viewingOptions: {
  value: ViewingTime;
  icon: React.ReactNode;
  label: string;
}[] = [
  {
    value: "daytime",
    icon: <Sun className="w-12 h-12" strokeWidth={1.5} />,
    label: "Daytime",
  },
  {
    value: "nighttime",
    icon: <Moon className="w-12 h-12" strokeWidth={1.5} />,
    label: "Nighttime",
  },
  {
    value: "both",
    icon: <SunMoon className="w-12 h-12" strokeWidth={1.5} />,
    label: "Both equally",
  },
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
            "radial-gradient(ellipse at center, rgba(168, 85, 247, 0.05) 0%, transparent 60%)",
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
          <Clock className="w-3.5 h-3.5 text-purple-400" />
          <span className="text-xs font-medium text-[--text-secondary] uppercase tracking-wider">
            Viewing Time
          </span>
        </motion.div>

        <h2
          className="text-3xl font-bold text-white"
          style={{ fontFamily: "var(--font-display)" }}
        >
          When do you usually watch?
        </h2>
      </motion.div>

      {/* Options */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex gap-6 mb-10 relative z-10"
      >
        {viewingOptions.map((option, index) => (
          <motion.div
            key={option.value}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 + index * 0.1, type: "spring", stiffness: 100 }}
          >
            <OptionCard
              icon={option.icon}
              label={option.label}
              selected={answers.viewingTime === option.value}
              onClick={() => handleSelect(option.value)}
              size="large"
            />
          </motion.div>
        ))}
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
