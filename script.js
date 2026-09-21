const input = document.getElementById("input");
const btns = document.querySelector(".btns");

function generateBtns(btn) {
  return `<button data-type=${btn.type}  class='btn'>${btn.value}</button>`;
}

const num = [
  {
    value: 1,
    type: "number",
  },
  {
    value: 2,
    type: "number",
  },
  {
    value: 3,
    type: "number",
  },
  {
    value: 4,
    type: "number",
  },
  {
    value: 5,
    type: "number",
  },
  {
    value: 6,
    type: "number",
  },
  {
    value: 7,
    type: "number",
  },
  {
    value: 8,
    type: "number",
  },
  {
    value: 9,
    type: "number",
  },
  {
    value: 0,
    type: "number",
  },
];
const operators = [
  {
    value: "+",
    type: "operator",
  },
  {
    value: "-",
    type: "operator",
  },
  {
    value: "*",
    type: "operator",
  },
  {
    value: "/",
    type: "operator",
  },
];
const specialBtns = [
  {
    value: "=",
    type: "special",
  },
  {
    value: ".",
    type: "special",
  },
  {
    value: "C",
    type: "special",
  },
];

btns.innerHTML = [...num, ...specialBtns, ...operators]
  .map(generateBtns)
  .join("");
  function displayResult(result) {
    input.value = result;
    firstNum=result
    operator = '';
    secondNum=''
  }

  let firstNum='';
let operator='';
let secondNum='';

function calculationHandler() {
  let result;
  
  const firstNumber = Number(firstNum);
  const secondNumber = Number(secondNum);
  if (operator === "+") {
    result = firstNumber + secondNumber;
   displayResult(result)
  } else if (operator === "-") {
    result = firstNumber - secondNumber;
   displayResult(result)
  } else if (operator === "*") {
    result = firstNumber * secondNumber;
   displayResult(result)
  } else if (operator === "/") {
    result = firstNumber / secondNumber;
   displayResult(result)
  }
  return result
}




function updateDisplay() {
  input.value = firstNum + operator + secondNum;
}

  
function handleClick(e) {
  const clickBtnValue = e.target.innerHTML;
  const clickBtnType = e.target.dataset.type
 
  
  if (clickBtnType === 'number') {
    !operator ? (firstNum += clickBtnValue) : (secondNum += clickBtnValue);
    updateDisplay()
  } else if (clickBtnType === "operator") {
    operator = clickBtnValue
    updateDisplay()
  } else if (clickBtnType === "special") {
    if (clickBtnValue=== '=') {
      if (firstNum && operator && secondNum) {
       calculationHandler()
      } else if (clickBtnValue === ".") {
      
      }
   }
  }

}


btns.addEventListener("click", handleClick);
