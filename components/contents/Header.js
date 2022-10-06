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
		background: '#3A74D2',
		width: '100%',
		height: '100%',
		top: 0,
		margin: 0,
		inset: '0px 0px 0px',
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

	const handleClick = (e) => {
		e.preventDefault();
		router.push('/signInPage');
		setIsOpen(false);
	};

	return (
		<>
			<div className={classes.headerForMobile}>
				<div className={classes.mobileHeaderContainer}>
					<img
						src='/headerIcon.svg'
						alt='headerIcon'
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
								<Link href='/buyCardPage'>
									<a onClick={closeModal}> Cards</a>
								</Link>
							</li>
							<li>
								<Link href='/onlineConsultation'>
									<a onClick={closeModal}> Online consultation</a>
								</Link>
							</li>

							<li>
								<Link href='/VisitClinic'>
									<a onClick={closeModal}> Visit to the clinic</a>
								</Link>
							</li>
							<li>
								<Link href='/Laboratory'>
									<a onClick={closeModal}> Laboratory</a>
								</Link>
							</li>

							<li>
								<Link href='/contactUs'>
									<a onClick={closeModal}> Contact</a>
								</Link>
							</li>
							<li>
								<Link href='#Offers'>
									<a onClick={closeModal}>Offers</a>
								</Link>
							</li>

							<li>
								<Link href='/signInPage'>
									<a>Sign in</a>
								</Link>
							</li>
							<li>
								<Button
									name='Registration'
									style={classes.registrationButton}
									onClick={handleClick}
								/>
							</li>
							<li>
								<DropDown />
							</li>
						</ul>
					</section>
				</Modal>
			</div>

			<div className={classes.headerContainer}>
				<Link href={'/'}>
					<a>
						<img
							src='/headerIcon.svg'
							alt='headerIcon'
							className={classes.mobileIcon}
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
				<ul className={classes.navbar}>
					<li>
						<Link href='/homePage'>
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
				</ul>
			</div>
		</>
	);
};

export default Header;
