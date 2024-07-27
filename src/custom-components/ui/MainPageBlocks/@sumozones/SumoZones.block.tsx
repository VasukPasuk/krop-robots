'use client'
import React from 'react';
import './style.scss';
import {motion} from "framer-motion";
import {IoMegaphone, IoPeopleSharp, IoShieldCheckmark} from "react-icons/io5";
import {FaCode, FaHandsHelping} from "react-icons/fa";

import {AiOutlineFieldTime} from "react-icons/ai";

const CARDS_DATA = [
  {
    text: "Турнір проводиться у спеціально відведеній зоні змагань, де мають знаходиться тільки учасники змагань, судді та помічники суддів. Тренери, батьки учасників та інші особи в цю зону не допускаються.",
    icon: <IoPeopleSharp/>,
    title: 'Обмеження'
  },
  {
    text: <> Піт-зони [Зони для підготовки] <br/> Зона карантину [Зона для перевірки та розміщення роботів] <br/> Зона
      проведення матчів.</>,
    icon: <IoMegaphone/>,
    title: 'Категорії зон'
  },
  {
    text: "Зона інспекції, де учасники передають суддям своїх роботів на перевірку відповідності останніх вимог змагань(конструктивні, габаритні, вагові) та залишають їх у цій зоні до початку проведення матча.",
    icon: <IoShieldCheckmark/>,
    title: 'Зона карантину'
  },
  {
    text: "В зону карантину та в зону проведення матчів учаснику дозволено заходити лише тільки з дозволу суддів чи помічників суддів",
    icon: <FaHandsHelping/>,
    title: 'Проходження'
  },
  {
    text: "Основна зона перебування учасників змагання, де вони можуть побудувати, змінити конструкцію, налаштування свого робота, запрограмувати та протестувати йогою",
    icon: <FaCode/>,
    title: 'Піт-зона'
  },
  {
    text: "Зона проведення матчів включає поля проведення раундів між двома командами.",
    icon: <AiOutlineFieldTime/>,
    title: 'Матчі'
  },
]

function SumoZonesBlock(props) {

  return (
    <section className={`sumo-zones-block`}>
      <div className={`sumo-zones-title`}>
        <span>
          Зони змагання
        </span>
      </div>
      <ul className={`sumo-zones-cards-wrapper`}>
        {CARDS_DATA.map((data, index) => (
          <motion.li
            initial={{y: -25, opacity: 0}}
            whileInView={{y: 0, opacity: 1}}
            viewport={{once: true}}
            transition={{ease: "easeOut", duration: 0.5, delay: 0.25 * (++index)}}
            key={index}
          >
            <li className={`sumo-zones-card zone-card${++index}`}>
              <div className={`card-icon-box`}>
                {data.icon}
              </div>
              <div className="main-text-box">
                <div className="main-text-box__title-text-box">
                  {data.title}
                </div>
                <div className="main-text-box__sub-text-box">
                  {data.text}
                </div>
              </div>

            </li>
          </motion.li>

        ))}
      </ul>
    </section>
  );
}

export default SumoZonesBlock;