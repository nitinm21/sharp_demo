"use client";

import { motion } from "framer-motion";

interface ProgressDotsProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressDots({
  currentStep,
  totalSteps,
}: ProgressDotsProps) {
  return (
    <div className="flex items-center justify-center gap-3 w-full">
      {Array.from({ length: totalSteps }, (_, i) => {
        const stepNum = i + 1;
        const isActive = stepNum === currentStep;
        const isCompleted = stepNum < currentStep;

        return (
          <div key={stepNum} className="relative">
            {/* Glow effect for active dot */}
            {isActive && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 -m-1"
                style={{
                  background:
                    "radial-gradient(circle, rgba(56, 189, 248, 0.4) 0%, transparent 70%)",
                  filter: "blur(6px)",
                }}
              />
            )}

            {/* Main dot */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: isActive ? 1 : 0.85,
                opacity: 1,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: i * 0.05,
              }}
              className="relative"
            >
              <motion.div
                animate={{
                  width: isActive ? 32 : 8,
                  height: 8,
                  backgroundColor: isCompleted
                    ? "var(--accent-primary)"
                    : isActive
                      ? "var(--accent-primary)"
                      : "rgba(255, 255, 255, 0.1)",
                  boxShadow: isActive
                    ? "0 0 12px rgba(56, 189, 248, 0.5)"
                    : isCompleted
                      ? "0 0 8px rgba(56, 189, 248, 0.3)"
                      : "none",
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                }}
                className="rounded-full relative overflow-hidden"
              >
                {/* Progress fill animation for active */}
                {isActive && (
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="absolute inset-0 bg-gradient-to-r from-[--accent-primary] to-cyan-400"
                  />
                )}

                {/* Shimmer effect for completed */}
                {isCompleted && (
                  <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: "200%" }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatDelay: 3,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)",
                    }}
                  />
                )}
              </motion.div>
            </motion.div>

            {/* Step number tooltip (appears on active) */}
            {isActive && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-[--text-muted] font-medium whitespace-nowrap"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {currentStep} of {totalSteps}
              </motion.div>
            )}
          </div>
        );
      })}
    </div>
  );
}
