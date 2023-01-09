import { useEffect, useState, useMemo } from 'react';
import * as ANT from 'antd';
import { ReactSVG } from 'react-svg';
import { useRouter } from 'next/router';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { getData } from '../../components/request';
import Pagination from '../../components/ui/Pagination';
import Image from 'next/image';
import classNames from 'classnames';
import Select from '../../components/Select';
import Navigation from '../../components/navigation';
import { useSelector } from "react-redux";
import { Breadcrumb } from 'antd';
import '@djthoms/pretty-checkbox';
import styles from '../../styles/pages/clinicsPage.module.css';
import Link from 'next/link';

function ClinicsPage({ clinics = [], cards = [], municipalities = [] }) {
	let PageSize = 9;
	const router = useRouter();
	const [loadedClinics, setClinics] = useState(clinics);
	const [currentPage, setCurrentPage] = useState(1);
	const [sort, setSort] = useState('');
	const [filtersOpen, setFiltersOpen] = useState({
		region: true,
		municip: false,
		services: false
	});
	const categories = useSelector((state)=> state.categories.categories);
	const [generateBreadcrumbs, setGenerateBreadcrumbs] = useState({});
	const currentTableData = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * PageSize;
		const lastPageIndex = firstPageIndex + PageSize;
		return loadedClinics?.slice(firstPageIndex, lastPageIndex);
	}, [currentPage, loadedClinics]);	

	useEffect(() => {
		const categorie = categories?.filter((e)=> e.id == router?.query?.categoryId)[0];
		const parent = categories?.filter((e)=> e.id == categorie?.parentCategoryId)[0];
		setGenerateBreadcrumbs({
			categorie: categorie,
			parent: parent
		})
	}, [router])

	useEffect(() => {
		let id = router?.query?.categoryId;

		setClinics((state) => {
			if (id) {
				const clinicsWithId = (element) => element.id == id;
				const filterState = clinics.filter((e) =>
					e.clinicCategories.some(clinicsWithId)
				);
				return filterState;
			}else {
				setClinics(clinics)
			}

			return state;
		});
		setCurrentPage(1);
	}, [router]);

	const regions = [
		{
			name: 'სამეგრელო-ზემო სვანეთი',
			id: 1,
		},
		{
			name: 'სამცხე-ჯავახეთი',
			id: 2,
		},
		{
			name: 'აჭარა',
			id: 3,
		},
		{
			name: 'ქვემო ქართლი',
			id: 4,
		},
		{
			name: 'შიდა ქართლი',
			id: 5,
		},
		{
			name: 'იმერეთი',
			id: 6,
		},
		{
			name: 'კახეთი',
			id: 7,
		},
		{
			name: 'მცხეთა-მთიანეთი',
			id: 8,
		}
	]
	
	return (
		router?.isReady && (
			<>
				<Navigation />
				<div className={styles.clinicsContainer}>
					<div className={styles.breadcrumbs}>
						<Breadcrumb>
							<Breadcrumb.Item>
								<Link href="/">მთავარი გვერდი</Link>
							</Breadcrumb.Item>
							{
								!generateBreadcrumbs.categorie && 
								<Breadcrumb.Item>
									კლინიკები
								</Breadcrumb.Item>
							}
							{
								generateBreadcrumbs.parent && 
								<Breadcrumb.Item>
									<Link href={`?categoryId=${generateBreadcrumbs.parent.id}`}>{generateBreadcrumbs.parent.title}</Link>
								</Breadcrumb.Item>
							}
							<Breadcrumb.Item>{generateBreadcrumbs?.categorie?.title}</Breadcrumb.Item>
						</Breadcrumb>
					</div>
					<div className={styles.clinicsContent}>
						<div className={styles.filters}>
							<div className={styles.stickyBar}>
								<div className={styles.searchBar}>
									<input type="text" placeholder='მოძებნე კლინიკა...' />
									<ReactSVG src="/searchIconsvg.svg" />
								</div>
								<div className={styles.filterBars}>
									<div className={styles.filterBarHeader}>
										<h2>ფილტრი</h2>
										<span>გასუფთავება</span>
									</div>

									<div className={classNames(styles.filterDropdown, {
										[styles.dropdownOpen]: filtersOpen.region
									})}>
										<div 
											onClick={()=> setFiltersOpen((prev)=>({
												municip: false,
												services: false,
												region: !prev.region
											}))}
											className={styles.filterDropdownValue}
										>
											<span>რეგიონი</span>
											{
												filtersOpen.region ? 
												<ReactSVG src="/dropdowfilterOpen.svg" /> :
												<ReactSVG src="/dropdowfilterClose.svg" />
											}
										</div>
										<div className={styles.checkList}>
											{
												regions?.map((reg, key)=> {
													return <div key={key} className={styles.checkListItem}>
														<label htmlFor={reg.id}>
															{reg.name}
														</label>
														<ANT.Checkbox
															className={styles.filterCheckbox} 
															id={reg.id}
															value={reg.name}
														/>
													</div>
												})
											}
										</div>
									</div>

									<div className={classNames(styles.filterDropdown, {
										[styles.dropdownOpen]: filtersOpen.municip
									})}>
										<div 
											onClick={()=> setFiltersOpen((prev)=>({
												municip: !prev.municip,
												services: false,
												region: false
											}))}
											className={styles.filterDropdownValue}
										>
											<span>მუნიციპალიტეტები/რაიონები</span>
											{
												filtersOpen.municip ? 
												<ReactSVG src="/dropdowfilterOpen.svg" /> :
												<ReactSVG src="/dropdowfilterClose.svg" />
											}
										</div>
										<div className={styles.checkList}>
											Loading..
										</div>
									</div>

									<div className={classNames(styles.filterDropdown, {
										[styles.dropdownOpen]: filtersOpen.services
									})}>
										<div 
											onClick={()=> setFiltersOpen((prev)=>({
												municip: false,
												services: !prev.services,
												region: false
											}))}
											className={styles.filterDropdownValue}
										>
											<span>მომსახურება</span>
											{
												filtersOpen.services ? 
												<ReactSVG src="/dropdowfilterOpen.svg" /> :
												<ReactSVG src="/dropdowfilterClose.svg" />
											}
										</div>
										<div className={styles.checkList}>
											Loading..
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className={styles.content}>
							<div className={styles.clinicsContentContainer}>
								<Select
									label="სორტირება"
									labelStyle="inside"
									className={styles.servInput}
									style={styles.familyAddBtn}
									options={[
										{ label: "მეუღლე", value: "1" },
										{ label: "18 წლამდე ბავშვი", value: "2" },
									]}
									onChange={(e)=> setSort(e)}
									value={sort}
								/>
							</div>
							{
								currentTableData?.map((clinic, key)=> {
									return <ClinicBlock clinic={clinic} router={router?.query} key={key} />
								})
							}
							<div className={styles.paginationBar}>
								<Pagination
									className='pagination-bar'
									currentPage={currentPage}
									totalCount={loadedClinics?.length}
									pageSize={PageSize}
									onPageChange={(page) => setCurrentPage(page)}
								/>
							</div>
						</div>
					</div>
				</div>	
			</>
		)
	);
}

