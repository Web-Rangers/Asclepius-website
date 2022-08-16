import Text from "../../components/ui/Text";
import Image from "next/image";
import s from "../../styles/buyCard.module.css";
import CardPrice from "../../components/contents/CardPrice";
import buyCardData from "../../fakeData";
import Button from "../../components/ui/Button";

function BuyCardPage() {
  return (
    <div className={s.container}>
      <div className={s.headerContainer}>
        <div className={s.headerContainerLeft}>
          <Text style={s.headerContainerTitle}>How to buy a card ?</Text>
          <div className={s.buyCardStep}>
            <div>
              <Text style={s.headerContainerNumber}>01</Text>
              <Text style={s.headerContainerText}>Choose the desired card</Text>
            </div>
            <div>
              <Text style={s.headerContainerNumber}>02</Text>
              <Text style={s.headerContainerText}>Add your personal data</Text>
            </div>
            <div>
              <Text style={s.headerContainerNumber}>03</Text>
              <Text style={s.headerContainerText}>
                Add your personal card and pay
              </Text>
            </div>
          </div>
        </div>
        <div className={s.headerContainerRight}>
          <Image
            src="/homepageslider2.png"
            alt="star"
            width="400px"
            height="372px"
          />
        </div>
      </div>
      <CardPrice withoutHeader />
      <div className={s.chooseCardContainer}>
        <div className={s.headerContainerTitle}>
          <Text>Choose exactly what you need</Text>
        </div>

        {buyCardData.map((item) => (
          <div className={s.tableDataStyle} key={item.id}>
            <div className={s.tableFeature}>
              <Text
                style={
                  item.features.length === 0 || item.features === "Feature"
                    ? s.tableTitleStyle
                    : s.tableTextStyle
                }
              >
                {item.features}
              </Text>
            </div>
            <div className={s.tableSilverNum}>
              <Text
                style={
                  item.features.length === 0 || item.features === "Feature"
                    ? s.tableTitleStyle
                    : s.tableTextStyle
                }
              >
                {item.silver === "icon" ? (
                  <Image
                    src="/activeOval.svg"
                    alt="star"
                    width="20px"
                    height="20px"
                  />
                ) : item.silver === "emptyIcon" ? (
                  <Image
                    src="/Oval.svg"
                    alt="star"
                    width="20px"
                    height="20px"
                  />
                ) : (
                  item.silver
                )}
              </Text>
            </div>
            <div className={s.tableGoldNum}>
              <Text
                style={
                  item.features.length === 0 || item.features === "Feature"
                    ? s.tableTitleStyle
                    : s.tableTextStyle
                }
              >
                {item.Gold === "icon" ? (
                  <Image
                    src="/activeOval.svg"
                    alt="star"
                    width="20px"
                    height="20px"
                  />
                ) : item.silver === "emptyIcon" ? (
                  <Image
                    src="/Oval.svg"
                    alt="star"
                    width="20px"
                    height="20px"
                  />
                ) : (
                  item.Gold
                )}
              </Text>
            </div>
            <div className={s.tablePlatinium}>
              <Text
                style={
                  item.features.length === 0 || item.features === "Feature"
                    ? s.tableTitleStyle
                    : s.tableTextStyle
                }
              >
                {item.platinium === "icon" ? (
                  <Image
                    src="/activeOval.svg"
                    alt="star"
                    width="20px"
                    height="20px"
                  />
                ) : item.silver === "emptyIcon" ? (
                  <Image
                    src="/Oval.svg"
                    alt="star"
                    width="20px"
                    height="20px"
                  />
                ) : (
                  item.platinium
                )}
              </Text>
            </div>
          </div>
        ))}
        <div className={s.buttonContainer}>
          <Button style={s.button} name="Buy now" />
          <Button style={s.buttonActive} name="Buy now" />
          <Button style={s.button} name="Buy now" />
        </div>
      </div>
    </div>
  );
}

export default BuyCardPage;
