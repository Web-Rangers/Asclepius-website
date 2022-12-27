import React from 'react';
import Link from 'next/link';
import s from '../../styles/clinicDetailPage.module.css';

const NavItem = ({ name, path, src }) => {
	const navLinks = [
		{ name: 'მთავარი', path: '/', src: '/nav-home.svg' },
		{
			name: 'ძებნა',
			path: '/family',
			src: '/nav-search.svg',
		},
		{
			name: 'კლინიკები',
			path: '/calendar',
			src: '/nav-clinic.svg',
		},
		{
			name: 'ექიმები',
			path: '/notifications',
			src: '/nav-doctor.svg',
		},
		{
			name: 'მენიუ',
			path: '/profile',
			src: '/nav-menu.svg',
		},
	];
	return (
		<>
			{navLinks.map((item, i) => (
				<div
					className={s.bottomNavItem}
					key={i}
				>
					<img
						src={item.src}
						alt=''
						width='24px'
						height='24px'
					/>
					<span>{item.name}</span>
				</div>
			))}
		</>
	);
};
export default NavItem;
