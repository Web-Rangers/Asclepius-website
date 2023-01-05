import { Dropdown } from 'antd';
import 'antd/dist/antd.css';
import styles from '../styles/components/navigation.module.css';
import { useState, useEffect, useRef } from 'react';
import { getData } from '../components/request';
import Link from 'next/link';
import { useWindowSize } from './useWindowSize';
import { ReactSVG } from 'react-svg';
import { useRouter } from 'next/router';

export default function Navigation() {
	const [categories, setCategories] = useState([]);
	const [allSubcats, setAllSubcats] = useState([]);
	let menuRef = useRef();
	const windowSize = useWindowSize();
	const router = useRouter();
	const [routerId, setRouterId] = useState(null);
	const [parentId, setParentId] = useState(null);

	useEffect(() => {
		getData(`${process.env.MEDICAL_API}/medical/categories`).then(
			(response) => {
				if (Array.isArray(response)) {
					let medical = response?.filter(
						(e) => e.title == 'სამედიცინო დაწესებულებები'
					)[0];
					let aftiaki = response?.filter(
						(e) => e.title == 'აფთიაქები'
					)[0];
					let withoutMedical = response?.filter(
						(e) => e.title !== 'სამედიცინო დაწესებულებები'
					).filter((e)=> e.title !== 'აფთიაქები');
					withoutMedical?.push(aftiaki, medical);
					setCategories(withoutMedical);
				}
			}
		);
	}, []);

	useEffect(()=> {
		if(router?.query?.id){
			setRouterId(router?.query?.id)
		}

		if(router?.query?.parentCategory) {
			setParentId(router?.query?.parentCategory)
		}
	},[router])

	useEffect(() => {
		function check(array) {
			let modifyCategories = [];
			for (let i = 0; i < categories?.length; i++) {
				if (
					!array.includes(categories[i].title) &&
					categories[i].parentCategoryId === null
				) {
					modifyCategories.push(categories[i]);
				}
			}

			setAllSubcats(modifyCategories);
		}
		if (windowSize.width > 1207) {
			check([
				'ყველა',
				'სტომატოლოგია',
				'სილამაზე და ესთეტიკა',
				'დიაგნოსტიკა',
				'ფარმაცია',
				'აფთიაქები',
				'სამედიცინო დაწესებულებები',
			]);
		} else if (windowSize.width < 1207 && windowSize.width > 900) {
			check([
				'ყველა',
				'სტომატოლოგია',
				'სილამაზე და ესთეტიკა',
				'ფარმაცია',
				'სამედიცინო დაწესებულებები',
			]);
		} else if (windowSize.width < 900) {
			check(['ყველა', 'სტომატოლოგია', 'ფარმაცია', 'სამედიცინო დაწესებულებები']);
		}
	}, [windowSize.width, categories]);

	return (
		<>
			<div
				className={styles.catalogContainerBg}
				ref={menuRef}
			>
				<div className={styles.catalogContainer}>
					{categories?.map((item, index) => {
						let test = item?.title;
						const subCategories = categories.filter(
							(e) => e.parentCategoryId == item.id
						);
						if (test !== 'ყველა') {
							var items = subCategories.map((e, key) => {
								return {
									key: key,
									label: (
										<Link
											target='_blank'
											rel='noopener noreferrer'
											href={e.parentCategoryId != null ? `/clinics?id=${e.id}&parentCategory=${e.parentCategoryId}` : `/clinics?id=${e.id}`}
										>
											{e.title}
										</Link>
									),
								};
							});
						} else {
							var items = allSubcats.map((e, key) => {
								return {
									key: key,
									label: (
										<Link
											target='_blank'
											rel='noopener noreferrer'
											href={e.parentCategoryId != null ? `/clinics?id=${e.id}&parentCategory=${e.parentCategoryId}` : `/clinics?id=${e.id}`}
										>
											{e.title}
										</Link>
									),
								};
							});
						}

						let appendCat;

						if (windowSize.width > 1207) {
							appendCat =
								(item.parentCategoryId === null && test == 'ყველა') ||
								test == 'სტომატოლოგია' ||
								test == 'სილამაზე და ესთეტიკა' ||
								test == 'დიაგნოსტიკა' ||
								test == 'ფარმაცია' ||
								test == 'აფთიაქები' || 
								test == 'სამედიცინო დაწესებულებები';
						} else if (windowSize.width < 1207 && windowSize.width > 900) {
							appendCat =
								(item.parentCategoryId === null && test == 'ყველა') ||
								test == 'სტომატოლოგია' ||
								test == 'სილამაზე და ესთეტიკა' ||
								test == 'ფარმაცია' ||
								test == 'სამედიცინო დაწესებულებები';
						} else if (windowSize.width < 900) {
							appendCat =
								(item.parentCategoryId === null && test == 'ყველა') ||
								test == 'სტომატოლოგია' ||
								test == 'ფარმაცია' ||
								test == 'სამედიცინო დაწესებულებები';
						}

						return (
							<>
								{item.parentCategoryId === null && appendCat && (
									<Dropdown
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
											{
												item.title == 'ყველა' ? 
												<Link
													target='_blank'
													rel='noopener noreferrer'
													href={`/clinics/`}
												>
													<a className={styles.allCatBtn}>
														<ReactSVG className={styles.menubtnIcon} src="/menu.svg" /> 
														{item.title}
													</a> 
												</Link> : 
												<Link
													target='_blank'
													rel='noopener noreferrer'
													href={`/clinics?id=${item.id}`}
												>
													{
														routerId == item.id || parentId == item.id ? 
														<span className={styles.activeMenuLink}>{item.title}</span> : item.title
													}
												</Link>
											}
										</span>
									</Dropdown>
								)}
							</>
						);
					})}
				</div>
			</div>
		</>
	);
}
