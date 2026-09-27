//Start:🕒 2026-09-03 Thursday 15:34:21
//Owner:🔧 AOSpro
//Call: 📞 t.me/aospro
//Project: calc 📌

import * as constants from './consts';
import { calculateFactorial } from './factorial';

export const calculateExpression = (expression: string): string => {
  try {
    if (!constants.EXP_VALIDATOR.test(expression)) return 'Error';

    let processedExpression = expression;

    processedExpression = processedExpression.replace(/(\d+)\(/g, '$1*(');
    processedExpression = processedExpression.replace(/\)(\d+)/g, ')*$1');

    const factorialRegex = /(\d+\.?\d*)!/g;
    processedExpression = processedExpression.replace(factorialRegex, (_, p1) => {
      const num = parseFloat(p1);
      if (num > 170) return 'Infinity';
      const factResult = calculateFactorial(num);
      return isNaN(factResult) ? 'Error' : factResult.toString();
    });

    if (processedExpression.includes('Error')) return 'Error';

    const calcResult = new Function(`return ${processedExpression}`)();

    if (calcResult === Infinity || calcResult === -Infinity || isNaN(calcResult)) {
      return 'Error';
    }

    return Number(Number(calcResult).toFixed(8)).toString();
  } catch (error) {
    return 'Error:'+error;
  }
};
