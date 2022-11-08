import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import classes from '../../styles/passRecovery.module.css';
import { useRouter } from 'next/router';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

export const CreateNewPass = () => {
	const router = useRouter();
	const [values, setValues] = useState({
		password: '',
		repeatPassword: '',
		showPassword: false,
		showRepeatPassword: false,
	});

	const handleChange = (prop) => (value) => {
		setValues({ ...values, [prop]: value });
		console.log(prop);
	};

	const handleClick = (e) => {
		e.preventDefault();
		router.push('/confirmPasswordPage');
	};
	return (
		<>
			<Head>
				<title>Create new password</title>
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
							label='Enter new password'
							type={values.showPassword ? 'text' : 'password'}
							value={values.password}
							onChange={handleChange('password')}
							withIcon
						/>
						<Input
							label='Repeat password'
							variant='filled'
							type={values.showRepeatPassword ? 'text' : 'password'}
							value={values.repeatPassword}
							onChange={handleChange('repeatPassword')}
							withIcon
						/>
						<Button
							type='submit'
							onClick={handleClick}
							name='Send'
						/>
						<div>
							<Link href='/passwordRecoveryPage'>
								<a className={classes.returnTextStyle}> Return back</a>
							</Link>
						</div>
					</div>
				</div>
				<div className={classes.cardsContainer}>
					<img
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

export default CreateNewPass;
