import React, { useEffect, useState } from 'react';
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
import ResponsiveSlider from '../components/contents/ResponsiveCarousel';
import { useWindowSize } from '../components/useWindowSize';
import { getData } from '../components/request';
import { Carousel } from 'react-responsive-carousel';
import MainSlider from '../components/contents/mainSlider';
import { Dropdown, message } from 'antd';
import 'antd/dist/antd.css';

const onClick = ({ key }) => {
	message.info(`Click on item ${key}`);
};
const items = [
	{
		label: '1st menu item',
		key: '1',
	},
	{
		label: '2nd menu item',
		key: '2',
	},
	{
		label: '3rd menu item',
		key: '3',
	},
];

function Home({ clinics, doctors, frelancers, categories }) {
	const [clinicData, setClinicData] = useState([]);
	const [doctorsData, setDoctorsData] = useState([]);
	const [imgData, setImgData] = useState([]);

	const allData = frelancers?.content
		?.concat(doctors?.content)
		.sort(function (a, b) {
			return a.id > b.id ? -1 : a.id > b.id ? 1 : 0;
		});

	console.log('doctr', allData);

	const catalogData = [
		{ name: 'ყველა კატეგორია' },
		{ name: 'სტომატოლოგია' },
		{ name: 'ესთეტიკა და სილამაზე' },
		{ name: 'სამედიცინო დაწესებულებები' },
		{ name: 'რეპროდუქტოლოგია' },
		{ name: 'ლაბორატორია და დიაგნოსტიკა' },
	];

	const windowSize = useWindowSize();

	const firstPartImgArray = [
		'firstPartImg1.png',
		'firstPartImg2.png',
		'firstPartImg3.png',
		'firstPartImg3.png',
		'firstPartImg3.png',
		'firstPartImg3.png',
		'firstPartImg1.png',
		'firstPartImg2.png',
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
			<a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
			  1st menu item
			</a>
		  ),
		},
		{
		  key: '2',
		  label: (
			<a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
			  2nd menu item
			</a>
		  ),
		},
		{
		  key: '3',
		  label: (
			<a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
			  3rd menu item
			</a>
		  ),
		},
	  ];

	return (
		<div className={classes.homePageContainer}>
			<div className={classes.catalogContainer}>
				{categories?.map((item, index) => {
					const subCategories = categories.filter((e)=> e.parentCategoryId == item.id);
					const items = subCategories.map((e, key)=> {
						return {
							key: key,
							label: (
							  <a target="_blank" rel="noopener noreferrer" href={`/${e.title}`}>
								{e.title}
							  </a>
							),
						}
					})

					return <>
					{
						item.parentCategoryId === null && 
						(
							items.length > 0 ?
							<Dropdown
								menu={{
									items,
								}}
								placement="bottom"
								overlayClassName={classes.dropdown}
							>
								<span
									key={index}
									className={classes.catalogTextStyle}
								>
									{item.title}
								</span>
							</Dropdown> : 
							<span
								key={index}
								className={classes.catalogTextStyle}
							>
								{item.title}
							</span>
						)
					}
					</>
				})}
			</div>
			<div>
				<div className={classes.firstPart}>
					<div className={classes.showSlider}>
						{/* <Slider /> */}
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
					<Carousel
						swipeable={true}
						emulateTouch={true}
						className={classes.carousel}
						showStatus={false}
						showIndicators={false}
						showArrows={false}
						centerMode={true}
						centerSlidePercentage={25.5}
						renderArrowPrev={(clickHandler) => (
							<button onClick={clickHandler}>
								<img
									style={{
										height: '15px',
										width: '12.05px',
										cursor: 'pointer',
									}}
									src={`Arrow - Left.svg`}
								/>
							</button>
						)}
						renderArrowNext={(clickHandler) => (
							<button onClick={clickHandler}>
								<img
									style={{
										height: '15px',
										width: '12.05px',
										cursor: 'pointer',
									}}
									src={`Arrow - Right.svg`}
								/>
							</button>
						)}
					>
						{firstPartImgArray.map((e, index) => {
							return (
								<img
									src={e}
									className={classes.slide}
									key={index}
									alt='firstPartimg'
								/>
							);
						})}
					</Carousel>
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
			<ClinicCardList clinicsData={clinicData} />
			<DoctorCardList doctorsData={doctorsData} />
			{/* <Services />
			<Benefits /> */}
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
	const getCategories = await getData(
		`${API_URL}/asclepius/v1/api/categories`
	);

	return {
		props: {
			clinics:
				getClinics?.length === 0
					? null
					: getClinics.sort(function (a, b) {
							return a.regDate > b.regDate ? -1 : a.regDate > b.regDate ? 1 : 0;
					  }),
			doctors: getDoctors?.length === 0 ? null : getDoctors,
			frelancers: getFreelancerDoc?.length === 0 ? null : getFreelancerDoc,
			categories: getCategories
		},
	};
};

export default Home;
