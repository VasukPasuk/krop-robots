// src/CarouselBlock.js
'use client'
import React, {useState} from 'react';
import './style.scss';
import {FaArrowLeft, FaArrowRight, FaBookReader, FaBriefcase, FaRobot} from "react-icons/fa";
import {AnimatePresence, motion} from "framer-motion";

const TAGS_DATA = [
  {
    text: "Проєкт Krop_Robots засновано в 2023 році, для популяризації STEM-освіти для молоді.",
    icon: <FaBookReader className={`tag-icon`}/>
  },
  {
    text: 'Сьогодні ми надаємо безкоштовні уроки, яких потребують роботодавці та сучасний бізнес - жодної сухої теорії та "Води".',
    icon: <FaBriefcase className={`tag-icon`}/>
  },
  {
    text: "Krop_Robots - це комфортне середовище, в якому ваші діти зможуть себе відчути справжніми робототехніками.",
    icon: <FaRobot className={`tag-icon`}/>
  }
]

const images = [
  '/slider-image1.jpg',
  '/slider-image2.jpg',
  '/slider-image3.jpg',
  '/slider-image4.jpg',
  '/slider-image5.jpg',
];

function CarouselBlock() {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((currentImage + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((currentImage - 1 + images.length) % images.length);
  };

  return (
    <section id="public-organization-description">
      <div className="description__title-box">
        <motion.h1
          initial={{x: -50, opacity: 0}}
          whileInView={{x: 0, opacity: 1}}
          transition={{duration: 1, delay: 0.25}}
          viewport={{once: true}}
        >
          Lorem ipsum dolor sit amet
        </motion.h1>
      </div>
      <div className="description__content-box">
        <motion.p
          initial={{x: -50, opacity: 0}}
          whileInView={{x: 0, opacity: 1}}
          transition={{duration: 1, delay: 0.5}}
          viewport={{once: true}}
          className="paragraph-description"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </motion.p>
        <motion.p
          initial={{x: -50, opacity: 0}}
          whileInView={{x: 0, opacity: 1}}
          transition={{duration: 1, delay: 0.75}}
          viewport={{once: true}}
          className="paragraph-description"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </motion.p>
      </div>
      <div id="carousel-images-container">
        <div className="images-track">
          <AnimatePresence initial={false}>
            <motion.img
              key={images[currentImage]}
              src={images[currentImage]}
              alt={`slider image ${currentImage + 1}`}
              className="swiper-image"
              initial={{opacity: 0, x: -100}}
              animate={{opacity: 1, x: 0}}
              exit={{opacity: 0, x: 100}}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20
              }}
            />
          </AnimatePresence>

        </div>
        <div className="swiper-control-footer">
          <div className="switch-image-button switch-to-left-button" onClick={prevImage}>
            <FaArrowLeft/>
          </div>
          <div className="switch-image-button switch-to-right-button" onClick={nextImage}>
            <FaArrowRight/>
          </div>
        </div>

      </div>
    </section>
  );
}

export default CarouselBlock;
