import {useState} from 'react';
import styles from '../../../styles/pages/clinic.module.css';
import classNames from 'classnames';
import CheckBox from '../../../components/ui/CheckBox';
import Button from '../../../components/ui/Button';
import Select from '../../../components/Select';
import DatePicker from '../../../components/DatePicker';
import ConfirmedModal from '../../../components/modals/confrimedModal';
import Image from "next/image";

export default function Checkout() {
    const [patient, setPatient] = useState('');

    const [done, setDone] = useState(false);
    
    const [date, setDate] = useState('');

    return <>
        <div className={styles.clinicBody}>
            <div className={styles.clinicContent}>
                <div className={styles.clinicLogoContent}>
                    <Image layout="fill" src="/clinicDocLogo.svg" className={styles.logo} alt="" />
                </div>
                <div className={styles.clinicAnalyisis}>
                    <div className={styles.analysH}>
                        <h2>Booking page</h2>
                    </div>
                    <div className={styles.bookingContent}>
                        <Image layout="fill" src="/companyLogo.png" alt=""/>
                        <div className={styles.bookingTitle}>
                            <h2>Atcare Clinic</h2>
                            <div>
                                <Image layout="fill" src="/location_comp.svg" alt=""/>
                                <span>Carymouth , Hallmark Clinic</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.bookingService}>
                        <h2>Services</h2>
                        <div className={styles.activeBlock}>
                            <div className={styles.analist}>
                                <CheckBox id={1} defaultChecked={true} /> 
                                <h2>Blood analysis</h2>
                                <h3>$ 40.99</h3>
                            </div>
                            <div className={styles.analist}>
                                <CheckBox id={1} defaultChecked={true} /> 
                                <h2>Urine analysis</h2>
                                <h3>$ 47.99</h3>
                            </div>
                        </div>
                    </div>
                    <div className={styles.bookingPatient}>
                        <h2>Patient</h2>
                        <Select
                            label="Choose patient"
                            labelStyle="inside"
                            className={styles.servInput}
                            options={[
                                {
                                    label: "4140 Parker Rd",
                                    value: "1",
                                },
                                { label: "Another Branch", value: "2" },
                            ]}
                            onChange={(value) => {
                                setPatient(value);
                            }}
                        />
                        {
                            patient !== '' && 
                            <>
                                <DatePicker
                                    mode="single"
                                    label="Time"
                                    className={styles.datepicker}
                                />
                                <div className={styles.dates}>
                                    <div className={styles.dateList}>
                                        <button
                                            className={classNames(styles.selectBtn,{[styles.activeBtn]: date === '11:29'})}
                                            onClick={() =>
                                                setDate('11:29')
                                            }
                                        >
                                            11:29
                                        </button>
                                        <button
                                            className={classNames(styles.selectBtn,{[styles.activeBtn]: date === '13:20'})}
                                            onClick={() =>
                                                setDate('13:20')
                                            }
                                        >
                                            13:20
                                        </button>
                                        <button
                                            className={classNames(styles.selectBtn,{[styles.activeBtn]: date === '14:00'})}
                                            onClick={() =>
                                                setDate('14:00')
                                            }
                                        >
                                            14:00
                                        </button>
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                    <div className={styles.bookingPatient}>
                        <Button
                            name="Next"
                            style={styles.doneBtn}
                            onClick={()=>setDone(true)}
                        />
                    </div>
                </div>
            </div>
        </div>
        {
            done && <ConfirmedModal onClose={()=> setDone(false)}/>
        }
    </>
}

// {
//     <div className={styles.listItem}>
//     <div 
//         className={classNames(styles.clinic, {
//             [styles.activeAnBlock]: blockId !== '' && true 
//         })} 
//         onClick={()=> blockId == '1' ? setBlockId('') : setBlockId('1')}
//     >
//         <Image layout="fill" src="/iconPlaceholder.svg" alt="" />
//         <h2>Blood analysis</h2>
//         <Image layout="fill" className={styles.arrow} src="/clinArrow.svg" alt="" />
//     </div>
//     <div className={classNames(styles.analysis, {
//         [styles.activeBlock]: blockId === '1' && true 
//     })}>
//         <div className={styles.analist}>
//             <CheckBox id={1} /> 
//             <h2>Blood analysis</h2>
//             <h3>$ 40.99</h3>
//         </div>
//         <div className={styles.analist}>
//             <CheckBox id={2} /> 
//             <h2>Urine analysis</h2>
//             <h3>$ 40.99</h3>
//         </div>
//         <div className={styles.analist}>
//             <CheckBox id={3} /> 
//             <h2>Covid 19</h2>
//             <h3>$ 40.99</h3>
//         </div>
//         <div className={styles.analist}>
//             <CheckBox id={4} /> 
//             <h2>Other</h2>
//             <h3>$ 40.99</h3>
//         </div>
//     </div>
// </div>
// }