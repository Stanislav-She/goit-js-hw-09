const refs = {
  backgroundBody: document.querySelector('body'),
  buttonStart: document.querySelector('[data-start]'),
  buttonStop: document.querySelector('[data-stop]'),
  containerStyle: document.querySelector('div'),
};

refs.buttonStop.disabled = true;
let timeInterval = null;

const activeBtn =
  'border: none; margin-right: 10px; height: 50px; width: 100px; background: #0882E3; box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15); border-radius: 4px; font-weight: 900; color: #212121; font-size: 23px;';
const deactiveBtn =
  'border: none; margin-right: 10px; height: 50px; width: 100px; background: #B2BDC6; box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15); border-radius: 4px; font-weight: 900; color: #798086; font-size: 23px;';

refs.buttonStart.addEventListener('click', onStart);
refs.buttonStop.addEventListener('click', onStop);

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

// const refs = {
//   backgroundBody: document.querySelector('body'),
//   buttonStart: document.querySelector('[data-start]'),
//   buttonStop: document.querySelector('[data-stop]'),
//   containerStyle: document.querySelector('div'),
// };
// // створюємо набір змінних, у яких витягуємо посилання на елементи html
// // додав дівчик до html, бо захотів зпозиціонувати кнопки трішки інакше

// refs.buttonStop.disabled = true;
// // кнопку стоп від самого початку методом .disabled задаємо логічне значення вимкнення (деактивації),
// // тобто прибираємо стандартно можливість натискання на кнопку Стоп, доки не буде ввімкнено Старт
// let timeInterval = null;
// // створюємо змінну для часового інтервалу з вихідним null значенням
// const activeBtn =
//   'border: none; margin-right: 10px; height: 50px; width: 100px; background: #0882E3; box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15); border-radius: 4px; font-weight: 900; color: #212121; font-size: 23px;';
// const deactiveBtn =
//   'border: none; margin-right: 10px; height: 50px; width: 100px; background: #B2BDC6; box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15); border-radius: 4px; font-weight: 900; color: #798086; font-size: 23px;';
// // створюємо дві змінних, що містять інлайн стилі для кнопок Старт та Стоп у залежності від ї активності та додатково стилізовані
// refs.buttonStart.addEventListener('click', onStart);
// refs.buttonStop.addEventListener('click', onStop);
// // прикріплюємо на обидві кнопки слухачів подій click і другим параметром передаємо
// // колбек-функцію, яка має відпрацювати під час цих подій

// function onStart(event) {
//   // функція, яка відправцьовує під час кліку на кнопку Старт
//   timeInterval = setInterval(() => {
//     refs.backgroundBody.style.background = `${getRandomHexColor()}`;
//   }, 1000);
//   // змінній timeInterval пперезаписуємо методом setInterval новий час у 1 секунду.
//   // Тепер щосекунди фон елементу body замінюватиметься інлайнстилем на значення отримане
//   // колбек функції getRandomHexColor, що дає рандомний за класифікацією HEX колір
//   refs.buttonStart.disabled = true;
//   // поза інтервалом після натискання Старт, стан цієї кнопки .disabled приводимо в діючий
//   refs.buttonStop.disabled = false;
//   // а кнопки Стоп навпаки .disabled приводимо в протилежний, тобто робимо активною кнопку
//   refs.containerStyle.style.cssText =
//     'display: flex; justify-content: center; margin-top: 300px';
//   // на імпровізований div вішаємо інлайн стилі після першого натискання кнопки Старт
//   // і вже не знімаємо до перезавантаження сторінки
//   refs.buttonStart.style.cssText = deactiveBtn;
//   refs.buttonStop.style.cssText = activeBtn;
//   // кнопкам Старт та Стоп присвоюємо інлайн стилі рівняючи їх до раніше прописаних у змінних
// }

// function onStop(event) {
//   clearInterval(timeInterval);
//   // зтераємо часовий інтервал методом clearInterval() і задаємо значення константи timeInterval, тобто null,
//   // іншими словами перевизначаємо значення задане раніше методом setInterval()
//   refs.buttonStart.disabled = false;
//   // а кнопки Старт навпаки .disabled приводимо в протилежний, тобто робимо активною кнопку
//   refs.buttonStop.disabled = true;
//   // поза інтервалом після натискання Стоп, стан цієї кнопки .disabled приводимо в діючий
//   refs.buttonStart.style.cssText = activeBtn;
//   refs.buttonStop.style.cssText = deactiveBtn;
//   // кнопкам Старт та Стоп присвоюємо інлайн стилі рівняючи їх до раніше прописаних у змінних
// }

// function getRandomHexColor() {
//   return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
// }
// // колбек-функція рандомної генерації значень кольорів за HEX класифікацією
