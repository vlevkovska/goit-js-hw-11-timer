class CountdownTimer {
  constructor({ targetDate, onTick }) {
    this.targetDate = targetDate;
    this.onTick = onTick;
    this.timerNum = document.querySelector(onTick);
    this.days = this.timerNum.childNodes[1].childNodes[1];
    this.hours = this.timerNum.childNodes[3].childNodes[1];
    this.mins = this.timerNum.childNodes[5].childNodes[1];
    this.secs = this.timerNum.childNodes[7].childNodes[1];
    this.timerID = null;
  }
  start = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = this.targetDate - currentTime;
    this.getTimeComponents(deltaTime);
    // this.stop(deltaTime);
  }, 1000);

  getTimeComponents(deltaTime) {
    const secs = Math.floor((deltaTime % (1000 * 60)) / 1000);
    const minutes = Math.floor((deltaTime % (1000 * 60 * 60)) / (1000 * 60));
    const hours = Math.floor((deltaTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const days = Math.floor(deltaTime / (1000 * 60 * 60 * 24));

    this.secs.textContent = secs < 10 ? `0${secs}` : secs;
    this.mins.textContent = minutes < 10 ? `0${minutes}` : minutes;
    this.hours.textContent = hours < 10 ? `0${hours}` : hours;
    this.days.textContent = days < 10 ? `0${days}` : days;
  }
}

new CountdownTimer({
  onTick: '#timer-1',
  targetDate: new Date('Aug 16, 2021 00:00:00'),
});

/*ПЕРШИЙ ВАРІАНТ

// const refs = {
//   days: document.querySelector('[data-value="days"]'),
//   hours: document.querySelector('[data-value="hours"]'),
//   mins: document.querySelector('[data-value="mins"]'),
//   secs: document.querySelector('[data-value="secs"]'),
// };

// class CountdownTimer {
//   constructor({ targetDate, onTick }) {
//     this.targetDate = targetDate;
//     this.onTick = onTick;
//   }
//   start() {
//     const startTime = Date.parse(this.targetDate);

//     setInterval(() => {
//       const currentTime = Date.now();
//       const deltaTime = startTime - currentTime;
//       const timeBack = getTimeComponents(deltaTime);

//       this.onTick(timeBack);
//     }, 1000);
//   }
// }
// const countdownTimer = new CountdownTimer({
//   selector: '#timer-1',
//   targetDate: new Date('Aug 09, 2021'),
//   onTick: updateCountdownTimerFace,
// });
// countdownTimer.start();
// function getTimeComponents(time) {
//   /*
//    * Оставшиеся дни: делим значение UTC на 1000 * 60 * 60 * 24, количество
//    * миллисекунд в одном дне (миллисекунды * секунды * минуты * часы)
//    */
//   const days = Math.floor(time / (1000 * 60 * 60 * 24));

//   /*
//    * Оставшиеся часы: получаем остаток от предыдущего расчета с помощью оператора
//    * остатка % и делим его на количество миллисекунд в одном часе
//    * (1000 * 60 * 60 = миллисекунды * минуты * секунды)
//    */
//   const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

//   /*
//    * Оставшиеся минуты: получаем оставшиеся минуты и делим их на количество
//    * миллисекунд в одной минуте (1000 * 60 = миллисекунды * секунды)
//    */
//   const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));

//   /*
//    * Оставшиеся секунды: получаем оставшиеся секунды и делим их на количество
//    * миллисекунд в одной секунде (1000)
//    */
//   const secs = Math.floor((time % (1000 * 60)) / 1000);
//   return { days, hours, mins, secs };
// }

// function pad(value) {
//   return String(value).padStart(2, '0');
// }

// function updateCountdownTimerFace({ days, hours, mins, secs }) {
//   refs.days.textContent = `${days}`;
//   refs.hours.textContent = `${hours}`;
//   refs.mins.textContent = `${mins}`;
//   refs.secs.textContent = `${secs}`;
// }
