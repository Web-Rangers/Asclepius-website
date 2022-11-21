import { ReactSVG } from 'react-svg';
import classes from '../../styles/signIn.module.css';
import classNames from 'classnames';
import styles from '../../styles/components/datePicker.module.css';
import React, { useState } from 'react';

const Input = ({
	children,
	className,
	label,
	value,
	placeholder,
	type,
	multiline,
	onChange,
	style,
	onClick,
	withIcon = false,
	...props
}) => {
	const [isVisible, setVisible] = useState(false);

	const toggle = () => {
		setVisible(!isVisible);
	};
	return (
		<div className={classNames([classes.inputConainer, className])}>
			<input
				className={classNames([classes.inputConainerInput, className])}
				required
				value={value}
				placeholder={placeholder}
				type={!isVisible && withIcon ? 'password' : 'text'}
				onChange={(event) => onChange?.call(null, event.target.value)}
			/>
			<label className={classes.labelStyle}>{label}</label>
			{withIcon ? (
				<span
					className='icon'
					onClick={toggle}
				>
					{!isVisible ? (
						<ReactSVG
							src={'/eye-off.svg'}
							className={classNames(styles.passIcon)}
							onClick={onClick}
						/>
					) : (
						<ReactSVG
							src={'/eye.svg'}
							className={classNames(styles.passIcon)}
							onClick={onClick}
						/>
					)}
				</span>
			) : null}
		</div>

		// <Box
		//   component="form"
		//   sx={{
		//     "& > :not(style)": {
		//       mt: 1.8,
		//       backgroundColor: "rgb(255,255,255)",
		//       border: "1px solid #D5D8DE",
		//       "&:hover": {
		//         border: "1px solid #3A74D2",
		//         backgroundColor: "rgb(250,250,250)",
		//       },
		//       "& label": {
		//         display: "flex",
		//         alignSelf: "flex-start",
		//         marginLeft: 1,
		//       },
		//     },
		//   }}
		//   noValidate
		//   autoComplete="off"
		// >
		//   <TextField
		//     id="filled-basic"
		//     label={props.label}
		//     variant="filled"
		//     type={props.type}
		//     value={props.enterCode}
		//     onChange={props.handleChange}
		//     InputProps={props.inputProps}
		//   />
		// </Box>
	);
};

export default Input;
