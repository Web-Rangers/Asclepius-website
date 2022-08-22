import classes from "../../styles/homePage.module.css";
import Text from "../ui/Text";
import { useRouter } from "next/router";
import Image from "next/image";

const ClinicCardItem = (props) => {
  const router = useRouter();

  const handleClick = (data) => {
    router.push({
      pathname: "/clinicDetailPage",
      query: data,
    });
  };
  console.log("data", props);
  return (
    <div
      className={classes.cardItemContainer}
      key={props.key}
      onClick={() => handleClick(props.data)}
    >
      <div className={classes.imgPart}>
        <div className={classes.ratingContainer}>
          <Image src="/Star.svg" alt="star" width="16.67px" height="15.04" />
          <Text>{props.rating}</Text>
        </div>
        <Image
          src={props.src}
          alt={"clinic"}
          className={classes.imgPartImage}
          width="268px"
          height="167px"
        />
      </div>
      <Text style={classes.clinicNameText}>{props.clinicName}</Text>

      <Text style={classes.clinicAddressText}>
        <Image src="/map-pin 1.svg" alt="" width="16.67px" height="15.04" />
        {props.clinicAddress}
      </Text>
    </div>
  );
};

export default ClinicCardItem;
