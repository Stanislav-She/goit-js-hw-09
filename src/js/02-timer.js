import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import notiflix from 'notiflix';

const refs = {
  inputDate: document.querySelector('#datetime-picker'),
  buttonStart: document.querySelector('[data-start]'),
  daysLeft: document.querySelector('[data-days]'),
  hoursLeft: document.querySelector('[data-hours]'),
  minutesLeft: document.querySelector('[data-minutes]'),
  secondsLeft: document.querySelector('[data-seconds]'),
};

refs.buttonStart.disabled = true;
let timeInterval = null;
refs.buttonStart.addEventListener('click', onStart);

let dateChoice = flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      notiflix.Notify.failure('Please choose a date in the future', {
        timeout: 3000,
      });
      return;
    } else {
      refs.buttonStart.disabled = false;
      refs.buttonStart.style.cssText = 'background: #0d7e5a';
    }
  },
});

function onStart() {
  refs.buttonStart.disabled = true;
  refs.buttonStart.style.cssText = '';

  timeInterval = setInterval(() => {
    makeSpan();

    const millisecResult = dateChoice.selectedDates[0] - Date.now();
    if (millisecResult <= 1000) {
      clearInterval(timeInterval);
    }
  }, 1000);
}

function makeSpan() {
  const { daysLeft, hoursLeft, minutesLeft, secondsLeft } = refs;

  const millisecResult = dateChoice.selectedDates[0] - Date.now();

  const { days, hours, minutes, seconds } = convertMilliseconds(millisecResult);

  daysLeft.textContent = days;
  hoursLeft.textContent = hours;
  minutesLeft.textContent = minutes;
  secondsLeft.textContent = seconds;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMilliseconds(milliseconds) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(milliseconds / day));
  const hours = addLeadingZero(Math.floor((milliseconds % day) / hour));
  const minutes = addLeadingZero(
    Math.floor(((milliseconds % day) % hour) / minute)
  );
  const seconds = addLeadingZero(
    Math.floor((((milliseconds % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

// import flatpickr from 'flatpickr';
// // імпортуємо бібліотеку flatpickr
// import 'flatpickr/dist/flatpickr.min.css';
// // імпортуємо стилі бібліотеки flatpickr
// import notiflix from 'notiflix';
// // імпортуємо бібліотеку notiflix
// const refs = {
//   inputDate: document.querySelector('#datetime-picker'),
//   buttonStart: document.querySelector('[data-start]'),
//   daysLeft: document.querySelector('[data-days]'),
//   hoursLeft: document.querySelector('[data-hours]'),
//   minutesLeft: document.querySelector('[data-minutes]'),
//   secondsLeft: document.querySelector('[data-seconds]'),
// };
// // // створюємо набір змінних, у яких витягуємо посилання на елементи html
// // // додав дівчик до html, бо захотів зпозиціонувати таймер трішки інакше
// refs.buttonStart.disabled = true;
// // кнопку Start від самого початку методом .disabled задаємо логічне значення вимкнення (деактивації),
// // тобто прибираємо стандартно можливість натискання на кнопку Старт, доки не пропишемо подальшу логіку
// let timeInterval = null;
// // створюємо змінну для часового інтервалу з вихідним null значенням
// refs.buttonStart.addEventListener('click', onStart);
// // ставимо на кнопку Старт слухача подій кліку та прописуємо колбек-функцію, яка має зпрацювати при кліку

// let dateChoice = flatpickr('#datetime-picker', {
//   // ініціалізуємо бібліотеку flatpickr на input#datetime-picker, вона саме цього очікує
//   enableTime: true,
//   // ключ вмикає засіб вибору часу відповідно до документації «Options» бібліотеки flatpickr
//   time_24hr: true,
//   // ключ відображає засіб вибору часу в 24-годинному режимі без вибору AM/PM, якщо ввімкнено.
//   defaultDate: new Date(),
//   // встановлює початкові вибрані дати, прирівнюємо до поточного значення
//   minuteIncrement: 1,
//   // Регулює крок для введення хвилин (включно з прокручуванням)
//   onClose(selectedDates) {
//     if (selectedDates[0].getTime() < Date.now()) {
//       // якщо обрана дата менша поточної
//       notiflix.Notify.failure('Please choose a date in the future', {
//         // то бібліотека notiflix виводить попередження з текстом із його затримкою на екрані 3 секунди
//         timeout: 3000,
//       });
//       return;
//     } else {
//       // інакше, коли дата обрана в майбутнє, то
//       refs.buttonStart.disabled = false;
//       // деактивація кнопки Старт вимикаєть і можна відповідно запустити таймер
//       refs.buttonStart.style.cssText = 'background: #2196F3';
//       // кнопці Старт перезакріплюється беграунд інлайн стилем, який відмінний від дефолтного із css
//     }
//   },
// });

// function onStart() {
//   // коли відбувається клік на активну кнопку Старт, зпрацьовує ця колбек-функція
//   refs.buttonStart.disabled = true;
//   // відразу кнопці Старт активується деактивований стан
//   refs.buttonStart.style.cssText = '';
//   // кнопці Старт обнуляються інлайн стилі бекграунду

//   timeInterval = setInterval(() => {
//     // змінну timeInterval ініціалізуємо значенням функції setInterval
//     makeSpan();
//     // викликаємо колбек-функцію аби мати значення для оперування

//     const millisecResult = dateChoice.selectedDates[0] - Date.now();
//     if (millisecResult <= 1000) {
//       clearInterval(timeInterval);
//     }
//   }, 1000);
// }

// function makeSpan() {
//   // колбек, яка
//   const { daysLeft, hoursLeft, minutesLeft, secondsLeft } = refs;
//   // створює змінну-об'єкт ключів та зрівнює її з змінною-об'єктом refs,
//   // в якій так само лежать однойменні ключі
//   const millisecResult = dateChoice.selectedDates[0] - Date.now();
//   // створюємо змінну, до якої записуємо результат операції віднімання від валідної
//   // обраної дати теперішньої дати та часу
//   const { days, hours, minutes, seconds } = convertMilliseconds(millisecResult);
//   // створюємо змінну-об'єкт ключів, яку зрівнюємо з такою ж із функції convertMilliseconds, яка повертає
//   // об'єкт ключів із значеннями { days, hours, minutes, seconds }
//   daysLeft.textContent = days;
//   // присвоюємо текстовому значенню daysLeft значення days
//   hoursLeft.textContent = hours;
//   // присвоюємо текстовому значенню hoursLeft значення hours
//   minutesLeft.textContent = minutes;
//   // присвоюємо текстовому значенню minutesLeft значення minutes
//   secondsLeft.textContent = seconds;
//   // присвоюємо текстовому значенню secondsLeft значення seconds
// }

// function addLeadingZero(value) {
//   return String(value).padStart(2, '0');
//   // колбек, яка приймає значенння та методом .padStart заповнює нулем перші два числа зі значення, якщо там порожньо
// }

// function convertMilliseconds(milliseconds) {
//   // колбек, яка дає результат у вигляді об'єкту ключів { days, hours, minutes, seconds } зі значенням,
//   // які використовуються в makeSpan()
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;
//   // створюємо константи, яким визначаємо номінал значення

//   const days = addLeadingZero(Math.floor(milliseconds / day));
//   const hours = addLeadingZero(Math.floor((milliseconds % day) / hour));
//   const minutes = addLeadingZero(
//     Math.floor(((milliseconds % day) % hour) / minute)
//   );
//   const seconds = addLeadingZero(
//     Math.floor((((milliseconds % day) % hour) % minute) / second)
//   );
//   // відповідно створюємо константи та зрівнюємо з результатом використовуваної колбек convertMilliseconds(milliseconds),
//     // яка повертає нам значення в залежності від обчислення математичною формулою

//   return { days, hours, minutes, seconds };
// }
