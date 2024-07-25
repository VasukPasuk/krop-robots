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
        <h1 className={`sanctions-block__content-wrapper__title-box`}>
          <TbCookieOff />
          <span>Штрафні санкції</span>
        </h1>
        <ul className={`sanctions-block__content-wrapper__text-blocks-wrapper`}>
          <li className={`text-blocks-wrapper__text-block text-block-i-1`}>
            <h3 className={'text-blocks-wrapper__text-block__subtitle-box'}>
              Невідповідність вимогам
            </h3>
            <span>
              Команда отримує технічну поразку, якщо не усуне невідповідність робота вимогам за 3 хвилини.
            </span>
          </li>
          <li className={`text-blocks-wrapper__text-block text-block-i-2`}>
            <h3 className={'text-blocks-wrapper__text-block__subtitle-box'}>
              Запізнення на матч
            </h3>
            <span>
              Команда, яка не з'явилася на матч, отримує технічну поразку.
            </span>
          </li>
          <li className={`text-blocks-wrapper__text-block text-block-i-3`}>
            <h3 className={'text-blocks-wrapper__text-block__subtitle-box'}>
              Втручання в матч
            </h3>
            <span>
              Учасникам заборонено торкатися роботів, поля та поверхні під час раунду.
            </span>
          </li>
          <li className={`text-blocks-wrapper__text-block text-block-i-4`}>
            <h3 className={'text-blocks-wrapper__text-block__subtitle-box'}>
              Затримка старту
            </h3>
            <span>
              Затримка старту раунду без дозволу судді може призвести до штрафних санкцій.
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default SanctionsBlock;