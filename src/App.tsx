import React from 'react';
import './App.css';
import Display from './comp/display';
import Grid from './comp/grid';
import { useResult } from './comp/useResult';

const App: React.FC = () => {
    // استخراج الحالة والدالة مباشرة من الـ Hook
    const { input, result, handleClick } = useResult();

    return (
        <div className="calculator-container">
            <div className="calculator">
                <Display input={input} result={result}/>
                <Grid onButtonClick={handleClick} />
            </div>
        </div>
    );
};

export default App;
