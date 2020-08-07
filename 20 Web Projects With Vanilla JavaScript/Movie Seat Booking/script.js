const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(occupied)");
const countSpan = document.querySelector("#count");
const totalSpan = document.querySelector("#total");
const movieSelect = document.querySelector("#movie");
let ticketPrice = +movieSelect.value;

container.addEventListener("click", (event) => {
  if (event.target.className === "seat") {
    event.target.className = "seat selected";
    update();
  } else if (event.target.className === "seat selected") {
    event.target.className = "seat";
    update();
  }
});

function update() {
  const count = document.querySelectorAll(".row .seat.selected").length;
  countSpan.innerText = count;
  totalSpan.innerText = count * ticketPrice;
  const seats = [];
  document.querySelectorAll(".row .seat").forEach((seat) => {
    if (seat.className === "seat selected") {
      seats.push(true);
    } else {
      seats.push(false);
    }
  });
  localStorage.setItem("seats", JSON.stringify(seats));
}

movieSelect.addEventListener("change", (event) => {
  document.querySelectorAll(".row .seat.selected").forEach((seat) => {
    seat.className = "seat";
  });
  ticketPrice = +movieSelect.value;
  localStorage.setItem("movieIndex", movieSelect.selectedIndex);
  update();
});

// document.addEventListener("DOMContentLoaded", load());

function load() {
  const movieIndex = localStorage.getItem("movieIndex");
  if (movieIndex !== null) {
    movieSelect.selectedIndex = movieIndex;
    ticketPrice = +movieSelect.value;
  }

  let seats = localStorage.getItem("seats");
  if (seats !== null) {
    seats = JSON.parse(seats);
    document.querySelectorAll(".row .seat").forEach((seat, idx) => {
      if (seats[idx]) {
        seat.className = "seat selected";
      }
    });
    update();
  }
}

load();
