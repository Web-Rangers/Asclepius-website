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

export default function CheckoutFamilyMember({onClose, type, users, setUsers}) {
    const [userInfo, setUserInfo] = useState({});
    const [validation, setValidation] = useState(false)
    const [validationList, setValidationList] = useState([])

    function addMember() {
        setValidationList([])
        let valid = false;

        for(let [key, value] of Object.entries(userInfo)){
            if(!value) {
                valid = true;
                setValidationList((e)=> ([...e, key]))
                setValidation(true)
            }
        }

        console.log(validationList,validationList.findIndex((e)=> e == 'surname'))

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
                                    /> 
                                || 
                    type == '2' && <Under18 
                                        userInfo={userInfo} 
                                        setUserInfo={(e)=> setUserInfo(e)} 
                                        validation={validation} 
                                        validationList={validationList}
                                    /> 
                                || 
                    type == '1' && <WifeOrHusband 
                                        userInfo={userInfo} 
                                        setUserInfo={(e)=> setUserInfo(e)} 
                                        validation={validation} 
                                        validationList={validationList}
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


export function Above18({userInfo, setUserInfo, validation, validationList}) {
    const bodyref = useRef();

    useEffect(()=> {
        setUserInfo({
            name: '',
            surname: '',
            mail: '',
            idNumber: '',
            date: '',
            gender: '',
            id: Math.floor(Math.random() * 10000)
        })
    },[])
    
    return <>
        <div className={styles.form} ref={bodyref}>
            <Input 
                label="Child’s name" 
                style={classNames(styles.servInput, {
                    [styles.validationInput]: validationList.findIndex((e)=> e == 'name') !== -1,
                    [styles.removeValidation]: userInfo?.name,
                })} 
                placeholder="Name" 
                value={userInfo.name}
                onChange={(e)=> setUserInfo(values=> ({...values, name: e}))}
            />
            <Input 
                label="Child’s surname" 
                style={classNames(styles.servInput, {
                    [styles.validationInput]: validationList.findIndex((e)=> e == 'surname') !== -1,
                    [styles.removeValidation]: userInfo?.surname,
                })} 
                placeholder="Surname" 
                value={userInfo.surname}
                onChange={(e)=> setUserInfo(values=> ({...values, surname: e}))}
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
            <Input 
                label="Id number" 
                className={styles.servInput}
                style={classNames(styles.servInput, {
                    [styles.validationInput]: validationList.findIndex((e)=> e == 'idNumber') !== -1,
                    [styles.removeValidation]: userInfo?.idNumber,
                })}  
                placeholder="Id number" 
                value={userInfo.idNumber}
                onChange={(e)=> setUserInfo(values=> ({...values, idNumber: e}))}
            />
            <div className={styles.birth}>
                <h2>Date of birth</h2>
                <DatePicker 
                    className={classNames(styles.dataPicker, {
                        [styles.validationDate]: validationList.findIndex((e)=> e == 'date') !== -1,
                        [styles.removevalidationDate]: userInfo?.date,
                    })}  
                    placeholder='Date of birth' 
                    onChange={(date, dateString)=> setUserInfo(values=> ({...values, date: dateString}))}
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

export function WifeOrHusband({userInfo, setUserInfo, validation, validationList}) {
    const bodyref = useRef();

    useEffect(()=> {
        setUserInfo({
            name: '',
            surname: '',
            mail: '',
            idNumber: '',
            date: '', 
            gender: '',
            id: Math.floor(Math.random() * 10000)
        })
    },[])
    
    return <>
        <div className={styles.form} ref={bodyref}>
            <Input 
                label="Wife / husbend’s name" 
                style={classNames(styles.servInput, {
                    [styles.validationInput]: validationList.findIndex((e)=> e == 'name') !== -1,
                    [styles.removeValidation]: userInfo?.name,
                })} 
                placeholder="Name" 
                value={userInfo.name}
                onChange={(e)=> setUserInfo(values=> ({...values, name: e}))}
            />
            <Input 
                label="Wife / husbend’s surname" 
                style={classNames(styles.servInput, {
                    [styles.validationInput]: validationList.findIndex((e)=> e == 'surname') !== -1,
                    [styles.removeValidation]: userInfo?.surname,
                })} 
                placeholder="Surname" 
                value={userInfo.surname}
                onChange={(e)=> setUserInfo(values=> ({...values, surname: e}))}
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
            <Input 
                label="Id number" 
                className={styles.servInput}
                style={classNames(styles.servInput, {
                    [styles.validationInput]: validationList.findIndex((e)=> e == 'idNumber') !== -1,
                    [styles.removeValidation]: userInfo?.idNumber,
                })}  
                placeholder="Id number" 
                value={userInfo.idNumber}
                onChange={(e)=> setUserInfo(values=> ({...values, idNumber: e}))}
            />
            <div className={styles.birth}>
                <h2>Date of birth</h2>
                <DatePicker 
                    className={classNames(styles.dataPicker, {
                        [styles.validationDate]: validationList.findIndex((e)=> e == 'date') !== -1,
                        [styles.removevalidationDate]: userInfo?.date,
                    })}  
                    placeholder='Date of birth' 
                    onChange={(date, dateString)=> setUserInfo(values=> ({...values, date: dateString}))}
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

export function Under18({userInfo, setUserInfo, validation, validationList}) {
    const bodyref = useRef();

    useEffect(()=> {
        setUserInfo({
            name: '',
            surname: '',
            idNumber: '',
            date: '', 
            gender: '',
            id: Math.floor(Math.random() * 10000)
        })
    },[])
    
    return <>
        <div className={styles.form} ref={bodyref}>
            <Input 
                label="Child’s name" 
                style={classNames(styles.servInput, {
                    [styles.validationInput]: validationList.findIndex((e)=> e == 'name') !== -1,
                    [styles.removeValidation]: userInfo?.name,
                })} 
                placeholder="Name" 
                value={userInfo.name}
                onChange={(e)=> setUserInfo(values=> ({...values, name: e}))}
            />
            <Input 
                label="Child’s surname" 
                style={classNames(styles.servInput, {
                    [styles.validationInput]: validationList.findIndex((e)=> e == 'surname') !== -1,
                    [styles.removeValidation]: userInfo?.surname,
                })} 
                placeholder="Surname" 
                value={userInfo.surname}
                onChange={(e)=> setUserInfo(values=> ({...values, surname: e}))}
            />
            <Input 
                label="Id number" 
                className={styles.servInput}
                style={classNames(styles.servInput, {
                    [styles.validationInput]: validationList.findIndex((e)=> e == 'idNumber') !== -1,
                    [styles.removeValidation]: userInfo?.idNumber,
                })}  
                placeholder="Id number" 
                value={userInfo.idNumber}
                onChange={(e)=> setUserInfo(values=> ({...values, idNumber: e}))}
            />
            <div className={styles.birth}>
                <h2>Date of birth</h2>
                <DatePicker 
                    className={classNames(styles.dataPicker, {
                        [styles.validationDate]: validationList.findIndex((e)=> e == 'date') !== -1,
                        [styles.removevalidationDate]: userInfo?.date,
                    })}  
                    placeholder='Date of birth' 
                    onChange={(date, dateString)=> setUserInfo(values=> ({...values, date: dateString}))}
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

