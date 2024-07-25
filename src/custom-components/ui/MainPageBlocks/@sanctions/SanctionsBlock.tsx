'use client'
import React, {useContext} from 'react';
import './style.scss';
import {TbCookieOff} from "react-icons/tb";
import {ThemeContext} from "@/context/ThemeContext";
import {motion} from "framer-motion";

function SanctionsBlock(props) {
  const {theme} = useContext(ThemeContext);
  return (
    <section className={`sanctions-block`}>
      {theme === "dark" && (
        <>
          <img src="ban-hammer.png" alt="ban-hammer"/>)
          <div className="ban-hammer-img__darkening-block"/>
        </>
      )}
      <div className={`sanctions-block__content-wrapper`}>
        <motion.h1
          initial={{y: -50, opacity: 0}}
          whileInView={{y: 0, opacity: 1}}
          transition={{duration: 1, delay: 0.25}}
          viewport={{once: true}}
          className={`sanctions-block__content-wrapper__title-box`}>
          <TbCookieOff/>
          <span>Штрафні санкції</span>
        </motion.h1>
        <ul className={`sanctions-block__content-wrapper__text-blocks-wrapper`}>
          <motion.li
            initial={{x: -50, opacity: 0}}
            whileInView={{x: 0, opacity: 1}}
            transition={{duration: 1, delay: 0.25}}
            viewport={{once: true}}
            className={`text-blocks-wrapper__text-block text-block-i-1`}>
            <h3 className={'text-blocks-wrapper__text-block__subtitle-box'}>
              Невідповідність вимогам
            </h3>
            <span>
              Команда отримує технічну поразку, якщо не усуне невідповідність робота вимогам за 3 хвилини.
            </span>
          </motion.li>
          <motion.li
            initial={{x: 50, opacity: 0}}
            whileInView={{x: 0, opacity: 1}}
            transition={{duration: 1, delay: 0.25}}
            viewport={{once: true}}
            className={`text-blocks-wrapper__text-block text-block-i-2`}>
            <h3 className={'text-blocks-wrapper__text-block__subtitle-box'}>
              Запізнення на матч
            </h3>
            <span>
              Команда, яка не з'явилася на матч, отримує технічну поразку.
            </span>
          </motion.li>
          <motion.li
            initial={{x: -50, opacity: 0}}
            whileInView={{x: 0, opacity: 1}}
            transition={{duration: 1, delay: 0.5}}
            viewport={{once: true}}
            className={`text-blocks-wrapper__text-block text-block-i-3`}>
            <h3 className={'text-blocks-wrapper__text-block__subtitle-box'}>
              Втручання в матч
            </h3>
            <span>
              Учасникам заборонено торкатися роботів, поля та поверхні під час раунду.
            </span>
          </motion.li>
          <motion.li
            initial={{x: 50, opacity: 0}}
            whileInView={{x: 0, opacity: 1}}
            transition={{duration: 1, delay: 0.5}}
            viewport={{once: true}}
            className={`text-blocks-wrapper__text-block text-block-i-4`}>
            <h3 className={'text-blocks-wrapper__text-block__subtitle-box'}>
              Затримка старту
            </h3>
            <span>
              Затримка старту раунду без дозволу судді може призвести до штрафних санкцій.
            </span>
          </motion.li>
        </ul>
      </div>
    </section>
  );
}

export default SanctionsBlock;