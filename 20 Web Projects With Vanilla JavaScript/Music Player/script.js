const musicPlayerDiv = document.querySelector("#music-player");
const musicTitle = document.querySelector("#title");
const musicImg = document.querySelector("#music-img");
const playI = document.querySelector("#play");
const backwardI = document.querySelector("#backward");
const forwardI = document.querySelector("#forward");
const progressBarDiv = document.querySelector("#progress-bar");

const musicSources = ["hey", "summer", "ukulele"];
let index = Math.floor(Math.random() * musicSources.length);
let audio;
let currentInterval;

function updatePlayer(index) {
  const sourceName = musicSources[index];
  musicTitle.innerText = sourceName;
  audio = new Audio(`./music/${sourceName}.mp3`);
  musicImg.setAttribute("src", `./img/${sourceName}.jpg`);
}

function playMusic(event) {
  if (musicPlayerDiv.classList.contains("play")) {
    musicPlayerDiv.classList.remove("play");
    playI.className = "fas fa-play fa-2x";
    audio.pause();
    clearInterval(currentInterval);
  } else {
    musicPlayerDiv.classList.add("play");
    playI.className = "fas fa-pause fa-2x";
    audio.play();
    currentInterval = setInterval(updateProgress, 1000);
  }
}

function playByIndex(index) {
  audio.pause();
  clearInterval(currentInterval);
  updatePlayer(index);
  progressBarDiv.style.width = "0%";
  if (!musicPlayerDiv.classList.contains("play")) {
    musicPlayerDiv.classList.add("play");
    playI.className = "fas fa-pause fa-2x";
  }
  audio.play();
  currentInterval = setInterval(updateProgress, 1000);
}

function showPrev(event) {
  index = index === 0 ? musicSources.length - 1 : index - 1;
  playByIndex(index);
}

function showNext(event) {
  index = index === musicSources.length - 1 ? 0 : index + 1;
  playByIndex(index);
}

function updateProgress(event) {
  progressBarDiv.style.width = `${(audio.currentTime / audio.duration) * 100}%`;
}

document.addEventListener("DOMContentLoaded", updatePlayer(index));
playI.addEventListener("click", playMusic);
backwardI.addEventListener("click", showPrev);
forwardI.addEventListener("click", showNext);
