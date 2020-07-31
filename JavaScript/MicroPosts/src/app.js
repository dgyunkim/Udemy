import { http } from "./http";
import { ui } from "./ui";

document.addEventListener("DOMContentLoaded", getPosts);
document.querySelector(".post-submit").addEventListener("click", submitPost);
document.querySelector("#posts").addEventListener("click", removePost);
document.querySelector("#posts").addEventListener("click", enableEdit);
document.querySelector("#card-form").addEventListener("click", cancelPost);

function getPosts() {
  http
    .get("http://localhost:3000/posts")
    .then((data) => ui.showPosts(data))
    .catch((error) => console.log(error));
}

function submitPost(event) {
  event.preventDefault();
  const title = document.querySelector("#title").value;
  const body = document.querySelector("#body").value;
  const id = document.querySelector("#id").value;
  if (title === "" || body === "") {
    ui.showAlert("Please fill in all fields", "danger");
  } else {
    const data = { title, body };
    if (id === "") {
      http
        .post("http://localhost:3000/posts", data)
        .then((data) => {
          getPosts();
          ui.showAlert("Post added", "success");
          ui.clearFields();
        })
        .catch((error) => console.log(error));
    } else {
      http
        .put(`http://localhost:3000/posts//${id}`, data)
        .then((data) => {
          getPosts();
          ui.showAlert("Post updated", "success");
          ui.showAddState();
        })
        .catch((error) => console.log(error));
    }
  }
}

function removePost(event) {
  event.preventDefault();
  const link = event.target.parentElement;
  if (link.classList.contains("delete")) {
    http
      .delete(`http://localhost:3000/posts/${link.dataset.id}`)
      .then((data) => {
        ui.showAlert(data, "success");
        ui.showAddState();
        link.parentElement.parentElement.remove();
      });
  }
}

function enableEdit(event) {
  event.preventDefault();
  const link = event.target.parentElement;
  if (link.classList.contains("edit")) {
    http.get(`http://localhost:3000/posts/${link.dataset.id}`).then((data) => {
      ui.showEditState(data);
    });
  }
}

function cancelPost(event) {
  event.preventDefault();
  if (event.target.classList.contains("post-cancel")) {
    ui.showAddState();
  }
}
