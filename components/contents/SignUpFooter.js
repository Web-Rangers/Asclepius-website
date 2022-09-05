import Image from "next/image";
import classes from "../../styles/headerFooter.module.css";
import Text from "../ui/Text";

const SignUpFooter = () => {
  return (
    <>
    <div className={classes.signUpFooterContainner}>
      <div className={classes.signUpFooterContainnerLeft}>
        <Text style={classes.signUpFooterTextStyle}>
          C 2022 All right reservered
        </Text>
      </div>
      <div className={classes.signUpFooterContainnerRight}>
        <Text style={classes.signUpFooterTextStyle}>
          Phone numberი: 2 422 922
        </Text>
        <div className={classes.addressIcon}>
          <Text style={classes.signUpFooterTextStyle}>
            Adrressი: Tbilisi , Ana Antonovskaya str. 9
          </Text>
          <div className={classes.footerIonContainer}>
            <Image
              src="/facebook-white.svg"
              alt="facebook"
              width="24px"
              height="24px"
            />
            <Image
              src="/instagram-white.svg"
              alt="instagram"
              className={classes.iconsStyle}
              width="24px"
              height="24px"
            />
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default SignUpFooter;
