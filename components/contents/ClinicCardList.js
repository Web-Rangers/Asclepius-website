import ClinicCardItem from "./ClinicCardItem";
import classes from "../../styles/homePage.module.css";
import Text from "../ui/Text";
import Image from "next/image";

const ClinicCardList = ({ clinicsData }) => {
  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 350;
  };

  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 350;
  };
  return (
    <div className={classes.clinicCardContainer}>
      <div className={classes.clinicCardContainerTitle}>
        <Text style={classes.serviceTextStyle}>Services</Text>
        <div className={classes.arrows}>
          <Text style={classes.ourClinicTextStyle}>Our Clinics</Text>
          <div className={classes.arrowsIcons}>
            <Image
              src="/Arrow - Left.svg"
              alt="arrowLeft"
              width="24px"
              height="24px"
              onClick={slideLeft}
            />

            <Image
              src="/Arrow - Right.svg"
              alt="arrowRight"
              width="24px"
              height="24px"
              onClick={slideRight}
            />
          </div>
        </div>
      </div>
      <div className={classes.clinicCardList} id="slider">
        {clinicsData?.map((item, index) => {
          return (
            <ClinicCardItem
              key={index}
              src={item.logoUrl || "/testClinic.png"}
              clinicName={item.displayName}
              clinicAddress={item.address.address}
              rating={"4.9"}
              data={item}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ClinicCardList;
