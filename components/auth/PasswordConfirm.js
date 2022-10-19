import React, { useState } from 'react';
import Input from '../ui/Input';
import classes from '../../styles/passRecovery.module.css';
import Button from '../ui/Button';
import Text from '../ui/Text';
import Link from 'next/link';

export const PasswordConfirm = () => {
	const [enterCode, setEnterCode] = useState('');

	const handleChange = (value) => {
		setEnterCode(value);
		console.log(value);
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
					<div className={classes.confirmIcon}>
						<img
							src='confirm.svg'
							alt='Confirm Icon'
						/>
					</div>
					<div className={classes.confirmCodeConatiner}>
						<h1 className={classes.checkEmailText}>Please check your E-mail</h1>
						<Text style={classes.codeText}>
							A one time code will be sent to your e-mail{' '}
						</Text>
						<Input
							id='filled-basic'
							label='Enter code'
							variant='filled'
							type='text'
							value={enterCode}
							onChange={(value) => handleChange(value)}
						/>
						<Button
							type='submit'
							name={'Confirm'}
							style={s.viewClinicBtn}
						/>
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
	);
};
