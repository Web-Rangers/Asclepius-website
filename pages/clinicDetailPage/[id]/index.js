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
import ServicesModal from '../../../components/modals/ServicesModal';

const ClinicDetailPage = ({ cardData, address, branches, gallery }) => {
	const router = useRouter();

	// const [cardData, setCardData] = useState(null);

	const [clinicData, setClinicData] = useState(null);
	const [isModalOpen, setModalOpen] = useState(false);

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

	return <>
		{
            isModalOpen && 
            <ServicesModal
				onClose={()=> setModalOpen(false)}
			/>
        }
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
						<div className={s.serviceItem} onClick={()=> setModalOpen(!isModalOpen)}>
							<Image
								alt='services'
								src='/servicesicon.svg'
								width='24px'
								height='24px'
								style={{ paddingRight: '4px' }}
							/>
							<Text style={s.serviceTitle}>Services</Text>
							<Image
								alt='Arrow-Right'
								src='/Arrow - Right 9.svg'
								width='24px'
								height='24px'
								style={{ paddingRight: '4px' }}
							/>
						</div>
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
									src='/Card 1.svg'
									width='117px'
									height='68.34px'
								/>
								<Image
									alt='silver card'
									src='/Card 1.svg'
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
				/>
				<div className={s.clinicContainerScroll}>

				</div>
			</div>
		</div>
	</>;
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
