import classes from "../../styles/signIn.module.css";

const Button = (props) => {
  return (
    <button
      className={props.style ? props.style : classes.loginButton}
      type={props.type}
      onClick={props.onClick}
    >
      {props.icon ? props.icon : null}
      {props.name}
    </button>
  );
};

export default Button;
