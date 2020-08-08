const video = document.querySelector("#video");
const playBtn = document.querySelector("#play");
const stopBtn = document.querySelector("#stop");
const progressInput = document.querySelector("#progress");
const timestamp = document.querySelector("#timestamp");

video.addEventListener("click", toggleVideoStatus);
video.addEventListener("pause", updatePlayIcon);
video.addEventListener("play", updatePlayIcon);
video.addEventListener("timeupdate", updateProgress);
playBtn.addEventListener("click", toggleVideoStatus);
stopBtn.addEventListener("click", stopVideo);
progressInput.addEventListener("change", setVideoProgress);

function toggleVideoStatus() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updatePlayIcon() {
  if (video.paused) {
    playBtn.innerHTML = '<i class="fas fa-play fa-2x"></i>';
  } else {
    playBtn.innerHTML = '<i class="fas fa-pause fa-2x"></i>';
  }
}

function updateProgress() {
  progressInput.value = (video.currentTime / video.duration) * 100;
  let minutes = Math.floor(video.currentTime / 60);
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  let seconds = Math.floor(video.currentTime % 60);
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  timestamp.innerText = minutes + ":" + seconds;
}

function setVideoProgress(event) {
  video.currentTime = (+progressInput.value * video.duration) / 100;
}

function stopVideo(event) {
  video.pause();
  video.currentTime = 0;
}
