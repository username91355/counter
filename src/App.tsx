import React, {useEffect} from 'react';
import './App.css';
import {Counter} from "./components/Counter/Counter";
import {CounterSettings} from "./components/CounterSettings/CounterSettings";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "./redux/store";
import {
    ErrorType,
    setCountButtonDisabled,
    setCurrentValue,
    setError,
    setResetButtonDisabled,
    setStartCountValue
} from './redux/counter-reducer';

function App() {

    // @ts-ignore
    const currentValue = useSelector<AppStateType, number>(store => store.counter.currentValue)
    // @ts-ignore
    const error = useSelector<AppStateType, ErrorType>(store => store.counter.error)
    // @ts-ignore
    const maxCountValue = useSelector<AppStateType, number>(store => store.counter.maxCountValue)
    // @ts-ignore
    const startCountValue = useSelector<AppStateType,number>( store => store.counter.startCountValue)
    // @ts-ignore
    const resetButtonDisabled = useSelector<AppStateType, boolean>(store => store.counter.resetButtonDisabled)
    // @ts-ignore
    const countButtonDisabled = useSelector<AppStateType, boolean>(store => store.counter.countButtonDisabled)

    const dispatch = useDispatch()


    useEffect(() => {

        let value = localStorage.getItem('Current value')
        let error = localStorage.getItem('Error log')

        if (value) {
            dispatch(setCurrentValue(JSON.parse(value)))
        }

        if (error) {
            dispatch(setError(JSON.parse(error)))
        }

    }, [])

    useEffect(() => {

        if (currentValue !== null) {
            localStorage.setItem('Current value', JSON.stringify(currentValue))
        }

        if (error || error === null) {
            localStorage.setItem('Error log', JSON.stringify(error))
        }

    }, [currentValue, error])

    const increaseValue = () => {
        if (currentValue === null) {
            return
        } else {
            if (currentValue + 1 < maxCountValue) {
                dispatch(setCurrentValue(currentValue + 1))
                dispatch(setResetButtonDisabled(false))
            } else if (currentValue + 1 === maxCountValue) {
                dispatch(setCurrentValue(currentValue + 1))
                dispatch(setCountButtonDisabled(true))
                dispatch(setResetButtonDisabled(false))
            }
        }

    }

    const setMinValue = (n: number) => {
        dispatch(setStartCountValue(n))
        dispatch(setCurrentValue(n))
        dispatch(setCountButtonDisabled(false))
        dispatch(setResetButtonDisabled(true))
    }

    const resetValue = () => {
        if (currentValue === null) {
            return
        } else {
            if (currentValue) {
                if (currentValue > startCountValue) {
                    dispatch(setCurrentValue(startCountValue))
                    dispatch(setResetButtonDisabled(true))
                    dispatch(setCountButtonDisabled(false))
                }
            }
        }
    }


    return (
        <div className="app__wrapper">
            <div className="app__container">
                <Counter currentValue={currentValue}
                         maxCountValue={maxCountValue}
                         error={error}
                         resetButtonDisabled={resetButtonDisabled}
                         countButtonDisabled={countButtonDisabled}
                         increaseValue={increaseValue}
                         resetValue={resetValue}
                />
                <CounterSettings error={error}
                                 setMinValue={setMinValue}
                />
            </div>
        </div>
    );
}

export default App;
