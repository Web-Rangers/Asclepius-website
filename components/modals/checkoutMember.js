import {useState, useRef} from 'react';
import Select from "../../components/Select";
import Input from "../../components/Input";
import Button from "../../components/ui/Button";
import { DatePicker, Space } from 'antd';
import styles from "../../styles/components/modals/checkoutMember.module.css";
import 'antd/dist/antd.css';
import { ReactSVG } from 'react-svg';
import { useEffect } from 'react';
import classNames from 'classnames';
import * as ant from 'antd';

export default function CheckoutFamilyMember({onClose, type, users, setUsers}) {
    const [userInfo, setUserInfo] = useState({});
    const [validation, setValidation] = useState(false)
    const [validationList, setValidationList] = useState([])
    const [idNumLength, setIdNumLength] = useState(false);

    function addMember() {
        setValidationList([])
        let valid = false;

        for(let [key, value] of Object.entries(userInfo)){
            if(!value) {
                valid = true;
                setValidationList((e)=> ([...e, key]))
                setValidation(true)
            }else {
                if(key == 'personalId'){
                    if(!idNumLength){
                        if(value.toString().length !== 11) {
                            valid = true;
                            setValidationList((e)=> ([...e, key]))
                            setValidation(true)
                        }
                    }
                }
            }
        }

        console.log(validationList)

        if(!valid) {
            setUsers((state)=> ([...state, userInfo]))
            onClose()
        }
    }

    return <>
        <div className={styles.checkoutModal} onClick={() => onClose()}></div>
        <div className={styles.container}>
            <div className={styles.checkoutheader}>
                <div className={styles.fmTool}>
                    <ReactSVG className={styles.back} src="/backToCheckout.svg" onClick={() => onClose()} />
                    <h2>ოჯახის წევრის დამატება</h2>
                </div>
            </div>
            <div className={styles.checkoutContainer}>
                <div className={styles.document}>
                    გაგრძელებით ეთანხმებით - <a href="http://s3.pirveli.com/v1/api/getFile?id=6574">წესებს და პირობებს</a>
                </div>
                {
                    type == '2' && <Under18 
                                        userInfo={userInfo} 
                                        setUserInfo={(e)=> setUserInfo(e)} 
                                        validation={validation} 
                                        validationList={validationList}
                                        idNumLength={idNumLength}
                                        setIdNumLength={setIdNumLength}
                                    /> 
                                || 
                    type == '1' && <WifeOrHusband 
                                        userInfo={userInfo} 
                                        setUserInfo={(e)=> setUserInfo(e)} 
                                        validation={validation} 
                                        validationList={validationList}
                                        idNumLength={idNumLength}
                                        setIdNumLength={setIdNumLength}
                                    />
                }

                <div className={styles.btnControl}>
                    <button className={styles.cancel} onClick={()=> onClose()}>გაუქმება</button>
                    <button className={styles.save} onClick={()=> addMember()}>დამატება</button>
                </div>
            </div>
        </div>
    </>
}


export function Above18({userInfo, setUserInfo, validation, validationList, idNumLength, setIdNumLength}) {
    const bodyref = useRef();
    const [idCheck, setIdCheck] = useState('');

    useEffect(()=> {
        setUserInfo({
            objectType: "customer",
            registryType: "individual",
            taxationPolicy: "notax",
            orgLegalForm: "ind",
            firstName: '',
            lastName: '',
            mail: '',
            personalId: '',
            personDob: '',
            gender: '',
            otherName: "othername",
            id: Math.floor(Math.random() * 10000)
        })
    },[])

    const onChange = (e) => {
        setIdNumLength(e.target.checked);
    };
    
    return <>
        <div className={styles.form} ref={bodyref}>
            <Input 
                label="Child’s name" 
                style={classNames(styles.servInput, {
                    [styles.validationInput]: validationList.findIndex((e)=> e == 'firstName') !== -1,
                    [styles.removeValidation]: userInfo?.firstName,
                })} 
                placeholder="Name" 
                value={userInfo.firstName}
                onChange={(e)=> setUserInfo(values=> ({...values, firstName: e}))}
            />
            <Input 
                label="Child’s surname" 
                style={classNames(styles.servInput, {
                    [styles.validationInput]: validationList.findIndex((e)=> e == 'lastName') !== -1,
                    [styles.removeValidation]: userInfo?.lastName,
                })} 
                placeholder="Surname" 
                value={userInfo.lastName}
                onChange={(e)=> setUserInfo(values=> ({...values, lastName: e}))}
            />
            <Input 
                label="Mail" 
                style={classNames(styles.servInput, {
                    [styles.validationInput]: validationList.findIndex((e)=> e == 'mail') !== -1,
                    [styles.removeValidation]: userInfo?.mail,
                })} 
                placeholder="Mail" 
                value={userInfo.mail}
                onChange={(e)=> setUserInfo(values=> ({...values, mail: e}))}
            />
            <ant.Checkbox onChange={onChange}>სხვა ქვეყნის მოქალაქე / პასპორტი</ant.Checkbox>
            <Input 
                label="Id number" 
                className={styles.servInput}
                style={classNames(styles.servInput, {
                    [styles.validationInput]: validationList.findIndex((e)=> e == 'personalId') !== -1,
                    [styles.removeValidation]: userInfo?.personalId?.toString().length > 10,
                })}  
                placeholder="Id number" 
                value={userInfo?.personalId}
                onChange={(e)=> {setUserInfo(values=> ({...values, personalId: e})); setIdCheck(e)}}
            />
            {!idNumLength ? 
                idCheck?.length == 11 ? '' : <span className={styles.warning}>*უნდა შეიყვანოთ 11 ციფრი</span> : ''
            }
            <div className={styles.birth}>
                <h2>Date of birth</h2>
                <DatePicker 
                    className={classNames(styles.dataPicker, {
                        [styles.validationDate]: validationList.findIndex((e)=> e == 'personDob') !== -1,
                        [styles.removevalidationDate]: userInfo?.personDob,
                    })}  
                    placeholder='Date of birth' 
                    onChange={(date, dateString)=> setUserInfo(values=> ({...values, personDob: dateString}))}
                    getPopupContainer={() => bodyref.current}
                />
            </div>
            <Select
                label="Gender"
                labelStyle="outside"
                value={userInfo.gender}
                onChange={(e)=> setUserInfo(values=> ({...values, gender: e}))}
                className={classNames(styles.servInput, {
                    [styles.selectValidation]: validationList.findIndex((e)=> e == 'gender') !== -1,
                    [styles.removeSelectValid]: userInfo?.gender,
                })}  
                options={[
                {
                    label: "Male",
                    value: "m",
                },
                { label: "Female", value: "f" },
                ]}
            />
        </div>
        {
            validation && 
            <div className={styles.validation}>
                Please, fill all the inputs
            </div>
        }
    </>
} 

