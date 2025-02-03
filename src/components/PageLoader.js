"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function PageLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [reachedComplete, setReachedComplete] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100 && !reachedComplete) {
          clearInterval(interval);
          setReachedComplete(true);
          setTimeout(() => {
            setIsVisible(false);
          }, 30000);
          return 100;
        }
        return oldProgress < 100 ? oldProgress + 0.5 : 100;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete, reachedComplete]);

  return (
    <motion.div 
      className="fixed top-0 left-0 w-full h-full bg-black"
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 2 }}
      onAnimationComplete={() => !isVisible && onComplete()}
    >
      <motion.div
        className="absolute bottom-8 left-8 text-white text-[8rem] font-bold"
        animate={{ 
          opacity: progress / 100  // This will gradually increase from 0 to 1
        }}
        transition={{ duration: 0.5 }}
      >
        {Math.floor(progress) === 100 ? '100' : `${Math.floor(progress)}%`}
      </motion.div>
      {progress >= 100 && (
        <motion.div
          className="absolute top-20 left-32"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Image
            src="/site-logo-light.png"
            alt="Seight Logo"
            width={80}
            height={40}
            priority
          />
        </motion.div>
      )}
    </motion.div>
  );
}
