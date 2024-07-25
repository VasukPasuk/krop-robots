import React from 'react';
import  './style.scss';
import {FaFacebookF, FaInstagram, FaTelegramPlane, FaTiktok, FaYoutube} from "react-icons/fa";
import {FaMapLocationDot} from "react-icons/fa6";
import {LuArrowBigDownDash} from "react-icons/lu";
import {FOLLOW_LINKS} from "@/constants/.names";


function Footer() {
  return (
    <footer>
      <div className={`footer-top`}>
        <div className={`footer__location-container`}>
          <div className={`footer__location-block-title footer-block-title`}>
            <span>Місце проведення</span>
            <FaMapLocationDot className={`footer__location-block-icon`}/>
          </div>
          <div className={`footer__location-block-main-text`}>
            <span> м. Кропивницький, вул. Т. Шевченка 1, </span>
            <span> ЦДУ імені В. Винниченка </span>
            <span> спортивна зала, семи  поверхового корпусу </span>
          </div>
        </div>
        <div className={`footer__follow-container`}>
          <div className={`footer__follow-block-title footer-block-title`}>
            <span>Слідкуйте за нами</span>
            <LuArrowBigDownDash />
          </div>
          <div className={`footer__follow-block-icons-box`}>
            <a
              target="_self"
              href={FOLLOW_LINKS.INSTAGRAM_FOLLOW_LINK}>
              <FaInstagram id="instagram-icon" className="contact-icon"/>
            </a>
            <a
              target="_self"
              href={FOLLOW_LINKS.TELEGRAM_FOLLOW_LINK}>
              <FaTelegramPlane id="telegram-icon" className="contact-icon"/>
            </a>
            <a
              target="_self"
              href={FOLLOW_LINKS.FACEBOOK_FOLLOW_LINK}>
              <FaFacebookF id="facebook-icon" className="contact-icon"/>
            </a>
            <a
              target="_self"
              href={FOLLOW_LINKS.YOUTUBE_FOLLOW_LINK}>
              <FaYoutube id="youtube-icon" className="contact-icon"/>
            </a>
            <a
              target="_self"
              href={FOLLOW_LINKS.TIKTOK_FOLLOW_LINK}>
              <FaTiktok id="tiktok-icon" className="contact-icon"/>
            </a>
          </div>
        </div>
      </div>
      <div className={`footer-bottom`}>
        <div>
          © ГО "KROP ROBOTS"
        </div>
      </div>
    </footer>
  );
}

export default Footer;