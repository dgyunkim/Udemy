const musicPlayerDiv = document.querySelector("#music-player");
const musicTitle = document.querySelector("#title");
const musicImg = document.querySelector("#music-img");
const playI = document.querySelector("#play");
const backwardI = document.querySelector("#backward");
const forwardI = document.querySelector("#forward");
const progressDiv = document.querySelector("#progress");
const progressBarDiv = document.querySelector("#progress-bar");

const musicSources = ["hey", "summer", "ukulele"];
let index = Math.floor(Math.random() * musicSources.length);
let audio;

function updatePlayer(index) {
  const sourceName = musicSources[index];
  musicTitle.innerText = sourceName;
  audio = new Audio(`./music/${sourceName}.mp3`);
  musicImg.setAttribute("src", `./img/${sourceName}.jpg`);
  audio.addEventListener("timeupdate", updateProgress);
  audio.addEventListener("ended", showNext);
}

function playMusic(event) {
  if (musicPlayerDiv.classList.contains("play")) {
    musicPlayerDiv.classList.remove("play");
    playI.className = "fas fa-play fa-2x";
    audio.pause();
  } else {
    musicPlayerDiv.classList.add("play");
    playI.className = "fas fa-pause fa-2x";
    audio.play();
  }
}

function playByIndex(index) {
  audio.pause();
  updatePlayer(index);
  progressBarDiv.style.width = "0%";
  if (!musicPlayerDiv.classList.contains("play")) {
    musicPlayerDiv.classList.add("play");
    playI.className = "fas fa-pause fa-2x";
  }
  audio.play();
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

function setProgress(event) {
  audio.currentTime =
    ((event.clientX - progressDiv.getBoundingClientRect().left) /
      progressDiv.clientWidth) *
    audio.duration;
}

document.addEventListener("DOMContentLoaded", updatePlayer(index));
playI.addEventListener("click", playMusic);
backwardI.addEventListener("click", showPrev);
forwardI.addEventListener("click", showNext);
progressDiv.addEventListener("click", setProgress);
