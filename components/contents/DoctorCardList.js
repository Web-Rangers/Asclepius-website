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
	const slideLeft = () => {
		var slider = document.getElementById('slider');
		slider.scrollLeft = slider.scrollLeft - 300;
	};

	const slideRight = () => {
		var slider = document.getElementById('slider');
		slider.scrollLeft = slider.scrollLeft + 300;
	};
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
					<Carousel
						className={classes.carousel}
						showStatus={false}
						showIndicators={false}
					>
						{doctorsData?.map((chunk) => {
							return <>
								<div className={classes.clinicCardItem}>
								{
									chunk.map((item, index)=> {
										return <DoctorCardItem
											key={index}
											rating={item.rating}
											src={item.pictureUrl}
											doctorName={item.firstName}
											speciality={item?.professions[0]?.name}
										/>
								})
							}
						</div>
						</>
						})}
					</Carousel>
				</div>
			</div>
		</div>
	);
};

export default DoctorCardList;
