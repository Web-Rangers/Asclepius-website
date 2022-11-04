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
							<li>
								<Link href='/homePage'>
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
									<DropDown />
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
							</div>
						</ul>
					</section>
				</Modal>
			</div>

			<div className={classes.headerContainer}>
				<Link href={'/'}>
					<a>
						<img
							src='/MedicalLogo.png'
							alt='headerIcon'
							height='50px'
							// className={classes.mobileIcon}
						/>
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
					<Button
						name='დაგვიკავშირდი'
						style={classes.contactBtnStyle}
						onClick={() => router.push('/contactUs')}
					/>
					<Button
						name='შესვლა'
						style={classes.signInBtnStyle}
						onClick={() => router.push('/SignInPage')}
					/>

					<Button
						name='ბარათის შეძენა'
						style={classes.buyCardBtnStyle}
						onClick={() => router.push('/buyCardPage')}
					/>
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
