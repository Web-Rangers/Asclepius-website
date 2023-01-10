import { useState } from 'react';
import Text from '../../components/ui/Text';
import Image from 'next/image';
import s from '../../styles/aboutUsPage.module.css';
import styles from '../../styles/clinicDetailPage.module.css';
import { Breadcrumb } from 'antd';
import Link from 'next/link';

function AboutUsPage() {
	return (
		<div className={s.aboutUsContainer}>
			<Breadcrumb separator={<img src='/separator.svg' />}>
				<Breadcrumb.Item>
					<Link href='/'>მთავარი გვერდი</Link>
				</Breadcrumb.Item>
				<Breadcrumb.Item className={styles.activeBreadCrumb}>
					ჩვენს შესახებ
				</Breadcrumb.Item>
			</Breadcrumb>

			<Text style={s.aboutUsTitle}>About Us</Text>
			<div className={s.aboutImg}>
				<img
					alt='aboutUS image'
					src='/aboutUsImg.png'
					style={{ borderRadius: '3px' }}
				/>
			</div>
			<Text style={s.aboutUsTitle}>Our story</Text>
			<Text style={s.aboutUsText}> Welcome to the Mississauga Foot Clinic</Text>
			<Text style={s.aboutUsText}>
				The Mississauga Foot Clinic was founded in 1990 and was one of the very
				first foot clinics with certified chiropodists in Ontario. Since then,
				Mississauga Foot Clinic has continued to incorporate new technologies
				and improved standards of practice in order to provide our patients with
				the care they deserve. The Mississauga Foot Clinic was founded in 1990
				and was one of the very first foot clinics with certified chiropodists
				in Ontario. The Mississauga Foot Clinic was founded in 1990 and was one
				of the very first foot clinics with certified chiropodists in Ontario.
				Mississauga Foot Clinic has continued to incorporate new technologies
				and improved standards of practice in order to provide our patients with
				the care they deserve. The Mississauga Foot Clinic was founded in 1990
				and was one of the very first foot clinics with certified chiropodists
				in Ontario.{' '}
			</Text>
		</div>
	);
}

export default AboutUsPage;
