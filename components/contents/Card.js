import React, { useState } from 'react';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import style from '../../styles/components/card.module.css';
import Button from '../ui/Button';
import { Tooltip } from '@nextui-org/react';
import Image from 'next/image';
const Card = () => {
	const [cardType, setCardType] = useState(false);
	const featuresData = [
		{
			name: 'Medical assistance',
			starter: '24/7',
			pro: '24/7',
			plus: '24/7',
		},
		{
			name: 'Outpatient services',
			starter: '15%',
			pro: '15-20 %',
			plus: 'From 20%',
		},
		{
			name: 'Hospital services',
			starter: '15%',
			pro: '15-20 %',
			plus: 'From 20%',
		},
		{
			name: 'Dental services',
			starter: '15%',
			pro: '15-20 %',
			plus: 'From 20%',
		},
		{
			name: 'Laboratory and high-tech diagnostics',
			starter: '15%',
			pro: '15-20 %',
			plus: 'From 20%',
		},
		{
			name: 'Aesthetics and beauty',
			starter: '15%',
			pro: '15-20 %',
			plus: 'From 20%',
		},
		{
			name: 'Rehabilitation and wellness services',
			starter: '15%',
			pro: '15-20 %',
			plus: 'From 20%',
		},
		{
			name: 'Family doctor telephone consultation',
			starter: 'Once/ MTH',
			pro: 'Twice a month',
			plus: 'Three times a month',
		},
	];

	const AntSwitch = styled(Switch)(({ theme }) => ({
		width: 60,
		height: 32,
		padding: 0,
		display: 'flex',
		'&:active': {
			'& .MuiSwitch-thumb': {
				width: 15,
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
				duration: 200,
			}),
		},
		'& .MuiSwitch-track': {
			borderRadius: 16,
			opacity: 1,
			backgroundColor:
				theme.palette.mode === 'dark' ? '#FF766C' : 'rgba(0,0,0,.25)',
			boxSizing: 'border-box',
		},
	}));

	return (
		<div className={style.cardTableContainer}>
			<div className={style.cardTableContainerHeader}>
				<span className={style.headerTitle}>ბარათის ფასი</span>
				<div className={style.switcher}>
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
								checked={cardType}
								onChange={() => setCardType(!cardType)}
								defaultChecked
								inputProps={{ 'aria-label': 'ant design' }}
							/>
							<Typography className={style.switcherLabel}>საოჯახო</Typography>
						</Stack>
					</FormGroup>
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
						<span className={style.cardTitleText}>Starter</span>
						<span className={style.tableValueSec}> Billed Individually</span>
					</div>
					{featuresData.map((item, index) => (
						<div
							className={
								index % 2 === 0
									? style.tableValuesContainer
									: style.tableValuesContainerSec
							}
						>
							<span
								key={index}
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
						name='Get Started'
						style={style.getStartedBtn}
					/>
				</div>
				<div className={style.pro}>
					<div className={style.proCardTitles}>
						<span className={style.recommendedStyle}>Recommended</span>
						<span className={style.cardTitleText}>Pro</span>
						<span className={style.tableValueSec}>
							{' '}
							<span>{cardType ? '$15' : '$10'}</span> Billed Individually
						</span>
					</div>
					{featuresData.map((item, index) => (
						<div
							className={
								index % 2 === 0
									? style.proTextContainer
									: style.proTextContainerSec
							}
						>
							<span
								key={index}
								className={
									index % 2 === 0 ? style.proTextStyle : style.proTextStyleSec
								}
							>
								{item.name}
							</span>
							<span
								key={index}
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
						name='Get Started'
						style={style.getStartedBtn}
					/>
				</div>
				<div className={style.plus}>
					<div className={style.cardTitles}>
						<span className={style.cardTitleText}>Plus</span>

						<span className={style.tableValueSec}>
							{' '}
							<span>{cardType ? '$30' : '$15'}</span>Billed Individually
						</span>
					</div>
					{featuresData.map((item, index) => (
						<div
							className={
								index % 2 === 0
									? style.tableValuesContainer
									: style.tableValuesContainerSec
							}
						>
							<span
								key={index}
								className={
									index % 2 === 0
										? style.tableValueMobile
										: style.tableValueSecMobile
								}
							>
								{item.name}
							</span>
							<span
								key={index}
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
						name='Get Started'
						style={style.getStartedBtn}
					/>
				</div>
			</div>
			<div className={style.cardTable}>
				<div className={style.features}>
					<span className={style.titleTextStyle}>Features</span>

					{featuresData.map((item, index) => (
						<span
							key={index}
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
						<span className={style.cardTitleText}>Starter</span>
						<span className={style.price}>
							{' '}
							<span>{cardType ? '$5' : '$15'}</span>
							<span className={style.spanText}>Billed Individually</span>
						</span>
					</div>
					{featuresData.map((item, index) => (
						<span
							key={index}
							className={
								index % 2 === 0 ? style.tableValue : style.tableValueSec
							}
						>
							{item.starter}
						</span>
					))}

					<div className={style.getStartedBtnContainer}>
						<Button
							name='Get Started'
							style={style.getStartedBtn}
						/>
					</div>
				</div>
				<div className={style.pro}>
					<div className={style.proCardTitles}>
						<span className={style.recommendedStyle}>Recommended</span>
						<span className={style.cardTitleTextPro}>Pro</span>
						<span className={style.price}>
							{' '}
							<span>{cardType ? '$15' : '$10'}</span>
							<span className={style.spanText}>Billed Individually</span>
						</span>
					</div>
					{featuresData.map((item, index) => (
						<span
							key={index}
							className={
								index % 2 === 0 ? style.proTextStyle : style.proTextStyleSec
							}
						>
							{item.pro}
						</span>
					))}
					<div className={style.getStartedBtnContainerPro}>
						<Button
							name='Get Started'
							style={style.getStartedBtnPro}
						/>
					</div>
				</div>
				<div className={style.plus}>
					<div className={style.cardTitles}>
						<span className={style.cardTitleText}>Plus</span>

						<span className={style.price}>
							{' '}
							<span>{cardType ? '$30' : '$15'}</span>
							<span className={style.spanText}>Billed Individually</span>
						</span>
					</div>
					{featuresData.map((item, index) => (
						<span
							key={index}
							className={
								index % 2 === 0 ? style.tableValue : style.tableValueSec
							}
						>
							{item.plus}
						</span>
					))}
					<div className={style.getStartedBtnContainer}>
						<Button
							name='Get Started'
							style={style.getStartedBtn}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Card;
