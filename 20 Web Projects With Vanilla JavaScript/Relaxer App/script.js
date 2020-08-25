const containerDiv = document.querySelector("#container");
const textP = document.querySelector("#text");

const totalTime = 7500;
const breatheTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;

function breathAnimation() {
  textP.innerText = "Breathe In!";
  containerDiv.className = "container grow";
  setTimeout(() => {
    textP.innerText = "Hold";
    setTimeout(() => {
      textP.innerText = "Breathe Out!";
      containerDiv.className = "container shrink";
    }, holdTime);
  }, breatheTime);
}

breathAnimation();
setInterval(breathAnimation, totalTime);
