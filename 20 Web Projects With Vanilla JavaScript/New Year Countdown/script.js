const daysH2 = document.querySelector("#days");
const hoursH2 = document.querySelector("#hours");
const minutesH2 = document.querySelector("#minutes");
const secondsH2 = document.querySelector("#seconds");
const countdownDiv = document.querySelector("#countdown");
const yearDiv = document.querySelector("#year");

const nextYear = new Date().getFullYear() + 1;
const newYearTime = new Date(`January 01 ${nextYear} 00:00:00`);

yearDiv.innerText = nextYear;

function updateCountdown() {
  const currentTime = new Date();
  const diff = newYearTime - currentTime;
  const days = Math.floor(diff / 1000 / 60 / 60 / 24);
  const hours = Math.floor(diff / 1000 / 60 / 60) % 24;
  const minutes = Math.floor(diff / 1000 / 60) % 60;
  const seconds = Math.floor(diff / 1000) % 60;
  daysH2.innerText = days;
  hoursH2.innerText = hours;
  minutesH2.innerText = minutes;
  secondsH2.innerText = seconds;
}

updateCountdown();
setInterval(updateCountdown, 1000);
