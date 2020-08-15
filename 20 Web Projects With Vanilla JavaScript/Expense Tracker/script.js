const balanceSpan = document.querySelector("#balance");
const totalIncomeSpan = document.querySelector("#total-income");
const totalExpenseSpan = document.querySelector("#total-expense");
const historyList = document.querySelector("#histories");
const textInput = document.querySelector("#text");
const amountInput = document.querySelector("#amount");
const transactionForm = document.querySelector("#transaction");

function showAlert() {
  alert("Please fill in all fields!");
}

function update(span, amount) {
  span.innerText = (parseFloat(span.innerText) + amount).toFixed(2);
}

function clearFields() {
  textInput.value = "";
  amountInput.value = "";
}

function addToLocalStorage(history) {
  let histories = localStorage.getItem("histories");
  if (histories === null) {
    histories = [];
  } else {
    histories = JSON.parse(histories);
  }
  histories.push(history);
  localStorage.setItem("histories", JSON.stringify(histories));
}

function addTransaction(event) {
  event.preventDefault();

  const text = textInput.value.trim();
  let amount = amountInput.value;

  if (text === "" || amount === "") {
    showAlert();
  } else {
    const li = document.createElement("li");
    let span = document.createElement("span");
    span.className = "delete";
    span.innerText = "x";
    li.appendChild(span);
    span = document.createElement("span");
    amount = parseFloat(amount);
    let className;
    if (amount < 0) {
      className = "border-right-danger";
      span.innerText = `${amount.toFixed(2)}`;
      update(totalExpenseSpan, amount);
    } else {
      className = "border-right-success";
      span.innerText = `+${amount.toFixed(2)}`;
      update(totalIncomeSpan, amount);
    }
    update(balanceSpan, amount);
    li.className = className;
    li.appendChild(document.createTextNode(text));
    li.appendChild(span);
    historyList.appendChild(li);
    clearFields();
    addToLocalStorage({ text, amount });
  }
}

function removeFromLocalStorage({ text, amount }) {
  let histories = localStorage.getItem("histories");
  if (histories === null) {
    histories = [];
  } else {
    histories = JSON.parse(histories);
  }
  for (let i = 0; i < histories.length; i++) {
    let history = histories[i];
    if (history.text === text && history.amount === amount) {
      histories.splice(i, 1);
      break;
    }
  }
  localStorage.setItem("histories", JSON.stringify(histories));
}

function removeHistory(event) {
  if (event.target.className === "delete") {
    const li = event.target.parentElement;
    const amount = parseFloat(li.childNodes[2].textContent);
    if (amount < 0) {
      update(totalExpenseSpan, -amount);
    } else {
      update(totalIncomeSpan, -amount);
    }
    update(balanceSpan, -amount);
    const text = li.childNodes[1].textContent;
    li.remove();
    removeFromLocalStorage({ text, amount });
  }
}

// Load histories from local storage
function loadHistories(event) {
  let histories = localStorage.getItem("histories");
  if (histories) {
    histories = JSON.parse(histories);
    histories.map(({ text, amount }) => {
      const li = document.createElement("li");
      let span = document.createElement("span");
      span.className = "delete";
      span.innerText = "x";
      li.appendChild(span);
      span = document.createElement("span");
      amount = parseFloat(amount);
      let className;
      if (amount < 0) {
        className = "border-right-danger";
        span.innerText = `${amount.toFixed(2)}`;
        update(totalExpenseSpan, amount);
      } else {
        className = "border-right-success";
        span.innerText = `+${amount.toFixed(2)}`;
        update(totalIncomeSpan, amount);
      }
      update(balanceSpan, amount);
      li.className = className;
      li.appendChild(document.createTextNode(text));
      li.appendChild(span);
      historyList.appendChild(li);
    });
  }
}

transactionForm.addEventListener("submit", addTransaction);
historyList.addEventListener("click", removeHistory);
document.addEventListener("DOMContentLoaded", loadHistories);