export function WifeOrHusband({userInfo, setUserInfo, validation, validationList, idNumLength, setIdNumLength}) {
    const bodyref = useRef();
    const [idCheck, setIdCheck] = useState('');

    useEffect(()=> {
        setUserInfo({
            objectType: "customer",
            registryType: "individual",
            taxationPolicy: "notax",
            orgLegalForm: "ind",
            phone: '',
            firstName: '',
            lastName: '',
            mail: '',
            personalId: '',
            personDob: '',
            gender: '',
            otherName: "othername",
            id: Math.floor(Math.random() * 10000)
        })
    },[])

    const onChange = (e) => {
        setIdNumLength(e.target.checked);
    };
    
    return <>
        <div className={styles.form} ref={bodyref}>
            <Input 
                label="მეუღლის სახელი" 
                style={classNames(styles.servInput, {
                    [styles.validationInput]: validationList.findIndex((e)=> e == 'firstName') !== -1,
                    [styles.removeValidation]: userInfo?.firstName,
                })} 
                placeholder="სახელი" 
                value={userInfo.firstName}
                onChange={(e)=> setUserInfo(values=> ({...values, firstName: e}))}
            />
            <Input 
                label="მეუღლის გვარი" 
                style={classNames(styles.servInput, {
                    [styles.validationInput]: validationList.findIndex((e)=> e == 'lastName') !== -1,
                    [styles.removeValidation]: userInfo?.lastName,
                })} 
                placeholder="გვარი" 
                value={userInfo.lastName}
                onChange={(e)=> setUserInfo(values=> ({...values, lastName: e}))}
            />
             <Input 
                label="ტელეფონი" 
                style={classNames(styles.servInput, {
                    [styles.validationInput]: validationList.findIndex((e)=> e == 'phone') !== -1,
                    [styles.removeValidation]: userInfo?.phone,
                })} 
                placeholder="ტელეფონი" 
                value={userInfo.phone}
                onChange={(e)=> setUserInfo(values=> ({...values, phone: e}))}
            />
            <Input 
                label="მეილი" 
                style={classNames(styles.servInput, {
                    [styles.validationInput]: validationList.findIndex((e)=> e == 'mail') !== -1,
                    [styles.removeValidation]: userInfo?.mail,
                })} 
                placeholder="მეილი" 
                value={userInfo.mail}
                onChange={(e)=> setUserInfo(values=> ({...values, mail: e}))}
            />
            <ant.Checkbox onChange={onChange}>სხვა ქვეყნის მოქალქე / პასპორტი</ant.Checkbox>
            <Input 
                label="პირადი ნომერი" 
                className={styles.servInput}
                style={classNames(styles.servInput, {
                    [styles.validationInput]: validationList.findIndex((e)=> e == 'personalId') !== -1,
                    [styles.removeValidation]: userInfo?.personalId?.toString().length > 10,
                })}  
                placeholder="პირადიდ ნომერი" 
                value={userInfo?.personalId}
                onChange={(e)=> {setUserInfo(values=> ({...values, personalId: e})); setIdCheck(e)}}
            />
            {!idNumLength ? 
                idCheck?.length == 11 ? '' : <span className={styles.warning}>*უნდა შეიყვანოთ 11 ციფრი</span> : ''
            }
            <div className={styles.birth}>
                <h2>დაბადების თარიღი</h2>
                <DatePicker 
                    className={classNames(styles.dataPicker, {
                        [styles.validationDate]: validationList.findIndex((e)=> e == 'personDob') !== -1,
                        [styles.removevalidationDate]: userInfo?.personDob,
                    })}  
                    placeholder='დაბადების თარიღი' 
                    onChange={(date, dateString)=> setUserInfo(values=> ({...values, personDob: dateString}))}
                    getPopupContainer={() => bodyref.current}
                />
            </div>
            <Select
                label="სქესი"
                labelStyle="outside"
                value={userInfo.gender}
                onChange={(e)=> setUserInfo(values=> ({...values, gender: e}))}
                className={classNames(styles.servInput, {
                    [styles.selectValidation]: validationList.findIndex((e)=> e == 'gender') !== -1,
                    [styles.removeSelectValid]: userInfo?.gender,
                })}  
                options={[
                {
                    label: "კაცი",
                    value: "m",
                },
                { label: "ქალი", value: "f" },
                ]}
            />
        </div>
        {
            validation && 
            <div className={styles.validation}>
                შეავსეთ ყველა ველი
            </div>
        }
    </>
} 

