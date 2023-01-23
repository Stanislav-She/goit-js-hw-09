import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('.form');

formRef.addEventListener('submit', promiseMaker);

function promiseMaker(event) {
  event.preventDefault();

  let delay = Number(this.delay.value);
  let step = Number(this.step.value);
  let amount = Number(this.amount.value);
  let count = 0;
  let difference = delay - step;

  const makeCount = setInterval(() => {
    count += 1;
    difference += step;

    createPromise(count, difference).then(showSucces).catch(showError);

    if (count === amount) {
      clearInterval(makeCount);
    }
  }, step);
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}

function showSucces(value) {
  Notify.success(value);
}
function showError(error) {
  Notify.failure(error);
}

// import { Notify } from 'notiflix/build/notiflix-notify-aio';
// // імпортуємо бібліотеку для роботи з кастомними відображеннями повідомлень console.log()
// // для користувача

// const formRef = document.querySelector('.form');
// // створюємо змінну, якій присвоюємо посилання до елементу html form
// // console.log('formRef', formRef);

// formRef.addEventListener('submit', promiseMaker);
// // закріплюємо на форму слухача подій submit, під час яких викликається
// // виконання колбек-функції promiseMaker

// function promiseMaker(event) {
//   // функція приймає подію
//   event.preventDefault();
//   //щоподії скидуються дефолтні налаштування браузера і сторінка не перезавантажується
//   let delay = Number(this.delay.value);
//   let step = Number(this.step.value);
//   let amount = Number(this.amount.value);
//   // створюємо три змінні, що відповідають числовим значенням трьох інпутів форми
//   let count = 0;
//   // створюємо змінну лічильника створених промісів із нульовим початковим значенням
//   let difference = delay - step;
//   // створюємо змінну різниці між першим ділеєм і наступник кроком
//   const makeCount = setInterval(() => {
//     count += 1;
//     difference += step;
//     // створюємо функцію, якій задаємо часовий інтервал, який
//     // щопокроково змінюється до різниці часу додається крок часу.
//     // Також до лічильника створених промісів щоразу додається один

//     createPromise(count, difference).then(showSucces).catch(showError);
//     // викликаємо колбек-функцію createPromise зі створення промісів,
//     // шляхом рандомної генерації чисел і виконання умови.
//     // Функція в себе приймає значення count та різниці в кроках difference.
//     // методом .then(), тобто коли відбувається вдала генерація промісу
//     // то відображує колбек-функцію showSucces і навпаки при невдалому
//     // методом .catch() колбек-функцію showError

//     if (count === amount) {
//       // коли кількість створених промісів суворо дорівнюватиме введеній кількості для генерації, то
//       clearInterval(makeCount);
//       // стерти часовий інтервал
//     }
//   }, step);
// }

// function createPromise(position, delay) {
//   // колбек, яка приймає поточну позицію та часовий інтервал
//   const shouldResolve = Math.random() > 0.3;
//   // змінна, що рандомно генерує число до 1 і виконується чи ні умова
//   return new Promise((resolve, reject) => {
//     // повертається новий проміс або вдало створений, або не створений
//     setTimeout(() => {
//       // встановлюється час за який запуститься виконання показу повідомлення про результат
//       if (shouldResolve) {
//         // якщо умова рандому виконана
//         resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
//         // отримуємо resolve і показуємо повідомлення про створення промісу,
//         // де вказуємо номер промісу і час, який знадобився
//       } else {
//         reject(`❌ Rejected promise ${position} in ${delay}ms`);
//         // отримуємо reject і показуємо повідомлення про не створення промісу,
//         // де вказуємо номер промісу і час, який знадобився
//       }
//     }, delay);
//   });
// }

// function showSucces(value) {
//   Notify.success(value);
// }
// function showError(error) {
//   Notify.failure(error);
// }
// // створюємо дві колбек-функції, що при відображатимуть сповіщення console.log()
// // для користувача під час створення промісу чи помилки створення
