import { Helper } from './helper.js';

let priority = {
  '-': 1,
  '+': 1,
  '*': 2,
  '/': 3,
  '^': 4,
};
let unary_operators = ['s', 'c', 't', 'l', 'n'];

const helper = new Helper(priority);

function convertIntoToken(input) {
  let tokenList = [];
  let tokenStr = '';
  for (let i = 0; i < input.length; i++) {
    if (helper.isValidToken(input, i, tokenStr)) {
      if (input[i] === 'π') {
        tokenStr += helper.roundValue(Math.PI);
      } else if (input[i] === 'e') {
        tokenStr += helper.roundValue(Math.E);
      } else {
        tokenStr += input[i];
      }
    } else if (input[i] === 'π') {
      if (tokenStr === '') {
        tokenList.push(helper.roundValue(Math.PI));
      } else {
        tokenList.push('*');
        tokenList.push(helper.roundValue(Math.PI));
      }
    } else if (input[i] === 'e') {
      if (tokenStr === '') {
        tokenList.push(helper.roundValue(Math.E));
      } else {
        tokenList.push('*');
        tokenList.push(helper.roundValue(Math.E));
      }
    } else {
      if (tokenStr !== '') {
        tokenList.push(tokenStr);
      }
      tokenStr = '';
      if (input[i] !== '#') {
        tokenList.push(input[i]);
      }
    }
  }
  return tokenList;
}

function convertToPostfix(arr, isDegree) {
  let operatorList = [];
  let outputList = [];
  for (let i = 0; i < arr.length; i++) {
    if (helper.isNotOperator(arr[i])) {
      let actual_data;
      outputList.push(arr[i]);
    } else if (arr[i] === ')') {
      helper.flushParenthesis(operatorList, outputList);
    } else if (helper.isValidOperator(arr[i], operatorList)) {
      operatorList.push(arr[i]);
    } else {
      while (
        priority[arr[i]] <= priority[operatorList[operatorList.length - 1]]
      ) {
        let operator_token = operatorList.pop();
        outputList.push(operator_token);
      }
      operatorList.push(arr[i]);
    }
  }
  operatorList = operatorList.reverse();

  outputList = [...outputList, ...operatorList];
  return outputList;
}

function calculatePostFix(arr) {
  let stack = [];
  for (let i = 0; i < arr.length; i++) {
    if (!(arr[i] in priority) && !unary_operators.includes(arr[i])) {
      stack.push(arr[i]);
    } else if (unary_operators.includes(arr[i])) {
      let num = Number(stack.pop());
      let result = 0;
      switch (arr[i]) {
        case 's':
          result = helper.roundValue(Math.sin(num));

          break;
        case 'c':
          result = helper.roundValue(Math.cos(num));
          break;
        case 't':
          result = helper.roundValue(Math.tan(num));
          break;
        case 'l':
          result = helper.roundValue(Math.log(num));
          break;
        case 'n':
          result = helper.roundValue(Math.log(num));
          break;
      }
      stack.push(result);
    } else {
      let num2 = Number(stack.pop());
      let num1 = Number(stack.pop());
      let result = 0;
      switch (arr[i]) {
        case '+':
          result = helper.roundValue(num1 + num2);
          break;
        case '-':
          result = helper.roundValue(num1 - num2);
          break;
        case '*':
          result = helper.roundValue(num1 * num2);
          break;
        case '/':
          result = helper.roundValue(num1 / num2);
          break;
        case '^':
          result = helper.roundValue(Math.pow(num1, num2));
          break;
      }
      stack.push(result);
    }
  }

  let final_result = stack.length === 1 ? stack[0] : 'Error';

  return isNaN(final_result) ? 'Error' : final_result;
}

function calculate(userInput, isDegree) {
  userInput += '#';
  let token_data = convertIntoToken(userInput);
  let postfix_data = convertToPostfix(token_data, isDegree);
  let result = String(calculatePostFix(postfix_data));
  result = result.length > 18 ? Number(result).toExponential(6) : result;
  return result;
}

export { calculate };
