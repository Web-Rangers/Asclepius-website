import Button from "../ui/Button";
import classes from "../../styles/headerFooter.module.css";
import DropDown from "../ui/DropDown";

const Header = () => {
  return (
    <div className={classes.headerContainer}>
      <div className={classes.headerIcon}>
        <img src="headerIcon.svg" alt="headerIcon" />
      </div>
      <ul className={classes.navbar}>
        <li>Home</li>
        <li>Button</li>
        <li>About us</li>
        <li>Offers</li>
        <li>
          <a href="#">Contact</a>
        </li>
        <li>
          <Button name="Sign in" style={classes.signInButton} />
        </li>
        <li>
          <DropDown />
        </li>
      </ul>
    </div>
  );
};

export default Header;
