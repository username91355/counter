import React, {ChangeEvent, useEffect, useState} from "react";
import styles from "./CounterSettings.module.css";
import {Button} from "../common/Button/Button";
import {Input} from "../common/Input/Input";
import {useDispatch} from "react-redux";
import {setCountButtonDisabled, setCurrentValue, setError, setMaxCountValue, setResetButtonDisabled} from "../../redux/counter-reducer";

type CounterSettingsPropsType = {
    error: string | null
    setMinValue: (n: number) => void
}

export const CounterSettings: React.FC<CounterSettingsPropsType> = ({
                                                                        error,
                                                                        setMinValue
                                                                    }) => {

    const dispatch = useDispatch()

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
        dispatch(setError(null))
        dispatch(setCurrentValue(null))
        if (Number(e.currentTarget.value) < 0) {
            dispatch(setError('Input Error: The entered data must be a positive integer'))
            dispatch(setCountButtonDisabled(true))
            dispatch(setResetButtonDisabled(true))
            return;
        }
    }

    const setSettingMaxHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setMax(Number(e.currentTarget.value))
        dispatch(setError(null))
        dispatch(setCurrentValue(null))
        if (Number(e.currentTarget.value) < 0) {
            dispatch(setError('Input Error: The entered data must be a positive integer'))
            dispatch(setCountButtonDisabled(true))
            dispatch(setResetButtonDisabled(true))
            return;
        }
    }

    const setSettingClickHandler = () => {
        if (min < 0 || max < 0) {
            dispatch(setError('Input Error: The entered data must be a positive integer'))
            dispatch(setCountButtonDisabled(true))
            dispatch(setResetButtonDisabled(true))
            return;
        }
        if (min >= max) {
            dispatch(setError('Input Error: "Min value" must be less than "Max value"'))
            dispatch(setCountButtonDisabled(true))
            dispatch(setResetButtonDisabled(true))
            return;
        }
        setMinValue(min)
        dispatch(setMaxCountValue(max))
        dispatch(setError(null))
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
                        isDisable={!!(error)}/>
            </div>
        </div>
    )
}