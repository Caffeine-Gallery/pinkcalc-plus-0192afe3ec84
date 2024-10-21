import { backend } from 'declarations/backend';

let currentInput = '';
let currentOperation = null;
let firstOperand = null;

const resultDisplay = document.getElementById('result');
const historyList = document.getElementById('historyList');
const savedResultsList = document.getElementById('savedResultsList');

document.querySelectorAll('.number, .decimal').forEach(button => {
    button.addEventListener('click', () => {
        currentInput += button.textContent;
        updateDisplay();
    });
});

document.querySelectorAll('.operator').forEach(button => {
    button.addEventListener('click', () => {
        if (currentInput !== '') {
            if (firstOperand === null) {
                firstOperand = parseFloat(currentInput);
                currentOperation = button.dataset.op;
                currentInput = '';
            } else {
                calculate();
                currentOperation = button.dataset.op;
            }
        }
    });
});

document.querySelector('.equals').addEventListener('click', calculate);

document.querySelector('.clear').addEventListener('click', () => {
    currentInput = '';
    currentOperation = null;
    firstOperand = null;
    updateDisplay();
});

document.querySelector('.save').addEventListener('click', saveResult);

function updateDisplay() {
    resultDisplay.value = currentInput;
}

async function calculate() {
    if (firstOperand !== null && currentOperation && currentInput !== '') {
        const secondOperand = parseFloat(currentInput);
        try {
            const result = await backend.calculate(
                { [currentOperation]: null },
                firstOperand,
                secondOperand
            );
            currentInput = result.toString();
            updateDisplay();
            firstOperand = null;
            currentOperation = null;
            updateHistory();
        } catch (error) {
            currentInput = 'Error';
            updateDisplay();
        }
    }
}

async function updateHistory() {
    const history = await backend.getHistory();
    historyList.innerHTML = '';
    history.forEach(calc => {
        const li = document.createElement('li');
        li.textContent = `${calc.operand1} ${getOperationSymbol(calc.operation)} ${calc.operand2} = ${calc.result}`;
        historyList.appendChild(li);
    });
}

function getOperationSymbol(operation) {
    switch (Object.keys(operation)[0]) {
        case 'add': return '+';
        case 'subtract': return '-';
        case 'multiply': return '*';
        case 'divide': return '/';
    }
}

async function saveResult() {
    if (currentInput !== '' && currentInput !== 'Error') {
        await backend.saveResult(parseFloat(currentInput));
        updateSavedResults();
    }
}

async function updateSavedResults() {
    const savedResults = await backend.getSavedResults();
    savedResultsList.innerHTML = '';
    savedResults.forEach(result => {
        const li = document.createElement('li');
        li.textContent = result;
        savedResultsList.appendChild(li);
    });
}

// Initial update of history and saved results
updateHistory();
updateSavedResults();
