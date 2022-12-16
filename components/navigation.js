import { Dropdown } from 'antd';
import 'antd/dist/antd.css';
import styles from '../styles/components/navigation.module.css';
import { useState, useEffect, useRef } from 'react';
import { getData } from '../components/request';
import Link from 'next/link';

export default function Navigation() {
	const [categories, setCategories] = useState([]);
	const [allSubcats, setAllSubcats] = useState([]); 
	let menuRef = useRef();

	useEffect(() => {
		getData(`${process.env.MEDICAL_API}/medical/categories`).then((response) =>
		{
			if(response.status !== 500 ){
				let medical = response?.filter(e=> e.title == 'სამედიცინო დაწესებულებები')[0];
				let withoutMedical = response?.filter(e=> e.title !== 'სამედიცინო დაწესებულებები');
				withoutMedical?.push(medical)
				setCategories(withoutMedical)
	
				//allsubcats
				let subcat = response?.filter((item)=> {if(item.parentCategoryId === null && 
				item.title !== 'ყველა' &&
				item.title !== 'სტომატოლოგია' &&
				item.title !== 'ესთეტიკა და სილამაზე' &&
				item.title !== 'ლაბორატორია და დიაგნოსტიკა' &&
				item.title !== 'სამედიცინო დაწესებულებები'){return item}})
				setAllSubcats(subcat)
			}
		}
		);
	}, []);


	return (
		<>
			<div className={styles.catalogContainerBg} ref={menuRef}>
				<div className={styles.catalogContainer}>
					{categories?.map((item, index) => {
						let test = item?.title;
						const subCategories = categories.filter(
							(e) => e.parentCategoryId == item.id
						);
						if(test !== 'ყველა'){
							var items = subCategories.map((e, key) => {
								return {
									key: key,
									label: (
										<Link
											target='_blank'
											rel='noopener noreferrer'
											href={`/clinicPage?id=${e.id}`}
										>
											{e.title}
										</Link>
									),
								};
							});
						}else {
							var items = allSubcats.map((e, key) => {
								return {
									key: key,
									label: (
										<Link
											target='_blank'
											rel='noopener noreferrer'
											href={`/clinicPage?id=${e.id}`}
										>
											{e.title}
										</Link>
									),
								};
							});
						}
										
						return (
							<>
								{(
									item.parentCategoryId === null && 
									test == 'ყველა' ||
									test == 'სტომატოლოგია' || 
									test == 'ესთეტიკა და სილამაზე' ||
									test == 'ლაბორატორია და დიაგნოსტიკა' ||
									test == 'სამედიცინო დაწესებულებები'
								) &&
									(<Dropdown
										menu={{
											items,
										}}
										placement='bottom'
										overlayClassName={styles.dropdown}
										getPopupContainer={() => menuRef.current}
									>
										<span
											key={index}
											className={styles.catalogTextStyle}
										>
											<Link
												target='_blank'
												rel='noopener noreferrer'
												href={`/clinicPage?id=${item.id}`}
											>
												{item.title}
											</Link>
										</span>
									</Dropdown>)
								}
							</>
						);
					})}
				</div>
			</div>
		</>
	);
}
