import classNames from 'classnames';
import styles from '../styles/components/datePicker.module.css';
import { ReactSVG } from 'react-svg';

export default function Input({
	children,
	className,
	label,
	value,
	placeholder,
	type,
	multiline,
	onChange,
	style,
	...props
}) {
	if (type === 'text' && multiline) {
		return (
			<div
				className={className ? className : classNames([styles.inputContainer])}
			>
				{label && <span className={styles.label}>{label}</span>}
				<div className={style}>
					<textarea
						value={value}
						placeholder={placeholder}
						style={style}
						onChange={(event) => onChange?.call(null, event.target.value)}
					/>
				</div>
			</div>
		);
	}
	return (
		<div className={classNames([styles.inputContainer, className])}>
			{label && <span className={styles.label}>{label}</span>}
			<div className={style ? style : styles.input}>
				<input
					value={value}
					placeholder={placeholder}
					type={type}
					onChange={(event) => onChange?.call(null, event.target.value)}
				/>
				{type === 'time' && (
					<ReactSVG
						src={'/images/icons/inputs/clock.svg'}
						className={classNames(styles.iconContainer)}
					/>
				)}
				{type === 'password' && (
					<ReactSVG
						src={'/images/icons/inputs/eye-off.svg'}
						className={classNames(styles.iconContainer)}
					/>
				)}
			</div>
		</div>
	);
}
