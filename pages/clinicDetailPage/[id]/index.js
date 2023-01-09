import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { Breadcrumb } from 'antd';
import { useSelector } from "react-redux";
import Navigation from '../../../components/navigation';
import styles from '../../../styles/clinicDetailPage.module.css'
import { getData } from '../../../components/request';
import { ReactSVG } from 'react-svg';
import Image from 'next/image';

const ClinicDetailPage = () => {
	const router = useRouter();
	const categories = useSelector((state)=> state.categories.categories);
	const [generateBreadcrumbs, setGenerateBreadcrumbs] = useState({});
	const [clinic, setClinic] = useState({});
	const [phoneNumber, setPhoneNumber] = useState(null);

	const days = [
		'',
		'ორშაბათი',
		'სამშაბათი',
		'ოთხშაბათი', 
		'ხუთშაბათი',
		'პარასკევი',
		'შაბათი',
		'კვირა'
	]

	useEffect(() => {
		const categorie = categories?.filter((e)=> e.id == router?.query?.categoryId)[0];
		const parent = categories?.filter((e)=> e.id == categorie?.parentCategoryId)[0];

		getData(`${process.env.MEDICAL_API}/medical/clinics/${router?.query?.id}`)
			.then((response)=> {
				const phone = response?.contactInfos?.filter((e)=> e.type.value === 'mobile');
				setPhoneNumber(phone[0].value)
				setClinic(response)
			})
			.catch(err=> console.log(err))

		console.log(clinic, 'klinikiaa')

		setGenerateBreadcrumbs({
			categorie: categorie,
			parent: parent
		})
	}, [router])

	return (
		<>
			<Navigation />
			<div className={styles.clinicContainer}>
				{
					Object.keys(generateBreadcrumbs).length !== 0 && 
					<div className={styles.breadcrumbs}>
						<Breadcrumb
							separator={<img src="/separator.svg" />}
						>
							<Breadcrumb.Item>
								<Link href="/">
									<span className={styles.breadcrumbSpan}>მთავარი გვერდი</span>
								</Link>
							</Breadcrumb.Item>
							{
								generateBreadcrumbs?.parent && 
								<Breadcrumb.Item>
									<Link href={`/clinics?categoryId=${generateBreadcrumbs.parent.id}`}>
										<span className={styles.breadcrumbSpan}>{generateBreadcrumbs.parent.title}</span>
									</Link>
								</Breadcrumb.Item>
							}
							<Breadcrumb.Item>
								{
									generateBreadcrumbs?.parent ? 
									<Link href={`/clinics/?categoryId=${generateBreadcrumbs?.categorie?.id}&parentCategory=${generateBreadcrumbs?.parent?.id}`}>
										<span className={styles.breadcrumbSpan}>{generateBreadcrumbs?.categorie?.title}</span>
									</Link> : 
									generateBreadcrumbs?.categorie &&
									<Link href={`/clinics/?categoryId=${generateBreadcrumbs?.categorie?.id}`}>
										<span className={styles.breadcrumbSpan}>{generateBreadcrumbs?.categorie?.title}</span>
									</Link>
								}
							</Breadcrumb.Item>
							<Breadcrumb.Item className={styles.activeBreadCrumb}>
								{clinic?.displayName}
							</Breadcrumb.Item>
						</Breadcrumb>
					</div>
				}
				<div className={styles.clinicContent}>
					<div className={styles.clinicHeader}>
						<h2>{clinic?.displayName}</h2>
					</div>
					<div className={styles.clinicDetails}>
						<div className={styles.clinicBlok}>
							<div className={styles.clinicImage}>
								<Image src={clinic?.logoUrl} layout='fill' />
							</div>
							<div className={styles.clinicWorkingHoursView}>
								{
									clinic?.workingHours?.sort((a,b)=> a.dayId - b.dayId).map((e, i)=> {
										return <div className={styles.workingHours}>
											<span>{days[e.dayId]}</span> 
											<span>{e.startHour} - {e.endHour}</span>
										</div>
									})
								}
							</div>
							<div className={styles.clinicContact}>
								<div className={styles.clinicMail}>
									<ReactSVG src="/mail.svg" />
									<span>
										{clinic?.email}
									</span>
								</div>
								<div className={styles.clinicPhone}>
									<ReactSVG src="/phonecl.svg" />
									<span>
										+ 995 {phoneNumber}
									</span>
								</div>
								<div className={styles.clinicLocation}>
									<ReactSVG src="/locationcl.svg" />
									<span>
										{clinic?.address?.municipality?.title}, 
										{clinic?.address?.address}
									</span>
								</div>
							</div>
						</div>
						<div className={styles.clinicBlokInfo}>asd</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ClinicDetailPage;