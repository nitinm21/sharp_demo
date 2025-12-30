"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, RotateCcw, Sparkles } from "lucide-react";
import { useWizard } from "@/context/WizardContext";
import { getProfile } from "@/data/profiles";

// Success ring animation
function SuccessRing({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0.8 }}
      animate={{ scale: 2.5, opacity: 0 }}
      transition={{ duration: 1.5, delay, ease: "easeOut" }}
      className="absolute inset-0 rounded-full"
      style={{
        border: "1px solid rgba(93, 212, 179, 0.4)",
      }}
    />
  );
}

// Abstract profile visualization
function ProfileVisualization({ profileName }: { profileName: string }) {
  // Different visualizations based on profile type
  const isGaming = profileName.toLowerCase().includes("game");
  const isSports = profileName.toLowerCase().includes("sport");
  const isCinema = profileName.toLowerCase().includes("cinema") || profileName.toLowerCase().includes("movie");
  const isNight = profileName.toLowerCase().includes("night");

  const primaryColor = isGaming
    ? "rgba(167, 139, 250, 0.6)"
    : isSports
    ? "rgba(94, 179, 228, 0.6)"
    : isCinema
    ? "rgba(240, 198, 116, 0.5)"
    : "rgba(93, 212, 179, 0.5)";

  const secondaryColor = isNight
    ? "rgba(99, 102, 241, 0.4)"
    : "rgba(255, 255, 255, 0.1)";

  return (
    <div className="relative w-40 h-40">
      {/* Outer ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full"
        style={{
          border: `1px solid ${primaryColor}`,
          background: `radial-gradient(circle, transparent 60%, ${secondaryColor} 100%)`,
        }}
      />

      {/* Middle ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute inset-4 rounded-full"
        style={{
          border: `1px solid ${primaryColor}`,
        }}
      />

      {/* Inner glow */}
      <motion.div
        animate={{
          boxShadow: [
            `0 0 20px ${primaryColor}, 0 0 40px ${secondaryColor}`,
            `0 0 30px ${primaryColor}, 0 0 60px ${secondaryColor}`,
            `0 0 20px ${primaryColor}, 0 0 40px ${secondaryColor}`,
          ],
        }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute inset-8 rounded-full flex items-center justify-center"
        style={{
          background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
        }}
      >
        <Check className="w-10 h-10 text-white" strokeWidth={2.5} />
      </motion.div>
    </div>
  );
}

export default function ResultsScreen() {
  const { resetWizard, answers } = useWizard();
  const [isApplied, setIsApplied] = useState(false);
  const [showStartOver, setShowStartOver] = useState(false);
  const [showCelebration, setShowCelebration] = useState(true);

  const profile = getProfile(answers);

  useEffect(() => {
    const timer = setTimeout(() => setShowCelebration(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleApply = () => {
    setIsApplied(true);
    setTimeout(() => {
      setShowStartOver(true);
    }, 1500);
  };

  const handleStartOver = () => {
    setIsApplied(false);
    setShowStartOver(false);
    resetWizard();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full flex flex-col items-center justify-center px-10 py-10 md:px-14 md:py-12 relative overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at center top, #0c1018 0%, var(--bg-screen) 100%)",
      }}
    >
      {/* Celebration effect */}
      <AnimatePresence>
        {showCelebration && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <SuccessRing delay={0} />
            <SuccessRing delay={0.2} />
            <SuccessRing delay={0.4} />
          </div>
        )}
      </AnimatePresence>

      {/* Background ambient glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 pointer-events-none"
      >
        <motion.div
          animate={{ opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px]"
          style={{
            background: "radial-gradient(ellipse at center, rgba(93, 212, 179, 0.12) 0%, transparent 60%)",
            filter: "blur(50px)",
          }}
        />
      </motion.div>

      {/* Profile visualization */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
        className="mb-10 relative z-10"
      >
        <ProfileVisualization profileName={profile.name} />
      </motion.div>

      {/* Profile Name */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-5xl md:text-6xl font-medium mb-4 text-center tracking-tight"
        style={{
          fontFamily: "var(--font-display)",
          background: "linear-gradient(135deg, #ffffff 0%, var(--accent-success-bright) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {profile.name}
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-lg mb-12 text-center max-w-lg font-light"
        style={{
          fontFamily: "var(--font-body)",
          color: "var(--text-secondary)",
        }}
      >
        {profile.description}
      </motion.p>

      {/* Settings display - Clean pills without emojis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex flex-wrap justify-center gap-3 mb-14 max-w-2xl"
      >
        {profile.settings.map((setting, index) => (
          <motion.div
            key={setting.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 + index * 0.05 }}
            className="px-5 py-2.5 rounded-full"
            style={{
              background: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <span
              className="text-base"
              style={{
                fontFamily: "var(--font-body)",
                color: "var(--text-secondary)",
              }}
            >
              {setting.label}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* Action buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="flex flex-col items-center gap-4"
      >
        <AnimatePresence mode="wait">
          {!isApplied ? (
            <motion.button
              key="apply"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleApply}
              className="group flex items-center gap-3 px-12 py-5 rounded-xl font-medium text-lg cursor-pointer"
              style={{
                fontFamily: "var(--font-display)",
                background: "linear-gradient(135deg, var(--accent-success) 0%, #4bc4a0 100%)",
                color: "#ffffff",
                boxShadow: "0 4px 24px rgba(93, 212, 179, 0.3)",
              }}
            >
              <Sparkles className="w-6 h-6" />
              <span>Apply Profile</span>
            </motion.button>
          ) : (
            <motion.div
              key="applied"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-3 px-12 py-5 rounded-xl font-medium text-lg"
              style={{
                background: "rgba(93, 212, 179, 0.1)",
                border: "1px solid rgba(93, 212, 179, 0.3)",
                color: "var(--accent-success)",
                fontFamily: "var(--font-display)",
              }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Check className="w-6 h-6" />
                </motion.div>
                <span>Profile Applied</span>
              </motion.div>
          )}
        </AnimatePresence>

        {/* Start Over */}
        <AnimatePresence>
          {showStartOver && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleStartOver}
              className="flex items-center gap-2 px-8 py-3 rounded-lg font-medium text-base cursor-pointer"
              style={{
                fontFamily: "var(--font-display)",
                background: "transparent",
                color: "var(--text-muted)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <RotateCcw className="w-5 h-5" />
              <span>Start Over</span>
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
