window.calculatorState = {
  display: '0',
  firstOperand: null,
  operator: null,
  waitingForSecondOperand: false,
  memory: 0
};

function createCalculatorElements() {
  const modal = document.createElement('div');
  modal.className = 'calculator-modal';
  
  modal.innerHTML = `
    <div class="calculator-content">
      <div class="calculator-header">
        <h2 class="calculator-title">計算機</h2>
        <button class="calculator-close">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="calculator-display">0</div>
      <div class="calculator-buttons">
        <button class="calculator-button">%</button>
        <button class="calculator-button">CE</button>
        <button class="calculator-button">C</button>
        <button class="calculator-button operator">⌫</button>
        <button class="calculator-button">¹/ₓ</button>
        <button class="calculator-button">x²</button>
        <button class="calculator-button">²√x</button>
        <button class="calculator-button operator">÷</button>
        <button class="calculator-button">7</button>
        <button class="calculator-button">8</button>
        <button class="calculator-button">9</button>
        <button class="calculator-button operator">×</button>
        <button class="calculator-button">4</button>
        <button class="calculator-button">5</button>
        <button class="calculator-button">6</button>
        <button class="calculator-button operator">-</button>
        <button class="calculator-button">1</button>
        <button class="calculator-button">2</button>
        <button class="calculator-button">3</button>
        <button class="calculator-button operator">+</button>
        <button class="calculator-button">±</button>
        <button class="calculator-button">0</button>
        <button class="calculator-button">.</button>
        <button class="calculator-button equals">=</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  return modal;
}

function updateDisplay() {
  const display = document.querySelector('.calculator-display');
  if (display) {
    display.textContent = window.calculatorState.display;
  }
}

function inputDigit(digit) {
  const { display, waitingForSecondOperand } = window.calculatorState;
  
  if (waitingForSecondOperand) {
    window.calculatorState.display = digit;
    window.calculatorState.waitingForSecondOperand = false;
  } else {
    window.calculatorState.display = display === '0' ? digit : display + digit;
  }
}

function inputDecimal() {
  if (window.calculatorState.waitingForSecondOperand) {
    window.calculatorState.display = '0.';
    window.calculatorState.waitingForSecondOperand = false;
    return;
  }
  
  if (!window.calculatorState.display.includes('.')) {
    window.calculatorState.display += '.';
  }
}

function handleOperator(nextOperator) {
  const { firstOperand, display, operator } = window.calculatorState;
  const inputValue = parseFloat(display);
  
  if (firstOperand === null && !isNaN(inputValue)) {
    window.calculatorState.firstOperand = inputValue;
  } else if (operator) {
    const result = calculate(firstOperand, inputValue, operator);
    window.calculatorState.display = String(result);
    window.calculatorState.firstOperand = result;
  }
  
  window.calculatorState.waitingForSecondOperand = true;
  window.calculatorState.operator = nextOperator;
}

function calculate(firstOperand, secondOperand, operator) {
  switch (operator) {
    case '+':
      return firstOperand + secondOperand;
    case '-':
      return firstOperand - secondOperand;
    case '×':
      return firstOperand * secondOperand;
    case '÷':
      return secondOperand !== 0 ? firstOperand / secondOperand : 'Error';
    default:
      return secondOperand;
  }
}

function resetCalculator() {
  window.calculatorState = {
    display: '0',
    firstOperand: null,
    operator: null,
    waitingForSecondOperand: false,
    memory: 0
  };
}

function clearEntry() {
  window.calculatorState.display = '0';
}

function backspace() {
  const display = window.calculatorState.display;
  window.calculatorState.display = display.length > 1 ? display.slice(0, -1) : '0';
}

function percentage() {
  const currentValue = parseFloat(window.calculatorState.display);
  if (!isNaN(currentValue)) {
    window.calculatorState.display = String(currentValue / 100);
  }
}

function square() {
  const currentValue = parseFloat(window.calculatorState.display);
  if (!isNaN(currentValue)) {
    window.calculatorState.display = String(currentValue * currentValue);
  }
}

function squareRoot() {
  const currentValue = parseFloat(window.calculatorState.display);
  if (!isNaN(currentValue) && currentValue >= 0) {
    window.calculatorState.display = String(Math.sqrt(currentValue));
  } else {
    window.calculatorState.display = 'Error';
  }
}

function reciprocal() {
  const currentValue = parseFloat(window.calculatorState.display);
  if (!isNaN(currentValue) && currentValue !== 0) {
    window.calculatorState.display = String(1 / currentValue);
  } else {
    window.calculatorState.display = 'Error';
  }
}

function toggleSign() {
  const currentValue = parseFloat(window.calculatorState.display);
  if (!isNaN(currentValue)) {
    window.calculatorState.display = String(-currentValue);
  }
}

function updateCalculator(value) {
  switch (value) {
    case '0':
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
      inputDigit(value);
      break;
    case '.':
      inputDecimal();
      break;
    case '+':
    case '-':
    case '×':
    case '÷':
      handleOperator(value);
      break;
    case '=':
      if (window.calculatorState.firstOperand !== null) {
        handleOperator('=');
      }
      break;
    case 'C':
      resetCalculator();
      break;
    case 'CE':
      clearEntry();
      break;
    case '⌫':
      backspace();
      break;
    case '±':
      toggleSign();
      break;
    case '%':
      percentage();
      break;
    case 'x²':
      square();
      break;
    case '²√x':
      squareRoot();
      break;
    case '¹/ₓ':
      reciprocal();
      break;
  }
  
  updateDisplay();
}

function initializeCalculator() {
  const modal = createCalculatorElements();
  const closeButton = modal.querySelector('.calculator-close');
  const buttons = modal.querySelectorAll('.calculator-button');
  
  closeButton.addEventListener('click', () => {
    modal.classList.remove('active');
  });
  
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      updateCalculator(button.textContent);
    });
  });
  
  // キーボードイベントの追加
  document.addEventListener('keydown', (event) => {
    if (!modal.classList.contains('active')) return;

    const key = event.key;
    if (/[0-9]/.test(key)) {
      updateCalculator(key);
    } else {
      const keyMap = {
        '+': '+',
        '-': '-',
        '*': '×',
        '/': '÷',
        'Enter': '=',
        'Escape': 'C',
        'Backspace': '⌫',
        '.': '.',
      };
      if (keyMap[key]) {
        event.preventDefault();
        updateCalculator(keyMap[key]);
      }
    }
  });
  
  return modal;
}

document.addEventListener('DOMContentLoaded', () => {
  const calculatorModal = initializeCalculator();
  
  document.querySelector('.calculator-icon').addEventListener('click', () => {
    calculatorModal.classList.add('active');
  });
});