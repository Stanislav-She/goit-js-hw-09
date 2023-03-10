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
// // ???????????????????? ???????????????????? flatpickr
// import 'flatpickr/dist/flatpickr.min.css';
// // ???????????????????? ?????????? ???????????????????? flatpickr
// import notiflix from 'notiflix';
// // ???????????????????? ???????????????????? notiflix
// const refs = {
//   inputDate: document.querySelector('#datetime-picker'),
//   buttonStart: document.querySelector('[data-start]'),
//   daysLeft: document.querySelector('[data-days]'),
//   hoursLeft: document.querySelector('[data-hours]'),
//   minutesLeft: document.querySelector('[data-minutes]'),
//   secondsLeft: document.querySelector('[data-seconds]'),
// };
// // // ?????????????????? ?????????? ??????????????, ?? ???????? ?????????????????? ?????????????????? ???? ???????????????? html
// // // ?????????? ???????????? ???? html, ???? ?????????????? ???????????????????????????? ???????????? ???????????? ????????????
// refs.buttonStart.disabled = true;
// // ???????????? Start ?????? ???????????? ?????????????? ?????????????? .disabled ?????????????? ?????????????? ???????????????? ?????????????????? (??????????????????????),
// // ?????????? ???????????????????? ???????????????????? ???????????????????? ???????????????????? ???? ???????????? ??????????, ???????? ???? ?????????????????? ???????????????? ????????????
// let timeInterval = null;
// // ?????????????????? ???????????? ?????? ???????????????? ?????????????????? ?? ???????????????? null ??????????????????
// refs.buttonStart.addEventListener('click', onStart);
// // ?????????????? ???? ???????????? ?????????? ?????????????? ?????????? ?????????? ???? ???????????????????? ????????????-??????????????, ?????? ?????? ???????????????????? ?????? ??????????

// let dateChoice = flatpickr('#datetime-picker', {
//   // ?????????????????????????? ???????????????????? flatpickr ???? input#datetime-picker, ???????? ???????? ?????????? ????????????
//   enableTime: true,
//   // ???????? ???????????? ?????????? ???????????? ???????? ???????????????????? ???? ???????????????????????? ??Options?? ???????????????????? flatpickr
//   time_24hr: true,
//   // ???????? ???????????????????? ?????????? ???????????? ???????? ?? 24-?????????????????? ???????????? ?????? ???????????? AM/PM, ???????? ??????????????????.
//   defaultDate: new Date(),
//   // ???????????????????? ?????????????????? ?????????????? ????????, ?????????????????????? ???? ?????????????????? ????????????????
//   minuteIncrement: 1,
//   // ?????????????? ???????? ?????? ???????????????? ???????????? (?????????????? ?? ????????????????????????????)
//   onClose(selectedDates) {
//     if (selectedDates[0].getTime() < Date.now()) {
//       // ???????? ???????????? ???????? ?????????? ????????????????
//       notiflix.Notify.failure('Please choose a date in the future', {
//         // ???? ???????????????????? notiflix ???????????????? ???????????????????????? ?? ?????????????? ???? ???????? ?????????????????? ???? ???????????? 3 ??????????????
//         timeout: 3000,
//       });
//       return;
//     } else {
//       // ????????????, ???????? ???????? ???????????? ?? ????????????????, ????
//       refs.buttonStart.disabled = false;
//       // ?????????????????????? ???????????? ?????????? ?????????????????? ?? ?????????? ???????????????????? ?????????????????? ????????????
//       refs.buttonStart.style.cssText = 'background: #2196F3';
//       // ???????????? ?????????? ?????????????????????????????????? ???????????????? ???????????? ????????????, ???????? ?????????????????? ?????? ???????????????????? ???? css
//     }
//   },
// });

