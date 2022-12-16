import React, { useState, useEffect } from 'react';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import style from '../../styles/components/card.module.css';
import Button from '../ui/Button';
import { Tooltip } from '@nextui-org/react';
import Link from 'next/link';

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
			name: 'სასწრაფო გადაუდებელი დახმარება',
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
		},{
			id: '8',
			name: 'ფარმაცია და პარაფარმაცია',
			starter: '30%-მდე',
			pro: '',
			plus: '',
		},{
			id: '8',
			name: 'სტომატოლოგია',
			starter: '15%-მდე',
			pro: '',
			plus: '',
		},{
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
							height: '60px',
							fontSize: '12px',
							backgroundColor: '#fff',
						}}
						rounded
						content={
							'Family package includes mother, father and 2 minor children'
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
				<div className={style.containerCard}>
					<img src="/MEDCARD-VECTOR.svg" /> 
				</div>
				<div className={style.containerList}>
					{featuresData?.map((e, key)=>{
						return <div key={key} className={style.listItem}><span>{e.name}</span><span>{e.starter}</span></div>
					})}
				</div>
				<div className={style.price}>
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
					<Link href="/buyCardPage"><button>Buy now</button></Link>
				</div>
			</div>
		</div>
	);
};

export default Card;
