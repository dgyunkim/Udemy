const github = new GitHub();
const usernameInput = document.querySelector("#username-input");
usernameInput.addEventListener("keyup", (event) => {
  const username = usernameInput.value;
  if (username === "") {
    UI.clear();
  } else {
    github.getUserProfile(username).then((data) => {
      if (data) {
        UI.showUserProfile(data);
      }
    });
    github.getUserRepos(username).then((data) => {
      if (data === undefined) {
        UI.showAlert("User Not Found", "danger");
      } else {
        UI.hideAlert();
        UI.showUserRepos(data);
      }
    });
  }
});
