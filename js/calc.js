import { Helper } from './helper.js';

let priority = {
  '-': 1,
  '+': 1,
  '*': 2,
  '/': 3,
  '^': 4,
};

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
  console.log(arr);
  let operatorList = [];
  let outputList = [];
  for (let i = 0; i < arr.length; i++) {
    if (helper.isNotOperator(arr[i])) {
      let actual_data;
      switch (true) {
        case arr[i].includes('s'):
          actual_data = arr[i].replace('s', '');
          helper.calculateTrig('s', outputList, actual_data, isDegree);
          break;
        case arr[i].includes('c'):
          actual_data = arr[i].replace('c', '');
          helper.calculateTrig('c', outputList, actual_data, isDegree);
          break;
        case arr[i].includes('t'):
          actual_data = arr[i].replace('t', '');
          helper.calculateTrig('t', outputList, actual_data, isDegree);
          break;
        case arr[i].includes('l'):
          actual_data = arr[i].replace('l', '');
          let calc_log =
            actual_data === '' ? 'l' : helper.roundValue(Math.log(actual_data));
          outputList.push(calc_log);
          break;
        case arr[i].includes('n'):
          actual_data = arr[i].replace('n', '');
          let calc_ln =
            actual_data === '' ? 'l' : helper.roundValue(Math.log(actual_data));
          outputList.push(calc_ln);
          break;
        default:
          outputList.push(arr[i]);
      }
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
  console.log(arr);
  let stack = [];
  for (let i = 0; i < arr.length; i++) {
    if (!(arr[i] in priority)) {
      stack.push(arr[i]);
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
  if (stack.length === 2 && helper.scientificOperations.includes(stack[0])) {
    let last_data = stack.pop();
    let final_result = helper.calculateTrigFinal(last_data, stack[0]);
    stack = [final_result];
  }
  let final_result = stack.length === 1 ? stack[0] : 'Error';

  return isNaN(final_result) ? 'Error' : final_result;
}

function calculate(userInput, isDegree) {
  console.log(userInput);

  userInput += '#';
  let token_data = convertIntoToken(userInput);
  let postfix_data = convertToPostfix(token_data, isDegree);
  let result = String(calculatePostFix(postfix_data));
  result = result.length > 18 ? Number(result).toExponential(6) : result;
  return result;
}

// console.log(calculate('s30+c30'));
export { calculate };
