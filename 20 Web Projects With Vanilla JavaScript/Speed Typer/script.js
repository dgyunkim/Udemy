const settingContainerDiv = document.querySelector("#setting-container");
const settingButton = document.querySelector("#setting-btn");
const typerContainerDiv = document.querySelector("#typer-container");
const resultContainerDiv = document.querySelector("#result-container");
const palyAgainButton = document.querySelector("#play-again");
const answerInput = document.querySelector("#answer");
const timeLeftSpan = document.querySelector("#time-left");
const currentScoreSpan = document.querySelector("#current-score");
const resultScoreSpan = document.querySelector("#result-score");
const wordP = document.querySelector("#word");
const difficultySelector = document.querySelector("#difficulty");

const words = [
  "apple",
  "banana",
  "coke",
  "dance",
  "eat",
  "feet",
  "goal",
  "home",
  "ice",
  "juice",
  "kart",
  "logic",
  "mother",
  "nation",
  "orange",
  "property",
  "question",
  "rough",
  "scale",
  "test",
  "uniform",
  "value",
  "wing",
  "yellow",
  "zoo"
];
let timeLeft;
let score;
let word;
let timeReward;
let timeInterval;

function setTimeReward() {
  switch (difficultySelector.value) {
    case "easy":
      timeReward = 5;
      break;
    case "medium":
      timeReward = 3;
      break;
    case "hard":
      timeReward = 2;
      break;
    default:
      console.error(
        "This should not be printed! There is an error in `updateTimeLeft` function."
      );
  }
}

function updateTimeLeft() {
  timeLeftSpan.innerText = `${timeLeft}s`;
}

function updateScore() {
  currentScoreSpan.innerText = score;
}

function showNextWord() {
  word = words[Math.floor(Math.random() * words.length)];
  wordP.innerText = word;
}

function showResult() {
  typerContainerDiv.style.display = "none";
  resultScoreSpan.innerText = score;
  resultContainerDiv.style.display = "block";
}

function ticktock() {
  timeLeft--;
  updateTimeLeft();
  if (timeLeft === 0) {
    clearInterval(timeInterval);
    showResult();
  }
}

function startGame() {
  timeLeft = 10;
  score = 0;
  setTimeReward();
  updateTimeLeft();
  updateScore();
  showNextWord();
  timeInterval = setInterval(ticktock, 1000);
}

function toggleSetting(event) {
  settingContainerDiv.classList.toggle("show");
}

function playAgain(event) {
  typerContainerDiv.style.display = "block";
  resultContainerDiv.style.display = "none";
  startGame();
}

function checkAnswer(event) {
  if (answerInput.value === word) {
    timeLeft += timeReward;
    updateTimeLeft();
    score++;
    updateScore();
    showNextWord();
    answerInput.value = "";
  }
}

settingButton.addEventListener("click", toggleSetting);
palyAgainButton.addEventListener("click", playAgain);
answerInput.addEventListener("keyup", checkAnswer);
difficultySelector.addEventListener("change", setTimeReward);

startGame();
