import ClinicCardItem from "./ClinicCardItem";
import classes from "../../styles/homePage.module.css";
import Text from "../ui/Text";
import Image from "next/image";

const ClinicCardList = ({ clinicsdata }) => {
  // console.log(
  //   "clinics data",
  //   clinicsdata.map((item) => item.displayName)
  // );
  return (
    <div className={classes.clinicCardContainer} clinicsData={clinicsdata}>
      <div className={classes.clinicCardContainerTitle}>
        <Text style={classes.serviceTextStyle}>Services</Text>
        <div className={classes.arrows}>
          <Text style={classes.ourClinicTextStyle}>OurClinics</Text>
          <div className={classes.arrowsIcons}>
            <Image
              src="/Arrow - Left.svg"
              alt="arrowLeft"
              width="24px"
              height="24px"
            />
            <Image
              src="/Arrow - Right.svg"
              alt="arrowRight"
              width="24px"
              height="24px"
            />
          </div>
        </div>
      </div>
      <div className={classes.clinicCardList}>
        {clinicsdata.map((item, index) => {
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
