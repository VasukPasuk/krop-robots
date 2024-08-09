"use client"
import React from 'react';
import Image from 'next/image';
import {motion} from "framer-motion";
import {Button} from "@mui/material";
import Link from "next/link";
import {useRouter} from "next/navigation";

function ShopMainPage() {

  const router = useRouter()

  const animateParams = (delay: number, x: number = -50) => {
    return {
      initial: {x: x, opacity: 0},
      whileInView: {x: 0, opacity: 1},
      viewport: {once: true},
      transition: {ease: "easeOut", duration: 1, delay: delay},
    }
  }

  const onClickButtonHandler = () => {
    router.push("/shop/products")
  }

  return (
    <div className="flex mt-16 min-h-dvh w-full">
      <div className="flex relative flex-row max-w-screen-xl items-center justify-center mx-auto w-full ">
        <div className="flex flex-col items-start justify-center h-full z-50 w-3/4 gap-y-8">
          <motion.h5 {...animateParams(0.5)} className="text-5xl font-extrabold">
            Lorem ipsum odor amet, consectetuer adipiscing elit. Ridiculus maecenas.
          </motion.h5>
          <motion.h6 {...animateParams(0.75)} className="text-xl">
            Lorem ipsum odor amet, consectetuer adipiscing elit.Tortor ante scelerisque leo curabitur lectus bibendum
            orci praesent, consectetuer adipiscing elit ipsum odor amet.
          </motion.h6>
          <motion.span {...animateParams(1)}>
            <Button className="normal-case" size={"large"} variant="contained" color="secondary" onClick={onClickButtonHandler}>
                Перейти до товарів
            </Button>
          </motion.span>

        </div>
        <motion.div {...animateParams(1, 50)} className="flex relative w-full h-2/3">
          <Image style={{objectFit: "cover"}} className="hover:scale-110 transition duration-1000" src={"/krop-robots-shop-landing-image.jpeg"} alt={"Preview image"} fill/>
        </motion.div>
      </div>
    </div>
  )
}

export default ShopMainPage