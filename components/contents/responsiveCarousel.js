import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

export default function ResponsiveSlider() {
	const sliderImage = [
		{ src: '/mobileSlide.png', text: true },
		{ src: '/mobileSlide.png', text: false },
	];

	return (
		<Carousel
			showArrows={false}
			showStatus={false}
			showThumbs={false}
		>
			{sliderImage.map(({ src }) => {
				return (
					<>
						<div>
							<img src={src} />
						</div>
					</>
				);
			})}
		</Carousel>
	);
}
