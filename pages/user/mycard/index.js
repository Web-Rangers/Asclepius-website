import { useState, useEffect } from 'react';
import { ReactSVG } from 'react-svg';
import styles from '../../../styles/pages/userDetailed.module.css';
import Image from 'next/image';
import classNames from 'classnames';

let clinicWithServices = [
	{
		clinicId: 0,
		clinicName: 'Union Family Health Center',
		clinicWorkingHours: 'Monday - friday  10:00-17:00',
		address: 'Carymouth , Hallmark Clinic',
		discount: '15%',
		services: [
			{
				id: 0,
				serviceName: 'სტომატოლოგია',
				discount: '15%',
			},
			{
				id: 1,
				serviceName: 'ლაბორატორია და დიაგნოსტიკა',
				discount: '10%',
			},
			{
				id: 2,
				serviceName: 'ესთეტიკა და სილამაზე',
				discount: '10%',
			},
			{
				id: 3,
				serviceName: 'რეაბილიტაცია და გამაჯანსაღებელი სერვისები',
				discount: '10%',
			},
			{
				id: 4,
				serviceName: 'სტომატოლოგია',
				discount: '15%',
			},
			{
				id: 5,
				serviceName: 'სტომატოლოგია',
				discount: '15%',
			},
			{
				id: 6,
				serviceName: 'სტომატოლოგია',
				discount: '15%',
			},
			{
				id: 7,
				serviceName: 'სტომატოლოგია',
				discount: '15%',
			},
			{
				id: 8,
				serviceName: 'სტომატოლოგია',
				discount: '15%',
			},
			{
				id: 9,
				serviceName: 'სტომატოლოგია',
				discount: '15%',
			},
			{
				id: 10,
				serviceName: 'სტომატოლოგია',
				discount: '15%',
			},
			{
				id: 11,
				serviceName: 'სტომატოლოგია',
				discount: '15%',
			},
		],
	},
	{
		clinicId: 1,
		clinicName: 'Union Family Health Center',
		clinicWorkingHours: 'Monday - friday  10:00-17:00',
		address: 'Carymouth , Hallmark Clinic',
		discount: '10%',
		services: [
			{
				id: 0,
				serviceName: 'სტომატოლოგია',
				discount: '15%',
			},
			{
				id: 1,
				serviceName: 'სტომატოლოგია',
				discount: '15%',
			},
			{
				id: 2,
				serviceName: 'სტომატოლოგია',
				discount: '15%',
			},
			{
				id: 3,
				serviceName: 'სტომატოლოგია',
				discount: '15%',
			},
			{
				id: 4,
				serviceName: 'სტომატოლოგია',
				discount: '15%',
			},
			{
				id: 5,
				serviceName: 'სტომატოლოგია',
				discount: '15%',
			},
			{
				id: 6,
				serviceName: 'სტომატოლოგია',
				discount: '15%',
			},
			{
				id: 7,
				serviceName: 'სტომატოლოგია',
				discount: '15%',
			},
			{
				id: 8,
				serviceName: 'სტომატოლოგია',
				discount: '15%',
			},
			{
				id: 9,
				serviceName: 'სტომატოლოგია',
				discount: '15%',
			},
			{
				id: 10,
				serviceName: 'სტომატოლოგია',
				discount: '15%',
			},
			{
				id: 11,
				serviceName: 'სტომატოლოგია',
				discount: '15%',
			},
		],
	},
];

export default function Mycard() {
	const [services, setServices] = useState();

	function changeServicesquantity(item) {
		if (item.num == 6) {
			let modifyService = services.map((e) => {
				if (e.clinicId == item.clinicId) {
					return { ...e, num: 99999 };
				} else {
					return e;
				}
			});

			setServices(modifyService);
		} else {
			let modifyService = services.map((e) => {
				if (e.clinicId == item.clinicId) {
					return { ...e, num: 6 };
				} else {
					return e;
				}
			});

			setServices(modifyService);
		}
	}

	useEffect(() => {
		let modifyArray = clinicWithServices.map((e) => ({ ...e, num: 6 }));

		setServices(modifyArray);
	}, []);

	return (
		<>
			<div className={styles.detailedPage}>
				<div className={styles.detailPageContainer}>
					<div className={styles.services_container}>
						<button className={styles.backBtn}>
							<ReactSVG src='/back.svg' />
							<span>Back</span>
						</button>
						{services?.map((item) => {
							return (
								<div
									className={styles.servicesItem}
									key={item.id}
								>
									<div className={styles.serviceItemImg}>
										<Image
											layout='fill'
											src='/clinicpost.png'
										/>
										<div>-{item.discount}</div>
									</div>
									<div className={styles.serviceItemInfo}>
										<h2>{item.clinicName}</h2>
										<button className={styles.clinicWorkingHours}>
											{item.clinicWorkingHours}
										</button>
										<span>
											<ReactSVG src='/address.svg' />
											{item.address}
										</span>
									</div>
									<div className={styles.sevicesBlock}>
										<div className={styles.servicesItemServices}>
											<h2>სერვისები</h2>
											<div className={styles.servicesList}>
												{item.services?.map((service, i) => {
													if (i < item.num) {
														return (
															<div key={i}>
																<span>{service.serviceName}</span>{' '}
																{service.discount}
															</div>
														);
													}
												})}
											</div>
										</div>
										<button
											className={classNames(styles.serviceQuantity, {
												[styles.showLess]: item.num !== 6,
											})}
											onClick={() => changeServicesquantity(item)}
										>
											{item.num == 6 ? 'იხილე მეტი' : 'იხილე ნაკლები'}
										</button>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</>
	);
}
