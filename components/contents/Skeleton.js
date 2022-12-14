import styles from '../../styles/components/skeleton.module.css';
import * as ANT from 'antd';
import classNames from 'classnames';

export default function Skeleton({customStyle}) {
    return <>
        <div className={classNames(styles.skelton, customStyle)}>
            <div className={styles.skeltonImage}>
                <img src="/skeleton-gif.gif" alt="" />
            </div>
            <div className={styles.skeltonTitles}>
                <ANT.Skeleton.Input size={20} active />
                <ANT.Skeleton.Input size={15} active />
            </div>

        </div>
    </>
}