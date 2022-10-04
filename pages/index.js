import {useEffect, useState} from 'react';
import Slider from '../components/contents/Slider';
import classes from '../styles/homePage.module.css';
import ClinicCardList from '../components/contents/ClinicCardList';
import DoctorCardList from '../components/contents/DoctorCardList';
import Services from '../components/contents/Services';
import Benefits from '../components/contents/Benefits';
import CardPrice from '../components/contents/CardPrice';
import Text from '../components/ui/Text';
import Button from '../components/ui/Button';
import axios from 'axios';
import ResponsiveSlider from '../components/contents/responsiveCarousel';
import {useWindowSize} from '../components/useWindowSize';

function Home({ clinics, doctors }) {
	const [clinicData, setClinicData] = useState([]);
	const [doctorsData, setDoctorsData] = useState([]);

	const windowSize = useWindowSize();

	const firstPartImgArray = [
		'firstPartImg1.png',
		'firstPartImg2.png',
		'firstPartImg3.png',
	];

	function sliceIntoChunks(arr, chunkSize) {
	  const res = [];
	  for (let i = 0; i < arr.length; i += chunkSize) {
		  const chunk = arr.slice(i, i + chunkSize);
		  res.push(chunk);
	  }
	  return res;
	}
  
	useEffect(()=> {
		if(windowSize.width > 600){
			console.log(windowSize.width)
			setClinicData(sliceIntoChunks(clinics, 4))
		}else {
			setClinicData(sliceIntoChunks(clinics, 1))
		}
	},[clinics, windowSize.width])

	useEffect(() => {
		if(windowSize.width > 600){
			setDoctorsData(sliceIntoChunks(doctors, 4))
		}else {
			setDoctorsData(sliceIntoChunks(doctors, 1))
		}
	}, [doctors, windowSize.width])

	return (
		<div className={classes.homePageContainer}>
			
			<div>
				<div className={classes.firstPart}>
					<div className={classes.showSlider}>
						<Slider />
					</div>
				</div>
			</div>
			<div className={classes.showSliderForMobile}>
				<div className={classes.firstPart}>
					<div className={classes.showSliderForMobile}>
						<ResponsiveSlider />
						<Text style={classes.medicalCardTitle}>
							<span>Multifunctional medical</span> 
							<a>Card</a>
						</Text>
						<div className={classes.medicalCardsButtons}>
							<Button
								name='Order a card'
								style={classes.orderBtn}
							/>
							<Button
								name='Download'
								style={classes.downloadOrderBtn}
							/>
						</div>
					</div>
				</div>
			</div>
			<div>
				<div className={classes.firstPart}>
					<div className={classes.firstPartImg}>
						{firstPartImgArray.map((image, index) => (
							<img
								className={classes.slide}
								key={index}
								src={image}
								alt='firstPartimg'
							/>
						))}
					</div>
				</div>
			</div>
			<ClinicCardList clinicsData={clinicData} />
			<DoctorCardList doctorsData={doctorsData} />
			<Services />
			<Benefits />
			<CardPrice />
		</div>
	);
}

async function getData(url) {
	try {
		const res = await fetch(url)
		const response = res.json();

		return response
	}catch(error){
		console.log(error)
	}
}

export const getStaticProps = async () => {
    const getClinics = await getData('https://asclepius.pirveli.ge/asclepius/v1/api/clinics/search?name=')
	const getDoctors = await getData('https://asclepius.pirveli.ge/asclepius/v1/api/clinics/doctors?page=0&size=10')
	
    return {
        props:{
            clinics: getClinics,
			doctors: getDoctors?.content
        },
    }
}

export default Home