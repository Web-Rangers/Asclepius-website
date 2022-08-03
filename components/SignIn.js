import classes from "./SignIn.module.css";

export const SignIn = () => {
  return (
    <div className={classes.container}>
      <div className={classes.singInContainer}>
        <div className={classes.singInTextStyle}>
          <h1>Login</h1>
          <span>
            Don't have an account?
            <span className={classes.linkedTitleStyle}>Create one</span>
          </span>
        </div>
        <div className={classes.loginOptionsContainer}>
          <button type="button" className={classes.loginOptionsStyle}>
            Google
          </button>
          <button type="button" className={classes.loginOptionsStyle}>
            Facebook
          </button>
        </div>
        <input className={classes.inputStyle} type="text" placeholder="Name" />
        <input
          type="password"
          placeholder="Password"
          className={classes.inputStyle}
        />
        <div className={classes.linkedTitle}>
          <span className={classes.linkedTitleStyle}>Forget password? </span>
        </div>
        <button className={classes.loginButton} type="submit">
          Login
        </button>
      </div>
      <div className={classes.cardsContainer}>
        <img src="cards.png" alt="cards" />
      </div>
    </div>
  );
};
