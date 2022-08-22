import Text from "../ui/Text";
import s from "../../styles/clinicsPage.module.css";
import Image from "next/image";
import { useRouter } from "next/router";

const BranchPageCardItem = (props) => {
  const router = useRouter();

  const handleClick = (data) => {
    router.push({
      pathname: "/branchDetailPage",
      query: data,
    });
  };

  return (
    <div
      className={s.cardItemContainer}
      key={props.id}
      onClick={() => handleClick(props.data)}
    >
      <div className={s.imgPart}>
        <div className={s.ratingContainer}>
          <Image src="/Star.svg" alt="star" width="16.67px" height="15.04" />
          <Text>{props.rating}</Text>
        </div>
        <Image
          src={props.src || "/clinicImage.png"}
          alt={props.alt}
          className={s.imgPartImage}
          width="323px"
          height="290"
        />
      </div>
      <Text style={s.clinicNameText}>{props.clinicName}</Text>
      <Text style={s.clinicWorkingHours}>
        {props.workingDay}
        {props.workingHours}
      </Text>

      <Text style={s.clinicAddressText}>
        <Image
          alt="locationIcon"
          src="/map-pin 1.svg"
          width="16.67px"
          height="15.04"
          style={{ marginRight: "2px" }}
        />
        {props.clinicAddress} Tbilis
      </Text>
    </div>
  );
};

export default BranchPageCardItem;
