import styles from '../../styles/dropDown.module.css';
import { useEffect, useRef, useState } from 'react';

const language = [
	{
		id: '1',
		language: 'eng.svg',
	},
	{
		id: '2',
		language: 'geo.svg',
	},
	{
		id: '3',
		language: 'rus.svg',
	},
];

export default function DropDown({
	items = language,
	onChange,
	defaultSelected,
	bordered = true,
	withHeader = true,
}) {
	const [current, setCurrent] = useState(items[0].language);
	const [open, setOpen] = useState(false);
	const dropdownRef = useRef();

	const selectItem = (item) => {
		setCurrent(item);
		onChange && onChange(item);
		setOpen(false);
	};

	const selectetArray = language.filter((item) => item.language !== current);

	const closeIfNotDropdown = (e) => {
		if (
			e.target != dropdownRef.current &&
			!dropdownRef.current.contains(e.target)
		)
			setOpen(false);
	};

	useEffect(() => {
		defaultSelected &&
			setCurrent(items.find((item) => item.id === defaultSelected));
	}, [items]);

	useEffect(() => {
		if (window) window.addEventListener('click', closeIfNotDropdown);
		return () => {
			window.removeEventListener('click', closeIfNotDropdown);
		};
	}, []);

	return (
		<div
			className={`${styles.container} ${!bordered && styles.noBorder}`}
			ref={dropdownRef}
		>
			<div
				className={styles.header}
				onClick={() => setOpen(!open)}
				style={
					open ? { borderRadius: '0px 0px 0px 0px' } : { borderRadius: '8px' }
				}
			>
				{withHeader && (
					<>
						<div className={styles.textInfo}>
							<img
								src={current || ''}
								alt=''
							/>
							{/* <span className={styles.selected}>{current || ''}</span> */}
						</div>
						{open ? (
							<img
								src='/dropUp.svg'
								className={styles.icon}
							/>
						) : (
							<img
								src='/dropDown.svg'
								className={styles.icon}
							/>
						)}
					</>
				)}
			</div>
			<div
				className={styles.itemsContainer}
				style={
					open
						? {
								height: 'auto',
								border: '1px solid #4B445333',
								borderTop: 'none',
						  }
						: { height: '0px' }
				}
			>
				<div className={styles.itemsWrap}>
					{selectetArray.map((item) => (
						<div
							key={item.id}
							className={styles.item}
							onClick={() => selectItem(item.language)}
						>
							<img
								src={item.language}
								alt='flag'
							/>
							{/* <span className={styles.itemText}>{item.language}</span> */}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
