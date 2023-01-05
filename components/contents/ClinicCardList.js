import { useState, useEffect, useCallback } from 'react';
import classes from '../../styles/homePage.module.css';
import Text from '../ui/Text';
import { useRouter } from 'next/router';
import Card from './Card';
import classNames from 'classnames';
import ClinicDoctorSwipper from '../contents/clinicDoctorSwipper';

const ClinicCardList = ({ clinicsData, products }) => {
	const router = useRouter();
	const [state, setState] = useState(false);
	const [data, setData] = useState([]);

	// const showMoreFunc = useCallback(() => {
	// 	if (!state) {
	// 		setData(clinicsData?.filter((e, i) => i < 12));
	// 	} else setData(clinicsData?.filter((e, i) => i < 4));
	// 	if (data.length === 12) {
	// 		router.push('/clinicPage');
	// 	}
	// });

	useEffect(() => {
		if (Array.isArray(clinicsData))
			setData(clinicsData?.filter((e, i) => i < 8));
	}, [clinicsData]);

	return (
		<div className={classes.clinicCardContainer}>
			<div className={classes.firstPart}>
				{products?.length ? <Card data={products} /> : ''}
				<div className={classes.clinicCardContainerTitle}>
					{/* <Text style={classes.serviceTextStyle}>Services</Text> */}
					<div className={classes.arrows}>
						<Text style={classes.ourClinicTextStyle}>
							პარტნიორი ორგანიზაციები
						</Text>
					</div>
				</div>
				{/* <div
					className={classes.clinicCardList}
					id='slider'
				> */}
				<ClinicDoctorSwipper clinicsData={data} />

				{/* <div
					className={classNames(classes.showBtn, classes.nonborder)}
					onClick={() => {
						showMoreFunc();
					}}
				>
					მეტი
				</div> */}
			</div>
		</div>
	);
};

export default ClinicCardList;
