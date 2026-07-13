let input = document.getElementById('display');

// Function to handle percentage calculations
function handlePercent() {
    let expr = input.value;
    // Replace visual operators for evaluation
    let jsExpr = expr.replace(/÷/g, '/').replace(/×/g, '*');

    // Regex to match: (optional operator)(number) at the end
    let regex = /([+\-*/]?)(\d+(?:\.\d+)?)$/;
    let match = jsExpr.match(regex);
    if (!match) return;

    let op = match[1];
    let num = parseFloat(match[2]);

    if (!op) {
        // No operator: just convert number to percentage (50% -> 0.5)
        let result = num / 100;
        input.value = result.toString();
        return;
    }

    // Get the number before the operator
    let beforeRegex = /(?:^|[\+\-\*\/])(\d+(?:\.\d+)?)(?=[\+\-\*\/]\d+$)/;
    let beforeMatch = jsExpr.match(beforeRegex);
    if (!beforeMatch) return;
    let leftNum = parseFloat(beforeMatch[1]);

    let percentValue = leftNum * (num / 100);
    let result;
    switch (op) {
        case '+': result = leftNum + percentValue; break;
        case '-': result = leftNum - percentValue; break;
        case '*': result = leftNum * (num / 100); break;
        case '/': result = leftNum / (num / 100); break;
        default: return;
    }
    input.value = result.toString();
}

// function to append value when user clicks on button
function appendCalc(value) {

    if (value === '%') {
        handlePercent();
        return;
    }
    else if (input.value === "0" || input.value === "Error") {
        if (value === "/" || value === "*") {
            input.value = "0";
            return;
        }
        input.value = value;
    } else if (value === "/") {
        console.log(value);
        input.value += "÷";
    } else if (value === "*") {
        console.log(value);
        input.value += "×";
    } else {
        input.value += value;
    }
}

// function to clear the display when user clicks on AC button
function clearDisplay() {
    input.value = "0"
}

// function to clear one character when user clicks on backspace button
function clearOne() {
    input.value = input.value.slice(0, -1);
    if (input.value === "") {
        input.value = "0";
    }
}

// function to evaluate the expression and display the result when user clicks on '=' button
function displayCalc() {
    try {
        let expression = input.value.replace(/÷/g, '/').replace(/×/g, '*');
        input.value = eval(expression);
    } catch (error) {
        input.value = "Error";
    }
}