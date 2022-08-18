import {useState} from 'react';
import styles from '../../styles/pages/clinic.module.css';
import classNames from 'classnames';
import CheckBox from '../../components/ui/CheckBox';
import Button from '../../components/ui/Button';
import ConfirmedModal from '../../components/modals/confrimedModal';
import Link from 'next/link';

export default function Clinic() {
    const [blockId, setBlockId] = useState('');
    const [done, setDone] = useState(false);
    
    return <>
        <div className={styles.clinicBody}>
            <div className={styles.clinicContent}>
                <div className={styles.clinicLogoContent}>
                    <img src="/clinicDocLogo.svg" className={styles.logo} alt="" />
                </div>
                <div className={styles.clinicAnalyisis}>
                    <div className={styles.analysH}>
                        <h2>Choose Clinic</h2>
                    </div>
                    <div className={styles.searchBlock}>
                        {
                            blockId == '' && 
                            <input 
                                className={styles.searchInput} 
                                type="search" 
                                placeholder="search" 
                            />
                        }
                        <div className={classNames(styles.clinicsList, {
                            [styles.activeSearch]: true,
                            [styles.activeClinicBlocks]: blockId !== '' && true
                        })}>
                            {
                                blockId == '' && 
                                <div className={styles.listH}>
                                    <h2>Clinics</h2>
                                </div>
                            }
                            <Link href="clinic/branches">
                                <div className={styles.listItem}>
                                    <div 
                                        className={classNames(styles.clinic, {
                                            [styles.activeAnBlock]: blockId !== '' && true 
                                        })}
                                    >
                                        <img src="/clniicLogo1.svg" alt="" />
                                        <h2>Blood analysis</h2>
                                        <img className={styles.arrow} src="/clinArrow.svg" alt="" />
                                    </div>
                                </div>
                            </Link>
                            <Link href="clinic/branches">
                                <div className={styles.listItem}>
                                    <div 
                                        className={classNames(styles.clinic, {
                                            [styles.activeAnBlock]: blockId !== '' && true 
                                        })}
                                    >
                                        <img src="/clniicLogo2.svg" alt="" />
                                        <h2>Blood analysis</h2>
                                        <img className={styles.arrow} src="/clinArrow.svg" alt="" />
                                    </div>
                                </div>
                            </Link>
                            <Link href="clinic/branches">
                                <div className={styles.listItem}>
                                    <div 
                                        className={classNames(styles.clinic, {
                                            [styles.activeAnBlock]: blockId !== '' && true 
                                        })}
                                    >
                                        <img src="/clniicLogo3.svg" alt="" />
                                        <h2>Blood analysis</h2>
                                        <img className={styles.arrow} src="/clinArrow.svg" alt="" />
                                    </div>
                                </div>
                            </Link>
                            <Link href="clinic/branches">
                                <div className={styles.listItem}>
                                    <div 
                                        className={classNames(styles.clinic, {
                                            [styles.activeAnBlock]: blockId !== '' && true 
                                        })}
                                    >
                                        <img src="/clniicLogo4.svg" alt="" />
                                        <h2>Blood analysis</h2>
                                        <img className={styles.arrow} src="/clinArrow.svg" alt="" />
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}