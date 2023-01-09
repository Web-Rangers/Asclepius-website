import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Breadcrumb } from 'antd';
import { useSelector } from "react-redux";
import Navigation from '../../../components/navigation';
import styles from '../../../styles/clinicDetailPage.module.css'
import { getData } from '../../../components/request';
import { ReactSVG } from 'react-svg';

const ClinicDetailPage = () => {
	const router = useRouter();
	const categories = useSelector((state)=> state.categories.categories);
	const [generateBreadcrumbs, setGenerateBreadcrumbs] = useState({});
	const [clinic, setClinic] = useState({});

	useEffect(() => {
		const categorie = categories?.filter((e)=> e.id == router?.query?.categoryId)[0];
		const parent = categories?.filter((e)=> e.id == categorie?.parentCategoryId)[0];

		getData(`${process.env.MEDICAL_API}/medical/clinics/${router?.query?.id}`)
			.then((response)=> {setClinic(response)})
			.catch(err=> console.log(err))

		setGenerateBreadcrumbs({
			categorie: categorie,
			parent: parent
		})
	}, [router])

	//https://medical.pirveli.com/medical/clinics/1626

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
						<div className={styles.clinicBlok}></div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ClinicDetailPage;