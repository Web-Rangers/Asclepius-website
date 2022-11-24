import { useState } from 'react';
import s from '../styles/buyCard.module.css';
import { ReactSVG } from 'react-svg';
import classNames from 'classnames';

const TableDropDown = ({ services, item, clinicName }) => {
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
										{clinicName}
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

export default TableDropDown;
