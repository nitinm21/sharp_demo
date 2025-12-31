"use client";

import { motion } from "framer-motion";
import { Check, ChevronRight } from "lucide-react";
import { useWizard, ContentType } from "@/context/WizardContext";
import Image from "next/image";

const contentOptions: {
  value: ContentType;
  label: string;
  image: string;
}[] = [
  {
    value: "movies",
    label: "Movies",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=600&fit=crop&q=80",
  },
  {
    value: "sports",
    label: "Sports",
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&h=600&fit=crop&q=80",
  },
  {
    value: "gaming",
    label: "Gaming",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop&q=80",
  },
  {
    value: "general",
    label: "General / Mixed",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&h=600&fit=crop&q=80",
  },
];

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

export default function ContentTypeQ() {
  const {
    goToNext,
    answers,
    toggleContentType,
    canProceed,
    stepNumber,
    totalQuestions,
  } = useWizard();

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center px-10 py-10 md:px-14 md:py-12 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0a0c12 0%, var(--bg-screen) 100%)",
      }}
    >
      {/* Question header - minimal */}
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
          What do you watch most? (Select all that apply)
        </h2>
      </motion.div>

      {/* Image-based Options Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 gap-5 md:gap-6 mb-12 relative z-10"
      >
        {contentOptions.map((option, index) => {
          const isSelected = answers.contentTypes.includes(option.value);

          return (
            <motion.button
              key={option.value}
              type="button"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.15 + index * 0.05,
                duration: 0.4,
                ease: "easeOut",
              }}
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleContentType(option.value)}
              className="relative group cursor-pointer rounded-2xl overflow-hidden w-[280px] h-[180px] sm:w-[320px] sm:h-[200px] md:w-[380px] md:h-[240px] lg:w-[420px] lg:h-[280px]"
            >
              {/* Image */}
              <div className="absolute inset-0">
                <Image
                  src={option.image}
                  alt={option.label}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(min-width: 1024px) 420px, (min-width: 768px) 380px, (min-width: 640px) 320px, 280px"
                  loading={index < 2 ? "eager" : "lazy"}
                  quality={75}
                />
                {/* Gradient overlay */}
                <div
                  className="absolute inset-0 transition-opacity duration-300"
                  style={{
                    background: isSelected
                      ? "linear-gradient(180deg, rgba(94, 179, 228, 0.2) 0%, rgba(0,0,0,0.7) 100%)"
                      : "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%)",
                  }}
                />
              </div>

              {/* Selection ring */}
              <div
                className="absolute inset-0 rounded-2xl transition-all duration-300 pointer-events-none"
                style={{
                  border: isSelected
                    ? "2px solid var(--accent-primary)"
                    : "1px solid rgba(255, 255, 255, 0.1)",
                  boxShadow: isSelected
                    ? "0 0 20px rgba(94, 179, 228, 0.3), inset 0 0 20px rgba(94, 179, 228, 0.1)"
                    : "none",
                }}
              />

              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                <span
                  className="text-white font-medium text-lg md:text-xl"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {option.label}
                </span>
              </div>

              {/* Selection checkmark */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="absolute top-4 right-4 w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center"
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
