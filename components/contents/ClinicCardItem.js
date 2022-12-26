import classes from '../../styles/homePage.module.css';
import s from '../../styles/clinicsPage.module.css';
import Text from '../ui/Text';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useWindowSize } from '../useWindowSize';
import { ReactSVG } from 'react-svg';
import Link from 'next/link';
import Button from '../ui/Button';
import { useState } from 'react';
import { useEffect } from 'react';
import {
	LazyLoadImage,
	trackWindowScroll,
} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Skeleton from '../../components/contents/Skeleton';
import classNames from 'classnames';
// import 'antd/dist/reset.css';

const ClinicCardItem = ({ data, listItem = false, cards }) => {
	const size = useWindowSize();
	let a;

	const [discount, setDiscount] = useState(0);

	const [state, setState] = useState(false);

	useEffect(() => {
		cards?.map((item) =>
			item?.clinic?.map((e) => {
				if (e?.clinicId === data?.id) {
					setDiscount(e.percentage);

					discount > e?.percentage ? setDiscount(e.percentage) : '';
				}
			})
		);
	}, [data?.id, cards]);

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
									'https://s3.pirveli.com/v1/api/getFile?id=null'
										? '/clinicImage.png'
										: data?.logoUrl
								}
								alt={data?.alt}
								className={s.clinicItemImage}
							/>
							{discount > 0 && (
								<span className={classes.percentContainer}>
									{discount + '%'}
								</span>
							)}
						</div>
						<div className={s.bottomContainer}>
							<Text style={s.clinicNameText}>{data?.displayName}</Text>
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
				<>
					{!state && <Skeleton />}
					<Link
						key={data.key}
						href={`/clinicDetailPage/${data?.id}`}
					>
						<a>
							<div
								className={classNames(classes.cardItemContainer, {
									[classes.append]: state,
								})}
							>
								<div className={classes.imgPart}>
									<LazyLoadImage
										key={data.id}
										alt={data.title}
										effect={'blur'}
										height={'100%'}
										src={
											data?.logoUrl !==
											'https://s3.pirveli.com/v1/api/getFile?id=null'
												? data.logoUrl
												: '/clinicImage.png'
										}
										width={state ? '100%' : '0px'}
										beforeLoad={() => console.log('before')}
										afterLoad={() => setState(true)}
									/>
								</div>
								<div className={s.bottomContainer}>
									<Text style={classes.clinicNameText}>
										{data?.displayName}
									</Text>
									<Text style={classes.clinicAddressText}>
										<Image
											src='/map-pin 1.svg'
											alt=''
											width='16.67px'
											height='15.04'
										/>
										{data?.address?.municipality.title}, {data?.address.address}
									</Text>
								</div>
							</div>
						</a>
					</Link>
				</>
			)}
		</>
	);
};

export default ClinicCardItem;
