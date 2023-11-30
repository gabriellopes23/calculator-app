import './App.css'
import React, { useState } from 'react'
import Button from './components/Button'
import Display from './components/Display'

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

export default props => {
    const [state, setState] = useState({ ...initialState })
    const [currentTheme, setCurrentTheme] = useState('theme1')

    const handleThemeChange = (theme) => {
        setCurrentTheme(theme)
    }

    const clearMemory = () => {
        setState({ ...initialState })
    }

    const calculate = () => {
        const { values, operation } = state
        const [value1, value2] = values

        switch (operation) {
            case '+':
                return value1 + value2;
            case '-':
                return value1 - value2;
            case '/':
                return value1 / value2;
            case '*':
                return value1 * value2
            default:
                return value1
        }
    }

    const setOperation = (operation) => {
        if (state.current === 0) {
            setState({ operation, current: 1, clearDisplay: true, values: [state.values[0], 0] })
        } else {
            const equals = operation === '='
            const currentOperation = state.operation

            const values = [...state.values]
            values[0] = calculate()

            values[1] = 0

            setState({
                displayValue: values[0].toString(),
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values
            })
        }
    }

    const addDigit = (n) => {
        if (n === '.' && state.displayValue.includes('.')) {
            return
        }

        const clearDisplay = state.displayValue === '0'
            || state.clearDisplay

        let currentValue = clearDisplay ? '' : state.displayValue
        if (n === 'DEL') {
            currentValue = currentValue.slice(0, -1)
        } else {
            currentValue += n
        }

        setState((prevState) => {
            const i = prevState.current
            const newValue = parseFloat(currentValue)
            const newValues = [...prevState.values]
            newValues[i] = newValue

            return {
                ...prevState,
                displayValue: currentValue,
                clearDisplay: false,
                values: newValues
            }
        });
    }

    return (
        <div className={`app ${currentTheme}`}>
            <div className="calculator">
                <div className="theme">
                    <div className="calc">calc</div>
                    <div className='paragrafo'>THEME</div>
                    <section>
                        <div className="numbers">
                            <label>1</label>
                            <label>2</label>
                            <label>3</label>
                        </div>
                        <div className="inputs">
                            <input type="radio" name="theme"
                                onChange={() => handleThemeChange('theme1')}
                                checked={currentTheme === 'theme1'} />
                            <input type="radio" name="theme"
                                onChange={() => handleThemeChange('theme2')}
                                checked={currentTheme === 'theme2'} />
                            <input type="radio" name="theme"
                                onChange={() => handleThemeChange('theme3')}
                                checked={currentTheme === 'theme3'} />
                        </div>
                    </section>
                </div>
                <div className="display">
                    <Display value={state.displayValue} />
                </div>
                <div className="buttons">
                    <Button label={7} click={addDigit} />
                    <Button label={8} click={addDigit} />
                    <Button label={9} click={addDigit} />
                    <Button label={'DEL'} del click={addDigit} />
                    <Button label={4} click={addDigit} />
                    <Button label={5} click={addDigit} />
                    <Button label={6} click={addDigit} />
                    <Button label={'+'} click={() => setOperation('+')} />
                    <Button label={1} click={addDigit} />
                    <Button label={2} click={addDigit} />
                    <Button label={3} click={addDigit} />
                    <Button label={'-'} click={() => setOperation('-')} />
                    <Button label={'.'} click={addDigit} />
                    <Button label={0} click={addDigit} />
                    <Button label={'/'} click={() => setOperation('/')} />
                    <Button label={'x'} click={() => setOperation('*')} />
                    <Button label={'RESET'} reset click={clearMemory} />
                    <Button label={'='} equal click={() => setOperation('=')} />
                </div>
            </div>
        </div>
    )
}