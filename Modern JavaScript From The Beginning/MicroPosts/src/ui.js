class UI {
  constructor() {
    this.post = document.querySelector("#posts");
    this.titleInput = document.querySelector("#title");
    this.bodyInput = document.querySelector("#body");
    this.idInput = document.querySelector("#id");
    this.postSubmit = document.querySelector(".post-submit");
    this.cardForm = document.querySelector("#card-form");
    this.postUpdate = document.querySelector(".post-update");
    this.postCancel = document.querySelector(".post-cancel");
  }

  showPosts(posts) {
    let output = "";
    for (let post of posts) {
      output += `
        <div class="card mb-3">
          <div class="card-body">
            <h4 class="card-title">${post.title}</h4>
            <p class="card-text">${post.body}</p>
            <a href="#" class="edit card-link text-info" data-id="${post.id}">
              <i class="fas fa-edit"></i>
            </a>
            <a href="#" class="delete card-link text-danger" data-id="${post.id}">
              <i class="fas fa-times"></i>
            </a>
          </div>
        </div>
      `;
    }
    this.post.innerHTML = output;
  }

  showAlert(message, color) {
    this.clearAlert();
    const alert = document.createElement("div");
    alert.className = `alert alert-${color}`;
    alert.innerText = message;
    const container = document.querySelector("#post-container");
    const posts = document.querySelector("#posts");
    container.insertBefore(alert, posts);
    setTimeout(this.clearAlert, 3000);
  }

  clearAlert() {
    const alert = document.querySelector(".alert");
    if (alert) alert.remove();
  }

  clearFields() {
    this.titleInput.value = "";
    this.bodyInput.value = "";
    this.idInput.value = "";
  }

  showEditState(data) {
    this.titleInput.value = data.title;
    this.bodyInput.value = data.body;
    this.idInput.value = data.id;
    this.postSubmit.innerText = "Update Post";
    this.postSubmit.className = "post-update btn btn-info btn-block";
    let cancelBtn = document.querySelector(".post-cancel");
    if (cancelBtn === null) {
      cancelBtn = document.createElement("button");
      cancelBtn.className = "post-cancel btn btn-dark btn-block mt-3";
      cancelBtn.innerText = "Cancel Edit";
      this.cardForm.appendChild(cancelBtn);
    }
  }

  showAddState() {
    this.clearFields();
    const cancelBtn = document.querySelector(".post-cancel");
    if (cancelBtn !== null) cancelBtn.remove();
    this.postSubmit.innerText = "Post It";
    this.postSubmit.className = "post-submit btn btn-primary btn-block";
  }
}

export const ui = new UI();
