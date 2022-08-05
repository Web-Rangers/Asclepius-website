import Button from "../ui/Button";
import classes from "../../styles/headerFooter.module.css";

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
          <form action="#">
            <select name="languages" id="lang">
              <option value="Eng">Eng</option>
              <option value="Geo">Geo</option>
              <option value="Rus">Rus</option>
            </select>
          </form>
        </li>
      </ul>
    </div>
  );
};

export default Header;
