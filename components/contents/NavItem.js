import React from 'react';
import Link from 'next/link';
import s from '../../styles/clinicDetailPage.module.css';

const NavItem = ({ name, path, src }) => {
	return (
		<div className={s.bottomNavItem}>
			<img
				src={src}
				alt=''
				width='24px'
				height='24px'
			/>
			<span>{name}</span>
		</div>
	);
};
export default NavItem;
