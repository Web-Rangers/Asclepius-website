import React, { useEffect, useState } from 'react';
import Slider from '../components/contents/Slider';
import classes from '../styles/homePage.module.css';
import s from '../styles/clinicDetailPage.module.css';
import ClinicCardList from '../components/contents/ClinicCardList';
import DoctorCardList from '../components/contents/DoctorCardList';
import Services from '../components/contents/Services';
import Benefits from '../components/contents/Benefits';
import CardPrice from '../components/contents/CardPrice';
import Text from '../components/ui/Text';
import Button from '../components/ui/Button';
import axios from 'axios';
import ResponsiveSlider from '../components/contents/responsiveCarousel';
import { useWindowSize } from '../components/useWindowSize';
import { getData, getMultipleData } from '../components/request';
import { Carousel } from 'react-responsive-carousel';
import MainSlider from '../components/contents/MainSlider';
import { Alert, Space, Spin } from 'antd';
import 'antd/dist/antd.css';
import Link from 'next/link';
import Swipper from '../components/contents/Swipper';
import Navigation from '../components/navigation';
import NavItem from '../components/contents/NavItem';

function Home() {
	const [data, setData] = useState({
		clinics: [],
		doctors: [],
		products: [],
		categories: [],
	});
	const [clinicData, setClinicData] = useState([]);
	const [doctorsData, setDoctorsData] = useState([]);
	const [imgData, setImgData] = useState([]);

	const allData = data?.doctors?.content; //.concat(doctors?.content)
	// ?.concat(doctors?.content)
	// .sort(function (a, b) {
	// 	return a.id > b.id ? -1 : a.id > b.id ? 1 : 0;
	// });

	const windowSize = useWindowSize();

	const firstPartImgArray = [
		{ id: '1', url: 'firstPartImg1.png', size: true },
		{ id: '2', url: 'firstPartImg2.png', size: true },
		{ id: '3', url: 'firstPartImg3.png', size: true },
		{ id: '4', url: 'firstPartImg3.png', size: true },
		{ id: '5', url: 'firstPartImg1.png', size: true },
		{ id: '6', url: 'firstPartImg3.png', size: true },
		{ id: '7', url: 'firstPartImg2.png', size: true },
		{ id: '8', url: 'firstPartImg1.png', size: true },
		{ id: '9', url: 'firstPartImg2.png', size: true },
		{ id: '10', url: 'firstPartImg2.png', size: true },
		{ id: '11', url: 'firstPartImg1.png', size: true },
		{ id: '12', url: 'firstPartImg2.png', size: true },
	];

	function sliceIntoChunks(arr, chunkSize) {
		const res = [];
		for (let i = 0; i < arr.length; i += chunkSize) {
			const chunk = arr.slice(i, i + chunkSize);
			res.push(chunk);
		}
		return res;
	}

	useEffect(() => {
		if (windowSize.width > 600) {
			setImgData(sliceIntoChunks(firstPartImgArray, 4));
		} else {
			setImgData(sliceIntoChunks(firstPartImgArray, 1));
		}
	}, [windowSize.width]);

	useEffect(() => {
		if (windowSize.width > 600) {
			setClinicData(data?.clinics?.content?.filter((e) => e.isActive));
		} else {
			setClinicData(data?.clinics?.content?.filter((e) => e.isActive));
		}
	}, [data?.clinics, windowSize.width]);

	useEffect(() => {
		if (windowSize.width > 600) {
			setDoctorsData(allData);
		} else {
			setDoctorsData(allData);
		}
	}, [data?.doctors, windowSize.width]);

	let datas = ['clinics', 'doctors', 'products', 'categories'];

	let urls = [
		`${process.env.MEDICAL_API}/medical/clinics?page=0&size=9999`,
		`${process.env.MEDICAL_API}/medical/doctors?page=0&size=999`,
		`${process.env.MEDICAL_API}/medical/products/get-products`,
		`${process.env.MEDICAL_API}/medical/categories`,
	];

	useEffect(() => {
		getMultipleData(datas, setData, urls);
	}, []);

	return (
		<div className={classes.homePageContainer}>
			<div className={s.mobileBottomNav}>
				<NavItem />
			</div>
			<Navigation />

			<div>
				<div className={classes.firstPart}>
					<div className={classes.showSlider}>
						<MainSlider />
					</div>
				</div>
			</div>
			<div className={classes.showSliderForMobile}>
				<div className={classes.headerSliderStyle}>
					<div className={classes.showSliderForMobile}>
						<ResponsiveSlider />
					</div>
				</div>
			</div>
			<div>
				<div className={classes.firstPart}>
					<div className={s.swipperContainer}>
						<Swipper
							data={firstPartImgArray}
							iconTop={true}
							iconBottom={true}
						/>
					</div>
				</div>
				<div className={classes.firstPartImgForMobile}>
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
			<ClinicCardList
				clinicsData={clinicData}
				products={data?.products}
			/>
			<DoctorCardList doctorsData={allData} />
			<CardPrice />
		</div>
	);
}

export default Home;

// export async function getStaticProps() {
// 	const clinics = await getData(`${process.env.MEDICAL_API}/medical/clinics?page=0&size=9999`);
// 	const doctors = await getData(`${process.env.MEDICAL_API}/medical/doctors?page=0&size=999`);

// 	return {
// 		props: {
// 			clinics: Array.isArray(clinics?.content) ? clinics?.content?.filter(e=> e.isActive) : [],
// 			doctors: Array.isArray(doctors?.content) ? doctors : [],
// 		}
// 	}
// }
