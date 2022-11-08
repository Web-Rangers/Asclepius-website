import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import classes from '../../styles/slider.module.css';

export default function ResponsiveSlider() {
	const sliderImage = [
		{ src: '/mobileSlide.png', text: true, id: '1' },
		{ src: '/mobileSlide.png', text: false, id: '2' },
	];

	return (
		<Carousel
			showArrows={false}
			showStatus={false}
			showThumbs={false}
		>
			{sliderImage.map(({ src, id }) => {
				return (
					<>
						<div
							className={classes.slideImgResp}
							key={id}
						>
							<img src={src} />
						</div>
					</>
				);
			})}
		</Carousel>
	);
}
