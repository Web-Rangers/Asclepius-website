import classes from "../../styles/homePage.module.css";
import Text from "../ui/Text";

const DoctorCardItem = (props) => {
  return (
    <div className={classes.doctorItemContainer} key={props.id}>
      <div className={classes.doctorPhotoContainer}>
        <div className={classes.ratingContainer}>
          <img src="Star.svg" alt="star" width="16.67px" height="15.04px" />
          <Text>{props.rating}</Text>
        </div>
        <img src={props.src} alt={"doctor"} width="267px" height="286px" />
      </div>
      <Text style={classes.doctorNameText}>{props.doctorName}</Text>
      <Text style={classes.doctorSpecialityText}>{props.speciality}</Text>

      <div className={classes.iconsContainer}>
        <img src="Video.svg" alt="videoCall" />
        <img src="phoneIcon.svg" alt="phoneCall" />
        <img src="Home.svg" alt="visitHome" />
      </div>
    </div>
  );
};

export default DoctorCardItem;
