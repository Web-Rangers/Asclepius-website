import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import s from '../../styles/clinicDetailPage.module.css';
import { useRouter } from 'next/router';
import NavDoctor from '../../public/nav-doctor';
import NavHome from '../../public/nav-home';
import NavClinic from '../../public/nav-clinic';
import NavSearch from '../../public/nav-search';
import NavMenu from '../../public/nav-menu';

const NavItem = () => {
	const router = useRouter();

	return (
		<>
			<Link href='/'>
				<div
					className={
						'/' === router.pathname ? s.bottomNavItemActive : s.bottomNavItem
					}
				>
					<NavHome color={'/' === router.pathname ? '#5E70DA' : undefined} />
					<span
						className={
							'/' === router.pathname
								? s.bottomNavItemTitleActive
								: s.bottomNavItemTitle
						}
					>
						მთავარი
					</span>
				</div>
			</Link>
			<Link href='/search'>
				<div
					className={
						'/search' === router.pathname
							? s.bottomNavItemActive
							: s.bottomNavItem
					}
				>
					<NavSearch color={'/' === router.pathname ? '#5E70DA' : undefined} />
					<span
						className={
							'/search' === router.pathname
								? s.bottomNavItemTitleActive
								: s.bottomNavItemTitle
						}
					>
						ძებნა
					</span>
				</div>
			</Link>
			<Link href='/clinicPage'>
				<div
					className={
						'/clinicPage' === router.pathname
							? s.bottomNavItemActive
							: s.bottomNavItem
					}
				>
					<NavClinic
						color={'/clinicPage' === router.pathname ? '#5E70DA' : undefined}
					/>
					<span
						className={
							'/clinicPage' === router.pathname
								? s.bottomNavItemTitleActive
								: s.bottomNavItemTitle
						}
					>
						კლინიკები
					</span>
				</div>
			</Link>
			<Link href='/doctors'>
				<div
					className={
						'/doctors' === router.pathname
							? s.bottomNavItemActive
							: s.bottomNavItem
					}
				>
					<NavDoctor
						color={'/doctors' === router.pathname ? '#5E70DA' : undefined}
					/>
					<span
						className={
							'/doctors' === router.pathname
								? s.bottomNavItemTitleActive
								: s.bottomNavItemTitle
						}
					>
						ექიმები
					</span>
				</div>
			</Link>
			<Link href='/profile'>
				<div
					className={
						'/profile' === router.pathname
							? s.bottomNavItemActive
							: s.bottomNavItem
					}
				>
					<NavMenu
						color={'/profile' === router.pathname ? '#5E70DA' : undefined}
					/>
					<span
						className={
							'/profile' === router.pathname
								? s.bottomNavItemTitleActive
								: s.bottomNavItemTitle
						}
					>
						მენიუ
					</span>
				</div>
			</Link>
		</>
	);
};
export default NavItem;
