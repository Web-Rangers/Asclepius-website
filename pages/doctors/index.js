import { useState, useMemo } from 'react';
import styles from '../../styles/pages/doctors.module.css';
import Button from '../../components/ui/Button';
import FilterModal from '../../components/modals/filterModal';
import classNames from 'classnames';
import Select from '../../components/Select';
import Input from '../../components/Input';
import Pagination from '../../components/ui/Pagination';
import fetchAPI from '../../fetchAPI';
import { getData } from '../../components/request';
import Link from 'next/link';
import { useRouter } from 'next/router';

const doctorsArray = [
	{
		id: 1,
		src: '/clinicImage.png',
		alt: 'clinic image',
		clinicName: 'Union Family Health Center',
		workingDay: ' Monday - Friday',
		workingHours: '10:00 - 17:00',
		weekendWorkingDay: 'Saturday - Sunday',
		weekendWorkingHours: '10:00 - 14:00',
		clinicAddress: 'Carymouth , Hallmark Clinic',
		rating: '1.9',
		clinicPhoneNumber: '+99557799700',
		clinicEmail: 'atcare@optimo.com',
	},
	{
		id: 2,
		src: '/clinicImage.png',
		alt: 'clinic image',
		clinicName: 'Progress Medical Clinic',
		workingday: ' Monday - Friday',
		workingHours: '10:00 - 17:00',
		weekendWorkingDay: 'Saturday - Sunday',
		weekendWorkingHours: '10:00 - 14:00',
		clinicAddress: 'Tbilisi , Chachava str.1',
		rating: '4.9',
		clinicPhoneNumber: '+995577997799',
		clinicEmail: 'atcare@gmail.com',
	},
	{
		id: 3,
		src: '/clinicImage.png',
		alt: 'clinic image',
		clinicName: 'Progress Medical Clinic',
		workingday: ' Monday - Friday',
		workingHours: '10:00 - 17:00',
		weekendWorkingDay: 'Saturday - Sunday',
		weekendWorkingHours: '10:00 - 14:00',
		clinicAddress: 'Tbilisi , Chachava str.1',
		rating: '4.9',
		clinicPhoneNumber: '+995577997799',
		clinicEmail: 'atcare@gmail.com',
	},
	{
		id: 4,
		src: '/clinicImage.png',
		alt: 'clinic image',
		clinicName: 'Progress Medical Clinic',
		workingday: ' Monday - Friday',
		workingHours: '10:00 - 17:00',
		weekendWorkingDay: 'Saturday - Sunday',
		weekendWorkingHours: '10:00 - 14:00',
		clinicAddress: 'Tbilisi , Chachava str.1',
		rating: '4.9',
		clinicPhoneNumber: '+995577997799',
		clinicEmail: 'atcare@gmail.com',
	},

	{
		id: 5,
		src: '/clinicImage.png',
		alt: 'clinic image',
		clinicName: 'Union Family Health Center',
		workingDay: ' Monday - Friday',
		workingHours: '10:00 - 17:00',
		weekendWorkingDay: 'Saturday - Sunday',
		weekendWorkingHours: '10:00 - 14:00',
		clinicAddress: 'Carymouth , Hallmark Clinic',
		rating: '4.9',
		clinicPhoneNumber: '+995577997799',
		clinicEmail: 'atcare@gmail.com',
	},
	{
		id: 6,
		src: '/clinicImage.png',
		alt: 'clinic image',
		clinicName: 'Healing Helpers Medical Group',
		workingDay: ' Monday - Friday',
		workingHours: '10:00 - 17:00',
		weekendWorkingDay: 'Saturday - Sunday',
		weekendWorkingHours: '10:00 - 14:00',
		clinicAddress: 'Tbilisi , Chachava str.1',
		rating: '4.9',
		clinicPhoneNumber: '+995577997799',
		clinicEmail: 'atcare@gmail.com',
	},
	{
		id: 7,
		src: '/clinicImage.png',
		alt: 'clinic image',
		clinicName: 'Progress Medical Clinic',
		workingDay: 'Monday - Friday',
		workingHours: '10:00 - 17:00',
		weekendWorkingDay: 'Saturday - Sunday',
		weekendWorkingHours: '10:00 - 14:00',
		clinicAddress: 'Carymouth , Hallmark Clinic',
		rating: '4.9',
		clinicPhoneNumber: '+995577997799',
		clinicEmail: 'atcare@gmail.com',
	},
	{
		id: 8,
		src: '/clinicImage.png',
		alt: 'clinic image',
		clinicName: 'Progress Medical Clinic',
		workingday: ' Monday - Friday',
		workingHours: '10:00 - 17:00',
		weekendWorkingDay: 'Saturday - Sunday',
		weekendWorkingHours: '10:00 - 14:00',
		clinicAddress: 'Tbilisi , Chachava str.1',
		rating: '4.9',
		clinicPhoneNumber: '+995577997799',
		clinicEmail: 'atcare@gmail.com',
	},
	{
		id: 9,
		src: '/clinicImage.png',
		alt: 'clinic image',
		clinicName: 'Progress Medical Clinic',
		workingday: ' Monday - Friday',
		workingHours: '10:00 - 17:00',
		weekendWorkingDay: 'Saturday - Sunday',
		weekendWorkingHours: '10:00 - 14:00',
		clinicAddress: 'Tbilisi , Chachava str.1',
		rating: '4.9',
		clinicPhoneNumber: '+995577997799',
		clinicEmail: 'atcare@gmail.com',
	},
	{
		id: 10,
		src: '/clinicImage.png',
		alt: 'clinic image',
		clinicName: 'Healing Helpers Medical Group',
		workingDay: ' Monday - Friday',
		workingHours: '10:00 - 17:00',
		weekendWorkingDay: 'Saturday - Sunday',
		weekendWorkingHours: '10:00 - 14:00',
		clinicAddress: 'Tbilisi , Chachava str.1',
		rating: '4.9',
		clinicPhoneNumber: '+995577997799',
		clinicEmail: 'atcare@gmail.com',
	},
];

