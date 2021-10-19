import React, {ChangeEvent} from 'react';
import styles from './Input.module.css';

type InputPropsType = {
    error: string | null
    title: string
    value: number
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Input: React.FC<InputPropsType> = ({error, title, value, onChange}) => {
    return (
        <div className={styles.input__wrapper}>
            <div className={styles.input__title}>{title}</div>
            <input className={(error) ? styles.input__bodyWithError : styles.input__body}
                   value={value}
                   onChange={onChange}
                   type="number"/>
        </div>
    )
}