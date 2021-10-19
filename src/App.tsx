import React, {useEffect, useState} from 'react';
import './App.css';
import {Counter} from "./components/Counter/Counter";
import {CounterSettings} from "./components/CounterSettings/CounterSettings";

function App() {

    const [currentValue, setCurrentValue] = useState<number | null>(null)
    const [maxCountValue, setMaxCountValue] = useState<number>(0)
    const [startCountValue, setStartCountValue] = useState<number>(0)
    const [resetButtonDisabled, setResetButtonDisabled] = useState<boolean>(true)
    const [countButtonDisabled, setCountButtonDisabled] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {

        let value = localStorage.getItem('Current value')
        let error = localStorage.getItem('Error log')

        if (value) {
            setCurrentValue(JSON.parse(value))
        }

        if(error) {
            setError(JSON.parse(error))
        }

    }, [])

    useEffect(() => {

        if (currentValue !== null) {
            localStorage.setItem('Current value', JSON.stringify(currentValue))
        }

        if(error || error === null) {
            localStorage.setItem('Error log', JSON.stringify(error))
        }

    }, [currentValue, error])

    const increaseValue = () => {
        if (currentValue === null) {
            return
        } else {
            if (currentValue + 1 < maxCountValue) {
                setCurrentValue(currentValue + 1)
                setResetButtonDisabled(false)
            } else if (currentValue + 1 === maxCountValue) {
                setCurrentValue(currentValue + 1)
                setCountButtonDisabled(true)
                setResetButtonDisabled(false)
            }
        }

    }

    const setMinValue = (n: number) => {
        setStartCountValue(n)
        setCurrentValue(n)
        setCountButtonDisabled(false)
        setResetButtonDisabled(true)
    }

    const resetValue = () => {
        if (currentValue === null) {
            return
        } else {
            if(currentValue) {
                if (currentValue > startCountValue) {
                    setCurrentValue(startCountValue)
                    setResetButtonDisabled(true)
                    setCountButtonDisabled(false)
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
                                 setError={setError}
                                 setMinValue={setMinValue}
                                 setMaxValue={setMaxCountValue}
                                 setCurrentValue={setCurrentValue}
                                 setCountButtonDisabled={setCountButtonDisabled}
                                 setResetButtonDisabled={setResetButtonDisabled}
                />
            </div>
        </div>
    );
}

export default App;
