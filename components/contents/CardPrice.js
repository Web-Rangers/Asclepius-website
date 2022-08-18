import s from "../../styles/homePage.module.css";
import Text from "../ui/Text";
import Button from "../ui/Button";

const CardPrice = (props) => {
  return (
    <div className={s.cardPriceContainer}>
      {props.withoutHeader ? null : (
        <div className={s.cardOffersTitles}>
          <img
            src="headerCardImg.png"
            alt="headerCardImg"
            className={s.headerCardImg}
          />
          <Text style={s.cardPriceTitle}>Card Price</Text>
          <Text style={s.cardPriceText}>
            Contrary to popular belief, Lorem Ipsum is not simply random text.{" "}
          </Text>
        </div>
      )}
      <div className={s.cardSection}>
        <div className={s.card}>
          <div className={s.header}>
            <div className={s.priceContainer}>
              <Text style={s.priceContainerTitle}>Silver</Text>
              <Text style={s.priceContainerText}>156 service</Text>
            </div>
            <Text style={s.priceNumber}>$60</Text>
          </div>

          <img src="Card 2.svg" alt="silverCard" className={s.cardImg} />

          <div className={s.cardServices}>
            <div className={s.servicePackage}>
              <img src="activeTickIcon.svg" alt="tickIcon" />
              <Text style={s.servicePackageText}>Standart rervices</Text>
            </div>
            <div className={s.servicePackage}>
              <img src="activeTickIcon.svg" alt="tickIcon" />
              <Text style={s.servicePackageText}>Benefit</Text>
            </div>
            <div className={s.servicePackage}>
              <img src="tickIcon.svg" alt="tickIcon" />
              <Text style={s.recordingTimeText}>Recording time</Text>
            </div>
          </div>
          <Button name="Order" style={s.orderButton} />
        </div>
        <div className={s.card}>
          <div className={s.header}>
            <div className={s.priceContainer}>
              <Text style={s.priceContainerTitle}>Gold</Text>
              <Text style={s.priceContainerText}>156 service</Text>
            </div>
            <Text style={s.priceNumber}>$100</Text>
          </div>

          <img src="Card 3.svg" alt="silverCard" className={s.cardImg} />

          <div className={s.cardServices}>
            <div className={s.servicePackage}>
              <img src="activeTickIcon.svg" alt="tickIcon" />
              <Text style={s.servicePackageText}>Standart rervices</Text>
            </div>
            <div className={s.servicePackage}>
              <img src="activeTickIcon.svg" alt="tickIcon" />
              <Text style={s.servicePackageText}>Benefit</Text>
            </div>
            <div className={s.servicePackage}>
              <img src="activeTickIcon.svg" alt="tickIcon" />
              <Text style={s.servicePackageText}>Recording time</Text>
            </div>
          </div>
          <Button name="Order" style={s.orderButtonGold} />
        </div>
        <div className={s.card}>
          <div className={s.header}>
            <div className={s.priceContainer}>
              <Text style={s.priceContainerTitle}>Silver</Text>
              <Text style={s.priceContainerText}>156 service</Text>
            </div>
            <Text style={s.priceNumber}>$150</Text>
          </div>
          <img src="Card 1.svg" alt="silverCard" className={s.cardImg} />
          <div className={s.cardServices}>
            <div className={s.servicePackage}>
              <img src="activeTickIcon.svg" alt="tickIcon" />
              <Text style={s.servicePackageText}>Standart services</Text>
            </div>
            <div className={s.servicePackage}>
              <img src="activeTickIcon.svg" alt="tickIcon" />
              <Text style={s.servicePackageText}>Benefit</Text>
            </div>
            <div className={s.servicePackage}>
              <img src="activeTickIcon.svg" alt="tickIcon" />
              <Text style={s.servicePackageText}>Recording time</Text>
            </div>
          </div>
          <Button name="Order" style={s.orderButton} />
        </div>
      </div>
    </div>
  );
};

export default CardPrice;
