'use client'
import React, {useEffect, useState} from 'react';
import './style.scss';
import {ImQuotesLeft, ImQuotesRight} from "react-icons/im";
import Image from "next/image";

const MEMBERS_DATA = [
  {
    name: 'Сніжана',
    occupation: 'Ментор',
    quote: 'Привіт! Мене звати Сніжана, і я – менторка команди Krop_Robots у захопливому напрямі Lego Mindstorms EV3. Моя мета – навчати дітей різного віку, допомагаючи їм відкривати для себе дивовижний світ робототехніки.',
    photoSrc: 'swiper-topic-member-photo-1.jpg'
  },
  {
    name: 'Сніжана',
    occupation: 'Менторка Krop_Robots',
    quote: 'Привіт! Мене звати Сніжана, і я – менторка команди Krop_Robots у захопливому напрямі Lego Mindstorms EV3. Моя мета – навчати дітей різного віку, допомагаючи їм відкривати для себе дивовижний світ робототехніки.',
    photoSrc: 'swiper-topic-member-photo-1.jpg'
  },
  {
    name: 'Сніжана',
    occupation: 'Менторка Krop_Robots',
    quote: 'Привіт! Мене звати Сніжана, і я – менторка команди Krop_Robots у захопливому напрямі Lego Mindstorms EV3. Моя мета – навчати дітей різного віку, допомагаючи їм відкривати для себе дивовижний світ робототехніки.',
    photoSrc: 'swiper-topic-member-photo-1.jpg'
  },
  {
    name: 'Сніжана',
    occupation: 'Менторка Krop_Robots',
    quote: 'Привіт! Мене звати Сніжана, і я – менторка команди Krop_Robots у захопливому напрямі Lego Mindstorms EV3. Моя мета – навчати дітей різного віку, допомагаючи їм відкривати для себе дивовижний світ робототехніки.',
    photoSrc: 'swiper-topic-member-photo-1.jpg'
  },
  {
    name: 'Сніжана',
    occupation: 'Менторка Krop_Robots',
    quote: 'Привіт! Мене звати Сніжана, і я – менторка команди Krop_Robots у захопливому напрямі Lego Mindstorms EV3. Моя мета – навчати дітей різного віку, допомагаючи їм відкривати для себе дивовижний світ робототехніки.',
    photoSrc: 'swiper-topic-member-photo-1.jpg'
  },
]

const INTERVAL_LENGTH = 5000;

function MembersBlock(props) {
  const [currentMember, setCurrentMember] = useState(1);
  const bulletHandler = (e) => {
    setCurrentMember(prev => Number(e.target.dataset?.bulletNumber))
  }
  useEffect(() => {
    const swiperInterval = setInterval(() => {
      setCurrentMember(prev => {
        if (prev >= 5) {
          return 1;
        }
        return prev + 1;
      })
    }, INTERVAL_LENGTH)
    return () => {
      clearInterval(swiperInterval)
    }
  }, [currentMember]);
  return (
    <section id="members-block">
      <img id="members-block-bg-image" src="./main-image.jpg" alt="member swiper-box background image"/>
      <div className="members-block-bg-image__shadow-box"/>
      <div className="members-swiper-container">
        <ul
          className="members-swiper-bar"
          style={{transform: `translate(-${(currentMember - 1) * 100}%)`}}
        >
          {MEMBERS_DATA.map(({name, occupation, photoSrc, quote}, index) => (
            <li key={++index} className={`member-swiper-card member-swiper-card-item-${++index}`}>
              <div className="member-data-info__photo-box">
                <Image className="member-data-info__photo-box__photo" src={`/${photoSrc}`} alt={"member image"}
                       width={120} height={120}/>
              </div>
              <div className="member-data-info__name">
                {name}
              </div>
              <div className="member-data-info__occupation">
                {occupation}
              </div>
              <div className="member-data-info__quote-box">
                <ImQuotesLeft className="member-data-info__quote__quote-icon"/>
                <span className="member-data-info__quote">
                  {quote}
                </span>
                <ImQuotesRight className="member-data-info__quote__quote-icon"/>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <ul className="members-swiper-bullets-box">
        {[...Array(5)].map((_, index) => (
          <li
            key={index}
            data-is-active={currentMember === ++index}
            data-bullet-number={index}
            className={`swiper-bullet swiper-bullets-item-${++index}`}
            onClick={bulletHandler}
          >

          </li>
        ))}
      </ul>
    </section>
  );
}

export default MembersBlock;