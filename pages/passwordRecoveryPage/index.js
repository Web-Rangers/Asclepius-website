import Head from 'next/head';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Input from '../../components/ui/Input';
import classes from '../../styles/passRecovery.module.css';
import Button from '../../components/ui/Button';
import Image from 'next/image';

export const PasswordRecoveryPage = () => {
	const router = useRouter();
	const [email, setEmail] = useState('');

	const handleChange = (event) => {
		setEmail(event.target.value);
	};
	const handleClick = (e) => {
		e.preventDefault();
		router.push('/createNewPass');
	};
	return (
		<>
			<Head>
				<title>Password recovery Page</title>
			</Head>
			<div className={classes.container}>
				<div className={classes.leftSideContainer}>
					<Link href={'/'}>
						<a>
							<img
								src='/MedicalLogo.png'
								alt='headerIcon'
								height='50px'
								className={classes.headerIcon}
							/>
						</a>
					</Link>

					<div className={classes.singInContainer}>
						<h1 className={classes.passwordRecoveryText}>Password recovery</h1>
						<Input
							id='filled-basic'
							label='E-mail'
							variant='filled'
							type='email'
							value={email}
							onChange={handleChange}
							inputProps={{
								className: classes.inputStyle,
							}}
						/>
						<Button
							type='submit'
							onClick={handleClick}
							name='Login'
						/>
						<div>
							<Link href='/signInPage'>
								<a className={classes.returnTextStyle}> Return back</a>
							</Link>
						</div>
					</div>
				</div>
				<div className={classes.cardsContainer}>
					<Image
						src='/cards.png'
						alt='cards'
						width='650px'
						height='500px'
					/>
				</div>
			</div>
		</>
	);
};

export default PasswordRecoveryPage;