export default function Doctors({ frelancers, doctors, clinicDoctors }) {
	const [isOpen, setOpen] = useState();
	const [status, setStatus] = useState('');
	const [serviceType, setServiceType] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const router = useRouter();

	const concatData = frelancers?.content.concat(doctors?.content);

	let PageSize = 12;

	const currentTableData = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * PageSize;
		const lastPageIndex = firstPageIndex + PageSize;
		return router.query.id
			? clinicDoctors?.content?.slice(firstPageIndex, lastPageIndex)
			: concatData?.slice(firstPageIndex, lastPageIndex);
	}, [currentPage]);

	// if(!clinicDoctors){
	// 	return false
	// }

	return (
		<>
			{isOpen && (
				<FilterModal onClose={() => setOpen(false)}>
					<div
						className={classNames(styles.filterContainer, {
							[styles.filterOpen]: isOpen,
						})}
					>
						<div className={styles.filterSelectors}>
							<Select
								label='Doctor name'
								labelStyle='outside'
								className={styles.servInput}
								options={[
									{
										label: '4140 Parker Rd',
										value: '1',
									},
									{ label: 'Another Branch', value: '2' },
								]}
								onChange={(value) => {
									setStatus(value);
								}}
							/>
							<Select
								label='Service name'
								labelStyle='outside'
								className={styles.servInput}
								options={[
									{
										label: '4140 Parker Rd',
										value: '1',
									},
									{ label: 'Another Branch', value: '2' },
								]}
								onChange={(value) => {
									setStatus(value);
								}}
							/>
							<div className={styles.selects}>
								<h2>Card</h2>
								<div>
									<button
										className={classNames(styles.selectBtn, {
											[styles.activeBtn]: serviceType === 'online',
										})}
										onClick={() => setServiceType('online')}
									>
										Online
									</button>
									<button
										className={classNames(styles.selectBtn, {
											[styles.activeBtn]: serviceType === 'at_home',
										})}
										onClick={() => setServiceType('at_home')}
									>
										At home
									</button>
									<button
										className={classNames(styles.selectBtn, {
											[styles.activeBtn]: serviceType === 'clinic',
										})}
										onClick={() => setServiceType('clinic')}
									>
										Clinic
									</button>
								</div>
							</div>
							<Input
								label='Service price'
								className={styles.servInput}
							/>
							<Input
								label='Service status'
								className={styles.servInput}
							/>
							<Input
								label='Service review'
								className={styles.servInput}
							/>
						</div>
						<div className={styles.filterBtns}>
							<Button
								name='Clear'
								style={styles.clearBtn}
							/>
							<Button
								name='Filter'
								style={styles.filterBtn}
							/>
						</div>
					</div>
				</FilterModal>
			)}
			<div className={styles.doctorsPage}>
				<div className={styles.doctorsContainer}>
					<div className={styles.back}>
						<img
							src='/backBtn.svg'
							alt=''
							onClick={() => router.push('/')}
						/>
					</div>
					<div className={styles.doctorslistContainer}>
						<h2>Experienced doctors</h2>
						<Button
							name={
								<div>
									<img
										src='/filter.svg'
										alt=''
									/>
									<span>Filter</span>
								</div>
							}
							style={styles.filterButton}
							onClick={() => setOpen(true)}
						/>
						<div
							className={styles.filterForMobile}
							onClick={() => setOpen(true)}
						>
							<img
								src='/filter.svg'
								alt=''
							/>
						</div>
					</div>

					<div className={styles.doctorsList}>
						{currentTableData?.map((doctor) => {
							return (
								<Link
									href={`/doctors/${doctor.id}`}
									key={doctor.id}
								>
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
												src={doctor?.pictureUrl}
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
										</div> */}
										<div className={styles.doctorInfo}>
											<div className={styles.doctorName}>
												<h2>{`${doctor?.firstName}`}</h2>
												{/* <span
													className={classNames(styles.doctorStatus)}
												></span> */}
											</div>
											<div className={styles.proffesion}>
												{concatData?.professions &&
													concatData?.professions?.map((item, index) => (
														<div
															key={index}
															className={styles.prof}
														>
															{item?.name}
														</div>
													))}
											</div>
											<div className={styles.address}>
												<img
													src='/doctorLocation.svg'
													alt=''
												/>
												<h4>Carymouth , Hallmark Clinic</h4>
											</div>
											<div className={styles.language}>
												<span className={styles.languageTitle}>Language</span>
												<div className={styles.languageList}>
													<span>Geo</span>
													<span>Eng</span>
													<span>Rus</span>
												</div>
											</div>
										</div>
									</div>
								</Link>
							);
						})}
					</div>
					<div className={styles.pagination}>
						<Pagination
							className={styles.pagination}
							currentPage={currentPage}
							totalCount={concatData?.length}
							pageSize={PageSize}
							onPageChange={(page) => setCurrentPage(page)}
						/>
					</div>
				</div>
			</div>
		</>
	);
}

export async function getServerSideProps({ query }) {
	let API_URL = process.env.NEXT_PUBLIC_BASE_URL;

	try{
		const getDoctors = await getData(
			`${API_URL}/asclepius/v1/api/clinics/doctors?page=0&size=100`
		);
		const getFreelancerDoc = await getData(
			`${API_URL}/asclepius/v1/api/doctors/freelancers?page=0&size=5`
		);
	
		const getClinicDoctors = await getData(
			`${API_URL}/asclepius/v1/api/clinics/${query.id}/doctors?page=0&size=5`
		);
		return {
			props: {
				doctors: getDoctors,
				frelancers: getFreelancerDoc,
				clinicDoctors: getClinicDoctors,
			},
		};
	}catch(error) {
		return {
			props: {
				error: true
			}
		}
	}
}
