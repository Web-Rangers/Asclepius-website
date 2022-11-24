import React, { useState } from 'react';
import classes from '../../styles/signIn.module.css';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Text from '../ui/Text';
import Link from 'next/link';

export const SignUp = () => {
	const [values, setValues] = useState({
		name: '',
		surname: '',
		email: '',
		phoneNumber: '',
		password: '',
		repeatPassword: '',
		showPassword: false,
		showRepeatPassword: false,
	});

	const handleChange = (prop) => (value) => {
		setValues({ ...values, [prop]: value });
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

	return (
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
					<div className={classes.singInTextStyle}>
						<h1 className={classes.loginText}>Sign up</h1>
						<Text style={classes.accountText}>
							You already have an account?
							<Link href='/signInPage'>
								<a className={classes.linkedTitleStyle}> Sign in</a>
							</Link>
						</Text>
					</div>
					<div className={classes.loginOptionsContainer}>
						<button
							type='button'
							className={classes.loginOptionsStyle}
						>
							<img
								src='/footerIcon.png'
								alt='logo'
								className={classes.iconsStyle}
							/>
							Pirveli.com
						</button>
					</div>
					<div className={classes.lineContainer}>
						<Text style={classes.line} />
						<Text style={classes.lineTextStyle}>or</Text>
						<Text style={classes.line} />
					</div>
					<div className={classes.nameSurnameContainer}>
						<Input
							id='filled-basic'
							label='Name'
							variant='filled'
							type='text'
							value={values.name}
							onChange={handleChange('name')}
						/>
						<Input
							id='filled-basic'
							label='Surname'
							variant='filled'
							type='text'
							value={values.surname}
							onChange={handleChange('surname')}
						/>
					</div>
					<Input
						id='filled-basic'
						label='E-mail'
						variant='filled'
						type='email'
						value={values.email}
						onChange={handleChange('email')}
					/>
					<Input
						id='filled-basic'
						label='Phone number'
						variant='filled'
						type='text'
						value={values.phoneNumber}
						onChange={handleChange('phoneNumber')}
					/>
					<Input
						id='filled-basic'
						label='Password'
						variant='filled'
						type={'password'}
						value={values.password}
						onChange={handleChange('password')}
						autoComplete='current-password'
						withIcon
					/>
					<Input
						id='filled-basic'
						label='Repeat password'
						variant='filled'
						autoComplete='current-password'
						type={'password'}
						value={values.repeatPassword}
						onChange={handleChange('repeatPassword')}
						withIcon
					/>
					<span className={classes.termAndCondition}>
						<input
							type='checkbox'
							name='checkbox'
						/>
						I agree to the <a>terms</a> and <a>conditions</a>{' '}
					</span>
					<Button
						type='submit'
						name='Sign Up'
					/>
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
	);
};
