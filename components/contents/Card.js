import React, { useState, useEffect } from 'react';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import style from '../../styles/components/card.module.css';
import Button from '../ui/Button';
import { Tooltip } from '@nextui-org/react';

import Image from 'next/image';

const Card = ({ data }) => {
	const [checked, setChecked] = useState(false);
	const [cardTypes, setCardTypes] = useState({
		individual: [],
		family: [],
	});

	useEffect(() => {
		let individual = data?.filter(
				(e) =>
					e.genericTransactionTypeToAddInfo.infoCategory !==
					'PERCENTAGE_CLINIC_DISCOUNT_FAMILY'
			),
			family = data?.filter(
				(e) =>
					e.genericTransactionTypeToAddInfo.infoCategory ==
					'PERCENTAGE_CLINIC_DISCOUNT_FAMILY'
			);

		setCardTypes((e) => ({ family: family, individual: individual }));
	}, []);

	const AntSwitch = styled(Switch)(({ theme }) => ({
		width: 60,
		height: 32,
		padding: 0,
		display: 'flex',
		'&:active': {
			'& .MuiSwitch-thumb': {
				width: 26,
			},
			'& .MuiSwitch-switchBase.Mui-checked': {
				transform: 'translateX(9px)',
			},
		},
		'& .MuiSwitch-switchBase': {
			padding: 3,
			'&.Mui-checked': {
				transform: 'translateX(30px)',
				color: '#fff',
				'& + .MuiSwitch-track': {
					opacity: 1,
					backgroundColor:
						theme.palette.mode === 'dark' ? '#FF766C' : '#FF766C',
				},
			},
		},
		'& .MuiSwitch-thumb': {
			boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
			width: 25,
			height: 25,
			borderRadius: 12,
			transition: theme.transitions.create(['width'], {
				duration: 25,
			}),
		},
		'& .MuiSwitch-track': {
			borderRadius: 16,
			opacity: 1,
			backgroundColor:
				theme.palette.mode === '#FF766C' ? '#FF766C' : 'rgba(0,0,0,.25)',
			boxSizing: 'border-box',
		},
	}));

	console.log('data', cardTypes);

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
			name: 'ამბულატორიული  სერვისები',
			starter: '15%-მდე',
			pro: '15-20%',
			plus: '20%-დან',
		},
		{
			id: '3',
			name: 'ჰოსპიტალური მომსახურება',
			starter: '15%-მდე',
			pro: '15-20%',
			plus: '20%-დან',
		},
		{
			id: '4',
			name: 'სტომატოლოგიური მომსახურება',
			starter: '15%-მდე',
			pro: '15-20%',
			plus: '20%-დან',
		},
		{
			id: '5',
			name: 'ლაბორატორიული დიაგნოსტიკა და მაღალტექნოლოგიური კვლევები',
			starter: '15%-მდე',
			pro: '15-20%',
			plus: '20%-დან',
		},
		{
			id: '6',
			name: 'ესთეტიკა და სილამაზე',
			starter: '15%-მდე',
			pro: '15-20%',
			plus: '20%-დან',
		},
		{
			id: '7',
			name: 'რეაბილიტაცია და გამაჯანსაღებელი მომსახურება',
			starter: '15%-მდე',
			pro: '15-20%',
			plus: '20%-დან',
		},
		{
			id: '8',
			name: 'ოჯახის ექიმის სატელეფონო კონსულტაცია',
			starter: 'თვეში ერთხელ',
			pro: 'თვეში 2 ჯერ',
			plus: 'თვეში სამჯერ',
		},
	];
	return (
		<div className={style.cardTableContainer}>
			<div className={style.cardTableContainerHeader}>
				<span className={style.headerTitle}>ბარათის ფასი</span>
				<div className={style.switcher}>
					<div>
						<FormGroup>
							<Stack
								direction='row'
								spacing={1}
								alignItems='center'
							>
								<Typography className={style.switcherLabel}>
									ინდივიდუალური
								</Typography>

								<AntSwitch
									checked={checked}
									onChange={(e) => setChecked(e.target.checked)}
									defaultChecked
									inputProps={{ 'aria-label': 'ant design' }}
								/>
								<Typography className={style.switcherLabel}>საოჯახო</Typography>
							</Stack>
						</FormGroup>
					</div>

					<Tooltip
						css={{
							display: 'block',
							margin: 'auto',
							width: '260px',
							height: '50px',
							fontSize: '12px',
							backgroundColor: '#FFBBB6',
						}}
						rounded
						content={
							'	Family package includes mother, father and 2 minor children'
						}
					>
						<img
							src={'tooltip.svg'}
							alt='star'
							className={style.tooltip}
						/>
					</Tooltip>
					<span className={style.tootltipText}>
						Family package includes mother, father and 2 minor children
					</span>
				</div>
			</div>
			<div className={style.cardTableMobile}>
				<div className={style.Starter}>
					<div className={style.cardTitles}>
						<span className={style.cardTitleText}>
							{checked
								? cardTypes.family[0]?.cardName
								: cardTypes.individual[0]?.cardName}
						</span>
						<span className={style.tableValueSec}>
							<span>
								{checked ? (
									<span>
										{cardTypes.family[0]?.price}
										<img
											src='lari.svg'
											alt='lari'
											width='29px'
											height='23px'
										/>
									</span>
								) : (
									<span>
										{cardTypes.individual[0]?.price}
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
							key={item.id}
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
										? style.tableValueMobile
										: style.tableValueSecMobile
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
								? cardTypes.family[1]?.cardName
								: cardTypes.individual[1]?.cardName}
						</span>
						<span className={style.tableValueSec}>
							<span>
								{checked ? (
									<span>
										{cardTypes.family[1]?.price}
										<img
											src='lari.svg'
											alt='lari'
											width='29px'
											height='23px'
										/>
									</span>
								) : (
									<span>
										{cardTypes.individual[1]?.price}
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
							key={item.id}
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
						style={style.getStartedBtn}
					/>
				</div>
				<div className={style.plus}>
					<div className={style.cardTitles}>
						<span className={style.cardTitleText}>
							{checked
								? cardTypes.family[2]?.cardName
								: cardTypes.individual[2]?.cardName}
						</span>

						<span className={style.tableValueSec}>
							<span>
								{checked ? (
									<span>
										{cardTypes.family[2]?.price}
										<img
											src='lari.svg'
											alt='lari'
											width='29px'
											height='23px'
										/>
									</span>
								) : (
									<span>
										{cardTypes.individual[2]?.price}
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
							key={item.id}
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
										? style.tableValueFrom
										: style.tableValueSecFrom
								}
							>
								{item.plus}
							</span>
						</div>
					))}
					<Button
						name='ყიდვა'
						style={style.getStartedBtn}
					/>
				</div>
			</div>
			<div className={style.cardTable}>
				<div className={style.features}>
					<span className={style.titleTextStyle}>სერვისები</span>

					{featuresData.map((item, index) => (
						<span
							key={item.id}
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
							{checked
								? cardTypes.family[0]?.cardName
								: cardTypes.individual[0]?.cardName}
						</span>
						<span className={style.price}>
							<span>
								{checked ? (
									<span>
										{cardTypes.family[0]?.price}
										<img
											src='lari.svg'
											alt='lari'
											width='29px'
											height='23px'
										/>
									</span>
								) : (
									<span>
										{cardTypes.individual[0]?.price}
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
							key={item.id}
							className={
								index % 2 === 0 ? style.tableValue : style.tableValueSec
							}
						>
							{item.starter}
						</span>
					))}

					<div className={style.getStartedBtnContainer}>
						<Button
							name='ყიდვა'
							style={style.getStartedBtn}
						/>
					</div>
				</div>
				<div className={style.pro}>
					<div className={style.proCardTitles}>
						<span className={style.recommendedStyle}>რეკომენდებული</span>
						<span className={style.cardTitleTextPro}>
							{checked
								? cardTypes.family[1]?.cardName
								: cardTypes.individual[1]?.cardName}
						</span>
						<span className={style.price}>
							<span>
								<span>
									{checked ? (
										<span>
											{cardTypes.family[1]?.price}
											<img
												src='lari.svg'
												alt='lari'
												width='29px'
												height='23px'
											/>
										</span>
									) : (
										<span>
											{cardTypes.individual[1]?.price}
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
							key={item.id}
							className={
								index % 2 === 0 ? style.proTextStyle : style.proTextStyleSec
							}
						>
							{item.pro}
						</span>
					))}
					<div className={style.getStartedBtnContainerPro}>
						<Button
							name='ყიდვა'
							style={style.getStartedBtnPro}
						/>
					</div>
				</div>
				<div className={style.plus}>
					<div className={style.cardTitles}>
						<span className={style.cardTitleText}>
							{checked
								? cardTypes.family[2]?.cardName
								: cardTypes.individual[2]?.cardName}
						</span>

						<span className={style.price}>
							<span>
								<span>
									{checked ? (
										<span>
											{cardTypes.family[2]?.price}
											<img
												src='lari.svg'
												alt='lari'
												width='29px'
												height='23px'
											/>
										</span>
									) : (
										<span>
											{cardTypes.individual[2]?.price}
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
							key={item.id}
							className={
								index % 2 === 0 ? style.tableValue : style.tableValueSec
							}
						>
							{item.plus}
						</span>
					))}
					<div className={style.getStartedBtnContainer}>
						<Button
							name='ყიდვა'
							style={style.getStartedBtn}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Card;
