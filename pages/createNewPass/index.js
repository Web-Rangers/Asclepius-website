import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
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

	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
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
					<Link href={'/homePage'}>
						<a>
							<img
								src='headerIcon.svg'
								alt='headerIcon'
								className={classes.headerIcon}
							/>
						</a>
					</Link>
					<div className={classes.singInContainer}>
						<h1 className={classes.passwordRecoveryText}>Password recovery</h1>
						<Input
							withIcon={true}
							label='Enter new password'
							type={'password'}
							value={values.password}
							onChange={(value) =>
								setValues((prev) => ({ ...prev, password: value }))
							}
						/>

						<Input
							withIcon={true}
							label='Repeat password'
							type={'text'}
							value={values.repeatPassword}
							onChange={(value) =>
								setValues((prev) => ({ ...prev, repeatPassword: value }))
							}
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
						src='cards.png'
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
