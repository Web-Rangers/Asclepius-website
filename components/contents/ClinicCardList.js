import ClinicCardItem from "./ClinicCardItem";
import classes from "../../styles/homePage.module.css";
import Text from "../ui/Text";

const clinciArray = [
  {
    src: "testClinic.png",
    alt: "clinic image",
    clinicName: "Bokhua Cardiovascular Center",
    clinicAddress: "Tbilisi , Chachava str.1",
    rating: "4.9",
  },
  {
    src: "testClinic.png",
    alt: "clinic image",
    clinicName: "Bokhua Cardiovascular Center",
    clinicAddress: "Tbilisi , Chachava str.1",
    rating: "4.9",
  },
  {
    src: "testClinic.png",
    alt: "clinic image",
    clinicName: "Bokhua Cardiovascular Center",
    clinicAddress: "Tbilisi , Chachava str.1",
    rating: "4.9",
  },
  {
    src: "testClinic.png",
    alt: "clinic image",
    clinicName: "Bokhua Cardiovascular Center",
    clinicAddress: "Tbilisi , Chachava str.1",
    rating: "4.9",
  },
];

const ClinicCardList = () => {
  return (
    <div className={classes.clinicCardContainer}>
      <div className={classes.clinicCardContainerTitle}>
        <Text style={classes.serviceTextStyle}>Services</Text>
        <div className={classes.arrows}>
          <Text style={classes.ourClinicTextStyle}>OurClinics</Text>
          <div className={classes.arrowsIcons}>
            <img
              src="Arrow - Left.svg"
              alt="arrowLeft"
              width="24px"
              height="24px"
            />
            <img
              src="Arrow - Right.svg"
              alt="arrowRight"
              width="24px"
              height="24px"
            />
          </div>
        </div>
      </div>
      <div className={classes.clinicCardList}>
        {clinciArray.map((item, index) => {
          return (
            <ClinicCardItem
              key={index}
              src={item.src}
              clinicName={item.clinicName}
              clinicAddress={item.clinicAddress}
              rating={item.rating}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ClinicCardList;
