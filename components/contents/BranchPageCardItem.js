import Text from "../ui/Text";
import s from "../../styles/clinicsPage.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

const BranchPageCardItem = ({data}) => {
  const { address, contactInfos, description, displayName, eligibleForVAT, id, isActive, logoBody, logoUrl, parentId, workingHours, rating = '0' } = data

  return (
    <Link href={`/branchDetailPage/${id}`} key={id}>
      <div
        className={s.cardItemContainer}
        key={id}
        // onClick={() => handleClick(props.data)}
      >
        <div className={s.imgPart}>
          <div className={s.ratingContainer}>
            <Image src="/Star.svg" alt="star" width="16.67px" height="15.04" />
            <Text>{data?.rating}</Text>
          </div>
          <img
            src={logoUrl || "/clinicImage.png"}
            alt={displayName}
            className={s.imgPartImage}
          />
        </div>
        <Text style={s.clinicNameText}>{displayName}</Text>
        <Text style={s.clinicWorkingHours}>
          {/* {props.workingDay} */}
          {workingHours[0]?.startHour} {workingHours[0]?.endHour}
        </Text>

        <Text style={s.clinicAddressText}>
          <Image
            alt="locationIcon"
            src="/map-pin 1.svg"
            width="16.67px"
            height="15.04"
            style={{ marginRight: "2px" }}
          />
          {address?.address}
        </Text>
      </div>
    </Link>
  );
};

export default BranchPageCardItem;
