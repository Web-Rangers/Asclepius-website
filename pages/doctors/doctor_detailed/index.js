import {useState} from 'react';
import styles from '../../../styles/pages/doctorDetailed.module.css';
import Link from "next/link";
import Calendar from '../../../components/Calendar';
import classNames from 'classnames';
import Select from '../../../components/Select';
import AddFamilyMember from '../../../components/modals/addFamilyMember';
import Image from "next/image";

export default function DoctorDetailed() {
    const [contact, setContact] = useState('');
    const [patient, setPatient] = useState('');
    const [modalIsOpen, setModalOpen] = useState(false);

    return <>
        {
            modalIsOpen &&
            <AddFamilyMember 
                onClose={()=> setModalOpen(false)}
            />
        }
        <div className={styles.doctorBody}>
            <div className={styles.doctorContainer}>
                <div className={styles.back}>
                    <Image layout="fill" src="/backBtn.svg" alt="" />
                </div>
                <div className={styles.content}>
                    <div className={styles.doctor}>
                        <div className={styles.poster}>
                            <div className={styles.doctorStar}>
                                <Image layout="fill" src="/whiteStar.svg" alt="" />
                                <span>4.9</span>
                            </div>
                            <Image layout="fill" 
                                className={styles.doctorImage} 
                                src="/doctor10.png" 
                                alt="" 
                            />
                        </div>
                        <div className={styles.doctorContact}>
                            <div className={styles.contact}>
                                <Image layout="fill" className={styles.video} src="/videoIcon.svg" alt="" />
                            </div>
                            <div className={styles.contact}>
                                <Image layout="fill" className={styles.phone} src="/phoneContact.svg" alt="" />
                            </div>
                            <div className={styles.contact}>
                                <Image layout="fill" className={styles.home} src="/home.svg" alt="" />
                            </div>
                        </div>
                        <div className={styles.aboutDoctor}>
                            <h2>Pamela Martínez</h2>
                            <div className={styles.proffesion}>
                                <div className={styles.prof}>
                                    Therapist
                                </div>
                                <div className={styles.prof}>
                                    Family doctor
                                </div>
                            </div>
                        </div>
                        <div className={styles.address}>
                            <Image layout="fill" src="/doctorLocation.svg" alt="" />
                            <h4>Carymouth , Hallmark Clinic</h4>
                        </div>
                        <div className={styles.language}>
                            <span className={styles.languageTitle}>Language</span>
                            <div className={styles.languageList}>
                                <span>Geo</span>
                                <span>Eng</span>
                                <span>Rus</span>
                            </div>
                        </div>
                        <div className={styles.cetificates}>
                            <div className={styles.certTitle}>
                                <Image layout="fill" src="/certificates.svg" alt="" />
                                <h2>Certificates</h2>
                            </div>
                            <div className={styles.certificate}>
                                <div className={styles.certCheckmark}>
                                    <Image layout="fill" src="/checkMark.svg" alt="" />
                                </div>
                                <div className={styles.certificateInfo}>
                                    <h2>Phoenix healthcare center</h2>
                                    <p>Carymouth , Hallmark Clinic</p>
                                    <h4>June 22 / 2022</h4>
                                    <div className={styles.certLink}>
                                        <Image layout="fill" src="/disabledEye.svg" alt="" />
                                        <Link href="/">
                                            <a>https://thenounproject.com</a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.certificate}>
                                <div className={styles.certCheckmark}>
                                    <Image layout="fill" src="/checkMark.svg" alt="" />
                                </div>
                                <div className={styles.certificateInfo}>
                                    <h2>Phoenix healthcare center</h2>
                                    <p>Carymouth , Hallmark Clinic</p>
                                    <h4>June 22 / 2022</h4>
                                    <div className={styles.certLink}>
                                        <Image layout="fill" src="/disabledEye.svg" alt="" />
                                        <Link href="/">
                                            <a>https://thenounproject.com</a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.doctorInfo}>
                        <div className={styles.about}>
                            <div className={styles.aboutTitle}>
                                <Image layout="fill" src="/aboutMe.svg" alt="" />
                                <h2>About me</h2>
                            </div>
                            <div className={styles.aboutTxt}>
                                <span>
                                    - Board member of the International Association of Sexually Transmitted Diseases
                                </span>
                                <span>
                                    - Full member of the European Academy of Dermatology and Venereology
                                </span>
                                <span>
                                    - Chairman of the Tbilisi Association of Dermatologists and Venereologists
                                </span>
                                <span>
                                    - Vice President of the Pediatric Dermatology Association of Georgia
                                </span>
                                <span>
                                    - Chairman of the Association of Dermatologists and Venereologists
                                </span>
                            </div>
                        </div>
                        <div className={styles.education}>
                            <div className={styles.educationTitle}>
                                <Image layout="fill" src="/education.svg" alt="" />
                                <h2>Education</h2>
                            </div>
                            <div className={styles.educationContent}>
                                <div className={styles.educationItem}>
                                    <div className={styles.data}>
                                        9/2003 - 6/2006 yr.
                                    </div>
                                    <h2>Tbilisi State Medical Institute</h2>
                                    <p>
                                        Higher medical education - Chairman 
                                        of the Association of Dermatologists 
                                        and Venereologists
                                    </p>
                                </div>
                                <div className={styles.educationItem}>
                                    <div className={styles.data}>
                                        9/2003 - 6/2006 yr.
                                    </div>
                                    <h2>Tbilisi State Medical Institute</h2>
                                    <p>
                                        Higher medical education - Chairman 
                                        of the Association of Dermatologists 
                                        and Venereologists
                                    </p>
                                </div>
                                <div className={styles.educationItem}>
                                    <div className={styles.data}>
                                        9/2003 - 6/2006 yr.
                                    </div>
                                    <h2>Tbilisi State Medical Institute</h2>
                                    <p>
                                        Higher medical education - Chairman 
                                        of the Association of Dermatologists 
                                        and Venereologists
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.doctorServices}>
                        <div className={styles.booking}>
                            <div className={styles.bookingHeader}>
                                <Image layout="fill" src='/booking.svg' alt="" />
                                <h2>Booking</h2>
                            </div>
                            <div className={styles.bookingTool}>
                                <button 
                                    className={classNames(styles.bookingBtn, {
                                        [styles.activeContact]: contact === 'online'
                                    })}
                                    onClick={()=>{
                                        setContact('online')
                                    }}
                                >
                                    <Image layout="fill" src="/video.svg" alt="" />
                                    <span>Online</span>
                                </button>
                                <button
                                    className={classNames(styles.bookingBtn, {
                                        [styles.activeContact]: contact === 'audio'
                                    })}
                                    onClick={()=>{
                                        setContact('audio')
                                    }}
                                >
                                    <Image layout="fill" src="/phoneContact.svg" alt="" />
                                    <span>Audio</span>
                                </button>
                                <button 
                                    className={classNames(styles.bookingBtn, {
                                        [styles.activeContact]: contact === 'home'
                                    })}
                                    onClick={()=>{
                                        setContact('home')
                                    }}
                                > 
                                    <Image layout="fill" src="/home.svg" alt="" />
                                    <span>Home</span>
                                </button>
                            </div>
                        </div>
                        <Calendar booking={true} />

                        <div className={styles.patient}>
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
                            <button 
                                className={styles.familyBtn}
                                onClick={()=> setModalOpen(true)}
                            >
                                <Image layout="fill" src="/plus.svg" alt="" />
                                <span>Add family member</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}