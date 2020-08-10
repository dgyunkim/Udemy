const addLi = document.querySelector("#add");
const mapLi = document.querySelector("#map");
const filterLi = document.querySelector("#filter");
const sortLi = document.querySelector("#sort");
const reduceLi = document.querySelector("#reduce");
const peopleList = document.querySelector("#people-list");
let peopleArray = [];
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2
});

addLi.addEventListener("click", addPerson);
mapLi.addEventListener("click", doubleWealth);
filterLi.addEventListener("click", filterWealth);
sortLi.addEventListener("click", sortWealth);
reduceLi.addEventListener("click", showEntireWealth);

function Person(name, wealth) {
  this.name = name;
  this.wealth = wealth;
}

async function getRandomPerson() {
  const response = await fetch("https://randomuser.me/api/");
  const data = await response.json();
  const fullName = `${data.results[0].name.first} ${data.results[0].name.last}`;
  const wealth = Math.floor(Math.random() * 1000000);
  return new Person(fullName, wealth);
}

function toDollarForm(wealth) {
  return formatter.format(wealth);
}

function addPerson() {
  getRandomPerson().then((person) => {
    hideEntireWealth();
    peopleArray.push(person);
    const li = document.createElement("li");
    li.innerHTML = `
      <h3>${person.name}</h3>
      <p>${toDollarForm(person.wealth)}</p>
    `;
    peopleList.appendChild(li);
  });
}

function update() {
  let html = "";
  peopleArray.forEach((person) => {
    html += `
      <li>
        <h3>${person.name}</h3>
        <p>${toDollarForm(person.wealth)}</p>
      </li>
    `;
  });
  peopleList.innerHTML = html;
}

function doubleWealth() {
  peopleArray = peopleArray.map((person) => ({
    name: person.name,
    wealth: person.wealth * 2
  }));
  update();
}

function filterWealth() {
  peopleArray = peopleArray.filter((person) => person.wealth > 1000000);
  update();
}

function sortWealth() {
  peopleArray = peopleArray.sort(
    (person1, person2) => person2.wealth - person1.wealth
  );
  update();
}

function showEntireWealth() {
  const total = peopleArray.reduce((sum, person) => sum + person.wealth, 0);
  const li = document.createElement("li");
  li.className = "total";
  li.innerHTML = `
    <h3>Total Wealth:</h3>
    <p>${toDollarForm(total)}</p>
  `;
  peopleList.append(li);
}

function hideEntireWealth() {
  const totalLi = document.querySelector(".total");
  if (totalLi !== null) totalLi.remove();
}
