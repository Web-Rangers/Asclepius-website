import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import classes from '../../styles/slider.module.css';
import { Carousel } from 'react-responsive-carousel';
import Text from '../ui/Text';
import Link from 'next/link';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const MainSlider = ({ type = 'desktop' }) => {
	const sliderImage = [
		{ src: '/slider1.png', text: true },
		{ src: '/SliderBackground.png', text: true },
	];

	return (
		<Carousel
			swipeable={true}
			emulateTouch={true}
			centerMode={true}
			centerSlidePercentage={100}
		>
			<div>
				<Image
					src={'/slider1.png'}
					alt='sliderimg'
					height=' 494px'
					width='742px'
				/>
			</div>
			<div>
				<Image
					src={'/slider1.png'}
					alt='sliderimg'
					height=' 494px'
					width='742px'
				/>
			</div>
			<div>
				<div className={classes.slideshow}>
					<div
						className={classes.slideshowSlider}
						// style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
						onClick={() => druggable()}
					>
						{sliderImage.map((image, index) => (
							<div
								className={classes.slide}
								key={index}
							>
								{type == 'mobile' ? (
									<>
										<div className={classes.sliderCoverImage}>
											<img
												key={index}
												src={image.src}
												alt='sliderimg'
												className={classes.slideImgResp}
											/>
										</div>
									</>
								) : (
									<>
										{image.text ? (
											<div className={classes.sliderTextContent}>
												<div className={classes.content}>
													<Text style={classes.medicalCardTitle}>
														შეიძინე ბარათი
														{/* <a className={classes.linkCard}>Card</a> */}
													</Text>
													<div className={classes.medicalCardText}>
														<Text>
															Contrary to popular belief, Lorem Ipsum is not
															simply random text. It has roots in a piece of
															classical Latin literature from 45 BC, making it
															over 2000 years old.
														</Text>
													</div>
													<div className={classes.medicalCardsButtons}>
														<Link href='/buyCardPage'>
															<a className={classes.orderBtn}>ბარათის შეძენა</a>
														</Link>

														{/* <Button name="Download" style={classes.downloadOrderBtn} /> */}
													</div>
													<Text style={classes.medicalCardText}>
														For more information
														<Link href='/buyCardPage'>
															<a className={classes.linkCard}>
																{' '}
																Learn more{' '}
																<img
																	src='/Vector.svg'
																	alt=''
																	height='11px'
																	width='6px'
																/>
															</a>
														</Link>
													</Text>
												</div>
												<div className={classes.sliderImage}>
													<Image
														key={index}
														src={image.src}
														alt='sliderimg'
														height=' 494px'
														width='742px'
														style={{ position: 'absolute' }}
													/>
												</div>
											</div>
										) : (
											<div className={classes.sliderCoverImage}>
												<Image
													key={index}
													src={image.src}
													alt='sliderimg'
													height=' 494px'
													width='1000px'
													style={{ position: 'absolute' }}
													objectFit='cover'
												/>
											</div>
										)}
									</>
								)}
							</div>
						))}
					</div>
				</div>
			</div>
		</Carousel>
	);
};
export default MainSlider;
