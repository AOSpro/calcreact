//Start:🕒 2026-09-03 Thursday 15:34:21
//Owner:🔧 AOSpro
//Call: 📞 t.me/aospro
//Project: calc📌

import { useState } from 'react';
import * as constants from './consts';
import { calculateExpression } from './calc';

export const useResult = () => {
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [isCalculated, setIsCalculated] = useState<boolean>(false);

  const handleClick = (value: string): void => {
    const lastChar = input.slice(-1);

    if (value === '=') {
      if (input.trim() === '' || constants.OPERATORS.includes(lastChar)) return;

      const calcResult = calculateExpression(input);
      setResult(calcResult);
      setIsCalculated(true);
      return;
    }

    if (value === 'C') {
      setInput('');
      setResult('');
      setIsCalculated(false);
      return;
    }

    if (value === 'DEL') {
      if (isCalculated) {
        setInput('');
        setResult('');
        setIsCalculated(false);
      } else {
        setInput(input.slice(0, -1));
      }
      return;
    }

    if (constants.OPERATORS.includes(value)) {
      if (input === '' && value !== '-') return;

      if (isCalculated) {
        if (result === 'Error') return;
        setInput(result + value);
        setResult('');
        setIsCalculated(false);
      } else if (constants.OPERATORS.includes(lastChar)) {
        setInput(input.slice(0, -1) + value);
      } else {
        setInput(input + value);
      }
      return;
    }

    if (value === '(' || value === ')') {
      if (isCalculated) {
        setInput(value);
        setResult('');
        setIsCalculated(false);
      } else {
        setInput(input + value);
      }
      return;
    }

    if (value === '.') {
      if (isCalculated) {
        setInput('0.');
        setResult('');
        setIsCalculated(false);
        return;
      }

      const parts = input.split(/[+\-*/()]/);
      const currentNumber = parts[parts.length - 1];
      if (currentNumber.includes('.') || currentNumber.includes('!')) return;

      setInput(input === '' || constants.OPERATORS.includes(lastChar) ? input + '0.' : input + '.');
      return;
    }

    if (value === '!') {
      if (input === '' || constants.OPERATORS.includes(lastChar) || lastChar === '!' || lastChar === '.' || lastChar === '(') return;

      if (isCalculated) {
        if (result === 'Error') return;
        setInput(result + '!');
        setResult('');
        setIsCalculated(false);
      } else {
        setInput(input + '!');
      }
      return;
    }

    if (isCalculated) {
      setInput(value);
      setResult('');
      setIsCalculated(false);
    } else {
      if (lastChar === '!') return;
      setInput(input + value);
    }
  };

  return {
    input,
    result,
    handleClick
  };
};

