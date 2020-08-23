const cardsContainerDiv = document.querySelector("#cards-container");
const currentP = document.querySelector("#current");
const prevButton = document.querySelector("#prev");
const nextButton = document.querySelector("#next");
const showButton = document.querySelector("#show");
const hideButton = document.querySelector("#hide");
const addContainerDiv = document.querySelector("#add-container");
const addCardButton = document.querySelector("#add-card");
const questionTextarea = document.querySelector("#question");
const answerTextarea = document.querySelector("#answer");
const clearButton = document.querySelector("#clear");

let currentActiveCardIndex = getCurrentActiveCardIndex();
const cardDivs = [];
const cardsData = getCardsData();

function getCurrentActiveCardIndex() {
  const currentActiveCardIndex = parseInt(
    localStorage.getItem("currentActiveCardIndex")
  );
  return currentActiveCardIndex ? currentActiveCardIndex : 0;
}

function getCardsData() {
  const cardsData = JSON.parse(localStorage.getItem("cardsData"));
  return cardsData ? cardsData : [];
}

function setCardsData() {
  localStorage.setItem("cardsData", JSON.stringify(cardsData));
}

function createCard(data, index) {
  const cardDiv = document.createElement("div");
  if (index < currentActiveCardIndex) {
    cardDiv.className = "card left";
  } else if (index === currentActiveCardIndex) {
    cardDiv.className = "card active";
  } else {
    cardDiv.className = "card";
  }
  cardDiv.innerHTML = `
    <div class="inner-card">
      <div class="inner-card-front">
        <p>
          ${data.question}
        </p>
      </div>
      <div class="inner-card-back">
        <p>
          ${data.answer}
        </p>
      </div>
    </div>
  `;
  cardDiv.addEventListener("click", (event) =>
    cardDiv.classList.toggle("show-answer")
  );
  cardDivs.push(cardDiv);
  cardsContainerDiv.appendChild(cardDiv);
}

function setCurrentActiveCardIndex() {
  localStorage.setItem("currentActiveCardIndex", currentActiveCardIndex);
}

function updateCurrentText() {
  currentP.innerText = `${currentActiveCardIndex + 1} / ${cardDivs.length}`;
  setCurrentActiveCardIndex();
}

function createCards() {
  cardsData.forEach((data, index) => {
    createCard(data, index);
  });
  if (cardsData.length > 0) updateCurrentText();
}

createCards();

prevButton.addEventListener("click", (event) => {
  if (currentActiveCardIndex > 0) {
    cardDivs[currentActiveCardIndex].className = "card";
    currentActiveCardIndex--;
    cardDivs[currentActiveCardIndex].className = "card active";
    updateCurrentText();
  }
});

nextButton.addEventListener("click", (event) => {
  if (currentActiveCardIndex < cardDivs.length - 1) {
    cardDivs[currentActiveCardIndex].className = "card left";
    currentActiveCardIndex++;
    cardDivs[currentActiveCardIndex].className = "card active";
    updateCurrentText();
  }
});

showButton.addEventListener("click", (event) => {
  addContainerDiv.classList.add("show");
});

hideButton.addEventListener("click", (event) => {
  addContainerDiv.classList.remove("show");
});

addCardButton.addEventListener("click", (event) => {
  const question = questionTextarea.value;
  const answer = answerTextarea.value;
  if (question !== "" && answer !== "") {
    createCard({ question, answer }, cardsData.length);
    questionTextarea.value = "";
    answerTextarea.value = "";
    updateCurrentText();
    addContainerDiv.classList.remove("show");
    cardsData.push({ question, answer });
    setCardsData();
  }
});

clearButton.addEventListener("click", (event) => {
  currentActiveCardIndex = 0;
  cardDivs.length = 0;
  cardsData.length = 0;
  while (cardsContainerDiv.firstChild) {
    cardsContainerDiv.firstChild.remove();
  }
  currentP.innerText = "";
  setCurrentActiveCardIndex();
  setCardsData();
});