// function onStart() {
//   // ???????? ???????????????????????? ???????? ???? ?????????????? ???????????? ??????????, ???????????????????? ???? ????????????-??????????????
//   refs.buttonStart.disabled = true;
//   // ?????????????? ???????????? ?????????? ?????????????????????? ?????????????????????????? ????????
//   refs.buttonStart.style.cssText = '';
//   // ???????????? ?????????? ?????????????????????? ???????????? ?????????? ????????????????????

//   timeInterval = setInterval(() => {
//     // ???????????? timeInterval ?????????????????????????? ?????????????????? ?????????????? setInterval
//     makeSpan();
//     // ???????????????????? ????????????-?????????????? ?????? ???????? ???????????????? ?????? ????????????????????

//     const millisecResult = dateChoice.selectedDates[0] - Date.now();
//     if (millisecResult <= 1000) {
//       clearInterval(timeInterval);
//     }
//   }, 1000);
// }

// function makeSpan() {
//   // ????????????, ??????
//   const { daysLeft, hoursLeft, minutesLeft, secondsLeft } = refs;
//   // ?????????????? ????????????-????'?????? ???????????? ???? ?????????????? ???? ?? ??????????????-????'?????????? refs,
//   // ?? ???????? ?????? ???????? ???????????? ???????????????????? ??????????
//   const millisecResult = dateChoice.selectedDates[0] - Date.now();
//   // ?????????????????? ????????????, ???? ???????? ?????????????????? ?????????????????? ???????????????? ???????????????????? ?????? ????????????????
//   // ?????????????? ???????? ?????????????????????? ???????? ???? ????????
//   const { days, hours, minutes, seconds } = convertMilliseconds(millisecResult);
//   // ?????????????????? ????????????-????'?????? ????????????, ?????? ?????????????????? ?? ?????????? ?? ???? ?????????????? convertMilliseconds, ?????? ????????????????
//   // ????'?????? ???????????? ???? ???????????????????? { days, hours, minutes, seconds }
//   daysLeft.textContent = days;
//   // ???????????????????? ???????????????????? ???????????????? daysLeft ???????????????? days
//   hoursLeft.textContent = hours;
//   // ???????????????????? ???????????????????? ???????????????? hoursLeft ???????????????? hours
//   minutesLeft.textContent = minutes;
//   // ???????????????????? ???????????????????? ???????????????? minutesLeft ???????????????? minutes
//   secondsLeft.textContent = seconds;
//   // ???????????????????? ???????????????????? ???????????????? secondsLeft ???????????????? seconds
// }

// function addLeadingZero(value) {
//   return String(value).padStart(2, '0');
//   // ????????????, ?????? ?????????????? ?????????????????? ???? ?????????????? .padStart ???????????????? ?????????? ?????????? ?????? ?????????? ???? ????????????????, ???????? ?????? ????????????????
// }

// function convertMilliseconds(milliseconds) {
//   // ????????????, ?????? ?????? ?????????????????? ?? ?????????????? ????'???????? ???????????? { days, hours, minutes, seconds } ???? ??????????????????,
//   // ?????? ???????????????????????????????? ?? makeSpan()
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;
//   // ?????????????????? ??????????????????, ???????? ???????????????????? ?????????????? ????????????????

//   const days = addLeadingZero(Math.floor(milliseconds / day));
//   const hours = addLeadingZero(Math.floor((milliseconds % day) / hour));
//   const minutes = addLeadingZero(
//     Math.floor(((milliseconds % day) % hour) / minute)
//   );
//   const seconds = addLeadingZero(
//     Math.floor((((milliseconds % day) % hour) % minute) / second)
//   );
//   // ???????????????????? ?????????????????? ?????????????????? ???? ?????????????????? ?? ?????????????????????? ???????????????????????????????? ???????????? convertMilliseconds(milliseconds),
//     // ?????? ???????????????? ?????? ???????????????? ?? ???????????????????? ?????? ???????????????????? ???????????????????????? ????????????????

//   return { days, hours, minutes, seconds };
// }
