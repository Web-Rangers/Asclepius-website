import s from '../../../styles/clinicDetailPage.module.css';

import Image from 'next/image';
import Link from 'next/link';
import Text from '../../../components/ui/Text';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import { getData } from '../../../components/request';
import Button from '../../../components/ui/Button';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const BranchDetailPage = ({ cardData, address, gallery }) => {
	const router = useRouter();

	if (!router.isReady) {
		return 'loading...';
	}
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
				<Link href='/clinicPage'>
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
				</Link>
			</div>
			<Text style={s.clinicsTitleTextStyle}> {cardData[0]?.displayName}</Text>
			<div className={s.clinicDetailPageCard}>
				<div
					className={s.cardItemContainer}
					key={cardData[0].id}
				>
					<div className={s.imgPart}>
						{/* <div className={s.ratingContainer}>
              <Image
                src="/Star.svg"
                alt="star"
                width="16.67px"
                height="15.04"
              />
              <Text>{cardData[0]?.rating || '0'}</Text>
            </div> */}
						<Image
							src={cardData[0]?.logoUrl}
							alt={cardData[0]?.displayName}
							className={s.imgPartImage}
							width='368px'
							height='326px'
						/>
					</div>
					<Text style={s.clinicNameText}>{cardData[0].displayName}</Text>
					{cardData[0]?.workingHours
						?.sort((a, b) => a.dayId - b.dayId)
						?.map((item) => (
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
						))}

					{cardData[0]?.contactInfos &&
						cardData[0]?.contactInfos?.map((item, index) => (
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
					<Link href={`/clinicDetailPage/${cardData[0]?.id}`}>
						<Button
							type='submit'
							name='View Clinic'
							style={s.viewClinicBtn}
						/>
					</Link>
				</div>

				<div className={s.clinicInfo}>
					<Text style={s.clinicInfoTitle}>About us</Text>
					<Text style={s.clinicTitle}>{cardData[0]?.displayName}</Text>
					<Text style={s.aboutClinicText}>{cardData[0]?.description}</Text>
					<Text style={s.clinicInfoTitle}>Services</Text>
					<div className={s.servicesContainer}>
						<Link
							href={{
								pathname: '/doctors',
								query: { id: cardData[0]?.id },
							}}
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
								<img
									alt='Arrow - Right'
									src='/Arrow - Right 9.svg'
									width='24px'
									height='24px'
									style={{ paddingRight: '4px' }}
									className={s.imgArrow}
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
								<img
									alt='Arrow-Right'
									src='/Arrow - Right 9.svg'
									width='24px'
									height='24px'
									style={{ paddingRight: '4px' }}
									className={s.imgArrow}
								/>
							</div>
						</Link> */}
						{/* <div className={s.serviceItem}>
							<Image
								alt='chat'
								src='/Chat.svg'
								width='24px'
								height='24px'
								style={{ paddingRight: '4px' }}
							/>
							<Text style={s.serviceTitle}>Research</Text>
							<img
								alt='Arrow-Right'
								src='/Arrow - Right 9.svg'
								width='24px'
								height='24px'
								style={{ paddingRight: '4px' }}
								className={s.imgArrow}
							/>
						</div> */}
					</div>
					<div className={s.offerCardContainer}>
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
							<div className={s.cardImage}>
								<Image
									alt='silver card'
									src='/Card 1.svg'
									width='117px'
									height='68.34px'
								/>
							</div>
							<Image
								alt='gold card'
								src='/Card 2.svg'
								width='117px'
								height='68.34px'
								style={{ paddingRight: '4px' }}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className={s.imageTitleContainer}>
				<Text style={classNames(s.clinicsTitleTextStyle, s.imageTitle)}>
					{' '}
					Images of the clinic
				</Text>
				{/* <div className={s.imageContainer}>
					{gallery &&
						gallery?.map((img) => {
							return (
								<>
									<img
										src={img?.url}
										alt='clinic image'
									/>
								</>
							);
						})}
				</div>
				<div className={s.imageSlider}>
					<Image
						src='/Arrow - Left.svg'
						alt='arrowLeft'
						width='24px'
						height='24px'
					/>
					<Image
						src='/Arrow - Right.svg'
						alt='arrowRight'
						width='24px'
						height='24px'
					/>
				</div> */}
				{/* <div className={s.clinicContainerScroll}> */}
				<Carousel
					className={s.carousel}
					showStatus={false}
					showIndicators={false}
					centerMode={true}
					swipeable={true}
					emulateTouch={true}
					showArrows={false}
					centerSlidePercentage={25.5}
					renderArrowPrev={(clickHandler) => (
						<button onClick={clickHandler}>
							<img
								src='/Arrow - Left.svg'
								alt='arrowLeft'
								width='24px'
								height='24px'
							/>
						</button>
					)}
					renderArrowNext={(clickHandler) => (
						<button onClick={clickHandler}>
							<img
								src='/Arrow - Right.svg'
								alt='arrowRight'
								width='24px'
								height='24px'
							/>
						</button>
					)}
				>
					<div className={s.imageContainer}>
						{gallery &&
							gallery?.map((img) => {
								return (
									<>
										<img
											src={img?.url}
											alt='clinic image'
										/>
									</>
								);
							})}
					</div>
				</Carousel>
				{/* </div> */}
			</div>
		</div>
	);
};

export default BranchDetailPage;

export const getServerSideProps = async (ctx) => {
	const { params } = ctx;
	const userId = params.id;
	const getClinicById = await getData(
		`https://asclepius.pirveli.ge/asclepius/v1/api/clinics/${userId}/branches`
	);
	const getClinicAddress = await getData(
		`https://asclepius.pirveli.ge/asclepius/v1/api/clinics/${userId}/address`
	);
	const getClinicGallery = await getData(
		`https://asclepius.pirveli.ge/asclepius/v1/api/gallery/clinic/${userId}`
	);

	return {
		props: {
			cardData: getClinicById,
			address: getClinicAddress,
			gallery: getClinicGallery,
		},
	};
};
