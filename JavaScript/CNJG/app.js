const numberInput = document.querySelector("#number-input");
const generateBtn = document.querySelector("#generate-btn");
const jokeList = document.querySelector("#joke-list");
const xhr = new XMLHttpRequest();

generateBtn.addEventListener("click", generateJokes);

function generateJokes(event) {
  event.preventDefault();

  const numJokes = numberInput.value;
  if (numJokes === "" || numJokes < 1) {
    showAlert("The Number of Jokes should be a positive number.", "danger");
  } else {
    hideAlert();
    xhr.open("GET", `http://api.icndb.com/jokes/random/${numJokes}`, true);
    xhr.onload = function () {
      if (this.status === 200) {
        clearJokeList();
        const jokes = JSON.parse(this.responseText).value;
        for (let joke of jokes) {
          let li = document.createElement("li");
          li.className = "list-group-item";
          li.innerHTML = `
            <p>ID: ${joke.id}</p>
            <p>Joke: ${joke.joke}</p>
          `;
          jokeList.appendChild(li);
        }
      }
    };
    xhr.send();
  }
}

function showAlert(message, color) {
  hideAlert();
  const div = document.createElement("div");
  div.className = `alert alert-${color}`;
  div.innerText = message;
  const form = document.querySelector("form");
  form.insertBefore(div, form.firstChild);
  setTimeout(hideAlert, 3000);
}

function hideAlert() {
  const alert = document.querySelector(".alert");
  if (alert) alert.remove();
}

function clearJokeList() {
  while (jokeList.firstChild) {
    jokeList.firstChild.remove();
  }
}
