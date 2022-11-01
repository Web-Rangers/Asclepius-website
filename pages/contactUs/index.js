import React, { useState } from 'react';
import classes from '../../styles/signIn.module.css';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Text from '../../components/ui/Text';
import Image from 'next/image';
import Link from 'next/link';

export const ContactUs = () => {
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

	return (
		<>
			<div className={classes.contactUsContainer}>
				<div className={classes.contactUs}>
					<div className={classes.imgForMobile}>
						<Link href={'/homePage'}>
							<a>
								<Image
									src='/contactUs.png'
									alt='cards'
									width='333px'
									height='441'
								/>
							</a>
						</Link>
					</div>
					<div className={classes.singInTextStyle}>
						<h1 className={classes.loginText}>Contact us</h1>
						<Text style={classes.accountText}>
							Our friendly team would love to hear from you!
						</Text>
						<div className={classes.contactInfoForMobile}>
							<div className={classes.iconContactInfo}>
								<img
									src='messages.svg'
									alt='messages'
								/>
								<Text style={classes.contactInfoText}>
									Medicalgroup@gmail.com
								</Text>
							</div>
							<div className={classes.iconContactInfo}>
								<img
									src='location.svg'
									alt='location'
								/>
								<Text style={classes.contactInfoText}>
									Tbilisi , Ana Antonovskaya str. 9
								</Text>
							</div>
							<div className={classes.iconContactInfo}>
								<img
									src='phone.svg'
									alt='phone'
								/>
								<Text style={classes.contactInfoText}>+9955575755576</Text>
							</div>
						</div>
					</div>

					<div className={classes.nameSurnameContainer}>
						<div className={classes.inputField}>
							<Text style={classes.contactUsNameText}>First name</Text>
							<Input
								className={classes.inputField}
								placeholder='Name'
								type='text'
								value={values.name}
								onChange={(value) =>
									setValues((prev) => ({ ...prev, name: value }))
								}
							/>
						</div>
						<div className={classes.inputField}>
							<Text style={classes.contactUsNameText}>Last name</Text>
							<Input
								placeholder='Surname'
								type='text'
								value={values.surname}
								onChange={(value) =>
									setValues((prev) => ({ ...prev, surname: value }))
								}
							/>
						</div>
					</div>
					<Text style={classes.contactUsInputText}>E-mail</Text>
					<Input
						placeholder='E-mail'
						type='email'
						value={values.email}
						onChange={(value) =>
							setValues((prev) => ({ ...prev, email: value }))
						}
					/>
					<Text style={classes.contactUsInputText}>Phone number</Text>
					<Input
						placeholder='Phone number'
						type='text'
						value={values.phoneNumber}
						onChange={(value) =>
							setValues((prev) => ({ ...prev, phoneNumber: value }))
						}
					/>
					<Text style={classes.contactUsInputText}>Message</Text>
					<Input
						placeholder='Message'
						autoComplete='current-password'
						type='text'
						value={values.repeatPassword}
						onChange={(value) =>
							setValues((prev) => ({ ...prev, repeatPassword: value }))
						}
					/>
					<Button
						type='submit'
						name='Send message'
						style={classes.sendBtn}
					/>
				</div>
				<div className={classes.contactUsCardContainer}>
					<div className={classes.cardContainerImg}>
						<img
							src='/contactUs.png'
							alt='cards'
							width='582'
							height='770'
						/>
					</div>
					<div className={classes.contactInfo}>
						<div className={classes.iconContactInfo}>
							<img
								src='/messages.svg'
								alt='messages'
							/>
							<Text style={classes.contactInfoText}>
								Medicalgroup@gmail.com
							</Text>
						</div>
						<div className={classes.iconContactInfo}>
							<img
								src='/location.svg'
								alt='location'
							/>
							<Text style={classes.contactInfoText}>
								Tbilisi , Ana Antonovskaya str. 9
							</Text>
						</div>
						<div className={classes.iconContactInfo}>
							<img
								src='/phone.svg'
								alt='phone'
							/>
							<Text style={classes.contactInfoText}>+9955575755576</Text>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ContactUs;
