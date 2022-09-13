import {useState} from 'react';
import styles from '../../../styles/pages/clinic.module.css';
import classNames from 'classnames';
import Button from '../../../components/ui/Button';
import ConfirmedModal from '../../../components/modals/confrimedModal';
import Link from 'next/link';
import Image from "next/image";

export default function Branches() {
    const [blockId, setBlockId] = useState('');
    const [done, setDone] = useState(false);
    
    return <>
        <div className={styles.clinicBody}>
            <div className={styles.clinicContent}>
                <div className={styles.clinicLogoContent}>
                    <Image src="/clinicDocLogo.svg" className={styles.logo} alt="" />
                </div>
                <div className={styles.clinicAnalyisis}>
                    <div className={styles.analysH}>
                        <h2>Choose branches</h2>
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
                                    <h2>Branches</h2>
                                </div>
                            }
                            <Link href="/clinicDetailPage">
                                <div className={styles.listItem}>
                                    <div 
                                        className={classNames(styles.clinic, {
                                            [styles.activeAnBlock]: blockId !== '' && true 
                                        })}
                                    >
                                        <Image src="/iconPlaceholder.svg" alt="" />
                                        <h2>Blood analysis</h2>
                                        <Image className={styles.arrow} src="/clinArrow.svg" alt="" />
                                    </div>
                                </div>
                            </Link>
                            <div className={styles.listItem}>
                                <div 
                                    className={classNames(styles.clinic, {
                                        [styles.activeAnBlock]: blockId !== '' && true 
                                    })}
                                >
                                    <Image src="/iconPlaceholder.svg" alt="" />
                                    <h2>Blood analysis</h2>
                                    <Image className={styles.arrow} src="/clinArrow.svg" alt="" />
                                </div>
                            </div>
                            <div className={styles.listItem}>
                                <div 
                                    className={classNames(styles.clinic, {
                                        [styles.activeAnBlock]: blockId !== '' && true 
                                    })}
                                >
                                    <Image src="/iconPlaceholder.svg" alt="" />
                                    <h2>Blood analysis</h2>
                                    <Image className={styles.arrow} src="/clinArrow.svg" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}