"use client"
import React from 'react';
import {FaFacebookF, FaInstagram, FaTelegramPlane, FaTiktok, FaYoutube} from "react-icons/fa";
import {FaMapLocationDot} from "react-icons/fa6";
import {LuArrowBigDownDash} from "react-icons/lu";
import {FOLLOW_LINKS, HEADER_LINK, HEADER_LINKS} from "@/constants/.names";
import Link from "next/link";
import {toast} from "react-toastify";
import {NAVIGATION_LINKS} from "@/constants/constants";


function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center gap-y-4 p-4 bg-blue-950 text-white font-light">
      <div className="flex flex-row justify-between items-start p-2 container max-w-[1200px]">
        <div className="flex flex-col items-start gap-y-4">
          <div className="text-xl">
            Корисні посилання
          </div>
          <ul className="flex flex-col items-start gap-y-3 text-white/80">
            {Object.values(NAVIGATION_LINKS).map((link) => (
              <li>
                <Link
                  onClick={link.exist ? () => toast.warn(`Вкладка ${link.content} поки що в розробці!`) : undefined}
                  href={link.href}
                  key={link.content}
                >
                  {link.content}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-y-4">
          <div className="text-xl">
            Слідкуйте за нами
          </div>
          <ul className="flex flex-row items-start gap-x-3 text-white/80">
            <Link
              target="_self"
              href={FOLLOW_LINKS.INSTAGRAM_FOLLOW_LINK}>
              <FaInstagram id="instagram-icon" className="text-2xl"/>
            </Link>
            <Link
              target="_self"
              href={FOLLOW_LINKS.TELEGRAM_FOLLOW_LINK}>
              <FaTelegramPlane id="telegram-icon" className="text-2xl"/>
            </Link>
            <Link
              target="_self"
              href={FOLLOW_LINKS.FACEBOOK_FOLLOW_LINK}>
              <FaFacebookF id="facebook-icon" className="text-2xl"/>
            </Link>
            <Link
              target="_self"
              href={FOLLOW_LINKS.YOUTUBE_FOLLOW_LINK}>
              <FaYoutube id="youtube-icon" className="text-2xl"/>
            </Link>
            <Link
              target="_self"
              href={FOLLOW_LINKS.TIKTOK_FOLLOW_LINK}>
              <FaTiktok id="tiktok-icon" className="text-2xl"/>
            </Link>
          </ul>
        </div>
      </div>
      <div className="w-2/3 h-[1px] bg-neutral-300"/>
      <div className="flex justify-center items-center text-sm">
        © ГО "КРОП РОБОТС", Всі Права Захищені
      </div>
    </footer>
  );
}

export default Footer;


{/*<div className={`footer-top`}>*/
}
{/*  <div className={`footer__location-container`}>*/
}
{/*    <div className={`footer__location-block-title footer-block-title`}>*/
}
{/*      <span>Місце проведення</span>*/
}
{/*      <FaMapLocationDot className={`footer__location-block-icon`}/>*/
}
{/*    </div>*/
}
{/*    <div className={`footer__location-block-main-text`}>*/
}
{/*      <span> м. Кропивницький, вул. Т. Шевченка 1, </span>*/
}
{/*      <span> ЦДУ імені В. Винниченка </span>*/
}
{/*      <span> спортивна зала, семи  поверхового корпусу </span>*/
}
{/*    </div>*/
}
{/*  </div>*/
}
{/*  <div className={`footer__follow-container`}>*/
}
{/*    <div className={`footer__follow-block-title footer-block-title`}>*/
}
{/*      <span>Слідкуйте за нами</span>*/
}
{/*      <LuArrowBigDownDash />*/
}
{/*    </div>*/
}
{/*
{/*  </div>*/
}
{/*</div>*/
}
{/*<div className={`footer-bottom`}>*/
}
{/*  <div>*/
}
{/*    © ГО "KROP ROBOTS"*/
}
{/*  </div>*/
}
{/*</div>*/
}
