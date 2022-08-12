import { useState, useRef, useEffect } from "react";
import classes from "../../styles/slider.module.css";

const Slider = () => {
  const sliderImage = ["homepageslider1.png", "homepageslider2.png"];
  const delay = 5500;

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
          <img
            className={classes.slide}
            key={index}
            src={image}
            alt="sliderimg"
          />
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
              <img
                src="sliderdotActive.svg"
                alt="sliderdotActive"
                height=" 16px"
                width="16px"
              />
            ) : (
              <img
                src="sliderdot.svg"
                alt="sliderdot"
                height=" 15px"
                width="15px"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Slider;
