import React from "react";
import styles from './Counter.module.css'
import {Button} from "../common/Button/Button";

type CounterPropsType = {
    currentValue: number | null
    maxCountValue: number
    error: string | null
    countButtonDisabled: boolean
    resetButtonDisabled: boolean
    increaseValue: () => void
    resetValue: () => void
}

export const Counter: React.FC<CounterPropsType> = ({
                                                        currentValue,
                                                        maxCountValue,
                                                        error,
                                                        countButtonDisabled,
                                                        resetButtonDisabled,
                                                        increaseValue,
                                                        resetValue
                                                    }) => {

    const isButtonCountDisabled = () => (error || currentValue === null) ? true : countButtonDisabled
    const isButtonResetDisabled = () => (error) ? true : resetButtonDisabled

    return (
        <div className={styles.counter__wrapper}>
            <div className={(error)
                ? styles.counter__currentValueWithError
                : (!Number.isInteger(currentValue))
                    ? styles.counter__currentValue_notInteger
                    : (currentValue === maxCountValue)
                        ? styles.counter__currentMaxValue
                        : styles.counter__currentValue}>
                {(error)
                    ? error
                    : (currentValue !== null)
                        ? currentValue
                        : 'Enter counter settings and push on button "Set"'
                }
            </div>
            <div className={styles.counter__monitorPanel}>
                <Button buttonName={'Count'}
                        onClickHandler={increaseValue}
                        isDisable={isButtonCountDisabled()}/>
                <Button buttonName={'Reset'}
                        onClickHandler={resetValue}
                        isDisable={isButtonResetDisabled()}/>
            </div>
        </div>
    )
}