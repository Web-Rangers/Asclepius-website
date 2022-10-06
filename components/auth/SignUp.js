import React, { useState } from 'react';
import classes from '../../styles/signIn.module.css';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Text from '../ui/Text';
import Link from 'next/link';
import { ReactSVG } from 'react-svg';
import classNames from 'classnames';
import styles from '../../styles/components/datePicker.module.css';

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
		type: 'password',
	});

	const handleClickShowPassword = () => {
		setValues({
			...values,
			showPassword: !values.showPassword,
			type: values.type === 'password' ? 'text' : 'password',
		});
	};

	const handleClickShowRepeatPassword = () => {
		setValues({
			...values,
			showRepeatPassword: !values.showRepeatPassword,
			type: values.type === 'password' ? 'text' : 'password',
		});
	};

	return (
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
								src='google.svg'
								alt='google'
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
							label='Name'
							type='text'
							value={values.name}
							onChange={(value) =>
								setValues((prev) => ({ ...prev, name: value }))
							}
						/>
						<Input
							label='Surname'
							type='text'
							value={values.surname}
							onChange={(value) =>
								setValues((prev) => ({ ...prev, surname: value }))
							}
						/>
					</div>
					<Input
						label='E-mail'
						type='text'
						value={values.email}
						onChange={(value) =>
							setValues((prev) => ({ ...prev, email: value }))
						}
					/>
					<Input
						label='Phone number'
						variant='filled'
						type='text'
						value={values.phoneNumber}
						onChange={(value) =>
							setValues((prev) => ({ ...prev, phoneNumber: value }))
						}
					/>
					<Input
						label='Password'
						variant='filled'
						type={values.showPassword}
						value={values.password}
						onChange={(value) =>
							setValues((prev) => ({ ...prev, password: value }))
						}
						onClick={handleClickShowPassword}
					/>
					{values.type === 'password' ? (
						<ReactSVG
							src={'eye-off.svg'}
							className={classNames(styles.passIcon)}
							onClick={handleClickShowPassword}
						/>
					) : (
						<ReactSVG
							src={'eye.svg'}
							className={classNames(styles.passIcon)}
							onClick={handleClickShowPassword}
						/>
					)}

					<Input
						label='Repeat password'
						type={values.type}
						value={values.repeatPassword}
						onChange={(value) =>
							setValues((prev) => ({ ...prev, repeatPassword: value }))
						}
					/>
					{values.type === 'password' ? (
						<ReactSVG
							src={'eye-off.svg'}
							className={classNames(styles.passIcon)}
							onClick={handleClickShowRepeatPassword}
						/>
					) : (
						<ReactSVG
							src={'eye.svg'}
							className={classNames(styles.passIcon)}
							onClick={handleClickShowRepeatPassword}
						/>
					)}
				</div>
				<Button
					type='submit'
					name='Login'
				/>
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
	);
};
