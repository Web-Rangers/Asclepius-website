import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import style from '../../styles/slider.module.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import './styles.css';

// import required modules
import { Pagination } from 'swiper';

export default function ResponsiveSlider() {
	const sliderImage = [
		{ src: '/Bg1.png', text: true, id: '1' },
		{ src: '/Bg.png', text: false, id: '2' },
		{ src: '/Bg1.png', text: false, id: '3' },
	];

	return (
		<>
			<Swiper
				pagination={{
					dynamicBullets: true,
				}}
				modules={[Pagination]}
				className={style.branchMobileSize}
			>
				{sliderImage.map((data) => (
					<SwiperSlide
						key={data.id}
						className={style.swiperImg}
					>
						<img
							src={data.src}
							width='100%'
							height={'100%'}
							style={{
								display: 'flex',
								objectFit: 'cover',
							}}
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</>
	);
}
