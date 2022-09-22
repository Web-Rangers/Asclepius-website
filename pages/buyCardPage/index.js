import { useState, useEffect } from "react";
import Text from "../../components/ui/Text";
import Image from "next/image";
import s from "../../styles/buyCard.module.css";
import CardPrice from "../../components/contents/CardPrice";
import buyCardData from "../../fakeData";
import Button from "../../components/ui/Button";
import { Tooltip } from "@nextui-org/react";
import Modal from "react-modal";
import CardCheckoutModal from "../../components/modals/CardCheckoutModal";

function BuyCardPage() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [customStyles, setCustomStyles] = useState({});
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if(window.innerWidth < 600){
      setCustomStyles({
        content: {
          width: "100%",
          height: "100%",
          top: "50%",
          left: "0%",
          right: "10px",
          bottom: "auto",
          transform: "translateY(-50%)",
          background: "#ffffff",
        },
        overlay: {
          background: "transparent",
        },
      })
    }else{
      setCustomStyles({
        content: {
          width: "30%",
          height: "100%",
          top: "50%",
          left: "88%",
          right: "10px",
          bottom: "auto",
          transform: "translate(-50%, -50%)",
          background: "#ffffff",
        },
        overlay: {
          background: "transparent",
        },
      })
    }
  }, [])
  

  return (
    <div className={s.container}>
      <div className={s.firstPart}>
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
            <div className={s.headerBg}>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <CardCheckoutModal closeModal={closeModal} />
      </Modal>
      <div className={s.chooseCardContainer}>
        <div className={s.headerContainerTitle}>
          <Text>Choose exactly what you need</Text>
        </div>

        {buyCardData.map((item) => (
          <div
            className={
              item.Gold.length === 0 ? s.tableDataTitleStyles : s.tableDataStyle
            }
            key={item.id}
          >
            <div className={s.tableFeature}>
              <Text
                style={
                  item.features.length === 0 || item.features === "Feature"
                    ? s.tableTitleStyle
                    : s.tableTextStyle
                }
              >
                {item.src ? (
                  <>
                    {item.features}
                    <Tooltip
                      css={{
                        display: "flex",
                        alignItems: "center",
                        width: "260px",
                        height: "80px",
                        fontSize: "12px",
                      }}
                      rounded
                      color="primary"
                      content={
                        "No matter where you are in your journey as a creative entrepreneur, we have a pricing plan for you."
                      }
                    >
                      <Image
                        src={item.src}
                        alt="star"
                        width="24px"
                        height="24px"
                        auto
                        flat
                      />
                    </Tooltip>
                  </>
                ) : (
                  item.features
                )}
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
