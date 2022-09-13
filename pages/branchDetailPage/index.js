import s from "../../styles/clinicDetailPage.module.css";
import Image from "next/image";
import Link from "next/link";
import Text from "../../components/ui/Text";
import { useRouter } from "next/router";
import classNames from 'classnames';

const clinicImage = [
  { src: "/clinicImage.png" },
  {
    src: "/clinicImage.png",
  },
  {
    src: "/clinicImage.png",
  },
  {
    src: "/clinicImage.png",
  },
];

const BranchDetailPage = () => {
  const router = useRouter();
  const cardData = router.query;

  return (
    <div className={s.container}>
      <div>
        <Link href="/branchPage">
          <a className={s.backButton}>
            <Image
              alt="Arrow-LeftActive"
              src="/Arrow - LeftActive.svg"
              width="24px"
              height="24px"
              style={{ paddingRight: "4px" }}
            />
            Back
          </a>
        </Link>
      </div>
      <Text style={s.clinicsTitleTextStyle}> Atcare clinics</Text>
      <div className={s.clinicDetailPageCard}>
        <div className={s.cardItemContainer} key={cardData.key}>
          <div className={s.imgPart}>
            <div className={s.ratingContainer}>
              <Image
                src="/Star.svg"
                alt="star"
                width="16.67px"
                height="15.04"
              />
              <Text>{cardData.rating}</Text>
            </div>
            <Image
              src={cardData.src}
              alt={cardData.alt}
              className={s.imgPartImage}
              width="368px"
              height="326px"
            />
          </div>
          <Text style={s.clinicNameText}>{cardData.clinicName}</Text>
          <Text style={s.clinicWorkingHours}>
            {cardData.workingDay}
            {cardData.workingHours}
          </Text>
          <Text style={s.weekendWorkingHours}>
            {cardData.weekendWorkingDay}
            {cardData.weekendWorkingHours}
          </Text>
          <Text style={s.contactInfoText}>
            <Image
              src="/phoneNonActiveIcon.svg"
              alt=""
              width="24px"
              height="24px"
            />
            {cardData.clinicPhoneNumber}
          </Text>
          <Text style={s.contactInfoText}>
            <Image src="/mailIcon.svg" alt="" width="24px" height="24px" />
            {cardData.clinicEmail}
          </Text>
          <Text style={s.contactInfoText}>
            <Image src="/LocationIcon.svg" alt="" width="24px" height="24px" />
            {cardData.clinicAddress}
          </Text>
        </div>

        <div className={s.clinicInfo}>
          <Text style={s.clinicInfoTitle}>About us</Text>
          <Text style={s.clinicTitle}>Tbilisi State Medical Institute</Text>
          <Text style={s.aboutClinicText}>
            Tbilisi State Medical Institute Higher medical education - Chairman
            of the Association of Dermatologists and Venereologists Tbilisi
            State Medical InstituteHigher medical education - Chairman of the
            Association of Dermatologists and Venereologists Tbilisi State
            Medical InstituteHigher medical education - Chairman of the
            Association of Dermatologists and Venereologists Tbilisi State
            Medical
          </Text>
          <Text style={s.clinicInfoTitle}>Services</Text>
          <div className={s.servicesContainer}>
            <div className={s.serviceItem}>
              <Image
                alt="profile"
                src="/Profile.svg"
                width="24px"
                height="24px"
                style={{ paddingRight: "4px" }}
              />
              <Text style={s.serviceTitle}>Doctors</Text>
              <Image
                alt="Arrow - Right"
                src="/Arrow - Right 9.svg"
                width="24px"
                height="24px"
                style={{ paddingRight: "4px" }}
                className={s.imgArrow}
              />
            </div>
            <Link href="clinic/analysis">
              <div className={s.serviceItem}>
                <Image
                  alt="SearchIcon"
                  src="/SearchIcon.svg"
                  width="24px"
                  height="24px"
                  style={{ paddingRight: "4px" }}
                />
                <Text style={s.serviceTitle}>Analysis</Text>
                <Image
                  alt="Arrow-Right"
                  src="/Arrow - Right 9.svg"
                  width="24px"
                  height="24px"
                  style={{ paddingRight: "4px" }}
                  className={s.imgArrow}
                />
              </div>
            </Link>
            <div className={s.serviceItem}>
              <Image
                alt="chat"
                src="/Chat.svg"
                width="24px"
                height="24px"
                style={{ paddingRight: "4px" }}
              />
              <Text style={s.serviceTitle}>Research</Text>
              <Image
                alt="Arrow-Right"
                src="/Arrow - Right 9.svg"
                width="24px"
                height="24px"
                style={{ paddingRight: "4px" }}
                className={s.imgArrow}
              />
            </div>
          </div>
          <div className={s.offerCardContainer}>
            <div className={s.offerContiner}>
              <Text style={s.clinicInfoTitle}>Offer name</Text>
              <Text style={s.serviceName}>Offer name1</Text>
              <Text style={s.serviceText}>
                Here is the offer name Chairman of the Association of
                Dermatologists{" "}
              </Text>
              <Text style={s.serviceName}>Offer name2</Text>
              <Text style={s.serviceText}>
                Here is the offer name Chairman of the Association of
                Dermatologists{" "}
              </Text>
            </div>
            <div className={s.cardType}>
              <Text style={s.clinicInfoTitle}>Card Type</Text>
              <div className={s.cardImage}>
                <Image
                  alt="silver card"
                  src="/Card 1.svg"
                  width="117px"
                  height="68.34px"
                />
              </div>
              <Image
                alt="gold card"
                src="/Card 2.svg"
                width="117px"
                height="68.34px"
                style={{ paddingRight: "4px" }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={s.imageTitleContainer}>
        <Text style={classNames(s.clinicsTitleTextStyle, s.imageTitle)}> Images of the clinic</Text>
        <div className={s.imageContainer}>
          {clinicImage.map((img, i) => (
            <Image key={i} src={img.src} alt="clinic image"/>
          ))}
        </div>
        <div className={s.imageSlider}>
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
  );
};

export default BranchDetailPage;
