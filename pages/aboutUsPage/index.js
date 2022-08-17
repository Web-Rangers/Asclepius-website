import Text from "../../components/ui/Text";
import Image from "next/image";
import s from "../../styles/aboutUsPage.module.css";
function AboutUsPage() {
  return (
    <div className={s.aboutUsContainer}>
      <Text style={s.aboutUsTitle}>AboutUs</Text>
      <Image
        alt="aboutUS image"
        src="/aboutUsImg.png"
        width="1160px"
        height="465px"
        style={{ borderRadius: "3px" }}
      />
      <Text style={s.aboutUsTitle}>Our story</Text>
      <Text style={s.aboutUsText}> Welcome to the Mississauga Foot Clinic</Text>
      <Text style={s.aboutUsText}>
        The Mississauga Foot Clinic was founded in 1990 and was one of the very
        first foot clinics with certified chiropodists in Ontario. Since then,
        Mississauga Foot Clinic has continued to incorporate new technologies
        and improved standards of practice in order to provide our patients with
        the care they deserve. The Mississauga Foot Clinic was founded in 1990
        and was one of the very first foot clinics with certified chiropodists
        in Ontario. The Mississauga Foot Clinic was founded in 1990 and was one
        of the very first foot clinics with certified chiropodists in Ontario.
        Mississauga Foot Clinic has continued to incorporate new technologies
        and improved standards of practice in order to provide our patients with
        the care they deserve. The Mississauga Foot Clinic was founded in 1990
        and was one of the very first foot clinics with certified chiropodists
        in Ontario.{" "}
      </Text>
    </div>
  );
}

export default AboutUsPage;
