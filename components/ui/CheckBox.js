import classNames from 'classnames';
import { useState } from 'react';
import styles from '../../styles/components/CheckBox.module.css';

export default function CheckBox({
    className,
    label,
    checked,
    onChange,
    id,
    defaultChecked,
    ...props
}) {
    const [isChecked, setIsChecked] = useState(defaultChecked);
    return (
        <>
            <input
                id={id}
                type={'checkbox'}
                className={classNames([styles.checkBox, className])}
                checked={checked}
                defaultChecked={defaultChecked}
                onChange={() => onChange && onChange(!checked)}
            />
            <label htmlFor={id} className={styles.checkBoxLabel}>
                {label}
            </label>
        </>
    );
}
