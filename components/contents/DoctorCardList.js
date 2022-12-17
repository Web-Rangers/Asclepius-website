import { useState, useEffect, useCallback } from 'react';
import DoctorCardItem from '../contents/DoctorCardItem';
import classes from '../../styles/homePage.module.css';
import Text from '../ui/Text';
import Image from 'next/image';
import { Carousel } from 'react-responsive-carousel';

const DoctorCardList = ({ doctorsData }) => {
	const [data, setData] = useState([]);
	const [state, setState] = useState(false);

	const showMoreFunc = useCallback(() => {
		if (!state) setData(doctorsData?.filter((e, i) => i < 12));
		else setData(doctorsData?.filter((e, i) => i < 4));
	}, [data]);

	useEffect(() => {
		setData(doctorsData?.filter((e, i) => i < 4));
	}, [doctorsData]);

	return (
		<div className={classes.doctorCardContainer}>
			<div className={classes.firstPart}>
				<div className={classes.serviceContainerImg}>
					<img
						src='doctorImg1.png'
						alt='doctorImg1'
						height='210px'
						width='655px'
					/>
					<img
						src='doctorImg2.png'
						alt='doctorImg2'
						height='210px'
						width='655px'
					/>
				</div>
				<div className={classes.clinicCardContainerTitle}>
					{/* <Text style={classes.serviceTextStyle}>Popular</Text> */}
					<div className={classes.arrows}>
						<Text style={classes.ourDoctorTextStyle}>ექიმები</Text>
					</div>
				</div>
				<div
					className={classes.doctorCardList}
					id='slider'
				>
					{data?.map((item) => {
						return (
							<>
								<DoctorCardItem
									id={item?.id}
									key={item?.id}
									rating={item?.rating}
									src={item?.pictureUrl}
									doctorName={item?.firstName}
									speciality={item?.professions && item?.professions[0]?.name}
								/>
							</>
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
					{!state ? 'მეტი' : 'ნაკლები'}
				</div>
			</div>
		</div>
	);
};

export default DoctorCardList;
