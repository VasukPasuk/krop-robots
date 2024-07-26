'use client'
import React from 'react';
import './style.scss';
import {SUMO_DESCRIPTION_ROUTE} from "@/constants/.routes";
import {FaLink} from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

function LetsViewMoreAboutSumoBlock() {
  return (
    <section id="view-more-about-sumo-block">
      <div className="decoration-circle-and-image--container">
        <div className="decoration-circle-image"/>
        <div className="decoration-circle-image"/>
        <Image
          src="/view-more-about-robot-sumo-image-removebg-preview.png"
          alt="boy is controlling his mini-robot with phone"
          width={400}
          height={400}
        />
      </div>
      <div className="title-text-and-button--container">
        <h1 className="view-more--title-text">
          Хочеш знати більше про змагання роботів?
        </h1>
        <h2 className="view-more--title-text">
          Перейди за посиланням до інструкції боїв роботів
        </h2>
        <Link className="view-more-link-button" href={SUMO_DESCRIPTION_ROUTE}>
          <span>
            Дізнатися більше
          </span>
          <FaLink className="view-more-link-button--icon"/>
        </Link>
      </div>
    </section>
  );
}

export default LetsViewMoreAboutSumoBlock;