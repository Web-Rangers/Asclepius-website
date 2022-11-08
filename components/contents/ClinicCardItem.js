import classes from '../../styles/homePage.module.css';
import Text from '../ui/Text';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useWindowSize } from '../useWindowSize';
import { ReactSVG } from 'react-svg';
import Link from 'next/link';

const ClinicCardItem = (props) => {
	const router = useRouter();

	const size = useWindowSize();

	const handleClick = (data) => {
		router.push({
			pathname: '/clinicDetailPage',
			query: data,
		});
	};

	return (
		<Link
			href={`/clinicDetailPage/${props?.id}`}
			key={props.key}
		>
			<div className={classes.cardItemContainer}>
				{/* <div className={classes.cardRating}>
        <ReactSVG src="/clinicStar.svg" className={classes.cardRatingStar} />
        <span>4.9</span>
      </div> */}
				<div className={classes.imgPart}>
					<img
						src={props.src}
						alt={'clinic'}
						width='320px'
						height='280px'
					/>
				</div>
				<h2 className={classes.clinicNameText}>{props.clinicName}</h2>

				<Text style={classes.clinicAddressText}>
					<Image
						src='/map-pin 1.svg'
						alt=''
						width='16.67px'
						height='15.04'
					/>
					{props.clinicAddress}
				</Text>
			</div>
		</Link>
	);
};

export default ClinicCardItem;
