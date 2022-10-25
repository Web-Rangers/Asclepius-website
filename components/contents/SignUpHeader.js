import { useState } from 'react';
import classes from '../../styles/headerFooter.module.css';
import Link from 'next/link';
import Image from 'next/image';
import DropDown from '../ui/DropDown';

const SignUpHeader = () => {
	const [messages, setMessages] = useState(true);
	const [searchInput, setSearchInput] = useState('');

	const handleChange = (e) => {
		setSearchInput(e.target.value);
	};

	return (
		<div className={classes.signUpHeaderContainer}>
			<div className={classes.f_half}>
				<div>
					<Link href='/'>
						<a>
							<Image
								src='/headerIcon.svg'
								alt='headerIcon'
								width='47px'
								height='40px'
							/>
						</a>
					</Link>
				</div>
				<div className={classes.navbarContainer}>
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
					<ul className={classes.navbarItems}>
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
							<Link href='/branchPage'>
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
										<Link href='/branchPage'>
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
					</ul>
				</div>
			</div>
			<div className={classes.userProfilePart}>
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
				<img
					src='/dropDown.svg'
					alt='Search'
				/>
			</div>
			<div className={classes.burger}>
				<img
					src='/burger.svg'
					alt=''
				/>
			</div>
			<div className={classes.languages}>
				<DropDown />
			</div>
		</div>
	);
};

export default SignUpHeader;
