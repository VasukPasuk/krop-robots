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

  return (
    <section className="flex flex-col gap-y-8 lg:flex-row items-stretch w-full container justify-center my-24 sm:gap-x-8 mx-auto">
      <div className="flex flex-col w-full lg:w-[60%] gap-y-8">
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
      <div className={"w-full lg:w-[40%] overflow-hidden rounded"}>
        <img loading={"lazy"} className={"object-cover w-full h-full hover:scale-110 transition-transform duration-1000 ease"}
             src={"/slider-image2.jpg"} alt={"Slider image"}/>
      </div>

    </section>
  )
}

export default CarouselBlock;
