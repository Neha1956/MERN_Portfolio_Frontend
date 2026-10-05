//import React from 'react'
import { motion } from "framer-motion";
function ScrollIndicater() {
  return (
    <motion.button
        type="button"
        onClick={() => document.getElementById("home")?.scrollIntoView({ behavior: "smooth" })}
        aria-label="Back to the home section"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 text-center cursor-pointer"
      >
        <p className="text-xs text-slate-400 mb-2">Back to Home</p>
        <div className="w-6 h-10 border-2 border-cyan-400 rounded-full mx-auto flex items-start justify-center p-2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-2 bg-cyan-400 rounded-full"
          />
        </div>
      </motion.button>
  )
}

export default ScrollIndicater
