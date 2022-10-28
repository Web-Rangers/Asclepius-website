import style from '../../styles/components/card.module.css';
import Button from '../ui/Button';
const Card = () => {
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
			starter: 'once a month',
			pro: 'Twice a month',
			plus: 'Three times a month',
		},
	];
	return (
		<div className={style.cardTableContainer}>
			<div className={style.features}>
				<span className={style.titleTextStyle}>Features</span>

				{featuresData.map((item, index) => (
					<span
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
					<span className={style.tableValueSec}>Billed Individually</span>
				</div>
				{featuresData.map((item, index) => (
					<span
						className={index % 2 === 0 ? style.tableValue : style.tableValueSec}
					>
						{item.starter}
					</span>
				))}
				<Button
					name='Get Started'
					style={style.getStartedBtn}
				/>
			</div>
			<div className={style.pro}>
				<span className={style.recommendedStyle}>Recommended</span>
				<div className={style.proCardTitles}>
					<span className={style.cardTitleText}>Pro</span>
					<span className={style.tableValueSec}>
						{' '}
						<span>$10</span> Billed Individually
					</span>
				</div>
				{featuresData.map((item, index) => (
					<span
						className={
							index % 2 === 0 ? style.proTextStyle : style.proTextStyleSec
						}
					>
						{item.pro}
					</span>
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
						<span>$15</span>Billed Individually
					</span>
				</div>
				{featuresData.map((item, index) => (
					<span
						className={index % 2 === 0 ? style.tableValue : style.tableValueSec}
					>
						{item.plus}
					</span>
				))}
				<Button
					name='Get Started'
					style={style.getStartedBtn}
				/>
			</div>
		</div>
	);
};

export default Card;
