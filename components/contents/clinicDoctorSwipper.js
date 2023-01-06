import { useState, useEffect, useCallback } from 'react';
import ClinicCardItem from './ClinicCardItem';
import DoctorCardItem from './DoctorCardItem';
import classes from '../../styles/homePage.module.css';
import style from '../../styles/slider.module.css';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation, Lazy } from 'swiper';

const ClinicDoctorSwipper = ({ clinicsData, doctorsData }) => {
	const [swiperRef, setSwiperRef] = useState();

	const handleLeftClick = useCallback(() => {
		if (!swiperRef) return;
		swiperRef.slidePrev();
	}, [swiperRef]);

	const handleRightClick = useCallback(() => {
		if (!swiperRef) return;
		swiperRef.slideNext();
	}, [swiperRef]);

	return (
		<div className={classes.clinicCardList}>
			<Swiper
				direction='horizontal'
				onSwiper={setSwiperRef}
				id='branchMobileSize'
				slidesPerView={'auto'}
				navigation={{
					prevEl: style.swiperArrowLeft,
					nextEl: style.swiperArrowLeft,
				}}
				freeMode={true}
				loopFillGroupWithBlank={true}
				lazy={true}
				modules={[Pagination, Navigation, Lazy]}
				breakpoints={{
					// when window width is >= 640px
					320: {
						slidesPerView: 1.3,
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
			>
				{clinicsData?.map((item, i) => (
					<SwiperSlide key={clinicsData.id}>
						<ClinicCardItem
							key={item?.id + i}
							id={item.id}
							src={item.logoUrl || '/testClinic.png'}
							clinicName={item.displayName}
							clinicAddress={item.address.address}
							rating={''}
							data={item}
						/>
					</SwiperSlide>
				))}
				{Array.isArray(doctorsData) &&
					doctorsData?.map((item) => (
						<SwiperSlide key={doctorsData.id}>
							<DoctorCardItem
								id={item?.id}
								key={item?.id}
								rating={item?.rating}
								src={item?.pictureUrl}
								doctorName={item?.firstName}
								speciality={item?.professions && item?.professions[0]?.name}
							/>
						</SwiperSlide>
					))}
			</Swiper>
			<img
				src='/swiperLeftArrow.svg'
				alt='arrowLeft'
				className={classes.clinicSwiperArrowLeft}
				onClick={handleLeftClick}
			/>
			<img
				src='/swiperarrow.svg'
				alt='arrowRight'
				className={classes.clinicSwiperArrowRight}
				onClick={handleRightClick}
			/>
		</div>
	);
};

export default ClinicDoctorSwipper;
