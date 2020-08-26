const draggabbleListUl = document.querySelector("#draggable-list");
const checkButton = document.querySelector("#check");

const richestPeople = [
  "Jeff Bezos",
  "Bill Gates",
  "Bernard Arnault",
  "Mark Zuckerberg",
  "Elon Musk",
  "Mukesh Ambani",
  "Warren Buffett",
  "Larry Ellison",
  "Steve Ballmer",
  "Larry Page"
];
const lis = [];
let dragStartIndex;

function dragStart() {
  dragStartIndex = +this.closest("li").getAttribute("data-index");
}

function dragOver(event) {
  event.preventDefault();
}

function swapLis(fromIndex, toIndex) {
  const fromLi = lis[fromIndex].querySelector(".draggable");
  const toLi = lis[toIndex].querySelector(".draggable");
  lis[fromIndex].appendChild(toLi);
  lis[toIndex].appendChild(fromLi);
}

function dragDrop() {
  const dragEndIndex = +this.getAttribute("data-index");
  this.classList.remove("over");
  swapLis(dragStartIndex, dragEndIndex);
}

function dragEnter() {
  this.classList.add("over");
}

function dragLeave() {
  this.classList.remove("over");
}

function addEventListeners() {
  const draggableDivs = document.querySelectorAll(".draggable");
  const draggableLis = document.querySelectorAll(".draggable-list li");

  draggableDivs.forEach((draggableDiv) => {
    draggableDiv.addEventListener("dragstart", dragStart);
  });

  draggableLis.forEach((draggableLi) => {
    draggableLi.addEventListener("dragover", dragOver);
    draggableLi.addEventListener("drop", dragDrop);
    draggableLi.addEventListener("dragenter", dragEnter);
    draggableLi.addEventListener("dragleave", dragLeave);
  });
}

function checkOrder() {
  lis.forEach((li, index) => {
    const person = li.querySelector(".person-name").innerText.trim();
    console.log(person, richestPeople[index]);
    if (person == richestPeople[index]) {
      li.classList.remove("wrong");
      li.classList.add("correct");
    } else {
      li.classList.add("wrong");
    }
  });
}

function createList() {
  [...richestPeople]
    .map((person) => ({ person, order: Math.random() }))
    .sort((a, b) => a.order - b.order)
    .forEach(({ person }, index) => {
      const li = document.createElement("li");
      li.setAttribute("data-index", index);
      li.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
          <p class="person-name">${person}</p>
          <i class="fas fa-grip-lines"></i>
        </div>
      `;
      lis.push(li);
      draggabbleListUl.appendChild(li);
    });
  addEventListeners();
}

createList();
checkButton.addEventListener("click", checkOrder);
