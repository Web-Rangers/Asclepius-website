import * as React from 'react';
import classes from '../../styles/signIn.module.css';
import s from '../../styles/headerFooter.module.css';
import Link from 'next/link';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Text from '../ui/Text';

export const SignIn = () => {
	return (
		<div className={classes.container}>
			<div className={classes.leftSideContainer}>
				{/* <Link href={'/'}>
					<a>
						<img
							src='/MedicalLogo.png'
							alt='headerIcon'
							height='50px'
							className={classes.headerIcon}
						/>
					</a>
				</Link> */}

				<Link href={'/'}>
					<a className={classes.logoContainer}>
						<img
							src='/footerIcon.png'
							alt='headerIcon'
							width='44px'
							height='40px'
							// className={classes.mobileIcon}
						/>
						<span className={s.logoTextOne}>Pirveli</span>
						<span className={s.logoTextTwo}>.com </span>
					</a>
				</Link>

				<div className={classes.singInContainer}>
					<div className={classes.singInTextStyle}>
						<h1 className={classes.loginText}>Login</h1>
						<Text style={classes.accountText}>
							Do not have an account?
							<Link href='/signUpPage'>
								<a className={classes.linkedTitleStyle}> Create one</a>
							</Link>
						</Text>
					</div>
					<div className={classes.loginOptionsContainer}>
						<button
							type='button'
							className={classes.loginOptionsStyle}
						>
							<img
								src='/google.svg'
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
					<Input
						label='Name'
						type='text'
						inputProps={{
							className: classes.inputStyle,
						}}
					/>
					<Input
						label='Password'
						variant='filled'
						type='password'
						autoComplete='current-password'
						inputProps={{
							className: classes.inputStyle,
						}}
					/>
					<div className={classes.linkedTitle}>
						<Link href='/passwordRecoveryPage'>
							<a className={classes.linkedTitleStyle}>Forget password?</a>
						</Link>
					</div>
					<Button
						type='submit'
						name='Login'
						style={classes.loginBtn}
					/>
				</div>
			</div>
			<div className={classes.cardsContainer}>
				<img
					src='/cards.png'
					alt='cards'
					width='608px'
					height='792px'
				/>
			</div>
		</div>
	);
};
