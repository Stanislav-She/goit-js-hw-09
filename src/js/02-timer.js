import flatpickr from 'flatpickr';
// імпортуємо бібліотеку flatpickr
import 'flatpickr/dist/flatpickr.min.css';
// імпортуємо стилі бібліотеки flatpickr
import notiflix from 'notiflix';
// імпортуємо бібліотеку notiflix
const refs = {
  inputDate: document.querySelector('#datetime-picker'),
  buttonStart: document.querySelector('[data-start]'),
  daysLeft: document.querySelector('[data-days]'),
  hoursLeft: document.querySelector('[data-hours]'),
  minutesLeft: document.querySelector('[data-minutes]'),
  secondsLeft: document.querySelector('[data-seconds]'),
};
// // створюємо набір змінних, у яких витягуємо посилання на елементи html
// // додав дівчик до html, бо захотів зпозиціонувати таймер трішки інакше
refs.buttonStart.disabled = true;
// кнопку Start від самого початку методом .disabled задаємо логічне значення вимкнення (деактивації),
// тобто прибираємо стандартно можливість натискання на кнопку Старт, доки не пропишемо подальшу логіку
let timeInterval = null;
// створюємо змінну для часового інтервалу з вихідним null значенням
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
      refs.buttonStart.style.cssText = 'background: #02895e;';
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
