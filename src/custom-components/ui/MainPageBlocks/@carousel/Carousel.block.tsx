'use client'
import React, {useState} from 'react';
import './style.scss';
import {FaArrowLeft, FaArrowRight, FaBookReader, FaBriefcase, FaRobot} from "react-icons/fa";
import {CAROUSEL_LENGTH} from "@/constants/.names";
import {motion} from "framer-motion";


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


function CarouselBlock() {

  const [currentImage, setCurrentImage] = useState(0);
  const increaseImageNumberHandler = () => {
    setCurrentImage(prev => currentImage === (CAROUSEL_LENGTH - 1) ? 0 : (prev + 1))
  }
  const decreaseImageNumberHandler = () => {
    setCurrentImage(prev => currentImage === 0 ? (CAROUSEL_LENGTH - 1) : (prev - 1))
  }
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentImage(cur_img => cur_img === (CAROUSEL_LENGTH - 1) ? 0 : cur_img + 1)
  //   }, [IMAGE_SWITCHING_DURATION])
  //   return () => {
  //     clearInterval(interval)
  //   }
  // }, [currentImage]);
  return (
    <section id="public-organization-description">
      <div className="description__title-box">
        <motion.h1
          initial={{x: -50, opacity: 0}}
          whileInView={{x: 0, opacity: 1}}
          transition={{duration: 1, delay: 0.25}}
          viewport={{once: true}}
          className="description__title"
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
        <div
          className="images-track"
          style={{
            transform: `translate(-${currentImage * 100}%)`
          }}
        >
          {[...new Array(CAROUSEL_LENGTH)].map((_, i) => (
            <img loading={"lazy"} src={`/slider-image${++i}.jpg`} alt={`slider image ${++i}`} key={i}/>
          ))}
        </div>
        <div className="swiper-control-footer">
          <div
            className="switch-image-button"
            onClick={decreaseImageNumberHandler}
          >
            <FaArrowLeft/>
          </div>
          <div
            className="switch-image-button"
            onClick={increaseImageNumberHandler}
          >
            <FaArrowRight/>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CarouselBlock;