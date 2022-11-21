import { useState, useEffect, useCallback } from 'react';
import ClinicCardItem from './ClinicCardItem';
import classes from '../../styles/homePage.module.css';
import Text from '../ui/Text';
import { useRouter } from 'next/router';
import Card from './Card';

const ClinicCardList = ({ clinicsData }) => {
	const router = useRouter();
	const [data, setData] = useState([]);
	const [state, setState] = useState(false);

	const showMoreFunc = useCallback(() => {
		if (!state) {
			setData(clinicsData?.filter((e, i) => i < 12));
		} else setData(clinicsData?.filter((e, i) => i < 4));
		if (data.length === 12) {
			router.push('/clinicPage');
		}
	});

	useEffect(() => {
		setData(clinicsData?.filter((e, i) => i < 4));
	}, [clinicsData]);

	return (
		<div className={classes.clinicCardContainer}>
			<div className={classes.firstPart}>
				<Card />
				<div
					className={classes.showBtn}
					onClick={() => {
						router.push('/buyCardPage');
					}}
				>
					{'მეტი'}
				</div>
				<div className={classes.clinicCardContainerTitle}>
					{/* <Text style={classes.serviceTextStyle}>Services</Text> */}
					<div className={classes.arrows}>
						<Text style={classes.ourClinicTextStyle}>
							პარტნიორი ორგანიზაციები
						</Text>
					</div>
				</div>
				<div
					className={classes.clinicCardList}
					id='slider'
				>
					{data?.map((item) => {
						return (
							<ClinicCardItem
								key={item?.id}
								id={item.id}
								src={item.logoUrl || '/testClinic.png'}
								clinicName={item.displayName}
								clinicAddress={item.address.address}
								rating={''}
								data={item}
							/>
						);
					})}
				</div>
				<div
					className={classes.showBtn}
					onClick={() => {
						setState(!state);
						showMoreFunc();
					}}
				>
					{!state ? 'მეტი' : 'მეტი'}
				</div>
			</div>
		</div>
	);
};

export default ClinicCardList;
