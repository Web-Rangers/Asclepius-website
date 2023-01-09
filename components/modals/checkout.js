import { useEffect, useRef, useState } from "react";
import { ReactSVG } from "react-svg";
import Select from "../../components/Select";
import styles from "../../styles/components/modals/checkout.module.css";
import CheckoutFamilyMember from './checkoutMember';
import Input from "../../components/Input";
import { DatePicker, Form } from 'antd';
import * as ANT from 'antd';
import 'antd/dist/antd.css';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import {postData} from '../request';
import Router from 'next/router';
import moment from 'moment';

dayjs.extend(weekday)
dayjs.extend(localeData)

const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

export default function Checkout({onClose, currentUser, cards, selectPack, cardType, users, setUsers, price}) {
    const [memberType, setMemberType] = useState('');
    const [openMemberModal, setOpenMemberModal] = useState(false);
    const [personDate, setPersonDate] = useState('');
    const [findCard, setFindCar] = useState(null);

    const [edit, setEdit] = useState(null);

    useEffect(()=>{
        let card = [];
        const fncard = card?.concat(cards.family, cards.individual).filter((e)=> e?.genericTransactionTypeToAddInfo?.genericTransactionTypeId === cardType)[0];
        setFindCar(fncard)
    },[])

    let cardTp = selectPack; //findCard.genericTransactionTypeToAddInfo.infoCategory
    
    function usersArray() {
        const manageUsersArray = users?.map((user)=> {
            let userWithoutId = Object.keys(user).filter(key =>
                key !== 'id').reduce((obj, key) =>
                {
                    obj[key] = user[key];
                    return obj;
                }, {}
            );
            
            if(userWithoutId.mail) {
                return {...userWithoutId, contactInfos: [
                    {
                        "prefix": "mail",
                        "value": userWithoutId.mail,
                        "info": "my mail",
                        "contactInfoType": "mail",
                        "contactInfoTag": "work",
                        "serviceType": "personal"
                    }
                ], regId: null}
            } else {
                return {...userWithoutId, contactInfos: null, regId: null}
            }
        })
        return manageUsersArray
    }

    console.log(cards, 'cardtp')

    let API_URL = (cardTp !== 'PERCENTAGE_CLINIC_DISCOUNT_INDIVIDUAL' ? `${process.env.MEDICAL_API}/medical/orders/create-orders` : `${process.env.MEDICAL_API}/medical/orders/create-order`);
    async function request(values = null){
        let bogRequest = {
            "bank_name": "bog",
            "party_id": null,
            "contract_id": null,
            "user_id": null,
            "bog_order_request_dto" : {
                "intent": "AUTHORIZE",
                "items": [
                    {
                    "amount": price, //findCard?.entries[0].entryAmount
                    "description": "regTest",
                    "quantity": "1",
                    "product_id": `${findCard?.genericTransactionTypeId}`
                    }
                ],
                "locale": "ka",
                "shop_order_id": "123456",
                "redirect_url": "https://medical.pirveli.com/user/",
                "show_shop_order_id_on_extract": true,
                "capture_method": "AUTOMATIC",
                "purchase_units": [
                    {
                        "amount": {
                            "currency_code": "GEL",
                            "value": price //findCard?.entries[0].entryAmount
                        }
                    }
                ]
            },
            "customerDTOList": cardTp !== 'PERCENTAGE_CLINIC_DISCOUNT_INDIVIDUAL' ? usersArray() : null
        };
        if(Object.getOwnPropertyNames(values).length !== 0){
            let requestBody = {
                objectType: 'customer',
                id: currentUser.id,
                registryType: "individual",
                taxationPolicy: "notax",
                orgLegalForm: "ind",
                legalAddressId: null,
                physicalAddressId: null,
                shortDescription: "test",
                activeDocId: null,
                regDate: null,
                uuid: currentUser.uuid,
                contactInfos: currentUser?.contactInfos ?  currentUser.contactInfos : [],
                orgDisplayName: null,
                orgLegalName: null,
                orgIdentNo: null,
                orgResponsiblePerson: null,
                firstName: currentUser.firstName,
                lastName: currentUser.lastName,
                otherName: null,
                gender: values.gender || currentUser.gender,
                personalId: values?.personalId || currentUser.personalId,
                personDob: personDate
            };

            postData(`${process.env.MEDICAL_API}/medical/registry/${currentUser.id}`, requestBody, 'PUT')
                .then((response)=>{
                    console.log(requestBody)
                    postData(
                        API_URL,
                        bogRequest,
                        'POST'
                    ).then(response=> Router.push(response?.links[1].href)).catch((error)=> console.log(error))
                })
        }else {
            postData(
                API_URL,
                bogRequest,
                'POST'
            ).then(response=> Router.push(response?.links[1].href))
        }
    }

    const onFinish = (values) => {
        return values ? request(values) : request()
    };

    let bodyref = useRef();

    useEffect(()=> {
        console.log(memberType);
        console.log(openMemberModal)
    },[memberType])
    
    return <>
        {
            openMemberModal && <CheckoutFamilyMember onClose={()=> setOpenMemberModal(false)} type={memberType} users={users} setUsers={setUsers} />
        }
        <div className={styles.checkoutModal} onClick={() => onClose()}></div>
        <div className={styles.container} ref={bodyref}>
            <div className={styles.bg}>
                <div className={styles.checkoutheader}>
                    <div className={styles.fmTool}>
                        <h2>ბარათის ყიდვა</h2>
                        <img src="/closeFilter.svg" onClick={() => onClose()} alt="" />
                    </div>
                </div>
                <div className={styles.checkoutContainer}>
                    <div className={styles.document}>
                        გაგრძელებით ეთანხმებით - <a href="http://s3.pirveli.com/v1/api/getFile?id=6574">წესებს და პირობებს</a>
                    </div>
                    {
                        cardTp !== 'PERCENTAGE_CLINIC_DISCOUNT_INDIVIDUAL' ? <>
                        <CurrentUser 
                            bodyref={bodyref} 
                            currentUser={currentUser} 
                            onFinish={onFinish}
                            users={users}
                            type='family'
                            setPersonDate={setPersonDate}
                        >
                            <div className={styles.users}>
                                {users.length > 0 && <h2>ოჯახის წევრები:</h2>}
                                {
                                    users && users.map((user)=> {
                                        return <>
                                            {
                                                user.id === edit ? 
                                                <>
                                                <EditUserInfo user={user} setEdit={setEdit} users={users} setUsers={(e)=>setUsers(e)} />
                                                </> : 
                                                <div className={styles.userBlock}>
                                                    <div className={styles.user}>
                                                        <div className={styles.userHead}>
                                                            <div className={styles.block}>
                                                                <h2>{user.firstName}</h2>
                                                                {
                                                                    user?.mail && 
                                                                    <span>{user.mail}</span>
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className={styles.userInfo}>
                                                            <div className={styles.infoCol}>
                                                                <ReactSVG src="/userDate.svg" />
                                                                <h4>Date of birth: {user.personDob}</h4>
                                                            </div>
                                                            <div className={styles.infoCol}>
                                                                <ReactSVG src="/userId.svg" />
                                                                <h4>ID number: {user.personalId}</h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <button 
                                                        className={styles.editBtn}
                                                        onClick={()=> setEdit(user.id)}
                                                    >
                                                        Edit Info
                                                    </button>
                                                </div>
                                            }
                                        </>
                                    })
                                }
                            </div>
                            <div className={styles.addFamilymember}>
                                <h2>დაამატე ოჯახის წევრი</h2>
                                <Select
                                    label="ოჯახის წევრი"
                                    labelStyle="inside"
                                    className={styles.servInput}
                                    value={memberType}
                                    options={[
                                        {
                                        label: "მეუღლე",
                                        value: "1",
                                        },
                                        { label: "შვილი", value: "2" },
                                    ]}
                                    onChange={(value) => {
                                        setMemberType(value);
                                        setOpenMemberModal(true)
                                    }}
                                />
                            </div>
                        </CurrentUser>
                        </>  : <CurrentUser setPersonDate={setPersonDate} type="individual" bodyref={bodyref} currentUser={currentUser} onFinish={onFinish}></CurrentUser>
                    }
                </div>
            </div>
        </div>
    </>
}

export function EditUserInfo({user, users, setEdit, setUsers}) {
    const [state, setState] = useState({});

    const bodyref = useRef();

    function editUser() {
        const newUserList = users?.map((x)=> {
            if(x.id == user.id) {
                return state
            }else {
                return x
            }
        })
        setUsers(newUserList)
        setEdit(null)

    }

    useEffect(()=> {
        for(let [key, value] of Object.entries(user)){
            setState((e)=>({...e, [key]: value}))
        }
    },[])

    return <>
        <div className={styles.userBlock} ref={bodyref}>
            <div className={styles.user}>
                <div className={styles.userHead}>
                    <div className={styles.block}>
                        <Input label="სახელი" value={state.firstName} onChange={(value)=> setState(e=> ({...e, firstName: value}))} />
                        {
                            user?.mail && 
                            <Input label="მეილი" value={state.mail} onChange={(value)=> setState(e=> ({...e, mail: value}))} />
                        }
                    </div>
                </div>
                <div className={styles.userInfo}>
                    <div className={styles.infoCol}>
                        <ReactSVG src="/userDate.svg" />
                        <DatePicker
                            className={styles.dataPicker}
                            format={"YYYY-MM-DD"}
                            defaultValue={dayjs(state.personDob, 'YYYY-MM-DD')} 
                            value={dayjs(state.date, 'YYYY-MM-DD')}
                            onChange={(date, dateString)=> setState(e=> ({...e, personDob: dateString}))}
                            placeholder="Start Date"
                            getPopupContainer={() => bodyref.current}
                        />
                    </div>
                    <div className={styles.infoCol}>
                        <ReactSVG src="/userId.svg" />
                        <Input value={state.personalId} onChange={(value)=> setState(e=> ({...e, personalId: value}))} />
                    </div>
                </div>
                <button className={styles.save} onClick={()=> editUser()}>შენახვა</button>
            </div>
        </div>
    </>
}

export function CurrentUser({currentUser, bodyref, onFinish, children, type, users=[], setPersonDate}) {
    const [state,setState] = useState(false);
    return <>
        <div className={styles.userBlock}>
            <h2>პირადი ინფორმაცია:</h2>
            <div className={styles.user}>
                <div className={styles.userHead}>
                    <div className={styles.block}>
                        <h2>{currentUser.firstName} {currentUser.lastName}</h2>
                        {
                            currentUser?.mail && 
                            <span>{currentUser.mail}</span>
                        }
                    </div>
                </div>
                <div className={styles.userInfo}>
                    <div className={styles.infoCol}>
                        <ReactSVG src="/userDate.svg" />
                        <h4>დაბადების თარიღი: {currentUser.personDob}</h4>
                    </div>
                    <div className={styles.infoCol}>
                        <ReactSVG src="/userId.svg" />
                        <h4>პირადი ნომერი: {currentUser.personalId}</h4>
                    </div>
                </div>
            </div>
        </div>
        {children}
        {
            !currentUser?.personalId && 
            <h2>დამატებითი ინფორმაცია:</h2>
        }
        <Form 
            className={styles.currentUserForm} 
            name="control-ref" 
            onFinish={onFinish}
            layout="vertical"
        >
            {
                currentUser?.personalId == null &&
                <>
                    <ANT.Checkbox defaultValue={state} onChange={(e)=> setState(e.target.checked)}>სხვა ქვეყნის მოქალაქე</ANT.Checkbox>
                    <Form.Item
                        name="personalId"
                        label="პირადი ნომერი"
                        rules={[
                            {
                                required: true,
                                len: state ?  false : 11
                            },
                        ]}
                    >
                        <Input className={styles.input} />
                    </Form.Item>
                </>

            }
            {
                currentUser?.personDob == null &&
                <Form.Item
                    name="personDob"
                    label="დაბადების თარიღი"
                    rules={[
                        {
                        required: true,
                        },
                    ]}
                >
                    <DatePicker 
                        className={styles.dataPicker}
                        placeholder='დაბადების თარიღი' 
                        onChange={(date, dateString)=> setPersonDate(dateString)}
                        getPopupContainer={() => bodyref.current}
                    />
                </Form.Item>
            }
            {
                currentUser?.gender == null && 
                <Form.Item
                    name="gender"
                    label="სქესი"
                    rules={[
                        {
                        required: true,
                        },
                    ]}
                >
                    <ANT.Select
                        placeholder="gender"
                        getPopupContainer={() => bodyref.current}
                        className={styles.select}
                        options={[
                            {
                                value: 'm',
                                label: 'კაცი',
                            },
                            {
                                value: 'f',
                                label: 'ქალი',
                            },
                        ]}
                    />
                </Form.Item>
            }
            <Form.Item {...tailLayout}>
                {
                    (type == 'individual') && 
                    <button type="Submit" className={styles.save}>ბარათის ყიდვა</button>
                }
                {
                    (type == 'family' && users.length > 0) && 
                    <button type="Submit" className={styles.save}>ბარათის ყიდვა</button>
                }
            </Form.Item>
        </Form>
    </>
}
