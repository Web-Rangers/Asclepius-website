import { useState, useEffect } from 'react';
import Text from '../../components/ui/Text';
import Image from 'next/image';
import s from '../../styles/buyCard.module.css';
import CardPrice from '../../components/contents/CardPrice';
import buyCardData from '../../fakeData';
import Button from '../../components/ui/Button';
import Modal from 'react-modal';
import CardCheckoutModal from '../../components/modals/CardCheckoutModal';
import classNames from 'classnames';
import { ReactSVG } from 'react-svg';
import { getData } from '../../components/request';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import style from '../../styles/components/card.module.css';
import Select from '../../components/Select';
import Checkout from '../../components/modals/checkout';

function BuyCardPage({ cards, clinics, categories, products }) {
	const [modalIsOpen, setIsOpen] = useState(false);
	const [customStyles, setCustomStyles] = useState({});

	const [checkout, setCheckout] = useState(false);

  const openModal = () => {
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
	};

	const [users, setUsers] = useState([
		{
			id: 0, 
			name: 'George Fowler',
			mail: 'georgefowler@gmail.com',
			phone: '+995 599 99 99 63',
			date: '11.03.2000',
			idNumber: '012111099283'
		}
	])

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
	}, []);

	function conMili(mSecVal) {
		//get the milliseconds value
		return new Date(mSecVal).toString();
	}

	const [selectPack, setSelectPack] = useState('');
	const [month, setMonth] = useState('');
	const [cardType, setCardType] = useState('');

	console.log('cardType', products);

	console.log('cardType', cardType);

	const [checked, setChecked] = useState(false);
	const [card, setCard] = useState({
		id: '',
		amount: '',
	});
	const [open, setOpen] = useState(false);
	const [show, setShow] = useState(false);
	const packs = ['1 months', '3 months', '6 months'];
	const lastThreeItem = cards.slice(-3);

	const sendRequest = async (id, amount) => {
		try {
			const request = await fetch(
				`${process.env.NEXT_PUBLIC_BASE_URL}/asclepius/v1/api/payment/bog/checkout/orders`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						user_id: 1,
						contract_id: 21,
						party_id: 1,
						bog_order_request_dto: {
							intent: 'AUTHORIZE',
							items: [
								{
									amount: `${amount}`,
									description: 'test',
									quantity: '1',
									product_id: `${id}`,
								},
							],
							locale: 'ka',
							shop_order_id: '123456',
							redirect_url:
								'https://bog-banking.pirveli.ge/callback/statusChange',
							show_shop_order_id_on_extract: true,
							capture_method: 'AUTOMATIC',
							purchase_units: [
								{
									amount: {
										currency_code: 'GEL',
										value: '0.01',
									},
								},
							],
						},
					}),
				}
			);
			const response = await request.json();

			return response;
		} catch (error) {
			throw error;
		}
	};

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

	return <>
		{checkout && <Checkout users={users} onClose={()=> setCheckout(false)} setUsers={(e)=> setUsers(e)} />}
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
									onChange={(e) => setChecked(e.target.checked)}
									defaultChecked
									inputProps={{ 'aria-label': 'ant design' }}
								/>
								<Typography className={style.switcherLabel}>საოჯახო</Typography>
							</Stack>
						</FormGroup>
					</div>
				</div>

				<div className={s.table}>
					<div className={s.tableHeader}>
						<span className={s.clinicTitleStyles}>პარტნიორები</span>
					</div>
					<div className={s.tableColumnTitle}>
						<div className={s.columnTitleContainer}>
							<span className={s.tablePriceTitleStyles}>50$</span>
							<span className={s.tableDataTitleStyles}>Silver</span>
						</div>
						<div className={s.columnTitleContainer}>
							<span className={s.tablePriceTitleStyles}>100$</span>
							<span className={s.tableDataTitleStyles}>Gold</span>
						</div>
						<div className={s.columnTitleContainer}>
							<span className={s.tablePriceTitleStyles}>150$$</span>
							<span className={s.tableDataTitleStyles}>Platinium</span>
						</div>
					</div>
				</div>
				{categories.map((item) => (
					<div
						className={s.tableContentContainer}
						key={item.id}
					>
						<DropDown
							item={item}
							services={services}
						/>
					</div>
				))}
				<div className={s.buttonContainer}>
					{/* {
            selectPack === '1 months' && <div className={s.price}>50$</div>
          }
          {
            selectPack === '3 months' && <div className={s.price}>100$</div>
          }
          {
            selectPack === '6 months' && <div className={s.price}>150$</div>
          } */}
					{/* <div className={s.customDropdown}>
						<div
							className={s.customOpt}
							onClick={() => setOpen(!open)}
						>
							<span>{selectPack}</span>
							<ReactSVG
								className={classNames({
									[s.arrowTransform]: open,
								})}
								src='/dropArrow.svg'
							/>
						</div>
						<div
							className={classNames(s.customOptList, {
								[s.customoptions]: open,
							})}
						>
							{lastThreeItem.map((e) => {
								return (
									<div
										key={e.id}
										onClick={() => {
											setSelectPack(e.title);
											setCard({
												id: e.genericTransactionTypeId,
												amount: e.entries[0].entryAmount,
											});
											setOpen(false);
										}}
									>
										{'ragaca'}
									</div>
								);
							})}
						</div>
					</div> */}
					{/* {products.map((item) =>(
						
					)} */}
					<Select
						placeholder='Month'
						label='Month'
						className={s.buyDropDown}
						options={[
							{
								label: '1 month',
								value: '1',
							},
							{ label: '2 months', value: '2' },
							{ label: '3 months', value: '3' },
						]}
						onChange={(value) => {
							setMonth(value);
						}}
					/>

					<Select
						placeholder='Card type'
						label='Card type'
						className={s.buyDropDown}
						options={products.map((item) => ({
							label: item.cardName,
							value: item.cardName,
						}))}
						value={cardType}
						onChange={(options) => {
							setCardType(options);
						}}
					/>
					<Select
						placeholder='Package'
						label='Package'
						className={s.buyDropDown}
						options={[
							{
								label: 'Individually',
								value: '1',
							},
							{ label: 'Family', value: '2' },
						]}
						onChange={(value) => {
							setSelectPack(value);
					</div>
					<Button
						style={s.buttonActive}
						name='Buy now'
						onClick={() => {
							// sendRequest(card.id, card.amount).then((response) =>
							// 	console.log(response)
							// );
							setCheckout(!checkout)
						}}
					/>
				</div>
				<Button
					style={s.buttonActive}
					name='Buy now'
					onClick={() => {
						sendRequest(card.id, card.amount).then((response) =>
							console.log(response)
						);
					}}
				/>
			</div>
		</div>
	</>
}

const DropDown = ({ services, item }) => {
	const [dropDown, setDropDown] = useState(false);
	return (
		<div className={s.customOptContainer}>
			<span className={s.clinicNameStyle}>
				{item.title}
				<ReactSVG
					className={classNames({
						[s.titleArrowTransform]: dropDown,
					})}
					src='/dropArrow.svg'
					onClick={() => setDropDown(!dropDown)}
				/>
			</span>

			<div className={s.serviceOptionListStyle}>
				<div className={s.serviceOptionListStyle}>
					{dropDown
						? services.map((item) => (
								<div
									className={s.serviceRow}
									key={item.id}
								>
									<div
										className={s.serviesOptions}
										onClick={() => {
											// setSelectPack(e.name);
											// setCard({
											// 	id: e.genericTransactionTypeId,
											// 	amount: e.entries[0].entryAmount,
											// });
											setDropDown(false);
										}}
									>
										{item.name}
									</div>
									<div className={s.tableColumnTitle}>
										<span className={s.serviesOptions}>{item.percent1}</span>
										<span className={s.serviesOptions}>{item.percent3}</span>
										<span className={s.serviesOptions}>{item.percent6}</span>
									</div>
								</div>
						  ))
						: null}
				</div>
			</div>
		</div>
	);
};

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
