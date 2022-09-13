import classes from "../../styles/homePage.module.css";
import Text from "../ui/Text";
import Image from "next/image";

const DoctorCardItem = (props) => {
  return (
    <div className={classes.doctorItemContainer} key={props.id}>
      <div className={classes.doctorPhotoContainer}>
        <div className={classes.ratingContainer}>
          <Image src="Star.svg" alt="star" width="16.67px" height="15.04px" />
          <Text>{props.rating}</Text>
        </div>
        <Image src={props.src} alt={"doctor"} width="267px" height="286px" />
      </div>
      <Text style={classes.doctorNameText}>{props.doctorName}</Text>
      <Text style={classes.doctorSpecialityText}>{props.speciality}</Text>

      <div className={classes.iconsContainer}>
        <Image layout="fill" src="Video.svg" alt="videoCall" />
        <Image layout="fill" src="phoneIcon.svg" alt="phoneCall" />
        <Image layout="fill" src="Home.svg" alt="visitHome" />
      </div>
    </div>
  );
};

export default DoctorCardItem;
