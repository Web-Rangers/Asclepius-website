import Button from "../ui/Button";
import classes from "../../styles/headerFooter.module.css";
import DropDown from "../ui/DropDown";
import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  const handleClick = (e) => {
    e.preventDefault();
    router.push("/signInPage");
  };

  console.log(router);
  return (
    <div className={classes.headerContainer}>
      <div className={classes.headerIcon}>
        <img src="headerIcon.svg" alt="headerIcon" />
      </div>
      <ul className={classes.navbar}>
        <li>
          <Link href="/Home">Home</Link>
        </li>
        <li>
          <Link href="/Button">Button</Link>
        </li>
        <li>
          <Link href="About us"> About us</Link>
        </li>
        <li>
          <Link href="#Offers">Offers</Link>
        </li>
        <li>
          <Link href="#">Contact</Link>
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
  );
};

export default Header;
