//Start:🕒 2026-09-03 Thursday 15:34:21
//Owner:🔧 AOSpro
//Call: 📞 t.me/aospro
//Project: calc📌


import React from 'react';
import * as constants from './consts';
import Button from './button';

interface GridProps {
  onButtonClick: (value: string) => void;
}

const Grid: React.FC<GridProps> = ({ onButtonClick }) => {
  return (
    <div className="buttons-grid">
      {constants.BUTTONS.map((btn: string) => (
        <Button
          key={btn}
          label={btn}
          onClick={onButtonClick}
        />
      ))}
    </div>
  );
};

export default Grid;

