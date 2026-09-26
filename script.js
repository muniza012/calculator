//////////////////////////////calculator///////////////////

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
  firstNum = result;
  operator = "";
  secondNum = "";
}

let firstNum = "";
let operator = "";
let secondNum = "";

function calculationHandler() {
  let result;

  const firstNumber = Number(firstNum);
  const secondNumber = Number(secondNum);
  if (operator === "+") {
    result = firstNumber + secondNumber;
    displayResult(result);
  } else if (operator === "-") {
    result = firstNumber - secondNumber;
    displayResult(result);
  } else if (operator === "*") {
    result = firstNumber * secondNumber;
    displayResult(result);
  } else if (operator === "/") {
    if (secondNumber === 0) {
      input.value = `${firstNumber} cannot be divided by 0`;
      result = input.value;
      return;
    } else {
      result = firstNumber / secondNumber;
    }

    displayResult(result);
  }
  return result;
}

function updateDisplay() {
  input.value = firstNum + operator + secondNum;
}

function handleClick(e) {
  const clickBtnValue = e.target.innerHTML;
  const clickBtnType = e.target.dataset.type;

  if (clickBtnType === "number") {
    !operator ? (firstNum += clickBtnValue) : (secondNum += clickBtnValue);
    updateDisplay();
  } else if (clickBtnType === "operator") {
    operator = clickBtnValue;
    updateDisplay();
  } else if (clickBtnType === "special") {
    if (clickBtnValue === "=") {
      if (firstNum && operator && secondNum) {
        calculationHandler();
        updateDisplay();
      }
    }
    if (clickBtnValue === ".") {
      if (!operator) {
        !firstNum.includes(".") ? (firstNum += ".") : "";

        updateDisplay();
      } else {
        !secondNum.includes(".") ? (secondNum += ".") : "";

        updateDisplay();
      }
    }
    if (clickBtnValue === "C") {
      firstNum = "";
      secondNum = "";
      operator = "";
      updateDisplay();
    }
  }
}

btns.addEventListener("click", handleClick);

//////////////////////////////to do ///////////////////////
const todoInput = document.getElementById("todo");
let todoTask = [];
let displayTodos = document.getElementById("display-container");
let savedTodos = localStorage.getItem("todoTask");
if (savedTodos === null) {
  displayTodos.innerHTML = `<p>no todos added</p>`;
} else {
  savedTodos = JSON.parse(savedTodos);
  todoTask = [...savedTodos];
}
const generateTodos = (todo) => {
  return `
  <div data-id=${todo.id} class="todoContainer">
  <p class=${todo.completed ? 'completed':''} >${todo.task}</p>
<input type="checkbox" data-type='checkbox' name="check" id="check" ${todo.completed ? "checked" : ""}>
<button class='edit-btn' data-type='edit' >edit</button>
<button  class='dlt-btn' data-type='delete' >delete</button>
</div>
  `;
};
if (todoTask.length === 0) {
  displayTodos.innerHTML = `<p>no todos added</p>`;
} else {
  displayTodos.innerHTML = todoTask.map(generateTodos).join("");
}

const handleClickTodo = () => {
  const todoInput_value = todoInput.value.trim();
  if (!todoInput_value) {
    return;
  } else {
    todoTask.push({
      task: todoInput_value,
      id: Math.random(),
      completed: false,
    });
  }
  localStorage.setItem("todoTask", JSON.stringify(todoTask));
  todoInput.value = "";

  displayTodos.innerHTML = todoTask.map(generateTodos).join("");
};

const confirmBtnHandler = (editedTask) => {
  if (!editedTask.value.trim()) return;
  matchedTask.task = editedTask.value.trim();

  localStorage.setItem("todoTask", JSON.stringify(todoTask));
  

  displayTodos.innerHTML = todoTask.map(generateTodos).join("");

};
function matchedTaskEdit() {
  if (matchedTask) {
    const editedTask = document.createElement("input");
    const confirmBtn = document.createElement("button");
    confirmBtn.innerText = "confirm";
    confirmBtn.addEventListener("click", () => {
      confirmBtnHandler(editedTask);
    });
    displayTodos.appendChild(editedTask);
    displayTodos.appendChild(confirmBtn);
  }
}

let matchedTask;
const handleBtnClicks = (e) => {
  const ele = e.target.dataset.type;
 

  if (ele === "edit") {
    matchedTask = todoTask.find((todo) => {
      const currentEle = +e.target.parentElement.dataset.id;
      let result = currentEle === todo.id;
      return result;
    });
    matchedTaskEdit();
  } else if (ele === "delete") {
    const currentEle = +e.target.parentElement.dataset.id;
   const matchedTaskIndex= todoTask.findIndex((todo) => {
    return todo.id === currentEle;
   
     
   })
    if (matchedTaskIndex !== -1) {
      todoTask.splice(matchedTaskIndex, 1);
      localStorage.setItem("todoTask", JSON.stringify(todoTask));

      displayTodos.innerHTML = todoTask.map(generateTodos).join("");
    }
   
    
  } else if (ele === "checkbox") {
    const checkedTask = todoTask.find((todo) => {
      const currentEle = +e.target.parentElement.dataset.id;
      return currentEle === todo.id;
    })
  checkedTask.completed = !checkedTask.completed
   
      localStorage.setItem("todoTask", JSON.stringify(todoTask));

      displayTodos.innerHTML = todoTask.map(generateTodos).join("");
  }
};

document.getElementById("add-todo").addEventListener("click", handleClickTodo);

displayTodos.addEventListener("click", handleBtnClicks);
