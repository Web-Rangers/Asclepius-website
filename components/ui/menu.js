import styles from '../../styles/components/menu.module.css';
import classNames from 'classnames';

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
                <img src="mainIcon.svg" alt="" />
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
                <img src="family.svg" alt="" />
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
                <img src="calendar.svg" alt="" />
                <span>
                    Calendar
                </span>
            </div>
            <div
                className={classNames(styles.menuItem, {
                    [styles.activeMenuItem]: active === 'notifications'
                })}
                onClick={()=>{
                    onClick('notifications')
                }}
            >
                <img src="notificationIcon.svg" alt="" />
                <span>
                    Notification
                </span>
            </div>
        </div>
    </>
}