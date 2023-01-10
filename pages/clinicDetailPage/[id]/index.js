import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import { Breadcrumb } from 'antd';
import { useSelector } from "react-redux";
import Navigation from '../../../components/navigation';
import styles from '../../../styles/clinicDetailPage.module.css'
import { getData, getMultipleData } from '../../../components/request';
import { ReactSVG } from 'react-svg';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import * as swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const ClinicDetailPage = () => {
	const router = useRouter();
	const categories = useSelector((state)=> state.categories.categories);
	const [additionalData, setAdditionalData] = useState({
		services: [],
		branches: [],
		gallery: []
	})
	const [generateBreadcrumbs, setGenerateBreadcrumbs] = useState({});
	const [clinic, setClinic] = useState({});
	const [phoneNumber, setPhoneNumber] = useState(null);
	const [doctorsLink, setDoctorsLink] = useState('');

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
		//modify href
		if(router?.query?.categoryId){
			setDoctorsLink(`${router?.asPath.toString().split('?')[1]}`)
		}else {
			setDoctorsLink('')
		}

		const categorie = categories?.filter((e)=> e.id == router?.query?.categoryId)[0];
		const parent = categories?.filter((e)=> e.id == categorie?.parentCategoryId)[0];
		
		getData(`${process.env.MEDICAL_API}/medical/clinics/${router?.query?.id}`)
		.then((response)=> {
			const phone = response?.contactInfos?.filter((e)=> e.type.value === 'mobile');
			setPhoneNumber(phone[0].value)
			setClinic(response)
		})
		.catch(err=> console.log(err))

		setGenerateBreadcrumbs({
			categorie: categorie,
			parent: parent
		})
	}, [router])

	useEffect(()=> {
		
		if(clinic?.contracts?.contractId) {
			let objectKeys = ['services', 'branches', 'gallery'];

			let urls = [
				`${process.env.MEDICAL_API}/medical/products/get-products-by-contract-id?contractId=${clinic?.contracts?.contractId}`,
				`${process.env.MEDICAL_API}/medical/clinics/${clinic?.id}/branches`,
				`${process.env.MEDICAL_API}/medical/gallery/clinic/${clinic?.id}`
			];
	
			getMultipleData(objectKeys, setAdditionalData, urls);
		}

	},[clinic])

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
								(!generateBreadcrumbs?.parent && !generateBreadcrumbs?.categorie) &&
								<Breadcrumb.Item>
									<Link href={`/clinics`}>
										<span className={styles.breadcrumbSpan}>კლინიკები</span>
									</Link>
								</Breadcrumb.Item>
							}
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
										return <div key={i} className={styles.workingHours}>
											<span>{days[e.dayId]}</span> 
											<span>{e.startHour} - {e.endHour}</span>
										</div>
									})
								}
							</div>
							<div className={styles.clinicContact}>
								{
									clinic?.email &&
									<div className={styles.clinicMail}>
										<ReactSVG src="/mail.svg" />
										<span>
											{clinic?.email}
										</span>
									</div>
								}
								{
									phoneNumber &&
									<div className={styles.clinicPhone}>
										<ReactSVG src="/phonecl.svg" />
										<span>
											+ 995 {phoneNumber}
										</span>
									</div>
								}
								<div className={styles.clinicLocation}>
									<ReactSVG src="/locationcl.svg" />
									<span>
										{clinic?.address?.municipality?.title}, 
										{clinic?.address?.address}
									</span>
								</div>
							</div>
						</div>
						<div className={styles.clinicBlokInfo}>
							<div className={styles.clinicDescriptionInfo}>
								<h4>კლინიკის შესახებ</h4>
								<p>
									{
										clinic?.description
									}
								</p>
							</div>
							<div className={styles.clinicServicesBock}>
								<h4>სერვისები</h4>
								<div className={styles.clinicServices}>
									<div>თერაპიული მკურნალობა</div>
									<div>თერაპიული მკურნალობა</div>
									<div>თერაპიული მკურნალობა</div>
								</div>
							</div>
							<div className={styles.clinicDocAndServ}>
								<Link href={router?.query?.categoryId ? `/clinicDetailPage/${clinic?.id}/doctors?${doctorsLink}` : `/clinicDetailPage/${clinic?.id}/doctors`}>
									<button>ექიმები</button>
								</Link>
								<button>მომსახურებები</button>
							</div>
							<div className={styles.clinicOffers}>
								<h4>შეთავაზებები</h4>
								<div className={styles.clinicOffersBlock}>
									<div className={styles.clinicOffer}>
										<h2>შეთავაზების დასახელება</h2>
										<p>შეთავაზების ტექსტი რასაც მოიცავს</p>
										<h3>ბრენჩის სახელი</h3>
									</div>
									<div className={styles.clinicOffer}>
										<h2>შეთავაზების დასახელება</h2>
										<p>შეთავაზების ტექსტი რასაც მოიცავს</p>
										<h3>ბრენჩის სახელი</h3>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className={styles.clinicBranches}>
					<div className={styles.clinicBranchTitle}>
						<ClinicGallery gallery={additionalData?.gallery} />
					</div>
				</div>

				<div className={styles.clinicBranches}>
					<div className={styles.clinicBranchTitle}>
						<h2>ბრენჩები</h2>
						<Branches branches={additionalData?.branches} />
					</div>
				</div>
			</div>
		</>
	);
};

