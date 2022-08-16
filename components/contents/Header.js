import Button from "../ui/Button";
import classes from "../../styles/headerFooter.module.css";
import DropDown from "../ui/DropDown";
import Link from "next/link";
import { useRouter } from "next/router";
import SignUpHeader from "./SignUpHeader";

const Header = () => {
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    router.push("/signInPage");
  };

  return (
    <>
      <div className={classes.headerContainer}>
        <div className={classes.headerIcon}>
          <img src="/headerIcon.svg" alt="headerIcon" />
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
            <Link href="About us">
              <a> About us</a>
            </Link>
          </li>
          <li>
            <Link href="#Offers">
              <a>Offers</a>
            </Link>
          </li>
          <li>
            <Link href="#">
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
