/* first we create a calculator object that'll basically handle 
the entire calculator operation */
const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitForNextOperand: false,
    operator: null,
    inBaseTen: true,
};

//function to handle the input digits
function inputDigit(digit) {
    const { displayValue, waitForNextOperand, inBaseTen } = calculator;// displayValue = calculator.displayValue
    
    // Overwrite `displayValue` if the current value is '0' otherwise append to it
    //also if wFNO is true, replace the display value and set wFNO to false
    if (waitForNextOperand === true || inBaseTen === false) {
      calculator.displayValue = digit;
      calculator.waitForNextOperand = false;
      calculator.inBaseTen = true;
    } else {
      calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
      // the ternary operator "?" basically functions as an if statement
    }
}

//function to handle the decimals
function inputDecimal(dot) {
    /* to ensure any decimal input after an operator will be 
    appended to the 2nd number*/
    if (calculator.waitForNextOperand === true || calculator.inBaseTen === false) {
        calculator.displayValue = "0."
      calculator.waitForNextOperand = false;
      calculator.inBaseTen === true;
      return
    }
    // If the `displayValue` property does not contain a decimal point
    if (!calculator.displayValue.includes(dot)) {
      calculator.displayValue += dot;
    }
}

//function to handle the operators
function inputOperator(xxx) {
    const { firstOperand, displayValue, operator } = calculator
    const inputValue = parseFloat(displayValue);

    if (calculator.inBaseTen === false) {
        console.log("error, number not in base 10");
        return;
    }
    //this replaces any operator if clicked more than once
    if (operator && calculator.waitForNextOperand)  {
      calculator.operator = xxx;
      return;
    }
  
    //update the firstOperand if the following condition is met
    if (firstOperand == null && !isNaN(inputValue)) {
      calculator.firstOperand = inputValue;
    } else if (operator) { //else, if an operator has been assigned, call the evaluate function
      const result = evaluaTe(firstOperand, inputValue, operator);
    
      //convert the result back to string and set as the first operand
      calculator.displayValue = `${parseFloat(result.toFixed(4))}`;
      calculator.firstOperand = result;
    }
  
    /*waitForNextOperand is set to true indicating that the 1st number/operand has been
    entered while "operator" is set to whichever operator button is clicked */
    calculator.waitForNextOperand = true;
    calculator.operator = xxx;
}
  
//function to evaluate the mathematical expressions
function evaluaTe(firstOperand, secondOperand, operator) {
    if (operator === '+') {
      return firstOperand + secondOperand;
    } else if (operator === '-') {
      return firstOperand - secondOperand;
    } else if (operator === '*') {
      return firstOperand * secondOperand;
    } else if (operator === '/') {
      return firstOperand / secondOperand;
    } else if (operator === '&') {
      return firstOperand & secondOperand;  
    } else if (operator === '|') {
      return firstOperand | secondOperand;  
    } else if (operator === '^') {
      return firstOperand ^ secondOperand;  
    }
  
    return secondOperand;
}
  
//function to clear the calculator screen
function clearScreen() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitForNextOperand = false;
    calculator.operator = null;
    calculator.inBaseTen = true;
}

//function to convert from decimal to other number bases!
function inputNumberBases(ddd) {
  var lala = eval(calculator.displayValue);
  if (calculator.inBaseTen === false) {
    console.log("error, number not in base 10");
    return;
  }else if (ddd === 'bin' && calculator.inBaseTen === true) { //convert to binary
    calculator.displayValue = lala.toString(2);
  }else if (ddd === 'oct' && calculator.inBaseTen === true) { //convert to octadecimal 
    calculator.displayValue = lala.toString(8);
  }else if (ddd === 'hex' && calculator.inBaseTen === true) { //convert to hexadecimal
    calculator.displayValue = lala.toString(16);
  }
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
  calculator.inBaseTen = false;
}

//function to delete elements from the screen
function deleteDEL() {
    var lala = calculator.displayValue;

    if (calculator.inBaseTen === false) {
        clearScreen();
    } else if (lala.length > 1 && calculator.inBaseTen === true) {
        calculator.displayValue = lala.substring(0, lala.length -1);
        calculator.firstOperand = null;
        calculator.waitForNextOperand = false;
        calculator.operator = null;
        calculator.inBaseTen = true;
    } else {
        clearScreen();
    }
}
  
function updateDisplay() {
    const display = document.querySelector('.display');
    display.value = calculator.displayValue;
}
  
updateDisplay();
  

//creating the eventlistener and specifying conditions for it.
const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', event => {
    //access the clicked elememt using the destructuring assignment!
    const { target } = event; //so basically, target = event.target
    const { value } = target;
    if (!target.matches('button')) {
      return;
    }
  
    //now with the use of a switch statement, we sort through all button clicks.
    switch (value) {
      case '+':
      case '-':
      case '*':
      case '/':
      case '=':
      case '&':
      case '|':
      case '^':      
        inputOperator(value);
        break;
      case 'bin':
      case 'oct':
      case 'hex':
        inputNumberBases(value);
        break;     
      case '.':
        inputDecimal(value);
        break;
      case 'clear-all':
        clearScreen();
        break;
      case 'del':
        deleteDEL();
        break;  
      default:
        if (Number.isInteger(parseFloat(value))) {
          inputDigit(value);
        }
    }
  
    updateDisplay();
});