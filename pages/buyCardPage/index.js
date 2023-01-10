import { useState, useEffect } from 'react';
import Text from '../../components/ui/Text';
import s from '../../styles/buyCard.module.css';
import CardPrice from '../../components/contents/CardPrice';
import Button from '../../components/ui/Button';
import Modal from 'react-modal';
import CardCheckoutModal from '../../components/modals/CardCheckoutModal';
import classNames from 'classnames';
import { ReactSVG } from 'react-svg';
import { getData, getMultipleData } from '../../components/request';
import style from '../../styles/components/card.module.css';
import Checkout from '../../components/modals/checkout';
import TableDropDown from '../../components/TableDropDown';
import { ConnectingAirportsOutlined } from '@mui/icons-material';
import Image from 'next/image';
import { Skeleton } from 'antd';
import { Switch, Tooltip, Breadcrumb } from 'antd';
import styles from '../../styles/clinicDetailPage.module.css';
import Link from 'next/link';

function BuyCardPage({ clinics }) {
	const [data, setData] = useState({
		cards: [],
		categories: [],
	});
	const [modalIsOpen, setIsOpen] = useState(false);
	const [customStyles, setCustomStyles] = useState({});
	const [dropDown, setDropDown] = useState('');
	const [productState, setProductState] = useState([]);
	const [checkout, setCheckout] = useState(false);
	const [products, setProducts] = useState([]);
	const [selectPack, setSelectPack] = useState('');
	const [month, setMonth] = useState('');
	const [cardType, setCardType] = useState('');
	const [price, setPrice] = useState('');
	const [checked, setChecked] = useState(false);
	const [paymentType, setPaymentType] = useState('');
	const [filteredCard, setFilteredCard] = useState([]);
	const [chooseCard, setChooseCard] = useState();
	const [showMore, setShowMore] = useState(false);
	const [cardTypes, setCardTypes] = useState({
		individual: [],
		family: [],
	});
	const [user, setUser] = useState({});
	const [users, setUsers] = useState([]);

	const familycards = [
		{
			id: 0,
			name: 'PERCENTAGE_CLINIC_DISCOUNT_FAMILY',
			price: 45,
			length: '1 თვე',
			lenghtNum: 1,
		},
		{
			id: 1,
			name: 'PERCENTAGE_CLINIC_DISCOUNT_FAMILY',
			price: 120,
			length: '3 თვე',
			lenghtNum: 3,
		},
		{
			id: 2,
			name: 'PERCENTAGE_CLINIC_DISCOUNT_FAMILY',
			price: 225,
			length: '6 თვე',
			lenghtNum: 6,
		},
	];

	const individualcards = [
		{
			id: 0,
			name: 'PERCENTAGE_CLINIC_DISCOUNT_INDIVIDUAL',
			price: 15,
			length: '1 თვე',
			lenghtNum: 1,
		},
		{
			id: 1,
			name: 'PERCENTAGE_CLINIC_DISCOUNT_INDIVIDUAL',
			price: 40,
			length: '3 თვე',
			lenghtNum: 3,
		},
		{
			id: 2,
			name: 'PERCENTAGE_CLINIC_DISCOUNT_INDIVIDUAL',
			price: 75,
			length: '6 თვე',
			lenghtNum: 6,
		},
	];

	const featuresData = [
		{
			id: '1',
			name: 'ცხელი ხაზის მომსახურება 24/7',
			starter: '15%-მდე',
			pro: '15%-მდე',
			plus: '15%-მდე',
		},
		{
			id: '2',
			name: 'ამბულატორიული  სერვისები',
			starter: '15%-მდე',
			pro: '15-20%',
			plus: '20%-დან',
		},
		{
			id: '3',
			name: 'ჰოსპიტალური მომსახურება',
			starter: '15%-მდე',
			pro: '15-20%',
			plus: '20%-დან',
		},
		{
			id: '4',
			name: 'სტომატოლოგიური მომსახურება',
			starter: '15%-მდე',
			pro: '15-20%',
			plus: '20%-დან',
		},
		{
			id: '5',
			name: 'ლაბორატორიული დიაგნოსტიკა და მაღალტექნოლოგიური კვლევები',
			starter: '15%-მდე',
			pro: '15-20%',
			plus: '20%-დან',
		},
		{
			id: '6',
			name: 'ესთეტიკა და სილამაზე',
			starter: '15%-მდე',
			pro: '15-20%',
			plus: '20%-დან',
		},
		{
			id: '7',
			name: 'რეაბილიტაცია და გამაჯანსაღებელი მომსახურება',
			starter: '15%-მდე',
			pro: '15-20%',
			plus: '20%-დან',
		},
		{
			id: '8',
			name: 'ოჯახის ექიმის სატელეფონო კონსულტაცია',
			starter: 'თვეში ერთხელ',
			pro: 'თვეში 2 ჯერ',
			plus: 'თვეში სამჯერ',
		},
	];

	const openModal = () => {
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
	};

	useEffect(() => {
		if (window.innerWidth < 600) {
			setCustomStyles({
				content: {
					width: '100%',
					height: '100%',
					top: '50%',
					left: '0%',
					right: '10px',
					bottom: 'auto',
					transform: 'translateY(-50%)',
					background: '#ffffff',
				},
				overlay: {
					background: 'transparent',
				},
			});
		} else {
			setCustomStyles({
				content: {
					width: '30%',
					height: '100%',
					top: '50%',
					left: '88%',
					right: '10px',
					bottom: 'auto',
					transform: 'translate(-50%, -50%)',
					background: '#ffffff',
				},
				overlay: {
					background: 'transparent',
				},
			});
		}

		getData(`${process.env.MEDICAL_API}/medical/registry/user-id`).then(
			(response) => {
				setUser(response);
			}
		);

		getData(`${process.env.MEDICAL_API}/medical/products/get-products`).then(
			(res) => {
				setProducts(res);
				setProductState(res);
			}
		);
	}, []);

	useEffect(() => {
		setFilteredCard(
			data?.products?.filter((e) => e.endDateIncrementValue == month)
		);
		setProductState(
			filteredCard?.filter(
				(e) => e.genericTransactionTypeToAddInfo?.infoCategory == selectPack
			)
		);
		setChooseCard(
			productState?.filter((item) => item.genericTransactionTypeId == cardType)
		);
	}, [month, cardType, selectPack]);

	useEffect(() => {
		let individual = products?.filter(
				(e) =>
					e.genericTransactionTypeToAddInfo?.infoCategory !==
					'PERCENTAGE_CLINIC_DISCOUNT_FAMILY'
			),
			family = products?.filter(
				(e) =>
					e.genericTransactionTypeToAddInfo?.infoCategory ==
					'PERCENTAGE_CLINIC_DISCOUNT_FAMILY'
			);

		setCardTypes((e) => ({ family: family, individual: individual }));
	}, []);

	const text = <span>საოჯახო პაკეტი მოიცავს, დედას, მამას და 2 ბავშვს</span>;

	function openCheckout(type, pack, month, price) {
		setCardType(type); // card
		setSelectPack(pack); //family or individual
		setMonth(month); // month
		setPrice(price);

		setCheckout(true);
	}

	let datas = ['cards', 'categories'];

	let urls = [
		`${process.env.MEDICAL_API}/medical/products/get-products`,
		`${process.env.MEDICAL_API}/medical/categories`,
	];

	useEffect(() => {
		getData(`${process.env.MEDICAL_API}/medical/products/get-products`).then(
			(response) => {
				const family = response?.filter(
					(e) =>
						e.genericTransactionTypeToAddInfo.infoCategory !==
						'PERCENTAGE_CLINIC_DISCOUNT_INDIVIDUAL'
				);
				const individual = response?.filter(
					(e) =>
						e.genericTransactionTypeToAddInfo.infoCategory ==
						'PERCENTAGE_CLINIC_DISCOUNT_INDIVIDUAL'
				);
				setData((e) => ({
					...e,
					cards: {
						individual: individual,
						family: family,
					},
				}));
				console.log(response);
			}
		);
		getData(`${process.env.MEDICAL_API}/medical/categories`).then(
			(response) => {
				setData((e) => ({ ...e, categories: response }));
			}
		);
	}, []);

	return (
		<>
			{checkout && (
				<Checkout
					cards={data?.cards}
					cardType={cardType}
					users={users}
					onClose={() => setCheckout(false)}
					setUsers={(e) => setUsers(e)}
					currentUser={user}
					selectPack={selectPack}
					price={price}
				/>
			)}
			<div className={s.container}>
				<Breadcrumb separator={<img src='/separator.svg' />}>
					<Breadcrumb.Item>
						<Link href='/'>მთავარი გვერდი</Link>
					</Breadcrumb.Item>
					<Breadcrumb.Item className={styles.activeBreadCrumb}>
						ბარათის შეძენა
					</Breadcrumb.Item>
				</Breadcrumb>
				<div className={s.firstPart}>
					<div className={s.headerContainer}>
						{/* <div className={s.headerContainerLeft}>
							<Text style={s.headerContainerTitle}>How to buy a card ?</Text>
							<div className={s.buyCardStep}>
								<div>
									<Text style={s.headerContainerNumber}>01</Text>
									<Text style={s.headerContainerText}>
										Choose the desired card
									</Text>
								</div>
								<div>
									<Text style={s.headerContainerNumber}>02</Text>
									<Text style={s.headerContainerText}>
										Add your personal data
									</Text>
								</div>
								<div>
									<Text style={s.headerContainerNumber}>03</Text>
									<Text style={s.headerContainerText}>
										Add your personal card and pay
									</Text>
								</div>
							</div>
						</div> */}
					</div>
				</div>
				<Modal
					isOpen={modalIsOpen}
					onRequestClose={closeModal}
					style={customStyles}
					contentLabel='Example Modal'
				>
					<CardCheckoutModal closeModal={closeModal} />
				</Modal>
				<div className={s.chooseCardContainer}>
					<div className={s.headerContainerTitle}>
						<Text>Choose exactly what you need</Text>
					</div>
					<div className={s.switcher}>
						<span className={style.switcherLabel}> პერსონალური</span>
						<Switch
							className={
								checked ? style.switcherChecked : style.switcherUnChecked
							}
							onChange={(checked) => setChecked(checked)}
						/>
						<span className={style.switcherLabel}>
							საოჯახო
							<Tooltip
								placement='top'
								title={text}
								className={style.tooltipTextStyle}
							>
								<a className={style.tooltipContainer}>
									<img
										src={'/tooltip.svg'}
										alt='star'
										className={style.tooltip}
									/>

									<img
										src={'/tooltipActive.svg'}
										alt='star'
										className={style.tooltipActive}
									/>
								</a>
							</Tooltip>
						</span>
					</div>
					{data?.cards ? (
						<div
							className={classNames(s.cardsContainer, {
								[s.cardsTransition]: checked,
								[s.cardsTransitionUnch]: !checked,
							})}
						>
							{!checked ? (
								<>
									{data?.cards?.individual?.map(
										({
											price,
											name,
											length,
											lenghtNum,
											genericTransactionTypeToAddInfo,
										}) => {
											return (
												<>
													<div
														className={s.cardsBlock}
														onClick={() =>
															openCheckout(
																genericTransactionTypeToAddInfo?.genericTransactionTypeId,
																genericTransactionTypeToAddInfo?.infoCategory,
																lenghtNum,
																price
															)
														}
													>
														<div className={s.cardOverview}>
															<div className={s.cardImage}>
																<img
																	src='/01-4.png'
																	alt=''
																/>
															</div>
															<div className={s.cardPrice}>{price} ლ</div>
															<div className={s.cardDisplayName}>{length}</div>
														</div>
														<div className={s.buyNow}>შეიძინე</div>
													</div>
												</>
											);
										}
									)}
								</>
							) : (
								<>
									{data?.cards?.family?.map(
										({
											price,
											name,
											length,
											lenghtNum,
											genericTransactionTypeToAddInfo,
										}) => {
											return (
												<>
													<div
														className={s.cardsBlock}
														onClick={() =>
															openCheckout(
																genericTransactionTypeToAddInfo?.genericTransactionTypeId,
																genericTransactionTypeToAddInfo?.infoCategory,
																lenghtNum,
																price
															)
														}
													>
														<div className={s.cardOverview}>
															<div className={s.cardImage}>
																<img
																	src='/01-4.png'
																	alt=''
																/>
															</div>
															<div className={s.cardPrice}>{price} ლ</div>
															<div className={s.cardDisplayName}>{length}</div>
														</div>
														<div className={s.buyNow}>შეიძინე</div>
													</div>
												</>
											);
										}
									)}
								</>
							)}
						</div>
					) : (
						<div className={s.cardsContainer}>
							{[1, 3, 4].map((e) => {
								return (
									<>
										<div className={s.cardsBlock}>
											<div className={s.skeletonLoadingCards}>
												<Skeleton.Input active={'active'} />
											</div>
										</div>
									</>
								);
							})}
						</div>
					)}
					<div className={s.listofCats}>
						{data?.categories?.length > 0 &&
							data?.categories
								?.filter(
									(e) => e.parentCategoryId === null && e.title !== 'ყველა'
								)
								.map((item, i) => {
									return (
										<div
											className={s.tableContentContainer}
											key={item.id}
										>
											<div
												onClick={() => {
													if (dropDown === item.title) {
														setDropDown('');
													} else {
														setDropDown(item.title);
														setShowMore(false);
													}
												}}
												className={s.categorieTitle}
											>
												<div className={s.nameIconCont}>
													<span className={s.nameIconTitle}>{item.title}</span>
													<Image
														src='/droparrow.svg'
														width='14px'
														height='8px'
													/>
												</div>
												<div className={s.tableFackData}>
													<span>{featuresData[2].plus}</span>
												</div>
											</div>

											{dropDown === item.title && (
												<div className={s.dropDownList}>
													{data?.categories?.map((sub) => {
														if (sub.id == item.id) {
															let catsw = clinics
																.map((e) => {
																	if (
																		e.clinicCategories.some(
																			(x) => x.id == sub.id
																		)
																	) {
																		return e;
																	}
																})
																.filter((e) => e !== undefined);
															return (
																<>
																	{!showMore &&
																		catsw.length > 3 &&
																		catsw
																			.slice(0, 3)
																			.map((e, i) => (
																				<span key={i}>{e.displayName}</span>
																			))}
																	{showMore &&
																		catsw.map((e, i) => (
																			<span key={i}>{e.displayName}</span>
																		))}
																	<span onClick={() => setShowMore(!showMore)}>
																		{showMore ? 'იხილე ნაკლები' : 'იხილეთ მეტი'}
																	</span>
																</>
															);
														}
													})}
												</div>
											)}
										</div>
									);
								})}
					</div>
				</div>
			</div>
		</>
	);
}

export default BuyCardPage;

export async function getStaticProps() {
	const clinics = await getData(
		`${process.env.NEXT_PUBLIC_BASE_URL}/asclepius/v1/api/clinics/search?name=`
	);

	return {
		props: {
			clinics: clinics,
		},
	};
}
