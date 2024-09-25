"use client"

import { motion } from "framer-motion";

const variants = {
  initial: {
    scaleY: 0.5,
    opacity: 0,
  },
  animate: {
    scaleY: 1,
    opacity: 1,
    transition: {
      repeat: Infinity,
      repeatType: "mirror",
      duration: 1,
      ease: "circIn",
    },
  },
};

export default function Loader() {
  return (
    <div className="absolute text-center w-screen h-screen flex justify-center items-center z-50">
      <motion.div
        transition={{
          staggerChildren: 0.25,
        }}
        initial="initial"
        animate="animate"
        className="flex gap-1"
      >
        <motion.div variants={variants} className="h-12 w-2 bg-white" />
        <motion.div variants={variants} className="h-12 w-2 bg-white" />
        <motion.div variants={variants} className="h-12 w-2 bg-white" />
        <motion.div variants={variants} className="h-12 w-2 bg-white" />
        <motion.div variants={variants} className="h-12 w-2 bg-white" />
      </motion.div>
    </div>
  );
}
