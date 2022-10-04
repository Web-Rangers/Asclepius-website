import classes from "../../styles/homePage.module.css";
import Text from "../ui/Text";
import { useRouter } from "next/router";
import Image from "next/image";
import {useWindowSize} from '../useWindowSize';
import { ReactSVG } from "react-svg";

const ClinicCardItem = (props) => {
  const router = useRouter();

  const size = useWindowSize();

  const handleClick = (data) => {
    router.push({
      pathname: "/clinicDetailPage",
      query: data,
    });
  };

  return (
    <div
      className={classes.cardItemContainer}
      key={props.key}
      onClick={() => handleClick(props.data)}
    >
      <div className={classes.cardRating}>
        <ReactSVG src="/clinicStar.svg" />
        <span>4.9</span>
      </div>
      <div className={classes.imgPart}>
        <Image
          src={props.src}
          alt={"clinic"}
          className={classes.imgPartImage}
          width="398px"
          height="290px"
        />
      </div>
      <h2 className={classes.clinicNameText}>{props.clinicName}</h2>

      <Text style={classes.clinicAddressText}>
        <Image src="/map-pin 1.svg" alt="" width="16.67px" height="15.04" />
        {props.clinicAddress}
      </Text>
    </div>
  );
};

export default ClinicCardItem;