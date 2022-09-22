import DoctorCardItem from '../contents/DoctorCardItem';
import classes from '../../styles/homePage.module.css';
import Text from '../ui/Text';
import Image from 'next/image';

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
const DoctorCardList = () => {
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
				<div className={classes.doctorCardContainer}>
					<div className={classes.clinicCardContainerTitle}>
						<Text style={classes.serviceTextStyle}>Popular</Text>
						<div className={classes.arrows}>
							<Text style={classes.ourClinicTextStyle}>Experienced doctors</Text>
							<div className={classes.arrowsIcons}>
								<Image
									src='/Arrow - Left.svg'
									alt='arrowLeft'
									width='24px'
									height='24px'
									onClick={slideLeft}
								/>
								<Image
									src='/Arrow - Right.svg'
									alt='arrowRight'
									width='24px'
									height='24px'
									onClick={slideRight}
								/>
							</div>
						</div>
					</div>
					<div
						className={classes.doctorCardList}
						id='slider'
					>
						{doctorData.map((item, index) => {
							return (
								<DoctorCardItem
									key={index}
									rating={item.rating}
									src={item.src}
									doctorName={item.name}
									speciality={item.speciality}
								/>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default DoctorCardList;
