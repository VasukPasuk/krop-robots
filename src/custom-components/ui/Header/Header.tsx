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
          href={`/${!srcLogo ? "" : "shop/products"}`}
          className={`logo-container w-[160px] h-[64px] relative`}

        >
          <Image fill src={`${ !srcLogo ? '/logo_white.png' : srcLogo }`}  alt="krop_robots logo-text"/>
        </Link>
        <div className={`tools-container`}>
          <div
            className="tools-wrapper"
            data-menu-visible={visible}
          >
            {srcLogo && <Link href={"/"}> Головна </Link>}
            {HEADER_LINK.map(({content, href}, index) => (
              <Link href={href} onClick={index > 0 ? () => toast.warn(`Вкладка ${content} поки що в розробці!`) : undefined} className="header-link" key={content}>{content}</Link>
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
        {srcLogo && <Link href={"/"}> Головна </Link>}
        {HEADER_LINK.map(({content, href}, index) => (
          <Link href={href} key={content} onClick={index > 0 ? () => toast.warn(`Вкладка ${content} поки що в розробці!`) : undefined}>
            {content}
          </Link>
        ))}
      </div>
    </>
  );
}

export default Header;