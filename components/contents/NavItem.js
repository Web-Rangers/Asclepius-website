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
	const [tab, setTab] = useState(router.pathname);

	return (
		<>
			<Link href='/'>
				<div
					className={'/' === tab ? s.bottomNavItemActive : s.bottomNavItem}
					onClick={() => setTab(router.pathname)}
				>
					<NavHome color={'/' === tab ? '#5E70DA' : undefined} />
					<span
						className={
							'/' === tab ? s.bottomNavItemTitleActive : s.bottomNavItemTitle
						}
					>
						მთავარი
					</span>
				</div>
			</Link>
			<Link href='/search'>
				<div
					className={
						'/search' === tab ? s.bottomNavItemActive : s.bottomNavItem
					}
					onClick={() => setTab(router.pathname)}
				>
					<NavSearch color={'/' === tab ? '#5E70DA' : undefined} />
					<span
						className={
							'/search' === tab
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
						'/clinicPage' === tab ? s.bottomNavItemActive : s.bottomNavItem
					}
					onClick={() => setTab(router.pathname)}
				>
					<NavClinic color={'/clinicPage' === tab ? '#5E70DA' : undefined} />
					<span
						className={
							'/clinicPage' === tab
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
						'/doctors' === tab ? s.bottomNavItemActive : s.bottomNavItem
					}
					onClick={() => setTab(router.pathname)}
				>
					<NavDoctor color={'/doctors' === tab ? '#5E70DA' : undefined} />
					<span
						className={
							'/doctors' === tab
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
						'/profile' === tab ? s.bottomNavItemActive : s.bottomNavItem
					}
					onClick={() => setTab(router.pathname)}
				>
					<NavMenu color={'/profile' === tab ? '#5E70DA' : undefined} />
					<span
						className={
							'/profile' === tab
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
