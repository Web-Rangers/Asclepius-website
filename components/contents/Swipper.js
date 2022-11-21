import { Swiper, SwiperSlide } from 'swiper/react';
import { useState, useCallback } from 'react';
import style from '../../styles/slider.module.css';
import BranchPageCardItem from './BranchPageCardItem';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation, Lazy } from 'swiper';

export const Swipper = ({ data, iconBottom, branch = false, branches }) => {
	const [swiperRef, setSwiperRef] = useState();

	console.log('gaer', data);

	const handleLeftClick = useCallback(() => {
		if (!swiperRef) return;
		swiperRef.slidePrev();
	}, [swiperRef]);

	const handleRightClick = useCallback(() => {
		if (!swiperRef) return;
		swiperRef.slideNext();
	}, [swiperRef]);

	return (
		<div>
			<Swiper
				direction='horizontal'
				onSwiper={setSwiperRef}
				slidesPerView={'auto'}
				// navigation={{
				// 	prevEl: prevRef.current ? prevRef.current : undefined,
				// 	nextEl: nextRef.current ? nextRef.current : undefined,
				// }}
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
						slidesPerView: 3,
						spaceBetween: 15,
					},
					1280: {
						slidesPerView: 4,
						spaceBetween: 30,
					},
				}}
				className='offerSlider'
			>
				{branches?.length > 0
					? branches.map((data) => (
							<SwiperSlide key={data.id}>
								<BranchPageCardItem
									key={data?.id}
									props={data}
								/>
							</SwiperSlide>
					  ))
					: data.map((data) => (
							<SwiperSlide key={data.id}>
								<img
									src={data.url}
									width=' 100%'
									height='228px'
									style={{
										display: 'flex',
										objectFit: 'cover',
										marginTop: '24px',
									}}
								/>
							</SwiperSlide>
					  ))}
			</Swiper>
			{iconBottom && (
				<div className={style.arrowContainer}>
					<img
						src='/Arrow - Left.svg'
						alt='arrowLeft'
						width='12.5px'
						height='15px'
						onClick={handleLeftClick}
					/>
					<img
						src='/Arrow - Right.svg'
						alt='arrowRight'
						width='12.5px'
						height='15px'
						onClick={handleRightClick}
					/>
				</div>
			)}
		</div>
	);
};
