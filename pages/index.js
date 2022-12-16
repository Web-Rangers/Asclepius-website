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
import { getData } from '../components/request';
import { Carousel } from 'react-responsive-carousel';
import MainSlider from '../components/contents/MainSlider';
import { Alert, Space, Spin } from 'antd';
import 'antd/dist/antd.css';
import Link from 'next/link';
import Swipper from '../components/contents/Swipper';
import Navigation from '../components/navigation';

function Home({ clinics, doctors, frelancers, categories, products }) {
	const [clinicData, setClinicData] = useState([]);
	const [doctorsData, setDoctorsData] = useState([]);
	const [imgData, setImgData] = useState([]);

	const allData = frelancers?.content
		?.concat(doctors?.content)
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
			setClinicData(clinics);
		} else {
			setClinicData(clinics);
		}
	}, [clinics, windowSize.width]);

	useEffect(() => {
		if (windowSize.width > 600) {
			setDoctorsData(allData);
		} else {
			setDoctorsData(allData);
		}
	}, [doctors, windowSize.width]);

	const items = [
		{
			key: '1',
			label: (
				<a
					target='_blank'
					rel='noopener noreferrer'
					href='https://www.antgroup.com'
				>
					1st menu item
				</a>
			),
		},
		{
			key: '2',
			label: (
				<a
					target='_blank'
					rel='noopener noreferrer'
					href='https://www.aliyun.com'
				>
					2nd menu item
				</a>
			),
		},
		{
			key: '3',
			label: (
				<a
					target='_blank'
					rel='noopener noreferrer'
					href='https://www.luohanacademy.com'
				>
					3rd menu item
				</a>
			),
		},
	];

	// if(!products?.length){
	// 	return <div className={classes.loader}>
	// 		<img src="/skeleton-gif.gif" />
	// 		{/* <Spin size="large">
	// 			<div className="content" />
	// 		</Spin> */}
	// 	</div>
	// }

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
				products={products}
			/>
			<DoctorCardList doctorsData={doctorsData} />
			<CardPrice />
		</div>
	);
}

export const getServerSideProps = async () => {
	let API_URL = process.env.NEXT_PUBLIC_BASE_URL;

	const getClinics = await getData(
		`${API_URL}/asclepius/v1/api/clinics/search?name=`
	);
	const getDoctors = await getData(
		`${API_URL}/asclepius/v1/api/clinics/doctors/?page=0&size=10`
	);
	const getFreelancerDoc = await getData(
		`${API_URL}/asclepius/v1/api/doctors/freelancers?page=0&size=5`
	);
	const getCategories = await getData(`${process.env.MEDICAL_API}/medical/categories`);

	const getProducts = await getData(
		`${process.env.MEDICAL_API}/medical/products/get-products`
	);

	if (getProducts?.notFound) {
		return {
		  notFound: true,
		};
	}

	return {
		props: {
			clinics: Array.isArray(getClinics) ? getClinics : [],
			doctors: Array.isArray(getDoctors) ? getDoctors : [],
			frelancers: Array.isArray(getFreelancerDoc) ? getFreelancerDoc : [],
			categories: Array.isArray(getCategories) ? getCategories : [],
			products: Array.isArray(getProducts) ? getProducts : []
		},
	};
};

export default Home;
