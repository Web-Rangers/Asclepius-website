import s from '../../../styles/clinicDetailPage.module.css';
import Image from 'next/image';
import Link from 'next/link';
import Text from '../../../components/ui/Text';
import { useRouter } from 'next/router';
import BranchPageCardItem from '../../../components/contents/BranchPageCardItem';
import clinicArrayData from '../../../clinicArrayData';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useState, useEffect } from 'react';
import { getData } from '../../../components/request';
import Swipper from '../../../components/contents/Swipper';

const ClinicDetailPage = ({ cardData, address, branches, gallery }) => {
	const router = useRouter();

	// const [cardData, setCardData] = useState(null);

	const [clinicData, setClinicData] = useState(null);

	function sliceIntoChunks(arr, chunkSize) {
		const res = [];
		for (let i = 0; i < arr.length; i += chunkSize) {
			const chunk = arr.slice(i, i + chunkSize);
			res.push(chunk);
		}
		return res;
	}

	useEffect(() => {
		setClinicData(sliceIntoChunks(clinicArrayData, 3));
		// setCardData(router.query)
	}, [router.isReady]);

	console.log('id', cardData);

	const weekday = [
		'',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
		'Sunday ',
	];
	return (
		<div className={s.container}>
			<div>
				<div onClick={() => router.back()}>
					<a className={s.backButton}>
						<Image
							alt='Arrow-LeftActive'
							src='/Arrow - LeftActive.svg'
							width='24px'
							height='24px'
							style={{ paddingRight: '4px' }}
						/>
						Back
					</a>
				</div>
			</div>
			<Text style={s.clinicsTitleTextStyle}> {cardData?.displayName}</Text>
			<div className={s.clinicDetailPageCard}>
				<div
					className={s.cardItemContainer}
					key={cardData?.id}
				>
					<div className={s.imgPart}>
						{/* <div className={s.ratingContainer}>
							<Image
								src='/Star.svg'
								alt='star'
								width='16.67px'
								height='15.04'
							/>
							<Text>{cardData?.rating}</Text>
						</div> */}
						<img
							src={cardData?.logoUrl}
							alt={cardData?.displayName}
							className={s.imgPartImage}
						/>
					</div>
					<Text style={s.clinicNameText}>{cardData?.displayName}</Text>
					{cardData?.workingHours
						?.sort((a, b) => a.dayId - b.dayId)
						?.map(
							(item) => (
								<div
									key={item.id}
									className={
										item.dayId === 6 || item.dayId === 7
											? s.clinicWorkingHours
											: s.weekendWorkingHours
									}
								>
									<Text> {weekday[item.dayId]} </Text>
									<Text> {[item.startHour, '-', item.endHour]} </Text>
								</div>
							)

							// <Text style={s.clinicWorkingHours}>
							// 	Monday - Friday {[item.startHour, '-', item.endHour]}
							// </Text>
						)}

					{cardData?.contactInfos &&
						cardData?.contactInfos?.map((item, index) => (
							<Text
								style={s.contactInfoText}
								key={index}
							>
								<Image
									src={
										item?.type?.value === 'mobile'
											? '/phoneNonActiveIcon.svg'
											: '/mailIcon.svg'
									}
									alt=''
									width='24px'
									height='24px'
								/>
								{item?.value}
							</Text>
						))}
					<Text style={s.contactInfoText}>
						<Image
							src='/LocationIcon.svg'
							alt=''
							width='24px'
							height='24px'
						/>
						{address?.address}
					</Text>
				</div>

				<div className={s.clinicInfo}>
					<Text style={s.clinicInfoTitle}>About us</Text>
					<Text style={s.clinicTitle}>{cardData?.displayName}</Text>
					<Text style={s.aboutClinicText}>{cardData?.description}</Text>
					<Text style={s.clinicInfoTitle}>Services</Text>
					<div className={s.servicesContainer}>
						<Link href={{ pathname: '/doctors', query: { id: cardData?.id } }}>
							<div className={s.serviceItem}>
								<Image
									alt='profile'
									src='/Profile.svg'
									width='24px'
									height='24px'
									style={{ paddingRight: '4px' }}
								/>
								<Text style={s.serviceTitle}>Doctors</Text>
								<Image
									alt='Arrow - Right'
									src='/Arrow - Right 9.svg'
									width='24px'
									height='24px'
									style={{ paddingRight: '4px' }}
								/>
							</div>
						</Link>
						{/* <Link href='clinic/analysis'>
							<div className={s.serviceItem}>
								<Image
									alt='SearchIcon'
									src='/SearchIcon.svg'
									width='24px'
									height='24px'
									style={{ paddingRight: '4px' }}
								/>
								<Text style={s.serviceTitle}>Analysis</Text>
								<Image
									alt='Arrow-Right'
									src='/Arrow - Right 9.svg'
									width='24px'
									height='24px'
									style={{ paddingRight: '4px' }}
								/>
							</div>
						</Link>
						<div className={s.serviceItem}>
							<Image
								alt='chat'
								src='/Chat.svg'
								width='24px'
								height='24px'
								style={{ paddingRight: '4px' }}
							/>
							<Text style={s.serviceTitle}>Research</Text>
							<Image
								alt='Arrow-Right'
								src='/Arrow - Right 9.svg'
								width='24px'
								height='24px'
								style={{ paddingRight: '4px' }}
							/>
						</div> */}
					</div>
					<div className={s.clinicOfferCardContainer}>
						<div className={s.offerContiner}>
							<Text style={s.clinicInfoTitle}>Offer name</Text>
							<Text style={s.serviceName}>Offer name1</Text>
							<Text style={s.serviceText}>
								Here is the offer name Chairman of the Association of
								Dermatologists{' '}
							</Text>
							<Text style={s.serviceName}>Offer name2</Text>
							<Text style={s.serviceText}>
								Here is the offer name Chairman of the Association of
								Dermatologists{' '}
							</Text>
						</div>
						<div className={s.cardType}>
							<Text style={s.clinicInfoTitle}>Card Type</Text>
							<div className={s.clinicCardImage}>
								<Image
									alt='silver card'
									src='/Card1.svg'
									width='117px'
									height='68.34px'
								/>
								<Image
									alt='silver card'
									src='/Card2.svg'
									width='117px'
									height='68.34px'
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className={s.imageTitleContainer}>
				<div className={s.clinicTitleArrow}>
					<Text style={s.clinicsTitleTextStyle}>
						{branches.length > 0 ? 'List of branches' : 'Images of the clinic'}
					</Text>
					<div className={s.imageSlider}> </div>
				</div>
				<Swipper
					data={gallery}
					branches={branches}
					iconBottom={true}
				/>
				<div className={s.clinicContainerScroll}>
					{/* <Carousel
						className={s.carousel}
						showStatus={false}
						showIndicators={false}
						centerMode={true}
						centerSlidePercentage={25.5}
						// swipeable={true}
						// emulateTouch={true}
					>
						{branches.length > 0
							? branches?.map((item) => {
									return (
										<BranchPageCardItem
											key={item?.id}
											props={item}
										/>
									);
							  })
							: gallery?.map((item) => {
									return (
										<img
											key={item.id}
											src={item.url}
											height='228px'
											width='28px'
										/>
									);
							  })}
					</Carousel> */}
				</div>
			</div>
		</div>
	);
};

export default ClinicDetailPage;

export const getServerSideProps = async (ctx) => {
	const { params } = ctx;
	const userId = params.id;
	const getClinicById = await getData(
		`https://asclepius.pirveli.ge/asclepius/v1/api/clinics/${userId}`
	);
	const getClinicAddress = await getData(
		`https://asclepius.pirveli.ge/asclepius/v1/api/clinics/${userId}/address`
	);
	const getClinicBranches = await getData(
		`https://asclepius.pirveli.ge/asclepius/v1/api/clinics/${userId}/branches`
	);

	const getClinicGallery = await getData(
		`https://asclepius.pirveli.ge/asclepius/v1/api/gallery/clinic/${userId}`
	);

	return {
		props: {
			cardData: getClinicById,
			address: getClinicAddress,
			branches: getClinicBranches,
			gallery: getClinicGallery,
		},
	};
};
