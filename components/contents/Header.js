import { useState } from "react";
import Button from "../ui/Button";
import classes from "../../styles/headerFooter.module.css";
import DropDown from "../ui/DropDown";
import Link from "next/link";
import { useRouter } from "next/router";
import SignUpHeader from "./SignUpHeader";
import Image from "next/image";
import Modal from "react-modal";

const customStyles = {
  content: {
    position: "absolute",
    background: "#3A74D2",
    width: "100%",
    height: "100%",
    top: 0,
    margin: 0,
    inset: "0px 0px 0px",
    // border: "none",
  },
};

const Header = () => {
  const router = useRouter();
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleClick = (e) => {
    e.preventDefault();
    router.push("/signInPage");
  };

  return (
    <>
      <div className={classes.headerContainer}>
        <div className={classes.headerIcon}>
          <img src="/headerIcon.svg" alt="headerIcon" />
          <div className={classes.headerForMobile}>
            <Link href="/signInPage">
              <a>Sign In</a>
            </Link>

            <div onClick={openModal}>
              <Image
                src="/burgerIcon.svg"
                alt="burger icon"
                width="20px"
                height="16px"
              />
            </div>

            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <section className={classes.modalContent}>
                <div className={classes.closeBtn}>
                  <Image
                    alt="closeIcon"
                    src="/closeBurgerMenu.svg"
                    width="16px"
                    height="16px"
                    onClick={closeModal}
                  />
                </div>
                <ul>
                  <li>
                    <Link href="/homePage">
                      <a>Home</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/buyCardPage">
                      <a> Cards</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/services">
                      <a> Services</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/contactUs">
                      <a> Contact</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="#Offers">
                      <a>Offers</a>
                    </Link>
                  </li>

                  <li>
                    <Link href="/signInPage">
                      <a>Sign in</a>
                    </Link>
                  </li>
                  <li>
                    <Button
                      name="Registrtion"
                      style={classes.signInButton}
                      onClick={handleClick}
                    />
                  </li>
                  <li>
                    <DropDown />
                  </li>
                </ul>
              </section>
            </Modal>
          </div>
        </div>

        <ul className={classes.navbar}>
          <li>
            <Link href="/homePage">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/Button">
              <a>Button</a>
            </Link>
          </li>
          <li>
            <Link href="/aboutUsPage">
              <a> About us</a>
            </Link>
          </li>
          <li>
            <Link href="#Offers">
              <a>Offers</a>
            </Link>
          </li>
          <li>
            <Link href="/contactUs">
              <a>Contact</a>
            </Link>
          </li>
          <li>
            <Button
              name="Sign in"
              style={classes.signInButton}
              onClick={handleClick}
            />
          </li>
          <li>
            <DropDown />
          </li>
        </ul>
      </div>
    </>
  );
};

export default Header;
