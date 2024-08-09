const calculator = document.querySelector("#calculator");
const display = document.querySelector(".display");
const operands = [];
const operators = [];
let lastPressed = "";
let ans = 0;
let total = 0;

const newOperand = operand => operands.push(operand);
const newOperator = operator => operators.push(operator);
const clear = () => {
    operands.length = 0;
    operators.length = 0;
    lastPressed = "";
    ans = 0;
    display.innerText = "";
};

calculator.addEventListener("click", event => {
    // console.log(event.target.innerText);

    if (event.target.classList.contains("number")) {
        if (lastPressed === "number") {
            operands[operands.length - 1] += event.target.innerText;
        }
        else if (lastPressed === "operator" || !lastPressed) {
            newOperand(event.target.innerText);
        }
        else if (lastPressed === "equals") {
            clear();
            total = 0;
            newOperand(event.target.innerText);
        }
        display.innerText += event.target.innerText;
        lastPressed = "number";
    }
    else if (event.target.classList.contains("operator")) {
        if (event.target.innerText === "C") {
            clear();
            total = 0;
        }

        else {
            if (lastPressed === "number") {
                newOperator(event.target.innerText);
                display.innerText += event.target.innerText;
            }
            else if (lastPressed === "operator" || !lastPressed) {
                operators[operators.length - 1] = event.target.innerText;
                display.innerText = display.innerText.slice(0, -1) + event.target.innerText;
            }
            else if (lastPressed === "equals") {
                ans = total;
                newOperand(ans);
                newOperator(event.target.innerText);
                display.innerText += event.target.innerText;
            }
        }
        lastPressed = "operator";
    }
    else if (event.target.classList.contains("equals")) {
        operands.forEach((operand, index) => {
            operand = parseFloat(operand, 10);
            if (index) {
                switch (operators[index - 1]) {
                    case "/":
                        total /= operand;
                        break;
                    case "*":
                        total *= operand;
                        break;
                    case "-":
                        total -= operand;
                        break;
                    case "+":
                        total += operand;
                        break;
                }
            }
            else {
                total = operand;
            }
        });
        clear();
        if (total === Infinity)
            display.innerText = "Error!";
        else
            display.innerText = total;

        lastPressed = "equals";
    }
});

