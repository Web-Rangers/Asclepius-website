import classes from '../../styles/headerFooter.module.css';
import Text from '../ui/Text';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const Footer = () => {
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
						<div className={classes.allRightsText}>
							<Text style={classes.allRightTextStyle}>
								C 2022 All right reservered
							</Text>
						</div>
					</div>
				</div>
				<div>
					<div className={classes.footerLogo}>
						<img
							src='/footerIcon.png'
							alt='headerIcon'
						/>
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
						<FormGroup>
							<Stack
								direction='row'
								spacing={1}
								alignItems='center'
							>
								<Typography>ინდივიდუალური</Typography>

								<AntSwitch
									// checked={cardType}
									// onChange={handleChange}
									defaultChecked
									inputProps={{ 'aria-label': 'ant design' }}
								/>
								<Typography>საოჯახო</Typography>
							</Stack>
						</FormGroup>
					</div>
				</div>
			</div>
			<Text style={classes.allRightStyle}>C 2022 All right reservered</Text>
		</>
	);
};

export default Footer;
