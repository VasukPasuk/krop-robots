'use client'
import React from 'react';
import './style.scss';
import {motion} from "framer-motion";

const SUMO_STAGES_TEXT_DATA = [
  {
    subTitleText: "Реєстрація",
    mainText: "Команди проходять реєстрацію та отримують номери.",
  },
  {
    subTitleText: "Підготовка роботів",
    mainText: "Учасники збирають, налаштовують та тестують своїх роботів.",
  },
  {
    subTitleText: "Жеребкування",
    mainText: "Формується кінцева турнірна таблиця.",
  }
]

function SumoStagesBlock(props) {
  return (
    <div className={`sumo-stages-block`}>
      <h1 className={`sumo-stages-block__title-box`}>
        <motion.span
          initial={{x: -50, opacity: 0}}
          whileInView={{x: 0, opacity: 1}}
          viewport={{once: true}}
          transition={{ ease: "easeOut", duration: 0.5, delay: 0.25 }}
        >
          <span id={`stages-title`}>
            Етапи змагань
          </span>
        </motion.span>
      </h1>
      <ul className={`sumo-stages-block__text-container`}>
        {SUMO_STAGES_TEXT_DATA.map((data, index) => (
          <motion.div
            initial={{x: -50, opacity: 0}}
            whileInView={{x: 0, opacity: 1}}
            viewport={{once: true}}
            transition={{ ease: "easeOut", duration: 0.5, delay: index*0.5 }}
            key={index}
          >
            <li className={`sumo-stages-block__text-container__text-block text-container__text-block-${++index}`} key={data.subTitleText}>
              <div className={`sumo-stages-block__text-container__text-block__number-box`}>
                <div className={`number-box__circle`}>{index}</div>
              </div>
              <div className={`sumo-stages-block__text-container__text-block__text-box`}>
                <div className={`sumo-stages-block__text-container__text-block__text-box__subtitle-box`}>
                  {data.subTitleText}
                </div>
                <div className={`sumo-stages-block__text-container__text-block__text-box__main-text-box`}>
                  {data.mainText}
                </div>
              </div>
            </li>
          </motion.div>
        ))}
      </ul>
    </div>
  );
}

export default SumoStagesBlock;