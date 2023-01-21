const refs = {
  backgroundBody: document.querySelector('body'),
  buttonStart: document.querySelector('[data-start]'),
  buttonStop: document.querySelector('[data-stop]'),
  containerStyle: document.querySelector('div'),
};
// створюємо набір змінних, у яких витягуємо посилання на елементи html

// console.dir(refs.backgroundBody);

refs.buttonStop.disabled = true;
// кнопку стоп від самого початку методом .disabled задаємо логічне значення вимкнення (деактивації),
// тобто прибираємо стандартно можливість натискання на кнопку Стоп, доки не буде ввімкнено Старт
let timeInterval = null;
// створюємо змінну для часового інтервалу з вихідним null значенням
const activeBtn =
  'border: none; margin-right: 10px; height: 50px; width: 100px; background: #0882E3; box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15); border-radius: 4px; font-weight: 700; color: #212121; font-size: 16px;';
const deactiveBtn =
  'border: none; margin-right: 10px; height: 50px; width: 100px; background: #B2BDC6; box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15); border-radius: 4px; font-weight: 700; color: #798086; font-size: 16px;';

refs.buttonStart.addEventListener('click', onStart);
refs.buttonStop.addEventListener('click', onStop);
// прикріплюємо на обидві кнопки слухачів подій click і другим параметром передаємо
// колбек-функцію, яка має відпрацювати під час цих подій

function onStart(event) {
  timeInterval = setInterval(() => {
    refs.backgroundBody.style.background = `${getRandomHexColor()}`;
  }, 1000);
  refs.buttonStart.disabled = true;
  refs.buttonStop.disabled = false;
  refs.containerStyle.style.cssText =
    'display: flex; justify-content: center; margin-top: 300px';
  refs.buttonStart.style.cssText = deactiveBtn;
  refs.buttonStop.style.cssText = activeBtn;
}

function onStop(event) {
  clearInterval(timeInterval);
  refs.buttonStart.disabled = false;
  refs.buttonStop.disabled = true;
  refs.buttonStart.style.cssText = activeBtn;
  refs.buttonStop.style.cssText = deactiveBtn;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
