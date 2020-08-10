const currencyOneSelect = document.querySelector("#currency-one");
const currencyTwoSelect = document.querySelector("#currency-two");
const amountOneInput = document.querySelector("#amount-one");
const amountTwoInput = document.querySelector("#amount-two");
const swapButton = document.querySelector("#swap");
const rateSpan = document.querySelector("#rate");
const apiKey = "5227347a30151633e90e5693";

currencyOneSelect.addEventListener("change", update);
currencyTwoSelect.addEventListener("change", update);
amountOneInput.addEventListener("input", update);
amountTwoInput.addEventListener("input", update);
swapButton.addEventListener("click", swap);

function update() {
  const currencyOne = currencyOneSelect.value;
  const currencyTwo = currencyTwoSelect.value;
  const amountOne = amountOneInput.value;
  fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${currencyOne}`)
    .then((response) => response.json())
    .then((data) => {
      amountTwoInput.value = (
        data.conversion_rates[currencyTwo] * amountOne
      ).toFixed(2);
      updateRate();
    });
}

function updateRate() {
  const currencyOne = currencyOneSelect.value;
  const currencyTwo = currencyTwoSelect.value;
  const amountOne = amountOneInput.value;
  const amountTwo = amountTwoInput.value;
  rateSpan.innerText = `${amountOne} ${currencyOne} = ${amountTwo} ${currencyTwo}`;
}

function swap() {
  const currencyOne = currencyOneSelect.value;
  const currencyTwo = currencyTwoSelect.value;
  const amountOne = amountOneInput.value;
  const amountTwo = amountTwoInput.value;
  currencyOneSelect.value = currencyTwo;
  currencyTwoSelect.value = currencyOne;
  amountOneInput.value = amountTwo;
  amountTwoInput.value = amountOne;
  updateRate();
}

update();
