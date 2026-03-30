import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
export default function Loader({
  onFinish
}) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (progress < 100) {
      const timeout = setTimeout(() => setProgress(progress + 2), 18);
      return () => clearTimeout(timeout);
    } else {
      setTimeout(onFinish, 500); // short delay before fade out
    }
  }, [progress, onFinish]);
  return <AnimatePresence>
      {progress < 100 && <motion.div initial={{
      opacity: 1
    }} animate={{
      opacity: 1
    }} exit={{
      opacity: 0
    }} className="fixed inset-0 z-[9999] flex items-center justify-center bg-black" style={{
      background: "#000 url('/assets/generated/hero-temple-shrine.dim_1200x700.jpg') center/cover no-repeat"
    }}>
          <div className="flex flex-col items-center justify-center gap-8">
            <motion.img src="/assets/generated/rmk_entry/kothi_8.png" alt="Hotel Icon" initial={{
          scale: 0.7,
          opacity: 0
        }} animate={{
          scale: 1,
          opacity: 1
        }} transition={{
          duration: 0.7,
          ease: "easeOut"
        }} className="w-24 h-24 drop-shadow-xl rounded-full border-4 border-white/60 bg-white/60" style={{
          objectFit: "cover"
        }} />
            <div className="w-64 h-3 bg-white/30 rounded-full overflow-hidden">
              <motion.div className="h-full bg-primary rounded-full" initial={{
            width: 0
          }} animate={{
            width: `${progress}%`
          }} transition={{
            duration: 0.2,
            ease: "linear"
          }} />
            </div>
            <div className="text-white text-lg font-semibold tracking-widest mt-2">
              Loading...
            </div>
          </div>
        </motion.div>}
    </AnimatePresence>;
}