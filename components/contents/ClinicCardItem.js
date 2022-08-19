import classes from "../../styles/homePage.module.css";
import Text from "../ui/Text";

const ClinicCardItem = (props) => {
  return (
    <div className={classes.cardItemContainer} key={props.id}>
      <div className={classes.imgPart}>
        <div className={classes.ratingContainer}>
          <img src="Star.svg" alt="star" width="16.67px" height="15.04" />
          <Text>{props.rating}</Text>
        </div>
        <img src={props.src} alt={"clinic"} className={classes.imgPartImage} />
      </div>
      <Text style={classes.clinicNameText}>{props.clinicName}</Text>

      <Text style={classes.clinicAddressText}>
        <img src="map-pin 1.svg" alt="" />
        {props.clinicAddress}
      </Text>
    </div>
  );
};

export default ClinicCardItem;
