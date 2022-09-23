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

	const handleClickShowPassword = () => {
		setValues({
			...values,
			showPassword: !values.showPassword,
		});
	};
	const handleClickShowRepeatPassword = () => {
		setValues({
			...values,
			showRepeatPassword: !values.showRepeatPassword,
		});
	};
	const handleMouseDownPassword = (event) => {
		event.preventDefault();
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
							label='Enter new password'
							type={values.showPassword ? 'text' : 'password'}
							value={values.password}
							onChange={handleChange('password')}
							inputProps={{
								className: classes.inputStyle,
								endAdornment: (
									<InputAdornment position='end'>
										<IconButton
											aria-label='toggle password visibility'
											onClick={handleClickShowPassword}
											onMouseDown={handleMouseDownPassword}
											edge='end'
										>
											{values.showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								),
							}}
						/>
						<Input
							label='Repeat password'
							variant='filled'
							type={values.showRepeatPassword ? 'text' : 'password'}
							value={values.repeatPassword}
							onChange={handleChange('repeatPassword')}
							inputProps={{
								className: classes.inputStyle,
								endAdornment: (
									<InputAdornment position='end'>
										<IconButton
											aria-label='toggle password visibility'
											onClick={handleClickShowRepeatPassword}
											onMouseDown={handleMouseDownPassword}
											edge='end'
										>
											{values.showRepeatPassword ? (
												<VisibilityOff />
											) : (
												<Visibility />
											)}
										</IconButton>
									</InputAdornment>
								),
							}}
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
					/>
				</div>
			</div>
		</>
	);
};

export default CreateNewPass;
