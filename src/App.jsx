import{ useState } from 'react';
import { Button } from "antd";


const buttons = [
  { label: "Clear", value: "clear", type: "action" },
  { label: "Del", value: "delete", type: "action" },
  { label: "+/-", value: "sign", type: "action" },
  { label: "x²", value: "square", type: "action" },

  { label: "1", value: "1", type: "number" },
  { label: "2", value: "2", type: "number" },
  { label: "3", value: "3", type: "number" },
  { label: "+", value: "+", type: "operator" },

  { label: "4", value: "4", type: "number" },
  { label: "5", value: "5", type: "number" },
  { label: "6", value: "6", type: "number" },
  { label: "÷", value: "/", type: "operator" },

  { label: "7", value: "7", type: "number" },
  { label: "8", value: "8", type: "number" },
  { label: "9", value: "9", type: "number" },
  { label: "−", value: "-", type: "operator" },

  { label: "0", value: "0", type: "number" },
  { label: "xʸ", value: "^", type: "operator" },
  { label: "√", value: "sqrt", type: "action" },
  { label: "×", value: "*", type: "operator" },

  { label: ".", value: ".", type: "number" },
  { label: "=", value: "=", type: "equals" },
];

const App = () => {
  const [currentNumber, setCurrentNumber] = useState("");
  const [previousNumber, setPreviousNumber] = useState("");
  const [operator, setOperator] = useState("");
  const [result, setResult] = useState("");
  const [justCalculated, setJustCalculated] = useState(false);

const calculate = (first, second, selectedOperator) => {
    const firstNumber = Number(first);
    const secondNumber = Number(second);

    switch (selectedOperator) {
      case "+":
        return firstNumber + secondNumber;

      case "-":
        return firstNumber - secondNumber;

      case "*":
        return firstNumber * secondNumber;

      case "/":
        if (secondNumber === 0) {
          return "Error";
        }
        return firstNumber / secondNumber;

      case "^":
        return Math.pow(firstNumber, secondNumber);

      default:
        return secondNumber;
    }
  };

  const handleClear = () => {
    setCurrentNumber("");
    setPreviousNumber("");
    setOperator("");
    setResult("");
    setJustCalculated(false);
  };

  const handleDelete = () => {
    if(justCalculated){
      return;
    }
    setCurrentNumber((prev) => prev.slice(0,-1));
  };

  const handleNumber = (value) => {
    // After "=" starts a new calculation
    if (justCalculated) {
      setCurrentNumber(value);
      setPreviousNumber("");
      setOperator("");
      setResult("");
      setJustCalculated(false);
      return;
    }

    setCurrentNumber((prev) => prev + value);
  };

  const handleDecimal = () => {
    if(justCalculated){
      setCurrentNumber("0.");
      setPreviousNumber("");
      setOperator("");
      setResult("");
      setJustCalculated(false);
      return;
    }
    if(currentNumber.includes(".")){
      return;
    }
    if (currentNumber === "") {
      setCurrentNumber("0.");
      return;
    }
    setCurrentNumber((prev) => prev + ".");
  }

  const handleOperator = (value) => {
    // Operator cannot be first
    if (currentNumber === "" && previousNumber === "" && result === "") {
      return;
    }
    // If user has just calculated:
    // result becomes the first number
    if (justCalculated) {
      setPreviousNumber(result);
      setCurrentNumber("");
      setOperator(value);
      setJustCalculated(false);
      return;
    }
    // If operator already exists and current number is empty,
    // replace the operator.
    if (operator && currentNumber === "") {
      setOperator(value);
      return;
    }

    // First operator
    if (previousNumber === "") {
      setPreviousNumber(currentNumber);
      setCurrentNumber("");
      setOperator(value);
      return;
    }
    // Chained calculation:
    if(currentNumber !== ""){
      const calculated = calculate(previousNumber,currentNumber,operator);
        if (calculated === "Error") {
            setResult("Error");
            return;
        }
      setResult(String(calculated));
      setPreviousNumber(String(calculated));
      setCurrentNumber("");
      setOperator(value);
    }

  };

  const handleEquals = () => {
   if (
      previousNumber === "" ||
      currentNumber === "" ||
      operator === ""
    ) {
      return;
    }

    const calculated = calculate(
      previousNumber,
      currentNumber,
      operator
    );

    setResult(String(calculated));
    setJustCalculated(true);
  };

  const handleSign = () => {
    if (currentNumber === "" || currentNumber === "0") {
      return;
    }

    if (currentNumber.startsWith("-")) {
      setCurrentNumber((prev) => prev.slice(1));
    } else {
      setCurrentNumber((prev) => "-" + prev);
    }
  };

  const handleSquare = () => {
    if (currentNumber === "") {
      return;
    }

    const value = Number(currentNumber);
    const squared = value * value;

    setCurrentNumber(String(squared));
  };

  const handleSquareRoot = () => {
    if(currentNumber === ""){
      return;
    }
    const value = Number(currentNumber);
    if(value < 0){
      setResult("Error");
      return;
    }
    setCurrentNumber(String(Math.sqrt(value)));
  };

  const handleClick = (button) => {
    const { value , type } = button;

    if(type === "number"){
      if(value === "."){
        handleDecimal();
      }else{
        handleNumber(value);
      }
      return;
    }

    if (type === "operator") {
      handleOperator(value);
      return;
    }

     switch (value) {
      case "clear":
        handleClear();
        break;

      case "delete":
        handleDelete();
        break;

      case "sign":
        handleSign();
        break;

      case "square":
        handleSquare();
        break;

      case "sqrt":
        handleSquareRoot();
        break;

      case "=":
        handleEquals();
        break;

      default:
        break;
    }

  };

    const operation = [previousNumber,operator, currentNumber,].filter(Boolean).join(" ");

return (
  <div className="min-h-screen bg-orange-50 flex flex-col items-center">
    <div className="w-full py-5 bg-white shadow text-center text-4xl font-bold text-orange-600">
      Calculator
    </div>

    <div className="w-200 bg-slate-200 rounded-3xl shadow-2xl p-6 mt-10">
      
      <div className="bg-slate-900 text-white rounded-2xl p-5 mb-5 text-right">
        <div className="text-xl text-gray-400 min-h-[30px]">{operation || " "}</div>
        <div className="text-[clamp(1rem,6vw,3rem)] font-bold min-h-[60px]">{result || currentNumber || "0"}</div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {buttons.map((button) => (
          <Button
            key={button.value}
            onClick={() => handleClick(button)}
            className={`!h-20 !text-xl !font-bold !rounded-xl ${
              button.type === "number"
                ? "!bg-white !text-slate-800"
                : button.type === "operator"
                ? "!bg-orange-500 !text-white"
                : button.type === "equals"
                ? "!bg-green-500 !text-white"
                : "!bg-blue-500 !text-white"
            }`}
          >
            {button.label}
          </Button>
        ))}
      </div>
    </div>
  </div>
);
}

export default App;