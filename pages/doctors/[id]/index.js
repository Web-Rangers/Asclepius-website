import { useState } from 'react';
import styles from '../../../styles/pages/doctorDetailed.module.css';
import s from '../../../styles/clinicDetailPage.module.css';
import Link from 'next/link';
import Calendar from '../../../components/Calendar';
import classNames from 'classnames';
import Select from '../../../components/Select';
import AddFamilyMember from '../../../components/modals/addFamilyMember';
import { getData } from '../../../components/request';
import { useRouter } from 'next/router';
import Input from '../../../components/Input';
import Button from '../../../components/ui/Button';
import NavItem from '../../../components/contents/NavItem';

let API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function DoctorDetailed({
										   doctor = [],
										   educations = [],
										   certificates = [],
										   workingDays = [],
									   }) {
	const [contact, setContact] = useState('');
	const [patient, setPatient] = useState('');
	const [modalIsOpen, setModalOpen] = useState(false);
	const router = useRouter();
	const [tab, setTab] = useState('certificates');
	const { firstName, lastName, pictureUrl, professions, aboutMe } = doctor;

	console.log('sertifi', educations);
	return (
		<>
			{modalIsOpen && <AddFamilyMember onClose={() => setModalOpen(false)} />}
			<div className={s.mobileBottomNav}>
				<NavItem />
			</div>
			<div className={styles.doctorBody}>
				<div className={styles.doctorContainer}>
					<div className={styles.back}>
						<img
							src='/backBtn.svg'
							alt=''
							onClick={() => router.push('/doctors')}
						/>
					</div>
					<div className={styles.content}>
						<div className={styles.doctor}>
							<div className={styles.poster}>
								{/* <div className={styles.doctorStar}>
									<img
										src='/whiteStar.svg'
										alt=''
									/>
									<span>4.9</span>
								</div> */}
								<img
									className={styles.doctorImage}
									src={pictureUrl}
									alt=''
								/>
							</div>
							{/* <div className={styles.doctorContact}>
								<div className={styles.contact}>
									<img
										className={styles.video}
										src='/videoIcon.svg'
										alt=''
									/>
								</div>
								<div className={styles.contact}>
									<img
										className={styles.phone}
										src='/phoneContact.svg'
										alt=''
									/>
								</div>
								<div className={styles.contact}>
									<img
										className={styles.home}
										src='/home.svg'
										alt=''
									/>
								</div>
							</div> */}
							<div className={styles.aboutDocContainer}>
								<div className={styles.aboutDoctor}>
									<h2>{firstName + '  ' + lastName}</h2>
									<div className={styles.proffesion}>
										{professions?.map((prof, i) => {
											return (
												<div
													key={i}
													className={styles.prof}
												>
													{prof?.name}
												</div>
											);
										})}
									</div>
								</div>
								<div className={styles.address}>
									<img
										src='/doctorLocation.svg'
										alt=''
									/>
									<h4>Carymouth , Hallmark Clinic</h4>
								</div>
								<div className={styles.language}>
									<span className={styles.languageTitle}>
										<img
											src='/globus.svg'
											alt=''
										/>
										Language
									</span>
									<div className={styles.languageList}>
										<span>Geo</span>
										<span>Eng</span>
										<span>Rus</span>
									</div>
								</div>
							</div>
							<div className={styles.cetificates}>
								<div className={styles.certTitle}>
									<img
										src='/certificates.svg'
										alt=''
									/>
									<h2>Certificates</h2>
								</div>
								{certificates !== null &&
									certificates?.map(
										(
											{
												galleryList,
												issueDate,
												expirationDate,
												title,
												issuer,
												credentialId,
											},
											i
										) => {
											return (
												<>
													<div
														key={i}
														className={styles.certificate}
													>
														<div className={styles.certCheckmark}>
															<img
																src={galleryList && '/Mask.svg'}
																alt=''
															/>
														</div>
														<div className={styles.certificateInfo}>
															<h2>{title}</h2>
															<p>{issuer}</p>
															<h4>{[issueDate, ' - ', expirationDate]}</h4>
															<div className={styles.certLink}>
																<img
																	src='/disabledEye.svg'
																	alt=''
																/>
																<Link href='/'>
																	<a>https://thenounproject.com</a>
																</Link>
															</div>
															<p> ID:{credentialId}</p>
														</div>
													</div>
												</>
											);
										}
									)}
							</div>
						</div>

						<div className={styles.doctorInfo}>
							<div className={styles.about}>
								<div className={styles.aboutTitle}>
									<img
										src='/aboutMe.svg'
										alt=''
									/>
									<h2>About me</h2>
								</div>
								<div className={styles.aboutTxt}>
									<span>{aboutMe}</span>
								</div>
							</div>
							<div className={styles.education}>
								<div className={styles.educationTitle}>
									<img
										src='/education.svg'
										alt=''
									/>
									<h2>Education</h2>
								</div>
								<div className={styles.educationContent}>
									{educations !== null &&
										educations?.map(
											({ dateEnd, dateStart, degree, school }, i) => {
												return (
													<>
														<div
															key={i}
															className={styles.educationItem}
														>
															<div className={styles.data}>
																{dateEnd} - {dateStart} yr.
															</div>
															<h2>{degree}</h2>
															<p>{school}</p>
														</div>
													</>
												);
											}
										)}
								</div>
							</div>
						</div>
						<div className={styles.tabForMobile}>
							<ul className={styles.tabNav}>
								<li
									className={classNames({
										[styles.activeTab]: tab === 'certificates',
									})}
									onClick={() => setTab('certificates')}
								>
									Certificate
								</li>
								<li
									onClick={() => setTab('aboutme')}
									className={classNames({
										[styles.activeTab]: tab === 'aboutme',
									})}
								>
									About me
								</li>
								<li
									onClick={() => setTab('education')}
									className={classNames({
										[styles.activeTab]: tab === 'education',
									})}
								>
									Education
								</li>
							</ul>
							{tab === 'certificates' ? (
								<>
									<div className={styles.certificate}>
										<div className={styles.certCheckmark}></div>
										{certificates !== null &&
											certificates?.map((item) => (
												<div
													className={styles.certificateInfo}
													key={item.id}
												>
													<h2>
														{' '}
														<img
															src='/checkMark.svg'
															alt=''
														/>
														{item.title}
													</h2>
													<p>{item.issuer}</p>
													<h4>
														{[item.issueDate, ' - ', item.expirationDate]}
													</h4>

													<div className={styles.certLink}>
														<img
															src='/disabledEye.svg'
															alt=''
														/>
														<Link href='/'>
															<a>{item.credentialInfo}</a>
														</Link>
													</div>
													<p> ID:{item.credentialId}</p>
												</div>
											))}
									</div>
								</>
							) : null}
							{tab === 'aboutme' ? (
								<div className={styles.aboutTxt}>
									<span>{aboutMe}</span>
								</div>
							) : null}
							{tab === 'education'
								? educations !== null &&
								educations?.map((item) => (
									<div
										className={styles.educationContent}
										key={item.id}
									>
										<div className={styles.educationItem}>
											<div className={styles.data}>
												{' '}
												{item.dateEnd} - {item.dateStart} yr.
											</div>
											<h2>{item.degree}</h2>
											<p>{item.school}</p>
										</div>
									</div>
								))
								: null}
						</div>

						{/* <div className={styles.doctorServices}>
							<div className={styles.booking}>
								<div className={styles.bookingHeader}>
									<img
										src='/booking.svg'
										alt=''
									/>
									<h2>Booking</h2>
								</div>
								<div className={styles.bookingTool}>
									<button
										className={classNames(styles.bookingBtn, {
											[styles.activeContact]: contact === 'online',
										})}
										onClick={() => {
											setContact('online');
										}}
									>
										<img
											src='/video.svg'
											alt=''
										/>
										<span>Online</span>
									</button>
									<button
										className={classNames(styles.bookingBtn, {
											[styles.activeContact]: contact === 'audio',
										})}
										onClick={() => {
											setContact('audio');
										}}
									>
										<img
											src='/phoneContact.svg'
											alt=''
										/>
										<span>Audio</span>
									</button>
								</div>
							</div>
							<Calendar
								booking={true}
								workingDaysData={workingDays}
							/>

							<div className={styles.patient}>
								<h2>Patient</h2>
								<Select
									label='Choose patient'
									labelStyle='inside'
									className={styles.servInput}
									options={[
										{
											label: '4140 Parker Rd',
											value: '1',
										},
										{ label: 'Another Branch', value: '2' },
									]}
									onChange={(value) => {
										setPatient(value);
									}}
								/>
								<button
									className={styles.familyBtn}
									onClick={() => setModalOpen(true)}
								>
									<img
										src='/plus.svg'
										alt=''
									/>
									<span>Add family member</span>
								</button>
							</div>
							<div className={styles.patient}>
								<Input
									placeholder={'Add note'}
									label='Note'
									className={styles.servInput}
									type='text'
									// multiline={true}
								/>

								<button
									className={styles.familyBtn}
									onClick={() => {}}
								>
									<img
										src='/plus.svg'
										alt=''
									/>
									<span>Add media</span>
								</button>
							</div>

							<div className={styles.bookBtn}>
								<Button
									style={styles.bookBtnStyle}
									type='submit'
									name='Book now'
								/>
							</div>
						</div> */}
					</div>
				</div>
			</div>
		</>
	);
}

