import styles from "../../styles/components/modals/checkout.module.css";
import classNames from "classnames";

export default function ServicesModal({onClose}) {
    return <>
        <div className={styles.checkoutModal} onClick={onClose}></div>
        <div className={classNames(styles.container, styles.servicesContainer)}>
            <div className={classNames(styles.bg, styles.servicesBg)}>
                <div className={styles.checkoutheader}>
                    <div className={styles.fmTool}>
                        <h2>Services</h2>
                        <img src="/closeFilter.svg" onClick={onClose} alt="" />
                    </div>
                </div>
                <div className={styles.checkoutContainer}>
                    services
                </div>
            </div>
        </div>
    </>
}