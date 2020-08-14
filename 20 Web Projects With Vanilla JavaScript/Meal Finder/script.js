const searchInput = document.querySelector("#search");
const submitForm = document.querySelector("#submit");
const randomButton = document.querySelector("#random");
const mealsDiv = document.querySelector("#meals");
const resultHeadingDiv = document.querySelector("#result-heading");
const singleMealDiv = document.querySelector("#single-meal");

function searchMeal(event) {
  event.preventDefault();

  singleMealDiv.innerHTML = "";
  const searchValue = searchInput.value.trim();
  if (searchValue === "") {
    alert("Please enter something");
  } else {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}
`)
      .then((response) => response.json())
      .then((data) => {
        if (data.meals === null) {
          resultHeadingDiv.innerHTML = `<h2>There are no search results for '${searchValue}'. Try again!</h2>`;
        } else {
          resultHeadingDiv.innerHTML = `<h2>Search results for '${searchValue}:'</h2>`;
          mealsDiv.innerHTML = data.meals
            .map(
              (meal) => `
            <div class="meal"> 
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
              <div class="meal-info" data-mealID="${meal.idMeal}">
                <h3>${meal.strMeal}</h3>
              </div>
            </div>
            `
            )
            .join("");
        }
      });
    searchInput.value = "";
  }
}

async function getMealByID(mealID) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}
`);
  const data = await response.json();
  return data.meals[0];
}

function getRandomMeal() {
  mealsDiv.innerHTML = "";
  resultHeadingDiv.innerHTML = "";
  fetch(`https://www.themealdb.com/api/json/v1/1/random.php
`)
    .then((response) => response.json())
    .then((data) => {
      const meal = data.meals[0];
      addMealToDom(meal);
    });
}

function addMealToDom(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }
  singleMealDiv.innerHTML = `
      <h1>${meal.strMeal}</h1>
      <img src="${meal.strMealThumb}" />
      <div class="single-meal-info">
        ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""}
        ${meal.strArea ? `<p>${meal.strArea}</p>` : ""}
      </div>
      <div class="main">
        <p>${meal.strInstructions}</p>
        <h2>Ingredients</h2>
        <ul>
          ${ingredients.map((ingredient) => `<li>${ingredient}</li>`).join("")}
        </ul>
      </div>
  `;
}

submitForm.addEventListener("submit", searchMeal);
randomButton.addEventListener("click", getRandomMeal);
mealsDiv.addEventListener("click", (event) => {
  const mealInfoDiv = event.path.find((item) => {
    if (item.classList) {
      return item.classList.contains("meal-info");
    } else {
      return false;
    }
  });
  if (mealInfoDiv) {
    const mealID = mealInfoDiv.getAttribute("data-mealID");
    getMealByID(mealID).then((meal) => addMealToDom(meal));
  }
});
