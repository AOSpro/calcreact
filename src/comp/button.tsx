//Start:🕒 2026-09-03 Thursday 15:34:21
//Owner:🔧 AOSpro
//Call: 📞 t.me/aospro
//Project: 📌

import React from 'react';
import * as constants from './consts';

// تحديد أنواع البيانات (Props) التي يستقبلها الزر
interface ButtonProps {
  label: string;
  onClick: (value: string) => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  // دالة لتحديد الكلاس الخاص بالتصميم بناءً على نوع الزر
  const getButtonClass = (btn: string): string => {
    let className = 'btn';

    if (btn === '=') {
      className += ' equal-btn';
    } else if (['C', 'DEL'].includes(btn)) {
      className += ' clear-btn';
    } else if (constants.OPERATORS.includes(btn)) {
      className += ' operator-btn';
    }

    return className;
  };

  return (
    <button
      onClick={() => onClick(label)}
      className={getButtonClass(label)}
    >
      {label}
    </button>
  );
};

export default Button;

