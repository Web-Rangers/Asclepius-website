import Slider from "../../components/contents/Slider";
import classes from "../../styles/homePage.module.css";
import ClinicCardList from "../../components/contents/ClinicCardList";
import DoctorCardList from "../../components/contents/DoctorCardList";
import Services from "../../components/contents/Services";
import Benefits from "../../components/contents/Benefits";
import CardPrice from "../../components/contents/CardPrice";
import Text from "../../components/ui/Text";
import Button from "../../components/ui/Button";
import axios from "axios";

// export const getStaticProps = async () => {
//   const res = await axios.get(
//     "https://asclepius.pirveli.ge/asclepius/v1/api/clinics"
//   );
//
//   const data = res.data;
//
//   return {
//     props: { clinicsData: data },
//   };
// };

function HomePage({ clinicsData }) {
  // const firstPartImgArray = [
  //   "firstPartImg1.png",
  //   "firstPartImg2.png",
  //   "firstPartImg3.png",
  // ];

  return (
      <h></h>
    // <div className={classes.homePageContainer}>
    //   <div className={classes.firstPart}>
    //     <div className={classes.showSlider}>
    //       <Slider />
    //     </div>
    //     <div className={classes.showSliderForMobile}>
    //       <Text style={classes.medicalCardTitle}>
    //         {" "}
    //         Multifunctional medical <a>Card</a>
    //       </Text>
    //       <Text style={classes.medicalCardText}>
    //         Contrary to popular belief, Lorem Ipsum is not simply random text.
    //         It has roots in a pie
    //       </Text>
    //       <div className={classes.medicalCardsButtons}>
    //         <Button name="Order a card" style={classes.orderBtn} />
    //         <Button name="Download" style={classes.downloadOrderBtn} />
    //       </div>
    //     </div>
    //     <div className={classes.firstPartImg}>
    //       {firstPartImgArray.map((image, index) => (
    //         <img
    //           className={classes.slide}
    //           key={index}
    //           src={image}
    //           alt="firstPartimg"
    //         />
    //       ))}
    //     </div>
    //     <ClinicCardList clinicsData={clinicsData} />
    //     <DoctorCardList />
    //     <Services />
    //     <Benefits />
    //     <CardPrice />
    //   </div>
    // </div>
  );
}

export default HomePage;
