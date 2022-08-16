import Slider from "../../components/contents/Slider";
import classes from "../../styles/homePage.module.css";
import ClinicCardList from "../../components/contents/ClinicCardList";
import DoctorCardList from "../../components/contents/DoctorCardList";
import Services from "../../components/contents/Services";
import Benefits from "../../components/contents/Benefits";
import CardPrice from "../../components/contents/CardPrice";

function HomePage() {
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
        <Benefits />
        <CardPrice />
      </div>
    </div>
  );
}

export default HomePage;
