import {useState} from 'react';
import styles from '../../styles/pages/transactions.module.css';
import Button from '../../components/ui/Button';
import Block from '../../components/block';
import Table from '../../components/TableWithSort';
import classNames from 'classnames';
import DatePicker from '../../components/DatePicker';
import Select from '../../components/Select';
import Input from '../../components/Input';
import FilterModal from '../../components/modals/filterModal';
import AddFamilyMember from '../../components/modals/addFamilyMember';
import { Style } from '@mui/icons-material';
import Calendar from '../../components/Calendar';
import {useWindowSize} from '../../components/useWindowSize';
import Menu from '../../components/ui/menu';

export default function Transactions() {
    const [familyMemberModal, setFamilyMemberModal] = useState(false);
    const [isOpen, setOpen] = useState(false);
    const [status, setStatus] = useState('');
    const [serviceType, setServiceType] = useState('');
    const [menuItem, setMenuItem] = useState('main');

    const memberList = [
        {
            id:1,
            name: 'Martha Fowler',
            email: 'marthafowler@gmai.com',
            age: 'Under 18',
            image: '/avatar1.png',
        },
        {
            id:2,
            name: 'George Fowler',
            email: 'georgefowler@gmail.com',
            age: 'Above 18',
            image: '/avatar2.png',
        },
    ]

    const columns = [
        {
            key: "date",
            title: "Date",
            dataIndex: "date",
            sort: true,
        },
        {
            key: "id_transactions",
            title: "ID transactions",
            dataIndex: "id_transactions",
        },
        {
            key: "price",
            title: "Price",
            dataIndex: "price",
        },
        {
            key: "status",
            title: "Status",
            dataIndex: "status",
        }
    ];

    const data = [
        {
            date: '5.05.2022',
            price: '$23',
            status: `Completed`,
            id_transactions: '1079098823455',
        },
        {
            date: '5.05.2015',
            price: '$23',
            status: `Completed`,
            id_transactions: '1079098823455',
        },
        {
            date: '5.05.2012',
            price: '$23',
            status: `Completed`,
            id_transactions: '1079098823455',
        },
        {
            date: '5.05.2025',
            price: '$23',
            status: `Completed`,
            id_transactions: '1079098823455',
        },
        {
            date: '5.05.2022',
            price: '$23',
            status: `Completed`,
            id_transactions: '1079098823455',
        },
        {
            date: '5.05.2022',
            price: '$23',
            status: `Completed`,
            id_transactions: '1079098823455',
        },
    ];

    return <>
        <div className={styles.transactionsPage}>
            {
                familyMemberModal && 
                <AddFamilyMember onClose={()=>setFamilyMemberModal(false)} />
            }
            <div className={classNames(styles.container, {
                [styles.activeTab]: menuItem == 'main'
            })}>
                <div className={styles.greeting}>
                    <div>
                        <h2>Hello <span>Mary Fowler</span></h2>
                        <p>Have a nice day and don’t forger to take care of your health !</p>
                        <Button 
                            style={styles.greetingBtn} 
                            name='Read more'
                        />
                    </div>
                    <div>
                        <img 
                            className={styles.greetingBackground} 
                            src="/greetingBg.png" 
                            alt="greeting" 
                        />
                    </div>
                </div>
                <div className={styles.orders}>
                    <Block
                        title='Transactions'
                        actions={
                            <>
                                <Button 
                                    name={<div><img src="/filter.svg" alt=""/><span>Filter</span></div>}
                                    style={styles.filterButton}
                                    onClick={()=>setOpen(true)}
                                />
                                {
                                    isOpen && 
                                    <FilterModal onClose={()=>setOpen(false)}>
                                        <div className={classNames(styles.filterContainer)}>
                                            <div className={styles.filterSelectors}>
                                                <div className={styles.searchInp}>
                                                    <h2>Search</h2>
                                                    <div className={styles.searchForm}>
                                                        <input type="text" placeholder="Search with ID" />
                                                    </div>
                                                </div>
                                                <DatePicker
                                                    mode="single"
                                                    label="Date"
                                                    className={styles.servInput}
                                                />
                                                <Select
                                                    label="Status"
                                                    labelStyle="outside"
                                                    className={styles.servInput}
                                                    options={[
                                                        {
                                                            label: "4140 Parker Rd",
                                                            value: "1",
                                                        },
                                                        { label: "Another Branch", value: "2" },
                                                    ]}
                                                    onChange={(value) => {
                                                        setStatus(value);
                                                    }}
                                                />
                                            </div>
                                            <div className={styles.filterBtns}>
                                                <Button 
                                                    name="Clear"
                                                    style={styles.clearBtn}
                                                />
                                                <Button 
                                                    name="Filter"
                                                    style={styles.filterBtn}
                                                />
                                            </div>
                                        </div>
                                    </FilterModal>
                                }
                            </>
                        }
                        className={styles.tableBlock}
                    >
                        <Table 
                            className={styles.table}
                            columns={columns}
                            data={data}
                            rowClassName={styles.tableRow}
                            cellClassName={styles.tableCell}
                            headerClassName={styles.tableHeader}
                            bodyClassName={styles.tableBody}
                            pagination={{ pageSize: 5, initialPage: 1 }}
                        />
                    </Block>
                </div>
            </div>
            <div className={styles.rightMenu}>
                <Block
                    title="My card"
                    actions={<button className={styles.upgradeBtn}>Upgrade</button>}
                    className={styles.cards}
                >
                    <img className={styles.cardImage} src="/card.png" alt="" />
                </Block>

                <Block
                    title="Family member"
                    actions={
                        memberList.length > 0 && 
                        <button 
                            className={styles.addFamilyMember} 
                            onClick={()=>setFamilyMemberModal(true)}
                        >
                            <img src="/plus.svg" alt="" />
                            <span>ADD</span>
                        </button>
                    }
                    className={classNames(styles.familyBlock, {
                        [styles.activeTab]: menuItem == 'family'
                    })}
                >
                    {
                        memberList?.length > 0 ?
                        <div className={styles.membersList}>
                            {memberList?.map((member)=>{
                                return <>
                                    <div className={styles.familyMember}>
                                        <div className={styles.memberInfo}>
                                            <img src={member.image} alt="" />
                                            <div>
                                                <h2>{member.name}</h2>
                                                <h3>{member.email}</h3>
                                            </div>
                                        </div>
                                        <div>
                                            {
                                                member.age === 'Under 18' ? 
                                                <img src="/eye.svg" alt="" />
                                                :
                                                <img src="/disabledEye.svg" alt="" />
                                            }
                                        </div>
                                    </div>
                                </>
                            })}
                        </div> 
                             : 
                        <div className={styles.membersBlock}>
                            <img src="/users.svg" alt="" />
                            <h2>Family members are not added</h2>
                            <Button 
                                style={styles.membersAdd}
                                name={
                                    <div 
                                        className={styles.memberAddBtn} 
                                        onClick={()=>setFamilyMemberModal(true)}
                                    >
                                        <img src="/memberPlus.svg" alt=""/>
                                        <span>Add</span>
                                    </div>
                                }
                            />
                        </div>
                    }
                </Block>
                <Block 
                    title="Calendar"
                    className={classNames(styles.calendar, {
                        [styles.activeTab]: menuItem == 'calendar'
                    })}
                >
                    <div className={styles.calendarBlock}>
                        <Calendar booking={false} />
                    </div>
                </Block>
            </div>
        </div>
        {
            useWindowSize().width < 600 && <Menu active={menuItem} onClick={(active)=> setMenuItem(active)} />
        }
    </>
}
