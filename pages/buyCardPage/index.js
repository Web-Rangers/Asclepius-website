import { useState, useEffect } from 'react';
import Text from '../../components/ui/Text';
import s from '../../styles/buyCard.module.css';
import CardPrice from '../../components/contents/CardPrice';
import Button from '../../components/ui/Button';
import Modal from 'react-modal';
import CardCheckoutModal from '../../components/modals/CardCheckoutModal';
import classNames from 'classnames';
import { ReactSVG } from 'react-svg';
import { getData, postData } from '../../components/request';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import style from '../../styles/components/card.module.css';
import Select from '../../components/Select';
import Checkout from '../../components/modals/checkout';
import TableDropDown from '../../components/TableDropDown';
import { ConnectingAirportsOutlined } from '@mui/icons-material';
import Image from 'next/image';

function BuyCardPage({ cards, clinics, categories, products }) {
	const [modalIsOpen, setIsOpen] = useState(false);
	const [customStyles, setCustomStyles] = useState({});
	const [dropDown, setDropDown] = useState('');
	const [productState, setProductState] = useState(products);
	const [checkout, setCheckout] = useState(false);

	const featuresData = [
		{
			id: '1',
			name: 'ცხელი ხაზის მომსახურება 24/7',
			starter: '100% ულიმიტო',
			pro: '100% ულიმიტო',
			plus: '100% ულიმიტო',
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

	const [user, setUser] = useState({});

	const openModal = () => {
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
	};

	const [users, setUsers] = useState([]);

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

		getData('https://medical.pirveli.ge/medical/registry/user-id').then(
			(response) => {
				setUser(response);
			}
		);
	}, []);

	const [selectPack, setSelectPack] = useState('');
	const [month, setMonth] = useState('');
	const [cardType, setCardType] = useState('');
	const [price, setPrice] = useState('');
	const [checked, setChecked] = useState(false);
	const [paymentType, setPaymentType] = useState('');
	const [filteredCard, setFilteredCard] = useState([]);
	const [chooseCard, setChooseCard] = useState();

	const [cardTypes, setCardTypes] = useState({
		individual: [],
		family: [],
	});

	useEffect(() => {
		setFilteredCard(products?.filter((e) => e.endDateIncrementValue == month));
		setProductState(
			filteredCard?.filter(
				(e) => e.genericTransactionTypeToAddInfo.infoCategory == selectPack
			)
		);
		setChooseCard(
			productState.filter((item) => item.genericTransactionTypeId == cardType)
		);
	}, [month, cardType, selectPack]);

	console.log('choose', month, cardType, selectPack);

	useEffect(() => {
		setPrice(chooseCard && chooseCard[0]?.price);
	});

	useEffect(() => {
		let individual = products?.filter(
				(e) =>
					e.genericTransactionTypeToAddInfo.infoCategory !==
					'PERCENTAGE_CLINIC_DISCOUNT_FAMILY'
			),
			family = products?.filter(
				(e) =>
					e.genericTransactionTypeToAddInfo.infoCategory ==
					'PERCENTAGE_CLINIC_DISCOUNT_FAMILY'
			);

		setCardTypes((e) => ({ family: family, individual: individual }));
	}, []);

	const newMonth = products?.map((e) => e.endDateIncrementValue);

	let uniqueArray = [...new Set(newMonth)];

	const services = [
		{
			id: '1',
			name: 'service 1',
			percent1: '20%',
			percent3: '20%',
			percent6: '20%',
		},
		{
			id: '2',
			name: 'service 2',
			percent1: '20%',
			percent3: '20%',
			percent6: '20%',
		},
	];
	const AntSwitch = styled(Switch)(({ theme }) => ({
		width: 60,
		height: 32,
		padding: 0,
		display: 'flex',
		'&:active': {
			'& .MuiSwitch-thumb': {
				width: 26,
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
				duration: 0,
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
			{checkout && (
				<Checkout
					cards={products}
					cardType={cardType}
					users={users}
					onClose={() => setCheckout(false)}
					setUsers={(e) => setUsers(e)}
					currentUser={user}
					selectPack={selectPack}
				/>
			)}
			<div className={s.container}>
				<div className={s.firstPart}>
					<div className={s.headerContainer}>
						<div className={s.headerContainerLeft}>
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
						</div>
						<div className={s.headerContainerRight}>
							<div className={s.headerBg}></div>
						</div>
					</div>
				</div>
				<div className={s.forMobile}>
					<CardPrice
						withoutHeader
						onClick={openModal}
					/>
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
						<div>
							<FormGroup>
								<Stack
									direction='row'
									spacing={1}
									alignItems='center'
								>
									<Typography className={style.switcherLabel}>
										ინდივიდუალური
									</Typography>
									<AntSwitch
										checked={checked}
										onChange={(e) => {
											setPaymentType(e.target.ariaChecked);
											setChecked(e.target.checked);
										}}
										defaultChecked
										inputProps={{
											'aria-label': 'ant design',
											'aria-checked': checked ? 'individual' : 'family',
										}}
										checkedChildren='YESxasdiasldkasjdljasd'
										unCheckedChildren='NOasdkhasjkdhsakjdhksajd'
									/>
									<Typography className={style.switcherLabel}>
										საოჯახო
									</Typography>
								</Stack>
							</FormGroup>
						</div>
					</div>
					<div className={s.table}>
						<div className={s.tableHeader}>
							<span className={s.clinicTitleStyles}>პარტნიორები</span>
						</div>
						{checked
							? cardTypes?.family.map((e, i) => {
									if (i < 3) {
										return (
											<>
												<div
													className={s.tableColumnTitle}
													key={e.id}
												>
													<div className={s.columnTitleContainer}>
														<span className={s.tablePriceTitleStyles}>
															{e.price}
														</span>
														<span className={s.tableDataTitleStyles}>
															{e?.cardName}
														</span>
													</div>
												</div>
											</>
										);
									}
							  })
							: cardTypes?.individual.map((e, i) => {
									if (i < 3) {
										return (
											<>
												<div
													className={s.tableColumnTitle}
													key={e.id}
												>
													<div className={s.columnTitleContainer}>
														<span className={s.tablePriceTitleStyles}>
															{e.price}
														</span>
														<span className={s.tableDataTitleStyles}>
															{e?.cardName}
														</span>
													</div>
												</div>
											</>
										);
									}
							  })}
					</div>
					{categories
						.filter((e) => e.parentCategoryId === null)
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
											}
										}}
										className={s.categorieTitle}
									>
										<div className={s.nameIconCont}>
											{item.title}

											<Image
												src='/dropArrow.svg'
												width='14px'
												height='8px'
											/>
										</div>
										<div className={s.tableFackData}>
											<span>{featuresData[0].starter}</span>
											<span>{featuresData[1].pro}</span>
											<span>{featuresData[2].plus}</span>
										</div>
									</div>

									{dropDown === item.title && (
										<div className={s.dropDownList}>
											{categories?.map((sub) => {
												if (sub.id == item.id) {
													let catsw = clinics
														.map((e) => {
															if (
																e.clinicCategories.some((x) => x.id == sub.id)
															) {
																return e;
															}
														})
														.filter((e) => e !== undefined);
													return catsw.map((e, i) => <span key={i}>{e.displayName}</span>);
												}
											})}
										</div>
									)}
								</div>
							);
						})}

					<div className={s.buttonContainer}>
						<span className={s.finalPrice}>
							{price}
							<span>
								{price && (
									<img
										src='/blueLari.svg'
										alt='lari'
										width='24px'
										height='24px'
									/>
								)}
							</span>
						</span>

						<Select
							placeholder='Month'
							label='Month'
							className={s.buyDropDown}
							options={
								products &&
								uniqueArray?.map((item) => ({
									label: item,
									value: item,
								}))
							}
							onChange={(value) => {
								setMonth(value);
							}}
						/>
						<Select
							placeholder='Package'
							label='Package'
							className={s.buyDropDown}
							options={[
								{
									label: 'Individually',
									value: 'PERCENTAGE_CLINIC_DISCOUNT_INDIVIDUAL',
								},
								{ label: 'Family', value: 'PERCENTAGE_CLINIC_DISCOUNT_FAMILY' },
							]}
							onChange={(value) => {
								setSelectPack(value);
							}}
						/>

						<Select
							placeholder='Card type'
							label='Card type'
							className={s.buyDropDown}
							options={
								products &&
								productState?.map((item) => ({
									label: item.cardName,
									value: item.genericTransactionTypeId,
								}))
							}
							value={cardType}
							onChange={(options) => {
								setCardType(options);
							}}
						/>

						<Button
							style={s.buttonActive}
							name='Buy now'
							onClick={() => {
								// paymentType == 'family' ?
								cardType && setCheckout(!checkout);
								// (cardType && postData(
								// 	'https://medical.pirveli.ge/medical/orders/create-order',
								// 	{
								// 		"bogOrderRequest_dto": {
								// 			"user_id": null,
								// 			"contract_id": null,
								// 			"party_id": null,
								// 			"bog_order_request_dto" : {
								// 			  "intent": "AUTHORIZE",
								// 			  "items": [
								// 				  {
								// 				  "amount": "0.01",
								// 				  "description": "regTest",
								// 				  "quantity": "1",
								// 				  "product_id": cardType
								// 				  }
								// 			  ],
								// 			  "locale": "ka",
								// 			  "shop_order_id": "123456",
								// 			  "redirect_url": "https://bog-banking.pirveli.ge/callback/statusChange",
								// 			  "show_shop_order_id_on_extract": true,
								// 			  "capture_method": "AUTOMATIC",
								// 			  "purchase_units": [
								// 				  {
								// 				  "amount": {
								// 					  "currency_code": "GEL",
								// 					  "value": "0.01"
								// 				  }
								// 				  }
								// 			  ]
								// 			}
								// 		  },
								// 		"customerDTOList": []
								// 	},
								// 	'POST'
								// ))
							}}
						/>
					</div>
				</div>
			</div>
		</>
	);
}

export const getStaticProps = async () => {
	let API_URL = process.env.NEXT_PUBLIC_BASE_URL;

	const getClinics = await getData(
		`${API_URL}/asclepius/v1/api/clinics/search?name=`
	);
	const getDoctors = await getData(
		`${API_URL}/asclepius/v1/api/transactions/cards/get-products?contractId=572`
	);

	const getCategories = await getData(`${API_URL}/asclepius/v1/api/categories`);

	const getProducts = await getData(
		`https://medical.pirveli.ge/medical/products/get-products`
	);
	return {
		props: {
			cards: getDoctors,
			clinics: getClinics,
			categories: getCategories,
			products: getProducts,
		},
	};
};

export default BuyCardPage;
