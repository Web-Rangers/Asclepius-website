import s from '../../../styles/clinicDetailPage.module.css';
import Image from 'next/image';
import Link from 'next/link';
import Text from '../../../components/ui/Text';
import { useRouter } from 'next/router';
import clinicArrayData from '../../../clinicArrayData';
import { useState, useEffect } from 'react';
import { getData } from '../../../components/request';
import Swipper from '../../../components/contents/Swipper';
import NavItem from '../../../components/contents/NavItem';
import ServicesModal from '../../../components/modals/ServicesModal';

const ClinicDetailPage = ({
	cardData,
	address,
	branches,
	gallery,
	products,
}) => {
	const router = useRouter();
	const [clinicData, setClinicData] = useState(null);
	const [isModalOpen, setModalOpen] = useState(false);
	const [services, setService] = useState([]);

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
		console.log(cardData, 'kontraktibijooo');
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

	return (
		<>
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
						<div className={s.doctorInfoContainer}>
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
					</div>
					<div className={s.clinicInfo}>
						<Text style={s.clinicInfoTitle}>About us</Text>
						<Text style={s.clinicTitle}>{cardData?.displayName}</Text>
						<Text style={s.aboutClinicText}>{cardData?.description}</Text>
						<Text style={s.clinicInfoTitle}>Services</Text>
						<div className={s.servicesContainer}>
							<Link
								href={{ pathname: '/doctors', query: { id: cardData?.id } }}
							>
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
							<Link href={`services/${cardData?.contracts?.contractId}`}>
								<div
									className={s.serviceItem}
									onClick={() => setModalOpen(true)}
								>
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
							</Link>
						</div>
						<div className={s.clinicOfferCardContainer}>
							<div className={s.offerContiner}>
								<Text style={s.clinicInfoTitle}>Offer name</Text>
								<Text style={s.serviceName}>Briliant</Text>
							</div>
							<div className={s.cardType}>
								<Text style={s.clinicInfoTitle}>Card Type</Text>
								<div className={s.clinicCardImage}>
									<Image
										alt='silver card'
										src='/MEDCARD-VECTOR.svg'
										width='107px'
										height='64.34px'
									/>
								</div>
							</div>
						</div>
					</div>
				</div>

				{gallery?.length > 0 && (
					<div className={s.imageTitleContainer}>
						<div className={s.clinicTitleArrow}>
							<Text style={s.clinicsTitleTextStyle}>
								{branches.length > 0
									? 'List of branches'
									: 'Images of the clinic'}
							</Text>
							<div className={s.imageSlider}> </div>
						</div>
						<Swipper
							data={gallery}
							branches={branches}
							iconBottom={true}
						/>
					</div>
				)}
			</div>
		</>
	);
};

export default ClinicDetailPage;

export const getServerSideProps = async (ctx) => {
	const { params } = ctx;
	const clinicId = params.id;
	try {
		const getClinicById = await getData(
			`${process.env.MEDICAL_API}/medical/clinics/${clinicId}`
		);
		const getClinicAddress = await getData(
			`${process.env.MEDICAL_API}/medical/clinics/${clinicId}/address`
		);
		const getClinicBranches = await getData(
			`${process.env.MEDICAL_API}/medical/clinics/${clinicId}/branches`
		);

		const getClinicGallery = await getData(
			`${process.env.MEDICAL_API}/medical/gallery/clinic/${clinicId}`
		);
		const getProducts = await getData(
			`${process.env.MEDICAL_API}/medical/products/get-products`
		);

		return {
			props: {
				cardData: getClinicById,
				address: getClinicAddress,
				branches: getClinicBranches,
				gallery: getClinicGallery,
				products: getProducts,
			},
		};
	} catch (error) {
		return {
			props: {
				error: true,
			},
		};
	}
};