export const ClinicBlock = ({clinic, router, key}) => {
	const [state, setState] = useState(false);

	const municipality = clinic?.address?.municipality?.title;
	const address =  clinic?.address?.address;

	const phone = clinic?.contactInfos?.filter((e)=> e.type.value == 'mobile')[0]

	let endpoint = `/clinicDetailPage/${clinic.id}`;

	if(router?.categoryId){
		endpoint += `?categoryId=${router?.categoryId}`
	}

	if(router?.parentCategory) {
		endpoint += `&parentCategory=${router?.parentCategory}`
	}

	return <>
		{!state && <Skeleton />}
		<Link href={endpoint}>
			<div key={key} className={classNames(styles.clinicBlock, {
				[styles.displayBlock]: state
			})}>
				<div className={styles.clinicImage}>
					<LazyLoadImage
						key={clinic.id}
						alt={clinic.displayName}
						effect={'blur'}
						height={'100%'}
						src={
							clinic?.logoUrl !==
							'https://s3.pirveli.com/v1/api/getFile?id=null'
								? clinic.logoUrl
								: '/clinicImage.png'
						}
						width={state ? '100%' : '0px'}
						afterLoad={() => setState(true)}
					/>
					<Image src={`${clinic.logoUrl}`} layout="fill" />
				</div>
				<div className={styles.clinicsInformation}>
					<h2>
						{clinic?.displayName}
					</h2>
					<div className={styles.clinicAddress}>
						<ReactSVG src="/clinicaddress.svg" /> 
						<span>{municipality}, {address}</span>
					</div>
					<div className={styles.clinicPhone}>
						<ReactSVG src="/clinicphone.svg" /> 
						<span>+{phone?.prefix} {phone?.value}</span>
					</div>
				</div>
			</div>
		</Link>
	</>
}

export const Skeleton = () => {
	return <div className={styles.skeletonBody}>
		<div className={styles.skeletonImage}>
			<img src="/skeleton-gif.gif" alt="" />
		</div>
		<div className={styles.skeletonInfos}>
			<div>
				<ANT.Skeleton.Input size={20} active />
			</div>
			<div className={styles.phonenumskel}>
				<ANT.Skeleton.Input size={15} active />
			</div>
			<div>
				<ANT.Skeleton.Input size={15} active />
			</div>
		</div>
	</div>
}

export const getServerSideProps = async () => {
	const clinics = await getData(
		`${process.env.MEDICAL_API}/medical/clinics?page=0&size=9999`
	);

	const getProducts = await getData(
		`${process.env.MEDICAL_API}/medical/products/get-products`
	);

	const getMunicipalities = await getData(
		`${process.env.MEDICAL_API}/medical/municipalities`
	);

	return {
		props: {
			municipalities: getMunicipalities,
			cards: getProducts || [],
			clinics: Array.isArray(clinics?.content)
				? clinics?.content?.filter((e) => e.isActive)
				: [],
		},
	};
};

export default ClinicsPage;
