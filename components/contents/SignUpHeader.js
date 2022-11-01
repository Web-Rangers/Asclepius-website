import { useState } from 'react';
import classes from '../../styles/headerFooter.module.css';
import Link from 'next/link';
import Image from 'next/image';
import DropDown from '../ui/DropDown';
import Button from '../ui/Button';
import { useRouter } from 'next/router';

const SignUpHeader = () => {
	const router = useRouter();
	const [messages, setMessages] = useState(true);
	const [searchInput, setSearchInput] = useState('');

	const handleChange = (e) => {
		setSearchInput(e.target.value);
	};

	return (
		<div className={classes.headerContainer}>
			<div className={classes.signUpHeaderContainer}>
				<div className={classes.f_half}>
					<div className={classes.navbarContainer}>
						<Link href='/'>
							<a>
								<img
									src='/MedicalLogo.png'
									alt='headerIcon'
									height='50px'
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

						{/* <ul className={classes.navbarItems}>
							<li>
								<Link href='/'>
									<a>Home</a>
								</Link>
							</li>
							<li>
								<Link href='/buyCardPage'>
									<a>Cards</a>
								</Link>
							</li>
							<li>
								<Link href='/clinicPage'>
									<a> Services</a>
								</Link>
								<div className={classes.dropdown}>
									<ul>
										<li>
											<Link href=''>
												<a>Online consultation</a>
											</Link>
										</li>
										<li>
											<Link href='/clinicPage'>
												<a>visit to the clinic</a>
											</Link>
										</li>
										<li>
											<Link href=''>
												<a>doctor at home</a>
											</Link>
										</li>
										<li>
											<Link href=''>
												<a>laboratory</a>
											</Link>
										</li>
									</ul>
								</div>
							</li>
						</ul> */}
					</div>
				</div>
				<div className={classes.userProfilePart}>
					<Button
						name='დაგვიკავშირდი'
						style={classes.contactBtnStyle}
						onClick={() => router.push('/contactUs')}
					/>

					<Button
						name='ბარათის შეძენა'
						style={classes.buyCardBtnStyle}
						onClick={() => router.push('/buyCardPage')}
					/>

					<div className={classes.user}>
						{messages ? (
							<img
								src='/notificationwithsms.svg'
								alt='notificationwithsms'
							/>
						) : (
							<img
								src='/notification.svg'
								alt='notification'
							/>
						)}
						<img
							src='/testUser.png'
							alt='testUSerImage'
						/>
						{/* <img
						src='/dropDown.svg'
						alt='Search'
					/> */}
					</div>
				</div>
				<div className={classes.burger}>
					<img
						src='/burger.svg'
						alt=''
					/>
				</div>
				{/* <div className={classes.languages}>
					<DropDown />
				</div> */}
			</div>
		</div>
	);
};

export default SignUpHeader;
