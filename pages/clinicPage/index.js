import { useEffect, useState, useMemo } from 'react';
import BranchPageCardItem from '../../components/contents/BranchPageCardItem';
import classNames from 'classnames';
import s from '../../styles/clinicsPage.module.css';
import Link from 'next/link';
import Text from '../../components/ui/Text';
import Button from '../../components/ui/Button';
import Image from 'next/image';
import Pagination from '../../components/ui/Pagination';
import Modal from 'react-modal';
import clinicArrayData from '../../clinicArrayData';
import FilterModal from '../../components/modals/filterModal';
import Select from '../../components/Select';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { getData } from '../../components/request';
import ClinicCardItem from '../../components/contents/ClinicCardItem';
import { useRouter } from 'next/router';
import Navigation from '../../components/navigation';

let PageSize = 12;

function ClinicsPage({ clinics }) {
	const [modalIsOpen, setIsOpen] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [searchInput, setSearchInput] = useState('');
	const [customStyles, setCustomStyles] = useState({});
	const [modalOpen, setOpen] = useState(false);
	const [value, setValue] = useState([0, 100]);
	const [filterData, setFilterData] = useState(clinics);
	const router = useRouter();

	const handleChangeRange = (event, newValue) => {
		setValue(newValue);
		setFilterData(
			clinicArrayData.filter((e) => e.sale >= value[0] && e.sale <= value[1])
		);
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
					transform: 'translate(-0%, -50%)',
					background: '#ffffff',
				},
				overlay: {
					zIndex: 999,
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

	const handleChange = (e) => {
		setSearchInput(e.target.value);
	};

	const currentTableData = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * PageSize;
		const lastPageIndex = firstPageIndex + PageSize;
		return filterData.slice(firstPageIndex, lastPageIndex);
	}, [currentPage, filterData]);

	let subtitle;

	const openModal = () => {
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
	};

	function filterClinic(id) {
		if(id){
			const clinicsWithId = (element) => element.id == id;
			const filterState = clinics?.filter((e)=> e.clinicCategories.some(clinicsWithId))
			setFilterData(filterState)
		}else {
			setFilterData(clinics)
		}
	}

	useEffect(() => {
		let id = router?.query?.id;

		setFilterData((state) => {
			if (id) {
				const clinicsWithId = (element) => element.id == id;
				const filterState = state.filter((e) =>
					e.clinicCategories.some(clinicsWithId)
				);
				return filterState;
			}

			return state;
		});
	}, [router.isReady]);

	return (
		router?.isReady && (
			<>

		filterClinic(id)
	}, [router.asPath, router.events]);

	return (
			router?.isReady && <>
				<Navigation />

				<div className={s.branchPage}>
					<div className={s.branchTool}>
						<div onClick={() => router.back()}>
							<a className={s.backButton}>
								<Image
									alt='Arrow-LeftActive'
									src='/Arrow - LeftActive.svg'
									width='24px'
									height='24px'
									style={{ paddingRight: '4px' }}
								/>
								Back
							</a>
						</div>
						<Button
							style={s.filterForResp}
							icon={
								<Image
									alt='Arrow-LeftActive'
									src='/Filter.svg'
									width='24px'
									height='24px'
								/>
							}
							onClick={openModal}
						></Button>
					</div>
					<div className={s.clinicFilterContainer}>
						<Text style={s.clinicsTitleTextStyle}>Clinics</Text>
						<div className={s.rangeContainer}>
							<span className={s.discountTextStyle}>% Discount</span>
							<div className={s.percentBox}>
								<span className={s.percentBoxStyle}>{value[0] + '%'}</span>
								<span className={s.percentBoxStyle}>{value[1] + '%'}</span>
							</div>
							<Slider
								getAriaLabel={() => 'Temperature range'}
								value={value}
								onChange={handleChangeRange}
							/>
						</div>
						<div className={s.btnContainer}>
							<Button
								style={s.filterButtonStyle}
								name='Filter'
								icon={
									<Image
										alt='Arrow-LeftActive'
										src='/Filter.svg'
										width='24px'
										height='24px'
									/>
								}
								onClick={setOpen}
							></Button>
							{modalOpen && (
								<FilterModal onClose={() => setOpen(false)}>
									<div className={classNames(s.filterContainer)}>
										<div className={s.filterSelectors}>
											<div className={s.searchInp}>
												<h2>Search</h2>
												<div className={s.searchForm}>
													<input
														type='text'
														placeholder='Search with ID'
													/>
												</div>
											</div>
											<Select
												placeholder='City'
												label='City'
												labelStyle='outside'
												className={s.servInput}
												options={[
													{
														label: '4140 Parker Rd',
														value: '1',
													},
													{ label: 'Another Branch', value: '2' },
												]}
												onChange={(value) => {
													setStatus(value);
												}}
											/>
											<Select
												placeholder='Service Type'
												label='Service Type'
												labelStyle='outside'
												className={s.servInput}
												options={[
													{
														label: '4140 Parker Rd',
														value: '1',
													},
													{ label: 'Another Branch', value: '2' },
												]}
												onChange={(value) => {
													setStatus(value);
												}}
											/>
										</div>
										<div className={s.filterBtns}>
											<Button
												name='Clear'
												style={s.clearBtn}
											/>
											<Button
												name='Filter'
												style={s.filterBtn}
											/>
										</div>
									</div>
								</FilterModal>
							)}
						</div>
					</div>
					<div className={s.clinicPageCardListContainer}>
						{currentTableData.map((item) => (
							<ClinicCardItem
								key={item?.id}
								data={item}
								listItem={true}
							/>
						))}
					</div>
					<Pagination
						className='pagination-bar'
						currentPage={currentPage}
						totalCount={filterData.length}
						pageSize={PageSize}
						onPageChange={(page) => setCurrentPage(page)}
					/>
				</div>
			</>
		)
	);
}

export const getServerSideProps = async () => {
	let API_URL = process.env.NEXT_PUBLIC_BASE_URL;

	const getClinics = await getData(
		`${API_URL}/asclepius/v1/api/clinics/search?name=`
	);

	return {
		props: {
			clinics:
				getClinics?.length === 0
					? null
					: getClinics.sort(function (a, b) {
							return a.regDate > b.regDate ? -1 : a.regDate > b.regDate ? 1 : 0;
					  }),
		},
	};
};

export default ClinicsPage;
