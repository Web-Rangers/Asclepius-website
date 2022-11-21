import { useEffect, useRef } from "react";
import { useState } from "react";
import { ReactSVG } from "react-svg";
import Select from "../../components/Select";
import styles from "../../styles/components/modals/checkout.module.css";
import CheckoutFamilyMember from './checkoutMember';
import Input from "../../components/Input";
import { DatePicker, Space } from 'antd';
import 'antd/dist/antd.css';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import {postData} from '../request';
import Router from 'next/router';

dayjs.extend(weekday)
dayjs.extend(localeData)

export default function Checkout({onClose, cards, cardType, users, setUsers}) {
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

    return <>
        {
            openMemberModal && <CheckoutFamilyMember onClose={()=> setOpenMemberModal(false)} type={memberType} users={users} setUsers={setUsers} />
        }
        <div className={styles.checkoutModal} onClick={() => onClose()}></div>
        <div className={styles.container}>
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
                    <div className={styles.users}>
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
                                                        <h2>{user.name}</h2>
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
                                                        <h4>Date of birth: {user.date}</h4>
                                                    </div>
                                                    <div className={styles.infoCol}>
                                                        <ReactSVG src="/userId.svg" />
                                                        <h4>ID number: {user.idNumber}</h4>
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
                    {
                        users.length > 0 && 
                        <>
                            <button className={styles.save} onClick={()=> postData(
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
                                    "customerDTOList": usersArray()
                                  },
                                'POST'
                            ).then(response=> Router.push(response?.links[1].href))}>Buy card</button>
                        </>
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
                        <Input label="Name" value={state.name} onChange={(value)=> setState(e=> ({...e, name: value}))} />
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
                            defaultValue={dayjs(state.date, 'YYYY-MM-DD')} 
                            value={dayjs(state.date, 'YYYY-MM-DD')}
                            onChange={(date, dateString)=> setState(e=> ({...e, date: dateString}))}
                            placeholder="Start Date"
                            getPopupContainer={() => bodyref.current}
                        />
                    </div>
                    <div className={styles.infoCol}>
                        <ReactSVG src="/userId.svg" />
                        <Input value={state.idNumber} onChange={(value)=> setState(e=> ({...e, idNumber: value}))} />
                    </div>
                </div>
                <button className={styles.save} onClick={()=> editUser()}>save</button>
            </div>
        </div>
    </>
}