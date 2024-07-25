'use client'
import React, {useState} from 'react';
import './style.scss';
import Link from "next/link";
import {RxHamburgerMenu} from "react-icons/rx";
import {AiFillSetting} from "react-icons/ai";
import Logo from "@/custom-components/logo/Logo";
import Image from "next/image";
import ThemeSwitcher from "@/custom-components/ui/ThemeSwitcher/ThemeSwitcher";


const HEADER_LINK = [
  {
    href: "/shop",
    content: "Krop Robots Shop"
  },
  {
    href: "/news",
    content: "Новини"
  },
  {
    href: "/directions",
    content: "Напрями"
  },
  {
    href: "/about",
    content: "Про нас"
  },
  {
    href: "/contacts",
    content: "Контакти"
  },
]

function Header() {
  const [visible, setVisible] = useState<boolean>(false)
  return (
    <>
      <header
        id="header"
        // data-set-pos={currentPath === 'robot-sumo-full' ? 'fixed' : 'none'}
        // style={{background: (scrollPosition < 500 && theme === "light" && ['', 'home'].includes(currentPath)) ? 'transparent' : ''}}
      >
        <Link
          href="/"
          className={`logo-container`}
        >
          <Logo/>
          <Image src="/text_white.png" width={100} height={50} alt="krop_robots logo-text"/>
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
          {/*<AiFillSetting*/}
          {/*  id="settings-icon"*/}
          {/*/>*/}
        </div>
      </header>
      <div
        className="tools-drawer"
        data-visible-drawer={visible}
      >
        {HEADER_LINK.map(({content, href}) => (
          <Link href={href} key={content}>{content}</Link>
        ))}
      </div>
    </>
  );
}

export default Header;