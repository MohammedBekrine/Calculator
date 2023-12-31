let displayValue = '';
let firstNumber = '';
let operator = '';
let secondNumber = '';
let operatorCounter = 0;
let isError = 0;
let calculated = false;
let operatorUsed = false;

//This function resets all the values of the global variables without changing the text on the display 
function reset(){
    displayValue = '';
    firstNumber = '';
    operator = '';
    secondNumber = '';
    operatorCounter = 0;
    isError = 0;
    calculated = false;
    operatorUsed = false;
}

//clear the display and all the values of the global variables  
function clearDisplay(){
    displayValue = '';
    firstNumber = '';
    operator = '';
    secondNumber = '';
    operatorCounter = 0;
    isError = 0;
    calculated = false;
    operatorUsed = false;

    document.getElementById("display").value = displayValue;
};

//Insert number in the display variable
function putNumInDisplay(num){
    if(calculated === true){
        clearDisplay();
        displayValue += num;
        document.getElementById("display").value = displayValue;
        calculated = false;
    } else {
        displayValue += num;
        document.getElementById("display").value = displayValue;
        if (operatorUsed === true){
            operatorCounter += 1;
            operatorUsed = false;
        }
    }
};

//Insert operator in the display variable and calculates if there is a o
function putOpInDisplay(op){

    if (displayValue[0] !== op && operatorCounter === 1){
        operator = op;
        calculate();
        calculated = false;
        operatorUsed = true;
        displayValue += op;
        document.getElementById("display").value = displayValue;
        operatorUsed = '';
        operatorCounter = 0;
    } else if(displayValue[0] === op && operatorCounter === 2){
        operator = op;
        calculate();
        calculated = false;
        operatorUsed = true;
        displayValue += op;
        document.getElementById("display").value = displayValue;
        operatorUsed = '';
        operatorCounter = 0;
    } else if(operatorCounter > 1){
        displayValue = "ERROR"
        document.getElementById("display").value = displayValue;
        reset();
    } else {
        operator = op;
        displayValue += op;
        calculated = false;
        document.getElementById("display").value = displayValue;
        operatorCounter ++;
    }
};

function addPeriod(period){
    displayValue += period;
    document.getElementById("display").value = displayValue;
}


function splitvalues(values) {
    const regex = /(-?\d+(\.\d+)?)([-+*/%])(-?\d+(\.\d+)?)/;
    const match = values.match(regex);

    if (match) {
        const firstNumber = match[1];
        const operator = match[3];
        const secondNumber = match[4];

        return { firstNumber, operator, secondNumber };
    } else {
        isError = 2;
        return "ERROR ENTER Num op Num";
    }
};

function calculate(){
    const values = splitvalues(displayValue);

    firstNumber = values.firstNumber;
    operator = values.operator;
    secondNumber = values.secondNumber;

    const result = operate(firstNumber, operator, secondNumber);
    if (isError === 1){
        displayValue = "ERROR";
        document.getElementById("display").value = displayValue;
        reset();
    }else if(isError === 2){
        displayValue = "ERROR";
        document.getElementById("display").value = displayValue;
        reset();
    } else if(isError === 3){
        displayValue = "ERROR";
        document.getElementById("display").value = displayValue;
        reset();
    }else {
        const hasMoreThanTwoDecimals = (result * 100) % 1 !== 0;

        const roundedResult = hasMoreThanTwoDecimals ? result.toFixed(2) : result;
    
        displayValue = roundedResult.toString();

        document.getElementById("display").value = displayValue;
        calculated = true;
    }
    operatorCounter = 0;
};

function operate(numOne, operator, numTwo){
    if (operator === "+") {
        return +numOne + +numTwo;
    }else if (operator === "-") {
        return +numOne - +numTwo;
    }else if (operator === "*") {
        return +numOne * +numTwo;
    }else if (operator === "/") {
        if (numTwo == 0){
            clearDisplay();
            isError = 3;
        } else {
            return +numOne / +numTwo;
        }
    }else if(operator === '%'){
        if (Number.isInteger(+numOne) && Number.isInteger(+numTwo)){
            return +numOne % +numTwo; 
        } else {
            clearDisplay();
            isError = 1;
            
        };
    }
};
