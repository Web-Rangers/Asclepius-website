import { useEffect, useRef } from "react";
import { useState } from "react";
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

dayjs.extend(weekday)
dayjs.extend(localeData)

  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };


//  constact info: 
//  values?.phone && {
//     "type": "phone",
//     "prefix": "995",
//     "value": values.phone,
//     "tag": "",
//     "serviceType": "",
//     "info": "" 
//  },
//  values?.mail && {
//     "type": "mail",
//     "prefix": "",
//     "value": values.mail,
//     "tag": "",
//     "serviceType": "",
//     "info": "" 
//  }

export default function Checkout({onClose, currentUser, cards, selectPack, cardType, users, setUsers}) {
    const [memberType, setMemberType] = useState('');
    const [openMemberModal, setOpenMemberModal] = useState(false);

    const [edit, setEdit] = useState(null);

    const findCard = cards?.filter((e)=> e.genericTransactionTypeId === cardType)[0];

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
                return {...userWithoutId, regId: null}
            } else {
                return {...userWithoutId, mail: null, regId: null}
            }
        })
        return manageUsersArray
    }

    async function request(values = null){
        if(values){
            let requestBody = {
                objectType: 'customer',
                id: 2000057,
                registryType: "individual",
                taxationPolicy: "notax",
                orgLegalForm: "ind",
                legalAddressId: null,
                physicalAddressId: null,
                shortDescription: "test",
                activeDocId: null,
                regDate: "2022-11-22T08:56:26",
                uuid: "f89ac3c6-9612-468a-ac98-c7eed7ecc11e",
                contactInfos: [],
                orgDisplayName: null,
                orgLegalName: null,
                orgIdentNo: null,
                orgResponsiblePerson: null,
                firstName: "vato",
                lastName: "kobulia",
                otherName: null,
                gender: values.gender || currentUser.gender,
                personalId: values?.personalId || currentUser.personalId,
                personDob: '2022-11-15'
            };

            postData(`https://medical.pirveli.ge/medical/registry/${currentUser.id}`, requestBody, 'PUT')
                .then((response)=>{
                    postData(
                        'https://medical.pirveli.ge/medical/orders/create-order', 
                        {
                            "bank_name": "bog",
                            "party_id": null,
                            "contract_id": null,
                            "user_id": null,
                            "bog_order_request_dto" : {
                                "intent": "AUTHORIZE",
                                "items": [
                                    {
                                    "amount": "0.01", //findCard?.entries[0].entryAmount
                                    "description": "regTest",
                                    "quantity": "1",
                                    "product_id": `${findCard?.genericTransactionTypeId}`
                                    }
                                ],
                                "locale": "ka",
                                "shop_order_id": "123456",
                                "redirect_url": "https://bog-banking.pirveli.ge/callback/statusChange",
                                "show_shop_order_id_on_extract": true,
                                "capture_method": "AUTOMATIC",
                                "purchase_units": [
                                    {
                                        "amount": {
                                            "currency_code": "GEL",
                                            "value": "0.01" //findCard?.entries[0].entryAmount
                                        }
                                    }
                                ]
                            },
                            "customerDTOList": selectPack == '2' ? usersArray() : null
                        },
                        'POST'
                    ).then(response=> Router.push(response?.links[1].href))
                })
        }else {
            postData(
                'https://medical.pirveli.ge/medical/orders/create-order', 
                {
                    "bank_name": "bog",
                    "party_id": null,
                    "contract_id": null,
                    "user_id": null,
                    "bog_order_request_dto" : {
                        "intent": "AUTHORIZE",
                        "items": [
                            {
                            "amount": "0.01", //findCard?.entries[0].entryAmount
                            "description": "regTest",
                            "quantity": "1",
                            "product_id": `${findCard?.genericTransactionTypeId}`
                            }
                        ],
                        "locale": "ka",
                        "shop_order_id": "123456",
                        "redirect_url": "https://bog-banking.pirveli.ge/callback/statusChange",
                        "show_shop_order_id_on_extract": true,
                        "capture_method": "AUTOMATIC",
                        "purchase_units": [
                            {
                                "amount": {
                                    "currency_code": "GEL",
                                    "value": "0.01" //findCard?.entries[0].entryAmount
                                }
                            }
                        ]
                    },
                    "customerDTOList": selectPack == '2' ? usersArray() : null
                },
                'POST'
            ).then(response=> Router.push(response?.links[1].href))
        }
    }

    const onFinish = (values) => {
        return values ? request(values) : request()
    };

    let bodyref = useRef();

    return <>
        {
            openMemberModal && <CheckoutFamilyMember onClose={()=> setOpenMemberModal(false)} type={memberType} users={users} setUsers={setUsers} />
        }
        <div className={styles.checkoutModal} onClick={() => onClose()}></div>
        <div className={styles.container} ref={bodyref}>
            <div className={styles.bg}>
                <div className={styles.checkoutheader}>
                    <div className={styles.fmTool}>
                        <h2>Checkout</h2>
                        <img src="/closeFilter.svg" onClick={() => onClose()} alt="" />
                    </div>
                </div>
                <div className={styles.checkoutContainer}>
                    <div className={styles.document}>
                        Read information about the processing of personal data here - <a href="">Document link</a>
                    </div>
                    {
                        selectPack == '2' ? <>
                        <CurrentUser 
                            bodyref={bodyref} 
                            currentUser={currentUser} 
                            onFinish={onFinish}
                            users={users}
                        >
                            <div className={styles.users}>
                                {users.length > 0 && <h2>Family members:</h2>}
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
                                                            {
                                                                user?.phone && 
                                                                <div className={styles.infoCol}>
                                                                    <ReactSVG src="/userPhone.svg" />
                                                                    <h4>Phone number: {user.phone}</h4>
                                                                </div>
                                                            }
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
                                <h2>Add family member</h2>
                                <Select
                                    label="Family member"
                                    labelStyle="inside"
                                    className={styles.servInput}
                                    value={memberType}
                                    options={[
                                        {
                                        label: "Wife / Husbend",
                                        value: "1",
                                        },
                                        { label: "Child Under 18", value: "2" },
                                        { label: "Child Above 18", value: "3" },
                                    ]}
                                    onChange={(value) => {
                                        setMemberType(value);
                                        setOpenMemberModal(true)
                                    }}
                                />
                            </div>
                        </CurrentUser>
                        </>  : <CurrentUser bodyref={bodyref} currentUser={currentUser} onFinish={onFinish}></CurrentUser>
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
                        <Input label="Name" value={state.firstName} onChange={(value)=> setState(e=> ({...e, firstName: value}))} />
                        {
                            user?.mail && 
                            <Input label="mail" value={state.mail} onChange={(value)=> setState(e=> ({...e, mail: value}))} />
                        }
                    </div>
                </div>
                <div className={styles.userInfo}>
                    {
                        user?.phone && 
                        <div className={styles.infoCol}>
                            <ReactSVG src="/userPhone.svg" />
                            <Input value={state.phone} onChange={(value)=> setState(e=> ({...e, phone: value}))} />
                        </div>
                    }
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
                <button className={styles.save} onClick={()=> editUser()}>save</button>
            </div>
        </div>
    </>
}

