"use client";

import { motion } from "framer-motion";
import { Film, Trophy, Gamepad2, Tv, ChevronRight, Sparkles } from "lucide-react";
import { useWizard, ContentType } from "@/context/WizardContext";
import Button from "@/components/ui/Button";
import OptionCard from "@/components/ui/OptionCard";
import ProgressDots from "@/components/ui/ProgressDots";

const contentOptions: {
  value: ContentType;
  icon: React.ReactNode;
  label: string;
  subtext: string;
}[] = [
  {
    value: "movies",
    icon: <Film className="w-10 h-10" strokeWidth={1.5} />,
    label: "Movies",
    subtext: "Films & streaming",
  },
  {
    value: "sports",
    icon: <Trophy className="w-10 h-10" strokeWidth={1.5} />,
    label: "Sports",
    subtext: "Live action",
  },
  {
    value: "gaming",
    icon: <Gamepad2 className="w-10 h-10" strokeWidth={1.5} />,
    label: "Gaming",
    subtext: "Console & PC",
  },
  {
    value: "general",
    icon: <Tv className="w-10 h-10" strokeWidth={1.5} />,
    label: "General",
    subtext: "Everything else",
  },
];

export default function ContentTypeQ() {
  const { goToNext, answers, toggleContentType, canProceed, stepNumber, totalQuestions } =
    useWizard();

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
            "radial-gradient(ellipse at center, rgba(56, 189, 248, 0.05) 0%, transparent 60%)",
        }}
      />

      {/* Question header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="mb-8 text-center relative z-10"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-4"
        >
          <Sparkles className="w-3.5 h-3.5 text-[--accent-primary]" />
          <span className="text-xs font-medium text-[--text-secondary] uppercase tracking-wider">
            Content Preference
          </span>
        </motion.div>

        <h2
          className="text-3xl font-bold text-white mb-2"
          style={{ fontFamily: "var(--font-display)" }}
        >
          What do you watch most?
        </h2>

        <p className="text-sm text-[--text-muted]">
          Select one or more options
        </p>
      </motion.div>

      {/* Options Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-4 gap-4 mb-10 relative z-10"
      >
        {contentOptions.map((option, index) => (
          <motion.div
            key={option.value}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 + index * 0.08, type: "spring", stiffness: 100 }}
          >
            <OptionCard
              icon={option.icon}
              label={option.label}
              subtext={option.subtext}
              selected={answers.contentTypes.includes(option.value)}
              onClick={() => toggleContentType(option.value)}
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
