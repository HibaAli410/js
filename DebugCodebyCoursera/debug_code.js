document.addEventListener('DOMContentLoaded', () => {
    // State Variables
    let currentInput = '0';
    let previousInput = '';
    let operator = null;
    let shouldResetDisplay = false;

    // DOM Elements
    const displayElement = document.getElementById('display');
    const expressionElement = document.getElementById('expression');
    const debugLogElement = document.getElementById('debug-log');
    const clearLogBtn = document.getElementById('clear-log');
    const keypad = document.querySelector('.keypad');

    // Helper: Logging to Debug Console
    function logDebug(message, type = 'info') {
        const time = new Date().toLocaleTimeString([], { hour12: false });
        const line = document.createElement('div');
        line.className = `terminal-line ${type}-msg`;
        
        let prefix = '[INFO]';
        if (type === 'system') prefix = '[SYSTEM]';
        else if (type === 'input') prefix = '[INPUT]';
        else if (type === 'op') prefix = '[OPERATOR]';
        else if (type === 'calc') prefix = '[CALC]';
        else if (type === 'result') prefix = '[RESULT]';
        else if (type === 'error') prefix = '[ERROR]';

        line.textContent = `${prefix} ${message}`;
        debugLogElement.appendChild(line);
        debugLogElement.scrollTop = debugLogElement.scrollHeight;
    }

    // Clear Console
    clearLogBtn.addEventListener('click', () => {
        debugLogElement.innerHTML = '';
        logDebug('Console logs cleared.', 'system');
    });

    // Update calculator screen display
    function updateDisplay() {
        displayElement.textContent = currentInput;
        
        if (operator && previousInput !== '') {
            let opSym = operator;
            if (operator === '*') opSym = '×';
            if (operator === '/') opSym = '÷';
            expressionElement.textContent = `${previousInput} ${opSym}`;
        } else {
            expressionElement.textContent = '';
        }
    }

    // Mathematical Operations Engine
    function safeEvaluate(n1, n2, op) {
        const num1 = parseFloat(n1);
        const num2 = parseFloat(n2);
        
        if (isNaN(num1) || isNaN(num2)) {
            throw new Error('Invalid numeric operands.');
        }

        let result;
        const startTime = performance.now();
        
        switch (op) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                if (num2 === 0) {
                    throw new Error('Division by zero.');
                }
                result = num1 / num2;
                break;
            default:
                throw new Error(`Unsupported operation: ${op}`);
        }

        const endTime = performance.now();
        const duration = (endTime - startTime).toFixed(4);
        
        // Round to 10 decimal places to fix float representation errors (e.g. 0.1 + 0.2)
        const finalResult = Math.round(result * 1e10) / 1e10;
        
        logDebug(`Executing operation: ${num1} ${op} ${num2}`, 'calc');
        logDebug(`Evaluation succeeded in ${duration}ms. Output = ${finalResult}`, 'result');

        return finalResult.toString();
    }

    // Handle digit input
    function handleDigit(digit) {
        if (shouldResetDisplay) {
            currentInput = '';
            shouldResetDisplay = false;
        }

        // Prevent multiple decimal points
        if (digit === '.' && currentInput.includes('.')) {
            logDebug('Ignored duplicate decimal point.', 'error');
            return;
        }

        // Handle initial '0' input replacement
        if (currentInput === '0' && digit !== '.') {
            currentInput = digit;
        } else {
            currentInput += digit;
        }

        logDebug(`Input: '${digit}' -> Current operand: '${currentInput}'`, 'input');
        updateDisplay();
    }

    // Handle operator selection
    function handleOperator(op) {
        if (operator && !shouldResetDisplay) {
            try {
                currentInput = safeEvaluate(previousInput, currentInput, operator);
                updateDisplay();
            } catch (err) {
                logDebug(`Interception Error: ${err.message}`, 'error');
                currentInput = 'Error';
                updateDisplay();
                shouldResetDisplay = true;
                operator = null;
                previousInput = '';
                return;
            }
        }

        operator = op;
        previousInput = currentInput;
        shouldResetDisplay = true;

        let opSym = op;
        if (op === '*') opSym = '×';
        if (op === '/') opSym = '÷';
        logDebug(`Operator updated: '${opSym}'`, 'op');
        updateDisplay();
    }

    // Handle special actions
    function handleAction(action) {
        switch (action) {
            case 'clear':
                currentInput = '0';
                previousInput = '';
                operator = null;
                shouldResetDisplay = false;
                logDebug('Calculator state reset (AC).', 'system');
                updateDisplay();
                break;
            case 'backspace':
                if (currentInput.length > 1) {
                    currentInput = currentInput.slice(0, -1);
                } else {
                    currentInput = '0';
                }
                logDebug('Backspace triggered.', 'input');
                updateDisplay();
                break;
            case 'percent':
                const originalVal = currentInput;
                const pctVal = parseFloat(currentInput) / 100;
                currentInput = pctVal.toString();
                logDebug(`Percent: ${originalVal}% = ${currentInput}`, 'calc');
                updateDisplay();
                break;
            case 'negate':
                if (currentInput !== '0' && currentInput !== 'Error') {
                    currentInput = (parseFloat(currentInput) * -1).toString();
                    logDebug(`Negated sign. Operand = ${currentInput}`, 'input');
                    updateDisplay();
                }
                break;
        }
    }

    // Handle evaluation
    function handleEquals() {
        if (!operator) {
            logDebug('Equals clicked. No pending operation.', 'info');
            return;
        }

        try {
            const result = safeEvaluate(previousInput, currentInput, operator);
            
            currentInput = result;
            operator = null;
            previousInput = '';
            shouldResetDisplay = true;
            
            updateDisplay();
        } catch (err) {
            logDebug(`Interception Error: ${err.message}`, 'error');
            currentInput = 'Error';
            updateDisplay();
            shouldResetDisplay = true;
            operator = null;
            previousInput = '';
        }
    }

    // Event listener: Keypad buttons click
    keypad.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn');
        if (!btn) return;

        const val = btn.getAttribute('data-val');
        const action = btn.getAttribute('data-action');

        if (val) {
            if (['+', '-', '*', '/'].includes(val)) {
                handleOperator(val);
            } else {
                handleDigit(val);
            }
        } else if (action) {
            handleAction(action);
        } else if (btn.id === 'equals') {
            handleEquals();
        }
    });

    // Event listener: Keyboard input support
    document.addEventListener('keydown', (e) => {
        const key = e.key;

        // Numbers 0-9 and decimal point
        if (/^[0-9.]$/.test(key)) {
            e.preventDefault();
            handleDigit(key);
        }
        // Operators
        else if (['+', '-', '*', '/'].includes(key)) {
            e.preventDefault();
            handleOperator(key);
        }
        // Equals
        else if (key === 'Enter' || key === '=') {
            e.preventDefault();
            handleEquals();
        }
        // Backspace
        else if (key === 'Backspace') {
            e.preventDefault();
            handleAction('backspace');
        }
        // Clear (Escape or c / C)
        else if (key === 'Escape' || key.toLowerCase() === 'c') {
            e.preventDefault();
            handleAction('clear');
        }
        // Percent
        else if (key === '%') {
            e.preventDefault();
            handleAction('percent');
        }
    });
});