export function CurrentUser({currentUser, bodyref, onFinish, children, users=[]}) {
    return <>
        <div className={styles.userBlock}>
            <h2>Your information:</h2>
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
                    {
                        currentUser?.phone && 
                        <div className={styles.infoCol}>
                            <ReactSVG src="/userPhone.svg" />
                            <h4>Phone number: {user.phone}</h4>
                        </div>
                    }
                    <div className={styles.infoCol}>
                        <ReactSVG src="/userDate.svg" />
                        <h4>Date of birth: {currentUser.personDob}</h4>
                    </div>
                    <div className={styles.infoCol}>
                        <ReactSVG src="/userId.svg" />
                        <h4>ID number: {currentUser.personalId}</h4>
                    </div>
                </div>
            </div>
        </div>
        {children}
        <h2>Additional personal information:</h2>
        <Form 
            className={styles.currentUserForm} 
            name="control-ref" 
            onFinish={onFinish}
            layout="vertical"
        >
            {
                currentUser?.personalId == null &&
                <Form.Item
                    name="personalId"
                    label="Personlal ID"
                    rules={[
                        {
                        required: true,
                        len: 11
                        },
                    ]}
                >
                    <Input className={styles.input} />
                </Form.Item>
            }
            {
                currentUser?.phone == null &&
                <Form.Item
                    name="phone"
                    label="Phone"
                    rules={[
                        {
                        required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            }
            {
                currentUser?.personDob == null &&
                <Form.Item
                    name="personDob"
                    label="Date of birthday"
                    rules={[
                        {
                        required: true,
                        },
                    ]}
                >
                    <DatePicker 
                        className={styles.dataPicker}
                        getPopupContainer={() => bodyref.current}
                        placeholder='Date of birth' 
                    />
                </Form.Item>
            }
            {
                currentUser?.gender == null && 
                <Form.Item
                    name="gender"
                    label="Gender"
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
                                label: 'Male',
                            },
                            {
                                value: 'f',
                                label: 'Female',
                            },
                        ]}
                    />
                </Form.Item>
            }
            <Form.Item {...tailLayout}>
                {
                    users.length > 0 &&
                    <button htmlType="Submit" className={styles.save}>Buy card</button>
                }
            </Form.Item>
        </Form>
    </>
}