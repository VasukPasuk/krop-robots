'use client'
import React from 'react';
import './style.scss';
import {PiGearBold} from "react-icons/pi";
import {motion} from "framer-motion";


const TEXT_BLOCK_LI = [
	'Команди можуть відремонтувати своїх роботів під час 30-хвилинної технічної перерви між матчами.',
	'Учасники мають право на оперативну конструктивну зміну робота між раундами (в т.ч. – ремонт, заміну елементів живлення, вибір програми та ін.), якщо внесені зміни не суперечать вимогам змагання.',
	'Час на оперативну конструктивну зміну робота контролюється суддею, але не може перевищувати 1 хвилину.'
];

function TimeToRepair(props) {
	return (
		<section className={`time-to-repair-block`}>
			<div className={`time-to-repair-block__text-block`}>
				<h1 className={`time-to-repair-block__text-block__title-box`}>
					<PiGearBold id={`gear-icon`}/>
					<span>Технічні перерви</span>
				</h1>
				
				<div className={`time-to-repair-block__text-block__subtitle-box`}>
            <span>
              Технічні перерви між матчами
            </span>
				</div>
				
				
				<ul className={`time-to-repair-block__text-block__text-box`}>
					{TEXT_BLOCK_LI.map((text, index) => (
						<motion.li
							initial={{x: -50, opacity: 0}}
							whileInView={{x: 0, opacity: 1}}
							viewport={{once: true}}
							transition={{ease: "easeOut", duration: 1, delay: 0.5 * (++index)}}
							key={text}
						>
							<li>
								{text}
							</li>
						</motion.li>
					))}
				</ul>
			</div>
			<div className={`time-to-repair-block__img-block`}>
				<img
					className={`robot-repairing-image`}
					src={`robot-repairing.png`}
					alt={`repairing robot img`}
				>
				
				</img>
			</div>
		
		</section>
	);
}

export default TimeToRepair;