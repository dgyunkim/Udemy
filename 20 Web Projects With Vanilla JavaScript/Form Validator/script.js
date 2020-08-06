const form = document.querySelector("#form");
const usernameInput = document.querySelector("#username");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const password2Input = document.querySelector("#password2");

function showError(input, message) {
  const formGroup = input.parentElement;
  formGroup.className = "form-group danger";
  const small = formGroup.querySelector("small");
  small.innerText = message;
}

function showSuccess(input, message) {
  const formGroup = input.parentElement;
  formGroup.className = "form-group success";
  const small = formGroup.querySelector("small");
  small.innerText = message;
}

function getFieldName(input) {
  return input.id.replace(/\d+/g, "").replace(/^\w/, (match) => {
    return match.toUpperCase();
  });
}

function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be at most ${max} characters`
    );
  } else {
    showSuccess(input, `${getFieldName(input)} is valid`);
  }
}

function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const testResult = re.test(String(input.value).toLowerCase());
  if (!testResult) {
    showError(input, "Email is invalid");
  } else {
    showSuccess(input, "Email is valid");
  }
}

function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "Password does not match");
  } else if (input1.value === "") {
    // do nothing
  } else {
    showSuccess(input2, "Password matches");
  }
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  checkLength(usernameInput, 3, 15);
  checkLength(passwordInput, 6, 30);
  checkEmail(emailInput);
  checkPasswordsMatch(passwordInput, password2Input);
});
