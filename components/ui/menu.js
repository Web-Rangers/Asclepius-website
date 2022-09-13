import styles from '../../styles/components/menu.module.css';
import classNames from 'classnames';
import Image from "next/image";

export default function Menu({
    active,
    onClick
}) {
    return <>
        <div className={styles.menu}>
            <div
                className={classNames(styles.menuItem, {
                    [styles.activeMenuItem]: active === 'main'
                })}
                onClick={()=>{
                    onClick('main')
                }}
            >
                <Image layout="fill" src="mainIcon.svg" alt="" />
                <span>
                    Main
                </span>
            </div>
            <div
                className={classNames(styles.menuItem, {
                    [styles.activeMenuItem]: active === 'family'
                })}
                onClick={()=>{
                    onClick('family')
                }}
            >
                <Image layout="fill" src="family.svg" alt="" />
                <span>
                    Family
                </span>
            </div>
            <div
                className={classNames(styles.menuItem, {
                    [styles.activeMenuItem]: active === 'calendar'
                })}
                onClick={()=>{
                    onClick('calendar')
                }}
            >
                <Image layout="fill" src="calendar.svg" alt="" />
                <span>
                    Calendar
                </span>
            </div>
            <div
                className={classNames(styles.menuItem, {
                    [styles.activeMenuItem]: active === 'notification'
                })}
                onClick={()=>{
                    onClick('notification')
                }}
            >
                <Image layout="fill" src="notificationIcon.svg" alt="" />
                <span>
                    Notification
                </span>
            </div>
        </div>
    </>
}