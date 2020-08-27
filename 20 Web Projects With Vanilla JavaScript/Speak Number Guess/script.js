const msgDiv = document.querySelector("#msg");

const randomNumber = getRandomNumber();
window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
let speechRecognition = new window.SpeechRecognition();
console.log("Number:", randomNumber);

function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

function showMessage(msg) {
  msgDiv.innerHTML = `
    <div>You said:</div>
    <span class="box">${msg}</span>
  `;
}

function checkNumber(msg) {
  const number = +msg;

  if (Number.isNaN(number)) {
    msgDiv.innerHTML += "<div>That is not a valid number</div>";
  } else if (number > 100 || number < 1) {
    msgDiv.innerHTML += "<div>Number must be between 1 and 100</div>";
  } else if (number < randomNumber) {
    msgDiv.innerHTML += "<div>GO HIGHER</div>";
  } else if (number === randomNumber) {
    document.body.innerHTML = `
      <h2>Congrats! You have guessed the number! <br/><br/> It was ${number}</h2>
      <button class="play-again" id="play-again">Play Again</button>
    `;
  } else {
    msgDiv.innerHTML += "<div>GO LOWER</div>";
  }
}

function onSpeak(event) {
  const msg = event.results[0][0].transcript;
  showMessage(msg);
  checkNumber(msg);
}

speechRecognition.addEventListener("result", onSpeak);
speechRecognition.addEventListener("end", (event) => speechRecognition.start());
document.body.addEventListener("click", (event) => {
  if (event.target.id === "play-again") {
    window.location.reload();
  }
});

speechRecognition.start();
