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
import ResponsiveSlider from '../components/contents/ResponsiveCarousel';
import { useWindowSize } from '../components/useWindowSize';
import { getData, getMultipleData } from '../components/request';
import { Carousel } from 'react-responsive-carousel';
import MainSlider from '../components/contents/MainSlider';
import { Alert, Space, Spin } from 'antd';
import 'antd/dist/antd.css';
import Link from 'next/link';
import Swipper from '../components/contents/Swipper';
import Navigation from '../components/navigation';

function Home() {
	const [data, setData] = useState({
		clinics: [],
		doctors: [],
		frelancers: [],
		products: [],
		categories: []
	})
	const [clinicData, setClinicData] = useState([]);
	const [doctorsData, setDoctorsData] = useState([]);
	const [imgData, setImgData] = useState([]);

	const allData = data?.frelancers?.content
		?.concat(data?.doctors?.content)
		.sort(function (a, b) {
			return a.id > b.id ? -1 : a.id > b.id ? 1 : 0;
		});

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
			setClinicData(data?.clinics);
		} else {
			setClinicData(data?.clinics);
		}
	}, [data?.clinics, windowSize.width]);

	useEffect(() => {
		if (windowSize.width > 600) {
			setDoctorsData(allData);
		} else {
			setDoctorsData(allData);
		}
	}, [data?.doctors, windowSize.width]);


	let datas = [
		'clinics',
		'doctors',
		'frelancers',
		'products',
		'categories'
	]

	let urls = [
		`${process.env.NEXT_PUBLIC_BASE_URL}/asclepius/v1/api/clinics/search?name=`,
		`${process.env.NEXT_PUBLIC_BASE_URL}/asclepius/v1/api/clinics/doctors/?page=0&size=10`,
		`${process.env.NEXT_PUBLIC_BASE_URL}/asclepius/v1/api/doctors/freelancers?page=0&size=5`,
		`${process.env.MEDICAL_API}/medical/products/get-products`,
		`${process.env.MEDICAL_API}/medical/categories`
	]

	useEffect(()=>{
		getMultipleData(datas, setData, urls)
	},[])

	return (
		<div className={classes.homePageContainer}>
			<Navigation />
			<div>
				<div className={classes.firstPart}>
					<div className={classes.showSlider}>
						<MainSlider />
					</div>
				</div>
			</div>
			<div className={classes.showSliderForMobile}>
				<div className={classes.firstPart}>
					<div className={classes.showSliderForMobile}>
						<ResponsiveSlider />
						<Text style={classes.medicalCardTitle}>
							<span>Multifunctional medical Card</span>
						</Text>
						<div className={classes.medicalCardsButtons}>
							<Button
								name='Order a card'
								style={classes.orderBtn}
							/>
							<Button
								name='Learn more'
								style={classes.downloadOrderBtn}
							/>
						</div>
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
