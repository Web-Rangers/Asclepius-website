import { useState } from 'react';
import { Modal } from 'antd';
import Select from '../Select';
import { ReactSVG } from 'react-svg';
import Link from 'next/link';
import styles from '../../styles/components/modals/buyCardModal.module.css';

export default function BuyCardModal({open, hideModal}) {
    const [familyMember, setFamilyMember] = useState('');
    return <>
            <Modal
                title={<div className={styles.modalHeader}>
                            <span>შეიძინე ბარათი</span>
                            <div className={styles.modalHeaderInfo}>
                                წაიკითხეთ ინფორმაცია პერსონალური მონაცემების დამუშავების შესახებ აქ - <Link href="/">დოკუმენტის ბმული</Link>
                            </div>
                        </div>
                      }
                open={open}
                onOk={hideModal}
                onCancel={hideModal}
                className={styles.modalContent}
                wrapClassName={styles.modalContainer}
                maskStyle={{zIndex: 1000000}}
                footer={null}
                closeIcon={<ReactSVG className={styles.closeBtnIcon} src='/modalclosebtn.svg' />}
                bodyStyle={{padding: '8px 32px'}}
                modalRender={(nodes)=> <div className={styles.modalRenderContent}>{nodes}</div>}
            >
                <div className={styles.modalBodyUser}>
                    <div className={styles.modalBodyUserInfo}>
                        <div 
                            className={styles.userAvatarBg} 
                            style={{
                                backgroundColor: `#000`,
                            }}
                        >
                            <img className={styles.userAvatar} src={'/avatar3.png'} />
                        </div>
                        <div className={styles.modalBodyUserInfoNames}>
                            <span className={styles.modalBodyuserName}>ვანო თვაური</span>
                            <span className={styles.modalBodyuseremail}>v.tvauri@optimogroup.io</span>
                        </div>
                        <button className={styles.modalBodyUserEdit}>რედაქტირება</button>
                    </div>
                    <div className={styles.modalBodyUserPersonalInfo}>
                        <div>
                            <span>ტელეფონი</span>
                            <span>+995 598 23 08 23</span>
                        </div>
                        <div>
                            <span>პირადი ნომერი</span>
                            <span>35001121877</span>
                        </div>
                        <div>
                            <span>დაბადების თარიღი</span>
                            <span>01 ოქტომბერი 1994</span>
                        </div>
                    </div>

                    <div className={styles.modalBodyAddFamilyMembers}>
                        <h3>დაამატე ოჯახის წევრი</h3>
                        <Select
                            label="აირჩიე ოჯახის წევრი"
                            labelStyle="inside"
                            className={styles.servInput}
                            style={styles.familyAddBtn}
                            options={[
                                { label: "მეუღლე", value: "1" },
                                { label: "18 წლამდე ბავშვი", value: "2" },
                            ]}
                            value={familyMember}
                            onChange={e=> setFamilyMember(e)}
                        />
                        <Select
                            label="აირჩიე ოჯახის წევრი"
                            labelStyle="inside"
                            className={styles.servInput}
                            style={styles.familyAddBtn}
                            options={[
                                { label: "მეუღლე", value: "1" },
                                { label: "18 წლამდე ბავშვი", value: "2" },
                            ]}
                            value={familyMember}
                            onChange={e=> setFamilyMember(e)}
                        />
                    </div>

                    <div className={styles.modalBodyFamilyMemberInputs}>

                    </div>
                </div>
        </Modal>
      </>
}