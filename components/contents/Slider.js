import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import classes from '../../styles/slider.module.css';
import Text from '../ui/Text';
import Button from '../ui/Button';

const Slider = ({ type = 'desktop' }) => {
	const sliderImage = [
		{ src: '/slider1.png', text: true },
		{ src: '/SliderBackground.png', text: true },
	];
	const delay = 155000;

	const [index, setIndex] = useState(0);
	const timeoutRef = useRef(null);

	function resetTimeout() {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
	}

	useEffect(() => {
		resetTimeout();
		timeoutRef.current = setTimeout(
			() =>
				setIndex((prevIndex) =>
					prevIndex === sliderImage.length - 1 ? 0 : prevIndex + 1
				),
			delay
		);
		return () => {
			resetTimeout();
		};
	}, [index]);

	return (
		<div className={classes.slideshow}>
			<div
				className={classes.slideshowSlider}
				style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
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
													Contrary to popular belief, Lorem Ipsum is not simply
													random text. It has roots in a piece of classical
													Latin literature from 45 BC, making it over 2000 years
													old.
												</Text>
											</div>
											<div className={classes.medicalCardsButtons}>
												<Button
													name='ბარათის შეძენა'
													style={classes.orderBtn}
												/>

												{/* <Button name="Download" style={classes.downloadOrderBtn} /> */}
											</div>
											<Text style={classes.medicalCardText}>
												For more information
												<a className={classes.linkCard}> Learn more</a>
												<img
													src='/Vector.svg'
													alt=''
													height='11px'
													width='6px'
												/>
											</Text>
										</div>
										<div className={classes.sliderImage}>
											<Image
												key={index}
												src={image.src}
												alt='sliderimg'
												height=' 525px'
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
											height=' 525px'
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
			<div className={classes.slideshowDots}>
				{sliderImage.map((_, idx) => (
					<div
						key={idx}
						className={classes.slideshowDot}
						onClick={() => {
							setIndex(idx);
						}}
					>
						{index === idx ? (
							<Image
								src='/sliderdotActive.svg'
								alt='sliderdotActive'
								height=' 16px'
								width='16px'
							/>
						) : (
							<Image
								src='/sliderdot.svg'
								alt='sliderdot'
								height=' 16px'
								width='16px'
								className={classes.dot}
							/>
						)}
					</div>
				))}
			</div>
		</div>
	);
};
export default Slider;
