export class Helper {
  constructor(priority) {
    this.priority = priority;
    this.scientificOperations = ['s', 'c', 't', 'l', 'n'];
  }
  isSingleDigitNumber(str) {
    if (str.charCodeAt(0) >= 48 && str.charCodeAt(0) <= 57) {
      return true;
    }
    return false;
  }

  isValidToken(input, i, tokenStr) {
    if (this.isSingleDigitNumber(input[i])) {
      return true;
    }
    if (input[i] === '.' && !tokenStr.includes('.')) {
      return true;
    }
    if (input[i] === '-' || input[i] === '+') {
      if (i === 0) {
        return true;
      }
      if (input[i - 1] === '(') {
        return true;
      }
    }
    for (let key of this.scientificOperations) {
      if (tokenStr.includes(key) && !isNaN(input[i])) {
        return true;
      }
    }
    if (this.scientificOperations.includes(input[i]) && tokenStr === '') {
      return true;
    }
    if (input[i] === 'π' || input[i] === 'e') {
      if (input[i - 1] && this.scientificOperations.includes(input[i - 1])) {
        return true;
      }
    }
    return false;
  }

  isNotOperator(str) {
    if (!(str in this.priority) && str !== '(' && str !== ')') {
      return true;
    }
    return false;
  }

  flushParenthesis(operator, output) {
    if (operator.includes('(')) {
      while (operator[operator.length - 1] !== '(') {
        let operator_token = operator.pop();
        output.push(operator_token);
      }
      operator.pop();
    } else {
      console.log(`Error`);
    }
  }

  isValidOperator(str, operator) {
    if (str === '(') {
      return true;
    }
    if (str in this.priority) {
      if (operator.length === 0) {
        return true;
      }
      if (this.priority[str] > this.priority[operator[operator.length - 1]]) {
        return true;
      }
    }
    return false;
  }

  calculateTrig(operator, output, data, isDegree) {
    if (data === '') {
      output.push(operator);
    } else if (operator === 's') {
      if (isDegree) {
        output.push(this.roundValue(Math.sin(data * (Math.PI / 180))));
      } else {
        output.push(this.roundValue(Math.sin(data)));
      }
    } else if (operator === 'c') {
      if (isDegree) {
        output.push(this.roundValue(Math.cos(data * (Math.PI / 180))));
      } else {
        output.push(this.roundValue(Math.cos(data)));
      }
    } else if (operator === 't') {
      if (isDegree) {
        output.push(this.roundValue(Math.tan(data * (Math.PI / 180))));
      } else {
        output.push(this.roundValue(Math.tan(data)));
      }
    }
  }

  calculateTrigFinal(data, operator) {
    if (operator === 's') {
      return this.roundValue(Math.sin(data * (Math.PI / 180)));
    }
    if (operator === 'c') {
      return this.roundValue(Math.cos(data * (Math.PI / 180)));
    }
    if (operator === 't') {
      return this.roundValue(Math.tan(data * (Math.PI / 180)));
    }
    if (operator === 'l') {
      return this.roundValue(Math.log10(data));
    }
    if (operator === 'n') {
      return this.roundValue(Math.log(data));
    }
  }

  roundValue(data) {
    return parseFloat(data.toFixed(8)).toString();
  }
}
