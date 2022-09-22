import Link from "next/link";
import Text from "../ui/Text";
import Button from "../ui/Button";
import s from "../../styles/homePage.module.css";
import { useRouter } from "next/router";

const Services = () => {
  const router = useRouter();
  const handleClick = (e) => {
    e.preventDefault();
    router.push("/signInPage");
    console.log("ddd");
  };
  return (
    <div className={s.serviceContainer}>
      <div className={s.serviceContainerImg}>
        <img src="servicesImg1.png" alt="servicesImg1" />
        <img src="servicesImg2.png" alt="servicesImg2" />
      </div>
      <div className={s.serviceContainerContent}>
        <div className={s.leftSideContent}>
          <Text style={s.servicesTitle}>Services</Text>
          <Text style={s.ourServicesTitle}>Our Services</Text>
          <Text style={s.leftSideContentText}>
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old. Richard McClintock, a Latin professor
            at Hampden-Sydney College in Virginia, looked up one of the more
            obscure Latin words, consectetur, from a Lorem Ipsum
          </Text>
          <Button
            style={s.registrationButton}
            onClick={handleClick}
            name="Registration"
          />
        </div>
        <div className={s.rightSideContent}>
          <Link href="/onlineconsultation">
            <div className={s.servicesCard}>
              <img src="videoCallIcon.svg" alt="" />
              <div className={s.servicesInfo}>
                <Text style={s.servicesCardTitle}>Online consultation</Text>
                <Text style={s.servicesCardText}>
                  Get video and audio consultation from doctor
                </Text>
              </div>
            </div>
          </Link>
          <Link href="/clinics">
            <div className={s.servicesCard}>
              <img src="homeVisitIcon.svg" alt="" />
              <div className={s.servicesInfo}>
                <Text style={s.servicesCardTitle}>
                  Visit to the clinic
                </Text>
                <Text style={s.servicesCardText}>
                  Get video and audio consultation from doctor
                </Text>
              </div>
            </div>
          </Link>
          <Link href="/Laboratory">
            <div className={s.servicesCard}>
              <img src="lab.svg" alt="" />
              <div className={s.servicesInfo}>
                <Text style={s.servicesCardTitle}>Laboratory</Text>
                <Text style={s.servicesCardText}>
                  Get video and audio consultation from doctor
                </Text>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Services;
