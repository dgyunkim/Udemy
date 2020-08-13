const wordDiv = document.querySelector("#word");
const wrongLettersDiv = document.querySelector("#wrong-letters");
const playAgainButton = document.querySelector("#play-again");
const popupContainerDiv = document.querySelector("#popup-container");
const notificationContainerDiv = document.querySelector(
  "#notification-container"
);
const finalMessageH2 = document.querySelector("#final-message");
const figurePartLines = document.querySelectorAll(".figure-part");
const words = ["apple", "card", "apartment", "software", "hangman"];
let selectedWord = words[Math.floor(Math.random() * words.length)];
const correctLetters = [];
const wrongLetters = [];

function displayWord() {
  wordDiv.innerHTML = `
    ${selectedWord
      .split("")
      .map(
        (letter) => `
        <span class="letter">
         ${correctLetters.includes(letter) ? letter : ""}
        </span>
      `
      )
      .join("")}
  `;
  const innerWord = wordDiv.innerText.replace(/\n/g, "");
  if (innerWord === selectedWord) {
    finalMessageH2.innerHTML = "Congratulations! You won!";
    popupContainerDiv.style.display = "flex";
  }
}

function updateWrongLetters() {
  wrongLettersDiv.innerHTML = `
    ${wrongLetters.length > 0 ? "<h2>Wrong</h2>" : ""}
    ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
  `;
  figurePartLines.forEach((line, index) => {
    const errors = wrongLetters.length;
    if (index < errors) {
      line.style.display = "block";
    } else {
      line.style.display = "none";
    }
  });
  if (wrongLetters.length === figurePartLines.length) {
    finalMessageH2.innerText = "Unfortunately you lost.";
    popupContainerDiv.style.display = "flex";
  }
}

function showNotification() {
  notificationContainerDiv.classList.add("show");
  setTimeout(hideNotification, 2000);
}

function hideNotification() {
  notificationContainerDiv.classList.remove("show");
}

window.addEventListener("keydown", (event) => {
  if (event.keyCode >= 65 && event.keyCode <= 90) {
    const letter = event.key;
    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLetters();
      } else {
        showNotification();
      }
    }
  }
});

playAgainButton.addEventListener("click", () => {
  correctLetters.splice(0);
  wrongLetters.splice(0);
  selectedWord = words[Math.floor(Math.random() * words.length)];
  displayWord();
  updateWrongLetters();
  popupContainerDiv.style.display = "none";
});

displayWord();
