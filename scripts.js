let output = document.getElementById('output');
let currentInput = '';
let operation = '';
let firstOperand = null;
let formula = '';  // Variable to store the formula

function appendNumber(number) {
    if (currentInput.length >= 15) return;  // Limit input length
    currentInput += number;
    updateFormula();
}

function appendDecimal() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
    }
    updateFormula();
}

function setOperation(op) {
    if (firstOperand === null) {
        firstOperand = parseFloat(currentInput);
        formula = currentInput;  // Set the initial part of the formula
    } else if (operation) {
        calculateResult();
    }
    operation = op;
    formula += ' ' + operation + ' ';  // Add the operation to the formula
    currentInput = '';
    updateFormula();
}

function calculateResult() {
    if (firstOperand === null || !operation || currentInput === '') return;
    const secondOperand = parseFloat(currentInput);
    let result;
    switch (operation) {
        case '+':
            result = firstOperand + secondOperand;
            break;
        case '-':
            result = firstOperand - secondOperand;
            break;
        case '*':
            result = firstOperand * secondOperand;
            break;
        case '/':
            result = firstOperand / secondOperand;
            break;
    }
    formula += ' ' + currentInput + ' =';  // Complete the formula
    updateOutput(result);
    firstOperand = result;
    currentInput = '';
    operation = '';
    formula = '';  // Clear the formula for the next operation
}

function clearOutput() {
    currentInput = '';
    firstOperand = null;
    operation = '';
    formula = '';  // Clear the formula
    updateOutput('');
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    updateFormula();
}

function calculateScientific(func) {
    let result;
    const value = parseFloat(currentInput);
    switch (func) {
        case 'sqrt':
            result = Math.sqrt(value);
            break;
        case 'square':
            result = Math.pow(value, 2);
            break;
        case 'sin':
            result = Math.sin(value * Math.PI / 180);
            break;
        case 'cos':
            result = Math.cos(value * Math.PI / 180);
            break;
        case 'tan':
            result = Math.tan(value * Math.PI / 180);
            break;
        case 'log':
            result = Math.log10(value);
            break;
        case 'exp':
            result = Math.exp(value);
            break;
    }
    updateOutput(result);
    currentInput = result.toString();
}

function updateFormula() {
    let displayText = formula + ' ' + currentInput;
    updateOutput(displayText);
}

function updateOutput(value) {
    output.value = value;
}

function calculateBMI() {
    let weight = document.getElementById('weight').value;
    let height = document.getElementById('height').value;

    if (weight && height) {
        let bmi = weight / ((height / 100) ** 2);
        document.getElementById('bmi-result').innerText = `Your BMI is ${bmi.toFixed(2)}`;
    } else {
        document.getElementById('bmi-result').innerText = 'Please enter both weight and height';
    }
}

const lengthConversions = {
    meters: 1,
    kilometers: 0.001,
    miles: 0.000621371,
    feet: 3.28084
};

function convertLength() {
    let length = document.getElementById('length').value;
    let fromUnit = document.getElementById('from-unit').value;
    let toUnit = document.getElementById('to-unit').value;

    if (length) {
        let meters = length / lengthConversions[fromUnit];
        let result = meters * lengthConversions[toUnit];
        document.getElementById('length-result').innerText = `${length} ${fromUnit} is equal to ${result.toFixed(2)} ${toUnit}`;
    } else {
        document.getElementById('length-result').innerText = 'Please enter a length value';
    }
}

const weightConversions = {
    kilograms: 1,
    grams: 1000,
    pounds: 2.20462,
    ounces: 35.274
};

function convertWeight() {
    let weight = document.getElementById('weight-value').value;
    let fromUnit = document.getElementById('weight-from-unit').value;
    let toUnit = document.getElementById('weight-to-unit').value;

    if (weight) {
        let kilograms = weight / weightConversions[fromUnit];
        let result = kilograms * weightConversions[toUnit];
        document.getElementById('weight-result').innerText = `${weight} ${fromUnit} is equal to ${result.toFixed(2)} ${toUnit}`;
    } else {
        document.getElementById('weight-result').innerText = 'Please enter a weight value';
    }
}

function convertTemperature() {
    let temperature = document.getElementById('temperature-value').value;
    let fromUnit = document.getElementById('temperature-from-unit').value;
    let toUnit = document.getElementById('temperature-to-unit').value;
    let result;

    if (temperature) {
        if (fromUnit === toUnit) {
            result = temperature;
        } else if (fromUnit === 'celsius') {
            result = toUnit === 'fahrenheit' ? (temperature * 9/5) + 32 : parseFloat(temperature) + 273.15;
        } else if (fromUnit === 'fahrenheit') {
            result = toUnit === 'celsius' ? (temperature - 32) * 5/9 : ((temperature - 32) * 5/9) + 273.15;
        } else if (fromUnit === 'kelvin') {
            result = toUnit === 'celsius' ? temperature - 273.15 : (temperature - 273.15) * 9/5 + 32;
        }
        document.getElementById('temperature-result').innerText = `${temperature} ${fromUnit} is equal to ${result.toFixed(2)} ${toUnit}`;
    } else {
        document.getElementById('temperature-result').innerText = 'Please enter a temperature value';
    }
}

const timeConversions = {
    seconds: 1,
    minutes: 1/60,
    hours: 1/3600,
    days: 1/86400
};

function convertTime() {
    let time = document.getElementById('time-value').value;
    let fromUnit = document.getElementById('time-from-unit').value;
    let toUnit = document.getElementById('time-to-unit').value;

    if (time) {
        let seconds = time / timeConversions[fromUnit];
        let result = seconds * timeConversions[toUnit];
        document.getElementById('time-result').innerText = `${time} ${fromUnit} is equal to ${result.toFixed(2)} ${toUnit}`;
    } else {
        document.getElementById('time-result').innerText = 'Please enter a time value';
    }
}
