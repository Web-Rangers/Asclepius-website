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

const Swipper = ({ data, iconBottom, branches, iconTop }) => {
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
		<div className={style.swapperContainer}>
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
							<SwiperSlide
								key={data.id}
								className={style.swiperImg}
							>
								<img
									src={data.url}
									width='100%'
									height={data?.size ? '100%' : '228px'}
									style={{
										display: 'flex',
										objectFit: 'cover',
									}}
								/>
							</SwiperSlide>
					  ))}
			</Swiper>
			{iconBottom && (
				<div
					className={iconTop ? style.arrowContainerTop : style.arrowContainer}
				>
					{iconTop && (
						<>
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
						</>
					)}
					{branches?.length > 4 ? (
						<>
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
						</>
					) : null}
				</div>
			)}
		</div>
	);
};

export default Swipper;
