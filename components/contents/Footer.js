import classes from '../../styles/headerFooter.module.css';
import Text from '../ui/Text';

const Footer = () => {
	return (
		<>
			<div className={classes.footerContainer}>
				<div className={classes.leftSideContainer}>
					<div className={classes.headerIcon}>
						<img
							src='/footerIcon.png'
							alt='headerIcon'
						/>
						<Text style={classes.leftSideContainerText}>
							Lorem Ipsum is not
						</Text>
						<Text style={classes.leftSideContainerText}>
							simply random text. it has roots
						</Text>
					</div>
				</div>
				<div className={classes.rightSideContainer}>
					<div className={classes.firstRow}>
						<div className={classes.companyConatiner}>
							<Text style={classes.textTitle}>Company</Text>
							<Text style={classes.textStyle}>Privacy policy</Text>
							<Text style={classes.textStyle}>Terms of service</Text>
						</div>
						<div className={classes.companyConatiner}>
							<Text style={classes.textTitle}>Company</Text>
							<Text style={classes.textStyle}>Privacy policy</Text>
							<Text style={classes.textStyle}>Terms of service</Text>
						</div>
					</div>
					<div className={classes.secondRow}>
						<div className={classes.companyConatiner}>
							<Text style={classes.textTitle}>Contact</Text>
							<Text style={classes.textStyle}>Adsress</Text>
							<Text style={classes.textStyle}>+747837478483</Text>
						</div>
						<div className={classes.companyConatiner}>
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
						</div>
					</div>
				</div>
			</div>
			<div className={classes.allRightsText}>
				<Text style={classes.textStyle}>C 2022 All right reservered</Text>
			</div>
		</>
	);
};

export default Footer;
