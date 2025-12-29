"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Check } from "lucide-react";

interface ImageOptionProps {
  imageSrc: string;
  label: string;
  selected: boolean;
  onClick: () => void;
  filter?: string;
}

export default function ImageOption({
  imageSrc,
  label,
  selected,
  onClick,
  filter = "none",
}: ImageOptionProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.02, y: -6 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="relative overflow-visible cursor-pointer group"
      style={{ width: "320px", height: "190px" }}
    >
      {/* Outer glow on selection */}
      {selected && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute -inset-2 rounded-3xl pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(99, 179, 237, 0.3) 0%, rgba(183, 148, 244, 0.2) 100%)",
            filter: "blur(20px)",
          }}
        />
      )}

      {/* Card container */}
      <motion.div
        animate={{
          boxShadow: selected
            ? "0 0 0 2px rgba(99, 179, 237, 0.6), 0 0 40px rgba(99, 179, 237, 0.25), 0 12px 40px rgba(0, 0, 0, 0.5)"
            : "0 4px 24px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.06)",
        }}
        transition={{ duration: 0.3 }}
        className="relative w-full h-full rounded-2xl overflow-hidden"
      >
        {/* Image */}
        <div className="relative w-full h-full">
          <Image
            src={imageSrc}
            alt={label}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            style={{ filter }}
            sizes="320px"
          />

          {/* Overlay gradient - darker on unselected */}
          <motion.div
            animate={{
              opacity: selected ? 0.3 : 0.5,
            }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, transparent 0%, transparent 40%, rgba(0,0,0,0.9) 100%)",
            }}
          />

          {/* Selection overlay */}
          {selected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, rgba(99, 179, 237, 0.05) 0%, rgba(99, 179, 237, 0.1) 100%)",
              }}
            />
          )}
        </div>

        {/* Label overlay */}
        <div className="absolute bottom-0 left-0 right-0 py-4 px-5">
          <div className="flex items-center justify-between">
            <motion.span
              animate={{
                color: selected ? "var(--accent-primary-bright)" : "#ffffff",
              }}
              className="text-lg font-medium tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {label}
            </motion.span>

            {/* Selection indicator */}
            {selected && (
              <motion.div
                initial={{ scale: 0, opacity: 0, rotate: -45 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, var(--accent-primary) 0%, #4299e1 100%)",
                  boxShadow:
                    "0 2px 12px rgba(99, 179, 237, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.15) inset",
                }}
              >
                <Check className="w-4 h-4 text-white" strokeWidth={3} />
              </motion.div>
            )}
          </div>
        </div>

        {/* Top-right selection badge */}
        {selected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, delay: 0.1 }}
            className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, var(--accent-primary) 0%, #4299e1 100%)",
              boxShadow: "0 0 20px rgba(99, 179, 237, 0.5)",
            }}
          >
            <Check className="w-4 h-4 text-white" strokeWidth={3} />
          </motion.div>
        )}

        {/* Premium inner border highlight */}
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{
            boxShadow: selected
              ? "inset 0 1px 0 rgba(99, 179, 237, 0.3), inset 0 0 0 1px rgba(99, 179, 237, 0.15)"
              : "inset 0 1px 0 rgba(255, 255, 255, 0.08)",
          }}
        />
      </motion.div>
    </motion.button>
  );
}
