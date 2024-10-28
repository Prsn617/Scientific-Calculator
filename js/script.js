import { calculate } from './calc.js';

const main_display = document.querySelector('.main');
const prev_display = document.querySelector('.prev');
const deg = document.querySelector('#deg');
const rad = document.querySelector('#rad');
let all_data = document.querySelectorAll('span');
let input_data = '';
let isDegree = false;

all_data.forEach((item) => {
  item.addEventListener('click', (e) => {
    if (item.id === '=') {
      let result = calculate(
        input_data
          .replaceAll('÷', '/')
          .replaceAll('sin', 's')
          .replaceAll('cos', 'c')
          .replaceAll('tan', 't')
          .replaceAll('ln', 'n')
          .replaceAll('log', 'l'),
        isDegree
      );
      main_display.innerHTML = result;
      prev_display.innerHTML = input_data;
      input_data = result;
    } else if (item.id === 'deg') {
      isDegree = true;
      item.classList.add('active');
      rad.classList.remove('active');
    } else if (item.id === 'rad') {
      isDegree = false;
      item.classList.add('active');
      deg.classList.remove('active');
    } else if (item.id === 'clear') {
      input_data = '';
      main_display.innerHTML = input_data;
      prev_display.innerHTML = input_data;
    } else if (item.id === 'back') {
      console.log(input_data);
      input_data = input_data.slice(0, -1);
      main_display.innerHTML = input_data;
    } else {
      if (input_data.length < 18) {
        input_data += item.id;
        main_display.innerHTML = input_data;
      }
    }
  });
});
