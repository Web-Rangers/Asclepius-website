import { useEffect } from "react";
import { useState } from "react";
import { ReactSVG } from "react-svg";
import Select from "../../components/Select";
import styles from "../../styles/components/modals/checkout.module.css";
import CheckoutFamilyMember from './checkoutMember';

export default function Checkout({onClose, users, setUsers}) {
    const [memberType, setMemberType] = useState('');
    const [openMemberModal, setOpenMemberModal] = useState(false);

    return <>
        {
            openMemberModal && <CheckoutFamilyMember onClose={()=> setOpenMemberModal(false)} type={memberType} users={users} setUsers={setUsers} />
        }
        <div className={styles.checkoutModal} onClick={() => onClose()}></div>
        <div className={styles.container}>
            <div className={styles.checkoutheader}>
                <div className={styles.fmTool}>
                    <h2>Checkout</h2>
                    <img src="/closeFilter.svg" onClick={() => onClose()} alt="" />
                </div>
                <div className={styles.document}>
                    Read information about the processing of personal data here - <a href="">Document link</a>
                </div>
            </div>
            <div className={styles.checkoutContainer}>
                <div className={styles.users}>
                    {
                        users && users.map((user)=> {
                            return (
                                <div className={styles.userBlock}>
                                    <div className={styles.user}>
                                        <div className={styles.userHead}>
                                            <div className={styles.block}>
                                                <img src="/userImg.png" alt="" />
                                            </div>
                                            <div className={styles.block}>
                                                <h2>{user.name}</h2>
                                                <span>{user.mail}</span>
                                            </div>
                                        </div>
                                        <div className={styles.userInfo}>
                                            <div className={styles.infoCol}>
                                                <ReactSVG src="/userPhone.svg" />
                                                <h4>Phone number: {user.phone}</h4>
                                            </div>
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
                                    <button className={styles.editBtn}>Edit Info</button>
                                </div>
                            )
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
            </div>
        </div>
    </>
}