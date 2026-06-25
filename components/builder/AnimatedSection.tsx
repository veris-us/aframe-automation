"use client";

import { motion } from "framer-motion";
import { animationPresets } from "./animationPresets";

export default function AnimatedSection({
  animation = "fadeUp",
  children,
}: {
  animation?: keyof typeof animationPresets;
  children: React.ReactNode;
}) {
  const preset = animationPresets[animation];

  return (
    <motion.div
      variants={preset}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.7,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}