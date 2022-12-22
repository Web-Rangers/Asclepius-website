import { useState, useEffect, useRef } from 'react';
import Button from '../ui/Button';
import classes from '../../styles/headerFooter.module.css';
import DropDown from '../ui/DropDown';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Modal from 'react-modal';
import { getData } from '../request';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { ReactSVG } from 'react-svg';
import 'antd/dist/antd.css';
import classNames from 'classnames';

const customStyles = {
	content: {
		position: 'absolute',
		background: '#FFBBB6',
		width: '100%',
		height: '100%',
		top: 0,
		margin: 0,
		inset: '0px 0px 0px',
		zIndex: 1,
		// border: "none",
	},
};

const items = [
	{
		label: <Link href='https://profile.pirveli.com'>Settings</Link>,

		key: '1',
	},
	{
		label: <Link href='/'>About us</Link>,
		key: '2',
	},
	{
		label: <Link href='/'>My cards</Link>,
		key: '3',
	},
];

const Header = () => {
	const router = useRouter();
	const [modalIsOpen, setIsOpen] = useState(false);
	const [searchInput, setSearchInput] = useState('');
	const [user, setUser] = useState(null);
	const [userInfo, setUserInfo] = useState({});
	const headerRef = useRef();
	const [points, setPoints] = useState(null);
	const [userAvatar, setUserAvatar] = useState({
		img: ``,
		color: '',
	});

	const handleChange = (e) => {
		setSearchInput(e.target.value);
	};

	const openModal = () => {
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
	};

	useEffect(() => {
		getData(`${process.env.MEDICAL_API}/medical/registry/user-id`).then(
			(response) => {
				if (response?.notFound) {
					setUser(false);
				} else {
					setUser(true);
				}
				setUserInfo(response);
				console.log(response);
			}
		);

		getData(`${process.env.MEDICAL_API}/medical/registry/get-user-avatar`).then(
			(e) => {
				setUserAvatar({
					img: `/avatar${e?.path}.png`,
					color: `#${e?.code?.toString()}`,
				});
			}
		);

		getData(`${process.env.MEDICAL_API}/medical/products/user-points`).then(
			(response) => {
				setPoints(response?.amountOfPoints);
			}
		);
	}, []);

	useEffect(() => {
		modalIsOpen
			? (document.body.style.overflow = 'hidden')
			: (document.body.style.overflow = 'scroll');
	}, [modalIsOpen]);

	const [offset, setOffset] = useState(0);

	useEffect(() => {
		const onScroll = () => setOffset(window.pageYOffset);
		// clean up code
		window.removeEventListener('scroll', onScroll);
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	return (
		<>
			<div className={classes.siteStatus}>საიტი მუშაობს სატესტო რეჟიმში</div>
			<div className={classes.smallheaderContainer}>
				<div className={classes.content}>
					<div className={classes.smallheaderLeft}>
						<Link href='https://shop.pirveli.com/'>
							<a className={classes.smallheaderLeftText}>მაღაზია</a>
						</Link>

						<Link href='/'>
							<a className={classes.smallheaderLeftTextMedical}>მედიქალი</a>
						</Link>
						<Link href='https://vouchers.pirveli.com'>
							<a className={classes.smallheaderLeftText}>ვაუჩერები</a>
						</Link>
						<Link href='https://win.pirveli.com'>
							<a className={classes.smallheaderLeftText}>გათამაშება</a>
						</Link>
						<Link href='https://game.pirveli.com'>
							<a className={classes.smallheaderLeftText}>თამაშები</a>
						</Link>
					</div>
					<div className={classes.smallheaderRight}>
						<img
							src='/coin.png'
							alt='headerIcon'
							width={20}
						/>
						<span className={classes.coinStyle}>{points}</span>
						<div className={classes.coinBorder}></div>
						<DropDown />
					</div>
				</div>
			</div>
			<div className={classes.headerForMobile}>
				<div className={classes.mobileHeaderContainer}>
					<img
						src='/footerIcon.png'
						alt='headerIcon'
						width='44px'
						height='40px'
					/>

					<div className={classes.mobileheader}>
						<div className={classes.searchInputMobile}>
							<input
								type='search'
								value={searchInput}
								onChange={handleChange}
							/>
							<img
								src='/Search.svg'
								alt='Search'
							/>
						</div>
						<div onClick={openModal}>
							<Image
								src='/burgerIcon.svg'
								alt='burger icon'
								width='20px'
								height='16px'
							/>
						</div>
					</div>
				</div>

				<Modal
					isOpen={modalIsOpen}
					onRequestClose={closeModal}
					style={customStyles}
					shouldFocusAfterRender={true}
					contentLabel='Example Modal'
				>
					<section className={classes.modalContent}>
						<div
							className={classes.closeBtn}
							onClick={closeModal}
						>
							<Image
								alt='closeIcon'
								src='/closeBurgerMenu.svg'
								width='16px'
								height='16px'
							/>
						</div>
						<ul>
							<div className={classes.burgerMeneFirstPart}>
								<li>
									<Link href='/'>
										<a onClick={closeModal}>Home</a>
									</Link>
								</li>
								<li>
									<Link href='/clinicPage'>
										<a onClick={closeModal}> Clinics</a>
									</Link>
								</li>
								<li>
									<Link href='/buyCardPage'>
										<a onClick={closeModal}> Cards</a>
									</Link>
								</li>
							</div>
							<div className={classes.burgerMenuAuth}>
								{user && (
									<>
										<li>
											<Link href='/signInPage'>
												<a>Sign in</a>
											</Link>
										</li>
										<li>
											<Link href='/signUpPage'>
												<a>Registration</a>
											</Link>
											{/* <Button
											name='Registration'
											style={classes.registrationButton}
											onClick={handleClick}
										/> */}
										</li>
									</>
								)}

								<li>
									<DropDown withName={true} />
								</li>
								<div className={classes.iconContainer}>
									<img
										src='/facebook.svg'
										alt='facebook'
										className={classes.iconsStyle}
									/>
									<img
										src='/Instagram.svg'
										alt='instagram'
										className={classes.iconsStyle}
									/>
								</div>
								<span className={classes.allRightText}>
									© 2022 All right reserved.
								</span>
							</div>
						</ul>
					</section>
				</Modal>
			</div>
			<div className={classes.headerContainerBg}>
				<div className={classes.headerContainer}>
					<Link href={'/'}>
						<a className={classes.logoContainer}>
							<img
								src='/logo.png'
								alt='headerIcon'
								width='154px'
								height='32px'
								// className={classes.mobileIcon}
							/>
						</a>
					</Link>

					<div
						className={classNames(classes.searchInput, {
							[classes.defaultSearchInput]: offset < 48,
							[classes.scrollsearch]: offset > 48,
						})}
					>
						<input
							type='search'
							value={searchInput}
							onChange={handleChange}
							placeholder='მოძებნე ექიმი ან კლინიკა...'
						/>
						<button>
							<ReactSVG src='/searchIconsvg.svg' />
							<span>ძებნა</span>
						</button>
					</div>

					<div className={classes.rightSideContainerStyle}>
						{/* <div className={classes.contactUsIcon}>
							<Image
								src='/contactUSIcon.svg'
								alt='contactUsIcon'
								width='17px'
								height='17px'
							/>
						</div> */}
						<div className={classes.hideText}>
							<Link href='/contactUs'>
								<a className={classes.contactBtnStyle}>დაგვიკავშირდი</a>
							</Link>
						</div>

						<Link href='/buyCardPage'>
							<span
								className={classNames(classes.buyCardBtnStyle, {
									[classes.buyCardBtnShow]: offset > 47,
								})}
							>
								ბარათის ყიდვა
							</span>
						</Link>
						{(user == null || !user) && (
							<Link href='https://auth.pirveli.com/realms/xracoon-demo/protocol/openid-connect/auth?response_type=code&client_id=demo-client&scope=email%20profile%20roles%20openid&state=S_SXwlNFk9uQvJbIiv14woIxYEPZC0KGVwjYO2mZUIw%3D&redirect_uri=https://medical.pirveli.com/login/oauth2/code/keycloak&nonce=p73X0jpKyzGZ_AqZWl7bCU4mqpCfVacuaqV-7MddFgk'>
								<a className={classes.signInBtnStyle}>შესვლა</a>
							</Link>
						)}
						{user && (
							<div
								className={classes.authorizedUser}
								ref={headerRef}
							>
								<Dropdown
									menu={{
										items,
									}}
									trigger={['click']}
									dropdownRender={(nodes) => {
										return (
											<>
												<div className={classes.auth_user_menu}>
													<h2>My Account</h2>
													<Link href='/user'>
														<div className={classes.auth_user_icon}>
															<div
																className={classes.avatarBg}
																style={{
																	backgroundColor: `${userAvatar?.color}`,
																}}
															>
																<img
																	src={`${
																		userAvatar?.img !== '/avatarundefined.png'
																			? userAvatar?.img
																			: '/defaulticon.png'
																	}`}
																/>
															</div>
															<h4>
																{userInfo?.firstName} {userInfo?.lastName}
															</h4>
															<ReactSVG src='/userArrow.svg' />
														</div>
													</Link>

													<div className={classes.auth_user_options}>
														{items?.map((item, key) => {
															return <li key={key}>{item.label}</li>;
														})}
													</div>
													<Link href='https://auth.pirveli.ge/realms/xracoon-demo/protocol/openid-connect/logout'>
														<div className={classes.auth_logout}>
															<ReactSVG src='/Logout.svg' />
															Log out
														</div>
													</Link>
												</div>
											</>
										);
									}}
									overlayClassName={classes.userDropBlock}
									placement={'bottomRight'}
									getPopupContainer={() => headerRef.current}
								>
									<a onClick={(e) => e.preventDefault()}>
										<Space>
											<div
												className={classes.avatarBg}
												style={{ backgroundColor: `${userAvatar?.color}` }}
											>
												<img
													src={`${
														userAvatar?.img !== '/avatarundefined.png'
															? userAvatar?.img
															: '/defaulticon.png'
													}`}
												/>
											</div>
										</Space>
									</a>
								</Dropdown>
							</div>
						)}
						<div className={classes.burgerMenuicon}>
							<ReactSVG src='/burgericonv2.svg' />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Header;
