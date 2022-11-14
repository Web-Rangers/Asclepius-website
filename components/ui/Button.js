import Link from 'next/link';
import classes from '../../styles/signIn.module.css';

const Button = (props) => {
	return (
		<button
			className={props.style ? props.style : classes.loginButton}
			type={props.type}
			onClick={props.onClick}
		>
			{props.name}
			{props.icon ? props.icon : null}
		</button>
	);
};

export default Button;