export default ClinicDetailPage;

export function Branches({branches}) {
	const [swiperRef, setSwiperRef] = useState();

	const handleLeftClick = useCallback(() => {
		if (!swiperRef) return;
		swiperRef.slidePrev();
	}, [swiperRef]);

	const handleRightClick = useCallback(() => {
		if (!swiperRef) return;
		swiperRef.slideNext();
	}, [swiperRef]);

	return <>
		<div className={styles.branchCardList}>
			<Swiper
				direction='horizontal'
				onSwiper={setSwiperRef}
				id='branchMobileSize'
				slidesPerView={'auto'}
				navigation={{
					prevEl: styles.swiperArrowLeft,
					nextEl: styles.swiperArrowLeft,
				}}
				freeMode={true}
				loopFillGroupWithBlank={true}
				lazy={true}
				modules={[swiper.Pagination, swiper.Navigation, swiper.Lazy]}
				breakpoints={{
					// when window width is >= 640px
					320: {
						slidesPerView: 1.3,
						spaceBetween: 12,
					},
					640: {
						slidesPerView: 2,
						spaceBetween: 15,
					},
					// when window width is >= 768px
					768: {
						slidesPerView: 2,
						spaceBetween: 15,
					},
					950: {
						slidesPerView: 3,
						spaceBetween: 15,
					},
					1280: {
						slidesPerView: 4,
						spaceBetween: 30,
					},
				}}
			>
				{branches?.map((item, i) => (
					<SwiperSlide key={i}>
						<div className={styles.branchView}>
							<div className={styles.branchImage}>
								<Image src={item.logoUrl} layout="fill" />
							</div>
							<div className={styles.branchWorkingHours}>
								სამუშაო საათები
							</div>
							<div className={styles.branchDisplayName}>
								<h2>{item.displayName}</h2>
								<div className={styles.branchLocation}>
									<ReactSVG src="/locationcl.svg" />
									<span>
										{item?.address?.municipality?.title}, 
										{item?.address?.address}
									</span>
								</div>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
			{
				branches?.length >= 5 && 
				<>
					<img
						src='/swiperLeftArrow.svg'
						alt='arrowLeft'
						className={styles.clinicSwiperArrowLeft}
						onClick={handleLeftClick}
					/>
					<img
						src='/swiperarrow.svg'
						alt='arrowRight'
						className={styles.clinicSwiperArrowRight}
						onClick={handleRightClick}
					/>
				</>
			}
		</div>
	</>
}

export function ClinicGallery({gallery}) {
	const [swiperRef, setSwiperRef] = useState();

	const handleLeftClick = useCallback(() => {
		if (!swiperRef) return;
		swiperRef.slidePrev();
	}, [swiperRef]);

	const handleRightClick = useCallback(() => {
		if (!swiperRef) return;
		swiperRef.slideNext();
	}, [swiperRef]);

	return <>
		<div className={styles.branchCardList}>
			<Swiper
				direction='horizontal'
				onSwiper={setSwiperRef}
				id='branchMobileSize'
				slidesPerView={'auto'}
				navigation={{
					prevEl: styles.swiperArrowLeft,
					nextEl: styles.swiperArrowLeft,
				}}
				freeMode={true}
				loopFillGroupWithBlank={true}
				lazy={true}
				modules={[swiper.Pagination, swiper.Navigation, swiper.Lazy]}
				breakpoints={{
					// when window width is >= 640px
					320: {
						slidesPerView: 1.3,
						spaceBetween: 12,
					},
					640: {
						slidesPerView: 2,
						spaceBetween: 15,
					},
					// when window width is >= 768px
					768: {
						slidesPerView: 2,
						spaceBetween: 15,
					},
					950: {
						slidesPerView: 3,
						spaceBetween: 15,
					},
					1280: {
						slidesPerView: 4,
						spaceBetween: 30,
					},
				}}
			>
				{gallery?.map((item, i) => (
					<SwiperSlide key={i}>
						<div className={styles.branchView}>
							<div className={styles.galleryImage}>
								<Image src={item.url} layout="fill" />
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
			{
				gallery?.length >= 5 && 
				<>
					<img
						src='/swiperLeftArrow.svg'
						alt='arrowLeft'
						className={classNames(styles.clinicSwiperArrowLeft, styles.noMargins)}
						onClick={handleLeftClick}
					/>
					<img
						src='/swiperarrow.svg'
						alt='arrowRight'
						className={classNames(styles.clinicSwiperArrowRight, styles.noMargins)}
						onClick={handleRightClick}
					/>
				</>
			}
		</div>
	</>
}