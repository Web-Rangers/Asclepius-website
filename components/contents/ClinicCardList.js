import ClinicCardItem from "./ClinicCardItem";
import classes from "../../styles/homePage.module.css";
import Text from "../ui/Text";
import Image from "next/image";

const clinciArray = [
  {
    id: 1,
    src: "/testClinic.png",
    alt: "clinic image",
    clinicName: "Bokhua ",
    clinicAddress: "Tbilisi , Chachava str.1",
    rating: "4.9",
    workingDay: " Monday - Friday",
    workingHours: "10:00 - 17:00",
    weekendWorkingDay: "Saturday - Sunday",
    weekendWorkingHours: "10:00 - 14:00",
    clinicPhoneNumber: "+99557799700",
    clinicEmail: "atcare@optimo.com",
  },
  {
    id: 2,
    src: "/testClinic.png",
    alt: "clinic image",
    clinicName: "Bokhua Cardiovascular Center",
    clinicAddress: "Tbilisi , Chachava str.1",
    rating: "4.9",
    workingDay: " Monday - Friday",
    workingHours: "10:00 - 17:00",
    weekendWorkingDay: "Saturday - Sunday",
    weekendWorkingHours: "10:00 - 15:00",
    clinicPhoneNumber: "+99557799700",
    clinicEmail: "atcare@optimo.com",
  },
  {
    id: 3,
    src: "/testClinic.png",
    alt: "clinic image",
    clinicName: "Bokhua Cardiovascular Center",
    clinicAddress: "Tbilisi , Chachava str.1",
    rating: "4.9",
    workingDay: " Monday - Friday",
    workingHours: "10:00 - 17:00",
    weekendWorkingDay: "Saturday - Sunday",
    weekendWorkingHours: "10:00 - 14:00",
    clinicPhoneNumber: "+99557799700",
    clinicEmail: "atcare@optimo.com",
  },
  {
    id: 4,
    src: "/testClinic.png",
    alt: "clinic image",
    clinicName: "Bokhua Cardiovascular Center",
    clinicAddress: "Tbilisi , Chachava str.1",
    rating: "4.9",
    workingDay: " Monday - Friday",
    workingHours: "10:00 - 17:00",
    weekendWorkingDay: "Saturday - Sunday",
    weekendWorkingHours: "10:00 - 14:00",
    clinicPhoneNumber: "+99557799700",
    clinicEmail: "atcare@optimo.com",
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
        {clinciArray.map((item, index) => {
          return (
            <ClinicCardItem
              key={index}
              src={item.src}
              clinicName={item.clinicName}
              clinicAddress={item.clinicAddress}
              rating={item.rating}
              data={item}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ClinicCardList;
