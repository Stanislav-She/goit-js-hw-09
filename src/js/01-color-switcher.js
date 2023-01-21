const refs = {
  backgroundBody: document.querySelector('body'),
  buttonStart: document.querySelector('[data-start]'),
  buttonStop: document.querySelector('[data-stop]'),
};
// створюємо набір змінних, у яких витягуємо посилання на елементи html

// console.dir(refs.backgroundBody);

refs.buttonStop.disabled = true;
// кнопку стоп від самого початку методом .disabled задаємо логічне значення вимкнення (деактивації),
// тобто прибираємо стандартно можливість натискання на кнопку Стоп, доки не буде ввімкнено Старт
let timeInterval = null;
// створюємо змінну для часового інтервалу з вихідним null значенням

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
}

function onStop(event) {
  clearInterval(timeInterval);
  refs.buttonStart.disabled = false;
  refs.buttonStop.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
