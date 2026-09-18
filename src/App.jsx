import{ useState } from 'react';
import { Button } from "antd";

const App = () => {
  const [display,setDisplay] = useState("");
  const [equals,setEquals] = useState(false);
  const operators = ["+","-","*","/"];

  const getCurrentNumber = () => {

    let currentNumber = 0;

    const lastOperatorIndex =  Math.max(
      display.lastIndexOf("+"),
      display.lastIndexOf("-"),
      display.lastIndexOf("*"),
      display.lastIndexOf("/")
    )
    if(lastOperatorIndex === -1){
      currentNumber = display;
    }else{
      currentNumber = display.slice(lastOperatorIndex + 1);
    }
      return currentNumber;
  }

  const handleClick = (value) => {
    
    if(operators.includes(value)){

        if(operators.includes(display[display.length - 1])){

          setDisplay(display.slice(0,display.length-1) + value);

        }else{

        setDisplay((prevValue) => prevValue + value);

        }
      }
     
    else if(value === "."){
          const currentNumber = getCurrentNumber();
          if(!currentNumber.includes(".")){
            setDisplay((prevValue) => prevValue + value);
          }
        }
    else{
            if(equals){
               setDisplay(value);
             }
              else{
              setDisplay((prevValue) => prevValue + value);
              }
        }

          setEquals(false); 
     

  }

  const handleClear = () => {
    setDisplay("");
  }

  const handleCalculate = () => {
    try{
      setEquals(true);
    setDisplay(eval(display));
    }catch{
      setDisplay("Error");
    }
  }


return (
  <div className="min-h-screen bg-offwhite-100 flex flex-col items-center">

    {/* Header */}
    <div className="w-full py-6 shadow-md text-center text-4xl font-bold bg-white">
      <h1>Calculator</h1>
    </div>

    {/* Calculator */}
    <div className="w-[360px] bg-white rounded-2xl shadow-2xl p-5 mt-10">

      {/* Display */}
      <div className="bg-gray-900 text-white rounded-xl p-5 mb-5">
        <div className="text-right text-4xl font-semibold min-h-[50px] overflow-hidden">
          {display || "0"}
        </div>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-4 gap-3">

        {/* Row 1 */}
        <Button
          className="h-16 text-xl"
          onClick={handleClear}
        >
          AC
        </Button>

        <Button
          className="h-16 text-xl"
          onClick={() => handleClick("/")}
        >
          ÷
        </Button>

        <Button
          className="h-16 text-xl"
          onClick={() => handleClick("*")}
        >
          ×
        </Button>

        <Button
          className="h-16 text-xl"
          onClick={() => handleClick("-")}
        >
          −
        </Button>

        {/* Row 2 */}
        <Button
          className="h-16 text-xl"
          onClick={() => handleClick("7")}
        >
          7
        </Button>

        <Button
          className="h-16 text-xl"
          onClick={() => handleClick("8")}
        >
          8
        </Button>

        <Button
          className="h-16 text-xl"
          onClick={() => handleClick("9")}
        >
          9
        </Button>

        <Button
          className="h-16 text-xl"
          onClick={() => handleClick("+")}
        >
          +
        </Button>

        {/* Row 3 */}
        <Button
          className="h-16 text-xl"
          onClick={() => handleClick("4")}
        >
          4
        </Button>

        <Button
          className="h-16 text-xl"
          onClick={() => handleClick("5")}
        >
          5
        </Button>

        <Button
          className="h-16 text-xl"
          onClick={() => handleClick("6")}
        >
          6
        </Button>

        {/* Equal button */}
        <Button
          className="h-[140px] text-xl row-span-2"
          onClick={handleCalculate}
        >
          =
        </Button>

        {/* Row 4 */}
        <Button
          className="h-16 text-xl"
          onClick={() => handleClick("1")}
        >
          1
        </Button>

        <Button
          className="h-16 text-xl"
          onClick={() => handleClick("2")}
        >
          2
        </Button>

        <Button
          className="h-16 text-xl"
          onClick={() => handleClick("3")}
        >
          3
        </Button>

        {/* Row 5 */}
        <Button
          className="h-16 text-xl col-span-2"
          onClick={() => handleClick("0")}
        >
          0
        </Button>

        <Button
          className="h-16 text-xl"
          onClick={() => handleClick(".")}
        >
          .
        </Button>

      </div>
    </div>
  </div>
);
}

export default App