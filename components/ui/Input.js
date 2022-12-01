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
	);
};

export default Input;