export function Under18({userInfo, setUserInfo, validation, validationList, idNumLength, setIdNumLength}) {
    const bodyref = useRef();
    const [idCheck, setIdCheck] = useState('');

    useEffect(()=> {
        setUserInfo({
            objectType: "customer",
            registryType: "individual",
            taxationPolicy: "notax",
            orgLegalForm: "ind",
            firstName: '',
            lastName: '',
            personalId: '',
            personDob: '',
            gender: '',
            otherName: "othername",
            id: Math.floor(Math.random() * 10000)
        })
    },[])

    const onChange = (e) => {
        setIdNumLength(e.target.checked);
    };

    return <>
        <div className={styles.form} ref={bodyref}>
            <Input 
                label="შვილის სახელი" 
                style={classNames(styles.servInput, {
                    [styles.validationInput]: validationList.findIndex((e)=> e == 'firstName') !== -1,
                    [styles.removeValidation]: userInfo?.firstName,
                })} 
                placeholder="სახელი" 
                value={userInfo.firstName}
                onChange={(e)=> setUserInfo(values=> ({...values, firstName: e}))}
            />
            <Input 
                label="შვილის გვარი" 
                style={classNames(styles.servInput, {
                    [styles.validationInput]: validationList.findIndex((e)=> e == 'lastName') !== -1,
                    [styles.removeValidation]: userInfo?.lastName,
                })} 
                placeholder="გვარი" 
                value={userInfo.lastName}
                onChange={(e)=> setUserInfo(values=> ({...values, lastName: e}))}
            />
            <ant.Checkbox onChange={onChange}>სხვა ქვეყნის მოქალაქე / პასპორტი</ant.Checkbox>
            <Input 
                label="პირადი ნომერი" 
                className={styles.servInput}
                style={classNames(styles.servInput, {
                    [styles.validationInput]: validationList.findIndex((e)=> e == 'personalId') !== -1,
                    [styles.removeValidation]: userInfo?.personalId?.toString().length > 10,
                })}  
                placeholder="პირადი ნომერი" 
                value={userInfo?.personalId}
                onChange={(e)=> {setUserInfo(values=> ({...values, personalId: e}));setIdCheck(e)}}
            />
            {!idNumLength ? 
                idCheck?.length == 11 ? '' : <span className={styles.warning}>*უნდა შეიყვანოთ 11 ციფრი</span> : ''
            }
            <div className={styles.birth}>
                <h2>დაბადების თარიღი</h2>
                <DatePicker 
                    className={classNames(styles.dataPicker, {
                        [styles.validationDate]: validationList.findIndex((e)=> e == 'personDob') !== -1,
                        [styles.removevalidationDate]: userInfo?.personDob,
                    })}  
                    placeholder='დაბადების თარიღი' 
                    onChange={(date, dateString)=> setUserInfo(values=> ({...values, personDob: dateString}))}
                    getPopupContainer={() => bodyref.current}
                />
            </div>
            <Select
                label="სქესი"
                labelStyle="outside"
                value={userInfo.gender}
                onChange={(e)=> setUserInfo(values=> ({...values, gender: e}))}
                className={classNames(styles.servInput, {
                    [styles.selectValidation]: validationList.findIndex((e)=> e == 'gender') !== -1,
                    [styles.removeSelectValid]: userInfo?.gender,
                })}  
                options={[
                {
                    label: "კაცი",
                    value: "m",
                },
                { label: "ქალი", value: "f" },
                ]}
            />
        </div>
        {
            validation && 
            <div className={styles.validation}>
                შეავსეთ ყველა ველი
            </div>
        }
    </>
} 

