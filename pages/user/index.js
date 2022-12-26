import {useEffect, useState} from 'react';
import styles from '../../styles/pages/userDetailed.module.css';
import Button from '../../components/ui/Button';
import Block from '../../components/block';
import Table from '../../components/TableWithSort';
import classNames from 'classnames';
import DatePicker from '../../components/DatePicker';
import Select from '../../components/Select';
import Input from '../../components/Input';
import FilterModal from '../../components/modals/filterModal';
import AddFamilyMember from '../../components/modals/addFamilyMember';
import Calendar from '../../components/Calendar';
import {useWindowSize} from '../../components/useWindowSize';
import Menu from '../../components/ui/menu';
import { getData } from '../../components/request';
import { Skeleton } from 'antd';
import { ReactSVG } from 'react-svg';
import Link from 'next/link';

export default function UserDetailed() {
    const [familyMemberModal, setFamilyMemberModal] = useState(false);
    const [isOpen, setOpen] = useState(false);
    const [status, setStatus] = useState('');
    const [serviceType, setServiceType] = useState('');
    const [menuItem, setMenuItem] = useState('main');
    const [products, setProducts] = useState([]);
    const [familyMembers, setFamilyMembers] = useState([]);
	const [user, setUser] = useState(null);
	const [userInfo, setUserInfo] = useState({})
    const [randomNum, setRandomNum] = useState(null);
    const [userAvatar, setUserAvatar] = useState({
        img: ``,
        color: ''
    })
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
    const [userCards, setUserCards] = useState([]);

    const columns = [
        {
            key: "transactionDate",
            title: "Date",
            dataIndex: "transactionDate",
            sort: true,
        },
        {
            key: "productName",
            title: "Institution",
            dataIndex: "productName",
        },
        {
            key: "productType",
            title: "Service type",
            dataIndex: "productType",
        },
        {
            key: "amount",
            title: "Discount",
            dataIndex: "amount",
        }
    ];

    useEffect(()=> {
        getData(`${process.env.MEDICAL_API}/medical/products/get-bought-products`)
            .then((response)=> {
                const data = response?.products?.map((e)=> {
                    return {...e,
                        transactionDate: e.transactionDate.slice(0,10),
                        productType: e.productType === 'PERCENTAGE_CLINIC_DISCOUNT_FAMILY' ? 'Family' : 'Individual'
                    }
                })
                let familyMembersArray = [];
                setProducts(data)
                response?.products?.map((e)=> {
                    e?.members?.map((z)=> {
                        familyMembersArray.push(z)
                    })
                })
                const unique = [...new Set(familyMembersArray)]
                setFamilyMembers(unique)
                setUserCards(response?.products)
            })

        getData(`${process.env.MEDICAL_API}/medical/registry/get-user-avatar`)
            .then((e)=> {
                setUserAvatar({
                    img: `/avatar${e?.path}.png`,
                    color: `#${e?.code?.toString()}`
                })
            })
        setRandomNum(Math.floor(1000 + Math.random() * 9000))
    },[])

    useEffect(() => {
		getData(`${process.env.MEDICAL_API}/medical/registry/user-id`).then(
			(response) => {
				setUser(response ? true : false);
				setUserInfo(response)
			}
		);
	}, [])

    console.log(userCards, 'cards')

    return <>
        <div className={styles.detailedPage}>
            {
                familyMemberModal && 
                <AddFamilyMember onClose={()=>setFamilyMemberModal(false)} />
            }
            <div className={styles.detailPageContainer}>
                <div className={classNames(styles.container, {
                    [styles.activeTab]: menuItem == 'main'
                })}>
                    <div className={styles.greeting}>
                        <div>
                            <h2>გამარჯობა, <span>{userInfo?.firstName}</span></h2>
                            <p>წარმატებულ დღეს გისურვებთ და არ დაგავიწყდეთ თქვენს ჯანმრთელობაზე ზრუნვა!</p>
                            <Link href="/buyCardPage">
                                <Button 
                                    style={styles.greetingBtn} 
                                    name='შეუკვეთე ბარათი'
                                />
                            </Link>
                        </div>
                        <div className={styles.greetingImage}>
                            <img 
                                className={styles.greetingBackground} 
                                src="/userImage.svg" 
                                alt="greeting" 
                            />
                        </div>
                        <Button 
                            style={styles.greetingBtnResp}
                            name="Read more"
                        />
                    </div>
                    <div className={styles.greetingBg}>
                        <img src="/banneruser.png" />
                    </div>

                    <div className={styles.emptyOrders}>
                        <h2>შეკვეთების ისტორია</h2>
                        <span>ამ ეტაპზე, თქვენ არ გაქვთ განხორციელებული შეკვეთა. გთხოვთ შეიძინეთ ჯანდაცვის ბარათი.</span>
                    </div>

                    {/* <div className={styles.orders}>
                        <Block
                            title='Order History'
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
                                            <div className={classNames(styles.filterContainer, {
                                                [styles.filterOpen]: isOpen,
                                            })}>
                                                <div className={styles.filterSelectors}>
                                                    <DatePicker
                                                        mode="single"
                                                        label="Date"
                                                        className={styles.servInput}
                                                    />
                                                    <Select
                                                        label="Doctor name"
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
                                                    <Select
                                                        label="Service name"
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
                                                    <div className={styles.selects}>
                                                        <h2>Card</h2>
                                                        <div>
                                                            <button
                                                                className={classNames(styles.selectBtn,{[styles.activeBtn]: serviceType === 'online'})}
                                                                onClick={() =>
                                                                    setServiceType('online')
                                                                }
                                                            >
                                                                Online
                                                            </button>
                                                            <button
                                                                className={classNames(styles.selectBtn,{[styles.activeBtn]: serviceType === 'at_home'})}
                                                                onClick={() =>
                                                                    setServiceType('at_home')
                                                                }
                                                            >
                                                                At home
                                                            </button>
                                                            <button
                                                                className={classNames(styles.selectBtn,{[styles.activeBtn]: serviceType === 'clinic'})}
                                                                onClick={() =>
                                                                    setServiceType('clinic')
                                                                }
                                                            >
                                                                Clinic
                                                            </button>
                                                        </div>
                                                    </div>                             
                                                    <Input 
                                                        label="Service price"
                                                        className={styles.servInput}
                                                    />
                                                    <Input 
                                                        label="Service status"
                                                        className={styles.servInput}
                                                    />
                                                    <Input 
                                                        label="Service review"
                                                        className={styles.servInput}
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
                            {
                                products?.length > 0 && 
                                <Table 
                                    className={styles.table}
                                    columns={columns}
                                    data={products}
                                    rowClassName={styles.tableRow}
                                    cellClassName={styles.tableCell}
                                    headerClassName={styles.tableHeader}
                                    bodyClassName={styles.tableBody}
                                    pagination={{ pageSize: 5, initialPage: 1 }}
                                />
                            }
                        </Block>
                    </div> */}
                </div>
                <div className={styles.rightMenu}>
                    <Block
                        className={styles.userblock}
                    >
                        {
                            user ? <div className={styles.userBlcokItem}>
                                        <div className={styles.userAvatarBg} style={{background: `${userAvatar?.color}`}}>
                                            <img className={styles.userAvatar} src={userAvatar?.img} />
                                        </div>
                                        <div className={styles.userinfoBlock}>
                                            <h3>{userInfo?.firstName} {userInfo?.lastName}</h3>
                                            <h4>Birth date: {userInfo?.personDob}</h4>
                                        </div>
                                        <ReactSVG className={styles.userOptionBtn} src="/useroption.svg" />
                            </div> : <Skeleton className={styles.skelton} active avatar></Skeleton>
                        }
                    </Block>
                    {userCards?.length > 0
                        ?
                        <Block
                            title="ჩემი ბარათი"
                            actions={<Link href="user/mycard"><button className={styles.upgradeBtn}>ყველა სერვისი</button></Link>}
                            className={styles.cards}
                        >
                            <div className={styles.cardView}>
                                <img className={styles.cardImage} src="/01-5.png" alt="" />
                                <span className={styles.cardNumber}>2017 1115 2020 {randomNum}</span>
                                <span className={styles.cardUserTitle}>{userInfo?.firstName} {userInfo?.lastName}</span>
                                <span className={styles.expiration}>00/00</span>
                            </div>
                        </Block>
                        :
                        <Block
                            title="ჩემი ბარათი"
                            actions={<Link href="user/mycard"><button className={styles.upgradeBtn}>ყველა სერვისი</button></Link>}
                            className={styles.cards}
                        >
                            <span className={styles.cardsSpan}>
                                შეუკვეთე ბარათი და მიიღე 20%-მდე ფასდაკლება ნებისმიერ კლინიკაში, ან ექიმთან ვიზიტის დროს
                            </span>
                            <Link href="/buyCardPage">
                                <Button 
                                    style={styles.greetingBtn} 
                                    name='შეუკვეთე ბარათი'
                                />
                            </Link>
                        </Block>
                    } 

                    <Block
                        title="Family member"
                        actions={
                            memberList.length > 0 && 
                            <button 
                                className={styles.addFamilyMember} 
                                onClick={()=>setFamilyMemberModal(true)}
                            >
                                <img src="/plus.svg" alt="" />
                                <span>დამატება</span>
                            </button>
                        }
                        className={classNames(styles.familyBlock, {
                            [styles.activeTab]: menuItem == 'family'
                        })}
                    >
                        {
                            familyMembers?.length > 0 ?
                            <div className={styles.membersList}>
                                {familyMembers?.map((member)=>{
                                    return <>
                                        <div className={styles.familyMember}>
                                            <div className={styles.memberInfo}>
                                                <img src={member.image} alt="" />
                                                <div>
                                                    <h2>{member.firstName}</h2>
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
                                            <span>დამატება</span>
                                        </div>
                                    }
                                />
                            </div>
                        }
                    </Block>
                </div>
            </div>
        </div>
        {
            useWindowSize().width < 600 && <Menu active={menuItem} onClick={(active)=> setMenuItem(active)} />
        }
    </>
}
