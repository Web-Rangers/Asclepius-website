import { Dropdown } from 'antd';
import 'antd/dist/antd.css';
import styles from '../styles/components/navigation.module.css';
import { useState, useEffect, useRef } from 'react';
import { getData } from '../components/request';
import Link from 'next/link';
import {useWindowSize} from './useWindowSize';

export default function Navigation() {
	const [categories, setCategories] = useState([]);
	const [allSubcats, setAllSubcats] = useState([]); 
	let menuRef = useRef();
	const windowSize = useWindowSize();

	useEffect(() => {
		getData(`${process.env.MEDICAL_API}/medical/categories`).then((response) =>
		{
			let medical = response?.filter(e=> e.title == 'სამედიცინო დაწესებულებები')[0];
			let withoutMedical = response?.filter(e=> e.title !== 'სამედიცინო დაწესებულებები');
			withoutMedical?.push(medical)
			setCategories(withoutMedical)
			if(windowSize.width > 1207){
				//allsubcats
				let subcat = response?.filter((item)=> {if(item.parentCategoryId === null && 
					item.title !== 'ყველა' &&
					item.title !== 'სტომატოლოგია' &&
					item.title !== 'ესთეტიკა და სილამაზე' &&
					item.title !== 'ლაბორატორია და დიაგნოსტიკა' &&
					item.title !== 'ფარმაცია' &&
					item.title !== 'სამედიცინო დაწესებულებები'){return item}})
				setAllSubcats(subcat)
			}else if(windowSize.width < 1207 && windowSize.width > 900){
				let subcat = response?.filter((item)=> {if(item.parentCategoryId === null && 
					item.title !== 'ყველა' &&
					item.title !== 'სტომატოლოგია' &&
					item.title !== 'ესთეტიკა და სილამაზე' &&
					item.title !== 'ფარმაცია' &&
					item.title !== 'სამედიცინო დაწესებულებები'){return item}})
				setAllSubcats(subcat)
			}else if(windowSize.width < 900){
				let subcat = response?.filter((item)=> {if(item.parentCategoryId === null && 
					item.title !== 'ყველა' &&
					item.title !== 'სტომატოლოგია' &&
					item.title !== 'ფარმაცია' &&
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

						let appendCat;

						if(windowSize.width > 1207){
							appendCat = (
								item.parentCategoryId === null && 
								test == 'ყველა' ||
								test == 'სტომატოლოგია' || 
								test == 'ესთეტიკა და სილამაზე' ||
								test == 'ლაბორატორია და დიაგნოსტიკა' ||
								test == 'ფარმაცია' ||
								test == 'სამედიცინო დაწესებულებები'
							)
						}else if(windowSize.width < 1207 && windowSize.width > 900){
							appendCat = (
								item.parentCategoryId === null && 
								test == 'ყველა' ||
								test == 'სტომატოლოგია' || 
								test == 'ესთეტიკა და სილამაზე' ||
								test == 'ფარმაცია' ||
								test == 'სამედიცინო დაწესებულებები'
							)
						}else if(windowSize.width < 900){
							appendCat = (
								item.parentCategoryId === null && 
								test == 'ყველა' ||
								test == 'სტომატოლოგია' || 
								test == 'ფარმაცია' ||
								test == 'სამედიცინო დაწესებულებები'
							)
						}
										
						return (
							<>
								{(
									item.parentCategoryId === null && 
									appendCat
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
