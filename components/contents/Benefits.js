import s from "../../styles/homePage.module.css";
import Text from "../ui/Text";
import Image from "next/image";

const Benefits = () => {
  return (
    <div className={s.benefitsContainer}>
      <Text style={s.benefitMainTitle}>Our benefits</Text>
      <div className={s.benefits}>
        <Image
          layout="fill"
          src="benefitImg.png"
          alt="benefitImg"
          className={s.benefitsContainerImg}
        />
        <div className={s.benefitCardLeftSide}>
          <div className={s.benefitCard}>
            <Image
              src="checkboxIcon.svg"
              alt="checkboxIcon"
              width="24px"
              heigh="24px"
            />
            <Text style={s.benefitCardTitle}>Our team</Text>
            <Text style={s.benefitCardText}>
              People who really care about your health
            </Text>
          </div>
          <div className={s.benefitCard}>
            <Image
              src="checkboxIcon.svg"
              alt="checkboxIcon"
              width="24px"
              heigh="24px"
            />
            <Text style={s.benefitCardTitle}>Fast</Text>
            <Text style={s.benefitCardText}>
              People who really care about your health
            </Text>
          </div>
          <div className={s.benefitCard}>
            <Image
              src="checkboxIcon.svg"
              alt="checkboxIcon"
              width="24px"
              heigh="24px"
            />
            <Text style={s.benefitCardTitle}>Comfortable</Text>
            <Text style={s.benefitCardText}>
              People who really care about your health
            </Text>
          </div>
        </div>
        <div className={s.benefitCardRightSide}>
          <div className={s.benefitCard}>
            <Image
              src="checkboxIcon.svg"
              alt="checkboxIcon"
              width="24px"
              heigh="24px"
            />
            <Text style={s.benefitCardTitle}>Our team</Text>
            <Text style={s.benefitCardText}>
              People who really care about your health
            </Text>
          </div>
          <div className={s.benefitCard}>
            <Image
              src="checkboxIcon.svg"
              alt="checkboxIcon"
              width="24px"
              heigh="24px"
            />
            <Text style={s.benefitCardTitle}>Fast</Text>
            <Text style={s.benefitCardText}>
              People who really care about your health
            </Text>
          </div>
          <div className={s.benefitCard}>
            <Image
              src="checkboxIcon.svg"
              alt="checkboxIcon"
              width="24px"
              heigh="24px"
            />
            <Text style={s.benefitCardTitle}>Comfortable</Text>
            <Text style={s.benefitCardText}>
              People who really care about your health
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Benefits;
