import Slider from "../contents/Slider";
import classes from "../../styles/homePage.module.css";
import ClinicCardList from "../contents/ClinicCardList";
import DoctorCardList from "./DoctorCardList";
import Services from "./Services";

const HomePage = () => {
  const firstPartImgArray = [
    "firstPartImg1.png",
    "firstPartImg2.png",
    "firstPartImg3.png",
  ];

  return (
    <div>
      <div className={classes.firstPart}>
        <Slider />

        <div className={classes.firstPartImg}>
          {firstPartImgArray.map((image, index) => (
            <img
              className={classes.slide}
              key={index}
              src={image}
              alt="firstPartimg"
            />
          ))}
        </div>
        <ClinicCardList />
        <DoctorCardList />
        <Services />
      </div>
    </div>
  );
};

export default HomePage;
