import {useState, useEffect, useCallback} from 'react';
import DoctorCardItem from '../contents/DoctorCardItem';
import classes from '../../styles/homePage.module.css';
import Text from '../ui/Text';
import Image from 'next/image';
import { Carousel } from 'react-responsive-carousel';
const doctorData = [
	{
		src: 'maria.png',
		alt: 'clinic image',
		name: 'Pamela Martinez',
		speciality: 'Therapist, family doctor',
		rating: '4.9',
	},
	{
		src: 'pamela.png',
		alt: 'clinic image',
		name: 'Sanne Husman',
		speciality: 'Neurologist',
		rating: '4.9',
	},
	{
		src: 'maria.png',
		alt: 'clinic image',
		name: 'isabela Santos',
		speciality: 'Pediatrician',
		rating: '4.9',
	},
	{
		src: 'pamela.png',
		alt: 'clinic image',
		name: 'Sofia Richards',
		speciality: 'Dermatovenerologist',
		rating: '4.9',
	}
];
const DoctorCardList = ({doctorsData}) => {
	const [data, setData] = useState([]);
	const [state, setState] = useState(false);
	
	const showMoreFunc = useCallback(
		() => {
			if(!state) setData(doctorsData.filter((e, i)=> i < 12))
			else setData(doctorsData.filter((e, i)=> i < 4))
		},[data]
	)

	useEffect(()=> {
		setData(doctorsData.filter((e, i)=> i < 4))
	}, [doctorsData])

	return (
		<div className={classes.doctorCardContainer}>
			<div className={classes.firstPart}>
				<div className={classes.clinicCardContainerTitle}>
					<Text style={classes.serviceTextStyle}>Popular</Text>
					<div className={classes.arrows}>
						<Text style={classes.ourClinicTextStyle}>Experienced doctors</Text>
					</div>
				</div>
				<div
					className={classes.doctorCardList}
					id='slider'
				>
					{data?.map((item, index) => {
							return <>
								<DoctorCardItem
									id={item?.id}
									key={index}
									rating={item.rating}
									src={item.pictureUrl}
									doctorName={item.firstName}
									speciality={item?.professions && item?.professions[0]?.name}
								/>
						</>
					})}		
				</div>
				<div 
					className={classes.showBtn}
					onClick={()=>{setState(!state); showMoreFunc()}}
				>
					{!state ? "show more" : "show less"}
				</div>				
			</div>
		</div>
	);
};

export default DoctorCardList;
