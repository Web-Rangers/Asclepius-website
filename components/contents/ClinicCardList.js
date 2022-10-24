import ClinicCardItem from "./ClinicCardItem";
import classes from "../../styles/homePage.module.css";
import Text from "../ui/Text";
import Image from "next/image";
import { Carousel } from 'react-responsive-carousel';

const ClinicCardList = ({ clinicsData }) => {
  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 350;
  };

  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 350;
  };
  return (
    <div className={classes.clinicCardContainer}>
      <div className={classes.firstPart}>
        <div className={classes.clinicCardContainerTitle}>
          <Text style={classes.serviceTextStyle}>Services</Text>
          <div className={classes.arrows}>
            <Text style={classes.ourClinicTextStyle}>Our Clinics</Text>
          </div>
        </div>
        <div className={classes.clinicCardList} id="slider">
          <Carousel
            className={classes.carousel}
            showStatus={false}
            showIndicators={false}
          >
            {clinicsData?.map((chunk) => {
              return <>
                <div className={classes.clinicCardItem}>
                  {
                    chunk.map((item, index)=> {
                      return <ClinicCardItem
                        key={index}
                        id={item.id}
                        src={item.logoUrl || "/testClinic.png"}
                        clinicName={item.displayName}
                        clinicAddress={item.address.address}
                        rating={"4.9"}
                        data={item}
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

export default ClinicCardList;