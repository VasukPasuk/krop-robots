'use client'
import React, {useContext} from 'react';
import './style.scss';
import {motion} from "framer-motion";
import {ThemeContext} from "@/context/ThemeContext";

function IntroductionBlock() {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <section id={`introduction-block`}>
        <div className={`image-slogan-block`}>
          <AppearAnimationWrapper h={1} delay={0.25} duration={1}>
            <h1>KROP_ROBOTS</h1>
          </AppearAnimationWrapper>
          <AppearAnimationWrapper h={3} delay={0.75} duration={1}>
            <h3>Дивовижна STEM-освіта <br/> без обмежень</h3>
          </AppearAnimationWrapper>
          <img src="./main-preview-photo.JPG" alt=""/>
          <div
            className={`bg-blur-item`}
            data-blur-mode={theme === "dark" ? 'dark-blur' : 'light-blur'}
          />
        </div>
      </section>
    </>
  
  );
}

function AppearAnimationWrapper(props) {
  const {h, delay, duration, children} = props;
  if (h === 3) {
    return (
      <motion.h3
        initial={{x: -50, opacity: 0}}
        whileInView={{x: 0, opacity: 1}}
        viewport={{once: true}}
        transition={{ ease: "easeOut", duration: duration, delay: delay }}
      >
        {children}
      </motion.h3>
    )
  }
  return (
    <motion.h1
      initial={{x: -50, opacity: 0}}
      whileInView={{x: 0, opacity: 1}}
      viewport={{once: true}}
      transition={{ ease: "easeOut", duration: duration, delay: delay }}
    >
      {children}
    </motion.h1>
  )
}

export default IntroductionBlock;