'use client'
import React, {useState} from 'react';
import './style.scss';
import Link from "next/link";
import {RxHamburgerMenu} from "react-icons/rx";
import {AiFillSetting} from "react-icons/ai";
import Image from "next/image";
import ThemeSwitcher from "@/custom-components/ui/ThemeSwitcher/ThemeSwitcher";
import {HEADER_LINK} from "@/constants/.names";
import {toast} from "react-toastify";


interface IHeaderProps {
  className?: string,
  srcLogo?: string
}

function Header({srcLogo,...rest}: IHeaderProps) {
  const [visible, setVisible] = useState<boolean>(false)
  return (
    <>
      <header
        {...rest}
      >
        <Link
          href="/"
          className={`logo-container w-[160px] h-[64px] relative`}

        >
          <Image fill src={`${ !srcLogo ? '/logo_white.png' : srcLogo }`}  alt="krop_robots logo-text"/>
        </Link>
        <div className={`tools-container`}>
          <div
            className="tools-wrapper"
            data-menu-visible={visible}
          >
            {HEADER_LINK.map(({content, href}) => (
              <Link href={href} className="header-link" key={content}>{content}</Link>
            ))}
          </div>
          <ThemeSwitcher/>
          <RxHamburgerMenu
            className={`hamburger-menu`}
            onClick={() => setVisible(prevState => !prevState)}
          />
        </div>
      </header>
      <div
        className="tools-drawer"
        data-visible-drawer={visible}
      >
        {HEADER_LINK.map(({content, href}, index) => (
          <Link href={href} key={content}>
            <span onClick={() => toast(`Вкладка ${content} поки що в розробці!`)}>
              {content}
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}

export default Header;