//Start:🕒 2026-09-03 Thursday 15:34:21
//Owner:🔧 AOSpro
//Call: 📞 t.me/aospro
//Project: 📌

import { useState } from 'react';
import * as constants from './consts';
import { calculateExpression } from './calc';

export const useResult = () => {
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [isCalculated, setIsCalculated] = useState<boolean>(false);

  const handleClick = (value: string): void => {
    const lastChar = input.slice(-1);

    // 1. عند الضغط على يساوي (=)
    if (value === '=') {
      if (input.trim() === '' || constants.OPERATORS.includes(lastChar)) return;

      const calcResult = calculateExpression(input);
      setResult(calcResult);
      setIsCalculated(true);
      return;
    }

    // 2. عند الضغط على مسح الكل (C)
    if (value === 'C') {
      setInput('');
      setResult('');
      setIsCalculated(false);
      return;
    }

    // 3. عند الضغط على حذف آخر خانة (DEL)
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

    // 4. التعامل مع العمليات الحسابية (+, -, *, /)
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

    // 5. التعامل مع الأقواس ( )
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

    // 6. التعامل مع النقطة العشرية (.)
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

    // 7. التعامل مع منطق المضروب (!)
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

    // 8. التعامل مع الأرقام (0-9)
    if (isCalculated) {
      setInput(value);
      setResult('');
      setIsCalculated(false);
    } else {
      if (lastChar === '!') return;
      setInput(input + value);
    }
  };

  // إرجاع الحالات والدالة لربطها بالواجهة
  return {
    input,
    result,
    handleClick
  };
};

