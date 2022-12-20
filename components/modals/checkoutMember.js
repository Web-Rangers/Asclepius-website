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
                        if(value.toString().length < 11) {
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
                    <h2>Add family member</h2>
                </div>
            </div>
            <div className={styles.checkoutContainer}>
                <div className={styles.document}>
                    Read information about the processing of personal data here - <a href="">Document link</a>
                </div>
                {
                    type == '3' && <Above18 
                                        userInfo={userInfo} 
                                        setUserInfo={(e)=> setUserInfo(e)} 
                                        validation={validation} 
                                        validationList={validationList}
                                        setIdNumLength={setIdNumLength}
                                    /> 
                                || 
                    type == '2' && <Under18 
                                        userInfo={userInfo} 
                                        setUserInfo={(e)=> setUserInfo(e)} 
                                        validation={validation} 
                                        validationList={validationList}
                                        setIdNumLength={setIdNumLength}
                                    /> 
                                || 
                    type == '1' && <WifeOrHusband 
                                        userInfo={userInfo} 
                                        setUserInfo={(e)=> setUserInfo(e)} 
                                        validation={validation} 
                                        validationList={validationList}
                                        setIdNumLength={setIdNumLength}
                                    />
                }

                <div className={styles.btnControl}>
                    <button className={styles.cancel} onClick={()=> onClose()}>Cancel</button>
                    <button className={styles.save} onClick={()=> addMember()}>Add member</button>
                </div>
            </div>
        </div>
    </>
}


export function Above18({userInfo, setUserInfo, validation, validationList, setIdNumLength}) {
    const bodyref = useRef();

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
            <ant.Checkbox onChange={onChange}>სხვა ქვეყნის მოქალაქე</ant.Checkbox>
            <Input 
                label="Id number" 
                className={styles.servInput}
                style={classNames(styles.servInput, {
                    [styles.validationInput]: validationList.findIndex((e)=> e == 'personalId') !== -1,
                    [styles.removeValidation]: userInfo?.personalId?.toString().length > 10,
                })}  
                placeholder="Id number" 
                value={userInfo?.personalId}
                onChange={(e)=> setUserInfo(values=> ({...values, personalId: e}))}
            />
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

export function WifeOrHusband({userInfo, setUserInfo, validation, validationList, setIdNumLength}) {
    const bodyref = useRef();

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
                label="Wife / husbend’s name" 
                style={classNames(styles.servInput, {
                    [styles.validationInput]: validationList.findIndex((e)=> e == 'firstName') !== -1,
                    [styles.removeValidation]: userInfo?.firstName,
                })} 
                placeholder="Name" 
                value={userInfo.firstName}
                onChange={(e)=> setUserInfo(values=> ({...values, firstName: e}))}
            />
            <Input 
                label="Wife / husbend’s surname" 
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
            <ant.Checkbox onChange={onChange}>სხვა ქვეყნის მოქალქე</ant.Checkbox>
            <Input 
                label="Id number" 
                className={styles.servInput}
                style={classNames(styles.servInput, {
                    [styles.validationInput]: validationList.findIndex((e)=> e == 'personalId') !== -1,
                    [styles.removeValidation]: userInfo?.personalId?.toString().length > 10,
                })}  
                placeholder="Id number" 
                value={userInfo?.personalId}
                onChange={(e)=> setUserInfo(values=> ({...values, personalId: e}))}
            />
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

export function Under18({userInfo, setUserInfo, validation, validationList, setIdNumLength}) {
    const bodyref = useRef();

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
            <ant.Checkbox onChange={onChange}>სხვა ქვეყნის მოქალაქე</ant.Checkbox>
            <Input 
                label="Id number" 
                className={styles.servInput}
                style={classNames(styles.servInput, {
                    [styles.validationInput]: validationList.findIndex((e)=> e == 'personalId') !== -1,
                    [styles.removeValidation]: userInfo?.personalId?.toString().length > 10,
                })}  
                placeholder="Id number" 
                value={userInfo?.personalId}
                onChange={(e)=> setUserInfo(values=> ({...values, personalId: e}))}
            />
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

