import { useState } from 'react';
import styles from '../../styles/pages/clinic.module.css';
import classNames from 'classnames';
import CheckBox from '../../components/ui/CheckBox';
import Button from '../../components/ui/Button';
import ConfirmedModal from '../../components/modals/confrimedModal';
import Link from 'next/link';
import { getData } from '../../components/request';
import Image from 'next/image';

export default function Clinic() {
	const [blockId, setBlockId] = useState('');
	const [done, setDone] = useState(false);
	const [clinics, setClinics] = useState([]);

	useEffect(() => {
	  getData(`${process.env.NEXT_PUBLIC_BASE_URL}/asclepius/v1/api/clinics/?page=0&size=10`)
		.then((res)=>setClinics(res))
	}, [])
	

	return (
		<>
			<div className={styles.clinicBody}>
				<div className={styles.clinicContent}>
					<div className={styles.clinicLogoContent}>
						<img
							src='/clinicDocLogo.svg'
							className={styles.logo}
							alt=''
						/>
					</div>

					<div className={styles.clinicAnalyisis}>
						<div className={styles.contentHeader}>
							<div className={styles.backContainer}>
								<img
									src='/arrowLeftSlider.svg'
									alt=''
								/>
								<span>Back to profile</span>
							</div>
							<div className={styles.analysH}>
								<h2>Choose Clinic</h2>
							</div>
						</div>
						<div className={styles.searchBlock}>
							{blockId == '' && (
								<input
									className={styles.searchInput}
									type='search'
									placeholder='search'
								/>
							)}
							<div
								className={classNames(styles.clinicsList, {
									[styles.activeSearch]: true,
									[styles.activeClinicBlocks]: blockId !== '' && true,
								})}
							>
								{blockId == '' && (
									<div className={styles.listH}>
										<h2>Clinics</h2>
									</div>
								)}
								<div className={styles.list}>
									{clinics?.content &&
										clinics?.content?.map((item, index) => (
											<Link
												href={`clinic/branches/${item?.id}`}
												key={index}
											>
												<div className={styles.listItem}>
													<div
														className={classNames(styles.clinic, {
															[styles.activeAnBlock]: blockId !== '' && true,
														})}
													>
														<Image
															src={item?.logoUrl}
															width={40}
															height={40}
															alt=''
														/>
														<h2>{item?.displayName}</h2>
														<img
															className={styles.arrow}
															src='/clinArrow.svg'
															alt=''
														/>
													</div>
												</div>
											</Link>
										))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
