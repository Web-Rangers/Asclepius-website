import { useState } from "react";
import classes from "../../styles/headerFooter.module.css";
import Link from "next/link";

const SignUpHeader = () => {
  const [messages, setMessages] = useState(true);
  const [searchInput, setSearchInput] = useState("");

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  console.log(searchInput);
  return (
    <div className={classes.signUpHeaderContainer}>
      <div className={classes.f_half}>
        <div>
          <img src="/headerIcon.svg" alt="headerIcon" />
        </div>
        <div className={classes.navbarContainer}>
          <ul className={classes.navbarItems}>
            <li>
              <Link href="/MainPage">
                <a>Main page</a>
              </Link>
            </li>
            <li>
              <Link href="/buyCardPage">
                <a>Cards</a>
              </Link>
            </li>
            <li>
              <Link href="Clinics">
                <a> Services</a>
              </Link>
              <div className={classes.dropdown}>
                <ul>
                  <li>
                    <Link href="">
                      <a>Online consultation</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="">
                      <a>visit to the clinic</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="">
                      <a>doctor at home</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="">
                      <a>laboratory</a>
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
          <div className={classes.searchInput}>
            <input
              type="search"
              placeholder="Search..."
              value={searchInput}
              onChange={handleChange}
            />
            <img src="/Search.svg" alt="Search" />
          </div>
        </div>
      </div>
      <div className={classes.userProfilePart}>
        {messages ? (
          <img src="/notificationwithsms.svg" alt="notificationwithsms" />
        ) : (
          <img src="/notification.svg" alt="notification" />
        )}
        <img src="/testUser.png" alt="testUSerImage" />
        <img src="/dropDown.svg" alt="Search" />
      </div>
    </div>
  );
};

export default SignUpHeader;
