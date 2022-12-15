import {useState} from 'react';
import styles from '../../../../styles/pages/clinic.module.css';
import classNames from 'classnames';
import CheckBox from '../../../../components/ui/CheckBox';
import Button from '../../../../components/ui/Button';
import Link from 'next/link';
import { getData } from '../../../../components/request';

export default function Analysis({ analysis }) {
    const [blockId, setBlockId] = useState('');
    const [done, setDone] = useState(false);

    console.log(analysis, 'analysis')
    
    return <>
        <div className={styles.clinicBody}>
            <div className={styles.clinicContent}>
                <div className={styles.clinicLogoContent}>
                    <img src="/clinicDocLogo.svg" className={styles.logo} alt="" />
                </div>
                <div className={styles.clinicAnalyisis}>
                    <div className={styles.analysH}>
                        <h2>Choose analysis</h2>
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
                                    <h2>Analysis</h2>
                                </div>
                            }
                            <div className={styles.listItem}>
                                <div 
                                    className={classNames(styles.clinic, {
                                        [styles.activeAnBlock]: blockId !== '' && true 
                                    })} 
                                    onClick={()=> blockId == '1' ? setBlockId('') : setBlockId('1')}
                                >
                                    <img src="/iconPlaceholder.svg" alt="" />
                                    <h2>Blood analysis</h2>
                                    <img className={styles.arrow} src="/clinArrow.svg" alt="" />
                                </div>
                                <div className={classNames(styles.analysis, {
                                    [styles.activeBlock]: blockId === '1' && true 
                                })}>
                                    <div className={styles.analist}>
                                        <CheckBox id={1} /> 
                                        <h2>Blood analysis</h2>
                                        <h3>$ 40.99</h3>
                                    </div>
                                    <div className={styles.analist}>
                                        <CheckBox id={2} /> 
                                        <h2>Urine analysis</h2>
                                        <h3>$ 40.99</h3>
                                    </div>
                                    <div className={styles.analist}>
                                        <CheckBox id={3} /> 
                                        <h2>Covid 19</h2>
                                        <h3>$ 40.99</h3>
                                    </div>
                                    <div className={styles.analist}>
                                        <CheckBox id={4} /> 
                                        <h2>Other</h2>
                                        <h3>$ 40.99</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.bookingNxt}>
                        <Link href="checkout">
                            <Button
                                name="Next"
                                style={styles.doneBtn}
                                onClick={()=>setDone(true)}
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export const getServerSideProps = async (ctx) => {
    const { params } = ctx;
    const userId = params.id;
    const getAnalysis = await getData(`${process.env.NEXT_PUBLIC_BASE_URL}/asclepius/v1/api/clinics/get-products?contractId=${userId}`)

    return {
        props: {
            branches: getAnalysis
        },
    }
}