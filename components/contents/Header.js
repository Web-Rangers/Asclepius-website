import { useState } from 'react';
import Button from '../ui/Button';
import classes from '../../styles/headerFooter.module.css';
import DropDown from '../ui/DropDown';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Modal from 'react-modal';

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

const Header = () => {
	const router = useRouter();
	const [modalIsOpen, setIsOpen] = useState(false);
	const [searchInput, setSearchInput] = useState('');

	const handleChange = (e) => {
		setSearchInput(e.target.value);
	};

	const openModal = () => {
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
	};

	return (
		<>
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
								placeholder='Search...'
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
			<div className={classes.smallheaderContainer}>
				<div className={classes.content}>
					<div className={classes.smallheaderLeft}>
						<Link href='/'>
							<a className={classes.smallheaderLeftText}>E-commerce</a>
						</Link>

						<Link href='/'>
							<a className={classes.smallheaderLeftTextMedical}>
								{' '}
								Medical Card
							</a>
						</Link>
						<Link href='/'>
							<a className={classes.smallheaderLeftText}>Discount</a>
						</Link>
						<Link href='/'>
							<a className={classes.smallheaderLeftText}>Lotto</a>
						</Link>
					</div>
					<div className={classes.smallheaderRight}>
						<img
							src='/coin.svg'
							alt='headerIcon'
						/>
						<span className={classes.coinStyle}>40.076</span>
						<DropDown />
					</div>
				</div>
			</div>
			<div className={classes.headerContainer}>
				<Link href={'/'}>
					<a className={classes.logoContainer}>
						<img
							src='/footerIcon.png'
							alt='headerIcon'
							width='44px'
							height='40px'
							// className={classes.mobileIcon}
						/>
						<span className={classes.logoTextOne}>Pirveli</span>
						<span className={classes.logoTextTwo}>.com </span>
					</a>
				</Link>

				<div className={classes.searchInput}>
					<input
						type='search'
						placeholder='Search...'
						value={searchInput}
						onChange={handleChange}
					/>

					<img
						src='/Search.svg'
						alt='Search'
					/>
				</div>

				<div className={classes.rightSideContainerStyle}>
					<Link href='/contactUs'>
						<a className={classes.contactBtnStyle}>დაგვიკავშირდი</a>
					</Link>
					<Link href='/signInPage'>
						<a className={classes.signInBtnStyle}>შესვლა</a>
					</Link>
					<Link href='/buyCardPage'>
						<a className={classes.buyCardBtnStyle}>ბარათის შეძენა</a>
					</Link>
				</div>

				{/* <ul className={classes.navbar}>
					<li>
						<Link href='/'>
							<a>Home </a>
						</Link>
					</li>
					<li>
						<Link href='/Button'>
							<a>Button</a>
						</Link>
					</li>
					<li>
						<Link href='/aboutUsPage'>
							<a> About us</a>
						</Link>
					</li>
					<li>
						<Link href='#Offers'>
							<a>Offers</a>
						</Link>
					</li>
					<li>
						<Link href='/contactUs'>
							<a>Contact</a>
						</Link>
					</li>
					<li>
						<Button
							name='Sign in'
							style={classes.signInButton}
							onClick={handleClick}
						/>
					</li>
					<li>
						<DropDown />
					</li>
				</ul> */}
			</div>
		</>
	);
};

export default Header;
