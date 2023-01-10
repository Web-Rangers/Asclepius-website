import { useEffect, useState } from 'react';
import BuyCardModal from '../../components/modals/BuyCardModal';
import Button from '../../components/ui/Button';
import Block from '../../components/block';
import classNames from 'classnames';
import AddFamilyMember from '../../components/modals/addFamilyMember';
import { useWindowSize } from '../../components/useWindowSize';
import { getData } from '../../components/request';
import { Skeleton } from 'antd';
import { ReactSVG } from 'react-svg';
import Link from 'next/link';
import styles from '../../styles/pages/userDetailed.module.css';

export default function UserDetailed() {
    const [familyMemberModal, setFamilyMemberModal] = useState(false);
    const [menuItem, setMenuItem] = useState('main');
	const [user, setUser] = useState(null);
	const [userInfo, setUserInfo] = useState({})
    const [randomNum, setRandomNum] = useState(null);
    const [userAvatar, setUserAvatar] = useState({
        img: ``,
        color: ''
    })
    const [userCards, setUserCards] = useState([]);
    const [length, setLength] = useState(null);
    const [open, setOpen] = useState(false);

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
                response?.products?.map((e)=> {
                    e?.members?.map((z)=> {
                        familyMembersArray.push(z)
                    })
                })
                setUserCards(response?.products)

                var todayDate = new Date();
                var myDate = new Date();
                var day = (24*60*60*1000) * response?.products[0]?.endDateIncrementValues;
                myDate.setTime(todayDate.getTime() + day);
                console.log(myDate.getDay(), 'datatataltlsllslsa')
                setLength(myDate.getDay())
            })

        getData(`${process.env.MEDICAL_API}/medical/registry/get-user-avatar`)
            .then((e)=> {
                setUserAvatar({
                    img: `/avatar${e?.path}.png`,
                    color: `#${e?.code?.toString()}`
                })
            })
        
        setRandomNum(Math.floor(1000 + Math.random() * 9000))
        
        getData(`${process.env.MEDICAL_API}/medical/registry/user-id`).then(
            (response) => {
                setUser(response ? true : false);
                setUserInfo(response)
            }
        );
    },[])

    return <>
        {
            <BuyCardModal open={open} hideModal={()=> setOpen(false)} />
        }
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
                            {
                                userCards?.length > 1 ? 
                                '' : <Link href="/buyCardPage">
                                        <Button 
                                            style={styles.greetingBtn} 
                                            name='შეუკვეთე ბარათი'
                                        />
                                    </Link>
                            }
                        </div>
                        <div className={styles.greetingImage}>
                            <img 
                                className={styles.greetingBackground} 
                                src="/userImage.png" 
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
                        <h2>ისტორია</h2>
                        <span>პაციენტის ისტორია მალე დაემატება.</span>
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
                                        <div className={styles.userAvatarBg} 
                                            style={{
                                                backgroundColor: `${userAvatar?.color !== '#undefined' ? userAvatar?.color : '#000'}`,
                                            }}
                                        >
                                            <img className={styles.userAvatar} src={userAvatar?.img !== '/avatarundefined.png' ? userAvatar?.img : '/avatar3.png'} />
                                        </div>
                                        <div className={styles.userinfoBlock}>
                                            <h3>{userInfo?.firstName} {userInfo?.lastName}</h3>
                                            <h4>Birth date: {userInfo?.personDob}</h4>
                                        </div>
                                        <Link href="https://profile.pirveli.com">
                                            <ReactSVG className={styles.userOptionBtn} src="/useroption.svg" />
                                        </Link>
                            </div> : <Skeleton className={styles.skelton} active avatar></Skeleton>
                        }
                    </Block>
                    {userCards?.length > 1
                        ?
                        <Block
                            title="ჩემი ბარათი"
                            actions={<Link href="user/mycard"><button className={styles.upgradeBtn}>ყველა სერვისი</button></Link>}
                            className={styles.cards}
                        >
                            <div className={styles.cardBlockDiv}>
                                <div className={styles.cardView}>
                                    <img className={styles.cardImage} src="/01-5.webp" alt="" />
                                    <span className={styles.cardNumber}>2017 1115 2020 {randomNum}</span>
                                    <span className={styles.cardUserTitle}>{userInfo?.firstName} {userInfo?.lastName}</span>
                                    <span className={styles.expiration}>00/00</span>
                                </div>
                                <div className={styles.cardOverview}>
                                    თქვენ შეძენილი გაქვთ 1 თვიანი პაკეტი. შემდეგ გადახა 27 დღე.
                                </div>
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
                                <button className={styles.buycardForUser}>შეუკვეთე ბარათი</button>
                            </span>
                                <Button 
                                    onClick={()=>setOpen(true)}
                                    style={styles.greetingBtn} 
                                    name='შეუკვეთე ბარათი'
                                />
                        </Block>
                    } 
                </div>
                {
                    useWindowSize().width < 600 && 
                    <div className={styles.blockemptyOrders}>
                        <h2>ისტორია</h2>
                        <span>პაციენტის ისტორია მალე დაემატება.</span>
                    </div>
                }
            </div>
        </div>
        {
            (useWindowSize().width < 600) && 
            <div className={styles.familyMembersAddblock}>
                <div className={styles.familyMembersAddBtn}>
                    <span>ოჯახის წევრები</span>
                    <ReactSVG className={styles.familyMemberSvg} src="/familyadd.svg" />
                </div>
            </div>
        }
    </>
}
