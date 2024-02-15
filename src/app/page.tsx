'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
export default function Home() {
  const [counter, setCounter] = useState(0)
  useEffect(() => {
    const counter = parseInt(window.localStorage.getItem('counter') || '0', 10);
    setCounter(counter);
  }, []);

  useEffect(() => {
    if (counter !== 0) {
      window.localStorage.setItem('counter', String(counter));
    }
  }, [counter])
  return (
    <motion.div onClick={() => setCounter(counter + 1)} whileTap={{ scale: .9 }} className="flex justify-center items-center min-h-screen flex-col gap-5">
      <Image src={`/coin.svg`} width={500} height={500} alt="coin" draggable={false} className="select-none" />
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-6xl">{counter}</motion.p>
    </motion.div>
  );
}
