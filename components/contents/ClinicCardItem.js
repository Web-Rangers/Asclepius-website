import classes from '../../styles/homePage.module.css';
import s from '../../styles/clinicsPage.module.css';
import Text from '../ui/Text';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useWindowSize } from '../useWindowSize';
import { ReactSVG } from 'react-svg';
import Link from 'next/link';
import Button from '../ui/Button';

const ClinicCardItem = ({ data, listItem = false }) => {
	const size = useWindowSize();

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
			{listItem ? (
				<div
					className={s.cardItem}
					key={data?.id}
				>
					<>
						<div className={s.clinicImage}>
							<img
								src={
									data?.logoUrl ===
									'https://s3.pirveli.ge/v1/api/getFile?id=null'
										? '/clinicImage.png'
										: data?.logoUrl
								}
								alt={data?.alt}
								className={s.clinicItemImage}
							/>
						</div>
						<div>
							<Text style={s.clinicNameText}>{data?.displayName}</Text>
							{data?.workingHours
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
							<Text style={s.clinicAddressText}>
								<Image
									alt='locationIcon'
									src='/map-pin 1.svg'
									width='16.67px'
									height='15.04'
									style={{ marginRight: '2px' }}
								/>
								{data?.address?.address}
							</Text>
							<Link href={`/clinicDetailPage/${data?.id}`}>
								<Button
									type='submit'
									name='View Clinic'
									style={s.viewClinicBtn}
								/>
							</Link>
						</div>
					</>
				</div>
			) : (
				<Link
					key={data.key}
					href={`/clinicDetailPage/${data?.id}`}
				>
					<div className={classes.cardItemContainer}>
						{/* <div className={classes.cardRating}>
        <ReactSVG src="/clinicStar.svg" className={classes.cardRatingStar} />
        <span>4.9</span>
      </div> */}
						<div className={classes.imgPart}>
							<img
								src={data?.logoUrl}
								alt={'clinic'}
								width='313px'
								height='194px'
							/>
						</div>
						<div>
							<div className={classes.bottomContainer}>
								<h2 className={classes.clinicNameText}>{data?.displayName}</h2>
								<Text style={classes.clinicAddressText}>
									<Image
										src='/map-pin 1.svg'
										alt=''
										width='16.67px'
										height='15.04'
									/>
									{data?.address.address}
								</Text>
							</div>
						</div>
					</div>
				</Link>
			)}
		</>
	);
};

export default ClinicCardItem;
