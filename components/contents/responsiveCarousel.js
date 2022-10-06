import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

export default function ResponsiveSlider(){
    const sliderImage = [
        { src: "/sliderImage.png", text: true },
        { src: "/sliderImage.png", text: false },
      ];

    return (
        <Carousel showArrows={false} showStatus={false} showThumbs={false} >
            {
                sliderImage.map(({src})=> {
                    return <>
                        <div>
                            <img src={src} />
                        </div>
                    </>
                })
            }
        </Carousel>
    );
}