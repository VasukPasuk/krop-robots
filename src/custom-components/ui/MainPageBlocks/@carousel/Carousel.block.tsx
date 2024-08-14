'use client'
import React, { useState } from 'react';
import './style.scss';
import { FaArrowLeft, FaArrowRight, FaBookReader, FaBriefcase, FaRobot } from "react-icons/fa";
import { CAROUSEL_LENGTH } from "@/constants/.names";
import { motion } from "framer-motion";
import Image from "next/image";
import clsx from "clsx";

function MotionItem(props: { element: "h1" | "p", delay: number, children: React.ReactNode }) {
  if (props.element === "h1") {
    return (
      <motion.h1
        initial={{ x: -50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, delay: props.delay }}
        viewport={{ once: true }}
        className="text-4xl"
      >
        {props.children}
      </motion.h1>
    )
  }
  return (
    <motion.p
      initial={{ x: -50, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ duration: 1, delay: props.delay }}
      viewport={{ once: true }}
      className="text-[1.15rem]"
    >
      {props.children}
    </motion.p>
  )
}

function CarouselBlock() {
  const [currentImage, setCurrentImage] = useState(0);

  const increaseImageNumberHandler = () => {
    setCurrentImage(prev => currentImage === (CAROUSEL_LENGTH - 1) ? 0 : (prev + 1))
  }

  const decreaseImageNumberHandler = () => {
    setCurrentImage(prev => currentImage === 0 ? (CAROUSEL_LENGTH - 1) : (prev - 1))
  }

  return (
    <section className="flex flex-col gap-y-4 md:flex-row items-start justify-center container mx-auto py-16 sm:gap-x-4 ">
      <div className="flex flex-col gap-y-4">
        <MotionItem delay={0.25} element={"h1"}>
          Lorem ipsum dolor sit amet
        </MotionItem>
        <MotionItem element={"p"} delay={0.5}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </MotionItem>
        <MotionItem element={"p"} delay={0.75}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </MotionItem>
      </div>
      <div className={"flex flex-col gap-y-4 w-full"}>
        <div className={"w-full h-[500px] md:h-[380px] md:w-[478px] lg:w-[678px] lg:h-[560px] overflow-hidden"}>
          <div className="w-full h-full grid grid-cols-[100%] grid-rows-[100%] grid-flow-col gap-0" style={{ transform: `translateX(-${currentImage * 100}%)`, transition: 'transform 0.7s' }}>
            {[...Array.from({ length: 9 })].map((_, i) => (
              <Image className={"object-cover"} width={500} height={500} key={i} alt={`Slider image ${i + 1}`} src={`/slider-image${i + 1}.jpg`} />
            ))}
          </div>
        </div>
        <div className="flex flex-row gap-x-2 items-center justify-center">
          {[...Array.from({ length: 9 })].map((_, i) => (
            <div
              key={i}
              onClick={() => setCurrentImage(i)}
              className={clsx("w-4 h-4 cursor-pointer rounded-full bg-neutral-800 transition-colors duration-500 ease-out", {
                "bg-neutral-500": currentImage === i
              })}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default CarouselBlock;
