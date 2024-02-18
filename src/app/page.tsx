"use client"
import Image from "next/image";
import { MouseEvent, useEffect, useState } from "react";
import { AnimatePresence, motion } from 'framer-motion';
import { Dispatch, SetStateAction } from "react";

type Props = {
  lastIncremented: number,
  current: number,
  setCurrent: Dispatch<SetStateAction<LeftCoin>>,
  max: number
}

function increment(props: Props): NodeJS.Timeout {
  const interval = setInterval(() => {
    const start = props.lastIncremented;

    const now = new Date().getTime();
    const elapsedSeconds = Math.floor((now - start) / 3000);
    console.log(elapsedSeconds)
    console.log(props.lastIncremented)
    console.log(props.max)
    if (elapsedSeconds > 0) {
      const newCurrent = props.current + elapsedSeconds;
      props.setCurrent({ current: newCurrent > props.max ? props.max : newCurrent, max: props.max, lastIncremented: new Date().getTime() });
    }
  }, 3000)
  return interval

}

type Number = {
  x: number,
  y: number,
}


type LeftCoin = {
  current: number,
  max: number,
  lastIncremented: number
}
export default function Home() {
  const [counter, setCounter] = useState(0)
  const [name, setName] = useState<string>()
  const [numbers, setNumbers] = useState<Number[]>([])
  const [leftCoins, setLeftCoins] = useState<LeftCoin>(() => {
    const savedCoins = window.localStorage.getItem('leftCoins');
    if (savedCoins) {
      return JSON.parse(savedCoins);
    } else {
      return { current: 1000, max: 1000, lastIncremented: new Date().getTime() };
    }
  });



  useEffect(() => {
    // we use any here because there was ts thinks that window does not have Telegram value
    // const chicaneryWindow: any = window
    // setName(chicaneryWindow.Telegram.WebApp.initDataUnsafe.user.username)

    const counter = parseInt(window.localStorage.getItem('counter') || '0', 10);
    setCounter(counter);
    const intervalId: NodeJS.Timeout = setInterval(() => {
      setNumbers((currentNumbers) => {
        if (currentNumbers.length > 0) {
          return currentNumbers.slice(1);
        }
        return currentNumbers;
      });
    }, 300)

  }, []);
  useEffect(() => {
    window.localStorage.setItem('leftCoins', JSON.stringify(leftCoins));
    const interval = increment({ lastIncremented: leftCoins.lastIncremented, current: leftCoins.current, setCurrent: setLeftCoins, max: leftCoins.max });
    // Clear the interval when the component unmounts or when dependencies change
    return () => clearInterval(interval)
  }, [leftCoins]);


  useEffect(() => {
    if (counter !== 0) {
      window.localStorage.setItem('counter', String(counter));
    }
  }, [counter])


  const handleClick = (e: MouseEvent) => {
    if (leftCoins.current > 0) {
      setCounter((prevCounter) => prevCounter + 1);
      setNumbers((prevNumbers) => [...prevNumbers, { x: e.clientX, y: e.clientY }]);
      setLeftCoins((prevCoins) => {
        return { max: prevCoins.max, current: prevCoins.current - 1, lastIncremented: prevCoins.lastIncremented }
      })
    }
  };
  return (

    <div className="flex justify-center items-center  flex-col gap-5">
      <p className="text-center py-4 px-2 font-bold w-full text-2xl">Welcome{name && ', ' + name}!</p>
      <Image src={'/shadow2.svg'} width={600} height={600} alt="" className="absolute top-0 left-0 " />
      <AnimatePresence>
        {numbers.map((number, i) => {
          return (
            <motion.div
              key={String(i) + JSON.stringify(number)}
              initial={{ opacity: 1, left: number.x, top: number.y }}
              exit={{ opacity: 0, translateY: '-60px' }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="absolute z-[100] text-3xl  select-none pointer-events-none">1</motion.div>
          )
        })}
      </AnimatePresence>
      <motion.div
        onClick={handleClick}
        whileTap={{ scale: .9 }}
        transition={{ duration: 0.3 }}
      >
        <Image src={`/logo.svg`} width={500} height={500} alt="coin" draggable={false} className="select-none border border-white/10 rounded-full drop-shadow-2xl shadow-white" />
      </motion.div>

      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-6xl font-bold">{counter}</motion.p>
      <div className="w-full tracking-wider flex justify-between">
        <div className="">⚡{leftCoins.current}(+1)<span className="text-white/60">/{leftCoins.max}</span></div>
        <div className="text-white/60"><span className="text-white font-bold">+0</span> in sec.</div>
      </div>
      <div className="rounded-full overflow-hidden w-full bg-[#1f1f1f] border border-white/10">
        <motion.div
          animate={{ scaleX: (leftCoins.current / leftCoins.max) }} // This scales the bar from the left
          style={{ transformOrigin: 'left' }} // This sets the origin of the transformation to the left
          id='progress'
          className="bg-gradient-to-tr from-green-500 to-lime-500 w-full h-2 mr-auto rounded-full"
        />
      </div>
    </div >
  );
}