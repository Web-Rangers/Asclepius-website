import s from "../../styles/clinicDetailPage.module.css";
import Image from "next/image";
import Link from "next/link";
import Text from "../../components/ui/Text";
import { useRouter } from "next/router";
import BranchPageCardItem from "../../components/contents/BranchPageCardItem";
import clinicArrayData from "../../clinicArrayData";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useState, useEffect } from "react";

const ClinicDetailPage = () => {
  const router = useRouter();

  const [cardData, setCardData] = useState(null);
  
  const [clinicData, setClinicData] = useState(null);

  function sliceIntoChunks(arr, chunkSize) {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        res.push(chunk);
    }
    return res;
  }

  useEffect(()=> {
    setClinicData(sliceIntoChunks(clinicArrayData, 3))
    setCardData(router.query)
  },[router.isReady])


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
        <div className={s.cardItemContainer} key={cardData?.key}>
          <div className={s.imgPart}>
            <div className={s.ratingContainer}>
              <Image
                src="/Star.svg"
                alt="star"
                width="16.67px"
                height="15.04"
              />
              <Text>{cardData?.rating}</Text>
            </div>
            <Image
              src='/clinicImage.png'
              alt={cardData?.alt}
              className={s.imgPartImage}
              width="368px"
              height="326px"
            />
          </div>
          <Text style={s.clinicNameText}>{cardData?.clinicName}</Text>
          <Text style={s.clinicWorkingHours}>
            {cardData?.workingDay}
            Monday - friday 10:00-17:00
          </Text>
          <Text style={s.weekendWorkingHours}>
            {cardData?.weekendWorkingDay}
            Saturday - Sunday 10:00-14:00
          </Text>
          <Text style={s.contactInfoText}>
            <Image
              src="/phoneNonActiveIcon.svg"
              alt=""
              width="24px"
              height="24px"
            />
            +995577997799
          </Text>
          <Text style={s.contactInfoText}>
            <Image src="/mailIcon.svg" alt="" width="24px" height="24px" />
            Atcare@gmail.com
          </Text>
          <Text style={s.contactInfoText}>
            <Image src="/LocationIcon.svg" alt="" width="24px" height="24px" />
            Carymouth , Hallmark Clinic
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
              />
            </div>
          </div>
          <div className={s.clinicOfferCardContainer}>
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
              <div className={s.clinicCardImage}>
                <Image
                  alt="silver card"
                  src="/Card 1.svg"
                  width="117px"
                  height="68.34px"
                />
                <Image
                  alt="silver card"
                  src="/Card 1.svg"
                  width="117px"
                  height="68.34px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={s.imageTitleContainer}>
        <div className={s.clinicTitleArrow}>
          <Text style={s.clinicsTitleTextStyle}> List of branch</Text>
          <div className={s.imageSlider}>
          </div>
        </div>
    
        <div className={s.clinicContainerScroll}>
          <Carousel
            className={s.carousel}
            showStatus={false}
            showIndicators={false}
          >
            {clinicData?.map((chunk) => {
              return <>
                <div>
                  {
                    chunk.map((item)=> {
                      return <BranchPageCardItem
                        key={item.id}
                        alt={item.alt}
                        clinicName={item.clinicName}
                        workingDay={item.workingDay}
                        workingHours={item.workingHours}
                        clinicAddress={item.clinicAddress}
                        rating={item.rating}
                        data={item}
                        src={item.src}
                      />
                    })
                  }
              </div>
              </>
            })}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default ClinicDetailPage;
