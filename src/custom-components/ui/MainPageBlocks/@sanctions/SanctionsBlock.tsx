'use client'
import React, {useContext} from 'react';
import './style.scss';
import {TbCookieOff} from "react-icons/tb";
import {ThemeContext} from "@/context/ThemeContext";
import {motion} from "framer-motion";
import {SANCTION_BLOCK_DATA} from "@/constants/.blocks.data";



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

          {SANCTION_BLOCK_DATA.map(({title, body}, index) => (
            <motion.li
              initial={{x: index % 2 == 0 ? -50 : 50, opacity: 0}}
              whileInView={{x: 0, opacity: 1}}
              transition={{duration: 1, delay: index < 2 ? 0.25 : 0.5}}
              viewport={{once: true}}
              className={`text-blocks-wrapper__text-block text-block-i-${++index}`}
              key={title}
            >
              <h3 className={'text-blocks-wrapper__text-block__subtitle-box'}>
                {title}
              </h3>
              <span>
                {body}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default SanctionsBlock;