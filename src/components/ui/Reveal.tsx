"use client";

import { motion } from "framer-motion";
import React from "react";

const EASE = [0.16, 1, 0.3, 1];
const DURATION = 1.0;

// ==========================================
// MASKED EMERGENCE: For Headers & Titles
// ==========================================
export function RevealText({ 
  children, 
  className = "", 
  delay = 0 
}: { 
  children: React.ReactNode, 
  className?: string, 
  delay?: number 
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "0px" }}
        transition={{ duration: DURATION, delay, ease: EASE }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// ==========================================
// SUBTLE FADE UP: For Paragraphs & Descriptions
// ==========================================
export function FadeUp({ 
  children, 
  className = "", 
  delay = 0 
}: { 
  children: React.ReactNode, 
  className?: string, 
  delay?: number 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px" }}
      transition={{ duration: DURATION, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ==========================================
// STAGGERED GRID ENGINE: For Cards & Lists
// ==========================================
export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

export const staggerItemVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: DURATION, ease: EASE } }
};

export function RevealStaggerGroup({ 
  children, 
  className = "" 
}: { 
  children: React.ReactNode, 
  className?: string 
}) {
  return (
    <motion.div
      variants={staggerContainerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ 
  children, 
  className = "" 
}: { 
  children: React.ReactNode, 
  className?: string 
}) {
  return (
    <motion.div variants={staggerItemVariants} className={className}>
      {children}
    </motion.div>
  );
}

// ==========================================
// SETTLING SCALE: For Media & Banners
// ==========================================
export function RevealImage({ 
  children, 
  className = "", 
  delay = 0 
}: { 
  children: React.ReactNode, 
  className?: string, 
  delay?: number 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 80 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "0px" }}
      transition={{ duration: DURATION, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
