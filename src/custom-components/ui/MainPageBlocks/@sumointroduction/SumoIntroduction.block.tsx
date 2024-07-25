'use client'
import React, {useContext} from 'react';
import './style.scss';
import {motion} from "framer-motion";
import {ThemeContext} from "@/context/ThemeContext";

function SumoIntroductionBlock(props) {
  const {theme} = useContext(ThemeContext)
  return (
    <section className={`sumo-introduction-block`}>
      <div className={`sumo-introduction-block-text-wrapper`}>
        <div className={`sumo-introduction-title-box`}>
          <motion.h1
            initial={{x: -50, opacity: 0}}
            whileInView={{x: 0, opacity: 1}}
            viewport={{once: true}}
            transition={{ease: "easeOut", duration: 0.75, delay: 0.25}}
          >
            <h1 className={`sumo-introduction-title s-i-title1`}>
              Сумо
            </h1>
          </motion.h1>
          
          <motion.h2
            initial={{x: -50, opacity: 0}}
            whileInView={{x: 0, opacity: 1}}
            viewport={{once: true}}
            transition={{ease: "easeOut", duration: 0.75, delay: 0.5}}
          >
            <h2 className={`sumo-introduction-title s-i-title2`}>
              Автономні роботи
            </h2>
          </motion.h2>
        
        </div>
        <motion.div
          initial={{x: -50, opacity: 0}}
          whileInView={{x: 0, opacity: 1}}
          viewport={{once: true}}
          transition={{ease: "easeInOut", duration: 0.75, delay: 0.75}}
        >
          <div className={`sumo-introduction-main-text`}>
            У цьому змаганні учасникам необхідно підготувати робота, здатного найбільш ефективно виштовхнути
            робота-противника за межі чорної лінії рингу.
          </div>
        </motion.div>
      
      </div>
      <div className="sumo-introduction-block-img-wrapper">
        <motion.div
          initial={{opacity: 0}}
          whileInView={{opacity: 1}}
          viewport={{once: true}}
          transition={{ease: "linear", duration: 0.75, delay: 1}}
        >
          <div className={`sumo-introduction-block-img-box`}>
            {theme === "dark" ? (
                <>
                  <img src="./robot-fighting-3-removebg-preview.png" alt="robot fight image"/>
                  {/*<div className={`sumo-introduction-img-shadow`}/>*/}
                </>
              )
              :
              (
                <>
                  <img src="./robot-fighting-white-bg-black-figure-removebg-preview.png" alt="robot fight image"/>
                </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default SumoIntroductionBlock;