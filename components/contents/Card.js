import React, { useState, useEffect } from 'react';
import style from '../../styles/components/card.module.css';
import Button from '../ui/Button';
import Link from 'next/link';
import { Switch, Tooltip } from 'antd';

const Card = ({ data }) => {
	const [checked, setChecked] = useState(false);

	const [cardTypes, setCardTypes] = useState({
		individual: [],
		family: [],
	});

	useEffect(() => {
		let individual = data?.filter(
				(e) =>
					e.genericTransactionTypeToAddInfo?.infoCategory !==
					'PERCENTAGE_CLINIC_DISCOUNT_FAMILY'
			),
			family = data?.filter(
				(e) =>
					e.genericTransactionTypeToAddInfo?.infoCategory ==
					'PERCENTAGE_CLINIC_DISCOUNT_FAMILY'
			);

		setCardTypes((e) => ({ family: family, individual: individual }));
	}, []);

	console.log('data');

	const text = <span>საოჯახო პაკეტი მოიცავს, დედას, მამას და 2 ბავშვს</span>;

	const featuresData = [
		{
			id: '1',
			name: 'ცხელი ხაზის მომსახურება 24/7',
			starter: '100% ულიმიტო',
			pro: '100% ულიმიტო',
			plus: '100% ულიმიტო',
		},
		{
			id: '2',
			name: 'ოჯახის ექიმთან სატელეფონო კონსულტაცია',
			starter: 'თვეში 1-ჯერ',
			pro: 'თვეში 2-ჯერ',
			plus: 'თვეში 3-ჯერ',
		},
		{
			id: '3',
			name: 'ოჯახის ექიმთან ვიზიტი',
			starter: 'თვეში 1-ჯერ',
			pro: 'თვეში 2-ჯერ',
			plus: 'თვეში 3-ჯერ',
		},
		{
			id: '4',
			name: 'ამბულატორია',
			starter: '40%-მდე',
			pro: '',
			plus: '',
		},
		{
			id: '5',
			name: 'სასწრაფო დახმარება',
			starter: '',
			pro: '',
			plus: '',
		},
		{
			id: '6',
			name: 'ლაბორატორია',
			starter: '40%-მდე',
			pro: '',
			plus: '',
		},
		{
			id: '7',
			name: 'მაღალტექნოლოგიური კვლევები',
			starter: '',
			pro: '',
			plus: '',
		},
		{
			id: '8',
			name: 'რეაბილიტაცია',
			starter: '15%-მდე',
			pro: '',
			plus: '',
		},
		{
			id: '8',
			name: 'მედიკამენტები',
			starter: '30%-მდე',
			pro: '',
			plus: '',
		},
		{
			id: '8',
			name: 'სტომატოლოგია',
			starter: '15%-მდე',
			pro: '',
			plus: '',
		},
		{
			id: '8',
			name: 'სილამაზე და ესტეტიკა',
			starter: '15%-მდე',
			pro: '',
			plus: '',
		},
	];

	return (
		<div className={style.cardTableContainer}>
			<div className={style.cardTableContainerHeader}>
				<span className={style.headerTitle}>ბარათის ყიდვა</span>
				<div className={style.switcher}>
					<span className={style.switcherLabel}> პერსონალური</span>
					<Switch
						className={
							checked ? style.switcherChecked : style.switcherUnChecked
						}
						onChange={(checked) => setChecked(checked)}
					/>
					<span className={style.switcherLabel}>
						საოჯახო
						<Tooltip
							placement='top'
							title={text}
							className={style.tooltipTextStyle}
						>
							<a className={style.tooltipContainer}>
								<img
									src={'tooltip.svg'}
									alt='star'
									className={style.tooltip}
								/>

								<img
									src={'tooltipActive.svg'}
									alt='star'
									className={style.tooltipActive}
								/>
							</a>
						</Tooltip>
					</span>
				</div>
			</div>
			{/* <div className={style.cardTableMobile}>
				<div className={style.Starter}>
					<div className={style.cardTitles}>
						<span className={style.cardTitleText}>
							{checked
								? cardTypes?.family[0]?.cardName
								: cardTypes?.individual[0]?.cardName}
						</span>
						<span className={style.tableValueSec}>
							<span>
								{checked ? (
									<span>
										{cardTypes?.family[0]?.price}
										<img
											src='lari.svg'
											alt='lari'
											width='29px'
											height='23px'
										/>
									</span>
								) : (
									<span>
										{cardTypes?.family[0]?.price}
										<img
											src='lari.svg'
											alt='lari'
											width='29px'
											height='23px'
										/>
									</span>
								)}
							</span>
						</span>
					</div>
					{featuresData.map((item, index) => (
						<div
							key={item.id + index}
							className={style.tableValuesContainer}
						>
							<span
								className={
									index % 2 === 0
										? style.tableValueMobile
										: style.tableValueSecMobile
								}
							>
								{item.name}
							</span>
							<span
								className={
									index % 2 === 0
										? style.tableValueMobileP
										: style.tableValueSecMobileP
								}
							>
								{item.starter}
							</span>
						</div>
					))}
					<Button
						name='ყიდვა'
						style={style.getStartedBtn}
					/>
				</div>
				<div className={style.pro}>
					<div className={style.proCardTitles}>
						<span className={style.recommendedStyle}>Recommended</span>
						<span className={style.cardTitleText}>
							{checked
								? cardTypes?.family[1]?.cardName
								: cardTypes?.individual[1]?.cardName}
						</span>
						<span className={style.tableValueSec}>
							<span>
								{checked ? (
									<span>
										{cardTypes?.family[1]?.price}
										<img
											src='lari.svg'
											alt='lari'
											width='29px'
											height='23px'
										/>
									</span>
								) : (
									<span>
										{cardTypes?.individual[1]?.price}
										<img
											src='lari.svg'
											alt='lari'
											width='29px'
											height='23px'
										/>
									</span>
								)}
							</span>
						</span>
					</div>
					{featuresData.map((item, index) => (
						<div
							key={item.id + index}
							className={
								index % 2 === 0
									? style.proTextContainer
									: style.proTextContainerSec
							}
						>
							<span
								className={
									index % 2 === 0 ? style.proTextStyle : style.proTextStyleSec
								}
							>
								{item.name}
							</span>
							<span
								className={
									index % 2 === 0
										? style.proTextStylePercent
										: style.proTextStyleSecPercent
								}
							>
								{item.pro}
							</span>
						</div>
					))}
					<Button
						name='ყიდვა'
						style={style.getPlusBtn}
					/>
				</div>
				<div className={style.plus}>
					<div className={style.cardTitles}>
						<span className={style.cardTitleText}>
							{checked
								? cardTypes?.family[2]?.cardName
								: cardTypes?.individual[2]?.cardName}
						</span>

						<span className={style.tableValueSec}>
							<span>
								{checked ? (
									<span>
										{cardTypes?.family[2]?.price}
										<img
											src='lari.svg'
											alt='lari'
											width='29px'
											height='23px'
										/>
									</span>
								) : (
									<span>
										{cardTypes?.individual[2]?.price}
										<img
											src='lari.svg'
											alt='lari'
											width='29px'
											height='23px'
										/>
									</span>
								)}
							</span>
						</span>
					</div>
					{featuresData.map((item, index) => (
						<div
							key={item.id + index}
							className={style.tableValuesContainer}
						>
							<span
								className={
									index % 2 === 0
										? style.tableValueMobile
										: style.tableValueSecMobile
								}
							>
								{item.name}
							</span>
							<span
								className={
									index % 2 === 0
										? style.tableValueMobileP
										: style.tableValueSecMobileP
								}
							>
								{item.plus}
							</span>
						</div>
					))}
					<Button
						name='ყიდვა '
						style={style.getStartedBtn}
					/>
				</div>
			</div>
			<div className={style.cardTable}>
				<div className={style.features}>
					<span className={style.titleTextStyle}>სერვისები</span>

					{featuresData.map((item, index) => (
						<span
							key={item.id + index}
							className={
								index % 2 === 0
									? style.featuresTextStyle
									: style.featuresTextStyleSec
							}
						>
							{item.name}
						</span>
					))}
				</div>
				<div className={style.Starter}>
					<div className={style.cardTitles}>
						<span className={style.cardTitleText}>
							1 თვე
						</span>
						<span className={style.price}>
							<span>
								{checked ? (
									<span>
										{cardTypes?.family[0]?.price}
										<img
											src='lari.svg'
											alt='lari'
											width='29px'
											height='23px'
										/>
									</span>
								) : (
									<span>
										{cardTypes?.individual[0]?.price}
										<img
											src='lari.svg'
											alt='lari'
											width='29px'
											height='23px'
										/>
									</span>
								)}
							</span>
							<span className={style.spanText}></span>
						</span>
					</div>
					{featuresData.map((item, index) => (
						<span
							key={item.id + index}
							className={
								index % 2 === 0 ? style.tableValue : style.tableValueSec
							}
						>
							{item.starter}
						</span>
					))}
				</div>
				<div className={style.pro}>
					<div className={style.proCardTitles}>
						<span className={style.recommendedStyle}>რეკომენდებული</span>
						<span className={style.cardTitleTextPro}>
							3 თვე
						</span>
						<span className={style.price}>
							<span>
								<span>
									{checked ? (
										<span>
											{cardTypes?.family[1]?.price}
											<img
												src='lari.svg'
												alt='lari'
												width='29px'
												height='23px'
											/>
										</span>
									) : (
										<span>
											{cardTypes?.individual[1]?.price}
											<img
												src='lari.svg'
												alt='lari'
												width='29px'
												height='23px'
											/>
										</span>
									)}
								</span>
								<span className={style.spanText}></span>
							</span>
						</span>
					</div>
					{featuresData.map((item, index) => (
						<span
							key={item.id + index}
							className={
								index % 2 === 0 ? style.proTextStyle : style.proTextStyleSec
							}
						>
							{item.pro}
						</span>
					))}
				</div>
				<div className={style.plus}>
					<div className={style.cardTitles}>
						<span className={style.cardTitleText}>
							6 თვე
						</span>

						<span className={style.price}>
							<span>
								<span>
									{checked ? (
										<span>
											{cardTypes?.family[2]?.price}
											<img
												src='lari.svg'
												alt='lari'
												width='29px'
												height='23px'
											/>
										</span>
									) : (
										<span>
											{cardTypes?.individual[2]?.price}
											<img
												src='lari.svg'
												alt='lari'
												width='29px'
												height='23px'
											/>
										</span>
									)}
								</span>
								<span className={style.spanText}></span>
							</span>
						</span>
					</div>
					{featuresData.map((item, index) => (
						<span
							key={item.id + index}
							className={
								index % 2 === 0 ? style.tableValue : style.tableValueSec
							}
						>
							{item.plus}
						</span>
					))}
				</div>
			</div> */}
			<div className={style.cardContainer}>
				<Link href='/buyCardPage'>
					<div className={style.containerCard}>
						<img src='/02-6.png' />
					</div>
				</Link>
				<div className={style.containerList}>
					{featuresData?.map((e, key) => {
						return (
							<div
								key={key}
								className={style.listItem}
							>
								<a href=''>
									<span>{e.name}</span>
								</a>
								<span>{e.starter}</span>
							</div>
						);
					})}
				</div>
				<div className={style.price}>
					<div className={style.priceContainer}>
						<span className={style.priceText}>ღირებულება</span>
						{checked ? (
							<span className={style.priceNumberStyle}>
								{cardTypes?.family[0]?.price}
								<img
									src='lari.svg'
									alt='lari'
									width='18px'
									height='18px'
								/>
							</span>
						) : (
							<span className={style.priceNumberStyle}>
								{cardTypes?.individual[0]?.price}
								<img
									src='lari.svg'
									alt='lari'
									width='18px'
									height='18px'
								/>
							</span>
						)}
					</div>
					<Link href='/buyCardPage'>
						<button>ყიდვა</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Card;
