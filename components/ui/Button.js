import classes from "../../styles/SignIn.module.css";

const Button = (props) => {
  return (
    <button
      className={classes.loginButton}
      type={props.type}
      onClick={props.onClick}
    >
      {props.name}
    </button>
  );
};

export default Button;
