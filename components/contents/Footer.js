import { useState } from 'react';
import classes from '../../styles/headerFooter.module.css';
import Text from '../ui/Text';
import Link from 'next/link';
import BecomePartnerModal from '../modals/BecomePartnerModal';
import Image from 'next/image';

const Footer = () => {
	const [open, setOpen] = useState(false);
	const [becomePartner, setBecomePartner] = useState(false);

	return (
		<>
			{
				<BecomePartnerModal
					open={open}
					becomePartner={becomePartner}
					hideModal={() => setOpen(false)}
				/>
			}
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
							<Link href={'/aboutUs'}>
								<Text style={classes.textStyle}>ჩვენ შესახებ</Text>
							</Link>
							{/* <Link href={''}>
								<Text style={classes.textStyle}>ხშირად დასმული კითხვები</Text>
							</Link> */}
							<Link href={''}>
								<span
									onClick={() => [setOpen(true), setBecomePartner(true)]}
									className={classes.textStyle}
								>
									გახდი ჩვენი პარტნიორი
								</span>
							</Link>
							<Link href={''}>
								<Text style={classes.textStyle}>მიმდინარე ვაკანსიები</Text>
							</Link>
							<Link href={''}>
								<span
									// onClick={() => [setOpen(true), setBecomePartner(false)]}
									className={classes.textStyle}
								>
									ბლოგი
								</span>
							</Link>

							<div className={classes.iconContainer}>
								<a
									target={'_blank'}
									rel='noreferrer'
									href={
										'https://www.facebook.com/profile.php?id=100088325187616'
									}
								>
									<img
										src='/facebook.svg'
										alt='headerIcon'
										width='24'
										height='24px'
									/>
								</a>

								<a
									target={'_blank'}
									rel='noreferrer'
									href={'https://www.instagram.com/pirveli_pirveli/'}
								>
									<img
										src='/Instagram.svg'
										alt='headerIcon'
										width='24'
										height='24px'
									/>
								</a>
								<img
									src='/youtube.svg'
									alt='headerIcon'
									width='24'
									height='24px'
								/>
								<a
									target={'_blank'}
									rel='noreferrer'
									href={'https://www.linkedin.com/company/88047011'}
								>
									<img
										src='/linkdin.svg'
										alt='headerIcon'
										width='24'
										height='24px'
									/>
								</a>
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
							<Link href={'/'}>
								<Text style={classes.textTitle}>ჩვენი სერვისები</Text>
							</Link>
							<Link href={'/'}>
								<Text style={classes.textStyle}>მედიქალი</Text>
							</Link>
							<Link href='https://shop.pirveli.com/'>
								<Text style={classes.textStyle}>მაღაზია</Text>
							</Link>

							<Link href='https://vouchers.pirveli.com'>
								<Text style={classes.textStyle}>ვაუჩერები</Text>
							</Link>
							<Link href='https://images2.imgbox.com/83/ef/za3P3ZPj_o.png'>
								<Text style={classes.textStyle}>თამაშები</Text>
							</Link>
							<Link href='https://s3.pirveli.com/v1/api/getFile?id=6555'>
								<Text style={classes.textStyle}>გათამაშებები</Text>
							</Link>
						</div>
					</div>
					<div className={classes.firstRow}>
						<div className={classes.companyConatiner}>
							<Link href={'/'}>
								<Text style={classes.textTitle}>წესები და პირობები</Text>
							</Link>
							<Link href={'/'}>
								<Text style={classes.textStyle}>Med.pirveli-ის წესები </Text>
							</Link>
							<Link href='https://s3.pirveli.com/v1/api/getFile?id=6574'>
								<Text style={classes.textStyle}>ზოგადი წესები</Text>
							</Link>
							<Link href='/'>
								<Text style={classes.textStyle}>ხშირად დასმული კითხვები </Text>
							</Link>
							<Link href=''>
								<Text style={classes.textStyle}>
									კონფიდენციალურობის პოლიტიკა
								</Text>
							</Link>
							<Link href=''>
								<Text style={classes.textStyle}>შეუკვეთე ჯანდაცვის ბარათი</Text>
							</Link>
						</div>
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
						<a
							target={'_blank'}
							rel='noreferrer'
							href={'https://goo.gl/maps/FJr1txtq9jTJhKQQA'}
						>
							<Text style={classes.textStyle}>
								<img
									src='/F-Location.svg'
									alt='headerIcon'
								/>
								<Text style={classes.textStyle}>თბილისი, ზოვრეთის ქ.#1</Text>
							</Text>
						</a>
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
					<div className={classes.thirdRow}>
						<Image
							src='/illustration.webp'
							alt='facebook'
							width='591px'
							height='380px'
							className={classes.iconsStyle}
						/>
					</div>

					<div>
						{/* <div className={classes.footerLogo}>
						<img
							src='/footerIcon.png'
							alt='headerIcon'
						/>
					</div> */}
						{/* <div className={classes.rightSideContainer}></div> */}
					</div>
				</div>

				<Text style={classes.allRightStyle}>
					2022 © ყველა უფლება დაცულია. Pirveli.com
				</Text>
			</div>
		</>
	);
};

export default Footer;
