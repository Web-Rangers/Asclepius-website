import Text from '../ui/Text';
import s from '../../styles/pages/clinicsPage.module.css';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Button from '../ui/Button';
import Link from 'next/link';
import { Tooltip } from 'antd';

const BranchPageCardItem = ({ props }) => {
	const router = useRouter();

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

	const text = (
		<span>
			{props?.workingHours
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
		</span>
	);

	return (
		<Link href={`/branchDetailPage/${props?.parentId}`}>
			<div
				className={s.cardItemContainer}
				key={props?.id}
			>
				<div className={s.imgPart}>
					{/* <div className={s.ratingContainer}>
					<Image
						src='/Star.svg'
						alt='star'
						width='16.67px'
						height='15.04'
					/>
					<Text>{props.rating}</Text>
				</div> */}
					{/* <div className={s.salePercent}>
					<Text>{'-' + props.sale + '%'}</Text>
				</div> */}
					<img
						src={
							props?.logoUrl === 'https://s3.pirveli.ge/v1/api/getFile?id=null'
								? '/clinicImage.png'
								: props?.logoUrl
						}
						alt={props?.alt}
						className={s.imgPartImage}
					/>
				</div>
				<div>
					<Text style={s.clinicNameText}>{props?.displayName}</Text>
					<Tooltip
						placement='bottomLeft'
						title={text}
						color={'white'}
					>
						<span className={s.hoursContainer}>
							<Image
								alt='locationIcon'
								src='/i.svg'
								width='16.67px'
								height='15.04'
							/>
							<span>working Hours</span>
						</span>
					</Tooltip>

					<Text style={s.clinicAddressText}>
						<Image
							alt='locationIcon'
							src='/map-pin 1.svg'
							width='16.67px'
							height='15.04'
							style={{ marginRight: '2px' }}
						/>
						{props?.address?.address}
					</Text>
					{/* {viewBtn && (
						<Link href={`/clinicDetailPage/${props?.id}`}>
							<Button
								type='submit'
								name='View Clinic'
								style={s.viewClinicBtn}
							/>
						</Link>
					)} */}
				</div>
			</div>
		</Link>
	);
};

export default BranchPageCardItem;
