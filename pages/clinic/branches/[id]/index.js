import {useState} from 'react';
import styles from '../../../../styles/pages/clinic.module.css';
import classNames from 'classnames';
import Link from 'next/link';
import { getData } from '../../../../components/request';
import Image from 'next/image';

export default function Branches({branches}) {
    const [blockId, setBlockId] = useState('');
    const [done, setDone] = useState(false);

    console.log(branches, 'branches')
    
    return <>
        <div className={styles.clinicBody}>
            <div className={styles.clinicContent}>
                <div className={styles.clinicLogoContent}>
                    <img src="/clinicDocLogo.svg" className={styles.logo} alt="" />
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
                            {branches &&
                                branches?.map((item, index) => (
                                    <Link href={`clinic/analysis/${item?.id}`} key={index}>
                                        <div className={styles.listItem}>
                                            <div
                                                className={classNames(styles.clinic, {
                                                    [styles.activeAnBlock]: blockId !== '' && true
                                                })}
                                            >
                                                <Image src={item?.logoUrl} width={40} height={40} alt="" />
                                                <h2>{item?.displayName}</h2>
                                                <img className={styles.arrow} src="/clinArrow.svg" alt="" />
                                            </div>
                                        </div>
                                    </Link>
                                    
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export const getServerSideProps = async (ctx) => {
    const { params } = ctx;
    const userId = params.id;
    const getBranches = await getData(`${process.env.NEXT_PUBLIC_BASE_URL}/asclepius/v1/api/clinics/${userId}/branches`)

    return {
        props: {
            branches: getBranches
        },
    }
}
