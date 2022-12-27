import classes from '../../styles/headerFooter.module.css';
import Text from '../ui/Text';

const Footer = () => {
	return (
		<div className={classes.fullfooter}>
			<div className={classes.footerContainer}>
				<div className={classes.leftSideContainer}>
					<div className={classes.headerIcon}>
						{/* <img
							src='/footerIcon.png'
							alt='headerIcon'
							className={classes.iconsStyle}
						/> */}
						<Text style={classes.textTitle}>პირველი</Text>
						<Text style={classes.textStyle}>ჩვენ შესახებ</Text>
						<Text style={classes.textStyle}>ხშირად დასმული კითხვები</Text>
						<div className={classes.iconContainer}>
							<img
								src='/facebook.svg'
								alt='headerIcon'
								width='24'
								height='24px'
							/>
							<img
								src='/instagram.svg'
								alt='headerIcon'
								width='24'
								height='24px'
							/>
							<img
								src='/youtube.svg'
								alt='headerIcon'
								width='24'
								height='24px'
							/>
							<img
								src='/linkdin.svg'
								alt='headerIcon'
								width='24'
								height='24px'
							/>
							<img
								src='/tiktok.svg'
								alt='headerIcon'
								width='24'
								height='24px'
							/>
						</div>
						{/* <div className={classes.allRightsText}> */}
						<Text style={classes.allRightTextStyle}>
							2022 © ყველა უფლება დაცულია. Pirveli.com
						</Text>
						{/* </div> */}
					</div>
				</div>
				<div className={classes.firstRow}>
					<div className={classes.companyConatiner}>
						<Text style={classes.textTitle}>წესები და პირობები</Text>
						<Text style={classes.textStyle}>ზოგადი წესები და პირობები</Text>
						<Text style={classes.textStyle}>მაღაზია</Text>
						<Text style={classes.textStyle}>მედიცინა</Text>
						<Text style={classes.textStyle}>ვაუჩერები</Text>
						<Text style={classes.textStyle}>გათამაშება</Text>
						<Text style={classes.textStyle}>გართობა</Text>
					</div>
					{/* <div className={classes.companyConatiner}>
								<Text style={classes.textTitle}>Company</Text>
								<Text style={classes.textStyle}>Privacy policy</Text>
								<Text style={classes.textStyle}>Terms of service</Text>
							</div> */}
				</div>
				<div className={classes.secondRow}>
					{/* <div className={classes.companyConatiner}> */}

					<Text style={classes.textTitle}>კონტაქტი</Text>

					<Text style={classes.textStyle}>
						<img
							src='/P-Phone.svg'
							alt='headerIcon'
						/>
						+995 032 2 18 55 77
					</Text>
					<Text style={classes.textStyle}>
						{' '}
						<img
							src='/E-mail.svg'
							alt='headerIcon'
						/>
						info@pirveli.com
					</Text>
					<Text style={classes.textStyle}>
						{' '}
						<img
							src='/F-Location.svg'
							alt='headerIcon'
						/>
						თბილისი, ზოვრეთის ქ.#1
					</Text>
					{/* </div> */}

					{/* <div className={classes.companyConatiner}>
								<Text style={classes.textTitle}>Social networks</Text>
								<div className={classes.iconContainer}>
									<img
										src='/facebook.svg'
										alt='facebook'
										className={classes.iconsStyle}
									/>
									<img
										src='/Instagram.svg'
										alt='instagram'
										className={classes.iconsStyle}
									/>
								</div>
							</div> */}
				</div>

				<div>
					<div className={classes.footerLogo}>
						<img
							src='/footerIcon.png'
							alt='headerIcon'
						/>
					</div>
					<div className={classes.rightSideContainer}></div>
				</div>
			</div>
			<div className={classes.thirdRow}>
				<img
					src='/illustration.svg'
					alt='facebook'
					// className={classes.iconsStyle}
				/>
			</div>
			<Text style={classes.allRightStyle}>
				2022 © ყველა უფლება დაცულია. Pirveli.com
			</Text>
		</div>
	);
};

export default Footer;
