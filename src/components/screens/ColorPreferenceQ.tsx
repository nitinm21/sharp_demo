"use client";

import { motion } from "framer-motion";
import { ChevronRight, Palette } from "lucide-react";
import { useWizard, ColorPreference } from "@/context/WizardContext";
import Button from "@/components/ui/Button";
import ImageOption from "@/components/ui/ImageOption";
import ProgressDots from "@/components/ui/ProgressDots";

const colorOptions: {
  value: ColorPreference;
  imageSrc: string;
  label: string;
  filter: string;
}[] = [
  {
    value: "vivid",
    imageSrc: "/images/landscape-vivid.jpg",
    label: "Vivid",
    filter: "saturate(1.4) contrast(1.1)",
  },
  {
    value: "natural",
    imageSrc: "/images/landscape-vivid.jpg",
    label: "Natural",
    filter: "saturate(0.9) contrast(0.95)",
  },
];

export default function ColorPreferenceQ() {
  const {
    goToNext,
    answers,
    setAnswer,
    canProceed,
    stepNumber,
    totalQuestions,
  } = useWizard();

  const handleSelect = (value: ColorPreference) => {
    setAnswer("colorPreference", value);
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
            "radial-gradient(ellipse at center, rgba(251, 191, 36, 0.04) 0%, transparent 60%)",
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
          <Palette className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-xs font-medium text-[--text-secondary] uppercase tracking-wider">
            Color Style
          </span>
        </motion.div>

        <h2
          className="text-3xl font-bold text-white"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Which looks better to you?
        </h2>
      </motion.div>

      {/* Image Options */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex gap-6 mb-10 relative z-10"
      >
        {colorOptions.map((option, index) => (
          <motion.div
            key={option.value}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25 + index * 0.1, type: "spring", stiffness: 100 }}
          >
            <ImageOption
              imageSrc={option.imageSrc}
              label={option.label}
              selected={answers.colorPreference === option.value}
              onClick={() => handleSelect(option.value)}
              filter={option.filter}
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
