import Link from 'next/link';
import styles from '../../styles/components/modals/confirmedModal.module.css';
import Button from '../../components/ui/Button';
import Image from "next/image";

export default function OrderConfirmed({onClose}) {
    return <>
        <div className={styles.body}></div>
        <div className={styles.content}>
            <div className={styles.img}>
                <Image layout="fill" src="/checkMark.svg" alt='' />
            </div>

            <h2>Order confirmed</h2>
            <p>Thank you for your order, you will get an e-mail confirmation shortly</p>
            <p>In case of any problem  <Link href=""><a>Contact us</a></Link></p>

            <div className={styles.btns}>
                <Button
                    name="Close"
                    style={styles.closeBtn}
                    onClick={()=>onClose()}
                />
                <Button
                    name="View order"
                    style={styles.viewOrder}
                />
            </div>
        </div>
    </>
}