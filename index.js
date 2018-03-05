const info = require('./package.json');
console.log('Hello! I am ' + info.version);

const Calculator = {
    calculate: (expression) => {
        let stack = [];
        let tokens = expression.split(' ');

        let counter = 0;
        let counter2 = 0;
        for (let i = 0; i < tokens.length; i++) {
            let token = tokens[i];

            if (Calculator.isNumber(token)) {
                stack.push(parseInt(token));
            }
            if (Calculator.isOperand(token)) {
                stack.push(
                    Calculator.doOperation(
                        token,
                        stack.pop(),
                        stack.pop()
                    )
                );
            }
        }
        return stack.pop();
    },

    doOperation: (operator, x, y) => {
        return Calculator.operations[operator](x, y);
    },

    operations: {
        '+': (x, y) => x + y,
        '-': (x, y) => x - y,
        '*': (x, y) => x * y,
        '/': (x, y) => x / y
    },

    isNumber: token => {
        return /\d+/.test(token);
    },

    isOperand: token => {
        return /[-\+\*\/]/.test(token);
    }
}

module.exports = (expression, message) => {
    console.log(message);
    return Calculator.calculate(expression);
};