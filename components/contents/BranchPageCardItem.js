import Text from '../ui/Text';
import s from '../../styles/clinicsPage.module.css';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Button from '../ui/Button';

const BranchPageCardItem = (props) => {
	const router = useRouter();

	const handleClick = (data) => {
		router.push({
			pathname: '/branchDetailPage',
			query: data,
		});
	};

	return (
		<div
			className={s.cardItemContainer}
			key={props.id}
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
				<div className={s.salePercent}>
					<Text>{'-' + props.sale + '%'}</Text>
				</div>
				<img
					src={props.src || '/clinicImage.png'}
					alt={props.alt}
					className={s.imgPartImage}
				/>
			</div>

			<Text style={s.clinicNameText}>{props.clinicName}</Text>
			<Text style={s.clinicWorkingHours}>
				{props.workingDay}
				{props.workingHours}
			</Text>

			<Text style={s.clinicAddressText}>
				<Image
					alt='locationIcon'
					src='/map-pin 1.svg'
					width='16.67px'
					height='15.04'
					style={{ marginRight: '2px' }}
				/>
				{props.clinicAddress} Tbilis
			</Text>
			<div>
				<Button
					type='submit'
					name='View Clinic'
					style={s.viewClinicBtn}
					onClick={() => handleClick(props.data)}
				/>
			</div>
		</div>
	);
};

export default BranchPageCardItem;
