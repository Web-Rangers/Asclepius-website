import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import classes from '../../styles/slider.module.css';
import style from '../../styles/homePage.module.css';
import { Carousel } from 'react-responsive-carousel';
import Text from '../ui/Text';
import Link from 'next/link';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Button from '../ui/Button';

const MainSlider = ({ type = 'desktop' }) => {
	const sliderImage = [
		{ src: '/slider1.png', text: true },
		{ src: '/SliderBackground.png', text: true },
	];

	return (
		<Carousel
			swipeable={true}
			emulateTouch={true}
			className={classes.carousel}
			showStatus={false}
			centerMode={true}
			showThumbs={false}
			centerSlidePercentage={100}
			renderIndicator={(onClickHandler, isSelected, index, label) => {
				return (
					<span
						onClick={onClickHandler}
						onKeyDown={onClickHandler}
						value={index}
						key={index}
						role='button'
						tabIndex={0}
						aria-label={`${label} ${index + 1}`}
						className={classes.dots}
					>
						{isSelected ? (
							<Image
								key={index}
								src='/sliderdotActive.svg'
								alt='sliderdotActive'
								height=' 14px'
								width='14px'
							/>
						) : (
							<Image
								src='/sliderdot.svg'
								alt='sliderdot'
								height=' 14px'
								width='14px'
							/>
						)}
					</span>
				);
			}}
		>
			<div>
				<div className={classes.slideshow}>
					<div className={classes.slideshowSlider}>
						<div className={classes.slide}>
							{type == 'mobile' ? (
								<>
									<div className={classes.sliderCoverImage}>
										<img
											src={'/slider1.png'}
											alt='sliderimg'
											className={classes.slideImgResp}
										/>
									</div>
								</>
							) : (
								<>
									<div className={classes.sliderTextContent}>
										<div className={classes.content}>
											<div className={classes.medicalCardText}>
												<Text style={classes.medicalCardTitle}>
													შეიძინე ბარათი
													{/* <a className={classes.linkCard}>Card</a> */}
												</Text>
												<span>
													Contrary to popular belief, Lorem Ipsum is not simply
													random text. It has roots in a piece of classical
													Latin literature from 45 BC, making it over 2000 years
													old.
												</span>
											</div>
											<div className={classes.medicalCardsButtons}>
												<Link href='/buyCardPage'>
													<span className={classes.orderBtn}>
														ბარათის შეძენა
													</span>
												</Link>

												<Button
													name='Learn More'
													style={classes.downloadOrderBtn}
												/>
											</div>
										</div>

										<div className={classes.sliderImage}>
											<Image
												src={'/slider1.png'}
												alt='sliderimg'
												height='525px'
												width='742px'
												style={{ position: 'absolute' }}
											/>
										</div>
									</div>
								</>
							)}
						</div>
					</div>
				</div>
			</div>

			<div>
				<div className={classes.slideshow}>
					<div className={classes.slideshowSlider}>
						<div className={classes.slide}>
							{type == 'mobile' ? (
								<>
									<div className={classes.sliderCoverImage}>
										<img
											key={index}
											src={'/slider1.png'}
											alt='sliderimg'
											className={classes.slideImgResp}
										/>
									</div>
								</>
							) : (
								<>
									<div className={classes.sliderTextContent}>
										<div className={classes.content}>
											<div className={classes.medicalCardText}>
												<Text style={classes.medicalCardTitle}>
													შეიძინე ბარათი
													{/* <a className={classes.linkCard}>Card</a> */}
												</Text>
												<span>
													Contrary to popular belief, Lorem Ipsum is not simply
													random text. It has roots in a piece of classical
													Latin literature from 45 BC, making it over 2000 years
													old.
												</span>
											</div>
											<div className={classes.medicalCardsButtons}>
												<Link href='/buyCardPage'>
													<span className={classes.orderBtn}>
														ბარათის შეძენა
													</span>
												</Link>
												<Button
													name='Learn More'
													style={classes.downloadOrderBtn}
												/>
											</div>
										</div>
										<div className={classes.sliderImageTwo}>
											<Image
												src={'/SliderBackground.png'}
												alt='sliderimg'
												height='525px'
												width='742px'
												style={{ position: 'absolute' }}
											/>
										</div>
									</div>
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		</Carousel>
	);
};
export default MainSlider;
