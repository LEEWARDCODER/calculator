let firstNumber = null,
  secondNumber = null,
  result = 0,
  reseverdOperator = null,
  isPressEqual = false;
const numberInString = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];
const operatorsInString = ["+", "-", "/", "*"];

initiation();

function initiation() {
  const lis = document.getElementsByTagName("li");
  for (let index = 0; index < lis.length; index++) {
    lis[index].addEventListener("click", getTagValue);
  }
}

function getTagValue(e) {
  const value = e.target.innerText;
  process(value);
}
function process(inputCharacter) {
  if (numberInString.includes(inputCharacter)) {
    doIfInputNumber(inputCharacter);
  } else if (operatorsInString.includes(inputCharacter)) {
    doIfInputOperator(inputCharacter);
  } else if (inputCharacter === "=") {
    pressEqual();
  } else if (inputCharacter === "clear") {
    clearScreen();
    clearData();
  } else throw Exception("Invalid input character");
}
function doIfInputNumber(inputCharacter) {
  //input first number but have not input the second number, then clear the screen
  if (reseverdOperator !== null && secondNumber === null) clearScreen();
  //if pressed a equal key just now and press a number, then everything goes back to start
  if (isPressEqual) {
    clearScreen();
    firstNumber = null;
    reseverdOperator = null;
    isPressEqual = false;
  }
  displayScreen(inputCharacter);
}

function doIfInputOperator(inputCharacter) {
  //if pressed a equal key just now and press an operator, then continue the calculation,
  //takeing the result as the first number
  if (isPressEqual) {
    firstNumber = result;
    isPressEqual = false;
  }
  pressOperator(inputCharacter);
}
function displayScreen(nextCharacter) {
  const screen = document.getElementsByTagName("div")[0];
  const currentText = screen.innerText ?? "";

  //either start with . symbol or press multiple . symbol is not allowed
  if (
    (nextCharacter === "." && currentText.includes(".")) ||
    (nextCharacter === "." && currentText === "")
  )
    return;

  const newText = currentText + nextCharacter;
  screen.innerText = newText;

  saveNumbers(newText);
}

function saveNumbers(number) {
  if (reseverdOperator === null) firstNumber = +number;
  else secondNumber = +number;
}

function clearScreen() {
  const screen = document.getElementsByTagName("div")[0];
  screen.innerText = "";
}

function clearData() {
  firstNumber = secondNumber = reseverdOperator = null;
}
function pressOperator(operator) {
  if (firstNumber !== null && secondNumber !== null) {
    result = operate(reseverdOperator, firstNumber, secondNumber);
    clearScreen();
    displayScreen(result);
    secondNumber = null;

    firstNumber = result;
    reseverdOperator = operator;
  } else if (firstNumber !== null && secondNumber === null) {
    reseverdOperator = operator;
  } else;
}

function pressEqual() {
  if (reseverdOperator === null || firstNumber === null) return false;
  result = operate(reseverdOperator, firstNumber, secondNumber);
  clearScreen();
  displayScreen(result);
  secondNumber = null;
  isPressEqual = true;
}

function operate(operator, n1, n2) {
  let operation;

  switch (operator) {
    case "+":
      operation = add;
      break;
    case "-":
      operation = subtract;
      break;
    case "*":
      operation = multiply;
      break;
    case "/":
      operation = divide;
  }

  const res = +operation(n1, n2);
  if (!Number.isInteger(res)) {
    const decimalNumbers = res.toString().split(".").pop().length;
    if (decimalNumbers > 4) return res.toFixed(4);
  }

  return res;
}

function add(n1, n2) {
  return n1 + n2;
}

function subtract(n1, n2) {
  return n1 - n2;
}

function multiply(n1, n2) {
  return n1 * n2;
}

function divide(n1, n2) {
  if (n2 == 0) {
    clearData();
    alert("x / 0 is not allowed, program has been initalized");
    return Infinity;
  }

  return n1 / n2;
}
