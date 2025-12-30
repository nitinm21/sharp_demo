"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useWizard } from "@/context/WizardContext";

// Abstract animated rings representing picture quality optimization
function OptimizationRings() {
  return (
    <div className="relative w-56 h-56 md:w-64 md:h-64">
      {/* Outer ring */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="w-full h-full rounded-full"
          style={{
            border: "1px solid rgba(94, 179, 228, 0.2)",
            background: "radial-gradient(circle, transparent 60%, rgba(94, 179, 228, 0.03) 100%)",
          }}
        />
      </motion.div>

      {/* Middle ring */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        className="absolute inset-6"
      >
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="w-full h-full rounded-full"
          style={{
            border: "1px solid rgba(94, 179, 228, 0.25)",
            background: "radial-gradient(circle, transparent 50%, rgba(94, 179, 228, 0.05) 100%)",
          }}
        />
      </motion.div>

      {/* Inner ring */}
      <motion.div
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
        className="absolute inset-12"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="w-full h-full rounded-full"
          style={{
            border: "1px solid rgba(94, 179, 228, 0.3)",
            background: "radial-gradient(circle, rgba(94, 179, 228, 0.08) 0%, rgba(94, 179, 228, 0.02) 100%)",
          }}
        />
      </motion.div>

      {/* Center core */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6, type: "spring", stiffness: 200 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <motion.div
          animate={{
            boxShadow: [
              "0 0 20px rgba(94, 179, 228, 0.3), 0 0 40px rgba(94, 179, 228, 0.1)",
              "0 0 30px rgba(94, 179, 228, 0.5), 0 0 60px rgba(94, 179, 228, 0.2)",
              "0 0 20px rgba(94, 179, 228, 0.3), 0 0 40px rgba(94, 179, 228, 0.1)",
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, rgba(94, 179, 228, 0.15) 0%, rgba(94, 179, 228, 0.05) 100%)",
            border: "1px solid rgba(94, 179, 228, 0.4)",
          }}
        >
          {/* Abstract TV symbol - three horizontal bars */}
          <div className="flex flex-col gap-1.5">
            <motion.div
              animate={{ width: ["16px", "20px", "16px"] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0 }}
              className="h-0.5 bg-[var(--accent-primary)] rounded-full"
            />
            <motion.div
              animate={{ width: ["20px", "14px", "20px"] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
              className="h-0.5 bg-[var(--accent-primary)] rounded-full"
            />
            <motion.div
              animate={{ width: ["14px", "18px", "14px"] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
              className="h-0.5 bg-[var(--accent-primary)] rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Orbiting dot */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0"
      >
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
          style={{
            background: "var(--accent-primary)",
            boxShadow: "0 0 10px var(--accent-primary-glow)",
          }}
        />
      </motion.div>
    </div>
  );
}

export default function WelcomeScreen() {
  const { goToNext } = useWizard();

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center text-center px-12 md:px-16 relative overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at center, #0a0c12 0%, var(--bg-screen) 100%)",
      }}
    >
      {/* Subtle ambient glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 pointer-events-none"
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]"
          style={{
            background: "radial-gradient(circle, rgba(94, 179, 228, 0.06) 0%, transparent 60%)",
            filter: "blur(40px)",
          }}
        />
      </motion.div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col items-center"
      >
        {/* Abstract visual element */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-12"
        >
          <OptimizationRings />
        </motion.div>

        {/* Title - Clean and Bold */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-7xl font-medium tracking-tight mb-6"
          style={{
            fontFamily: "var(--font-display)",
            background: "linear-gradient(135deg, #ffffff 0%, #b8c5d4 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Perfect Picture
        </motion.h1>

        {/* Subtitle - minimal */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-xl md:text-2xl mb-20 font-light tracking-wide"
          style={{
            fontFamily: "var(--font-body)",
            color: "var(--text-secondary)",
          }}
        >
          Personalized in seconds
        </motion.p>

        {/* CTA Button - Premium and focused */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={goToNext}
          className="group relative flex items-center gap-3 px-12 py-5 rounded-xl font-medium text-lg cursor-pointer"
          style={{
            fontFamily: "var(--font-display)",
            background: "linear-gradient(135deg, var(--accent-primary) 0%, #4a9ed4 100%)",
            color: "#ffffff",
            boxShadow: "0 4px 24px rgba(94, 179, 228, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1) inset",
          }}
        >
          <span>Start Setup</span>
          <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
        </motion.button>
      </motion.div>
    </div>
  );
}
