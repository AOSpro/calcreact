//Start:🕒 2026-09-03 Thursday 15:34:21
//Owner:🔧 AOSpro
//Call: 📞 t.me/aospro
//Project: 📌

export default function Display({input,result}:{input:string,result:string}) {
    return (
        <div className="display">
            <div className="input-screen">{input || '0'}</div>
            <div className="result-screen">{result}</div>
        </div>
    );
}
