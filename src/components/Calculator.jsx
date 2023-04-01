import React, { useState, useRef } from 'react';
import './Calculator.css';

function Calculator() {
  const [displayValue, setDisplayValue] = useState('0');
  const [operand1, setOperand1] = useState(null);
  const [operator, setOperator] = useState(null);
  const [history, setHistory] = useState([]);

  const refInput = useRef(null)

  const handleButtonClick = (event) => {
    const buttonValue = event.target.value;
    switch (buttonValue) {
      case '+':
      case '-':
      case '*':
      case '/':
        setOperator(buttonValue);
        setOperand1(parseFloat(displayValue));
        setDisplayValue('0');
        break;
      case '=':
        const operand2 = parseFloat(displayValue);
        let result = 0;
        if(!operand1){
          return null
        } else {
        switch (operator) {
            case '+':
              result = operand1 + operand2;
              break;
              case '-':
                result = operand1 - operand2;
                break;
                case '*':
                  result = operand1 * operand2;
                  break;
                  case '/':
                    result = operand1 / operand2;
                    break;
                    default:
                      result = operand2;
                    }
                  }
        setDisplayValue(result.toString());
        setOperand1(null);
        setOperator(null);
        setHistory([...history, `${operand1} ${operator} ${operand2} = ${result}`]);
        if(history.length === 4){
          history.shift()
          setHistory([...history, `${operand1} ${operator} ${operand2} = ${result}`])
        }
        break;
      case 'C':
        setDisplayValue('0');
        setOperand1(null);
        setOperator(null);
        setHistory([]);
        break;
      default:
        if (displayValue === '0') {
          setDisplayValue(buttonValue);
        } else {
          setDisplayValue(displayValue + buttonValue);
        }
    }
    refInput.current.focus();
  };


  const handleKeyDown = (event) => {
    const { key } = event;
    if (/\d/.test(key)) {
      handleButtonClick({ target: { value: key } });
    } else if (key === '.') {
      handleButtonClick({ target: { value: '.' } });
    } else if (['+', '-', '*', '/'].includes(key)) {
      handleButtonClick({ target: { value: key } });
    } else if (key === 'Enter') {
      handleButtonClick({ target: { value: '=' } });
    } else if (key === 'Backspace') {
      event.preventDefault();
      setDisplayValue(displayValue.slice(0, -1));
    }
    refInput.current.focus();
  };

  const handleSignChange = () => {
    console.log(Math.sign(displayValue))
    if(Math.sign(displayValue) === -1 ||Math.sign(displayValue) === -0){
      setDisplayValue(-Math.abs(displayValue) * -1)
    } else {
      setDisplayValue(-Math.abs(displayValue))
    }
    refInput.current.focus();
  }

  return (
    <div className="calculator-container">
      <div className="calculator-wrapper">
        <div className="calculator">
        <input
        autoFocus
        ref={refInput}
          className="display"
          type="text"
          value={displayValue}
          onKeyDown={handleKeyDown}
        />
          <div className="keypad">
        <button value="7" onClick={handleButtonClick}>7</button>
        <button value="8" onClick={handleButtonClick}>8</button>
        <button value="9" onClick={handleButtonClick}>9</button>
        <button value="/" onClick={handleButtonClick}>/</button>
        <button value="4" onClick={handleButtonClick}>4</button>
        <button value="5" onClick={handleButtonClick}>5</button>
        <button value="6" onClick={handleButtonClick}>6</button>
        <button value="*" onClick={handleButtonClick}>*</button>
        <button value="1" onClick={handleButtonClick}>1</button>
        <button value="2" onClick={handleButtonClick}>2</button>
        <button value="3" onClick={handleButtonClick}>3</button>
        <button value="-" onClick={handleButtonClick}>-</button>
        <button value="0" onClick={handleButtonClick}>0</button>
        <button value="." onClick={handleButtonClick}>.</button>
        <button value="+" onClick={handleButtonClick}>+</button>
        <button value="C" onClick={handleButtonClick}>C</button>
        <button value="±" onClick={handleSignChange}>±</button>
        <button value="=" onClick={handleButtonClick}>=</button>
      </div>
      <div className="history">
        <h2>History</h2>
        <ul>
          {history.map((entry, index) => <li key={index}>{entry}</li>)}
        </ul>
      </div>
    </div>
    </div>
    </div>
  );
}

export default Calculator;