import styles from '../styles/components/block.module.css';
import classNames from 'classnames';

export default function Block({
    title,
    actions,
    children,
    className
}) {
    return <>
        <div className={classNames(styles.block, className)}>
            {title && <div className={styles.blockHeader}>
                <h2>{title}</h2>
                {actions && actions}
            </div>}
            <div className={styles.blockContent}>
                {children}
            </div>
        </div>
    </>
}