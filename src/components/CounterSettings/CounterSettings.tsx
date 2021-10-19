import React, {ChangeEvent, useEffect, useState} from "react";
import styles from "./CounterSettings.module.css";
import {Button} from "../common/Button/Button";
import {Input} from "../common/Input/Input";

type CounterSettingsPropsType = {
    error: string | null
    setError: (e: string | null) => void
    setMinValue: (n: number) => void
    setMaxValue: (n: number) => void
    setCurrentValue: (n: number | null) => void
    setCountButtonDisabled: (b: boolean) => void
    setResetButtonDisabled: (b: boolean) => void
}

export const CounterSettings: React.FC<CounterSettingsPropsType> = ({
                                                                        error,
                                                                        setError,
                                                                        setMinValue,
                                                                        setMaxValue,
                                                                        setCurrentValue,
                                                                        setCountButtonDisabled,
                                                                        setResetButtonDisabled
                                                                    }) => {

    const [min, setMin] = useState<number>(0)
    const [max, setMax] = useState<number>(0)

    useEffect(() => {

        let minValue = localStorage.getItem('Settings: Min value')
        let maxValue = localStorage.getItem('Settings: Max value')

        if(minValue) {
            setMin(JSON.parse(minValue))
        }

        if(maxValue) {
            setMax(JSON.parse(maxValue))
        }
    }, [])

    useEffect(() => {

        if(min !== null) {
            localStorage.setItem('Settings: Min value', JSON.stringify(min))
        }
        if(max !== null) {
            localStorage.setItem('Settings: Max value', JSON.stringify(max))
        }

    }, [min, max])

    const setSettingMinHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setMin(Number(e.currentTarget.value))
        setError(null)
        setCurrentValue(null)
        if (Number(e.currentTarget.value) < 0) {
            setError('Input Error: The entered data must be a positive integer')
            setCountButtonDisabled(true)
            setResetButtonDisabled(true)
            return;
        }
    }

    const setSettingMaxHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setMax(Number(e.currentTarget.value))
        setError(null)
        setCurrentValue(null)
        if (Number(e.currentTarget.value) < 0) {
            setError('Input Error: The entered data must be a positive integer')
            setCountButtonDisabled(true)
            setResetButtonDisabled(true)
            return;
        }
    }

    const setSettingClickHandler = () => {
        if (min < 0 || max < 0) {
            setError('Input Error: The entered data must be a positive integer')
            setCountButtonDisabled(true)
            setResetButtonDisabled(true)
            return;
        }
        if (min >= max) {
            setError('Input Error: "Min value" must be less than "Max value"')
            setCountButtonDisabled(true)
            setResetButtonDisabled(true)
            return;
        }
        setMinValue(min)
        setMaxValue(max)
        setError(null)
    }

    return (
        <div className={styles.counterSettings__wrapper}>
            <div className={styles.counterSettings__inputPanel}>
                <Input error={error}
                       title={'Min value'}
                       value={min}
                       onChange={setSettingMinHandler}/>

                <Input error={error}
                       title={'Max value'}
                       value={max}
                       onChange={setSettingMaxHandler}/>
            </div>
            <div className={styles.counterSettings__monitorPanel}>
                <Button buttonName={'Set'}
                        onClickHandler={setSettingClickHandler}
                        isDisable={(error) ? true : false}/>
            </div>
        </div>
    )
}