// export const getStaticProps = async (context) => {
// 	try {
// 		const getDoctor = await getData(
// 			`${API_URL}/asclepius/v1/api/clinics/doctors/${context.params.id}`
// 		);
// 		const getDocEducations = await getData(
// 			`${API_URL}/asclepius/v1/api/doctors/${context.params.id}/educations`
// 		);
// 		const getDocCertificates = await getData(
// 			`${API_URL}/asclepius/v1/api/doctors/${context.params.id}/certificates`
// 		);
// 		const getDocWorkingDay = await getData(
// 			`${API_URL}/asclepius/v1/api/doctors/freelancers/${context.params.id}/days`
// 		);
//
// 		return {
// 			props: {
// 				doctor: getDoctor?.length ? null : getDoctor,
// 				educations: getDocEducations?.length == 0 ? null : getDocEducations,
// 				certificates: getDocCertificates?.length == 0 ? null : getDocCertificates,
// 				workingDays: getDocWorkingDay?.length == 0 ? null : getDocWorkingDay,
// 			},
// 			revalidate: 10,
// 		};
// 	}catch(error){
// 		return {
// 			props: {
// 				error: true
// 			}
// 		}
// 	}
//
// };


// export const getStaticPaths = async () => {
// 	const getDoctors = await getData(
// 		`${API_URL}/asclepius/v1/api/clinics/doctors?page=0&size=9999`
// 	);
//
// 	const getFreelancerDoc = await getData(
// 		`${API_URL}/asclepius/v1/api/doctors/freelancers?page=0&size=5`
// 	);
//
// 	const concatDoctors = [].concat(
// 		getDoctors?.content,
// 		getFreelancerDoc?.content
// 	);
//
// 	const paths = concatDoctors?.map((doc) => ({
// 		params: { id: doc.id.toString() },
// 	}));
//
// 	return {
// 		paths,
// 		fallback: 'blocking',
// 	};
// };