import { Swiper, SwiperSlide } from 'swiper/react';
import { useState, useCallback } from 'react';
import style from '../../styles/slider.module.css';
import BranchPageCardItem from '../contents/BranchPageCardItem';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation, Lazy } from 'swiper';

export default function ResponsiveSlider() {
	const [swiperRef, setSwiperRef] = useState();

	const handleLeftClick = useCallback(() => {
		if (!swiperRef) return;
		swiperRef.slidePrev();
	}, [swiperRef]);

	const handleRightClick = useCallback(() => {
		if (!swiperRef) return;
		swiperRef.slideNext();
	}, [swiperRef]);

	const sliderImage = [
		{ src: '/mobileSlide.png', text: true, id: '1' },
		{ src: '/mobileSlide.png', text: false, id: '2' },
		{ src: '/Bg.svg', text: false, id: '3' },
	];

	return (
		<Swiper
			direction='horizontal'
			onSwiper={setSwiperRef}
			slidesPerView={'auto'}
			navigation={{
				prevEl: style.swiperArrowLeft,
				nextEl: style.swiperArrowLeft,
			}}
			thumbs={true}
			freeMode={true}
			loopFillGroupWithBlank={true}
			lazy={true}
			modules={[Pagination, Navigation, Lazy]}
			breakpoints={{
				// when window width is >= 640px
				320: {
					slidesPerView: 1,
					spaceBetween: 12,
				},
				640: {
					slidesPerView: 2,
					spaceBetween: 15,
				},
				// when window width is >= 768px
				768: {
					slidesPerView: 2,
					spaceBetween: 15,
				},
				950: {
					slidesPerView: 3,
					spaceBetween: 15,
				},
				1280: {
					slidesPerView: 4,
					spaceBetween: 30,
				},
			}}
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
						// height={data?.size ? '100%' : '228px'}
						style={{
							display: 'flex',
							objectFit: 'cover',
						}}
					/>
				</SwiperSlide>
			))}
		</Swiper>
		// <Carousel
		// 	showArrows={false}
		// 	showStatus={false}
		// 	showThumbs={false}
		// >
		// 	{sliderImage.map(({ src, id }) => {
		// 		return (
		// 			<div
		// 				className={classes.slideImgResp}
		// 				key={id}
		// 			>
		// 				<img src={src} />
		// 			</div>
		// 		);
		// 	})}
		// </Carousel>
	);
}
