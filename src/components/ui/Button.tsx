"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "success" | "secondary";
  size?: "default" | "large";
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  children,
  variant = "primary",
  size = "default",
  className = "",
  disabled = false,
  onClick,
  type = "button",
}: ButtonProps) {
  const baseStyles =
    "font-medium rounded-xl transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden";

  const variantStyles = {
    primary: "btn-premium text-white",
    success: "btn-success text-white",
    secondary:
      "bg-white/[0.03] hover:bg-white/[0.06] text-[var(--text-primary)] border border-white/[0.08] hover:border-white/[0.12] backdrop-blur-sm",
  };

  const sizeStyles = {
    default: "px-6 py-3.5 text-sm tracking-wide",
    large: "px-10 py-4 text-base tracking-wide",
  };

  const disabledStyles = disabled
    ? "opacity-40 cursor-not-allowed"
    : "cursor-pointer";

  return (
    <motion.button
      type={type}
      whileHover={
        disabled
          ? {}
          : {
              scale: 1.02,
              y: -3,
            }
      }
      whileTap={disabled ? {} : { scale: 0.98, y: -1 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${className}`}
      disabled={disabled}
      onClick={onClick}
      style={{ fontFamily: "var(--font-display)" }}
    >
      {/* Shimmer effect on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ x: "-100%", opacity: 0 }}
        whileHover={{ x: "100%", opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)",
        }}
      />

      {/* Inner top highlight */}
      <div
        className="absolute top-0 left-4 right-4 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)",
        }}
      />

      {/* Content */}
      <span className="relative z-10 flex items-center gap-3">{children}</span>
    </motion.button>
  );
}
