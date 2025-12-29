"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface OptionCardProps {
  icon: ReactNode;
  label: string;
  subtext?: string;
  selected: boolean;
  onClick: () => void;
  size?: "default" | "large";
}

export default function OptionCard({
  icon,
  label,
  subtext,
  selected,
  onClick,
  size = "default",
}: OptionCardProps) {
  const sizeStyles = {
    default: { width: 200, height: 150 },
    large: { width: 220, height: 170 },
  };

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.03, y: -6 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="relative cursor-pointer group"
      style={{
        width: sizeStyles[size].width,
        height: sizeStyles[size].height,
      }}
    >
      {/* Outer glow on selection */}
      {selected && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute -inset-1 rounded-3xl pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(99, 179, 237, 0.25) 0%, rgba(183, 148, 244, 0.15) 100%)",
            filter: "blur(16px)",
          }}
        />
      )}

      {/* Card container with premium depth */}
      <motion.div
        animate={{
          background: selected
            ? "linear-gradient(145deg, rgba(99, 179, 237, 0.12) 0%, rgba(99, 179, 237, 0.04) 100%)"
            : "linear-gradient(145deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%)",
          borderColor: selected
            ? "rgba(99, 179, 237, 0.5)"
            : "rgba(255, 255, 255, 0.06)",
          boxShadow: selected
            ? "0 0 0 2px rgba(99, 179, 237, 0.5), 0 0 40px rgba(99, 179, 237, 0.2), 0 8px 32px rgba(0, 0, 0, 0.4)"
            : "0 4px 24px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.04) inset",
        }}
        transition={{ duration: 0.3 }}
        className="w-full h-full flex flex-col items-center justify-center gap-4 rounded-2xl relative overflow-hidden border"
        style={{
          backdropFilter: "blur(16px)",
        }}
      >
        {/* Hover gradient overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: selected
              ? "none"
              : "linear-gradient(145deg, rgba(255, 255, 255, 0.03) 0%, transparent 100%)",
          }}
        />

        {/* Selected shimmer effect */}
        {selected && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "easeInOut",
            }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)",
              width: "50%",
            }}
          />
        )}

        {/* Inner highlight on top edge */}
        <div
          className="absolute top-0 left-4 right-4 h-px"
          style={{
            background: selected
              ? "linear-gradient(90deg, transparent 0%, rgba(99, 179, 237, 0.4) 50%, transparent 100%)"
              : "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.08) 50%, transparent 100%)",
          }}
        />

        {/* Icon container with glow */}
        <motion.div
          animate={{
            scale: selected ? 1.1 : 1,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative z-10"
        >
          {/* Icon glow on selection */}
          {selected && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: [0.4, 0.7, 0.4],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 -m-4 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(99, 179, 237, 0.35) 0%, transparent 70%)",
                filter: "blur(10px)",
              }}
            />
          )}

          <motion.div
            animate={{
              color: selected
                ? "var(--accent-primary)"
                : "var(--text-secondary)",
            }}
            className="text-5xl relative z-10"
          >
            {icon}
          </motion.div>
        </motion.div>

        {/* Label */}
        <motion.div
          animate={{
            color: selected ? "#ffffff" : "var(--text-primary)",
          }}
          className="text-base font-medium relative z-10 tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {label}
        </motion.div>

        {/* Subtext */}
        {subtext && (
          <motion.div
            animate={{
              color: selected
                ? "var(--text-secondary)"
                : "var(--text-muted)",
            }}
            className="text-xs text-center px-4 relative z-10 leading-relaxed"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {subtext}
          </motion.div>
        )}

        {/* Selection checkmark - premium badge */}
        {selected && (
          <motion.div
            initial={{ scale: 0, opacity: 0, rotate: -45 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, var(--accent-primary) 0%, #4299e1 100%)",
              boxShadow:
                "0 2px 8px rgba(99, 179, 237, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.15) inset",
            }}
          >
            <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
          </motion.div>
        )}
      </motion.div>
    </motion.button>
  );
}
