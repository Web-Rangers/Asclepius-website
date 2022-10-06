import s from "../../styles/homePage.module.css";
import Text from "../ui/Text";

const Benefits = () => {
  return (
    <div className={s.benefit}>
      <div className={s.firstPart}>
        <div className={s.benefitsContainer}>
          <Text style={s.benefitMainTitle}>Our benefits</Text>
          <div className={s.benefits}>
            <img
              src="benefits.svg"
              alt="benefits"
              className={s.benefitsContainerImg}
            />
            <div className={s.benefitCardLeftSide}>
              <div className={s.benefitCard}>
                <img
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
                <img
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
                <img
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
                <img
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
                <img
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
                <img
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
      </div>
    </div>
  );
};
export default Benefits;
