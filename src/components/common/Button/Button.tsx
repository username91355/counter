import React from "react";
import styles from './Button.module.css'

type ButtonPropsType = {
    buttonName: string
    onClickHandler: () => void
    isDisable: boolean
}

export const Button: React.FC<ButtonPropsType> = ({buttonName,onClickHandler, isDisable}) => {
    return (
        <div className={styles.button__wrapper}>
            <button className={styles.button__body}
                    onClick={onClickHandler}
                    disabled={isDisable}>
                {buttonName}</button>
        </div>
    )
}