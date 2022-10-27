import { useState, useEffect, useCallback } from 'react';
import ClinicCardItem from './ClinicCardItem';
import classes from '../../styles/homePage.module.css';
import Text from '../ui/Text';

const ClinicCardList = ({ clinicsData }) => {
	const [data, setData] = useState([]);
	const [state, setState] = useState(false);

	const showMoreFunc = useCallback(() => {
		if (!state) setData(clinicsData.filter((e, i) => i < 12));
		else setData(clinicsData.filter((e, i) => i < 4));
	}, [data]);

	useEffect(() => {
		setData(clinicsData.filter((e, i) => i < 4));
	}, [clinicsData]);

	console.log('Da', data);
	return (
		<div className={classes.clinicCardContainer}>
			<div className={classes.firstPart}>
				<div className={classes.clinicCardContainerTitle}>
					<Text style={classes.serviceTextStyle}>Services</Text>
					<div className={classes.arrows}>
						<Text style={classes.ourClinicTextStyle}>Our Clinics</Text>
					</div>
				</div>
				<div
					className={classes.clinicCardList}
					id='slider'
				>
					{data.map((item, index) => {
						return (
							<ClinicCardItem
								key={index}
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
					{!state ? 'show more' : 'show less'}
				</div>
			</div>
		</div>
	);
};

export default ClinicCardList;
