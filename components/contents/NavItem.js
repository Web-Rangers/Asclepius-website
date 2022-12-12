import React from 'react';
import Link from 'next/link';
import s from '../../styles/clinicDetailPage.module.css';

const NavItem = ({ name, path, src }) => {
	const navLinks = [
		{ name: 'Main', path: '/', src: '/main.svg' },
		{
			name: 'Family',
			path: '/family',
			src: '/familySvg.svg',
		},
		{
			name: 'Calendar',
			path: '/calendar',
			src: '/calendarSvg.svg',
		},
		{
			name: 'Notifications',
			path: '/notifications',
			src: '/notifications.svg',
		},
		{
			name: 'Profile',
			path: '/profile',
			src: '/profileNav.svg',
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
