const D_DAY = new Date(2019, 1, 10, 16, 00, 00);

const countdownClock = document.querySelector('.clock');


const updateClockContent = (() => {
  const daysElem = countdownClock.querySelector('.days');
  const hoursElem = countdownClock.querySelector('.hours');
  const minutesElem = countdownClock.querySelector('.minutes');
  const secondsElem = countdownClock.querySelector('.seconds');

  return (timeLeft) => {
    daysElem.querySelector('.value').innerHTML = timeLeft.days;
    if (timeLeft.days <= 1) {
      daysElem.querySelector('.label').innerHTML = 'day';
    } else {
      daysElem.querySelector('.label').innerHTML = 'days';
    }
    hoursElem.querySelector('.value').innerHTML = timeLeft.hours;
    if (timeLeft.hours <= 1) {
      hoursElem.querySelector('.label').innerHTML = 'hour';
    } else {
      hoursElem.querySelector('.label').innerHTML = 'hours';
    }
    minutesElem.querySelector('.value').innerHTML = timeLeft.minutes;
    if (timeLeft.minutes <= 1) {
      minutesElem.querySelector('.label').innerHTML = 'minute';
    } else {
      minutesElem.querySelector('.label').innerHTML = 'minutes';
    }
    secondsElem.querySelector('.value').innerHTML = timeLeft.seconds;
    if (timeLeft.seconds <= 1) {
      secondsElem.querySelector('.label').innerHTML = 'second';
    } else {
      secondsElem.querySelector('.label').innerHTML = 'seconds';
    }
  };
})();

function refreshTimer() {
  const now = new Date();
  if (now.getTime() < D_DAY.getTime()) {
    const timeLeft = getTimeLeft(now, D_DAY);
    updateClockContent(timeLeft);
    setTimeout(refreshTimer, 1000);
  } else {
    // TODO: Set final text
    clearInterval(countdownInterval);
  }
};
refreshTimer();

function getTimeLeft(from, to) {
  const distance = to.getTime() - from.getTime();
  const days = paddedTwo(Math.floor(distance / (1000 * 60 * 60 * 24)));
  const hours = paddedTwo(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
  const minutes = paddedTwo(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
  const seconds = paddedTwo(Math.floor((distance % (1000 * 60)) / 1000));

  return {
    days,
    hours,
    minutes,
    seconds,
  }
}

function paddedTwo(number) {
  return String(number).padStart(2, '0');
}